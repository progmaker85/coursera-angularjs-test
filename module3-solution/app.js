(function () {
    'use strict';

    angular.module("NarrowItDownApp", [])
        .controller("NarrowItDownController", narrowItDownController)
        .service("MenuSearchService", menuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
        .directive("foundItems", foundItemsDirective);

    function foundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItemsDirective.template.html',
            scope: {
                items: "<",
                onRemove: '&'
            }
        };
        return ddo;
    }

    narrowItDownController.$inject = ["MenuSearchService"];
    function narrowItDownController(menuSearchService) {
        var narrowItDownCtrl = this;
        narrowItDownCtrl.found = null;

        narrowItDownCtrl.removeItem = function (index) {
            narrowItDownCtrl.found.splice(index, 1);
        };

        narrowItDownCtrl.getMatchedMenuItems = function (searchTerm) {
            if (searchTerm == null) {
                narrowItDownCtrl.found = [];
                return;
            }
            menuSearchService.getMatchedMenuItems(searchTerm.toLowerCase()).then(function (result) {
                narrowItDownCtrl.found = result;
            }).catch(function (error) {
                console.log("Something went terribly wrong.");
            });
        }
    };
    menuSearchService.$inject = ['$http', 'ApiBasePath'];
    function menuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function (result) {
                // process result and only keep items that match
                var foundItems = [];
                var menuItems = result.data.menu_items;

                for (var i = 0; i < menuItems.length; i++) {
                    var description = menuItems[i].description.toLowerCase();
                    if (description.includes(searchTerm)) {
                        foundItems.push(menuItems[i]);
                    }
                }
                // return processed items
                return foundItems;
            });
        };
    };
})();
