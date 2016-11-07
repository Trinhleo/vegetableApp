var router = require('express').Router();
var authController = require('../controllers/auth.controller.js');
var authMiddlewares = require('../middlewares/authentication.js');
module.exports = function () {
    router.post('/signup', authController.signup);
    router.post('/signin', authController.signin);
    router.get('/signout', authMiddlewares.authentication, authController.signout);
    return router;
};