
var app = angular.module('bookshelf', [])
    .controller('MainCtrl', MainCtrl);

app.directive('myDraggable', ['$document', function($document) {
  return {
    link: function(scope, element, attr) {
      var startX = 0, startY = 0, x = 0, y = 0;

      element.on('mousedown', startDrag);

    
      function startDrag(event) {
            // Prevent default dragging of selected content
            event.preventDefault();
            startX = event.pageX - x;
            startY = event.pageY - y;
            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
       
        
      }

     

      function mousemove(event) {
        y = event.pageY - startY;
        x = event.pageX - startX;
        element.css({
          top: y + 'px',
          left:  x + 'px',
          'z-index':999
        });
      }

      function mouseup() {
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
      }
    }
  };
}]);


function MainCtrl($scope, $filter,$http) {
     $scope.booksOnShelf = 10;

    function bookShelfs(){
        var result = [];
        for(var i=0; i< $scope.book_list.length/$scope.booksOnShelf ; i++ ){
                var arr= [];
            for(var j = 0; j < $scope.booksOnShelf; j++){
                arr.push($scope.book_list[i*$scope.booksOnShelf+j]);
                arr[j]["id"] = i*$scope.booksOnShelf+j;
            }
            result.push(arr);
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