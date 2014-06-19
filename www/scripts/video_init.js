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
		$("section").css({'width':'100%'});
		$("#menu").text("Show Menu");
		isHidden = true;
		
		//move the button back
		$('#aside_button').animate({'left':0}, 250);
	}
}


function expandMenu(){
	$("aside").css({'left':'0'});
			
	isHidden = false;
			
	//pause the video
	$('#video').get(0).pause();
			
	//now dim the section, put it out of focus
	$("section").css({'opacity':'0.10'});
}

function retractMenu(){
	$("aside").css({'left':'-40%'});
			
	isHidden = true;
			
	//put the section back in focus
	$("section").css({'opacity':'1'});
			
}


$(document).ready(function(){


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
		dragMinDistance: 0,
		dragMaxTouches: 2
	});
	
    hammertime.on("dragright", function(event) {
      if(isHidden){
			
			
			expandMenu();
		}
    });
	
    hammertime.on("dragleft", function(event) {
      if(!isHidden){
			
			
			retractMenu();
		}
    });
	
	
	
	//now hide the aside on startup
	//$("aside").hide();
	$("aside").css({'left':'-40%'});
	$("#menu").text("Show Menu");
	
	
	
	//now lets dynamically resize the elements on the page to make them fit
	var height = $('body').height() - $('header').height();
	var titleHeight = $("#title").height() + 10;
	
	$('#video').css({'height':height - titleHeight});
	
	
	
	
	
	
});


	
	
	
	
	
	
	
	
	
	
	
