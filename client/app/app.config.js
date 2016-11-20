(function () {
    "use strict";
    angular.module('app.config', [])
        .constant('appConfigs', {
            baseUrl:'http://127.0.0.1:',
            port: 3000,
            baseApiUrl: '/api/'
        })
        .constant('uiDatetimePickerConfig', {
            dateFormat: 'yyyy-MM-dd HH:mm',
            defaultTime: '00:00:00',
            html5Types: {
                date: 'yyyy-MM-dd',
                'datetime-local': 'yyyy-MM-ddTHH:mm:ss.sss',
                'month': 'yyyy-MM'
            },
            initialPicker: 'date',
            reOpenDefault: false,
            enableDate: true,
            enableTime: true,
            buttonBar: {
                show: true,
                now: {
                    show: true,
                    text: 'Now'
                },
                today: {
                    show: true,
                    text: 'Today'
                },
                clear: {
                    show: true,
                    text: 'Clear'
                },
                date: {
                    show: true,
                    text: 'Date'
                },
                time: {
                    show: true,
                    text: 'Time'
                },
                close: {
                    show: true,
                    text: 'Close'
                }
            },
            closeOnDateSelection: true,
            closeOnTimeNow: true,
            appendToBody: false,
            altInputFormats: [],
            ngModelOptions: {},
            saveAs: false,
            readAs: false,
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
        });
})();