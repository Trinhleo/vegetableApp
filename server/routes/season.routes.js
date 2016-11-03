var router = require('express').Router();
var seasonController = require('../controllers/season.controller.js');
var authMiddlewares = require('../middlewares/authentication.js');
module.exports = function () {
    // User Routes
    router.get('/', seasonController.listAllSeasons);
    router.post('/', authMiddleware.authentication, authMiddlewares.hasRole, seasonController.createSeason);
    router.get('/:seasonId', seasonController.getSeason);
    router.put('/:seasonId', authMiddleware.authentication, authMiddlewares.hasRole, seasonController.updateSeason);
    router.delete('/:seasonId', authMiddleware.authentication, authMiddlewares.hasRole, seasonController.deleteSeason);
    return router;
};