(function () {
    angular.module('app.user.setting')
        .controller('ChangeProfilePictureController', ChangeProfilePictureController);

    ChangeProfilePictureController.$inject = ['$timeout', '$window', 'FileUploader', 'appConfigs', '$localStorage'];

    function ChangeProfilePictureController($timeout, $window, FileUploader, appConfigs, $localStorage) {
        vm = this;
        vm.user = $localStorage.userInfo;
        vm.imageURL = vm.user ? vm.user.profileImageURL : '';
        // Create file uploader instance
        vm.uploader = new FileUploader({
            url: appConfigs.baseUrl.concat(appConfigs.port).concat(appConfigs.baseApiUrl).concat('user/me/profile-picture'),
            headers: {
                authorization: $localStorage.token,
            },
            alias: 'myfile'
        });
        vm.uploader.filters.push({
            name: 'imageFilter',
            fn: function (item, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });
        vm.uploader.onAfterAddingFile = onAfterAddingFile;
        vm.uploader.onSuccessItem = onSuccessItem;
        vm.uploader.onErrorItem = onErrorItem;
        vm.uploadProfilePicture = uploadProfilePicture;
        vm.cancelUpload = cancelUpload;

        // Set file uploader image filter


        // Called after the user selected a new picture file
        function onAfterAddingFile(fileItem) {
            if ($window.FileReader) {
                var fileReader = new FileReader();
                fileReader.readAsDataURL(fileItem._file);

                fileReader.onload = function (fileReaderEvent) {
                    $timeout(function () {
                        vm.imageURL = fileReaderEvent.target.result;
                    }, 0);
                };
            }
        };

        // Called after the user has successfully uploaded a new picture
        function onSuccessItem(fileItem, response, status, headers) {
            // Show success message
            vm.success = true;
            debugger;
            $localStorage.userInfo.profileImageURL = response.profileImageURL;
            // Clear upload buttons
            vm.cancelUpload();
        };

        // Called after the user has failed to uploaded a new picture
        function onErrorItem(fileItem, response, status, headers) {
            // Clear upload buttons
            vm.cancelUpload();

            // Show error message
            vm.error = response.message;
        };

        // Change user profile picture
        function uploadProfilePicture() {
            // Clear messages
            vm.success = vm.error = null;

            // Start upload

            vm.uploader.uploadAll();
        };

        // Cancel the upload process
        function cancelUpload() {
            vm.uploader.clearQueue();
            vm.imageURL = vm.user.profileImageURL;
        };
    };

})();

