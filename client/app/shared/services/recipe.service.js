(function () {
    angular.module('app.services')
        .factory('RecipeService', RecipeService);

    RecipeService.$inject = ['$timeout', '$q', '$http', 'appConfigs', '$localStorage'];
    function RecipeService($timeout, $q, $http, appConfigs, $localStorage) {
        var apiUrl = appConfigs.baseUrl.concat(appConfigs.port).concat(appConfigs.baseApiUrl).concat("recipes");
        return {
            listAllRecipes: listAllRecipes,
            getRecipe: getRecipe,
            createRecipe: createRecipe,
            updateRecipe: updateRecipe,
            deleteRecipe: deleteRecipe
        };

        function listAllRecipes() {
            var deferred = $q.defer();
            $http.get(apiUrl + '/').then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function getRecipe(piId) {
            var deferred = $q.defer();
            $http.get(apiUrl + '/' + piId).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function createRecipe(data) {
            var deferred = $q.defer();
            $http.post(apiUrl + '/', data).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        function updateRecipe(data) {
            var deferred = $q.defer();
            $http.put(apiUrl + '/' + data._id, data).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function deleteRecipe(piId) {
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