(function () {
    angular.module('app.production-item')
        .config(ProductionItemRouter);
    ProductionItemRouter.$inject = ['$stateProvider']
    function ProductionItemRouter($stateProvider) {
        $stateProvider
            .state('index.production-item', {
                url: "/product-items",
                templateUrl: 'app/components/production-item/production-item.html',
                controller: 'ProductionItemController',
                controllerAs: 'vm'
            })
            .state('index.production-item-add', {
                url: "/product-items/add",
                templateUrl: 'app/components/production-item/production-item-add.html',
                controller: 'AddProductionItemController',
                controllerAs: 'vm'
            })
            .state('index.production-item-edit', {
                url: "/product-items/:productionItemId/edit",
                templateUrl: 'app/components/production-item/production-item-edit.html',
                controller: 'EditProductionItemController',
                controllerAs: 'vm'
            })
            .state('index.production-item-details', {
                url: "/product-items/:productionItemId",
                templateUrl: 'app/components/production-item/production-item-details.html',
                controller: 'DetailsProductionItemController',
                controllerAs: 'vm',
            });
    }
})();