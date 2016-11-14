(function () {
    angular.module('app.services')
        .factory('DeviceNodeService', DeviceNodeService);

    DeviceNodeService.$inject = ['$q', '$http', 'appConfigs', '$localStorage'];
    function DeviceNodeService($q, $http, appConfigs, $localStorage) {
        var apiUrl = appConfigs.baseUrl.concat(appConfigs.port).concat(appConfigs.baseApiUrl).concat("device-nodes");
        return {
            listAllDeviceNodes: listAllDeviceNodes,
            getDeviceNode: getDeviceNode,
            createDeviceNode: createDeviceNode,
            updateDeviceNode: updateDeviceNode,
            deleteDeviceNode: deleteDeviceNode
        };

        function listAllDeviceNodes() {
            var deferred = $q.defer();
            $http.get(apiUrl + '/').then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function getDeviceNode(dvnId) {
            var deferred = $q.defer();
            $http.get(apiUrl + '/' + dvnId).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function createDeviceNode(data) {
            var deferred = $q.defer();
            $http.post(apiUrl + '/', data).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function updateDeviceNode(data) {
            var deferred = $q.defer();
            $http.put(apiUrl + '/' + data._id, data).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function deleteDeviceNode(dvnId) {
            var deferred = $q.defer();
            $http.delete(apiUrl + '/' + dvnId).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
    }
})();