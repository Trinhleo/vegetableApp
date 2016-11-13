(function () {
    angular.module('app.production-item')
        .controller('AddProductionItemController', AddProductionItemController);

    AddProductionItemController.$inject = ['ProductionItemService', '$state', 'toastr'];
    function AddProductionItemController(ProductionItemService, $state, toastr) {
        vm = this;
        vm.formData = {
            name: "",
            description: ""
        };
        vm.addProductionItem = addProductionItem;
        function addProductionItem() {
            ProductionItemService.createProductionItem(vm.formData).then(
                function (res) {
                    vm.formData = {
                        name: "",
                        description: ""
                    }
                    toastr.success('Thêm đối tượng sản xuất thành công', 'Thành công!')
                },
                function (err) {
                    toastr.error(err.message, 'Lỗi');
                }
            )
        }
    };
})();