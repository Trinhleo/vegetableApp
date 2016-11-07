(function () {
    angular.module('app')
        .directive('imageUploader', ImageUploader);

    ImageUploader.$inject = ['$rootScope', 'Upload','$timeout'];
    function ImageUploader($rootScope, Upload, $timeout) {
        return {
            restrict: 'E',
            templateUrl: './app/shared/directives/upload.directive.html',
            link: linkFn,
            scope: {
                url: '=url'
            }
        };
        function linkFn(scope, element, attrs) {
            scope.uploadFiles = function (files, errFiles) {
                scope.files = files;
                scope.errFiles = errFiles;
                angular.forEach(files, function (file) {
                    file.upload = Upload.upload({
                        url: scope.url,
                        data: { myfile: file }
                    });

                    file.upload.then(function (response) {
                        $timeout(function () {
                            file.result = response.data;
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