$.validator.setDefaults({ 
	errorPlacement: function (error, $element) {
		var $controlGroup = $element.closest('.form-group'),
			trigger = 'focus';
		
		if (!error.is(':empty')) { 
			var $modal = $element.closest('.modal'),
				container = $modal.length>0? '.modal' : 'body',
				placement = 'top' //$element.position().left+$element.outerWidth()+200<$(window).width()? 'right' : 'left';
			
			if ($element[0].tagName=='SELECT') {
				trigger =  'hover';
			}
			$controlGroup.addClass('has-error');
			
			// Remove tooltip if error message is not the same
			if ($element.data('bs.tooltip') && error.text() != $element.data('bs.tooltip').options.title) {
				$element.tooltip('destroy');
				$('.tooltip.error').remove();
			}
			
			// Apply the tooltip only if it isn't valid 
			if (!$element.data('bs.tooltip')) {
				$element.filter(':not(.valid)').tooltip({ 
					template: '<div class="tooltip error"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
					trigger: trigger,
					placement: placement,
					animation: false,
					title: error.html(),
					container:container
				});
			}
			
			//Si el campo que valida es HIDDEN lo ubica por el padre
			if ($element.attr('type')=='hidden') {
				var $modal = $element.closest('.modal');
				if ($modal) {
					$modal.scrollTop($element.closest('.form-group').position().top);
				}else{
					$('body').scrollTop($element.closest('.form-group').offset().top);
				}
			}
		} else { // If the error is empty, remove the tooltip 
			$element.tooltip('destroy'); 
			$('.tooltip.error').remove();
			$controlGroup.removeClass('has-error'); 
		}
	},
	success: $.noop
});