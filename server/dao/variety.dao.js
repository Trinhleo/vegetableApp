
var mongoose = require('mongoose');
require('../models/variety.model');
var Variety = mongoose.model('Variety');

module.exports = {
    listAllVarieties: listAllVarieties,
    readVarietyById: readVarietyById,
    readVariety: readVariety,
    createVariety: createVariety,
    updateVariety: updateVariety,
    deleteVariety: deleteVariety
};

function listAllVarieties(query,callback) {
    Variety.find(query, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function readVarietyById(id, callback) {
    Variety.findById(id, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function readVariety(query, callback) {
    Variety.findOne(query, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function createVariety(info, callback) {
    var variety = new Variety(info);

    variety.save(function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });

}

function updateVariety(id, info, callback) {

    Variety.findByIdAndUpdate(id, info, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, true);
    });
}

function deleteVariety(id, callback) {
    Variety.findByIdAndRemove(id, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, true);
    });
}