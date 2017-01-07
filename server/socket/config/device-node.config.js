var iotf = require('ibmiotf');
var historyDao = require('./../../dao/history.dao');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var appClientConfig = {
    org: '42o0m3',
    id: 'myapp',
    "auth-key": 'a-42o0m3-wlsfrvc7mh',
    "auth-token": '@EUwdjdw*jNU6H@fXm',
    "type": "shared"	// make this connection as shared subscription
};
var apiKey = 'a-42o0m3-wlsfrvc7mh';
var appClient = new iotf.IotfApplication(appClientConfig);
var nodemailer = require('nodemailer');
var email_to = 'trinhhnk@student.ptithcm.edu.vn'
var transporter = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
        user: 'hnkt2907@gmail.com',
        pass: 'hnkt29071994'
    }
});
module.exports = function (io) {
    var deviceNode = io.of('/device-node');
    var data;
    deviceNode.on('connection', clientConnect);
    //setting the log level to trace. By default its 'warn'
    appClient.log.setLevel('info');

    appClient.connect();

    appClient.on("connect", function () {
        appClient.subscribeToDeviceEvents();
    });

    appClient.on("deviceEvent", function (deviceType, deviceId, eventType, format, payload) {
        var arr = {};
        data = JSON.parse(payload);
        eventEmitter.emit('dataChange', data);

        var info = {
            apiKey: apiKey,
            temperature: data.temp,
            humidity: data.hud || 60
        }
        historyDao.createHistory(info, cb);
        function cb(err, res) {
            console.log(err);
            console.log(res);
        }
        // for (var p in Object.getOwnPropertyNames(a)) {
        //   arr[p] = a[p];
        // }
        // console.log(data.temp)
        console.log(data.temp);
        if (data.temp >= 38) {
            console.log(data.temp);
            var mailOption = {
                from: 'Admin FreshVegetable <hnkt2907@gmail.com>',
                to: '<' + email_to + '>',
                subject: 'Thông báo tình trạng vườn rau',
                html: '<p>Xin chào!</p> <p>Nhiệt độ của vườn rau đang tăng cao. Nhiệt độ là:' + data.temp + '*C</p>'
            };
            transporter.sendMail(mailOption, function (err, info) {
                if (err) {
                    eventEmitter.emit('email_not_send', err);
                } else {
                    eventEmitter.emit('email_sended');
                }
            });
        }
        if (data.temp <= 10) {
            console.log(data.temp);
            var mailOption = {
                from: 'Admin FreshVegetable <hnkt2907@gmail.com>',
                to: '<' + email_to + '>',
                subject: 'Thông báo tình trạng vườn rau',
                html: '<p>Xin chào!</p> <p>Nhiệt độ của vườn rau đang hạ thấp. Nhiệt độ là:' + data.temp + '*C</p>'
            };
            transporter.sendMail(mailOption, function (err, info) {
                if (err) {
                    eventEmitter.emit('email_not_send', err);
                } else {
                    eventEmitter.emit('email_sended');
                }
            });
        }
        if (data.hud <= 50) {
            console.log(data.hud);
            var mailOption = {
                from: 'Admin FreshVegetable <hnkt2907@gmail.com>',
                to: '<' + email_to + '>',
                subject: 'Thông báo tình trạng vườn rau',
                html: '<p>Xin chào!</p> <p>Độ ẩm của vườn rau đang hạ thấp. Độ ẩm là:' + data.hud + '%</p>'
            };
            transporter.sendMail(mailOption, function (err, info) {
                if (err) {
                    eventEmitter.emit('email_not_send', err);
                } else {
                    eventEmitter.emit('email_sended');
                }
            });
        }
        if (data.hud >= 85) {
            console.log(data.hud);
            var mailOption = {
                from: 'Admin FreshVegetable <hnkt2907@gmail.com>',
                to: '<' + email_to + '>',
                subject: 'Thông báo tình trạng vườn rau',
                html: '<p>Xin chào!</p> <p>Độ ẩm của vườn rau đang tăng cao. Độ ẩm là:' + data.hud + '%</p>'
            };
            transporter.sendMail(mailOption, function (err, info) {
                if (err) {
                    eventEmitter.emit('email_not_send', err);
                } else {
                    eventEmitter.emit('email_sended');
                }
            });
        }
        //  console.log(payload.hud);
        console.log("Device Event from :: " + deviceType + " : " + deviceId + " of event " + eventType + " with payload : " + payload);
    });
    function clientConnect(socket) {
        socket.rom = apiKey;
        socket.join(apiKey);
        historyDao.listAllHistory({ isDeleted: false }, cb)
        function cb(err, res) {
            if (res) {
                socket.emit('loadHistorydeviceNodeData', res);
            }
        }
        eventEmitter.on('dataChange', function (data) {
            var info = {
                created: new Date(),
                temperature: data.temp,
                humidity: data.hud || 60
            }
            if (data.temp >= 38) {
                console.log(data.temp)
                socket.emit('highTemp', data.temp);
            }
            socket.emit('deviceNodeData', info);
        });
        eventEmitter.on('email_sended', function (data) {
            socket.emit('sendMailSuccess', email_to);
        });
        eventEmitter.on('email_not_send', function (data) {
            socket.emit('sendMailError', err);
        });
        socket.on('disconnect', function onDisconnect() {
            socket.leaveAll()
            eventEmitter.removeAllListeners('dataChange');
        });
    }
};
