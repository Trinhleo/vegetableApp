(function () {
    angular.module('app.services')
        .factory('ProductService', ProductService);

    ProductService.$inject = ['$http', '$q', 'appConfigs']
    function ProductService($http, $q, appConfigs) {
        var apiUrl = appConfigs.baseUrl.concat(appConfigs.port).concat(appConfigs.baseApiUrl).concat("products");

        return {
            listProducts: listProducts,
            listProductsByGroupId: listProductsByGroupId
        };

        function listProducts() {
            return $http.get(apiUrl + '/').then(function (res) {
                return res.data;
            }, function (err) {
                return err.data;
            });
        };
        
        function listProductsByGroupId(groupId) {
            return $http.get(apiUrl + '/' + groupId).then(function (res) {
                console.log(res);
                return res.data;
            }, function (err) {
                return err.data;
            });
        };
    };
})();