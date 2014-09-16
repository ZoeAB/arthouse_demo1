jQuery(document).ready(function(jQuery){

	var windowWidth = jQuery(window).width();

	jQuery('article.type-portfolio, article.type-post').hide();
	
	jQuery('article.type-portfolio, article.type-post').each(function() {
		jQuery(this).fadeIn(300);
	});
	
	/*-----------------------------------------------------------------------------------
	SUPERFISH
	-----------------------------------------------------------------------------------*/
	
	if( windowWidth <= 1024 ) {
		jQuery('.primary-menu').superfish({
			animation: {height:'show'},
			animationOut: {height: 'hide'},
			useClick: true
		});
		jQuery(this).toggleClass('sf-js-enabled');
    } else {
    	jQuery('.primary-menu').superfish();
    }
    
    jQuery("#menu-icon").on("click", function(){
    	jQuery(".primary-menu").slideToggle();
    });
    
    jQuery(window).resize(function(){
    	if( jQuery(window).width() > 1024 ) {
			jQuery(".primary-menu").css("display", "block");
		} else {
			jQuery(".primary-menu").css("display", "none");
		}
	});
    
    /*-----------------------------------------------------------------------------------
	FILTERS MENU
	-----------------------------------------------------------------------------------*/
	
	jQuery("#menu-icon-filter").on("click", function(){
       	jQuery("#filters-wrapper").slideToggle();
    });
	
	/*-----------------------------------------------------------------------------------
	HOVER IMAGES
	-----------------------------------------------------------------------------------*/
		
	jQuery('html:not(.no-opacity) .page article.type-portfolio, html:not(.no-opacity) .blog article.type-post, html:not(.no-opacity) .archive article.type-portfolio, html:not(.no-opacity) .archive article.type-post, html:not(.no-opacity) .page-template-page-blog-php article.type-post').hover(function(){
		jQuery(this).siblings().animate({
			'opacity': '0.8',
			'-webkit-opacity': '0.8',
    		'-moz-opacity': '0.8',
    		'-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=80)'
		}, 10);
	}, function() {
		jQuery(this).siblings().animate({
			'opacity': '1',
			'-webkit-opacity': '1',
    		'-moz-opacity': '1',
    		'-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)'
		}, 10);
	});
	
	/*-----------------------------------------------------------------------------------
	FLEXSLIDER
	-----------------------------------------------------------------------------------*/
	
	jQuery('.flexslider').flexslider({
        animation: "slide",
        smoothHeight: true,
		directionNav: false,
		slideshow: false
    });
	
	/*-----------------------------------------------------------------------------------
	SCROLLTOTOP
	-----------------------------------------------------------------------------------*/
	
	jQuery().UItoTop({
		scrollSpeed: 700,
		easingType: 'easeOutQuart'
	});
	
	/*-----------------------------------------------------------------------------------
	ALERT
	-----------------------------------------------------------------------------------*/
	
	jQuery('.glg-alert').click(function() {
		jQuery(this).fadeOut();
	});
	
	/*-----------------------------------------------------------------------------------
	ACCORDION
	-----------------------------------------------------------------------------------*/
	
	jQuery('.glg-spoiler .glg-spoiler-title').click(function() {

		var // Spoiler elements
		spoiler = jQuery(this).parent('.glg-spoiler').filter(':first'),
		title = spoiler.children('.glg-spoiler-title'),
		content = spoiler.children('.glg-spoiler-content'),
		isAccordion = ( spoiler.parent('.glg-accordion').length > 0 ) ? true : false;

		if ( spoiler.hasClass('glg-spoiler-open') ) {
			if ( !isAccordion ) {
				content.hide(200);
				spoiler.removeClass('glg-spoiler-open');
			}
		}
		else {
			spoiler.parent('.glg-accordion').children('.glg-spoiler').removeClass('glg-spoiler-open');
			spoiler.parent('.glg-accordion').find('.glg-spoiler-content').hide(200);
			content.show(100);
			spoiler.addClass('glg-spoiler-open');
		}
	});
	
	/*-----------------------------------------------------------------------------------
	TABS
	-----------------------------------------------------------------------------------*/
	
	jQuery('.glg-tabs-nav').delegate('span:not(.glg-tabs-current)', 'click', function() {
		jQuery(this).addClass('glg-tabs-current').siblings().removeClass('glg-tabs-current')
		.parents('.glg-tabs').find('.glg-tabs-pane').hide().eq(jQuery(this).index()).show();
	});
	jQuery('.glg-tabs-pane').hide();
	jQuery('.glg-tabs-nav span:first-child').addClass('glg-tabs-current');
	jQuery('.glg-tabs-panes .glg-tabs-pane:first-child').show();

	jQuery('.su-table tr:even').addClass('su-even');
	
	/*-----------------------------------------------------------------------------------
	LOVE-IT
	-----------------------------------------------------------------------------------*/
	
	jQuery('a.love-it').on('click', function() {
			
		var postid = jQuery(this).data('post-id');
		var lovenonce = glg_script_vars.loveNonce;
		
		if(jQuery.cookie('loved-' + postid)) {
			/*jQuery(".love-it-mex").empty();
			jQuery(".love-it-mex").stop().text('You have already loved this item.').fadeTo(500, 1, function() {
				jQuery(".love-it-mex").delay(2000).fadeTo(500,0);
			});*/
			return false;
		}
		
		jQuery.ajax({
			type: 'POST',  
			url: glg_script_vars.wpDir+'/wp-admin/admin-ajax.php',
			data: {
				action: 'glg_process_love',
				itemid: postid,
				loveitnonce: lovenonce
			},
			success: function(data, textStatus, XMLHttpRequest) {
				var count = jQuery('.love-it-counter').text();
				jQuery('.love-it-counter').text(parseInt(count) + 1);
				jQuery('a.love-it').addClass('loved');
				jQuery.cookie('loved-' + postid, 'yes', { expires: 1 });
			},
			error: function(MLHttpRequest, textStatus, errorThrown){  
				/*jQuery(".love-it-mex").empty();
				jQuery(".love-it-mex").text('Sorry, there was a problem processing your request.').fadeTo(500, 1, function() {
					jQuery(".love-it-mex").delay(2000).fadeTo(500,0);
				});*/
			}
		});
		return false;
	});
	
	/*-----------------------------------------------------------------------------------
	CONTACT FORM
	-----------------------------------------------------------------------------------*/
	
	jQuery('#contactForm').live('submit',function() {
		if(jQuery("#contactName").val() != "" && jQuery("#email").val() != "" && jQuery("#commentsText").val() != "") {
			jQuery('#contactForm').hide();
			jQuery("#messages").empty();
			jQuery('#loading').fadeIn();
			var name = jQuery("#contactName").val();
			var email = jQuery("#email").val();
			var comments = jQuery("#commentsText").val();
			jQuery.ajax({
				type: 'POST',  
				url: glg_script_vars.wpDir+'/wp-admin/admin-ajax.php',  
				data: {  
					action: 'glg_send_contact',
					name: name,
					email: email,
					comments: comments 
				},
				success: function(data, textStatus, XMLHttpRequest){  
					jQuery("#loading").hide();
					jQuery("#messages").removeClass('error');
					jQuery("#messages").html('');  
					jQuery("#messages").append(data);
				},
				error: function(MLHttpRequest, textStatus, errorThrown){  
					alert(errorThrown);  
				}
			});
		} else {
			jQuery("#messages").empty();
			jQuery("#messages").addClass('error');
			jQuery("#messages").append('All fields are required!');
		}
	return false;
	});
	
	/*-----------------------------------------------------------------------------------
	ISOTOPE
	-----------------------------------------------------------------------------------*/
	jQuery('.page-template-page-portfolio-php #main, .blog #main, .archive #main, .page-template-page-blog-php #main, .page-template-page-home-php #main').imagesLoaded(function(){
		jQuery('.page-template-page-portfolio-php #main, .blog #main, .archive #main, .page-template-page-blog-php #main, .page-template-page-home-php #main').isotope({
			itemSelector : '#main article.type-portfolio, #main article.type-post'
		});
	});
    
	jQuery('#filters a').click(function(){
		var jQuerythis = jQuery(this);
		var jQueryoptionSet = jQuerythis.parents('#filters');
		jQueryoptionSet.find('.selected').removeClass('selected');
		jQuerythis.addClass('selected');
		var selector = jQuery(this).attr('data-filter');
		jQuery('#main').isotope({filter: selector});
		return false;
	});
	
	if (jQuery('nav#paged.infinite').length > 0){
		jQuery('.page-template-page-portfolio-php #main, .blog #main, .page-template-page-blog-php #main, .page-template-page-home-php #main').infinitescroll({
			navSelector  : 'nav#paged.infinite', 
			nextSelector : 'nav#paged.infinite a',
			itemSelector : '#main article.type-portfolio, #main article.type-post',
			bufferPx : 100,
			loading: {
				finishedMsg: 'No more pages to load.',
				msgText  : 'loading...',
				img: glg_script_vars.tmplDir+'/images/blank.png'
			  }
			},
			function( newElements ) {
			  jQuery('.page-template-page-portfolio-php #main, .blog #main, .archive #main, .page-template-page-blog-php #main, .page-template-page-home-php #main').isotope( 'appended', jQuery( newElements ) ); 
			}
		  );
      }
	
	jQuery(window).bind('orientationchange',function() {
		jQuery('.page-template-page-portfolio-php #main, .blog #main, .archive #main, .page-template-page-blog-php #main, .page-template-page-home-php #main').isotope('reLayout');
	});
	
	jQuery(window).smartresize(function(){
	  jQuery('.page-template-page-portfolio-php #main, .blog #main, .archive #main, .page-template-page-blog-php #main, .page-template-page-home-php #main').isotope('reLayout');
	});
	
	/*-----------------------------------------------------------------------------------
	HEADER SLIDER
	-----------------------------------------------------------------------------------*/
	
	var i = 0,
		animating = false,
		timer = 0,
		delay = 0;
		
	if(jQuery('#slider').attr('data-delay')) delay = jQuery('#slider').attr('data-delay')*1000;
	
	if(jQuery('#slider .feature').length){
		if(jQuery('#slider .feature').length > 1){
			jQuery('.feature-navigation').append('<a href="#" class="prev">Prev</a> <a href="#" class="next">Next</a>');
		}
		
		jQuery('#slider .feature-navigation .next').bind('click', function(){
			if(!animating) next();
			return false;
		});
		jQuery('#slider .feature-navigation .prev').bind('click', function(){
			if(!animating) prev();
			return false;
		});
		
		if(delay){
			clearTimeout(timer);
			timer = setTimeout(function(){ next(); }, delay);
		}
		
		jQuery('#slider').imagesLoaded(function() {
			jQuery('#slider.glg-image .feature').show();
			centerImgs();
			jQuery('#slider.glg-image .feature').hide();
			jQuery('#slider .feature:first-child').fadeIn(200);
		});
		if(jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 9){
			jQuery('#slider .feature:first-child').fadeIn(200); // imagesLoaded doesn't work in IE8
		}
		
		jQuery(window).resize(function(){
        	centerImgs();
        });
	}
	
	function next(){
		animating = true;
		jQuery('#slider .feature:eq('+ i +')').fadeOut(500, function(){
			i++;
			if(i >= jQuery('#slider .feature').length) i = 0;
			jQuery('#slider .feature:eq('+ i +')').fadeIn(500, function(){
				animating = false;
				if(delay) {
					clearTimeout(timer);
					timer = setTimeout(function(){ next(); }, delay);
				}
			});
		});
	}
	
	function prev() {
		animating = true;
		jQuery('#slider .feature:eq('+ i +')').fadeOut(500, function(){
			i--;
			if(i < 0) i = jQuery('#slider .feature').length - 1;
			jQuery('#slider .feature:eq('+ i +')').fadeIn(500, function(){
				animating = false;
				if(delay){
					clearTimeout(timer);
					timer = setTimeout(function(){ next(); }, delay);
				}
			});
		});
	}
	
	function centerImgs() {
		jQuery('#slider.glg-image .feature').each(function(){
			var img = jQuery(this).find('img'),
			    vpWidth = jQuery(window).width(),
			    vpHeight,
			    imgHeight = img.attr('height'),
		        imgWidth = img.attr('width'),
		        imgAspectRatio = imgWidth / imgHeight,
		        vpAspectRatio,
		        newImgWidth,
		        newImgHeight = vpWidth / imgAspectRatio;
  
		    if( vpWidth <= 660 ) {
		        vpHeight = 300;
		        newImgWidth = imgWidth * vpHeight / imgHeight;
		    } else if( vpWidth > 660 && vpWidth <= 1000 ) {
		        vpHeight = 400;
		        newImgWidth = imgWidth * vpHeight / imgHeight;
		    } else {
		        vpHeight = 600;
		        newImgWidth = imgWidth * vpHeight / imgHeight;
		    }
		    
		    vpAspectRatio = vpWidth / vpHeight;
		        					
			if( vpAspectRatio <= imgAspectRatio ) {
			    img.css({
			        'margin-top': 0,
			        'width': newImgWidth,
			        'height': '100%',
			        'margin-left': (vpWidth - newImgWidth)/2
			    });
		    } else {
			    img.css({
			        'width': '100%',
			        'height': newImgHeight,
			        'margin-left': 'auto',
			        'margin-top': (vpHeight - newImgHeight)/2
			    });
		    }
		});
	}
	
});