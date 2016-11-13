(function () {
    angular.module('app.production-item')
        .controller('DetailsProductionItemController', DetailsProductionItemController);

    DetailsProductionItemController.$inject = ['ProductionItemService','$stateParams'];
    function DetailsProductionItemController(ProductionItemService,$stateParams) {
        vm = this;
        vm.productionItem = {};
        ProductionItemService.getProductionItem($stateParams.productionItemId).then(
            function (res) {
                vm.productionItem = res;
            },
            function (err) {
               toastr.error(err.message,"Lỗi")
            }
        );
    };
})();