(function () {
    angular.module('app.services')
        .factory('NotificationService', NotificationService);
    NotificationService.$inject = ['$q', '$http', 'appConfigs', '$localStorage'];
    function NotificationService($q, $http, appConfigs) {
        var apiUrl = appConfigs.baseUrl.concat(appConfigs.port).concat(appConfigs.baseApiUrl).concat('notifications');
        return {
            loadNewNotifications: loadNewNotifications,
            loadNotifications: loadNotifications,
            readNotification: readNotification
        };

        function loadNewNotifications() {
            var deferred = $q.defer();
            debugger;
            $http.get(apiUrl + '/unread').then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        function loadNotifications() {
            var deferred = $q.defer();
            $http.get(apiUrl).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        function readNotification(id) {
            var deferred = $q.defer();
            $http.get(apiUrl + '/' + id + '/read').then(function (res) {
                debugger
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }

})();