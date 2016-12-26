(function () {
    angular.module('app.fertilizer')
        .controller('AddFertilizerController', AddFertilizerController);

    AddFertilizerController.$inject = ['FertilizerService', '$state', 'toastr'];
    function AddFertilizerController(FertilizerService, $state, toastr) {
        var vm = this;
        vm.formData = {
            name: "",
            description: ""
        };
        vm.addFertilizer = addFertilizer;
        vm.cancel = cancel;
        function addFertilizer() {
            FertilizerService.createFertilizer(vm.formData).then(
                function (res) {
                    vm.formData = {
                        name: "",
                        description: ""
                    }
                    toastr.success('Thêm phân bón thành công', 'Thành công!');
                    $state.go('index.fertilizer');
                },
                function (err) {
                    toastr.error(err.message, 'Lỗi');
                }
            );
        }
        function cancel(){
            $state.go('index.fertilizer')
        }
    };
})();