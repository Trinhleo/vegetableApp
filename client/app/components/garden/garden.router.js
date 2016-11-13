(function () {
    angular.module('app.garden')
        .config(GardenRouter);
    GardenRouter.$inject = ['$stateProvider']
    function GardenRouter($stateProvider) {
        $stateProvider
            .state('index.garden', {
                url: "/gardens",
                templateUrl: 'app/components/garden/garden.html',
                controller: 'GardenController',
                controllerAs: 'vm'
            })
            .state('index.garden-add', {
                url: "/gardens/add",
                templateUrl: 'app/components/garden/garden-add.html',
                controller: 'AddGardenController',
                controllerAs: 'vm'
            })
            .state('index.garden-edit', {
                url: "/gardens/:gardenId/edit",
                templateUrl: 'app/components/garden/garden-edit.html',
                controller: 'EditGardenController',
                controllerAs: 'vm'
            })
            .state('index.garden-details', {
                url: "/gardens/:gardenId",
                templateUrl: 'app/components/garden/garden-details.html',
                controller: 'DetailsGardenController',
                controllerAs: 'vm'
            })


    }
})();