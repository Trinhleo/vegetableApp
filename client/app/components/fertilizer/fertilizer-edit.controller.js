(function () {
    angular.module('app.fertilizer')
        .controller('EditFertilizerController', EditFertilizerController);

    EditFertilizerController.$inject = ['FertilizerService', '$state', '$stateParams','toastr'];
    function EditFertilizerController(FertilizerService, $state, $stateParams, toastr) {
        vm = this;
        vm.fertilizerId = $stateParams.fertilizerId;
        vm.formData = {};
        vm.update = update;
        vm.cancel = cancel;
        FertilizerService.getFertilizer(vm.fertilizerId).then(
            function (res) {
                vm.formData = res;
            },
            function (err) {
                toastr.error(err.message, "Lỗi")
            }
        );

        function update() {
            FertilizerService.updateFertilizer(vm.formData).then(
                function (res) {
                    toastr.success('Cập nhật thành công', 'Thành công');
                    $state.go('index.fertilizer-details', {
                        fertilizerId: vm.fertilizerId
                    })

                },
                function (err) {
                    toastr.error(err.message, 'Lỗi')
                }
            )
        };
        function cancel(){
            $state.go('index.fertilizer');
        }

    };
})();