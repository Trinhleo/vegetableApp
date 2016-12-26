(function () {
    angular.module('app.services')
        .factory('FertilizerService', FertilizerService);

    FertilizerService.$inject = ['$q', '$http', 'appConfigs', '$localStorage'];
    function FertilizerService($q, $http, appConfigs, $localStorage) {
        var apiUrl = appConfigs.baseUrl.concat(appConfigs.port).concat(appConfigs.baseApiUrl).concat("fertilizers");
        return {
            listAllFertilizers: listAllFertilizers,
            getFertilizer: getFertilizer,
            createFertilizer: createFertilizer,
            updateFertilizer: updateFertilizer,
            deleteFertilizer: deleteFertilizer
        };

        function listAllFertilizers() {
            var deferred = $q.defer();
            $http.get(apiUrl + '/').then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function getFertilizer(piId) {
            var deferred = $q.defer();
            $http.get(apiUrl + '/' + piId).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function createFertilizer(data) {
            var deferred = $q.defer();
            $http.post(apiUrl + '/', data).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function updateFertilizer(data) {
            var deferred = $q.defer();
            $http.put(apiUrl + '/' + data._id, data).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function deleteFertilizer(piId) {
             var deferred = $q.defer();
            $http.delete(apiUrl + '/' + piId).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
    }
})();