(function () {
    angular.module('app.production-item')
        .controller('ProductionItemController', ProductionItemController);
    ProductionItemController.$inject = ['ProductionItemService', 'toastr'];
    function ProductionItemController(ProductionItemService, toastr) {
        vm = this;
        vm.productionItem = {};
        ProductionItemService.listAllProductionItems().then(
            function (res) {
                vm.productionItem = res;
            },
            function (err) {
                 toastr.error(err.message,'Lỗi!')
            }
        )
    };
})();