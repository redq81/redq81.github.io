function printGMap() {
	var coords = window.myGMap.getCenter();
	window.open('/contact_print.php?z=' + window.myGMap.getZoom() + '&lat=' + coords.lat() + '&lng=' + coords.lng() + '&type=' + window.myGMap.getMapTypeId(),'_blank');
}

window.myGMapCenter = new google.maps.LatLng(53.41677079125823,50.161728858947754);
window.myGMapNeedOffset = true;
window.myGMapType = 'roadmap';

function initialize() {
	// аДаОаБаАаВаИаЛ аМаЕбаОаД баЕаНббаИбаОаВаАаНаИб аПаО баМаЕбаЕаНаИб
	google.maps.Map.prototype.setCenterWithOffset= function(latlng, offsetX, offsetY) {
	    var map = this;
	    var ov = new google.maps.OverlayView();
	    ov.onAdd = function() {
	        var proj = this.getProjection();
	        var aPoint = proj.fromLatLngToContainerPixel(latlng);
	        aPoint.x = aPoint.x+offsetX;
	        aPoint.y = aPoint.y+offsetY;
	        map.setCenter(proj.fromContainerPixelToLatLng(aPoint, true));
	    }; 
	    ov.draw = function() {}; 
	    ov.setMap(this); 
	};

	// ббаНаКбаИб баЕаНббаИбаОаВаАаНаИб аКаАббб
	var centerMap = function (map, firstRun) {
		if (firstRun && window.myGMapNeedOffset) {
			map.setCenterWithOffset(window.myGMapCenter, 0, 150);
		} else {
			map.setCenter(window.myGMapCenter);
		}
		
	}

	// аКаОаОбаДаИаНаАбаА аКаОаМаПаАаНаИаИ
	var coordLatLng = new google.maps.LatLng(53.41677079125823,50.161728858947754);

	var mapOptions = {
	  mapTypeId: window.myGMapType,
	  center: window.myGMapCenter,
	  zoom: 11,
	  draggable: true,
	  scrollwheel: false,
	  scaleControl: false,
	  panControl: false,
	  zoomControl: false,
	  streetViewControl: false,
	  disableDoubleClickZoom: true
	};

	// аИаНаИбаИаАаЛаИаЗаАбаИб аКаАббб
	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	window.myGMap = map;
	centerMap(map, true);

	// аОббаИбаОаВаКаА аМаАбаКаЕбаА
	var marker = new google.maps.Marker({
	    position: coordLatLng,
	    map: map,
	    title:"аЁаОаКбаКаОаЕ ааАббаЕбаОбаПбаАаВаЛаЕаНаИаЕ"
	});
	var content = '<b>аЁаОаКбаКаОаЕ ааАббаЕбаОбаПбаАаВаЛаЕаНаИаЕ</b>';					

    function infoCallback(infowindow, marker) { 
        return function() {
        	infowindow.open(map, marker);
    	}
    }
    var infowindow = new google.maps.InfoWindow();
      infowindow.setContent(content);
      google.maps.event.addListener(
        marker, 
        'click', 
        infoCallback(infowindow, marker)
      );

    // аОаБбаАаБаОббаИаКаИ аЗбаМаА
	$('.map-overlay .zoom-in').click(function (e) {
		e.preventDefault();
		map.setZoom(map.getZoom()+1);
	});

	$('.map-overlay .zoom-out').click(function (e) {
		e.preventDefault();
		map.setZoom(map.getZoom()-1);
	});

    // аОаБбаАаБаОббаИаК аПаЕбаЕбаИбаОаВаКаИ аКаАббб
	function reloadMap() {
		centerMap(map);
	}

	$(window).resize(function () {
		bufferedDelay('google_map_resize', 300, reloadMap);
	});

	google.maps.event.addListener(map, 'center_changed', function() {
		window.myGMapCenter = map.getCenter();
	});

	if ($('html').hasClass('touch')) {
		map.setOptions({draggable: false});

		var dragX,dragY;
		var touches = {};
		var numTouches = 0;
		$('#map-canvas').on('touchstart', function(e) {
			ev = e.originalEvent;

			$.each(ev.changedTouches, function (index, touch) {
				touches[touch.identifier] = { x: touch.pageX, y: touch.pageY };
				numTouches++;
			});

			if (numTouches > 1) {
				ev.preventDefault();
				ev.stopPropagation();

				dragX = ev.pageX;
				dragY = ev.pageY;
			}

		});

		$('#map-canvas').on('touchend', function(e) {
			ev = e.originalEvent;

			$.each(ev.changedTouches, function (index, touch) {
				delete touches[touch.identifier];
				numTouches--;
			});
		});


		$('#map-canvas').on('touchmove', function(e) {
			ev = e.originalEvent;

			if (numTouches > 1) {
				ev.preventDefault();
				ev.stopPropagation();

				bufferedDelay('google_map_pan', 10, function () {
					deltaX = dragX - ev.pageX;
					deltaX = deltaX > 0 ? Math.min(deltaX, 50) : Math.max(deltaX, -50);
					deltaY = dragY - ev.pageY;
					deltaY = deltaY > 0 ? Math.min(deltaY, 50) : Math.max(deltaY, -50);
					map.panBy(deltaX, deltaY);
					dragX = ev.pageX;
					dragY = ev.pageY;
				});
			}
		});
	}
}

google.maps.event.addDomListener(window, 'load', initialize);
