/**
 * jQuery Horizontal Navigation 1.0
 * https://github.com/sebnitu/horizontalNav
 *
 * By Sebastian Nitu - Copyright 2012 - All rights reserved
 * Author URL: http://sebnitu.com
 */
(function($) {
	
	$.fn.horizontalNav = function(options) {
				
		// Extend our default options with those provided.
		var opts = $.extend({}, $.fn.horizontalNav.defaults, options);
		
		return this.each(function () {
		
			// Save our object
			var $this = $(this);
			
			// Build element specific options
			// This lets me access options with this syntax: o.optionName
			var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
			
			// Save the wrapper. The wrapper is the element that
			// we figure out what the full width should be
			if ($this.is('ul')) {
				var ul_wrap = $this.parent();
			} else {
				var ul_wrap = $this;
			}
			
			// let's add some clearfixing to the ul wrapper
			ul_wrap.css({ 'zoom' : '1' }).append('<span class="clearHorizontalNav">').find('.clearHorizontalNav').css({
				'display' : 'block',
				'overflow' : 'hidden',
				'visibility' : 'hidden',
				'width' : 0,
				'height' : 0,
				'clear' : 'both',
			});
			
			// Grab elements we'll need and add some default styles
			var ul = ul_wrap.find('> ul').css({ 'float' : 'left' }), // The unordered list element
				li = ul.find('> li').css({ 'float' : 'left' }), // All list items
				li_last = li.last(), // Last list item
				li_count = li.size(), // The number of navigation elements
				li_a = li.find('> a').css({ 'padding-left' : 0, 'padding-right' : 0 }); // Remove padding from the links
	
			// If set to responsive, re-construct after every browser resize
			if ( o.responsive === true ) {
				resizeTrigger( _construct );
			}
	
			// Initiate the plugin
			_construct();
			
			// Returns the true inner width of an element
			// Essentially it's the inner width without padding.
			function trueInnerWidth(element) {
				return element.innerWidth() - ( 
					parseInt(element.css('padding-left')) + parseInt(element.css('padding-right')) 
				);
			}
			
			// Call funcion on browser resize
			function resizeTrigger(callback, delay) {
				// Delay before function is called
				delay = delay || 100;	
				// Call function on resize
				var resizeTimer;
				$(window).resize(function() {
					clearTimeout(resizeTimer);
					resizeTimer = setTimeout(function() {
						callback();
					}, delay);
				});
			}
			
			// The heavy lifting of this plugin. This is where we
			// find and set the appropriate widths for list items
			function _construct() {
				// Reset some styles
				li.css({ 'width' : 'auto' });
				
				// Grabbing widths and doing some math
				var ul_width = trueInnerWidth(ul),
					ul_width_outer = ul.outerWidth(true),
					ul_width_extra = ul_width_outer - ul_width,
					
					full_width = trueInnerWidth(ul_wrap),
					extra_width = (full_width - ul_width_extra) - ul_width,
					li_padding = Math.floor( extra_width / li_count );
				
				// Cycle through the list items and give them widths
				li.each(function() {
					var li_width = trueInnerWidth( $(this) );
					$(this).css({ 'width' : (li_width + li_padding) });
				});
				
				// Get the leftover pixels after we set every itms width
				// and add the leftovers to the last navigation item
				var li_last_width = trueInnerWidth(li_last) + ( (full_width - ul_width_extra) - trueInnerWidth(ul) );
				li_last.css({ 'width' : li_last_width });
			}
		
		}); // @end of return this.each()

	};
	
	$.fn.horizontalNav.defaults = {
		responsive : true
	};
	
})(jQuery);