(function () {
    angular.module('app.production-item')
        .controller('EditProductionItemController', EditProductionItemController);

    EditProductionItemController.$inject = ['ProductionItemService', '$state', '$stateParams','toastr'];
    function EditProductionItemController(ProductionItemService, $state, $stateParams, toastr) {
        vm = this;
        vm.productionItemId = $stateParams.productionItemId;
        vm.formData = {};
        vm.update = update;
        ProductionItemService.getProductionItem(vm.productionItemId).then(
            function (res) {
                vm.formData = res;
            },
            function (err) {
                toastr.error(err.message, "Lỗi")
            }
        );

        function update() {
            ProductionItemService.updateProductionItem(vm.formData).then(
                function (res) {
                    toastr.success('Cập nhật thành công', 'Thành công');
                    $state.go('index.production-item-details', {
                        productionItemId: vm.productionItemId
                    })

                },
                function (err) {
                    toastr.error(err.message, 'Lỗi')
                }
            )
        };

    };
})();