(function () {
    angular.module('app.garden')
        .config(GardenRouter);
    GardenRouter.$inject = ['$stateProvider']
    function GardenRouter($stateProvider) {
        $stateProvider
            .state('index.garden', {
                url: "/garden",
                templateUrl: 'app/components/garden/garden.html',
                controller: 'GardenController',
                controllerAs: 'vm'
            })
             .state('index.garden-add', {
                url: "/garden-add",
                templateUrl: 'app/components/garden/garden-add.html',
                controller: 'AddGardenController',
                controllerAs: 'vm'
            })


    }
})();