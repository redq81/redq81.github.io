   

  $(document).ready(function() {

/* Swiper slider initialisation     */
    var mySwiper = new Swiper ('.swiper-container', {
     pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 30,
        speed: 500,
        loop: true
       
       
    }) ; 


/*1st screen text apearing animation */

$(".fire h1").delay(400).animate({opacity: 1},1000);
$(".firemen-footer_text-wrapper h2").delay(900).animate({opacity: 1},1000);
$(".firemen-button button").delay(1900).animate({opacity: 1},1000);



/*fading text on image hover*/
$('.hover_me').hover(function(){

                    var index = mySwiper.realIndex;
                    var prevIndex = mySwiper.previousIndex;
                    var selector = ".wooden-text_p";
                    $(selector+index).fadeIn( 250  );
                    $(".wooden img").addClass("hoverState");

            },function(){
                var index = mySwiper.realIndex;
                var selector = ".wooden-text_p";
                $(selector+index).fadeOut( 250  );
                $(".wooden img").removeClass("hoverState");
            });

$('.img-wrapper').hover(function(){
                 
             if($(this).hasClass("met")){
                $(".metal .text_description").fadeIn( 250  );
                $(".metal img").addClass("hoverState");
             }  else {
                $(".textile .text_description").fadeIn( 250  );
                $(".textile img").addClass("hoverState");
             }

            },function(){
                if($(this).hasClass("met")){
                    $(".metal .text_description").fadeOut( 250  );
                    $(".metal img").removeClass("hoverState");
             }  else {
                    $(".textile .text_description").fadeOut( 250  );
                    $(".textile img").removeClass("hoverState");
             }
            });


/*Sticky columns  */
var pin1_offset =  $('.header_wrapper').outerHeight(true);
var pin2_offset = pin1_offset + $('.protections').outerHeight(true)+50;
$("#pin1").stick_in_parent(
        {offset_top: pin1_offset}
    ); 
$("#pin2").stick_in_parent(
        {offset_top: pin2_offset}
    );    



/*Jquery UI tooltip*/

$( ".protections a" ).tooltipster({
    theme: 'tooltipster-noir',
    maxWidth: 200
});
$( ".protections a" ).on("click", function (event) {
            event.preventDefault();
    });


/*Menu for mobile devices*/
var touch = $('#touch-menu');
    var menu = $('.menu');
 
    $(touch).on('click', function(e) {
        e.preventDefault();
        menu.slideToggle();
    });
    $(window).resize(function(){
        var w = $(window).width();
        if(w > 760 && menu.is(':hidden')) {
            menu.removeAttr('style');
        }
    });

 
/*Menu waypoints*/

var wood = new Waypoint({
  element: document.getElementById('wood'),
  handler: function(direction) {
    if(direction=="down"){
        $(".menu-wood").addClass("selected");
    } else {
        $(".menu-wood").removeClass("selected");
    }
  },
  offset: 350
});

var metal = new Waypoint({
  element: document.getElementById('metal'),
  handler: function(direction) {
    if(direction=="down"){
        $(".menu-wood").removeClass("selected");
        $(".menu-metal").addClass("selected");
    } else {
        $(".menu-metal").removeClass("selected");
        $(".menu-wood").addClass("selected");
    }
  },
  offset: 350
});

var textile = new Waypoint({
  element: document.getElementById('textile'),
  handler: function(direction) {
    if(direction=="down"){
        $(".menu-metal").removeClass("selected");
        $(".menu-textile").addClass("selected");
    } else {
        $(".menu-textile").removeClass("selected");
        $(".menu-metal").addClass("selected");
    }
  },
  offset: 350
});

var video = new Waypoint({
  element: document.getElementById('video'),
  handler: function(direction) {
    if(direction=="down"){
        $(".menu-textile").removeClass("selected");
        $(".menu-video").addClass("selected");
    } else {
        $(".menu-video").removeClass("selected");
        $(".menu-textile").addClass("selected");
    }
  },
  offset: 150
});

var contacts = new Waypoint({
  element: document.getElementById('contacts'),
  handler: function(direction) {
    if(direction=="down"){
        $(".menu-video").removeClass("selected");
        $(".menu-contacts ").addClass("selected");
    } else {
        $(".menu-contacts ").removeClass("selected");
        $(".menu-video").addClass("selected");
    }
  },
  offset: 150
});



var protections = new Waypoint({
  element: document.getElementById('wood'),
  handler: function(direction) {
    if(direction=="down"){
        $("header").addClass("with_bg");
        $(".mobile-menu").css({"color":"#000"});
        $(".menu li a ").css({"color":"#000"});
        if($(window).width()<780){$(".menu li a ").css({"background":"#fff"});
          }
        $(".logo_dark").removeClass("hidden");
        $(".logo_white").addClass("hidden");
        $('video').trigger('pause');
    } else {
        $("header").removeClass("with_bg");
        $(".mobile-menu").css({"color":"#fff"});
        $(".menu li a ").css({"background":"none"});
        $(".menu li a ").css({"color":"#fff"});
        $(".logo_dark").addClass("hidden");
        $(".logo_white").removeClass("hidden");
        $('video').trigger('play');
    }
  },
  offset: 300
});

var are_you_protected = new Waypoint({
  element: document.getElementById('are_you_protected'),
  handler: function(direction) {
    if(direction=="down"){
        $(".fire h1").animate({opacity: 0},400);
    } else {
        $(".fire h1").animate({opacity: 1},400);
    }
  },
  offset: -100
});



var firemen_button = new Waypoint({
  element: document.getElementById('firemen_button'),
  handler: function(direction) {
    if(direction=="down"){
        $(".firemen-footer_text-wrapper h2").animate({opacity: 0},300);
        $(".firemen-button button").animate({opacity: 0},300);
    } else {
        $(".firemen-footer_text-wrapper h2").animate({opacity: 1},300);
        $(".firemen-button button").animate({opacity: 1},300);
    }
  },
  offset: 150
});


/*Smooth scrolling*/
    $("#main-menu").on("click","a", function (event) {
            event.preventDefault();
            var offset_top= function(target){
                if(target=="#video"||target=="#contacts"||$(window).width()<991){
                    return $('header').outerHeight(true);
                }  else {
                    return $('header').outerHeight(true)+$('.protections').outerHeight(true)-1;
                }
            };
            var id  = $(this).attr('href');
            var top = $(id).offset().top-offset_top(id);
            $('body,html').animate({scrollTop:top}, 1000);
    });

    $(".logo").on("click", function (event) {
            event.preventDefault();
            $('body,html').animate({scrollTop:0}, 1500);
    });

    
/* Lszy loading*/

$(function() {
    $("img.lazy").lazyload();
});




    /*
        
            center: [53.212771, 50.220312],
            zoom: 17
       

         myMap.balloon.open(,
            {
                contentHeader: 'Корнет',
                contentBody: 'улица Антонова-Овсеенко, 44Б',
            }
       */
   /*yandex map initialization
ymaps.ready(function(){
    var myMap = new ymaps.Map("map", {
        center: [53.209911, 50.251758],
        zoom: 17
    });


    myMap.balloon.open([53.209902, 50.246340],
        {
            contentHeader: 'Корнет',
            contentBody: 'Физкультурная, 90',
        }
    );
    

    myMap.behaviors.disable('scrollZoom');
    myMap.behaviors.disable('drag');
   
});
*/

//Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
var check_if_load = false;

//Функция создания карты сайта и затем вставки ее в блок с идентификатором &#34;map&#34;
function init () {
   var myMap = new ymaps.Map("map", {
        center: [53.209911, 50.251758],
        zoom: 17
    });


    myMap.balloon.open([53.209902, 50.246340],
        {
            contentHeader: 'Корнет',
            contentBody: 'Физкультурная, 90',
        }
    );
    

    myMap.behaviors.disable('scrollZoom');
    myMap.behaviors.disable('drag');
};
// Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов) 
function waitForTilesLoad(layer) {
  return new ymaps.vow.Promise(function (resolve, reject) {
    var tc = getTileContainer(layer), readyAll = true;
    tc.tiles.each(function (tile, number) {
      if (!tile.isReady()) {
        readyAll = false;
      }
    });
    if (readyAll) {
      resolve();
    } else {
      tc.events.once("ready", function() {
        resolve();
      });
    }
  });
}
 
function getTileContainer(layer) {
  for (var k in layer) {
    if (layer.hasOwnProperty(k)) {
      if (
        layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
        || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
      ) {
        return layer[k];
      }
    }
  }
  return null;
};


// Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
function loadScript(url, callback){
  var script = document.createElement("script");
 
  if (script.readyState){  // IE
    script.onreadystatechange = function(){
      if (script.readyState == "loaded" ||
              script.readyState == "complete"){
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  // Другие браузеры
    script.onload = function(){
      callback();
    };
  }
 
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

// Основная функция, которая проверяет когда мы навели на блок с классом &#34;ymap-container&#34;
var ymap = function() {
  $('#contacts').mouseenter(function(){
      if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем
 
        // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
        check_if_load = true; 
 
 
        // Загружаем API Яндекс.Карт
        loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1", function(){
           // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
           ymaps.load(init);
        });                
      }
    }
  );  
}
 
$(function() {
 
  //Запускаем основную функцию
  ymap();
 
});



  
/*Scroll background on IOS*/

    if (device.ios()){
        $(".wooden, .metal, .textile, .firemen,.video_obs , .contacts").addClass('noFixedBg');
    };


/*
    if ( device.desktop()){
        console.log('it is desktop')
        $(".wooden, .metal, .textile, .firemen,.video_obs , .contacts").addClass('noFixedBg');
    };
*/
      

    /*window resizing event*/

    var windowWidth = $(window).resize(function () { 
            console.log($(window).width());
            return $(window).width();
         });

    /*Form validation*/
$("#form-submit_button").prop("disabled", true).addClass("ui-state-disabled")
      
}); /*document ready end*/



$("#phoneNumber").inputmask({
           "mask":"+7(999)999-99-99",
           "onincomplete": function(){ 
           $("#form-submit_button").prop("disabled", true).addClass("ui-state-disabled");},
           "oncomplete": function(){ 
            $("#form-submit_button").prop("disabled", false).removeClass("ui-state-disabled");},
            "oncleared":function(){ 
            $("#form-submit_button").prop("disabled", true).addClass("ui-state-disabled");}
    });






/*Form submit event*/

   function call() {
              var msg   = $('#test-form').serialize();
                $.ajax({
                  type: 'post',
                  url: 'test.php',
                  data: msg,
                  success: function(data) {
                       $('.popup-modal').magnificPopup('open'); 
                  },
                  error:  function(xhr, str){
                    console.log('Возникла ошибка: ' + xhr.responseCode);
                  }
                });
          }



 $(function () {
    $('.popup-modal').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#username',
        modal: true
    });
    $(document).on('click', '.popup-modal-dismiss', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
        $(':input','#test-form')
             .not(':button, :submit, :reset, :hidden')
             .val('');
        $(':textarea','#test-form')
             .not(':button, :submit, :reset, :hidden')
             .val('');
    });
});




  function scrollBot(){
        $('html,body').animate({scrollTop: document.body.scrollHeight},1000);
}
   

