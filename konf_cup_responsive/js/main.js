"use strict";
$( document ).ready(function() {
    
    // tabs 

    $('#avia_tickets a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    });
    $('#railway_tickets a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    });
    $('#hotels a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    });
    $('#places a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    });
    $('#auto a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    });

    $('#photo_tab a').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	});
	 $('#video_tab a').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	});



// swiper

	 var swiper = new Swiper('.swiper-container', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true
    });


// form styler
	

$('input, select').styler();

$('input:checkbox').change(function() {
  if ($(this).is(':checked')) {
    $(this).closest('label').addClass('checked');
  } else {
    $(this).closest('label').removeClass('checked');
  }
});



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
        dateFormat: "dd.mm.y"
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
        dateFormat: "dd.mm.y"
      });

    $("#from").datepicker( "setDate", new Date() );
    $("#to").datepicker( "setDate", "+8d" );


// Form to json
        $(function() {
            $(".booking_form").submit(function() {
                    var from = $("#from").val();
                    var to = $("#to").val();
                var formData = {
                    "dates" : "From :" + from  + "\nTo :" +" " + to
               };
                $.ajax({
                    url:'tickets.php',
                    type:'POST',
                    data: formData,
                    success: function(res) {
                        if(res=='ok'){
                            console.log('vse ushlo!');
                        } else {
                            console.log('chtoto poshlo ne tak!');
                        }
                    }
                });
                return false;
            });
        });



});
