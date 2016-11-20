(function () {
    angular.module('app.production-item')
        .config(ProductionItemRouter);
    ProductionItemRouter.$inject = ['$stateProvider']
    function ProductionItemRouter($stateProvider) {
        $stateProvider
            .state('index.production-item', {
                url: "/production-items",
                templateUrl: 'app/components/production-item/production-item.html',
                controller: 'ProductionItemController',
                controllerAs: 'vm'
            })
            .state('index.production-item-add', {
                url: "/production-items/add",
                templateUrl: 'app/components/production-item/production-item-add.html',
                controller: 'AddProductionItemController',
                controllerAs: 'vm'
            })
            .state('index.production-item-edit', {
                url: "/production-items/:productionItemId/edit",
                templateUrl: 'app/components/production-item/production-item-edit.html',
                controller: 'EditProductionItemController',
                controllerAs: 'vm'
            })
            .state('index.production-item-details', {
                url: "/production-items/:productionItemId",
                templateUrl: 'app/components/production-item/production-item-details.html',
                controller: 'DetailsProductionItemController',
                controllerAs: 'vm',
            });
    }
})();