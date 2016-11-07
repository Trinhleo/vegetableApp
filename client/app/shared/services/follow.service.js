(function () {
    angular.module('app.services')
        .factory('FollowService', FollowService);
    FollowService.$inject = ['$q', '$http', 'appConfigs', '$localStorage'];
    function FollowService($q, $http, appConfigs, $localStorage) {
        var apiUrl = appConfigs.baseUrl.concat(appConfigs.port).concat(appConfigs.baseApiUrl).concat("user");
        return {
            follow: follow,
            unfollow: unfollow,
            myFollows: myFollows,
            myFollowers: myFollowers,
            checkFollow: checkFollow,
            followersOfUser: followersOfUser,
            followsOfUser: followsOfUser
        };

        function follow(userId) {
            var deferred = $q.defer();
            $http.get(apiUrl + '/' + userId + '/follow').then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function unfollow(userId) {
            var deferred = $q.defer();
            $http.delete(apiUrl + '/' + userId + '/follow').then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function myFollowers() {
            var deferred = $q.defer();
            $http.get(apiUrl + '/me/followers').then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function myFollows() {
            var deferred = $q.defer();
            $http.get(apiUrl + '/me/follows').then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function checkFollow(data) {
            var deferred = $q.defer();
            $http.post(apiUrl + '/me/follow-checking', data).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function followersOfUser(userId) {
            var deferred = $q.defer();
            $http.get(apiUrl + '/' + userId + '/followers').then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function followsOfUser(userId) {
            var deferred = $q.defer();
            $http.get(apiUrl + '/' + userId + '/follows').then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
    }
})();