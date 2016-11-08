(function () {
    angular.module('app.core')
        .config(CoreRoute);

    CoreRoute.$inject = ['$stateProvider'];
    function CoreRoute($stateProvider) {
        $stateProvider
            .state('index', {
                templateUrl: 'app/components/core/core.html',
                abstract: true,
                controller: 'CoreController',
                controllerAs: 'vm',
                redirectTo: 'index.product'
            });
    }
})();
