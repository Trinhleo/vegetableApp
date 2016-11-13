var router = require('express').Router();
var deviceNodeController = require('../controllers/device-node.controller.js');
var authMiddlewares = require('../middlewares/authentication.js');
module.exports = function () {
    // User Routes
    router.get('/',authMiddlewares.authentication,deviceNodeController.listAllDeviceNodes);
    router.post('/', authMiddlewares.authentication, authMiddlewares.isAdmin, deviceNodeController.createDeviceNode);
    router.get('/:deviceNodeId',authMiddlewares.authentication,deviceNodeController.getDeviceNode);
    router.put('/:deviceNodeId', authMiddlewares.authentication, authMiddlewares.isAdmin, deviceNodeController.updateDeviceNode);
    router.delete('/:deviceNodeId', authMiddlewares.authentication, authMiddlewares.isAdmin, deviceNodeController.deleteDeviceNode);
    return router;
};