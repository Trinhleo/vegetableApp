var iotf = require('ibmiotf');

var appClientConfig = {
    org: '42o0m3',
    id: 'myapp',
    "auth-key": 'a-42o0m3-wlsfrvc7mh',
    "auth-token": '@EUwdjdw*jNU6H@fXm',
    "type": "shared"	// make this connection as shared subscription
};

var appClient = new iotf.IotfApplication(appClientConfig);

//setting the log level to trace. By default its 'warn'
appClient.log.setLevel('info');

appClient.connect();

appClient.on("connect", function () {
    appClient.subscribeToDeviceEvents();
});

appClient.on("deviceEvent", function (deviceType, deviceId, eventType, format, payload) {

    var arr = {};
    var data = JSON.parse(payload);
    // for (var p in Object.getOwnPropertyNames(a)) {
    //   arr[p] = a[p];
    // }
    // console.log(data.temp)
    console.log(data.temp);
    //  console.log(payload.hud);
    console.log("Device Event from :: " + deviceType + " : " + deviceId + " of event " + eventType + " with payload : " + payload);
});