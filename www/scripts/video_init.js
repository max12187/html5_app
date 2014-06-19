//this script will get and parse out the xml
//then display the videos and apply some formatting

//flag for the sidebar hiding function
var isHidden = true;
	

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


$(document).ready(function(){


	//now for the code to hide the sidebar
	$("section").click(function(){
		
		
		if(!isHidden){
			$("aside").css({'left':'-38%','opacity':'0.25'});
			
			isHidden = true;
			
			//put the section back in focus
			$("section").animate({'opacity':'1'},250);
			
		}
		
	
		
	});
	
	//for the aside button
	$('#aside_button').click(function(){
		
		
		 if(isHidden){
			$("aside").css({'left':'0','opacity':'1'});
			
			isHidden = false;
			
			//pause the video
			$('#video').get(0).pause();
			
			//now dim the section, put it out of focus
			$("section").animate({'opacity':'0.10'},250);
			
			
		}
		else{
			$("aside").css({'left':'-38%','opacity':'0.25'});
			
			isHidden = true;
			
			//put the section back in focus
			$("section").animate({'opacity':'1'},250);
		
		}
		
	
		
	});
	
	
	
	//now using the Hammer.js library
	var hammertime = Hammer(document,{
		dragMinDistance: 0,
		dragMaxTouches: 2
	});
	
    hammertime.on("dragright", function(event) {
      if(isHidden){
			$("aside").css({'left':'0','opacity':'1'});
			
			isHidden = false;
			
			//pause the video
			$('#video').get(0).pause();
			
			//now dim the section, put it out of focus
			$("section").animate({'opacity':'0.10'},250);
			
			console.log(event);
		}
    });
	
    hammertime.on("dragleft", function(event) {
      if(!isHidden){
			$("aside").css({'left':'-38%','opacity':'0.25'});
			
			isHidden = true;
			
			//put the section back in focus
			$("section").animate({'opacity':'1'},250);
		}
    });
	
	
	
	//now hide the aside on startup
	//$("aside").hide();
	$("aside").css({'left':'-38%','opacity':'0.25'});
	$("#menu").text("Show Menu");
	
	
	
});


	
	
	
	
	
	
	
	
	
	
	
