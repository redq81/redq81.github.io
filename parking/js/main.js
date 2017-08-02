

    

    $(document).ready(function(){
      
  


  //Calculator
 


  var calculate= function(){

    var fromInput = $('#from');
    var toInput = $('#to');
     
    var resultDiv = $('#result');
    var fromDate=$('#from').datepicker('getDate');
    var toDate=$('#to').datepicker('getDate');  
    var result;
    
      
    
      if( fromDate === null || toDate === null && toDate < fromDate ){
        return} else {          
          
            result = new Date(toDate - fromDate);
            resultDiv.text(result.valueOf() / (1000*60*60*24) );
            resultDiv.hide();
            var days = parseInt($("#result").text(),10)
                if(days<=10 && days > 0){
                  $("#sum").text(days*100+" р" );
                }
                   else if(10<days&&days<=20){
                    $("#sum").text(days*0.9*100+" р" );
                }  else if(days==0){
                    $("#sum").text(100+" р" );
                }
                else if(isNaN(days)||days<0){
                    $("#sum").text("100р ");
                }
                else {
                    $("#sum").text(days*0.75*100+" р" );
                }
           
        }
        
     };

      $('#from').datepicker({
        changeMonth: true,
        changeYear:true,
        hideIfNoPrevNext: true,
        minDate: 0,
        firstDay: 1,
        dayNames:[ "Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота" ],
        dayNamesMin:[ "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб" ],
        monthNames: [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ],
        monthNamesShort: [ "Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек" ], 
        defaultDate: "+1w",
        dateFormat: "dd.mm.y",
        onSelect: function fromDate(){
          var fromSelected=$('#from').datepicker({dateFormat:'dd.mm.y'}).val();
          var momentFromDate=moment(fromSelected,'DD.MM.YY');
          var aDate=moment(momentFromDate).add(8,'days').calendar();
          var formatedToDate=moment(aDate).format('DD.MM.YY');
          $("#to").datepicker({dateFormat: 'dd.mm.y'}).datepicker( "setDate", formatedToDate );
          return calculate()}
      });

      $('#to').datepicker({
        changeMonth: true,
        changeYear:true,
        hideIfNoPrevNext: true,
        minDate: 0,
        firstDay: 1,
        dayNames:[ "Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота" ],
        dayNamesMin:[ "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб" ],
        monthNames: [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сантябрь", "Октябрь", "Ноябрь", "Декабрь" ],
        monthNamesShort: [ "Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек" ],
        defaultDate: "+1w",
        dateFormat: "dd.mm.y",
        onSelect: calculate
      });

    $("#from").datepicker( "setDate", new Date() );
    $("#to").datepicker( "setDate", "+8d" );
    

          
    //fade in blocks

    $('.fadein10').delay(3000).animate({opacity: 1},1000);
    $('.fadein15').delay(4000).animate({opacity: 1},1000);
    $('.fadein20').delay(5000).animate({opacity: 1},1000);
    
    
    $.ajax({
      url : "Kurumoch.json",
      dataType : "json",
      success : function(parsed_json) {
        var location = parsed_json['location']['city'];
        var temp_c = parsed_json['current_observation']['temp_c'];
        var pressure_trend=parsed_json['current_observation']['pressure_trend'];
        var degrees="ºC";
        var icon=parsed_json['current_observation']['icon'];
        var icon_url='images/weather_icons/'+icon+'.png';
        console.log(icon_url);
        $('#gradus').text(temp_c+degrees);
        var image = document.createElement("IMG");
        image.alt = "Alt information for image"
        image.setAttribute('class', 'photo');
        image.src=icon_url;
        $('#weather_informer').html(image);
      }
    });
    
    $('.go_to').click( function(){ 
        var scroll_el = $(this).attr('href'); 
        if ($(scroll_el).length != 0) {
            $('html, body').animate({ scrollTop: $(scroll_el).offset().top -170}, 500); 
            $(scroll_el).delay(500).effect( "bounce", { distance: 15 },{ time: 20 }, "slow"  );

        }
            return false; 
    });

// Form to json
        $(function() {
            $("#main_form").submit(function() {
                    var from = $("#from").val();
                    var fromTime = $("#fromTime").val();
                    var howManyPeople = $("#howManyPeople").val();
                    var to = $("#to").val();
                    var toTime = $("#toTime").val();
                    var phoneNumber = $("#phoneNumber").val();
                    var carModelName = $("#carModelName").val();
                    var contactEmail = $("#contactEmail").val();
                    var carRegNumber = $("#carRegNumber").val();
                    var accept = $('[name="accept"]:checked').val();
                var formData = {
                    "message": "From :" + from + " " + fromTime + "\nTo :" +" " + to + " " + toTime +" \n" + howManyPeople + " chelovek" + " " + " \nAuto : "+ carModelName + " " 
                    + "\nRegistration number : " + carRegNumber + " " + "\nAccept : " + accept + " " + "\nPhone number : " +  phoneNumber + " " + "\nEmail : " + contactEmail 

                };
                $.ajax({
                    url:'mail.php',
                    type:'POST',
                    data: formData,
                    success: function(res) {
                        if(res=='ok'){
                            console.log('vse ushlo!');
                           $('.popup-modal').trigger('click');
                              
                        } else {
                            console.log('chtoto poshlo ne tak!');
                        }
                    }
                });
                return false;
            });
        });

        $(function () {
            $('.popup-modal').magnificPopup({
                    type: 'inline',
                    preloader: false,
                    modal: true
                });
                $(document).on('click', '.popup-modal-dismiss', function (e) {
                    e.preventDefault();
                    document.location.href = "http://parkovkasamara.ru";
             });
        });

   //email validation

       $('#contactEmail').blur(function() {
            if($(this).val() != '') {
                var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                if(pattern.test($(this).val())){
                    $(this).css({'border' : '1px solid #569b44'});
                    $('#valid').text('Верно');
                } else {
                    $(this).css({'border' : '1px solid #ff0000'});
                    $('#valid').text('Не верно');
                }
            } 
        });

//popup galery 
$('.zoom-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true,
            titleSrc: function(item) {
                return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
            }
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function(element) {
                return element.find('img');
            }
        }
        
    });

$(function () {
    $('.popup-galery').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#username',
        modal: true
    });
    $(document).on('click', '.popup-modal-dismiss', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });
});

//validate phone  by mask

        $("#phoneNumber").inputmask({
                            "mask":"+7(999)999-99-99",
                            "onincomplete": function(){ 
                               $("#calculate").prop("disabled", true).addClass("ui-state-disabled");},
                            "oncomplete": function(){ 
                               $("#calculate").prop("disabled", false).removeClass("ui-state-disabled");},
                            "oncleared":function(){ 
                               $("#calculate").prop("disabled", true).addClass("ui-state-disabled");}
                          });

//fade unChecked buttons
$('[name="accept"]').click(function(){
    if($('#dontAccept').is(':checked')){
        $(".call-and-accept label").addClass('text-to-grey');
        $(".dont-call-for-accept label").removeClass('text-to-grey');
    } else if( $("#acceptMorning").is(':checked')||$("#acceptEvening").is(':checked')){
        $(".call-and-accept label").removeClass('text-to-grey');
        $(".dont-call-for-accept label").addClass('text-to-grey');
    }
})



   
     
ymaps.ready(function(){
    var myMap = new ymaps.Map("yandex_map", {
        center: [53.513002, 50.134034],
        zoom: 13
    });

    var myPolygon = new ymaps.Polygon(
        [
         [[53.528149, 50.129678],[53.528174, 50.137703],[53.530565, 50.137532],[53.530616, 50.129678]]
        ]
    );

    myMap.balloon.open([53.530296, 50.133648],
        {
            contentHeader: 'Парковка',
            contentBody: 'Всегда есть места!'+'</br>'+" Координаты 53.529184, 50.133670" +'<br />'+'т.+7(917)161-78-23',
        }
    );
    
    myMap.geoObjects.add(myPolygon);
    
    var from_samara = ymaps.route([
        [53.490485, 50.118928],
        [53.529184, 50.133670]
            ]).then(
                function (route) {
                    myMap.geoObjects.add(route);
                },
                function (error) {
                    alert("Возникла ошибка: " + error.message);
                }
    );

    var from_toglyatti = ymaps.route([
        [53.496449,50.055513],
        {
            type: 'viaPoint',
            point: [53.541897, 50.088715]
        },
        [53.529184, 50.133670]
            ]).then(
                function (route) {
                    myMap.geoObjects.add(route);
                },
                function (error) {
                    alert("Возникла ошибка: " + error.message);
                }
    );


    myMap.behaviors.disable('scrollZoom');
    if(!device.desktop()){myMap.behaviors.disable('drag');
    }

    var toggleDrag = function () {
        var drag_state=0;
        if( drag_state==0){myMap.behaviors.enable('drag') ;
            drag_state=1;
        } else {myMap.behaviors.disable('drag') ;
            drag_state=0;
        }
    };
    myMap.events.add('click', toggleDrag);

         
});




//     parking_map.balloon.open([53.529184, 50.133670],
  
  




    //document.ready ends
    });


    //Time

    function startTime()
    {
    var tm=new Date();
    var h=tm.getHours();
    var m=tm.getMinutes();
    var s=tm.getSeconds();
    m=checkTime(m);
    s=checkTime(s);
    document.getElementById('clock').innerHTML=h+":"+m;
    t=setTimeout('startTime()',500);
    }
    function checkTime(i)
    {
    if (i<10)
    {
    i="0" + i;
    }
    return i;
    }