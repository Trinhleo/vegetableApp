(function () {
    angular.module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$state', '$localStorage', '$rootScope'];

    function DashboardController($state, $localStorage, $rootScope) {
        var vm = this;
        $rootScope.user = $localStorage.user;
        $rootScope.userInfo = $localStorage.userInfo;
    }
})();
