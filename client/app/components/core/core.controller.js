(function () {
    angular.module('app.core')
        .controller('CoreController', CoreController);
    CoreController.$inject = ['$location', '$rootScope', '$localStorage', '$timeout', 'toastr', '$filter', 'NotificationService']
    function CoreController($location, $rootScope, $localStorage, $timeout, toastr, $filter, NotificationService) {
        var vm = this;
        var socket = io.connect('http://localhost:3000/notification');
        vm.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
        // ======CONFIGURE NOTIFICATION========

        vm.notifications = [];
        vm.readNotification = readNotification;
        $rootScope.userInfo = $localStorage.userInfo;
        // vm.newNotifications = [];
        vm.bage = 0;
        loadNewNotificatons();

        function loadNewNotificatons() {
            NotificationService.loadNewNotifications().then(function (res) {
                vm.notifications = res;
                vm.bage = vm.notifications.length;
            },
                function (err) {

                })
        }
        
        function readNotification(id) {
            NotificationService.readNotification(id).then(function (res) {
                console.log(res);
                loadNewNotificatons();
            }, function (err) {

            });
        }


        socket.on('connect', function () {
            socket.emit('authenticate', { token: $localStorage.token });
        });

        socket.on('authentication', function () {
            socket.emit('new notifications');

            socket.emit('load notifications');
        });

        socket.on('notifications', function (data) {
            console.log(data);
            $timeout(function () {
                vm.notifications = data;
            });
        });



        $rootScope.$on('new event', function (event, data) {
            console.log(data);
            socket.emit('send notification', data);
        });

        socket.on('new notifications', function (data) {
            $timeout(function () {
                vm.bage = data.length;
            });

        });

        socket.on('new notification', function (data) {
            socket.emit('new notifications');
            socket.emit('load notifications');
            console.log(data);
            var title = '';
            var content = data.content;
            if (data.type === 0) {
                var startTime = $filter('date')(content.startTime, 'medium', '+070') || '';
                var endTime = $filter('date')(content.endTime, 'medium', '+070') || ''
                var description = content.description || '';
                var detailsLink = '#/events/' + content._id;
                var address = content.address || '';
                title = 'New Event';
                content = '<div>'
                    + '<h4><strong>' + content.name + '</strong></h4>'
                    + '<h5>Start Time: <strong style="color: red">' + startTime + '</strong></h5>'
                    + '<h5>End Time: <strong style="color: red">' + endTime + '</strong></h5>'
                    + '<h5>Address: <strong>' + address + '</strong></h5>'
                    + '<h5>Description: <strong>' + description + '</strong></h5>'
                    + '<a href="' + detailsLink + '"><button class="btn btn-warning">Event Details</button></a><br>'
                    + '</a></div>';
            }
            toastr.info(content, title, { allowHtml: true });
        });

        socket.on('error send', function (data) {

            toastr.error(data.msg, "Error!");
        });

    }
})();

