//this script will get and parse out the xml
//then display the videos and apply some formatting



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



$(document).ready(function(){
	
	
	
	//now hide the aside on startup
	//$("aside").hide();
	$("aside").hide();
	$("#menu").text("Show Menu");
	
	
	
	//now lets dynamically resize the elements on the page to make them fit
	var height = $('body').height() - $('header').height();
	var titleHeight = $("#title").height() + 10;
	
	$('#video').css({'height':height - titleHeight});
	
	
	
	
	
	
});


	
	
	
	
	
	
	
	
	
	
	
