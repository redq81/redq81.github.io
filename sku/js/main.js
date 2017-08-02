'use strict';

function em(input) {
    var emSize = parseFloat($("body").css("font-size"));
    return (emSize * input);
}

$(function () {
	var mainMenu = $('.top-menu');

	// аИаНаИбаИаАаЛаИаЗаАбаИб аПаЛаАаВаНаОаГаО баКбаОаЛаЛаИаНаГаА аПбаИ аКаЛаИаКаЕ аНаА аЛаОаКаАаЛбаНбаЕ бббаЛаКаИ
	$.localScroll({ duration: 250, margin: true });

	var getDeviceOrientation = function () {
		return ($(window).width() > $(window).height()) ? 90 : 0;
	};

	// аПаЕбаЕбаОаД аК баАаЗаДаЕаЛб аКаОбаОббаЙ аПбаОбаМаАббаИаВаАаЛбб аПаОбаЛаЕ баМаЕаНб аОбаИаЕаНбаАбаИаИ
	var contentSections = $('#header,div, article,#main-body, #content > div').filter('[id]');
	contentSections.find('h2').remove();
	var contentSectionsAliases = contentSections.map(function () { return this.id }).toArray();
	var current = contentSections[0];
	var lastOrientation = getDeviceOrientation();
	var isTouch = $('html.touch').length > 0;
	$(window).resize(function () {
		var currentOrientation = getDeviceOrientation();
		if (isTouch && (lastOrientation != currentOrientation) || !isTouch) {
			contentSections.waypoint('disable');
			setTimeout(function () {
				$.scrollTo(current, {
					margin: true,
					onAfter: function () {
						lastOrientation = currentOrientation;
						contentSections.waypoint('enable');
					}
				});
			}, 350);
		}
	});
	contentSections.waypoint(function (direction) {
		var el = $(this);
		var newId = el.attr('id');
		if (direction === 'up') {
			var elIndex = contentSectionsAliases.indexOf(newId);
			if (elIndex > 0) {
				current = $(contentSections[elIndex-1]);
			}
		} else {
			current = el;
		}

		var menuItems = mainMenu.find('li');
		menuItems.removeClass('active');
		menuItems.find('a[href="#' + current.attr('id') + '"]').parent().addClass('active');
	}, { continuous: false, offset: 200 });

	var checkWidth = function () {
		return $(window).width() < 768;
	};

    // аОаБбаАаБаОбаКаА аОбаЗбаВбаИаВаОаГаО аМаЕаНб
    var navButton = $('.navbar-button');
    var navMenu = navButton.next('ul');

    $(document).on('click touchstart', function (e) {
            var clickedInHeader = $(e.target).closest('header').length > 0;
            if (!clickedInHeader && navButton.is(':visible') && navMenu.is('.visible')) {
                    navMenu.removeClass('visible');
            }
    });

    navButton.click(function () {
            navMenu.toggleClass('visible');
    });

    navMenu.find('a').click(function () {
            if (navButton.is(':visible')) {
                    navMenu.removeClass('visible');
            }
    });

	// // аОбаКаЛббаАаЕаМ аПаЛаАаВаАббаЕаЕ аМаЕаНб аНаА ббббаОаЙббаВаАб б баАб баКбаИаНаОаМ
	// var positionMenu = function () {
	// 	if (checkWidth()) {
	// 		mainMenu.css('top', $(window).scrollTop());
	// 	} else {
	// 		mainMenu.css('top', 0);
	// 	}
	// };

	// positionMenu();
	// mainMenu.addClass('stuck');

	// $(document).on('touchstart', function (e) {
	// 	if (checkWidth() && $(e.target).is(':not(.main-menu button, .main-menu a)')) {
	// 		mainMenu.addClass('hidden');		
	// 	}

	// 	bufferedDelay('main_menu_show', 75, function () {
	// 	});
	// });

	// $(document).on('scroll touchend', function () {
	// 	if (!checkWidth()) {
	// 		return true;
	// 	}

	// 	mainMenu.addClass('hidden');		

	// 	bufferedDelay('main_menu_show', 75, function () {
	// 		positionMenu();
	// 		mainMenu.removeClass('hidden');
	// 	});
	// });

	// $(document).on('touchend', function () {
	// 	if (!checkWidth()) {
	// 		return true;
	// 	}
	// 	bufferedDelay('main_menu_show', 75, function () {
	// 		positionMenu();
	// 		mainMenu.removeClass('hidden');
	// 	});
	// });

	// $(window).resize(function () {
	// 	positionMenu();
	// });

	// аОаБбаАаБаОбаКаА баИаНбаА аНаА аКаАббаЕ
	var gestureHint = $('.map-gesture-hint');
	var gestureHintDisabled = docCookies.getItem('no-gesture-hint');
	if (gestureHintDisabled) {
		gestureHint.hide();		
	} else {
		gestureHint.one('click touchstart', function () {
	                gestureHint.fadeOut(500);
	                docCookies.setItem('no-gesture-hint', 1, 60 * 60 * 24 * 365);
	                gestureHintDisabled = true;
		});
        };


	$(window).scrollTop(0);
});
