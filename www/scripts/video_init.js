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

function expandMenu(){
	var width = $('aside').width();
	$('#aside_button').css({'left':width});
}

function retractMenu(){
	$('#aside_button').css({'left':0});
}

$(document).ready(function(){


	//now for the code to hide the sidebar
	$("section").click(function(){
		
		
		if(!isHidden){
			$("aside").css({'left':'-38%','opacity':'0.25'});
			
			isHidden = true;
			
			//put the section back in focus
			$("section").animate({'opacity':'1'},250);
			
			retractMenu();
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
			
			expandMenu();
			
			
		}
		else{
			$("aside").css({'left':'-38%','opacity':'0.25'});
			
			isHidden = true;
			
			//put the section back in focus
			$("section").animate({'opacity':'1'},250);
			
			retractMenu();
		
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
			
			expandMenu();
		}
    });
	
    hammertime.on("dragleft", function(event) {
      if(!isHidden){
			$("aside").css({'left':'-38%','opacity':'0.25'});
			
			isHidden = true;
			
			//put the section back in focus
			$("section").animate({'opacity':'1'},250);
			
			retractMenu();
		}
    });
	
	
	
	//now hide the aside on startup
	//$("aside").hide();
	$("aside").css({'left':'-38%','opacity':'0.25'});
	$("#menu").text("Show Menu");
	
	
	
});


	
	
	
	
	
	
	
	
	
	
	
