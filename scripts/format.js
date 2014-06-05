//some code to format the document correctly
$(window).load(function(){

	//since the header is fixed, we need to position the aside to start below the header
	var height = $('header').height();
	$('aside').css({'top':height});
	$('#aside_button').css({'top':height});
	
	//now we need to push down the section so the header does not cover it
	$('section').css({'padding-top':height});


	
	
	
});