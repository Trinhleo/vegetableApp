(function () {
    angular.module('app.events')
        .config(EventsRoute);
    function EventsRoute($stateProvider) {
        $stateProvider
            .state('index.events', {
                url: '/events',
                templateUrl: 'app/components/events/events.html',
                controller: 'EventsController',
                controllerAs: 'vm'
            })
            .state('index.add', {
                url: "/events/add",
                templateUrl: 'app/components/events/manage/add-event.html',
                controller: 'AddEventController',
                controllerAs: 'vm'
            })
            .state('index.details', {
                url: '/events/:eventId',
                templateUrl: 'app/components/events/event-details.html',
                controller: 'EventDetailsController',
                controllerAs: 'vm'
            })
            .state('index.edit', {
                url: '/events/:eventId/edit',
                templateUrl: 'app/components/events/manage/edit-event.html',
                controller: 'EditEventController',
                controllerAs: 'vm'
            });


        // getEvent.$inject = ['$state', '$stateParams', 'EventService'];

        // function getEvent($state, $stateParams, EventService) {
        //     EventService.getEvent($stateParams.eventId).then(
        //         function (res) {
        //             return res;
        //         },
        //         function (err) {
        //             return $state.go('index.dashboard');
        //         }
        //     );
        // }
    }
})();