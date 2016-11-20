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
                $rootScope.isAdmin = $localStorage.userInfo.roles[0] === 'admin' ? true : false;
                console.log($state.previous.state);
                $state.go(!$state.previous.state.abstract ? $state.previous.state : 'index.product')
                // console.log(err)
                // vm.alert = err.data.message || err.message;

            }, function (err) {
                toastr.error(err.errMsg, 'Lỗi đăng nhập');
            });
        };
    };
})();