(function () {
    angular.module('app.production-item')
        .controller('UserDetailsController', UserDetailsController);

    UserDetailsController.$inject = ['AdminService', '$state', '$stateParams', 'toastr'];
    function UserDetailsController(AdminService, $state, $stateParams, toastr) {
        vm = this;
        vm.user = {};
        vm.remove = remove;
        getUserInfo();
        function getUserInfo() {
            AdminService.getUserInfo($stateParams.userId).then(
                function (res) {
                    vm.user = res;
                },
                function (err) {
                    toastr.error(err.message, "Lỗi")
                }
            );
        };
        function remove() {
            if (confirm('Bạn có thực sự muốn xóa không?')) {
                AdminService.deleteUser($stateParams.userId).then(
                    function (res) {
                        toastr.success("Xóa thành công", 'Thành công!');
                        $state.go('index.user-manage');
                    },
                    function (err) {
                        toastr.error("Xóa thất bại", 'Thất bại!')
                    }
                )
            }
        }
    };
})();