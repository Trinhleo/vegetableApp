
var mongoose = require('mongoose');
require('../models/recipe.model.js');
var Recipe = mongoose.model('Recipe');

module.exports = {
    listRecipes: listRecipes,
    readRecipeById: readRecipeById,
    readRecipe: readRecipe,
    createRecipe: createRecipe,
    updateRecipe: updateRecipe,
    deleteRecipe: deleteRecipe
};

function listRecipes(query, callback) {
    Recipe.find(query).sort('-created').populate('garden').populate('productionItem').exec(function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function readRecipeById(id, callback) {
    Recipe.findById(id).sort('-created').populate('garden').populate('productionItem').exec(function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function readRecipe(query, callback) {
    Recipe.findOne(query).populate('garden').populate('productionItem').exec(function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function createRecipe(info, callback) {
    var recipe = new Recipe(info);

    recipe.save(function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });

}

function updateRecipe(recipeId, info, callback) {

    Recipe.findByIdAndUpdate(recipeId, info, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, true);
    });
}

function deleteRecipe(recipeId, callback) {
    Recipe.findByIdAndRemove(RecipeId, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, true);
    });
}