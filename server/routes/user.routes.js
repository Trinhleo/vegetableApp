var router = require('express').Router();
var userController = require('../controllers/user.controller.js');
var authMiddlewares = require('../middlewares/authentication.js');
var uploader = require('../middlewares/uploader.js');
module.exports = function () {
    // User Routes
    router.get('/me', authMiddlewares.authentication, userController.me);
    router.get('/:userId', authMiddlewares.authentication, userController.userInfo);
    router.put('/me', authMiddlewares.authentication, userController.updateProfile);
    router.post('/me/profile-picture', authMiddlewares.authentication, uploader.uploadSingle, userController.changePictureProfile);
    return router;
};