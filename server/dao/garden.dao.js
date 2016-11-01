
var mongoose = require('mongoose');

require('../models/garden.model.js');
var Garden = mongoose.model('Garden');
var _ = require('lodash');

module.exports = {
    listAllGardens: listAllGardens,
    readGardenById: readGardenById,
    readGarden: readGarden,
    createGarden: createGarden,
    updateGarden: updateGarden,
    deleteGarden: deleteGarden
};

function listAllGardens(callback) {
    Garden.find({}, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function readGardenById(id, callback) {
    Garden.findById(id, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function readGarden(garden, callback) {
    Garden.findOne({
        name: garden.gardenname
    }, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function createGarden(info, callback) {
    
    var Garden = new Garden(info);

    Garden.save(function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });

}

function updateGarden(id, info, callback) {

    Garden.findByIdAndUpdate(id, creditial, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, true);
    });
}

function deleteGarden(id, callback) {
    Garden.findByIdAndRemove(id, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, true);
    });
}