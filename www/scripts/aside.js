//flag for the sidebar hiding function
var isHidden = true;

//A class that represents each video
function Video(title, description, url, duration){
	this.title = title;
	this.description = description;
	this.url = url;
	this.duration = duration;
}

//another callback for the video links
function videoCallback(type, video){
	return function(){
		window.open("video.html?"+type+'@'+video.url+'@'+video.title+'@'+video.description,'_self',false);
	}
}

function expandMenu(){
	$("aside").show();
			
	isHidden = false;
			
	//pause the video
	$('#video').get(0).pause();
			
	//now dim the section, put it out of focus
	$("section").css({'opacity':'0.10'});
}

function retractMenu(){
	$("aside").hide();
			
	isHidden = true;
			
	//put the section back in focus
	$("section").css({'opacity':'1'});
			
}


$(document).ready(function(){
	//lists of Video objects
	var dev_videos = [];
	var quick_videos = [];
	
	

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
					
					
						
						
				}
					
					
				
					
			
			
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
					$("#quick_menu").append('<div id = "quick_link'+i+'"></div>')
					
					$("#quick_link"+i).append('<div id = "title" class = "quick_title'+i+'"><h2>'+quick_videos[i].title+'</h2></div>');
					//$("quick_title"+i).css({'padding-top':'5px','padding-bottom':'5px'});
					
					var height = $(".quick_title"+i).height();
					var top = (height - 62)/2;
					$(".quick_title"+i).append('<img id = "play" src="img/play.png" style = "top:-'+top+'">');
					//<img id = "play" src="img/play.png">
					
					
					try {
						$("#quick_link"+i).append('<div id = "description"><p>'+quick_videos[i].description+'</p></div>');
					}
					catch(err) {
						//keep trying until it works
						location.reload();
					}
					
					//now add the episode number and running time
					if(i+1 < 10){ //add a zero to the front if it is a single digit
						$("#quick_link"+i).append('<p id = "episode_number">Episode '+0+(i+1)+'<p>');
					}
					else{
						$("#quick_link"+i).append('<p id = "episode_number">Episode '+(i+1)+'<p>');
					}
					//get running time
					$("#quick_link"+i).append('<p id = "running_time">Running Time: '+quick_videos[i].duration+'<p>');
					
						
					$('#quick_link'+i).click(videoCallback('quick',quick_videos[i]));
						
					$('#quick_link'+i).css({'background-color':'white'});
						
					//now fix the formatting of the links
					$('#quick_link'+i).css({'background-color':'white'});
					$('#quick_link'+i).css({'margin':'auto'});
					$('#quick_link'+i).css({'margin-top':'25px'});
					$('#quick_link'+i).css({'margin-bottom':'4em'});
					$('#quick_link'+i).css({'padding-bottom':'5px'});
					$('#quick_link'+i).css({'width':'90%'});
					$('#quick_link'+i).css({'clear':'both'});
					$('#quick_link'+i).css({'border-style':'solid'});
					$('#quick_link'+i).css({'-webkit-appearance':'button'});
						
						
				}
				
				//now add some blank lines to make the aside longer
				$("#quick_menu").append('<br><br><br>');
			
		}
		
    });

	
	
});