var router = require('express').Router();
var FertilizerController = require('../controllers/fertilizer.controller');
var authMiddlewares = require('../middlewares/authentication.js');
module.exports = function () {
    // Fertilizer Routes
    router.get('/', FertilizerController.listAllFertilizers);
    router.post('/', authMiddlewares.authentication, authMiddlewares.isAdmin, FertilizerController.createFertilizer);
    router.get('/:fertilizerId', FertilizerController.getFertilizer);
    router.put('/:fertilizerId', authMiddlewares.authentication, authMiddlewares.isAdmin, FertilizerController.updateFertilizer);
    router.delete('/:fertilizerId', authMiddlewares.authentication, authMiddlewares.isAdmin, FertilizerController.deleteFertilizer);
    return router;
};