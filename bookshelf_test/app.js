

var app = angular.module('bookshelf', [])
    .controller('MainCtrl', MainCtrl);

app.directive('draggable', function() {
    return {
        scope: {
          draggableState: '=',
        },
        link: function(scope, element) {
            // this gives us the native JS object
            scope.draggableState = "initial";
            var el = element[0];
           
            var last_position = {};

            var mouseDirection ="";

            el.draggable = true;

            el.addEventListener(
                'dragstart',
                function(e) {
                    this.addEventListener("mousemove", getMouseDirection, true);
                    scope.$evalAsync(function () {
                        console.log( mouseDirection );
                        if( mouseDirection == "down" && 
                            scope.draggableState == "from_stacked_out_to_initial" ||
                            scope.draggableState == "initial" )
                        {
                            scope.draggableState = "from_initial_to_stacked_out";
                            
                        } else if (mouseDirection == "up" && 
                            scope.draggableState == "from_initial_to_stacked_out" ||
                            scope.draggableState =="from_rotated_to_stacked_out" ) 
                        {
                            scope.draggableState = "from_stacked_out_to_initial";
                            
                        } else if (mouseDirection == "left" && 
                            scope.draggableState == "from_initial_to_stacked_out" ||
                            scope.draggableState =="from_rotated_to_stacked_out") 
                        {
                            scope.draggableState ="from_stacked_out_to_rotated";
                            
                        } else if (mouseDirection == "right" && 
                            scope.draggableState == "from_stacked_out_to_rotated") 
                        {
                            scope.draggableState ="from_rotated_to_stacked_out";
                            
                        }
                    });
                  
                    return false;
                },
                false
            );

            el.addEventListener(
                'dragend',
                function(e) {
                    el.removeEventListener("mousemove", getMouseDirection, false);
                    scope.$evalAsync(function () {
                        if (scope.draggableState == "from_initial_to_stacked_out" ||
                            scope.draggableState =="from_rotated_to_stacked_out") 
                        {
                            scope.draggableState = stacked_out;
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
                // if (oldX < e.pageX ) {
                //     xDirection = "right";
                // } else  {
                //     xDirection = "left";
                // }
             
                
                // if (oldY < e.pageY ) {
                //     yDirection = "down";
                // } else  {
                //     yDirection = "up";
                // }
             
                // oldX = e.pageX;
                // oldY = e.pageY;
             
                
            };
        }
    } 
});


function MainCtrl($scope, $filter,$http) {
    $scope.booksOnShelf = 10;

    function bookShelfs(){
        var result = [];
        var counter = 0 ;
        for(var i=0; i< $scope.book_list.length/$scope.booksOnShelf ; i++ ){
                var shelf= [];
            for(var j = 0; j < $scope.booksOnShelf; j++){
                shelf.push($scope.book_list[i*$scope.booksOnShelf+j]);
                shelf[j]["id"] = counter;
                counter +=1;
            }
            result.push(shelf);
        }
        return result;
     };



    $http.get('/books.json').
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.book_list = data;
        $scope.bookShelfs = bookShelfs();
        console.log("100-best-books list loaded");
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log("something went wrong")
      });

}