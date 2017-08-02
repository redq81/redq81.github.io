$(document).ready(function(){
	initMap();
	 



	 $(".sticky_column").stick_in_parent();
	  $('.sticky_column')
	.on('sticky_kit:bottom', function(e) {
	    $(this).parent().css('position', 'static');
	})
	.on('sticky_kit:unbottom', function(e) {
	    $(this).parent().css('position', 'relative');
	})



    
	$("#menu a")
	 	.map(function(){
	  		return $(this).attr("href");	
		})

	 	.each(function(index,selector){
	 		new Waypoint({
	  			element: $(selector).get(),
	 			handler: function(direction) {
	 				$("#menu li").removeClass("current");
	    			var current_item;
	    			if(direction=="down"){
	    				current_item = $("#menu [href=\"" + selector+ "\"]").closest("li");
	    			} else {
	    				var menu_item = $("#menu [href=\"" + selector+ "\"]").closest("li");
	    				if(menu_item.prev().lenght){
	    					current_item = menu_item.prev();
	    				} else {
	    			   		current_item = menu_item;
	    				}
	    			}
	    			current_item.addClass("current");
	  			}
			})
		})
	;	
		
	


	function initMap() {
	  // Create a map object and specify the DOM element for display.
	  var map = new google.maps.Map(document.getElementById('map-canvas'), {
	    center: {lat: 53.1826689, lng: 50.1062461},
	    scrollwheel: false,
	    zoom: 17
	  });
	  var marker = new google.maps.Marker({
	    position: {lat: 53.1826503, lng: 50.1062514},
	    map: map,
	    title: 'Магазин-склад посуды и хозтоваров'
	  });

	}

});