
var mongoose = require('mongoose');
require('../models/history.model.js');
var History = mongoose.model('History');

module.exports = {
    listAllHistory: listAllHistory,
    readHistoryById: readHistoryById,
    readHistory: readHistory,
    createHistory: createHistory,
    updateHistory: updateHistory,
    deleteHistory: deleteHistory
};

function listAllHistory(query,callback) {
    History.find(query, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function readHistoryById(id, callback) {
    History.findById(id, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function readHistory(query, callback) {
    History.findOne(query, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function createHistory(info, callback) {
    var history = new History(info);

    history.save(function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });

}

function updateHistory(id, info, callback) {

    History.findByIdAndUpdate(id, info, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, true);
    });
}

function deleteHistory(id, callback) {
    History.findByIdAndRemove(id, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, true);
    });
}