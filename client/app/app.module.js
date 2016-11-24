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
                    && toState.name != "index.season" && toState.name != "index.garden-details"
                    && toState.name != "index.season.details" && toState.name != "index.season" && toState.name != "index.season.list"
                    && toState.name != "index.season-th") {
                    if (!$localStorage.token && !$localStorage.user) {
                        event.preventDefault();
                        delete $localStorage.user;
                        delete $localStorage.token;
                        delete $localStorage.userInfo;
                        delete $rootScope.userInfo;
                        delete $rootScope.isAdmin;
                        $state.go('index.signin')
                        storePreviousState(toState, toParams);
                    }
                }
            });
            // Record previous state
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                storePreviousState(fromState, fromParams);
            });
            // Store previous state
            function storePreviousState(state, params) {

                if (!state.data || !state.data.ignoreState) {
                    $state.previous = {
                        state: state,
                        params: params,
                        href: $state.href(state, params)
                    };
                }
            }
            // $rootScope.$state = $state;
            // $rootScope.$stateParams = $stateParams;
        });
})();