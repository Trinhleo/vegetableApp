(function () {
    angular.module('app.production-item')
        .controller('DetailsProductionItemController', DetailsProductionItemController);

    DetailsProductionItemController.$inject = ['ProductionItemService','$state', '$stateParams', 'toastr'];
    function DetailsProductionItemController(ProductionItemService,$state, $stateParams, toastr) {
        vm = this;
        vm.productionItem = {};
        vm.remove = remove;
        getProductionItem();
        function getProductionItem() {
            ProductionItemService.getProductionItem($stateParams.productionItemId).then(
                function (res) {
                    vm.productionItem = res;
                },
                function (err) {
                    toastr.error(err.message, "Lỗi")
                }
            );
        };
        function remove() {
            if (confirm('Bạn có thực sự muốn xóa không?')) {
                ProductionItemService.deleteProductionItem($stateParams.productionItemId).then(
                    function (res) {
                        toastr.success("Xóa thành công", 'Thành công!');
                        $state.go('index.production-item');
                    },
                    function (err) {
                        toastr.error("Xóa thất bại", 'Thất bại!')
                    }
                )
            }
        }
    };
})();