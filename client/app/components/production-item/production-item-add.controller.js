(function () {
    angular.module('app.production-item')
        .controller('AddProductionItemController', AddProductionItemController);

    AddProductionItemController.$inject = ['ProductionItemService'];
    function AddProductionItemController(ProductionItemService) {

    };
})();