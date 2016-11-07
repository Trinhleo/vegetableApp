(function () {
    angular.module('app.signout')
        .controller('SignoutController', SignoutController);

    SignoutController.$inject = ['$rootScope', '$state', '$localStorage', 'AuthService'];

    function SignoutController($rootScope, $state, $localStorage, AuthService) {

        AuthService.signout().then(function (res) {
            delete $localStorage.user;
            delete $localStorage.token;
            delete $localStorage.userInfo;
            delete $rootScope.userInfo;
            $state.go('index.signin');
        }, function (err) {
            $rootScope.alert = err.data.message;
        });
    }
})();

