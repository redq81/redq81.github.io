(function(){
    "use strict";

    var app = angular.module('bookshelf', ['ngDialog'])
        .controller('MainCtrl', MainCtrl)
        .factory('bookList', function($http){
            return {
                getBookList: function() {
                        return $http.get('data/books.json').then(function(response){
                            return response.data;
                        });
                    }
                }
        })
        .constant('_',window._)
        .constant('imageUrlTemplate',"https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/");

    app.directive('draggable', function() {
        return {
            scope: {
              draggableState: "=",
            },
            link: function(scope, element) {
                scope.draggableState = "initial";
                var el = element[0];
               
                var last_position = {};

                var mouseDirection ="";

                el.draggable = true;

                el.addEventListener("mousemove", getMouseDirection, true);



                el.addEventListener(
                    'dragstart',
                    function(e) {
                        // e.preventDefault();
                        e.dataTransfer.setDragImage(el, -99999, -99999);
                        e.dataTransfer.setData("text/plain", '');
                        scope.$evalAsync(function () {
                            // console.log( mouseDirection );
                            if( mouseDirection == "down" && 
                                scope.draggableState == "initial" )
                            {
                                scope.draggableState = "from_initial_to_stacked_out";
                            } else if (mouseDirection == "up" && 
                                scope.draggableState == "stacked_out" ) 
                            {
                                scope.draggableState = "from_stacked_out_to_initial";
                            } else if (mouseDirection == "left" && 
                                scope.draggableState == "stacked_out" ) 
                            {
                                scope.draggableState ="from_stacked_out_to_rotated";
                            } else if (mouseDirection == "right" && 
                                scope.draggableState == "rotated") 
                            {
                                scope.draggableState ="from_rotated_to_initial";
                            }
                        });
                      
                        return false;
                    },
                    false
                );

                el.addEventListener(
                    'dragend',
                    function(e) {
                        console.log("end dragging");
                        el.removeEventListener("mousemove", getMouseDirection, false);
                        scope.$evalAsync(function () {
                            if (scope.draggableState == "from_initial_to_stacked_out" ) 
                            {
                                scope.draggableState = "stacked_out";
                                el.parentElement.style.zIndex = 5;
                            } else if (scope.draggableState == "from_stacked_out_to_rotated" ) 
                            {
                                scope.draggableState = "rotated";
                                el.parentElement.style.zIndex = 9;
                            } else if (scope.draggableState == "from_stacked_out_to_initial" ||
                                scope.draggableState =="from_rotated_to_initial" ) 
                            {
                                scope.draggableState = "initial"; 
                                el.parentElement.style.zIndex = 1;
                            }                
                        });                
                        return false;
                    },
                    false
                );


                function getMouseDirection(event) {

                    var deltaX = last_position.x - event.clientX,
                        deltaY = last_position.y - event.clientY;


                     if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {
                        //left
                        mouseDirection = "left";
                    } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {
                        //right
                        mouseDirection = "right";
                    } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) {
                        //up
                        mouseDirection = "up";
                    } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0) {
                        //down
                        mouseDirection = "down";
                    }


                    last_position = {
                        x : event.clientX,
                        y : event.clientY
                    };
                };


            }
        } 
    });


    function MainCtrl($scope, $filter,$http,imageUrlTemplate,ngDialog,bookList,_) {
        $scope.booksOnShelf = 10;
        $scope.books = [];
        $scope.bookShelfs = [];
        $scope.sortBooksBy = sortBooksBy;
        $scope.getStateClass = getStateClass;

        
        $scope.getBookBackground = getBookBackground;
        $scope.openBookTooltip = openBookTooltip;


        var handleSuccess = function(data, status) {
            $scope.books = data;
            $scope.bookShelfs = makeBookShelfs(data);
        };

        bookList.getBookList().then(handleSuccess);

        function getStateClass(state) {
            var stateClass= state;

               if(state != "initial"){
                    stateClass=state + " " + "dragged";
                }  

            return stateClass;
        }
           
        function sortBooksBy(sortOrder){
            var sorted = [];
            switch (sortOrder) {
              case "author":
                    sorted = _.sortBy($scope.books, ["author"]); 
                break;
              case "name":
                    sorted = _.sortBy($scope.books, ["title"]); 
                break;
              default:
                    sorted = angular.copy($scope.books);
            }
            $scope.bookShelfs = makeBookShelfs(sorted);
        }

        function openBookTooltip (book) {
            $scope.book = book;
            ngDialog.open({ 
                template: 'popupTmpl.html', 
                className: 'ngdialog-theme-default',
                scope: $scope
             });
        }

        function getBookBackground(partUrl){
            return 'url(' + imageUrlTemplate+partUrl + ')';
        }

        function makeBookShelfs(books){
           return  _.chunk(books, $scope.booksOnShelf);
         }
      
    }
})();
