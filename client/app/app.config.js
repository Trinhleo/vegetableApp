(function () {
    "use strict";
    angular.module('app.config', [])
        .constant('appConfigs', {
            baseUrl: 'http://127.0.0.1:',
            port: 3000,
            baseApiUrl: '/api/'
        })
        .config(function (toastrConfig) {
            angular.extend(toastrConfig, {
                autoDismiss: false,
                containerId: 'toast-container',
                maxOpened: 0,
                newestOnTop: true,
                positionClass: 'toast-top-right',
                preventDuplicates: false,
                preventOpenDuplicates: true,
                target: 'body',
                alowHtml: true
            });
        })
        .config(function (paginationConfig) {
            paginationConfig.firstText = 'Đầu tiên';
            paginationConfig.previousText = 'Trước đó';
             paginationConfig.lastText = 'Cuối cùng';
            paginationConfig.previousText = 'Kế tiếp';
        });
})();