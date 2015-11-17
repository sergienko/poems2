angular
  .module('poems2', ["firebase", 'ui.bootstrap'])
  .controller('poems2Controller', function ($scope, $filter, $firebaseArray) {
    var s = this;
    var ref = new Firebase("https://poems2.firebaseio.com");

    $scope.poems = $firebaseArray(ref);


    $scope.active = null;
    $scope.editEn = false;
    $scope.showAdd = false;
    $scope.jk = 'file:///C:/Users/Papa/Desktop/%D0%B6%D0%B8%D0%B7%D0%BD%D0%B8%20%D0%BA%D1%80%D0%B0%D1%81%D0%BA%D0%B8/';
    $scope.nznad = 'file:///C:/Users/Papa/Desktop/%D0%9D%D0%B5%20%D0%B7%D0%B0%D0%B1%D1%8B%D1%82%D1%8C%20%D0%BD%D0%B0%D0%BC%20%D0%B0%D1%84%D0%B3%D0%B0%D0%BD%D1%81%D0%BA%D0%B8%D1%85%20%D0%B4%D0%BE%D1%80%D0%BE%D0%B3/';
    $scope.toggleEditing = function () {

      $scope.editEn = !$scope.editEn;

    };

    $scope.showEditRow = function (r) {
      if ($scope.active != r) {
        $scope.active = r;
      } else {
        $scope.active = null;
      }
    };


    $scope.showAddForm = function () {
      $scope.showAdd = true;
    };

    $scope.Sort = "poemNumber";
    $scope.SortDesc = false;

    $scope.SortFcn = function (field) {
      if ($scope.Sort == "") {
        $scope.Sort = field;
      } else if ($scope.SortDesc == false) {
        $scope.SortDesc = true;
      } else {
        $scope.SortDesc = false;
        $scope.Sort = "";
      }
    };

    $scope.getMaxNumber = function () {
      return _.max($scope.poems, 'poemNumber').poemNumber;
    };

    $scope.addNewPoem = function () {
      if ($scope.newImgNumber) {
        imgNumber1 = $scope.newImgNumber
      } else {
        imgNumber1 = null
      };
      $scope.poems.$add({
        heading: $scope.newHeading,
        text: $scope.newText,
        poemNumber: Number($scope.newPoemNumber),
        imgNumber: imgNumber1
      });
      $scope.newHeading = '';
      $scope.newText = '';
      $scope.newPoemNumber = '';
      $scope.newImgNumber = '';
      $scope.showAdd = false;
    };

    $scope.showFirstLine = function (str1) {
      if (str1) {
        return str1.substr(0, str1.indexOf('\n'));
      };

    };

    $scope.removePoem = function (poem) {
      if (confirm('Вы уверены, что хотите безвозвратно удалить стихотворение ' + poem.poemNumber + ' "' + poem.heading + '"?')) {
        $scope.poems.$remove(poem)
      }
    };


    $scope.updatePoem = function (poem) {
      $scope.poems.$save(poem);
      $scope.active = null;
    };

    $scope.getImgPath = function (poem) {
      if (poem.imgNumber) {

        if ((poem.imgNumber.substring(0, 1) === "1") && ((poem.imgNumber.length == 4))) {

          return $scope.nznad + poem.imgNumber + '.jpg';
        } else {
          return $scope.jk + poem.imgNumber + '.jpg'
        }
      };
    }

  });
