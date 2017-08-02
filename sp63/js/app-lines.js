$(document).ready(function(){
	$('.header-bottom_dropdown-menu_trigger, .header-bottom_dropdown-menu ').hover(
       function(){ 
       		if($("body").outerWidth(true)>1023){
       			$('.header-bottom_dropdown-menu').addClass('hover');
	       		$(".zero-org-sbor").addClass("highlighted");
	       		$(".dropdown_trigger_li").addClass("bg-black");
       		}
       		
        },
       function(){ 
       		$('.header-bottom_dropdown-menu').removeClass('hover');
       		$(".zero-org-sbor").removeClass("highlighted");
       		$(".dropdown_trigger_li").removeClass("bg-black");
       	 }
	);




	$(".filters_price_dropdown_trigger").click(
       function (event) {
       		event.preventDefault();
       		if($('.price-dropdown').hasClass("hover")){
       			$(".price-dropdown").removeClass('hover');
       		} else {
       			$('.price-dropdown').addClass("hover");
       		};
       }
	);

	
	$('.chip_selected-filters_link').click(
       function (event) {
       		event.preventDefault();
       		if($('body').hasClass("blurry-content")){
       			$('body').removeClass("blurry-content");
       			$(".filters-dropdown").removeClass('hover');
       			$(".blur-overlay").addClass("hidden");
       		} else {
       			$('body').addClass("blurry-content");
       			$(".filters-dropdown").addClass('hover');
       			$(".blur-overlay").removeClass("hidden");
       		};
       }
	);


	$(".blur-overlay").click(
		function (event) {
       		event.preventDefault();
       		if($('body').hasClass("blurry-content")){
       			$('body').removeClass("blurry-content");
       			$(".blur-overlay").addClass("hidden");
       			$(".filters-dropdown").removeClass('hover');
       		} 
       });

	$('.mobile-menu-open').click(
       function (event) {
       		event.preventDefault();
       		$("#menu_mobile").removeClass("hidden");
       }
	);
	$('.menu_mobile-close').click(
       function (event) {
       		event.preventDefault();
       		$("#menu_mobile").addClass("hidden");
       }
	);
	

	$('.menu_mobile-user-open').click(
       function (event) {
       		event.preventDefault();
       		$("#menu_mobile-user").removeClass("hidden");
       }
	);
	$('.menu_mobile-user-close').click(
       function (event) {
       		event.preventDefault();
       		$("#menu_mobile-user").addClass("hidden");
       }
	);


	$( ".full-description_dropdown-trigger" ).click(function() {
	  $( '.full-description_dropdown-block' ).toggleClass( "hover" );
	  Waypoint.refreshAll();
	   $( ".full-description_dropdown-trigger").toggleClass( "pushed" );
	  $( '.full-description_dropdown-trigger .arrow-up,.full-description_dropdown-trigger .arrow-down').toggleClass("hidden");
	});

	$( ".mobile-filter_filter" ).click(
		function (event) {
       		event.preventDefault();
       		$( '.mobile-filters_dropdown' ).toggleClass( "hover" );
       		$(".mobile-filters-size_holder").css("height",$('.mobile-filters_sticky-container').outerHeight(true));   
	});

	$('.fast-view_button').magnificPopup({
		items: {
	      	src: '#popup',
	     	type: 'inline',
	      	preloader: false,
			modal: true,
			closeBtnInside:false,
			midClick: true
	  	},
	  	 callbacks: {
		    open: function() {
		      // Will fire when this exact popup is opened
		      // this - is Magnific Popup object
		          var galleryTop = new Swiper('.gallery-top', {
			        nextButton: '.swiper-button-next',
			        prevButton: '.swiper-button-prev',
			        spaceBetween: 10,
			    });
			    var galleryThumbs = new Swiper('.gallery-thumbs', {
			        spaceBetween: 10,
			        centeredSlides: true,
			        slidesPerView: 'auto',
			        touchRatio: 0.2,
			        slideToClickedSlide: true
			    });
			    galleryTop.params.control = galleryThumbs;
			    galleryThumbs.params.control = galleryTop;
		    }
		}
		
	});

	


	$('#close_popup').on( "click", function() {
	  $.magnificPopup.close();
	});


	var galleryTop = new Swiper('.product_gallery-top', {
					        nextButton: '.swiper-button-next',
					        prevButton: '.swiper-button-prev',
					        spaceBetween: 10,
					    });
	var galleryThumbs = new Swiper('.product_gallery-thumbs', {
	    spaceBetween: 10,
	    centeredSlides: true,
	    slidesPerView: 'auto',
	    touchRatio: 0.2,
	    slideToClickedSlide: true
	});
	galleryTop.params.control = galleryThumbs;
	galleryThumbs.params.control = galleryTop;

	var sticky_filters = new Waypoint({
	  element: document.getElementById('sticky-filters_trigger'),
	  handler: function(direction) {
	  	if(direction == "down"){
	  		$('.lot-filters').addClass('fixed');

	  	} else {
	  		$('.lot-filters').removeClass('fixed');
	  	}
	  },
	  offset: 94

	});

	// var sticky_filters = new Waypoint({
	//   element: document.getElementById('mobile-filters_container-sticky-trigger'),
	//   handler: function(direction) {
	//   	if(direction == "down"){
	//   		$('.mobile-filters_sticky-container').addClass('sticked');
	//   		$(".mobile-filters-size_holder").css("height",$('.lot-filters_tablet').outerHeight(true));

	//   	} else {
	//   		$('.mobile-filters_sticky-container').removeClass('sticked');
	//   		$(".mobile-filters-size_holder").css("height",$('.lot-filters_tablet').outerHeight(true)); 
	//   	}
	//   },
	//   offset: 40

	// });




//  Надо добавить debounce
	function checkSizeForSticky(){
		if($("body").outerWidth(true)<1024){
			$(".catalog-caterory-hierarchy-tree").trigger("sticky_kit:detach");
		} else {
			$(".catalog-caterory-hierarchy-tree").stick_in_parent({
			  parent: "#lots-section"
			});
		}
	}

	checkSizeForSticky();
	$(window).resize(checkSizeForSticky);


	function headerMenuSearchSize(){
		if($("body").outerWidth(true)>767){
			$(".header-bottom-menu-right_part").css("width", $(".header-bottom_menu-wrapper").width() - $(".header-bottom-menu-left_part").outerWidth(true) - 20 );
		} else {
			$(".header-bottom-menu-right_part").css("width", "100%" );
		}
	}
	
	headerMenuSearchSize();
	$(window).resize(headerMenuSearchSize);

	$(".catalog-caterory-hierarchy-tree")
	  .on("sticky_kit:stick", function(e) {
	    // console.log("has stuck!", e.target);

	       $(function(){
		      //Keep track of last scroll
		      var lastScroll = 0;
		      var top_offset = $(".lot-filters ").outerHeight(true) + 20 ;
		      $(window).scroll(function(event){

		          //Sets the current scroll position
		          var st = $(this).scrollTop();
		          //Determines up-or-down scrolling
		          if (st > lastScroll){
		             //Replace this with your function call for downward-scrolling
		             $(".catalog-caterory-hierarchy-tree.is_stuck").css("margin-top",0);
		            
		          }
		          else {
		             //Replace this with your function call for upward-scrolling
		             $(".catalog-caterory-hierarchy-tree.is_stuck").css("margin-top",top_offset);
		            
		          }
		          //Updates scroll position
		          lastScroll = st;
		      });
		    });
	    
	    
	  })
	  // .on("sticky_kit:unbottom", function(e) {
	  //   console.log("unbottom", e.target);
	  //   var top_offset = $(".lot-filters ").outerHeight(true) + 20 ;
	  //   $(".catalog-caterory-hierarchy-tree.is_stuck").css("margin-top",top_offset);
	  // })
	  //  .on("sticky_kit:bottom", function(e) {
	  //   console.log("bottom", e.target);
	  //   var top_offset = $(".lot-filters ").outerHeight(true) + 20 ;
	  //   $(".catalog-caterory-hierarchy-tree.is_stuck").css("margin-top",top_offset);
	  // })
	  .on("sticky_kit:unstick", function(e) {
	    // console.log("has unstuck!", e.target);
	    $(".catalog-caterory-hierarchy-tree").css("margin-top",15);
	  });


	$('.lot-item').hover(
       function lotItemHoverBegins(){ 
	       	
	       		$('.lot_item_thumb').click(function(){
		       	 	var image = $(this).css( "background-image" );
		       	 	var	lot_item = $(this).closest('.lot-item');
		       	 	var image_wrapper = lot_item.find(".lot-item_image_wrapper") ;
		       	 	image_wrapper.css("background-image", image);
		       	});
        },
       function lotItemHoverEnds(){ 
       		$('.lot_item_thumb').off("click");
       	 }
	);


	$('.lines_view_lot-item').hover(
       function lotItemHoverBegins(){ 
	       	
	       		$('.lot_item_thumb').click(function(){
		       	 	var image = $(this).css( "background-image" );
		       	 	var	lot_item = $(this).closest('.lines_view_lot-item');
		       	 	var image_wrapper = lot_item.find(".lines_view_lot-item_image") ;
		       	 	image_wrapper.css("background-image", image);
		       	});
        },
       function lotItemHoverEnds(){ 
       		$('.lines_view_lot-item_thumbs').off("click");
       	 }
	);

	  $(document).click(function(e){
   		var is_blurry =  $("body").hasClass("blurry-content");
   		var not_in_filters = !(e.target.closest(".filters-dropdown") || e.target.closest(".filters_chip"));
   		if(is_blurry && not_in_filters){
   			$("body").removeClass("blurry-content");
   			$(".filters-dropdown").removeClass("hover");
   			$(".blur-overlay").addClass("hidden");
   		}	
   });





	
	

});


	var app = angular.module('slider', ['rzModule', ]);

	app.controller('MainCtrl', function($scope, $rootScope, $timeout) {


	  //Range slider config
	  $scope.rangeSlider = {
	    minValue: 4000,
	    maxValue: 4000,
	    options: {
	      floor: 0,
	      ceil: 100000,
	      step: 1,
	      hideLimitLabels: true
	    }
	  };



  
});

app.directive('clickableLabel', function() {
  return {
    restrict: 'E',
    scope: {label: '='},
    replace: true,
    template: "<button ng-click='onclick(label)' style='cursor: pointer;'>click me - {{label}}</button>",
    link: function(scope, elem, attrs) {
      scope.onclick = function(label) {
        alert("I'm " + label);
      };
    }
  };
});
