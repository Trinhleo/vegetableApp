(function () {
    angular.module('app.product')
        .config(ProductRouter);
    ProductRouter.$inject = ['$stateProvider']
    function ProductRouter($stateProvider) {
        $stateProvider
            .state('index.product', {
                url: "/products",
                templateUrl: 'app/components/product/product.html',
                controller: 'ProductController',
                controllerAs: 'vm'
            })
            .state('index.product-details', {
                url: "/products/:productId",
                templateUrl: 'app/components/product/product-details.html',
                controller: 'DetailsProductController',
                controllerAs: 'vm'
            });

    }
})();