var router = require('express').Router();
var gardenController = require('../controllers/garden.controller.js');
var authMiddlewares = require('../middlewares/authentication.js');
module.exports = function () {
    // User Routes
    router.get('/', gardenController.listAllGardens);
    router.post('/', authMiddlewares.authentication, gardenController.createGarden);
    router.get('/my-gardens', authMiddlewares.authentication, gardenController.listMyGardens);
    router.get('/:gardenId', gardenController.getGarden);
    router.put('/:gardenId', authMiddlewares.authentication, gardenController.updateGarden);
    router.delete('/:gardenId', authMiddlewares.authentication, gardenController.deleteGarden);
    return router;
};