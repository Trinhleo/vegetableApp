(function () {
    angular.module('app.dashboard')
        .config(DashboardRoute);


    function DashboardRoute($stateProvider) {
        $stateProvider
            .state('index.dashboard', {
                url: "/dashboard",
                templateUrl: 'app/components/dashboard/dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'vm'
            });
    }
})();