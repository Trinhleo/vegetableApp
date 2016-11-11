(function () {
    angular.module('app.services')
        .factory('GardenService', GardenService);

    GardenService.$inject = ['$http', '$q', 'appConfigs']
    function GardenService($http, $q, appConfigs) {
        var apiUrl = appConfigs.baseUrl.concat(appConfigs.port).concat(appConfigs.baseApiUrl).concat("gardens");
    
        return {
            loadGardens: loadGardens,
            loadMyGardens: loadMyGardens,
            getGarden: getGarden,
            createGarden: createGarden,
            updateGarden: updateGarden,
            deleteGarden: deleteGarden,
            getGardenImages: getGardenImages,
            addToFavoriteGardens: addToFavoriteGardens,
            removeFavoriteGarden: removeFavoriteGarden,
            checkFavoriteGarden: checkFavoriteGarden,
            myFavoriteGardens: myFavoriteGardens
        };

        function loadMyGardens() {
            var deferred = $q.defer();
            $http.get(apiUrl + '/my-gardens').then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        function loadGardens() {
            var deferred = $q.defer();
            $http.get(apiUrl).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function getGarden(id) {
            var deferred = $q.defer();
            $http.get(apiUrl + '/' + id).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function createGarden(data) {
            var deferred = $q.defer();
            $http.post(apiUrl, data).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function updateGarden(data) {
            var id = data._id;
            var deferred = $q.defer();
            $http.put(apiUrl + '/' + id, data).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function deleteGarden(id) {
            var deferred = $q.defer();
            $http.delete(apiUrl + '/' + id).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function getGardenImages(id) {
            var deferred = $q.defer();
            $http.get(apiUrl + '/' + id + '/images').then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function addToFavoriteGardens(GardenId) {
            var deferred = $q.defer();
            var evtInfo = {
                Garden: GardenId
            }
            $http.post(apiUrl + '/my-favorite-Gardens', evtInfo).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;

        };

        function removeFavoriteGarden(GardenId) {
            var deferred = $q.defer();
            $http.delete(apiUrl + '/my-favorite-Gardens/' + GardenId).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;

        };

        function checkFavoriteGarden(GardenId) {
            var deferred = $q.defer();
            $http.get(apiUrl + '/my-favorite-Gardens/' + GardenId).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function myFavoriteGardens() {
            var deferred = $q.defer();
            $http.get(apiUrl + '/my-favorite-Gardens').then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
    };
})();