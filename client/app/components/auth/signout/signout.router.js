(function () {
    angular.module('app.signout')
        .config(Signout);

    function Signout($stateProvider) {

        $stateProvider
            .state('index.signout', {
                url: '/signout',
                controller: 'SignoutController',
                controllerAs: 'vm'
            });
    };
})();