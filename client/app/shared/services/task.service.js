(function () {
    angular.module('app.services')
        .factory('TaskService', TaskService);

    TaskService.$inject = ['$http', '$q', 'appConfigs']
    function TaskService($http, $q, appConfigs) {
        var apiUrl = appConfigs.baseUrl.concat(appConfigs.port).concat(appConfigs.baseApiUrl).concat("tasks");

        return {
            loadTasks: loadTasks,
            loadMyTasks: loadMyTasks,
            // listAllTaskById: listAllTaskById,
            getTask: getTask,
            createTask: createTask,
            updateTask: updateTask,
            deleteTask: deleteTask,
        };

        function loadMyTasks() {
            // var deferred = $q.defer();
            return $http.get(apiUrl + '/my-tasks').then(function (res) {
                return res.data;
            }, function (err) {
                return err.data;
            });
        };

        function loadTasks() {
            // var deferred = $q.defer();
            return $http.get(apiUrl + '/tasks').then(function (res) {
                return res.data;
            }, function (err) {
                return err.data;
            });
        };

        // function listAllTaskById() {
        //     // var deferred = $q.defer();
        //     return $http.get(apiUrl + '/tasks').then(function (res) {
        //         return res.data;
        //     }, function (err) {
        //         return err.data;
        //     });
        // };


        function getTask(id) {
            var deferred = $q.defer();
            $http.get(apiUrl + '/' + id).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function createTask(data) {
            var deferred = $q.defer();
            $http.post(apiUrl, data).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function updateTask(data) {
            var id = data._id;
            var deferred = $q.defer();
            $http.put(apiUrl + '/' + id, data).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function deleteTask(id) {
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