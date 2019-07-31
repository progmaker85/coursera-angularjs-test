(function () {
    'use strict';

    angular.module("LunchCheck", [])
        .controller("LunchCheckController", LunchCheckController);
    LunchCheckController.$inject = ['$scope'];
    
    function LunchCheckController($scope) {
        $scope.resultMessage = "";
        $scope.lunchMenu = "";

        $scope.CheckIfTooMuch = function () {
            if ($scope.lunchMenu === "") {
                $scope.resultMessage = "Please enter data first";
                return;
            }

            var items = $scope.lunchMenu.split(",");

            if (items.length > 3) {
                $scope.resultMessage = "Too much!";
            } else {
                $scope.resultMessage = "Enjoy!";
            }
        };
    };
})();
