(function () {
    angular.module('app.product')
        .config(ProductRouter);
    ProductRouter.$inject = ['$stateProvider']
    function ProductRouter($stateProvider) {
        $stateProvider
            .state('index.Product', {
                url: "/Product",
                abstract: true,
                templateUrl: 'app/components/product/product.html',
                controller: 'ProductController',
                controllerAs: 'vm'
            })

    }
})