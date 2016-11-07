(function () {
    angular.module('app.events')
        .controller('EventsController', EventsController);

    EventsController.$inject = ['$scope', '$state', '$localStorage', '$rootScope', 'EventService', 'UserService', 'geolocation', '$timeout'];

    function EventsController($scope, $state, $localStorage, $rootScope, EventService, UserService, geolocation, $timeout) {
        var vm = this;
        // var queryBody = {};
        vm.events = [];
        vm.type = 0
        vm.myId = $localStorage.userInfo._id;
        vm.getEventsLocation = getEventsLocation;
        vm.formData = {};
        vm.alert = '';
        vm.testSend = testSend;
        function testSend() {
            $rootScope.$broadcast('new event', {
                _id: "581c31e1cdac2c29e00f897c"
            });
        }

        getEventsLocation();

        function getEventsLocation(a) {
            if (a === 1) {
                vm.type = 1;
                EventService.loadMyEvents().then(
                    function (res) {
                        vm.events = res;
                    },
                    function (err) {
                        console.log(err)
                        vm.alert = err;
                        vm.events = [];
                    });
            } else if (a === 2) {
                vm.type = 2;
                EventService.myFavoriteEvents().then(
                    function (res) {
                        var evts = res;
                        vm.events = [];
                        evts.forEach(function (evt) {
                            UserService.getUserInfo(evt.event.userHost).then(
                                function (res) {
                                    evt.event.userHost = res;
                                    vm.events.push(evt.event);
                                },
                                function (err) {
                                    console.log(err);
                                }
                            );
                        });
                    },
                    function (err) {
                        console.log(err)
                        vm.alert = err;
                        vm.events = [];
                    });
            } else {
                vm.type = 0;
                EventService.loadEvents().then(
                    function (res) {
                        vm.events = res;
                        console.log(res);
                    },
                    function (err) {
                        console.log(err)
                        vm.alert = err;
                        vm.events = [];
                    });
            };
        };
    };
})();
