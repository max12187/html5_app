//this script will get and parse out the xml
//then display the videos and apply some formatting

//flag for the sidebar hiding function
var isHidden = true;
	
//A class that represents each video
function Video(title, description, url){
	this.title = title;
	this.description = description;
	this.url = url;
}

//callback function for jquery
function callBack(i, s){
	return function(){
		$('html, body').animate({
			scrollTop: $(s+i).offset().top - 50
		}, 500);
		
		//now collapse the menu
		$("aside").hide();
		
		//now adjust the css
		$("section").css({'width':'100%'});
		$("#menu").text("Show Menu");
		isHidden = true;
		
		//move the button back
		$('#aside_button').animate({'left':0}, 250);
	}
}

//another callback for the video links
function videoCallback(video){
	return function(){
		window.open("video.html?"+video.url+'@'+video.title+'@'+video.description,'_self',false);
	}
}

$(document).ready(function(){


	//lists of Video objects
	var dev_videos = [];
	var quick_videos = [];
	
	

	//use googles epic API to get the RSS feed
	var feed = new google.feeds.Feed("http://devvideopodcast.learntoprogram.tv/?feed=podcast");
	
	feed.setNumEntries(20);
	feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
	feed.load(function(result) {
		if (!result.error) {
				
				
				
				for (var i = 0; i < result.feed.entries.length; i++) {
					var entry = result.feed.entries[i];
					var video_url = entry.xmlNode.getElementsByTagName('enclosure')[0].getAttribute("url");
					
	
					var video = new Video(entry.title, entry.content, video_url);
					dev_videos.push(video);
				}
				
				
				//now the code to fill the aside with links
				for(var i = 0; i < dev_videos.length; i++){
					$("#dev_menu").append('<div id = "dev_link'+i+'"></div>')
					
					$("#dev_link"+i).append('<h2>'+dev_videos[i].title+'</h2>');
					$("#dev_link"+i).append('<p>'+dev_videos[i].description+'</p>');
						
						
					$('#dev_link'+i).click(videoCallback(dev_videos[i]));
						
					if(i%2==0){
						$('#dev_link'+i).css({'background-color':'#146991'});
					}
					else{
						$('#dev_link'+i).css({'background-color':'black'});
					}
						
					//now fix the formatting of the links
					$('#dev_link'+i).css({'color':'white'});
					$('#dev_link'+i).css({'margin':'auto'});
					$('#dev_link'+i).css({'padding':'10px'});
						
						
				}
					
					
				
					
			
			
		}
		
    });
	
	//doing the same thing again for the quickbytes feed
	var feed = new google.feeds.Feed("http://quickbytespodcast.learntoprogram.tv/?feed=podcast");
	
	feed.setNumEntries(20);
	feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
	feed.load(function(result) {
		if (!result.error) {
				
				
				for (var i = 0; i < result.feed.entries.length; i++) {
					var entry = result.feed.entries[i];
					var video_url = entry.xmlNode.getElementsByTagName('enclosure')[0].getAttribute("url");
					
					
					
					var video = new Video(entry.title, entry.content, video_url);
					quick_videos.push(video);
				}
				

	
				
			//now the code to fill the aside with links
			for(var i = 0; i < quick_videos.length; i++){
				$("#quick_menu").append('<div id = "quick_link'+i+'"></div>')
				
				$("#quick_link"+i).append('<h2>'+quick_videos[i].title+'</h2>');
				$("#quick_link"+i).append('<p>'+quick_videos[i].description+'</p>');
						
						
				$('#quick_link'+i).click(videoCallback(quick_videos[i]));
						
				if(i%2==0){
					$('#quick_link'+i).css({'background-color':'#146991'});
				}
				else{
					$('#quick_link'+i).css({'background-color':'black'});
				}
						
				//now fix the formatting of the links
				$('#quick_link'+i).css({'color':'white'});
				$('#quick_link'+i).css({'margin':'auto'});
				$('#quick_link'+i).css({'padding':'10px'});
						
						
			}
			
			
		}
		
    });
	

	
	//now for the code to hide the sidebar
	
	$("body").click(function(){
		
		
		if(!isHidden){
			//collapse the menu
			$("aside").hide(250);
			$("#menu").show();
			isHidden = true;
			
			//move the button back
			$('#aside_button').animate({'left':0}, 250);
			
			//play the video
			$('#video').get(0).play();
			
		}
		
	
		
	});
	

	
	//support for mobile swipe
	
	$("document").on("swiperight",function(){
	
		if(isHidden){
			//expand the menu
			$("aside").show(250);
			$("#menu").hide();
			isHidden = false;
			
			//push the button over
			$('#aside_button').animate({'left': $('aside').width() + $('#menu').width() + 50}, 250);
			
			//pause the video
			$('#video').get(0).pause();
		}
	});
	
	
	//testing hammer
	var element = document.getElementById('aside_button');
    var hammertime = Hammer(document).on("swiperight", function(event) {
      if(isHidden){
			//expand the menu
			$("aside").show(250);
			$("#menu").hide();
			isHidden = false;
			
			//push the button over
			$('#aside_button').animate({'left': $('aside').width() + $('#menu').width() + 50}, 250);
			
			//pause the video
			$('#video').get(0).pause();
		}
    });
	
	$("#aside_button").on("swipeleft",function(){
		if(!isHidden){
			//collapse the menu
			$("aside").hide(250);
			$("#menu").show();
			isHidden = true;
			
			//move the button back
			$('#aside_button').animate({'left':0}, 250);
			
			//play the video
			$('#video').get(0).play();
			
		}
	});
	
	
	
	
	//now hide the aside on startup
	$("aside").hide();
	$("#menu").text("Show Menu");
	
	
	
});


	
	
	
	
	
	
	
	
	
	
	
