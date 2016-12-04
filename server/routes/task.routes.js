var router = require('express').Router();
var taskController = require('../controllers/task.controller.js');
var authMiddlewares = require('../middlewares/authentication.js');
module.exports = function () {
    // User Routes
    router.get('/', taskController.listMyTasks);
    router.post('/', authMiddlewares.authentication, taskController.createTask);
    router.get('/:taskId', taskController.getTask);
    router.put('/:taskId', authMiddlewares.authentication, taskController.updateTask);
    router.delete('/:taskId', authMiddlewares.authentication, taskController.deleteTask);
    return router;
};