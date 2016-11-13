(function () {
    angular.module('app.services')
        .factory('ProductionItemService', ProductionItemService);

    ProductionItemService.$inject = ['$q', '$http', 'appConfigs', '$localStorage'];
    function ProductionItemService($q, $http, appConfigs, $localStorage) {
        var apiUrl = appConfigs.baseUrl.concat(appConfigs.port).concat(appConfigs.baseApiUrl).concat("production-item");
        return {
            listAllProductionItems: listAllProductionItems,
            getProductionItem: getProductionItem,
            createProductionItem: createProductionItem,
            updateProductionItem: updateProductionItem,
            deleteProductionItem: deleteProductionItem
        };

        function listAllProductionItems() {
            var deferred = $q.defer();
            $http.get(apiUrl + '/').then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function getProductionItem(piId) {
            var deferred = $q.defer();
            $http.get(apiUrl + '/' + piId).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function createProductionItem(data) {
            var deferred = $q.defer();
            $http.post(apiUrl + '/', data).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function updateProductionItem(data) {
            var deferred = $q.defer();
            $http.put(apiUrl + '/' + data._id, data).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function deleteProductionItem(piId) {
            $http.delete(apiUrl + '/' + piId).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
    }
})();