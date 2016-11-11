(function () {
    "use strict";
    angular.module('app.routes', [])
        .factory('httpInterceptor', httpInterceptor)
        .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
            $httpProvider.interceptors.push('httpInterceptor');
            $urlRouterProvider
                .otherwise(function ($injector) {
                    var $state = $injector.get('$state');
                    console.log($state);
                    $state.go('index.dashboard');
                });
        });

    httpInterceptor.$inject = ['$q', '$location', '$localStorage'];

    function httpInterceptor($q, $location, $localStorage) {
        return {
            request: function (_config) {
                // if (_config.url.indexOf('.html') === -1 && _config.url.indexOf('http') === -1) {
                //     // _config.url = 'http://janeto.us.to:7555/' + _config.ur   l;
                //     _config.url = 'http://localhost:17453/' + _config.url;
                // }
                if ($localStorage.token) {
                    _config.headers.authorization = $localStorage.token;
                }
                return _config;
            },
            responseError: function (rejection) {
                if (rejection.status === 401 || rejection.status === 403 || rejection.status === 419) {

                    delete $localStorage.token;
                    delete $localStorage.user;
                    $location.path('/signin');
                    return $q.reject(rejection);
                } else {
                    return $q.reject(rejection);
                }
            }
        };
    };

})();