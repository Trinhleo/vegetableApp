(function () {
    angular.module('app.services')
        .factory('AuthService', AuthService);

    AuthService.$inject = ['$q', '$http', 'appConfigs', '$localStorage'];
    function AuthService($q, $http, appConfigs, $localStorage) {
        var apiUrl = appConfigs.baseUrl.concat(appConfigs.port).concat(appConfigs.baseApiUrl).concat("auth");
        // $http.get('http://127.0.0.1:3000/rest/getenv').then(
        //     function (res) {
        //         basrUrl = res.result.concat(':');
        //         apiUrl = appConfigs.baseUrl.concat(appConfigs.port).concat(appConfigs.baseApiUrl).concat("auth");
        //         console.log(apiUrl);
        //     },
        //     function (err) {
        //     }
        // )
        return {
            signin: signin,
            signup: signup,
            signout: signout
        };

        function signin(data) {
            var deferred = $q.defer();

            $http.post(apiUrl + '/signin', data).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function signup(data) {
            var deferred = $q.defer();

            $http.post(apiUrl + '/signup', data).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        function signout() {
            var deferred = $q.defer();
            $http.get(apiUrl + '/signout').then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
    };
})();
