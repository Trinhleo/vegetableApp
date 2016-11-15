
var mongoose = require('mongoose');
require('../models/garden.model.js');
var Garden = mongoose.model('Garden');

module.exports = {
    listAllGardens: listAllGardens,
    listAllGardensByUserId: listAllGardensByUserId,
    readGardenById: readGardenById,
    readGarden: readGarden,
    createGarden: createGarden,
    updateGarden: updateGarden,
    deleteGarden: deleteGarden
};

function listAllGardens(callback) {
    Garden.find().sort('-created').populate('user displayName profileImageURL').populate('productionItem').populate('deviceNode').exec(function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function listAllGardensByUserId(userId, callback) {
    Garden.find({ user: userId }).sort('-created').populate('produtionItem').populate('deviceNode name description').exec(function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function readGardenById(id, callback) {
    Garden.findById(id).populate('produtionItem').populate('deviceNode name description').exec(function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function readGarden(garden, callback) {
    Garden.findOne({
        name: garden.name
    }, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function createGarden(info, callback) {

    var garden = new Garden(info);

    garden.save(function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });

}

function updateGarden(id, info, callback) {

    Garden.findByIdAndUpdate(id, info, function (err, result) {
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