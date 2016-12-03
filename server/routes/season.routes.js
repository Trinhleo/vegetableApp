var router = require('express').Router();
var seasonController = require('../controllers/season.controller.js');
var taskController = require('../controllers/task.controller.js')
var authMiddlewares = require('../middlewares/authentication.js');
module.exports = function () {
    // User Routes
    router.get('/', seasonController.listAllSeasons);
    router.post('/', authMiddlewares.authentication, seasonController.createSeason);
    router.get('/:seasonId', seasonController.getSeason);
    router.put('/:seasonId', authMiddlewares.authentication, seasonController.updateSeason);
    router.get('/:seasonId/tasks', authMiddlewares.authentication, taskController.listAllTasksOfSeason);
    router.delete('/:seasonId', authMiddlewares.authentication, seasonController.deleteSeason);
    return router;
};