(function () {
    angular.module('app.variety')
        .controller('EditVarietyController', EditVarietyController);

    EditVarietyController.$inject = ['VarietyService', '$state', '$stateParams','toastr'];
    function EditVarietyController(VarietyService, $state, $stateParams, toastr) {
        vm = this;
        vm.varietyId = $stateParams.varietyId;
        vm.formData = {};
        vm.update = update;
        vm.cancel = cancel;
        VarietyService.getVariety(vm.varietyId).then(
            function (res) {
                vm.formData = res;
            },
            function (err) {
                toastr.error(err.message, "Lỗi")
            }
        );

        function update() {
            VarietyService.updateVariety(vm.formData).then(
                function (res) {
                    toastr.success('Cập nhật thành công', 'Thành công');
                    $state.go('index.variety-details', {
                        varietyId: vm.varietyId
                    })

                },
                function (err) {
                    toastr.error(err.message, 'Lỗi')
                }
            )
        };
        function cancel(){
            $state.go('index.variety');
        }

    };
})();