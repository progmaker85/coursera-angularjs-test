(function () {
    'use strict';

    angular.module("ShoppingListCheckOffApp", [])
        .controller("ToBuyController", toBuyController)
        .controller("AlreadyBoughtController", alreadyBoughtController)
        .service("ShoppingListCheckOffService", shoppingListCheckOffService);


    toBuyController.$inject = ['ShoppingListCheckOffService'];
    function toBuyController(shoppingListService) {
        var list = this;

        list.items = shoppingListService.getShopingItems();

        list.checkOutItem = function (itemIndex) {
            shoppingListService.checkOutItem(itemIndex);
        }
    };

    alreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function alreadyBoughtController(shoppingListService) {
        var list = this;

        list.items = shoppingListService.getBoughtItems();
    }

    function shoppingListCheckOffService() {
        var service = this;

        // List of shopping items
        var toBuyList =
            [{ name: "Milk", quantity: 1 },
            { name: "Eggs", quantity: 10 },
            { name: "Cookies", quantity: 5 },
            { name: "Chips", quantity: 2 },
            { name: "Ice cream", quantity: 3 }];
        //List of bought items
        var boughtList = [];

        service.checkOutItem = function (itemIndex) {
            //Moving a bought item from toBuyList into boughtList
            var boughtItem = toBuyList.splice(itemIndex, 1);
            boughtList.push(boughtItem[0]);
        };
        service.getBoughtItems = function () {
            return boughtList;
        };
        service.getShopingItems = function () {
            return toBuyList;
        };
    };
})();
