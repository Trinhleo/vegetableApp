(function () {
    angular.module('app.user.setting')
        .config(UserSettingRouter);
    function UserSettingRouter($stateProvider) {
        $stateProvider
            .state('index.settings', {
                url: "/settings",
                abstract: true,
                templateUrl: 'app/components/user/settings/user-setting.html',
                controller: 'UserSettingController',
                controllerAs: 'vm'
            })
            .state('index.settings.profile', {
                url: "/profile",
                templateUrl: 'app/components/user/settings/edit-profile.html',
                controller: 'UserSettingController',
                controllerAs: 'vm'
            })
            .state('index.settings.picture', {
                url: "/picture",
                templateUrl: 'app/components/user/settings/change-profile-picture.html',
                controller: 'ChangeProfilePictureController',
                controllerAs: 'vm'
            })
            .state('index.settings.change_password', {
                url: "/change-password",
                templateUrl: 'app/components/user/settings/change-password.html',
                controller: 'ChangePasswordController',
                controllerAs: 'vm'
            });
    };
})();