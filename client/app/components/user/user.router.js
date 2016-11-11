(function () {
    angular.module('app.user')
        .config(UserRouter);
    UserRouter.$inject = ['$stateProvider'];
    function UserRouter($stateProvider) {
        $stateProvider
            .state('index.me', {
                url: "/me",
                templateUrl: 'app/components/user/user.html',
                controller: 'UserController',
                controllerAs: 'vm'
            })
            .state('index.user-event', {
                url: "/users/:userId",
                templateUrl: 'app/components/user/user.html',
                controller: 'UserController',
                controllerAs: 'vm'
            });
    };
})();