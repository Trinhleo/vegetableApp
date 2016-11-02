
var mongoose = require('mongoose');

require('../models/season.model.js');
var Season = mongoose.model('Season');
var _ = require('lodash');

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

function updateSeason(id, info, callback) {

    Season.findByIdAndUpdate(id, info, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, true);
    });
}

function deleteSeason(id, callback) {
    Season.findByIdAndRemove(id, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, true);
    });
}