(function () {
    angular.module('app.services')
        .factory('SeasonService', SeasonService);

    SeasonService.$inject = ['$http', '$q', 'appConfigs']
    function SeasonService($http, $q, appConfigs) {
        var apiUrl = appConfigs.baseUrl.concat(appConfigs.port).concat(appConfigs.baseApiUrl).concat("seasons");

        return {
            loadSeasons: loadSeasons,
            loadMySeasons: loadMySeasons,
            getSeason: getSeason,
            createSeason: createSeason,
            updateSeason: updateSeason,
            deleteSeason: deleteSeason,
        };

        function loadMySeasons() {
            var deferred = $q.defer();
            $http.get(apiUrl + '/my-Seasons').then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function loadSeasons() {
            var deferred = $q.defer();
            $http.get(apiUrl).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function getSeason(id) {
            var deferred = $q.defer();
            $http.get(apiUrl + '/' + id).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function createSeason(data) {
            var deferred = $q.defer();
            $http.post(apiUrl, data).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function updateSeason(data) {
            var id = data._id;
            var deferred = $q.defer();
            $http.put(apiUrl + '/' + id, data).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function deleteSeason(id) {
            var deferred = $q.defer();
            $http.delete(apiUrl + '/' + id).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
    };
})();