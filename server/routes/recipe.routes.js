var router = require('express').Router();
var RecipeController = require('../controllers/recipe.controller.js');
var authMiddlewares = require('../middlewares/authentication.js');
module.exports = function () {
    // User Routes
    router.get('/', RecipeController.listAllRecipes);
    router.post('/', authMiddlewares.authentication, authMiddlewares.isAdmin, RecipeController.createRecipe);
    router.get('/:recipeId', RecipeController.getRecipe);
    router.put('/:recipeId', authMiddlewares.authentication, authMiddlewares.isAdmin, RecipeController.updateRecipe);
    router.delete('/:recipeId', authMiddlewares.authentication, authMiddlewares.isAdmin, RecipeController.deleteRecipe);
    return router;
};