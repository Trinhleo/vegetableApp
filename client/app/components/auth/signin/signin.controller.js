(function () {
    angular.module('app.signin')
        .controller('SigninController', SigninController);

    SigninController.$inject = ['AuthService', '$localStorage', '$state', '$rootScope', 'toastr'];

    function SigninController(AuthService, $localStorage, $state, $rootScope, toastr) {
        vm = this;
        vm.signin = signin;
        vm.user = {
            username: "",
            password: ""
        };


        function signin() {
            AuthService.signin(vm.user).then(function (res) {

                $localStorage.token = res.access_token;
                $localStorage.user = res.name;
                $localStorage.userInfo = res.userInfo;
                $rootScope.userInfo = $localStorage.userInfo;
                $state.go('index.product');
            }, function (err) {
                // console.log(err)
                // vm.alert = err.data.message || err.message;
                toastr.error(err.data.message, 'sign in');
            });
        };
    };
})();