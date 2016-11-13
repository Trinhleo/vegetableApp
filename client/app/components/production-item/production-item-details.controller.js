(function () {
    angular.module('app.production-item')
        .controller('DetailsProductionItemController', DetailsProductionItemController);

    DetailsProductionItemController.$inject = ['ProductionItemService'];
    function DetailsProductionItemController(ProductionItemService) {

    };
})();