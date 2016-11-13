(function () {
    angular
        .module('app', [
            'ui.router',
            'ui.bootstrap',
            'ngAnimate',
            'ngMessages',
            'ngMaterial',
            'ngAria',
            'toastr',
            'ngStorage',
            'ngFileUpload',
            'angularFileUpload',
            'ui.bootstrap.datetimepicker',
            'geolocation',
            'md.data.table',
            'app.config',
            'app.routes',
            'app.core',
            'app.services',
            'app.signup',
            'app.signin',
            'app.signout',
            'app.dashboard',
            'app.user',
            'app.user.setting',
            'app.garden',
            'app.season',
            'app.product',
            'app.production-item',
            'app.device-node'
        ])
        .run(function ($rootScope, $state, $localStorage) {
            // Check authentication before changing state
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                if (toState.name != "index.signin" && toState.name != "index.signup" && toState.name != "index"
                    && toState.name != "index.dashboard" && toState.name != "index.product" && toState.name != "index.garden"
                    && toState.name != "index.season") {
                    if (!$localStorage.token && !$localStorage.user) {
                        event.preventDefault();
                        $state.go('index.signin')
                    }
                }
            });
        });
})();