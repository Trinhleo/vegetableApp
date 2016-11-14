(function () {
    angular.module('app.device-node')
        .controller('AddDeviceNodeController', AddDeviceNodeController);

    AddDeviceNodeController.$inject = ['DeviceNodeService','toastr'];
    function AddDeviceNodeController(DeviceNodeService,toastr) {
        vm = this;
        vm.formData = {
            name: "",
            description: ""
        };
        vm.add = add;
        function add() {
            DeviceNodeService.createDeviceNode(vm.formData).then(
                function (res) {
                    vm.formData = {
                        name: "",
                        description: ""
                    }
                    toastr.success('Thêm thiết bị thành công', 'Thành công!')
                },
                function (err) {
                    toastr.error(err.message, 'Lỗi');
                }
            )
        }
    };
})();