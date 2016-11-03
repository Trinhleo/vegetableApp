var authMiddleware = require('../middlewares/authentication.js');
var path = require('path');
var express = require('express');
module.exports = function (app) {
    // User Routes
    app.use('/api/auth', require('./auth.js')());
    app.use('/api/user', require('./user.js')());
    app.use('/api/admin', require('./admin.js')());
    app.use('/api/gardens', require('./garden.js')());
    app.use('/api/seasons', require('./season.js')());
    app.use('/api/production-items', require('./production-item.js')());
};