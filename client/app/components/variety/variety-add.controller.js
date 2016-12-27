(function () {
    angular.module('app.variety')
        .controller('AddVarietyController', AddVarietyController);

    AddVarietyController.$inject = ['VarietyService', '$timeout', 'ProductionItemService', '$state', 'toastr'];
    function AddVarietyController(VarietyService, $timeout, ProductionItemService, $state, toastr) {
        var vm = this;
        vm.formData = {
            productionItem: "",
            name: "",
            description: ""
        };
        vm.addVariety = addVariety;
        vm.productionItems = []
        vm.cancel = cancel;
        productionItem();
        $(document).ready(function () {
            $(".production_item").select2({
                placeholder: "Chọn những đối tượng sản xuất",
                allowClear: true,
                language: 'vi'
            });
            $(".production_item").on('change', function () {
                $timeout(function () {
                    vm.formData.productionItem = $(".production_item").val()
                });
            })
        });
        function productionItem() {
            ProductionItemService.listAllProductionItems().then(
                function (res) {
                    vm.productionItems = res;
                },
                function (err) {
                    toastr.error(err, 'Lỗi')
                }
            )
        }
        function addVariety() {
            VarietyService.createVariety(vm.formData).then(
                function (res) {
                    vm.formData = {
                        name: "",
                        description: ""
                    }
                    toastr.success('Thêm giống thành công', 'Thành công!');
                    $state.go('index.variety');
                },
                function (err) {
                    toastr.error(err.message, 'Lỗi');
                }
            );
        }
        function cancel() {
            $state.go('index.variety')
        }
    };
})();