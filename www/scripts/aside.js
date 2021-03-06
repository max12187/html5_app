//flag for the sidebar hiding function
var isHidden = true;

//A class that represents each video
function Video(title, description, url, duration, date){
	this.title = title;
	this.description = description;
	this.url = url;
	this.duration = duration;
	this.date = date;
}

//another callback for the video links
function videoCallback(type, video){
	return function(){
		window.open("video.html?@"+type+'@'+video.url+'@'+video.title+'@'+video.description,'_self',false);
	}
}

function expandMenu(){
	$("aside").show();
			
	isHidden = false;

			
	//now dim the section, put it out of focus
	$("section").css({'opacity':'0.10'});
	
	//pause the video
	$('#video').get(0).pause();
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
				
				
				//NOTE:  "result.feed.entries" contains all of the items from the rss feed
				//		 Iterate through the items and extract the data to put them in custom "Video" objects
				for (var i = 0; i < result.feed.entries.length; i++) {
					var entry = result.feed.entries[i];
					
					var video_url = entry.xmlNode.getElementsByTagName('enclosure')[0].getAttribute("url");
					var durration = entry.xmlNode.getElementsByTagNameNS("*", "duration")[0].childNodes[0].nodeValue;
					var date = entry.xmlNode.getElementsByTagName("pubDate")[0].childNodes[0].nodeValue;
					
					var video = new Video(entry.title, entry.content, video_url, durration, date);
					dev_videos.push(video);
					
					
				}
				
				
				
				//display the latest in dev
				var i = 0;
						
				//create a new div container for the video
				$('#dev').append('<a href=""><div id = "dev'+ i +'"></div></a>');
						
				//now create a new click event for the new div
				$('#dev').click(videoCallback('dev',dev_videos[i]));
						
				//add the rules to the new div we created
				$('#dev'+i).css({
					'width' : '100%',
					'text-align' : 'center',
					'margin' : 'auto'
				});
						
				//Use the url of the video to map to the thumbnail in the same directory
				var url = dev_videos[i].url.split("/");
				var front = url.slice(0,4).join("/") + "/" +"thumbnails/";
				var end = url.slice(4).join("/").split(".")[0] + ".png";
					
				var imgSrc = front + end;	
				
						
				$('#dev'+i).append('<h2>'+dev_videos[i].title+'</h2>');
				$('#dev'+i).append('<img class = "devitem'+i+'" src="'+imgSrc+'" id = "video">');
				$('#dev'+i).append('<p>'+dev_videos[i].description+'</p>');
						
				//If the thumbnail isn't on the server, handle it.
				$(".devitem"+i).error(function () {
					//Use the default thumbnail instead
					this.src = "img/dev.jpg";
					
						
				});
				
				
				//now the code to fill the aside with links
				for(var i = 0; i < dev_videos.length; i++){
					$("#dev_menu").append('<div id = "dev_link'+i+'"></div>');
					
					$("#dev_link"+i).append('<div id = "title" class = "dev_title'+i+'"><h2>'+dev_videos[i].title+'</h2></div>');
					
					//add the play image
					var height = $(".dev_title"+i).height();
					var top = (height - 62)/2;
					$(".dev_title"+i).append('<img id = "play" src="img/play.png" style = "top:-'+top+'">');
				
					
					$("#dev_link"+i).append('<div id = "description"><p>'+dev_videos[i].description+'</p></div>');
					
					
					//now add the date and running time
					var date = dev_videos[i].date.split(" ");
					$("#dev_link"+i).append('<p id = "episode_number">Published: '+date[2]+", "+date[3]+'<p>');

					//get running time
					$("#dev_link"+i).append('<p id = "running_time">Running Time: '+dev_videos[i].duration+'<p>');
					
						
						
					$('#dev_link'+i).click(videoCallback('dev',dev_videos[i]));
					
						
					//now fix the formatting of the links  NOTE: Should move to css sheet...
					$('#dev_link'+i).css({'background-color':'white'});
					$('#dev_link'+i).css({'margin':'auto'});
					$('#dev_link'+i).css({'margin-top':'25px'});
					$('#dev_link'+i).css({'margin-bottom':'4em'});
					$('#dev_link'+i).css({'padding-bottom':'5px'});
					$('#dev_link'+i).css({'width':'90%'});
					$('#dev_link'+i).css({'clear':'both'});
					$('#dev_link'+i).css({'border-style':'solid'});
					$('#dev_link'+i).css({'-webkit-appearance':'button'});
					
						
						
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
					
					var date = entry.xmlNode.getElementsByTagName("pubDate")[0].childNodes[0].nodeValue;
					
					var video = new Video(entry.title, entry.content, video_url, durration, date);
					quick_videos.push(video);
					
					
					
					
				}
				
				//display the latest in quickBytes
				var i = 0;
				
				//create a new div container for the video
				$('#quick').append('<a href=""><div id = "quick'+ i +'"></div></a>');
						
				//now create a new click event for the new div
				$('#quick').click(videoCallback('quick',quick_videos[i]));
						
				//add the rules to the new div we created
				$('#quick'+i).css({
					'width' : '100%',
					'text-align' : 'center',
					'margin' : 'auto'
				});
						
				//Use the url of the video to map to the thumbnail in the same directory
				var url = quick_videos[i].url.split("/");
				var front = url.slice(0,4).join("/") + "/" +"thumbnails/";
				var end = url.slice(4).join("/").split(".")[0] + ".png";
					
				var imgSrc = front + end;	
				
						
				$('#quick'+i).append('<h2>'+quick_videos[i].title+'</h2>');
				$('#quick'+i).append('<img class = "quickitem'+i+'" src="'+imgSrc+'" id = "video">');
				$('#quick'+i).append('<p>'+quick_videos[i].description+'</p>');
						
				//If the thumbnail isn't on the server, handle it.
				$(".quickitem"+i).error(function () {
					//Use the default thumbnail instead
					this.src = "img/quick.jpg";
					
						
				});
				
				
						
					
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
					var date = quick_videos[i].date.split(" ");
					$("#quick_link"+i).append('<p id = "episode_number">Published: '+date[2]+", "+date[3]+'<p>');
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

	
	//now for the code to hide the sidebar
	$("section").click(function(){
		
		
		if(!isHidden){
			
			retractMenu();
		}
		
	
		
	});
	
	//for the aside button
	$('#aside_button').click(function(){
		
		
		 if(isHidden){
			
			
			
			
			expandMenu();
			
			
		}
		else{
		
			
			retractMenu();
		
			
		}
		
	
		
	});
	
	
	
	//now using the Hammer.js library
	var hammertime = Hammer(document,{
		dragMinDistance: 5,
		dragMaxTouches: 2
	});
	
    hammertime.on("dragright", function(e) {
	  var x = e.gesture.center.pageX;
	  
	  //You can only swipe before the video player
      if(isHidden && x < $("#video").offset().left){
			
			
			expandMenu();
		}
    });
	
    hammertime.on("dragleft", function(e) {
      if(!isHidden){
			
			
			retractMenu();
		}
    });
	
	//adding on click events for aside buttons
	$('#quick_button').click(function(){
		$('aside').animate({
			scrollTop: $('#quick_label').offset().top - 50
		}, 500);
	});
	
	$('#dev_button').click(function(){
		$('aside').animate({
			scrollTop: $('#dev_label').offset().top - 50
		}, 500);
	});
});