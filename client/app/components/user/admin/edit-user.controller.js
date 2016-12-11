(function () {
    angular.module('app.user.setting')
        .controller('EditUserController', EditUserController);

    EditUserController.$inject = ['$rootScope', '$state', 'AdminService', 'toastr', '$stateParams'];

    function EditUserController($rootScope, $state, AdminService, toastr, $stateParams) {
        var vm = this;

        vm.userInfo = {};
        vm.updateUserInfo = updateUserInfo;
        vm.cancel = cancel;

        getMyUserInfo()
        function getMyUserInfo() {
            AdminService.getUserInfo($stateParams.userId).then(function (res) {
                vm.userInfo = res;
            }, function (err) {
                $rootScope.alert = err.data.message;
                $state.go('index.signin');
            });
        };


        function updateUserInfo() {

            AdminService.updateUserInfo(vm.userInfo).then(function (res) {
                console.log(res);
                toastr.success('Cập nhật thành công!', 'Thành công');
            }, function (err) {
                toastr.error('Cập nhật thất bại!', 'Lỗi');
            });
        };
        function cancel() {
            $state.go('index.user-details', {
                userId: $stateParams.userId
            });
        }
    };
})();