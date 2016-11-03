
var mongoose = require('mongoose');
require('../models/season.model.js');
var Season = mongoose.model('Season');

module.exports = {
    listAllSeasons: listAllSeasons,
    readSeasonById: readSeasonById,
    readSeason: readSeason,
    createSeason: createSeason,
    updateSeason: updateSeason,
    deleteSeason: deleteSeason
};

function listAllSeasons(callback) {
    Season.find({}, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function readSeasonById(id, callback) {
    Season.findById(id, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function readSeason(season, callback) {
    Season.findOne({
        name: season.name
    }, function (err, result) {
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
        callback(null, true);
    });
}

function deleteSeason(seasonId, callback) {
    Season.findByIdAndRemove(seasonId, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, true);
    });
}