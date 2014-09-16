jQuery(document).ready(function(jQuery){

	/*-----------------------------------------------------------------------------------
	DRIBBBLE HOVER
	-----------------------------------------------------------------------------------*/
	
	jQuery('.thmlv-dribbble-shots a').hover(function() {
			jQuery(this).find('.thmlv-dribbble-hover').stop(false,true).fadeIn(350);
		}, function(){
			jQuery(this).find('.thmlv-dribbble-hover').stop(false,true).fadeOut(350);
	});

});