(function () {
    angular.module('app.device-node')
        .controller('DeviceNodeController', DeviceNodeController);
    DeviceNodeController.$inject = ['DeviceNodeService','toastr'];
    function DeviceNodeController(DeviceNodeService,toastr) {
        vm = this;
        vm.deviceNode = [];
        DeviceNodeService.listAllDeviceNodes().then(
            function (res) {
                vm.deviceNode = res;
            },
            function (err) {
                toastr.error(err.message, 'Lỗi!')
            }
        )
    };
})()