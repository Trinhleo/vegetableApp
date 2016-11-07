(function () {
    angular.module('app.chat')
        .controller('ChatController', ChatController);
    ChatController.$inject = ['$localStorage', '$scope', '$timeout']
    function ChatController($localStorage, $scope, $timeout) {
        var vm = this;
        var socket = io.connect('http://localhost:3000');
        vm.roomName = "Please choose a room chat!"
        vm.alert = "";
        vm.roomInfo = {};
        vm.edit = false;
        vm.createRoomOnOff = false;
        vm.myRoomOnOff = false;
        vm.currentRoom = 0;
        vm.counterLineOfMessage = 0;
        vm.message = "";
        vm.messagebox = "";
        vm.online = [];
        vm.rooms = [];
        vm.myRooms = [];
        vm.enableChat = false;
        vm.user = $localStorage.user;
        vm.toggleChatBox = toggleChatBox;
        vm.toggleEditRoom = toggleEditRoom;
        vm.toggleCreateRoom = toggleCreateRoom;
        vm.toggleMyRoomOnOff = toggleMyRoomOnOff;
        vm.sendMessage = sendMessage;
        vm.createRoom = createRoom;
        vm.deleteRoom = deleteRoom;
        vm.editRoom = editRoom;
        vm.joinRoom = joinRoom;
        vm.leaveRoom = leaveRoom;
        vm.ban = ban;
        vm.displayMessage = displayMessage;

        $timeout(1000, function () {
            console.log('waiting');

        });


        // =========TRIGGER ON RECEIVE MESSAGE FROM SOCKET SERVER=========
        // authenticate

        socket.on('connect', function () {
            socket.emit('authenticate', { token: $localStorage.token });
        });


        socket.on('alert', function (msg) {
            vm.alert = msg;
            $timeout(300, function () {
                console.log('waiting');
            });
        });

        //
        socket.on('banned alert', function (msg) {
            vm.alert = msg.message;
            displayMessage(msg.user, msg.message);
            $timeout(3000, function () {
                console.log('waiting');
            });
            vm.enableChat = false;
            vm.online = [];
        });

        //update room
        socket.on('update rooms', function (msg) {
            socket.emit('update rooms');
        });

        // ban
        socket.on('ban', function (msg) {
            vm.alert = msg;

            $timeout(300, function () {
                console.log('waiting');
            });

        });

        // trigger list my rooms

        socket.on('load myrooms', function (msg) {
            vm.myRooms = msg;
            console.log(vm.myRooms);
            $timeout(1000, function () {
                console.log('waiting');
            });
            vm.roomInfo.name = "";
            vm.createRoomOnOff = false;
        });

        // trigger list all rooms


        socket.on('load rooms', function (msg) {
            vm.rooms = msg;
            $timeout(1000, function () {
                console.log('waiting');
            });
            vm.roomInfo.name = "";
            vm.createRoomOnOff = false;
        });

        // trigger receive message
        socket.on('chat message', function (msg) {
            // var lastIndex = msg.length - 1;
            vm.displayMessage(msg.user, msg.message);
        });

        // trigger receive message
        socket.on('online', function (msg) {
            vm.online = msg;
            $timeout(300, function () {
                console.log('waiting');
            });
        });


        // trigger join to a room chat
        socket.on('join', function (msg) {
            console.log(msg)
            if (msg.userInfo) {
                vm.online.push(msg.userInfo);
            };
            vm.displayMessage(msg.user, msg.message);
            $timeout(300, function () {
                console.log('waiting');
            });
            console.log('----Online----')
            console.log(vm.online);
        });

        // trigger leave to a room chat
        socket.on('leave', function (msg) {
            console.log(msg)
            for (var x in vm.online) {
                if (msg.userLeaveId && vm.online[x]._id.toString() === msg.userLeaveId) {
                    vm.online.splice(x, 1);
                    break;
                };
            };
            console.log('----Online----')
            console.log(vm.online);
            vm.displayMessage(msg.user, msg.message);
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
                    avatar: msg[x].user.profileImageURL
                }
                vm.counterLineOfMessage++;
                vm.displayMessage(userDisplay, msg[x].message);
            };

        });

        // trigger create room
        socket.on('create room', function (msg) {
            console.log(msg);
            vm.alert = msg;
            $timeout(300, function () {
                console.log('waiting');
            });

        });

        // trigger delete room
        socket.on('delete room', function (msg) {
            console.log(msg);
            vm.alert = msg;
            $timeout(300, function () {
                console.log('waiting');
            });

        });

        // trigger edit room
        socket.on('edit room', function (msg) {
            console.log(msg);
            vm.alert = msg;
            $timeout(300, function () {
                console.log('waiting');
                vm.alert = "";
            });

        });

        // =======INTERAL FUNCTION=======
        function toggleChatBox() {
            vm.enableChat = vm.enableChat ? false : true;
        }

        function toggleEditRoom() {
            vm.edit = vm.edit ? false : true;
        }

        function toggleCreateRoom() {
            vm.createRoomOnOff = vm.createRoomOnOff ? false : true;
            if (vm.createRoomOnOff) {
                $('#roomName').focus();
            }
        }

        function toggleMyRoomOnOff() {
            vm.myRoomOnOff = vm.myRoomOnOff ? false : true;
        }

        function sendMessage(msg) {
            if (msg === "") {
                $('#m').focus();
                return;
            }
            vm.counterLineOfMessage++;
            console.log(msg);
            vm.message = "";
            socket.emit('chat message', msg);
        };
        // key listener
        $(function () {

            $('#m').keypress(function (e) {
                if (e.which == 13) {
                    $(this).blur();
                    $('#send').focus().click();
                    $('#m').focus();
                }
            });

            $('#roomName').keypress(function (e) {
                if (e.which == 13) {
                    $(this).blur();
                    $('#submitRoom').focus().click();
                    $('#roomName').focus();
                }
            });

        });
        //create a room
        function createRoom(roomInfo) {
            if (roomInfo.name === "") {
                $('#roomName').focus();
                return;

            }
            socket.emit('create room', roomInfo);

        };

        //delete a room
        function deleteRoom(roomId) {
            // if (roomInfo.name === "") {
            //     $('#roomName').focus();
            //     return;

            // }
            socket.emit('delete room', roomId);

        };

        // edit room

        function editRoom(roomInfo) {
            socket.emit('edit room', roomInfo);
            $timeout(100, function () {
                console.log('waiting');
                vm.alert = "";
            });
        }

        // join a room chat
        function joinRoom(room) {

            if (vm.currentRoom === room._id) {
                return;
            }
            else {
                $('.messages').children().remove();
                vm.counterLineOfMessage = 0;
            }
            vm.roomName = room.name;
            vm.currentRoom = room._id;
            console.log(room.name);
            vm.online = [];
            socket.emit('join', room);
            vm.enableChat = true;

        };
        // leave a room chat
        function leaveRoom() {
            socket.emit('leave');
            vm.enableChat = false;
            vm.currentRoom = 0;
            vm.online = [];
            vm.roomName = "Please choose a room chat!";
            $('.messages').children().remove();
            vm.counterLineOfMessage = 0;

        };
        // ban user
        function ban(room, banUser) {
            socket.emit('ban', room, banUser)
        };
        // display message on message window
        function displayMessage(user, msg) {
            if (vm.counterLineOfMessage > 5) {
                $('.messages').children().first().remove();
                vm.counterLineOfMessage--;
            }
            var avatar = user.avatar || "";
            console.log(avatar);
            var nickname = user.nickname;
            var message = msg;
            var display = '<li class="list-group-item">'
                + '<img alt="" class="img-responsive text-center" style="height: 32px; width: 32px;border-radius: 50%;border: 1px solid rgba(0,0,0,0.1);" src="'
                + avatar + '"/><span> ' + nickname + '</span>: ' + message + '</li>';

            $('.messages').append($(display));
        };
    };

    // alert
    $(document).ready(function () {
        $("#success-alert").hide();
        $("#myWish").click(function showAlert() {
            $("#success-alert").alert();
            $("#success-alert").fadeTo(2000, 500).slideUp(500, function () {
                $("#success-alert").slideUp(500);
            });
        });
    });
})();