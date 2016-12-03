var router = require('express').Router();
var taskCategoryController = require('../controllers/task-category.controller.js');
var authMiddlewares = require('../middlewares/authentication.js');
module.exports = function () {
    // User Routes
    router.get('/', taskCategoryController.listTaskCategories);
    router.post('/', authMiddlewares.authentication, authMiddlewares.isAdmin, taskCategoryController.createTaskCategory);
    router.get('/:taskCategoryId', taskCategoryController.getTaskCategory);
    router.put('/:taskCategoryId', authMiddlewares.authentication, authMiddlewares.isAdmin, taskCategoryController.updateTaskCategory);
    router.delete('/:taskCategoryId', authMiddlewares.authentication, authMiddlewares.isAdmin, taskCategoryController.deleteTaskCategory);
    return router;
};