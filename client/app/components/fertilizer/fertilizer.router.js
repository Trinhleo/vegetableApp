(function () {
    angular.module('app.fertilizer')
        .config(FertilizerRouter);
    FertilizerRouter.$inject = ['$stateProvider']
    function FertilizerRouter($stateProvider) {
        $stateProvider
            .state('index.fertilizer', {
                url: "/fertilizers",
                templateUrl: 'app/components/fertilizer/fertilizer.html',
                controller: 'FertilizerController',
                controllerAs: 'vm'
            })
            .state('index.fertilizer-add', {
                url: "/fertilizers/add",
                templateUrl: 'app/components/fertilizer/fertilizer-add.html',
                controller: 'AddFertilizerController',
                controllerAs: 'vm'
            })
            .state('index.fertilizer-edit', {
                url: "/fertilizers/:fertilizerId/edit",
                templateUrl: 'app/components/fertilizer/fertilizer-edit.html',
                controller: 'EditFertilizerController',
                controllerAs: 'vm'
            })
            .state('index.fertilizer-details', {
                url: "/fertilizers/:fertilizerId",
                templateUrl: 'app/components/fertilizer/fertilizer-details.html',
                controller: 'DetailsFertilizerController',
                controllerAs: 'vm',
            });
    }
})();