(function () {
    angular.module('app.signup')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['AuthService', '$state', '$timeout', '$rootScope', '$localStorage','toastr'];

    function SignupController(AuthService, $state, $rootScope, $localStorage,toátr) {
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
                $rootScope.alert = "Sign up success! please sign in!"
                delete $localStorage.user;
                delete $localStorage.token;
                 toastr.success('Đăng ký thành công','Thành công')
                $state.go('index.signin');
            }, function (err) {
                toastr.error('Không thể đăng ký','Lỗi đăng ký')
            });
        }
    }
})();