(function () {
    angular.module('app.signup')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['AuthService', '$state', '$timeout', '$rootScope', '$localStorage'];

    function SignupController(AuthService, $state, $rootScope, $localStorage) {
        var vm = this;

        vm.signup = signup;
        vm.credentials = {
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
        };
        vm.alert = "";
        function signup() {

            AuthService.signup(vm.credentials).then(function (res) {
                $rootScope.alert = "Sign up success! please sign in!"
                delete $localStorage.user;
                delete $localStorage.token;
                $state.go('index.signin');
            }, function (err) {
                vm.alert = err.data.message;
            });
        }
    }
})();