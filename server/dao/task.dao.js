
var mongoose = require('mongoose');
require('../models/task.model.js');
var Task = mongoose.model('Task');

module.exports = {
    listTasks: listTasks,
    readTaskById: readTaskById,
    readTask: readTask,
    createTask: createTask,
    updateTask: updateTask,
    updateTaskByQuery: updateTaskByQuery,
    deleteTask: deleteTask
};

function listTasks(query, callback) {
    Task.find(query).sort('-created').populate('season').exec(function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function readTaskById(id, callback) {
    Task.findById(id).sort('-created').populate('season').exec(function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function readTask(query, callback) {
    Task.findOne(query).populate('season').exec(function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function createTask(creditial, callback) {
    var task = new Task(creditial);

    task.save(function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });

}

function updateTask(taskId, info, callback) {

    Task.findByIdAndUpdate(taskId, info, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, true);
    });
}
function updateTaskByQuery(query, info, callback) {

    Task.update(query, info, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, true);
    });
}

function deleteTask(taskId, callback) {
    Task.findByIdAndRemove(taskId, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, true);
    });
}