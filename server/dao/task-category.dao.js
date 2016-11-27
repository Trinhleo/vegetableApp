
var mongoose = require('mongoose');
require('../models/task-category.model.js');
var TaskCategory = mongoose.model('TaskCategory');

module.exports = {
    listTaskCategories: listTaskCategories,
    readTaskCategoryById: readTaskCategoryById,
    readTaskCategory: readTaskCategory,
    createTaskCategory: createTaskCategory,
    updateTaskCategory: updateTaskCategory,
    deleteTaskCategory: deleteTaskCategory
};

function listTaskCategories(query, callback) {
    TaskCategory.find(query).sort('-created').exec(function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function readTaskCategoryById(id, callback) {
    TaskCategory.findById(id).sort('-created').exec(function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function readTaskCategory(query, callback) {
    TaskCategory.findOne(query).exec(function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function createTaskCategory(info, callback) {
    var taskCategory = new TaskCategory(info);
    taskCategory.save(function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });

}

function updateTaskCategory(taskCategoryId, info, callback) {

    TaskCategory.findByIdAndUpdate(taskCategoryId, info, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, true);
    });
}

function deleteTaskCategory(taskCategoryId, callback) {
    TaskCategoryCategory.findByIdAndRemove(taskCategoryId, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, true);
    });
}