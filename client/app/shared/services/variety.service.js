(function () {
    angular.module('app.services')
        .factory('VarietyService', VarietyService);

    VarietyService.$inject = ['$q', '$http', 'appConfigs', '$localStorage'];
    function VarietyService($q, $http, appConfigs, $localStorage) {
        var apiUrl = appConfigs.baseUrl.concat(appConfigs.port).concat(appConfigs.baseApiUrl).concat("varieties");
        return {
            listAllVarieties: listAllVarieties,
            getVariety: getVariety,
            createVariety: createVariety,
            updateVariety: updateVariety,
            deleteVariety: deleteVariety
        };

        function listAllVarieties() {
            var deferred = $q.defer();
            $http.get(apiUrl + '/').then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        function getVariety(piId) {
            var deferred = $q.defer();
            $http.get(apiUrl + '/' + piId).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };
        

        function createVariety(data) {
            var deferred = $q.defer();
            $http.post(apiUrl + '/', data).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        function updateVariety(data) {
            var deferred = $q.defer();
            $http.put(apiUrl + '/' + data._id, data).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        function deleteVariety(piId) {
             var deferred = $q.defer();
            $http.delete(apiUrl + '/' + piId).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };
    }
})();