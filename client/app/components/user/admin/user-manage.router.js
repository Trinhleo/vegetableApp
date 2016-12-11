(function () {
    angular.module('app.userManage')
        .config(UserManage);
    UserManage.$inject = ['$stateProvider'];
    function UserManage($stateProvider) {
        $stateProvider
            .state('index.user-manage', {
                url: "/admin/users",
                templateUrl: 'app/components/user/admin/user-manage.html',
                controller: 'UserManageController',
                controllerAs: 'vm'
            })
            .state('index.user-details', {
                url: "/admin/users/:userId",
                templateUrl: 'app/components/user/admin/user-details.html',
                controller: 'UserDetailsController',
                controllerAs: 'vm'
            })
            .state('index.user-edit', {
                url: "/admin/users/:userId/edit",
                templateUrl: 'app/components/user/admin/edit-user.html',
                controller: 'EditUserController',
                controllerAs: 'vm'
            });
    };
})();