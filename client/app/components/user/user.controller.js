(function () {
    angular.module('app.user')
        .controller('UserController', UserController);

    UserController.$inject = ['$rootScope', 'UserService', 'FollowService', 'GalleryService', '$state', 'appConfigs', '$localStorage'];

    function UserController($rootScope, UserService, FollowService, GalleryService, $state, appConfigs, $localStorage) {
        var vm = this;
        vm.userInfo = "";
        vm.userId = $state.params.userId;
        vm.isMe = vm.userId && (vm.userId === $localStorage.userInfo._id) || !vm.userId;
        vm.images = [];
        vm.gardens = [];
        vm.isFollow = false;
        vm.doFollow = doFollow;
        if (!vm.isMe) {
            getUserInfo();
            getImages(vm.userId);
            getGardens(vm.userId);
        } else {
            getMyUserInfo();
            getImages($localStorage.userInfo._id);
            getGardens($localStorage.userInfo._id)
        };

        // checkMyFollows();
        function getGardens(userId) {
            UserService.loadGardensByUserId(userId).then(function (res) {
                vm.gardens = res;
            })
        }

        function checkMyFollows() {
            FollowService.checkFollow({ userFollowId: vm.userId })
                .then(function (res) {

                    vm.isFollow = true;
                }, function (err) {
                    vm.isFollow = false;
                });
        }

        function getMyUserInfo() {
            UserService.getMyUserInfo().then(function (res) {
                vm.userInfo = res;
            }, function (err) {
                $rootScope.alert = err.data.message;
                $state.go('signin');
            });
        };

        function getUserInfo() {
            UserService.getUserInfo(vm.userId).then(function (res) {
                vm.userInfo = res;
            }, function (err) {
                $rootScope.alert = err.data.message;
                $state.go('signin');
            });
        };

        function getImages(userId) {
            GalleryService.getImagesByUserId(userId).then(function (res) {
                vm.images = res;
            }, function (err) {
                // $rootScope.alert = err.data.message;
                // $state.go('signin');
            });
        };

        function imageActive(index) {
            return index === 0;
        }

        function doFollow() {
            if (!vm.isFollow) {
                FollowService.follow(vm.userId).then(function (res) {

                    vm.isFollow = true;

                }, function (err) {
                    $rootScope.alert = err.data.message;
                    // $state.go('index.events');
                });
            } else {
                FollowService.unfollow(vm.userId).then(function (res) {
                    vm.isFollow = false;
                },
                    function (err) {
                        $rootScope.alert = err.data.message;
                        // $state.go('index.events');
                    });
            }
        }
    };
})();