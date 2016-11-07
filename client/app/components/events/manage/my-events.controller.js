(function () {
    angular.module('app.events')
        .controller('MyEventsController', MyEventsController);

    MyEventsController.$inject = ['$state', '$localStorage', '$rootScope', '$scope', 'EventService', 'geolocation'];

    function MyEventsController($state, $localStorage, $rootScope, $scope, EventService, geolocation) {
        var vm = this;
        // Initializes Variables
        // ----------------------------------------------------------------------------
        var coords = {};
        var lat = 0;
        var long = 0;
        vm.events = [];
        vm.formData = {};
        vm.endDateBeforeRender = endDateBeforeRender
        vm.endDateOnSetTime = endDateOnSetTime
        vm.startDateBeforeRender = startDateBeforeRender
        vm.startDateOnSetTime = startDateOnSetTime
        // Set initial coordinates to the center of the US
        vm.formData.longitude = 10.350;
        vm.formData.latitude = 106.500;

        getEventsLocation();

        function getEventsLocation() {
            EventService.loadMyEvents().then(
                function (res) {
                    vm.events = res;
                    console.log(res);
                },
                function (err) {
                    console.log(err)
                    vm.alert = err;
                });
        }


        // Get User's actual coordinates based on HTML5 at window load
        geolocation.getLocation().then(function (data) {

            // Set the latitude and longitude equal to the HTML5 coordinates
            coords = { lat: data.coords.latitude, long: data.coords.longitude };

            // Display coordinates in location textboxes rounded to three decimal points
            vm.formData.longitude = parseFloat(coords.long).toFixed(3);
            vm.formData.latitude = parseFloat(coords.lat).toFixed(3);

        });

        // Get coordinates based on mouse click. When a click event is detected....
        $rootScope.$on("clicked", function () {

            // Run the gservice functions associated with identifying coordinates
            $scope.$apply(function () {
                vm.formData.latitude = parseFloat($rootScope.clickLat).toFixed(3);
                vm.formData.longitude = parseFloat($rootScope.clickLong).toFixed(3);
            });
        });
        $rootScope.$on("drag", function () {

            // Run the gservice functions associated with identifying coordinates
            $scope.$apply(function () {
                vm.formData.latitude = parseFloat($rootScope.clickLat).toFixed(3);
                vm.formData.longitude = parseFloat($rootScope.clickLong).toFixed(3);
            });
        });

        // Creates a new user based on the form fields
        function EditEvent() {

            // Grabs all of the text box fields
            var eventData = {
                name: vm.formData.name,
                startTime: vm.formData.startTime,
                endTime: vm.formData.endTime,
                location: [vm.formData.longitude, vm.formData.latitude],
                description: vm.formData.description,
                address: vm.formData.address
            };

            EventService.edditEvent(eventData)
                .then(function (res) {
                    console.log(res);
                    // Clear form data expert location
                    vm.formData.name = "";
                    vm.formData.startTime = "";
                    vm.formData.endTime = "";
                    vm.formData.description = "";
                    vm.formData.address = "";
                    getEventsLocation();
                    $rootScope.alert = "Success!";
                }, function (err) {
                    $rootScope.alert = err.data.message;
                });

        };



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
                })
            }
        }

        function endDateBeforeRender($view, $dates) {
            if (vm.formData.startTime) {
                var activeDate = moment(vm.formData.startTime).subtract(1, $view).add(1, 'minute');

                $dates.filter(function (date) {
                    return date.localDateValue() <= activeDate.valueOf()
                }).forEach(function (date) {
                    date.selectable = false;
                })
            }
        }
    };
})();
