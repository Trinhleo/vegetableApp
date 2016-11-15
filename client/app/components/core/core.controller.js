(function () {
    angular.module('app.core')
        .controller('CoreController', CoreController);
    CoreController.$inject = ['$state', '$location', '$rootScope', '$localStorage', '$timeout', 'toastr', '$filter', 'NotificationService', '$scope']
    function CoreController($state, $location, $rootScope, $localStorage, $timeout, toastr, $filter, NotificationService, $scope) {
        var vm = this;
        $rootScope.userInfo = $localStorage.userInfo;
        $rootScope.isAdmin = $localStorage.userInfo && $localStorage.userInfo.roles[0] === 'admin' ? true : false;
        var socket = io.connect('http://localhost:3000/notification');
        vm.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
        // ======CONFIGURE NOTIFICATION========
        vm.notifications = [];
        vm.readNotification = readNotification;
        // $rootScope.userInfo = $localStorage.userInfo;
        // vm.newNotifications = [];
        vm.bage = 0;

        // navigation
        vm.openNav = openNav;
        vm.closeNav = closeNav;
        vm.isOpenSideBar = true;
        vm.isMenuPin = true;
        vm.pinMenu = pinMenu;
        loadNewNotificatons();
        openNav();


        // Collapsing the menu after navigation
        $scope.$on('$stateChangeSuccess', function () {
            if (vm.isOpenSideBar && !vm.isMenuPin) {
                closeNav();
            }
        });

        function openNav() {
            document.getElementById("mySidenav").style.width = "250px";
            // document.getElementById("main").style.marginLeft = "250px";

            vm.isOpenSideBar = true;
            if (vm.isMenuPin) {
                var mainWidth = $('#main').width();
                $('#main').width(mainWidth - 250);
                $('#main').addClass('pull-right');
            }
        }

        function closeNav() {
            document.getElementById("mySidenav").style.width = "0";
            var mainWidth = $('#main').width();
            if (vm.isMenuPin) {
                var mainWidth = $('#main').width();
                $('#main').width(mainWidth + 250);
                $('#main').removeClass('pull-right');
            }
            vm.isOpenSideBar = false;
        }

        function pinMenu() {
            if (vm.isMenuPin) {
                var mainWidth = $('#main').width();
                $('#main').width(mainWidth + 250);
                $('#main').removeClass('pull-right');
                vm.isMenuPin = false;
            } else {
                var mainWidth = $('#main').width();
                $('#main').width(mainWidth - 250);
                $('#main').addClass('pull-right');
                vm.isMenuPin = true;
            }
        }

        // loadNewNotificatons();

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

