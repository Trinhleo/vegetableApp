var authMiddleware = require('../middlewares/authentication.js');
var path = require('path');
var express = require('express');
module.exports = function (app) {
    // User Routes
    app.use('/api/auth', require('./auth.routes.js')());
    app.use('/api/user', require('./user.routes.js')());
    app.use('/api/admin', require('./admin.routes.js')());
    app.use('/api/gardens', require('./garden.routes.js')());
    app.use('/api/seasons', require('./season.routes.js')());
    app.use('/api/production-items', require('./production-item.routes.js')());
    app.use('/api/device-nodes', require('./device-node.routes.js')());
    app.use('/api/task-categories', require('./task-category.routes.js')());
};