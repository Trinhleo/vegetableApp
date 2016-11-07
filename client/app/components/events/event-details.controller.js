(function () {
    angular.module('app.events')
        .controller('EventDetailsController', EventDetailsController);

    EventDetailsController.$inject = ['$state', '$stateParams', '$localStorage', '$rootScope', 'EventService'];

    function EventDetailsController($state, $stateParams, $localStorage, $rootScope, EventService) {
        var vm = this;
        // // vm.event = EventResolve;
        // console.log(vm.event);
        vm.room = {};
        vm.eventImages = [];
        vm.events = [];
        vm.event = {};
        vm.gotoEdit = gotoEdit;
        vm.deleteEvent = deleteEvent;
        vm.likeEvents = likeEvents;
        vm.isMyEvent = false;
        vm.isLiked = false;
        vm.initLocation = [];
        vm.socket = io.connect('http://localhost:3000/chat');

        checkFav();

        function checkFav() {
            EventService.checkFavoriteEvent($stateParams.eventId).then(
                function (res) {
                    if (res)
                        vm.isLiked = true;
                },
                function (err) {
                    vm.isLiked = false;
                }
            );
        };

        EventService.getEvent($stateParams.eventId).then(
            function (res) {
                var evt = res;
                vm.isMyEvent = $localStorage.userInfo._id && $localStorage.userInfo._id === evt.userHost._id ? true : false;
                // vm.initLocation = evt.location;
                vm.event = evt;
                vm.room = evt;
                vm.events.push(evt);

            },
            function (err) {
                $state.go('index.events');
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

        function gotoEdit() {
            $state.go('index.edit', {
                eventId: vm.event._id
            });
        };

        function deleteEvent() {
            EventService.deleteEvent($stateParams.eventId)
                .then(
                function (res) {
                    $state.go('index.events');
                },
                function (err) {
                    window.alert(err);
                }
                )
        };

        function likeEvents() {
            if (!vm.isLiked) {
                EventService.addToFavoriteEvents($stateParams.eventId)
                    .then(
                    function (res) {
                        console.log(res);
                        // checkFav();
                        vm.isLiked = true
                    },
                    function (err) {
                        $state.go('index.events');
                    });
            } else {
                EventService.removeFavoriteEvent($stateParams.eventId)
                    .then(
                    function (res) {
                        // checkFav();
                        vm.isLiked = false;
                        console.log(res)
                    },
                    function (err) {
                        $state.go('index.events');
                    });
            }
        };
    };
})();
