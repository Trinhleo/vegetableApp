(function () {
    angular.module('app.production-item')
        .config(ProductionItemRouter);
    ProductionItemRouter.$inject = ['$stateProvider']
    function ProductionItemRouter($stateProvider) {
        $stateProvider
            .state('index.production-item', {
                url: "/product-item",
                templateUrl: 'app/components/production-item/production-item.html',
                controller: 'ProductionItemController',
                controllerAs: 'vm'
            })

    }
})();