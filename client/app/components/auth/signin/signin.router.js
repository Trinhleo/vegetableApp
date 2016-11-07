(function () {
    angular.module('app.signin')
        .config(Signin);
    Signin.$inject = ['$stateProvider'];
    function Signin($stateProvider) {
        $stateProvider
            .state('index.signin', {
                url: '/signin',
                templateUrl: 'app/components/auth/signin/signin.html',
                controller: 'SigninController',
                controllerAs: 'vm'
            })
    }
})();