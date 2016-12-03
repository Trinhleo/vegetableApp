(function () {
    angular.module('app.gallery')
        .controller('UploadImageController', UploadImageController);

    UploadImageController.$inject = ['$timeout', '$window', 'FileUploader', 'appConfigs', '$localStorage','$state'];

    function UploadImageController($timeout, $window, FileUploader, appConfigs, $localStorage, $state) {
        vm = this;
        vm.user = $localStorage.userInfo;
        vm.url = '';
        vm.dataUpload = {};
    }
})();

