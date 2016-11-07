(function () {
    angular.module('app.events')
        .controller('EditEventController', EditEventController);

    EditEventController.$inject = ['$state', '$localStorage', '$rootScope', '$scope', 'EventService', '$stateParams', 'FileUploader', 'appConfigs', '$window', '$timeout'];

    function EditEventController($state, $localStorage, $rootScope, $scope, EventService, $stateParams, FileUploader, appConfigs, $window, $timeout) {
        var vm = this;
        // Initializes Variables
        vm.url = appConfigs.baseUrl.concat(appConfigs.port).concat(appConfigs.baseApiUrl).concat('gallery/images');
        vm.counter = 0;
        vm.events = [];
        vm.eventImages = []
        vm.formData = {};
        vm.endDateBeforeRender = endDateBeforeRender;
        vm.endDateOnSetTime = endDateOnSetTime;
        vm.startDateBeforeRender = startDateBeforeRender;
        vm.startDateOnSetTime = startDateOnSetTime;
        vm.updateEvent = updateEvent;
        vm.eventId = $stateParams.eventId;
        vm.upload = false;
        vm.uploadSuccess = false;
        vm.resetForm = getEventsLocation;
        vm.loaded = false;
        // get event data in firsload
        getEventsLocation();

        $scope.$watch('vm.formData', function (data) {
            $timeout(function () {
                if (!angular.equals(data, {})) {
                    vm.counter++;
                    vm.formData = data;
                }
                console.log(vm.counter);
            })
        }, true);

        //get upload file status
        $rootScope.$on("upload-success", function () {
            $timeout(function () {
                if ($rootScope.imgUpload.status === 200) {
                    vm.formData.location = [vm.formData.longitude, vm.formData.latitude]
                    EventService.updateEvent(vm.formData)
                        .then(function (res) {
                            console.log(res);
                            getEventsLocation()
                        }, function (err) {
                            $rootScope.alert = err.data.message;
                        });
                    vm.counter = 0;
                };
            });
        });

        // get file added status
        $rootScope.$on("fileadded", function () {
            $timeout(function () {
                vm.fileAdded = $rootScope.fileadded ? true : false;
            });
        });

        // Get coordinates based on mouse click. When a click event is detected....
        $rootScope.$on("clicked", function () {
            $timeout(function () {
                vm.formData.latitude = parseFloat($rootScope.clickLat);
                vm.formData.longitude = parseFloat($rootScope.clickLong);
                console.log(vm.clickLat);
            });
        });

        // Get coordinates based on mouse drag. When a click drag is detected....
        $rootScope.$on("drag", function () {
            $timeout(function () {
                vm.formData.latitude = parseFloat($rootScope.clickLat);
                vm.formData.longitude = parseFloat($rootScope.clickLong);
            });
        });
        // === INTERNAL FUNCTION =====
        function getEventsLocation() {
            EventService.getEvent($stateParams.eventId).then(
                function (res) {
                    $timeout(function () {
                        var evt = res;
                        vm.formData = evt;
                        vm.formData.latitude = evt.location[1];
                        vm.formData.longitude = evt.location[0];
                        delete vm.formData.location;
                        // vm.event = evt;
                        vm.events.push(evt);
                        vm.loaded = true;
                        console.log(vm.loaded);
                    });
                },
                function (err) {
                    $state.go('index.events');
                    vm.loaded = true;
                }
            );

            EventService.getEventImages($stateParams.eventId).then(
                function (res) {
                    var evt = res;
                    vm.eventImages = evt;
                },
                function (err) {
                    $state.go('index.events');
                }
            );
        };

        // // Get User's actual coordinates based on HTML5 at window load
        // geolocation.getLocation().then(function (data) {

        //     // Set the latitude and longitude equal to the HTML5 coordinates
        //     coords = { lat: data.coords.latitude, long: data.coords.longitude };

        //     // Display coordinates in location textboxes rounded to three decimal points
        //     vm.formData.longitude = parseFloat(coords.long).toFixed(3);
        //     vm.formData.latitude = parseFloat(coords.lat).toFixed(3);


        // });

        function updateEvent() {
            vm.upload = true;
        };


        // config date tiMe input;
        function startDateOnSetTime() {
            $scope.$broadcast('start-date-changed');
        }

        function endDateOnSetTime() {
            $scope.$broadcast('end-date-changed');
        }

        function startDateBeforeRender($dates) {
            if (vm.formData.endTime) {
                var activeDate = moment(vm.formData.endTime);

                $dates.filter(function (date) {
                    return date.localDateValue() >= activeDate.valueOf()
                }).forEach(function (date) {
                    date.selectable = false;
                });
            };
        };
        function endDateBeforeRender($view, $dates) {
            if (vm.formData.startTime) {
                var activeDate = moment(vm.formData.startTime).subtract(1, $view).add(1, 'minute');

                $dates.filter(function (date) {
                    return date.localDateValue() <= activeDate.valueOf()
                }).forEach(function (date) {
                    date.selectable = false;
                })
            };
        };
    };
})();
