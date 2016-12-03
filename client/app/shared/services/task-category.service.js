(function () {
    angular.module('app.services')
        .factory('TaskCategoryService', TaskCategoryService);

    TaskCategoryService.$inject = ['$q', '$http', 'appConfigs', '$localStorage'];
    function TaskCategoryService($q, $http, appConfigs, $localStorage) {
        var apiUrl = appConfigs.baseUrl.concat(appConfigs.port).concat(appConfigs.baseApiUrl).concat("task-categories");
        return {
            listAllTaskCategories: listAllTaskCategories,
            getTaskCategory: getTaskCategory,
            createTaskCategory: createTaskCategory,
            updateTaskCategory: updateTaskCategory,
            deleteTaskCategory: deleteTaskCategory
        };

        function listAllTaskCategories() {
            return $http.get(apiUrl + '/').then(function (res) {
                return res.data
            }, function (err) {
                return err.data
            });
        };

        function getTaskCategory(piId) {
            var deferred = $q.defer();
            $http.get(apiUrl + '/' + piId).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function createTaskCategory(data) {
            var deferred = $q.defer();
            $http.post(apiUrl + '/', data).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function updateTaskCategory(data) {
            var deferred = $q.defer();
            $http.put(apiUrl + '/' + data._id, data).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function deleteTaskCategory(tId) {
             var deferred = $q.defer();
            $http.delete(apiUrl + '/' +tId).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
    }
})();