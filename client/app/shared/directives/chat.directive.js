(function () {
    angular.module('app')
        .directive('chat', Chat);
    Chat.$inject = ['$localStorage', '$rootScope', '$timeout', '$filter']
    function Chat($localStorage, $rootScope, $timeout, $filter) {
        return {
            restrict: 'E',
            templateUrl: './app/shared/directives/chat.directive.html',
            link: linkFn,
            scope: {
                room: '=room'
            }
        }

        function linkFn(scope, element) {
            var socket = io.connect('http://localhost:3000');
            scope.roomName = "Please choose a room chat!"
            scope.alert = "";
            scope.roomInfo = {};
            scope.currentRoom = 0;
            scope.counterLineOfMessage = 0;
            scope.message = "";
            scope.messagebox = "";
            scope.online = [];
            scope.user = $localStorage.user;
            scope.sendMessage = sendMessage;
            scope.joinRoom = joinRoom;
            scope.leaveRoom = leaveRoom;
            scope.displayMessage = displayMessage;
            scope.showChat = true;
            scope.toggleChatBox = toggleChatBox;

            function toggleChatBox() {
                scope.showChat = scope.showChat ? false : true;
            }

            // =========TRIGGER ON RECEIVE MESSAGE FROM SOCKET SERVER=========
            // authenticate

            socket.on('connect', function () {
                socket.emit('authenticate', { token: $localStorage.token });
            });

            $timeout(function () {
                joinRoom(scope.room);
            }, 500);


            socket.on('alert', function (msg) {
                scope.alert = msg;
                $timeout(300, function () {
                    console.log('waiting');
                });
            });

            //
            socket.on('banned alert', function (msg) {
                scope.alert = msg.message;
                displayMessage(msg.user, msg.message);
                $timeout(3000, function () {
                    console.log('waiting');
                });
                scope.enableChat = false;
                scope.online = [];
            });
            // trigger receive message
            socket.on('chat message', function (msg) {
                // var lastIndex = msg.length - 1;
                scope.displayMessage(msg.user, msg.message, msg.time);
            });

            // trigger receive message
            socket.on('online', function (msg) {
                scope.online = msg;
                $timeout(300, function () {
                    console.log('waiting');
                });
            });


            // trigger join to a room chat
            socket.on('join', function (msg) {
                console.log(msg)
                if (msg.userInfo) {
                    scope.online.push(msg.userInfo);
                };
                scope.displayMessage(msg.user, msg.message);
                $timeout(300, function () {
                    console.log('waiting');
                });
                console.log('----Online----')
                console.log(scope.online);
            });

            // trigger leave to a room chat
            socket.on('leave', function (msg) {
                console.log(msg)
                for (var x in scope.online) {
                    if (msg.userLeaveId && scope.online[x]._id.toString() === msg.userLeaveId) {
                        scope.online.splice(x, 1);
                        break;
                    };
                };
                console.log('----Online----')
                console.log(scope.online);
                scope.displayMessage(msg.user, msg.message);
                $timeout(300, function () {
                    console.log('waiting');
                });
            });
            // load history message
            socket.on('load messages', function (msg) {
                console.log(msg)
                for (var x in msg) {
                    var userDisplay = {
                        nickname: msg[x].user.firstName.concat(msg[x].user.lastName),
                        avatar: msg[x].user.profileImageURL,
                        id: msg[x].user._id
                    }
                    scope.counterLineOfMessage++;
                    scope.displayMessage(userDisplay, msg[x].message, msg[x].creationDate);
                };

            });
            // =======INTERAL FUNCTION=======

            function sendMessage(msg) {
                if (msg === "") {
                    $('#btn-input').focus();
                    return;
                }
                scope.counterLineOfMessage++;
                console.log(msg);
                scope.message = "";
                socket.emit('chat message', msg);
            };
            // key listener
            $(function () {

                $('#btn-input').keypress(function (e) {
                    if (e.which == 13) {
                        $(this).blur();
                        $('#btn-chat').focus().click();
                        $('#btn-input').focus();
                    }
                });
            });

            // join a room chat
            function joinRoom(room) {

                if (scope.currentRoom === room._id) {
                    return;
                }
                else {
                    $('.messages').children().remove();
                    scope.counterLineOfMessage = 0;
                }
                scope.roomName = room.name;
                scope.currentRoom = room._id;
                console.log(room.name);
                scope.online = [];
                socket.emit('join', room);
                scope.enableChat = true;

            };
            // leave a room chat
            function leaveRoom() {
                socket.emit('leave');
                scope.enableChat = false;
                scope.currentRoom = 0;
                scope.online = [];
                // $('.messages').children().remove();
                // scope.counterLineOfMessage = 0;

            };
            // display message on message window
            function displayMessage(user, msg, time) {
                // if (scope.counterLineOfMessage > 5) {
                //     $('.messages').children().first().remove();
                //     scope.counterLineOfMessage--;
                // }
                var avatar = user.avatar || "";
                console.log(avatar);
                var nickname = user.nickname;
                // var linkProfile = '#'
                var msgTime = $filter('date')(time, 'short') || ""
                var display;
                if (user.id && (user.id.toString() === $localStorage.userInfo._id.toString())) {
                    display = '<div class="row msg_container base_sent">'
                        + '<div class="col-md-10 col-xs-10">'
                        + '<div class="messages msg_sent">'
                        + '<p>' + msg + '</p>'
                        + '<time datetime="">Me • ' + msgTime + '</time ></div > '
                        + '</div>'
                        + '<div class="col-md-2 col-xs-2 avatar">'
                        + '<img src="' + avatar + '" class="img-responsive">'
                        + '</div>'
                        + ' </div>';
                } else {
                    display = '<div class="row msg_container base_receive">'
                        + '<div class="col-md-2 col-xs-2 avatar">'
                        + '<img src="' + avatar + '" class="img-responsive">'
                        + '</div>'
                        + '<div class="col-md-10 col-xs-10">'
                        + '<div class="messages msg_receive">'
                        + '<p>' + msg + '</p>'
                        + '<time>' + nickname + ' • ' + msgTime + '</time></div>'
                        + '</div>'
                        + ' </div>';
                };
                $('.msg_container_base').append($(display));
                var msgContainer = $('.msg_container_base');
                msgContainer.animate({
                    scrollTop: msgContainer[0].scrollHeight
                }, 500);
            };


            // //chat box settings
            $(document).on('click', '.panel-heading span.icon_minim', function (e) {
                var $this = $(this);
                if (!$this.hasClass('panel-collapsed')) {
                    $this.parents('.panel').find('.panel-body').slideUp();
                    $this.addClass('panel-collapsed');
                    $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
                } else {
                    $this.parents('.panel').find('.panel-body').slideDown();
                    $this.removeClass('panel-collapsed');
                    $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
                }
            });

            $(document).on('focus', '.panel-footer input.chat_input', function (e) {
                var $this = $(this);
                if ($('#minim_chat_window').hasClass('panel-collapsed')) {
                    $this.parents('.panel').find('.panel-body').slideDown();
                    $('#minim_chat_window').removeClass('panel-collapsed');
                    $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
                }
            });
            $(document).on('click', '#new_chat', function (e) {
                var size = $(".chat-window:last-child").css("margin-left");
                size_total = parseInt(size) + 400;
                alert(size_total);
                var clone = $("#chat_window_1").clone().appendTo(".container");
                clone.css("margin-left", size_total);
            });
            $(document).on('click', '.icon_close', function (e) {
                //$(this).parent().parent().parent().parent().remove();
                $("#chat_window_1").remove();
            });
        };
    };
})();