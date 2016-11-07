(function () {
    angular.module('app')
        .directive('imageUploader', ImageUploader);

    ImageUploader.$inject = ['$rootScope', 'Upload', '$timeout'];
    function ImageUploader($rootScope, Upload, $timeout) {
        return {
            restrict: 'E',
            templateUrl: './app/shared/directives/upload/upload.directive.html',
            link: linkFn,
            scope: {
                url: '=url',
                doUpload: '=upload',
                event: '=event'
            }
        };
        function linkFn(scope, element, attrs) {
            var upload = doUpload;
            scope.uploadFiles = function (files, errFiles) {
                scope.files = files;
                scope.errFiles = errFiles;
            };

            scope.$watch('files', function (files) {
                $timeout(function () {
                    if (files && files.length > 0) {
                        $rootScope.fileadded = true;
                        $rootScope.$broadcast("fileadded");
                    } else {
                        $rootScope.fileadded = false;
                        $rootScope.$broadcast("fileadded");
                    }
                });
            });


            scope.$watch('doUpload', function (doUpload) {
                $timeout(function () {
                    if (doUpload && scope.event && scope.url) {
                        upload(scope.files, scope.url, scope.event);
                    }
                });
            });

            function doUpload(files, url, eventId) {
                angular.forEach(files, function (file) {
                    file.upload = Upload.upload({
                        url: url,
                        data: {
                            myfile: file,
                            event: eventId
                        }
                    });

                    file.upload.then(function (response) {
                        $timeout(function () {
                            file.result = response.data;
                            $rootScope.imgUpload = response;
                            $rootScope.$broadcast("upload-success")
                        });
                    }, function (response) {
                        if (response.status > 0)
                            scope.errorMsg = response.status + ': ' + response.data;
                    }, function (evt) {
                        file.progress = Math.min(100, parseInt(100.0 *
                            evt.loaded / evt.total));
                    });
                });
            };
        };
    };
})();