(function () {
    angular.module('app.signup')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['AuthService', '$state','$rootScope', '$localStorage', 'toastr'];

    function SignupController(AuthService, $state, $rootScope, $localStorage, toastr) {
        var vm = this;

        vm.signup = signup;
        vm.credentials = {
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
        };
        function signup() {

            AuthService.signup(vm.credentials).then(function (res) {
                delete $localStorage.user;
                delete $localStorage.token;
                toastr.success('Đăng ký thành công', 'Thành công');
              $('#sign_in').click();
            }, function (err) {
                toastr.error(err.errMsg, 'Lỗi đăng ký');
            });
        }
    }
})();