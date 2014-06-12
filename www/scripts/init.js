//this script will get and parse out the xml
//then display the videos and apply some formatting

//flag for the sidebar hiding function
var isHidden = true;
	


function format(){
	//since the header is fixed, we need to position the aside to start below the header
	var height = $('header').height();
	$('aside').css({'top':height});
	$('#aside_button').css({'top':height});
	
	//now we need to push down the section so the header does not cover it
	$('section').css({'padding-top':height});
}

$(document).ready(function(){
	//first, some simple formatting
	format();

	
	
});

//this is for when the page is revisited
$(window).load(function() {
	format();
});


	
	
	
	
	
	
	
	
	
	
	
