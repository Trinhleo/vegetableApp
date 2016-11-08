var router = require('express').Router();
var userController = require('../controllers/user.controller.js');
var authMiddlewares = require('../middlewares/authentication.js');
var uploader = require('../middlewares/uploader.js');
module.exports = function () {
    // User Routes
    router.get('/me', authMiddlewares.authentication, authMiddlewares.hasRole, userController.me);
    router.put('/me', authMiddlewares.authentication, authMiddlewares.hasRole, userController.updateProfile);
    router.post('me/profile-picture', authMiddlewares.authentication, authMiddlewares.hasRole, uploader.uploadSingle, userController.changePictureProfile);
    return router;
};