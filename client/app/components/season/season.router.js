(function () {
    angular.module('app.season')
        .config(SeasonRouter);
    SeasonRouter.$inject = ['$stateProvider']
    function SeasonRouter($stateProvider) {
        $stateProvider
            .state('index.season', {
                url: "/season",
                templateUrl: 'app/components/season/season.html',
                controller: 'SeasonController',
                controllerAs: 'vm'
            })

    }
})();