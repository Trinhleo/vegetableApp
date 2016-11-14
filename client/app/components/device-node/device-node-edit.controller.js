(function () {
    angular.module('app.device-node')
        .controller('EditDeviceNodeController', EditDeviceNodeController);

    EditDeviceNodeController.$inject = ['DeviceNodeService', '$state', '$stateParams', 'toastr'];
    function EditDeviceNodeController(DeviceNodeService, $state, $stateParams, toastr) {
        vm = this;
        vm.deviceNodeId = $stateParams.deviceNodeId;
        vm.formData = {};
        vm.edit = edit;
        DeviceNodeService.getDeviceNode(vm.deviceNodeId).then(
            function (res) {
                vm.formData = res;
            },
            function (err) {
                toastr.error(err.message, "Lỗi")
            }
        );

        function edit() {
            DeviceNodeService.updateDeviceNode(vm.formData).then(
                function (res) {
                    toastr.success('Cập nhật thành công', 'Thành công');
                    $state.go('index.device-node-details', {
                        deviceNodeId: vm.deviceNodeId
                    })

                },
                function (err) {
                    toastr.error(err.message, 'Lỗi')
                }
            )
        };

    };
})();