(function () {
    angular.module('app.production-item')
        .controller('EditProductionItemController', EditProductionItemController);

    EditProductionItemController.$inject = ['ProductionItemService'];
    function EditProductionItemController(ProductionItemService) {

    };
})();