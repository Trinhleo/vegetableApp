var router = require('express').Router();
var adminController = require('../controllers/admin.controller.js');
var authMiddlewares = require('../middlewares/authentication.js');
module.exports = function () {
    router.get('/users', authMiddlewares.authentication, authMiddlewares.isAdmin, adminController.listAllUsers);
    router.put('/users/:userId', authMiddlewares.authentication, authMiddlewares.isAdmin, adminController.updateUser);
    router.delete('/users/:userId', authMiddlewares.authentication, authMiddlewares.isAdmin, adminController.deleteUser);
    return router;
};