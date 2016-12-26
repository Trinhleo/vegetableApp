(function () {
    angular.module('app.variety')
        .config(VarietyRouter);
    VarietyRouter.$inject = ['$stateProvider']
    function VarietyRouter($stateProvider) {
        $stateProvider
            .state('index.variety', {
                url: "/varieties",
                templateUrl: 'app/components/variety/variety.html',
                controller: 'VarietyController',
                controllerAs: 'vm'
            })
            .state('index.variety-add', {
                url: "/varieties/add",
                templateUrl: 'app/components/variety/variety-add.html',
                controller: 'AddVarietyController',
                controllerAs: 'vm'
            })
            .state('index.variety-edit', {
                url: "/varieties/:varietyId/edit",
                templateUrl: 'app/components/variety/variety-edit.html',
                controller: 'EditVarietyController',
                controllerAs: 'vm'
            })
            .state('index.variety-details', {
                url: "/varieties/:varietyId",
                templateUrl: 'app/components/variety/variety-details.html',
                controller: 'DetailsVarietyController',
                controllerAs: 'vm',
            });
    }
})();