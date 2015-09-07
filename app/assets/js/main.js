
var dashboard = function($) {

	$(document).ready(function() {

		/* ----------------------------------------------------------------------
		 * Global page click handler
		 * ----------------------------------------------------------------------*/
		 $(document).on('click', function(e) {

		 	// Delete active popovers when the page is clicked,
		 	// but make sure popover is NOT deleted if itself has been clicked
			if ($(e.target).parents('.popover').length >= 1) {
				e.stopPropagation();
			} else {
				$('.popover').remove();
			}

		 });

		/* ----------------------------------------------------------------------
		 * Checkboxes
		 * ----------------------------------------------------------------------*/
		$(".check-box-item").click(function() {
			// Check if the clicked checkbox is a select-all or standard checkbox
			if ($(this).hasClass('check-all')) {
				var group = $(this).parents('.check-box-group');
				// Toggle all of the checkboxes in the group
				if ($(this).hasClass('item-selected')) {
					group.find('.check-box-item').removeClass('item-selected');
				} else {
					group.find('.check-box-item').addClass('item-selected');
				}
			} else {
				// Toggle individual checkbox
				$(this).toggleClass("item-selected");
			}

		});

		/* ----------------------------------------------------------------------
		 * Radio buttons
		 * ----------------------------------------------------------------------*/
		$(".radio-button-item").click(function() {
			$(this).parents('.radio-button-group').find(".radio-button-item").removeClass("item-selected");
			$(this).addClass("item-selected");
		});

		/* ----------------------------------------------------------------------
		 * Multi click
		 * ----------------------------------------------------------------------*/
		$(".multi-click").click(function() {
			$(this).toggleClass("item-selected");
		});	

		/* ----------------------------------------------------------------------
		 * Single click
		 * ----------------------------------------------------------------------*/
		$(".single-click").click(function() {
			$(".single-click").removeClass("item-selected");
			$(this).addClass("item-selected");
		});

		/* ----------------------------------------------------------------------
		 * Single dropdown
		 * ----------------------------------------------------------------------*/
		$(".single-dropdown").click(function() {
			$(this).toggleClass("open")
		});

		/* ----------------------------------------------------------------------
		 * Radio buttons that toggle sections within a form
		 * ----------------------------------------------------------------------*/
		$('.radio-pane').css('display', 'none');
		$('.radio-toggle').on('click', function() {
			var form = $(this).parents('.form');
			var group = $(this).attr('radio-name');
			var target = $(this).attr('radio-pane');
			// hide all panes
			form.find('.radio-pane[radio-name="'+group+'"]').hide();
			// show activated pane
			form.find('.radio-pane[radio-pane="'+target+'"]').show();
		});

		/* ----------------------------------------------------------------------
		 * Editable buttons make text into text areas
		 * ----------------------------------------------------------------------*/
		$('.editable-form').hide();
		$('.edit-btn').on('click', function(e) {
			e.preventDefault();
			var editable = $(this).parents('.editable');
			editable.find('.editable-body').hide();
			editable.find('.editable-form').show();
			editable.find('.editable-toggle').hide();
		});
		$('[data-close="editable"]').on('click', function(e) {
			e.preventDefault();
			var editable = $(this).parents('.editable');
			editable.find('.editable-body').show();
			editable.find('.editable-form').hide();
			editable.find('.editable-toggle').show();
		});


		/* ----------------------------------------------------------------------
		 * Chosen select plugin for <select> elements
		 * ----------------------------------------------------------------------*/
		 $('.chosen').chosen({
		 	disable_search_threshold: 10,
		 	no_results_text: "no results found",
		 	width: '100%',
		 	placeholder_text_single: 'Please select'
		 });

		/* ----------------------------------------------------------------------
		 * Popovers for links to pages that aren't production ready
		 * ----------------------------------------------------------------------*/
		$('.popover-cs').click(function(e) {
			e.preventDefault();
			e.stopPropagation();
			// Check if any popovers already exist on page and remove them
			if ($('.popover').length >= 1) {
				// Remove all other popovers
				$('.popover').remove();
			}
			// Initialize and show a popover when clicked
			$(this).popover({
				title: 'Dashboard Coming Soon',
				content: 'These results are not available until all Shopper Experience surveys are complete. We expect you will have access to these from early November.',
				trigger: 'manual'
			}).popover('show');
		});

		/* ----------------------------------------------------------------------
		 * Animated page scroller
		 * ----------------------------------------------------------------------*/
		$(".page-scroll").on('click', function(e) {
		    e.preventDefault();
		    var section = $(this).attr("href");
		    $("html, body").animate({
		        scrollTop: $(section).offset().top
		    });
		});

		/* ----------------------------------------------------------------------
		 * Tooltip
		 * ----------------------------------------------------------------------*/
		$('.ttip').tooltip();


		/* ----------------------------------------------------------------------
		 * DataTables
		 * ----------------------------------------------------------------------*/
		$.extend( $.fn.dataTable.defaults, {
	        "bFilter": false
	    });

		$('.datatable').dataTable({
			"iDisplayLength": 20,
			"bJQueryUI": true,
        	"sPaginationType": "full_numbers",
        	aaSorting: []
		});

		/* ----------------------------------------------------------------------
		 * FAQ collapse helpers
		 * ----------------------------------------------------------------------*/
		 $('.faq-collapse-toggle').on('click', function() {
		 	// check we have an icon
		 	if ($(this).children('.fa')) {
		 		// The local icon to-be-edited
		 		var icon = $(this).children('.fa');
		 		// Toggle the icon to open position
			 	if (icon.hasClass('fa-caret-right')) {
			 		// reset all icons to default position
		 			$(this).parents('.panel-group').find('.fa').addClass('fa-caret-right').removeClass('fa-caret-down');
			 		// Toggle the clicked link
			 		icon.addClass('fa-caret-down').removeClass('fa-caret-right');
			 	// Toggle the icon to closed position
			 	} else if (icon.hasClass('fa-caret-down')) {
			 		icon.addClass('fa-caret-right').removeClass('fa-caret-down');
			 	}
		 	} 
		 });
		 $('.faq-section-toggle').on('click', function() {
		 	var icon = $(this).find('.fa');
			if (icon.hasClass('fa-plus')) {
				icon.addClass('fa-minus').removeClass('fa-plus');
			} else if (icon.hasClass('fa-minus')) {
				icon.addClass('fa-plus').removeClass('fa-minus');
			}
		 });

		/* ----------------------------------------------------------------------
		 * Toggle group - toggle a group of elements with a navigation element.
		 * Can be used for tabs, accordions & collapsible elements etc.
		 * ----------------------------------------------------------------------*/
		 $('[pp-toggle="toggleGroup"]').on('click', function(e) {
		 	e.preventDefault();
		 	var target = $(this).attr('pp-toggle-target');
		 	if ($(this).attr('pp-toggle-parent')) {
		 		var parent = $(this).attr('pp-toggle-parent');
		 	} else {
		 		var parent = 'false';
		 	}

		 	console.log(parent);

		 	// Function can be applied to both groups or single targets
		 	if (parent == 'false') {
			 	// Toggle a single target
		 		if ($(target).hasClass('hidden')) {
			 		// Show the target
			 		$(target).removeClass('hidden');
			 	} else {
			 		// Hide the target
			 		$(target).addClass('hidden');
			 	}

		 	} else {
		 		// Hide all elements in the group
			 	$(target).parents('.toggle-group').find('.toggle-pane').removeClass('active');
			 	// Show the targeted element
			 	$(target).addClass('active');
		 		
		 	}

		 });

		/* ----------------------------------------------------------------------*
		 * Scrolling Sidebar Navigation
		 * ----------------------------
		 * Make the sidebar navigation float with the page inside the sidebar
		 * layout pages.
		 * ----------------------------------------------------------------------*/
		$(window).on('scroll', function() {
			// Variables to control the scrolling element
			var windowScroll = {
				top : $(this).scrollTop(),
				bottom: $(this).scrollTop() + $(window).height()
			};
			var contentHeight = $('.wrapper').height();
			var scrollingElements = $('.scrolling-sidebar-nav');
			// Check for scrolling elements on the page
			if (scrollingElements.length > 0) {
				// Scroll the element
				scrollingElements.each(function() {
					var $this = $(this)
					var defaultPosition = $this.attr('scroll-offset');
					var offset = $this.attr('scroll-top-margin');
					scrollElement(windowScroll, contentHeight, $this, offset, defaultPosition);
				});
			}
		});
		// Scroll the navbar
		function scrollElement(windowScroll, contentHeight, element, offset, defaultPosition) {
			// Calculate when to start floating with the scroll position
			var scrollStart = defaultPosition - offset;
			// stick element to top of page when scrolling down
			if (windowScroll.top >= scrollStart) {
				element.css('top', offset+'px');
			// place element back in flow when above fold
			} else if (windowScroll.top > 0) {
				// reset position when overscrolling down (chrome)
				if (windowScroll.bottom > contentHeight) {
					element.css('top', defaultPosition + 'px');
				// keep element in same position when scrolling above start point
				} else {
					element.css('top', defaultPosition - windowScroll.top + 'px');
				}
			// keep in the same position when overscrolling up (chrome)
			} else if (windowScroll.top < 0) {
				element.css('top', defaultPosition + 'px');
			}
		}


	});// End document ready

}(jQuery);
// End dashboards
