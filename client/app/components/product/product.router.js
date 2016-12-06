(function () {
    angular.module('app.product')
        .config(ProductRouter);
    ProductRouter.$inject = ['$stateProvider']
    function ProductRouter($stateProvider) {
        $stateProvider
            .state('index.product', {
                url: "/products-group",
                templateUrl: 'app/components/product/product-group.html',
                controller: 'ProductGroupController',
                controllerAs: 'vm',
                resolve: {
                    productGroups: function (ProductService) {
                        return ProductService.listProducts().then(
                            function (res) {
                                return res;
                            }
                        )
                    }
                }
            })
            .state('index.product-ingroup', {
                url: "/products-group/:groupId",
                templateUrl: 'app/components/product/product.html',
                controller: 'ProductController',
                controllerAs: 'vm',
                resolve: {
                    products: function (ProductService,$stateParams) {
                        return ProductService.listProductsByGroupId($stateParams.groupId).then(
                            function (res) {
                                return res;
                            }
                        )
                    }
                }
            });
    }
})();