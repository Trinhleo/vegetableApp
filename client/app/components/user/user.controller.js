(function () {
    angular.module('app.user')
        .controller('UserController', UserController);

    UserController.$inject = ['$rootScope', 'UserService', 'FollowService', 'GalleryService', 'EventService', '$state', 'appConfigs', '$localStorage'];

    function UserController($rootScope, UserService, FollowService, GalleryService, EventService, $state, appConfigs, $localStorage) {
        var vm = this;
        vm.userInfo = "";
        vm.userId = $state.params.userId;
        vm.isMe = vm.userId && (vm.userId === $localStorage.userInfo._id) || !vm.userId;
        vm.images = [];
        vm.events = [];
        vm.isFollow = false;
        vm.doFollow = doFollow;
        if (!vm.isMe) {
            getUserInfo();
            getImages(vm.userId);
            getEvents(vm.userId);
        } else {
            getMyUserInfo();
            getImages($localStorage.userInfo._id);
            getMyEvents();
        };

        checkMyFollows();

        function checkMyFollows() {
            FollowService.checkFollow({userFollowId: vm.userId})
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
                $rootScope.alert = err.data.message;
                $state.go('signin');
            });
        };

        function getEvents(userId) {
            UserService.loadEventsByUserId(userId)
                .then(function (res) {
                    vm.events = res;
                }, function (err) {
                    $rootScope.alert = err.data.message;
                    $state.go('index.events');
                });
        };

        function getMyEvents() {
            EventService.loadMyEvents()
                .then(function (res) {
                    vm.events = res;
                }, function (err) {
                    $rootScope.alert = err.data.message;
                    $state.go('index.events');
                });
        };

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