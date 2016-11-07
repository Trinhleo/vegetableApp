(function () {
    angular.module('app.user.setting')
        .controller('UserSettingController', UserSettingController);

    UserSettingController.$inject = ['$rootScope', 'UserService'];

    function UserSettingController($rootScope, UserService) {
        var vm = this;

        vm.userInfo = {};
        vm.updateUserInfo = updateUserInfo;
        // vm.changeProfilePicture = changeProfilePicture;

        getMyUserInfo()
        function getMyUserInfo() {
            UserService.getMyUserInfo().then(function (res) {
                vm.userInfo = res;
            }, function (err) {
                $rootScope.alert = err.data.message;
                $state.go('index.signin');
            });
        };


        function updateUserInfo() {

            UserService.updateUserInfo(vm.userInfo).then(function (res) {
                console.log(res);
                $rootScope.alert = "Success!";
            }, function (err) {
                $rootScope.alert = err.data.message;
            });
        };
    };
})();