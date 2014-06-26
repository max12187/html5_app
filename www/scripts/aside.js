//A class that represents each video
function Video(title, description, url){
	this.title = title;
	this.description = description;
	this.url = url;
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
				
				
				
				//display the latest in dev
				var i = 0;
						
				//create a new div container for the video
				$('#dev').append('<a href=""><div id = "dev'+ i +'"></div></a>');
						
				//now create a new click event for the new div
				$('#dev').click(videoCallback(dev_videos[i]));
						
				//add the rules to the new div we created
				$('#dev'+i).css({
					'width' : '100%',
					'text-align' : 'center',
					'margin' : 'auto'
				});
						
				$('#dev'+i).append('<h2>'+dev_videos[i].title+'</h2>');
				$('#dev'+i).append('<video id = "video">' +
				'<source src="'+dev_videos[i].url+'" type="video/mp4"></source>' +
				'</video>');
				$('#dev'+i).append('<p>'+dev_videos[i].description+'</p>');
						
				
				
				
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
					$('#dev_link'+i).css({'-webkit-appearance':'button'});
						
						
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
				
				//display the latest in quickBytes
				var i = 0;
				
				//create a new div container for the video
				$('#quick').append('<a href=""><div id = "quick'+ i +'"></div></a>');
						
				//now create a new click event for the new div
				$('#quick').click(videoCallback(quick_videos[i]));
						
				//add the rules to the new div we created
				$('#quick'+i).css({
					'width' : '100%',
					'text-align' : 'center',
					'margin' : 'auto'
				});
						
				$('#quick'+i).append('<h2>'+quick_videos[i].title+'</h2>');
				$('#quick'+i).append('<video id = "video">' +
				'<source src="'+quick_videos[i].url+'" type="video/mp4"></source>' +
				'</video>');
				$('#quick'+i).append('<p>'+quick_videos[i].description+'</p>');
						
					
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
					$('#quick_link'+i).css({'-webkit-appearance':'button'});
						
						
				}
			
			
		}
		
    });

	
	
});