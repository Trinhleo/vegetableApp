var router = require('express').Router();
var userController = require('../controllers/user.controller.js');
var authMiddlewares = require('../middlewares/authentication.js');
var uploader = require('../middlewares/uploader.js');
module.exports = function () {
    // User Routes
    router.get('/me', authMiddleware.authentication, authMiddlewares.hasRole, userController.me);
    route.put('/me', authMiddleware.authentication, authMiddlewares.hasRole, userController.updateProfile);
    router.put('/me/profile-picture', authMiddleware.authentication, authMiddlewares.hasRole, uploader.uploadSingle, userController.changePictureProfile);
    return router;
};