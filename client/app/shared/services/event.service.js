(function () {
    angular.module('app.services')
        .factory('EventService', EventService);

    EventService.$inject = ['$http', '$q', 'appConfigs']
    function EventService($http, $q, appConfigs) {
        var apiUrl = appConfigs.baseUrl.concat(appConfigs.port).concat(appConfigs.baseApiUrl).concat("events");
    
        return {
            loadEvents: loadEvents,
            loadMyEvents: loadMyEvents,
            getEvent: getEvent,
            createEvent: createEvent,
            updateEvent: updateEvent,
            deleteEvent: deleteEvent,
            getEventImages: getEventImages,
            addToFavoriteEvents: addToFavoriteEvents,
            removeFavoriteEvent: removeFavoriteEvent,
            checkFavoriteEvent: checkFavoriteEvent,
            myFavoriteEvents: myFavoriteEvents
        };

        function loadMyEvents() {
            var deferred = $q.defer();
            $http.get(apiUrl + '/myevents').then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        function loadEvents() {
            var deferred = $q.defer();
            $http.get(apiUrl).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function getEvent(id) {
            var deferred = $q.defer();
            $http.get(apiUrl + '/' + id).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function createEvent(data) {
            var deferred = $q.defer();
            $http.post(apiUrl, data).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function updateEvent(data) {
            var id = data._id;
            var deferred = $q.defer();
            $http.put(apiUrl + '/' + id, data).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function deleteEvent(id) {
            var deferred = $q.defer();
            $http.delete(apiUrl + '/' + id).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function getEventImages(id) {
            var deferred = $q.defer();
            $http.get(apiUrl + '/' + id + '/images').then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function addToFavoriteEvents(eventId) {
            var deferred = $q.defer();
            var evtInfo = {
                event: eventId
            }
            $http.post(apiUrl + '/my-favorite-events', evtInfo).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;

        };

        function removeFavoriteEvent(eventId) {
            var deferred = $q.defer();
            $http.delete(apiUrl + '/my-favorite-events/' + eventId).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;

        };

        function checkFavoriteEvent(eventId) {
            var deferred = $q.defer();
            $http.get(apiUrl + '/my-favorite-events/' + eventId).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function myFavoriteEvents() {
            var deferred = $q.defer();
            $http.get(apiUrl + '/my-favorite-events').then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };




        // function uploadEventImages(id) {
        //     var deferred = $q.defer();
        //     $http.get(apiUrl + id + '/images').then(function (res) {
        //         deferred.resolve(res.data);
        //     }, function (err) {
        //         deferred.reject(err);
        //     });
        //     return deferred.promise;
        // };
    };
})();