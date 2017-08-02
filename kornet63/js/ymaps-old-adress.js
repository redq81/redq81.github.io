ymaps.ready(function(){
    var myMap = new ymaps.Map("map", {
        center: [53.212771, 50.220312],
        zoom: 17
    });


    myMap.balloon.open([53.212949, 50.215591],
        {
            contentHeader: 'Корнет',
            contentBody: 'улица Антонова-Овсеенко, 44Б',
        }
    );
    

    myMap.behaviors.disable('scrollZoom');
    myMap.behaviors.disable('drag');
   
});