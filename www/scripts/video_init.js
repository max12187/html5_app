//this script will get and parse out the xml
//then display the videos and apply some formatting

$(document).ready(function(){

	//now lets dynamically resize the elements on the page to make them fit
	var height = $('body').height();
	var titleHeight = $("#title").height() + 10;
	
	$('#video').css({'height':height - titleHeight});
	
	
	//input
	$(window).keypress(function(e) {
		
		
		//enter
		if(e.which == 13){
			var video = $('#video').get(0);

			
	
			if (!video.paused) {
				 video.pause();
			}
			else{
				video.play();
			}
			
		}
       //do stuff with "key" here...
   });
   
   $(document).keydown(function(e){
		var video = $('#video').get(0);
		var seekToTime = video.currentTime;
		
		
		if (e.keyCode == 37) { 
			//left
			seekToTime -= 1;
			
			 
			
			//return false;
		}
		else if (e.keyCode == 39){
			//right
			seekToTime += 1;
			
			//return false;
		}
		
			
		
		if( seekToTime >= 0 && seekToTime <= video.duration ){
				video.currentTime = seekToTime;
		}
		
		
	});
	
	
	
	
});


	
	
	
	
	
	
	
	
	
	
	
