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
            .state('index.season-add', {
                url: "/seasons/add",
                templateUrl: 'app/components/season/season-add.html',
                controller: 'AddSeasonController',
                controllerAs: 'vm'
            })
            .state('index.season-edit', {
                url: "/seasons/:seasonId/edit",
                templateUrl: 'app/components/season/season-edit.html',
                controller: 'EditSeasonController',
                controllerAs: 'vm'
            })
            .state('index.season-details', {
                url: "/seasons/:seasonId",
                templateUrl: 'app/components/season/season-details.html',
                controller: 'DetailsSeasonController',
                controllerAs: 'vm'
            });

    }
})();