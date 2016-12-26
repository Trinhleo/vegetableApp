
var mongoose = require('mongoose');
require('../models/fertilizer.model.js');
var Fertilizer = mongoose.model('Fertilizer');

module.exports = {
    listFertilizers: listFertilizers,
    readFertilizerById: readFertilizerById,
    readFertilizer: readFertilizer,
    createFertilizer: createFertilizer,
    updateFertilizer: updateFertilizer,
    deleteFertilizer: deleteFertilizer
};

function listFertilizers(query, callback) {
    Fertilizer.find(query).sort('-created').populate('garden').populate('productionItem').exec(function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function readFertilizerById(id, callback) {
    Fertilizer.findById(id).sort('-created').populate('garden').populate('productionItem').exec(function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function readFertilizer(query, callback) {
    Fertilizer.findOne(query).populate('garden').populate('productionItem').exec(function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function createFertilizer(info, callback) {
    var fertilizer = new Fertilizer(info);

    fertilizer.save(function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });

}

function updateFertilizer(fertilizerId, info, callback) {

    Fertilizer.findByIdAndUpdate(fertilizerId, info, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, true);
    });
}

function deleteFertilizer(FertilizerId, callback) {
    Fertilizer.findByIdAndRemove(FertilizerId, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, true);
    });
}