var router = require('express').Router();
var authController = require('../controllers/auth.controller.js');
var authMiddleware = require('../middlewares/authentication.js');
module.exports = function () {
    // User Routes
    router.post('/signup', authController.signup);
    router.post('/signin', authController.signin);
    router.get('/signout', authMiddleware.authentication, authController.signout);
    return router;
}