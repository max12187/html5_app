//A class that represents each video
function Video(title, description, url, duration){
	this.title = title;
	this.description = description;
	this.url = url;
	this.duration = duration;
	this.li = null;
}

//another callback for the video links
function videoCallback(type, video){
	return function(){
		window.open("video.html?"+type+'@'+video.url+'@'+video.title+'@'+video.description,'_self',false);
	}
}


//lists of Video objects
var dev_videos = [];
var quick_videos = [];

var devPos = 0;
var quickPos = 0;
	
$(document).ready(function(){
	
	
	
	
	//0 for dev, 1 for quick
	var activeView = 0;
	
	

	//use googles epic API to get the RSS feed
	var feed = new google.feeds.Feed("http://devvideopodcast.learntoprogram.tv/?feed=podcast");
	
	feed.setNumEntries(100);
	feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
	feed.load(function(result) {
		if (!result.error) {
				
				
				
				for (var i = 0; i < result.feed.entries.length; i++) {
					var entry = result.feed.entries[i];
					
					var video_url = entry.xmlNode.getElementsByTagName('enclosure')[0].getAttribute("url");
					var durration = entry.xmlNode.getElementsByTagNameNS("*", "duration")[0].childNodes[0].nodeValue;
					
	
					var video = new Video(entry.title, entry.content, video_url, durration);
					dev_videos.push(video);
					
					
				}
				
				
				
				
						
				
				
				
				//now the code to fill the aside with links
				for(var i = 0; i < dev_videos.length; i++){
					
					
					$('#dev_list').append('<li id = "dev'+i+'"><img id = "item" src = "img/dev.jpg" ></li>');
					//console.log("log");
					dev_videos[i].li = $('#dev'+i)
						
				}
					
					
				
				//console.log(dev_videos[3].li);
			
			
		}
		
    });
	
	//doing the same thing again for the quickbytes feed
	feed = new google.feeds.Feed("http://quickbytespodcast.learntoprogram.tv/?feed=podcast");
	
	feed.setNumEntries(100);
	feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
	feed.load(function(result) {
		if (!result.error) {
				
				
				for (var i = 0; i < result.feed.entries.length; i++) {
					var entry = result.feed.entries[i];
					
					var video_url = entry.xmlNode.getElementsByTagName('enclosure')[0].getAttribute("url");
					var durration = entry.xmlNode.getElementsByTagNameNS("*", "duration")[0].childNodes[0].nodeValue;
					
	
					var video = new Video(entry.title, entry.content, video_url, durration);
					quick_videos.push(video);
					
					
					
					
				}
				
			
						
					
					//now the code to fill the aside with links
				for(var i = 0; i < quick_videos.length; i++){
					
					
					$('#quick_list').append('<li id = "quick'+i+'"><img id = "item" src = "img/quick.jpg" ></li>');
					//console.log("log");
					quick_videos[i].li = $('#quick'+i)
						
				}
					
			
		}
		
		//select the active elements
		selectSeries(activeView);
		selectItem(dev_videos[0].li,dev_videos[0].li,$('#dev_list'), 0);
		
		
    });

	$(document).keydown(function(e){
		if (e.keyCode == 37) { 
			//left
			
			//if dev
			if(activeView==0){
				
				if(inBounds(devPos-1,dev_videos.lenght)){
				
					selectItem(dev_videos[devPos].li , dev_videos[devPos-1].li , $('#dev_list'), -1);
					devPos-=1;
					
					
					//display the name
					$('#dev_title').text(dev_videos[devPos].title);
				}
			}
			else{ //else quick
				
				if(inBounds(quickPos-1,quick_videos.lenght)){
				
					selectItem(quick_videos[quickPos].li , quick_videos[quickPos-1].li , $('#quick_list'), -1);
					quickPos-=1;
					
					$('#quick_title').text(quick_videos[quickPos].title);
				}
			
			}
			
			return false;
		}
		else if (e.keyCode == 39){
			//right
			
			if(activeView==0){
			
				if(inBounds(devPos+1,dev_videos.lenght)){
				
					selectItem(dev_videos[devPos].li , dev_videos[devPos+1].li , $('#dev_list'), 1);
					devPos+=1;
					
					//display the name
					$('#dev_title').text(dev_videos[devPos].title);
				}
			}
			else{
				
				if(inBounds(quickPos+1,quick_videos.lenght)){
				
					selectItem(quick_videos[quickPos].li , quick_videos[quickPos+1].li , $('#quick_list'), 1);
					quickPos+=1;
					
					$('#quick_title').text(quick_videos[quickPos].title);
					
				}
			
			}
			return false;
		}
		else if (e.keyCode == 38){
			//up
			activeView = 0;
			selectSeries(activeView);
			return false;
		}
		else if (e.keyCode == 40){
			//down
			activeView = 1;
			selectSeries(activeView);
			return false;
		}
		
		
		
	});
	
	$(window).keypress(function(e) {
		//alert(e.which);
		
		//enter
		if(e.which == 13){
			alert('load video');
		}
       //do stuff with "key" here...
   });
	
});

function scroll(li, parent, direction){
	//right
	if(direction>0){
		parent.animate({
			scrollLeft: (((li.offset().left)))
		}, 'slow');
	
	}
	else{
		var x = parent.width() - (li.offset().left + li.width());
		console.log(x);
		parent.animate({
			scrollLeft: parent.scrollLeft() - x
		}, 'slow');
	
	}
	
}

function selectSeries(activeView){
	if (activeView == 0){
		//remove for quick add for dev
		$('#quick').removeClass('series_selected');
		$('#dev').addClass('series_selected');
		
		//deselect the active for quick and select the active for dev
		quick_videos[quickPos].li.removeClass('selected');
		dev_videos[devPos].li.addClass('selected');
		
		$('#dev_title').text(dev_videos[devPos].title);
	}
	else{
		//remove for quick add for dev
		$('#dev').removeClass('series_selected');
		$('#quick').addClass('series_selected');
		
		dev_videos[devPos].li.removeClass('selected');
		quick_videos[quickPos].li.addClass('selected');
		
		$('#quick_title').text(quick_videos[quickPos].title);
	
	}
}

function selectItem(oldItem, newItem, parent, direction){
		//right
		if(direction>0){
			oldItem.removeClass('selected');
			newItem.addClass('selected');
			
			//check to see if we need to scroll
			var corner = newItem.offset().left + newItem.width();
			
			if(corner > parent.width()){
				scroll(newItem, parent, direction)
			}
			
		}
		else{
			oldItem.removeClass('selected');
			newItem.addClass('selected');
			
			//check to see if we need to scroll
			var corner = newItem.offset().left;
			
			if(corner < 0){
				scroll(newItem, parent, direction)
			}
			
		
		}
	
		//scroll(newItem , parent, direction);
		
		
}

function inBounds(i,size){
	return !(i < 0 || i > size-1)
}




