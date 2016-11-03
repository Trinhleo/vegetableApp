var router = require('express').Router();
var gardenController = require('../controllers/garden.controller.js');
var authMiddlewares = require('../middlewares/authentication.js');
module.exports = function () {
    // User Routes
    router.get('/', gardenController.listAllGardens);
    router.post('/', authMiddleware.authentication, authMiddlewares.hasRole, gardenController.createGarden);
    router.get('/:gardenId',gardenController.getGarden);
    router.put('/:gardenId', authMiddleware.authentication, authMiddlewares.hasRole, gardenController.updateGarden);
    router.delete('/:gardenId', authMiddleware.authentication, authMiddlewares.hasRole, gardenController.deleteGarden);
    return router;
};