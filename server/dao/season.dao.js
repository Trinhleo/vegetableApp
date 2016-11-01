
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
        Seasonname: season.seasonname
    }, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function createSeason(creditial, callback) {
    var Season = new Season(creditial);

    Season.save(function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });

}

function updateSeason(id, creditial, callback) {

    Season.findByIdAndUpdate(id, creditial, function (err, result) {
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