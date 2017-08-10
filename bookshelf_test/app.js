
var app = angular.module('bookshelf', [])
    .controller('MainCtrl', MainCtrl);

app.directive('draggable', function() {
    return function(scope, element) {
        // this gives us the native JS object
        var el = element[0];

        el.draggable = true;

        el.addEventListener(
            'dragstart',
            function(e) {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('Text', this.id);
                this.classList.add('drag');
                return false;
            },
            false
        );

        el.addEventListener(
            'dragend',
            function(e) {
                this.classList.remove('drag');
                return false;
            },
            false
        );
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