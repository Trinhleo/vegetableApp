(function () {
    angular.module('app.device-node')
        .controller('DetailsDeviceNodeController', DetailsDeviceNodeController);

    DetailsDeviceNodeController.$inject = ['DeviceNodeService', 'toastr', '$stateParams', '$state'];
    function DetailsDeviceNodeController(DeviceNodeService, toastr, $stateParams, $state) {
        vm = this;
        vm.deviceNode = {};
        vm.remove = remove;
        DeviceNodeService.getDeviceNode($stateParams.deviceNodeId).then(
            function (res) {
                vm.deviceNode = res;
            },
            function (err) {
                toastr.error(err.message, "Lỗi")
            }
        );

        function remove() {
            if (confirm('Bạn có thực sự muốn xóa không?')) {
                DeviceNodeService.deleteDeviceNode($stateParams.deviceNodeId).then(
                    function (res) {
                        toastr.success("Xóa thành công", 'Thành công!');
                        $state.go('index.device-node');
                    },
                    function (err) {
                        toastr.error("Xóa thất bại", 'Thất bại!')
                    }
                )
            }
        }
    };
})();