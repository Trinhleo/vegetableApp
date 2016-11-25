var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./config/db');
var serverConfig = require('./config/server');
var routes = require('./routes/index.routes.js');
var errorHandler = require('./middlewares/error-handler');
var methodOverride = require('method-override');
var path = require('path');
var serveStatic = require('serve-static');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var favicon = require('serve-favicon');
var myIp = require('ip');
// var socketConfig = require('./config/socket');
var morgan = require('morgan');
// =======================
// configuration =========
// =======================
var port = serverConfig.PORT;
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, authorization');
    next();
};

db.init();
// use body parser so we can get info from POST and/or URL parameters
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(methodOverride())
app.use(errorHandler.errorHandler());
app.use(allowCrossDomain);
app.use(express.favicon());
//service static files
app.use('/', express.static(path.resolve('./public')));
// console.log(path.resolve('./uploads'));
//socket io
// socketConfig(io, app);
//register routes
routes(app);
// register socket io
// socketIoConfig(app);
// use morgan to log requests to the console
server.listen(port);
console.log('Server starting ' + myIp.address() + ':' + port);