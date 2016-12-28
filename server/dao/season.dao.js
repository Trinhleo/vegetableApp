
var mongoose = require('mongoose');
require('../models/season.model.js');
var Season = mongoose.model('Season');

module.exports = {
    listSeasons: listSeasons,
    readSeasonById: readSeasonById,
    readSeason: readSeason,
    createSeason: createSeason,
    updateSeason: updateSeason,
    updateSeasonByQuery: updateSeasonByQuery,
    deleteSeason: deleteSeason
};

function listSeasons(query, callback) {
    Season.find(query).sort('-created').populate('garden').populate('productionItem')
        .populate('recipe')
        .populate('variety').exec(function (err, result) {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
}

function readSeasonById(id, callback) {
    Season.findById(id).sort('-created').populate('garden').populate('productionItem')
        .populate('recipe')
        .populate('variety')
        .exec(function (err, result) {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
}

function readSeason(query, callback) {
    Season.findOne(query).populate('garden').populate('productionItem')
        .populate('recipe')
        .populate('variety')
        .exec(function (err, result) {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
}

function createSeason(creditial, callback) {
    var season = new Season(creditial);

    season.save(function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });

}

function updateSeason(seasonId, info, callback) {

    Season.findByIdAndUpdate(seasonId, info, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function updateSeasonByQuery(query, info, callback) {

    Season.update(query, info, function (err, result) {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
}

function deleteSeason(seasonId, callback) {
    Season.findByIdAndRemove(seasonId, function (err, result) {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
}