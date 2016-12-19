(function () {
    angular.module('app.user.setting')
        .controller('ChangePasswordController', ChangePasswordController);
    ChangePasswordController.$inject = ['UserService', 'toastr', '$state'];
    function ChangePasswordController(UserService, toastr, $state) {
        var vm = this;
        vm.userInfo = {};
        vm.changePassword = changePassword;
        function changePassword() {
            UserService.changePassword(vm.userInfo).then(
                function (res) {
                    toastr.success("Đổi mật khẩu thành công!", "Thành công")
                    $state.go('index.me');
                },
                function (err) {
                    toastr.error(err.errMsg, "Lỗi")
                }
            )
        }
    }
})();