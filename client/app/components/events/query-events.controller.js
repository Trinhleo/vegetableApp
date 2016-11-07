(function () {
    angular.module('app.events')
        .controller('QueryEventsController', QueryEventsController);

    QueryEventsController.$inject = ['$scope', '$state', '$localStorage', '$rootScope', 'EventService', 'geolocation', '$timeout'];

    function QueryEventsController($scope, $state, $localStorage, $rootScope, EventService, geolocation, $timeout) {
        var vm = this;
        // var queryBody = {};
        vm.events = [];
        vm.getEventsLocation = getEventsLocation;

        vm.formData = {};

        getEventsLocation();

        function getEventsLocation() {
            EventService.loadEvents().then(
                function (res) {
                    vm.events = res;
                },
                function (err) {
                    console.log(err)
                    vm.alert = err;
                });
        }

        // Get event's actual coordinates based on HTML5 at window load
        geolocation.getLocation().then(function (data) {
            coords = { lat: data.coords.latitude, long: data.coords.longitude };

            // Set the latitude and longitude equal to the HTML5 coordinates
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
    };
})();
