var authMiddleware = require('../middlewares/authentication.js');
var path = require('path');
var express = require('express');
module.exports = function (app) {
    // User Routes
    app.use('/api/auth', require('./auth.js')());
    // app.use('/api/user', require('./user.js')());
    // app.use('/api/gallery', require('./gallery.js')());
    // app.use('/api/chat', require('./chat.js')());
}