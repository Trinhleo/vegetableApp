(function () {
    angular
        .module('app', [
            'ui.router',
            'ui.bootstrap',
            'ngAnimate',
            'toastr',
            'ngStorage',
            'ngFileUpload',
            'angularFileUpload',
            'ui.bootstrap.datetimepicker',
            'geolocation',
            'app.config',
            'app.routes',
            'app.core',
            'app.services',
            'app.signup',
            'app.signin',
            'app.signout',
            'app.user',
            'app.user.setting',
            'app.events'
        ])
        .run(function ($rootScope, $state, $localStorage) {
            // Check authentication before changing state
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                if (toState.name != "index.signin" && toState.name != "index.signup" && toState.name != "index" && toState.name !="index.dashboard") {
                    if (!$localStorage.token && !$localStorage.user) {
                        event.preventDefault();
                        $state.go('index.signin')
                    }
                }
            });
        });
})();