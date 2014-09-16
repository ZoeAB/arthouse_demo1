jQuery(function(){
	initStyleSwitcher();
})

function initStyleSwitcher(){
	/* Variables */
	var switcher = jQuery('.style-switcher'),
		colors = switcher.find('.switcher-color-scheme.colors a'),
		patterns = switcher.find('.switcher-color-scheme.patterns a'),
		layouts = switcher.find('.switcher-layouts a'),
		opener = switcher.find('.opener'),
		body = jQuery(document.body),

		styleSelecter = jQuery('#style_selector'),
		derictory = styleSelecter.data('derictory');

		activeClass = 'active',
		collaspedClass = 'collapsed';

	/* Methods */
	var colorChange = function(e){
			var $this = jQuery(this),
				themeColor = $this.data().colorClass;

			if(themeColor == 'red-theme') {
				styleSelecter.html('');
			} else {
				styleSelecter.html('@import url("' + derictory + '/'+themeColor+'.css")');
			}

			e.preventDefault();
		},

		patternChange = function(e){
			var $this = jQuery(this),
				themePattern = $this.data().pattern;

			body.css({
				'background-image':'url("' + themePattern + '")'
			});

			e.preventDefault();
		},

		layoutChange = function(e){
			var $this = jQuery(this),
				carousel = jQuery('#main-carousel'),
				wideLayout = $this.data().wide,
				boxedClass = 'carousel-alt';

			if(!!wideLayout) {
				carousel.removeClass(boxedClass);
				body.removeClass('boxed');
			} else {
				carousel.addClass(boxedClass);
				body.addClass('boxed');
			}

			layouts.removeClass(activeClass);
			$this.addClass(activeClass);

			e.preventDefault();

		},

		toggleSwitcher = function(e){
			switcher.toggleClass(collaspedClass);
			e.preventDefault();
		}



	opener.on('click', toggleSwitcher);
	colors.on('click', colorChange);
	patterns.on('click', patternChange);
	layouts.on('click', layoutChange);

}