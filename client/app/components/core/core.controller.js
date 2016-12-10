(function () {
    angular.module('app.core')
        .controller('CoreController', CoreController);
    CoreController.$inject = ['$state', '$location', '$rootScope', '$localStorage', '$timeout', 'toastr', '$filter', 'NotificationService', 'AuthService', '$scope']
    function CoreController($state, $location, $rootScope, $localStorage, $timeout, toastr, $filter, NotificationService, AuthService, $scope) {
        var vm = this;
        $rootScope.userInfo = $localStorage.userInfo;
        $rootScope.isAdmin = $localStorage.userInfo && $localStorage.userInfo.roles[0] === 'admin' ? true : false;
        var socket = io.connect('http://localhost:3000/notification');
        vm.isActive = function (viewLocation) {
            return $location.path().indexOf(viewLocation) !== -1;
        };
        // ======CONFIGURE NOTIFICATION========
        vm.notifications = [];
        vm.readNotification = readNotification;
        // $rootScope.userInfo = $localStorage.userInfo;
        // vm.newNotifications = [];
        // vm.bage = 0;
        $('.parallax-garden').height($(window).height());
        // navigation
        vm.openNav = openNav;
        vm.closeNav = closeNav;
        vm.isOpenSideBar = false;
        vm.isMenuPin = false;
        vm.pinMenu = pinMenu;
        vm.signin = signin;
        vm.user = {
            username: "",
            password: ""
        };
        // loadNewNotificatons();
        openNav();
        // pinMenu();
        // Collapsing the menu after navigation
        // $scope.$on('$stateChangeSuccess', function () {
        //     if (vm.isOpenSideBar && !vm.isMenuPin) {
        //         closeNav();
        //     }
        // });


        $(document).ready(function () {
            $(window).resize(function () {
                var mainWidth = $(window).width();
                if (vm.isOpenSideBar) {
                    $('#main').width(mainWidth - 250);
                } else {
                    $('#main').width(mainWidth);
                }
            })
            //Check to see if the window is top if not then display button
            $(window).scroll(function () {
                if ($(this).scrollTop() > 100) {
                    $('.scrollup').fadeIn();
                } else {
                    $('.scrollup').fadeOut();
                }
            });

            //Click event to scroll to top
            $('.scrollup').click(function () {
                $('html, body').animate({ scrollTop: 0 }, 800);
                // return false;
            });

        });



        function signin() {
            AuthService.signin(vm.user).then(function (res) {

                $localStorage.token = res.access_token;
                $localStorage.user = res.name;
                $localStorage.userInfo = res.userInfo;
                $rootScope.userInfo = $localStorage.userInfo;
                $rootScope.isAdmin = $localStorage.userInfo.roles[0] === 'admin' ? true : false;
                // $('#modal-signin').removeClass('in');
                $('#close-button').click();
                $state.go(!$state.previous.state.abstract ? $state.previous.state : 'index.product')
                // console.log(err)
                // vm.alert = err.data.message || err.message;

            }, function (err) {
                toastr.error('Tên đăng nhập hoặc mật khẩu sai', 'Lỗi đăng nhập');
            });
        };

        function openNav() {
            document.getElementById("mySidenav").style.width = "250px";
            // document.getElementById("main").style.marginLeft = "250px";

            vm.isOpenSideBar = true;
            var mainWidth = $(window).width();
            $('#main').width(mainWidth - 250);
            $('#main').addClass('pull-right');
        }

        function closeNav() {
            document.getElementById("mySidenav").style.width = "0";
            var mainWidth = $('#main').width();
            $('#main').width(mainWidth + 250);
            $('#main').removeClass('pull-right');
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

