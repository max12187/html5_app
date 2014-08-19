//A class that represents each video
function Video(title, description, url, duration, date){
	this.title = title;
	this.description = description;
	this.url = url;
	this.duration = duration;
	this.li = null;
	this.date = date;
	this.thumb = null;
}

//another callback for the video links
function videoCallback(type, video){
	
		window.open("video.html?@"+type+'@'+video.url+'@'+video.title+'@'+video.description,'_self',false);
	
}


//lists of Video objects
var dev_videos = [];
var quick_videos = [];

var devPos = 0;
var quickPos = 0;

//0 for dev, 1 for quick
var activeView = 0;

var active_button = 0;
	
$(document).ready(function(){
	
	
	
	
	

	
	

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
					
					var date = entry.xmlNode.getElementsByTagName("pubDate")[0].childNodes[0].nodeValue;
			
					
					//take off the <p></p>
					var html = entry.content;
					var div = document.createElement("div");
					div.innerHTML = html;
					var text = div.textContent || div.innerText || "";
					
					if(isNew(date.split(" ")[2])){
						var video = new Video(entry.title+" (NEW) ", text, video_url, durration, date);
					}
					else{
						var video = new Video(entry.title, text, video_url, durration, date);
					}
			
					
					dev_videos.push(video);
					
					
				}
				
				
				
				
						
				
				
				
				//now the code to fill the aside with links
				for(var i = 0; i < dev_videos.length; i++){
				
					//Use the url of the video to map to the thumbnail in the same directory
					var url = dev_videos[i].url.split("/");
					var front = url.slice(0,4).join("/") + "/" +"thumbnails/";
					var end = url.slice(4).join("/").split(".")[0] + ".png";
					
					var imgSrc = front + end;
					
					//Try to add the thumbnail as an item to the list
					$('#dev_list').append('<li id = "dev'+i+'"><img id = "item" class = "devitem'+i+'" src = "'+imgSrc+'" ></li>');
					dev_videos[i].thumb = imgSrc;
						
					//If the thumbnail isn't on the server, handle it.
					$(".devitem"+i).error(function () {
						var n = $(this).attr('class');
						n = n.substr(n.length - 1);
						
						this.src = "img/dev.jpg";
						dev_videos[n].thumb = "img/dev.jpg";
						
					});
					
					//Save a reference to the list item just created
					dev_videos[i].li = $('#dev'+i)
					
					
				}
				
				//add some blank space
				$('#dev_list').append("<div>                          </div>");	
				
			
			
			
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
					
					var date = entry.xmlNode.getElementsByTagName("pubDate")[0].childNodes[0].nodeValue;
					
					//take off the <p></p>
					var html = entry.content;
					var div = document.createElement("div");
					div.innerHTML = html;
					var text = div.textContent || div.innerText || "";
					
					if(isNew(date.split(" ")[2])){
						var video = new Video(entry.title+" (NEW) ", text, video_url, durration, date);
					}
					else{
						var video = new Video(entry.title, text, video_url, durration, date);
					}
				
					
					quick_videos.push(video);
					
					
					
					
				}
				
			
						
					
					//now the code to fill the aside with links
				for(var i = 0; i < quick_videos.length; i++){
					
					var url = quick_videos[i].url.split("/");
					var front = url.slice(0,4).join("/") + "/" +"thumbnails/";
					var end = url.slice(4).join("/").split(".")[0] + ".png";
					
					var imgSrc = front + end;
				
							
						 
						$('#quick_list').append('<li id = "quick'+i+'"><img id = "item" class = "quickitem'+i+'" src = "'+imgSrc+'" ></li>');
						quick_videos[i].thumb = imgSrc;
						
						$(".quickitem"+i).error(function () {
							
							this.src = "img/quick.jpg";
							quick_videos[i].thumb = "img/quick.jpg";
						});
						
						
						
					
					
					
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
			
			//see if the overlay is up
			if(!$("#overlay").is(":visible") ){
			
				//if dev
				if(activeView==0){
					
					if(inBounds(devPos-1,dev_videos.length)){
					
						selectItem(dev_videos[devPos].li , dev_videos[devPos-1].li , $('#dev_list'), -1);
						devPos-=1;
						
						
						//display the name
						$('#dev_title').text(dev_videos[devPos].title);
					}
				}
				else{ //else quick
					
					if(inBounds(quickPos-1,quick_videos.length)){
					
						selectItem(quick_videos[quickPos].li , quick_videos[quickPos-1].li , $('#quick_list'), -1);
						quickPos-=1;
						
						$('#quick_title').text(quick_videos[quickPos].title);
					}
				
				}
			}
			
			return false;
		}
		else if (e.keyCode == 39){
			//right
			
			if(!$("#overlay").is(":visible") ){
			
				if(activeView==0){
					
					if(inBounds(devPos+1, dev_videos.length)){
					
						selectItem(dev_videos[devPos].li , dev_videos[devPos+1].li , $('#dev_list'), 1);
						devPos+=1;
						
						//display the name
						$('#dev_title').text(dev_videos[devPos].title);
					}
				}
				else{
					
					if(inBounds(quickPos+1,quick_videos.length)){
					
						selectItem(quick_videos[quickPos].li , quick_videos[quickPos+1].li , $('#quick_list'), 1);
						quickPos+=1;
						
						$('#quick_title').text(quick_videos[quickPos].title);
						
					}
				
				}
			}
			return false;
		}
		else if (e.keyCode == 38){
			if(!$("#overlay").is(":visible") ){
				//up
				activeView = 0;
				selectSeries(activeView);
				return false;
			}
			else{
				active_button = 0;
				
				$("#back_button").addClass('deselected');
				$("#play_button").removeClass('deselected');
			}
		}
		else if (e.keyCode == 40){
			if(!$("#overlay").is(":visible") ){
			//down
				activeView = 1;
				selectSeries(activeView);
				return false;
			}
			else{
				active_button = 1;
				$("#play_button").addClass('deselected');
				$("#back_button").removeClass('deselected');
			}
		}
		
		
		
	});
	
	$(window).keypress(function(e) {

		
		//enter
		if(e.which == 13){
			
			//get the selected video
			if(activeView == 0){
				//display the overlay
				
				if(!$("#overlay").is(":visible") ){
					overlay(dev_videos[devPos]);
				}
				else{
					//play button
					if(active_button == 0){
						videoCallback('dev',dev_videos[devPos])
					}
					//home button
					else{
						$('#overlay').hide();
						$('#overlay').siblings().css({'opacity':'1'})
					}
				}
	
			}
			else{
			
				if(!$("#overlay").is(":visible") ){
					overlay(quick_videos[quickPos]);
				}
				else{
					if(active_button == 0){
						videoCallback('quick',quick_videos[quickPos])
					}
					else{
						$('#overlay').hide();
						$('#overlay').siblings().css({'opacity':'1'})
					}
				}
			
			}
			
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
		
		parent.animate({
			scrollLeft: parent.scrollLeft() - x
		}, 'slow');
	
	}
	
}

function selectSeries(activeView){
	if (activeView == 1){
		//remove for quick add for dev
		$('#quick').removeClass('series_selected');
		$('#dev').addClass('series_selected');
		
		//deselect the active for quick and select the active for dev
		quick_videos[quickPos].li.addClass('selected');
		dev_videos[devPos].li.removeClass('selected');
		
		$('#dev_title').text(dev_videos[devPos].title);
	}
	else{
		//remove for quick add for dev
		$('#dev').removeClass('series_selected');
		$('#quick').addClass('series_selected');
		
		dev_videos[devPos].li.addClass('selected');
		quick_videos[quickPos].li.removeClass('selected');
		
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
				
				if(activeView==0){
					if(devPos >= 6){
						parent.animate({
							scrollLeft: 3000
						}, 'slow');
					}
					else{
				
						scroll(newItem, parent, direction);
				
					}
				}
				else{
					
					if(quickPos >= 6){
						parent.animate({
							scrollLeft: 3000
						}, 'slow');
					}
					else{
				
						scroll(newItem, parent, direction);
				
					}
				
				}
				
				
				
			}
			
		}
		else{
			oldItem.removeClass('selected');
			newItem.addClass('selected');
			
			//check to see if we need to scroll
			var corner = newItem.offset().left;
			
			if(corner < 0){
				scroll(newItem, parent, direction);
			}
			
		
		}
	
		
}

function overlay(item){
	$('#overlay').show();
	$('#overlay').siblings().css({'opacity':'.1'})

	$('#title').text(item.title);
	
	
	$('#thumb').attr("src", item.thumb);
	
	$('#description').text(item.description);
	
	
	
	$("#back_button").addClass('deselected');
	$("#play_button").removeClass('deselected');
			
	active_button = 0;
}

function inBounds(i,size){
	return !(i < 0 || i > size-1);
}

function isNew(date){
	var d = new Date();
	var month = new Array();
	month[0] = "January";
	month[1] = "February";
	month[2] = "March";
	month[3] = "April";
	month[4] = "May";
	month[5] = "June";
	month[6] = "July";
	month[7] = "August";
	month[8] = "September";
	month[9] = "October";
	month[10] = "November";
	month[11] = "December";
	var n = month[d.getMonth()];
	
	return n.indexOf(date) > -1;
	
	
}



