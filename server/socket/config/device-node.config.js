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
            humidity: data.hud
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
                created : new Date(),
                temperature: data.temp,
                humidity: data.hud
            }
            socket.emit('deviceNodeData', info);
        });
        socket.on('disconnect', function onDisconnect() {
            socket.leaveAll()
            eventEmitter.removeAllListeners('dataChange');
        });
    }
};