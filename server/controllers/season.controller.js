var seasonDao = require('./../dao/season.dao');
module.exports = {
    listAllSeasons: listAllSeasons,
    getSeason: getSeason,
    updateSeason: updateSeason,
    deleteSeason: deleteSeason
};

function listAllSeasons(req, res) {
    seasonDao.listAllSeasons(cb);
    function cb(err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    }
}

function getSeason(req, res) {
    var seasonId = req.params.seasonId;
    if (!SeasonId) {
        return res.status(400).send("not found");
    }

    SeasonDao.readSeasonById(seasonId, cb);

    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(200).send(result);
    }
}


function createSeason(req, res) {
    var seasonInfo = {
        // TODO
    };
    gardenDao.createSeason(seasonInfo, cb);
    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(200).send(result);
    }
}

function updateSeason(req, res) {
    var seasonId = req.params.SeasonId;
    var seasonInfo = req.body
    if (!SeasonId) {
        return res.status(400).send("not found");
    }
    SeasonDao.updateSeason(seasonId, seasonInfo, cb);
    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(result);
    }
}

function updateSeason(req, res) {
    var SeasonId = req.params.SeasonId;
    if (!SeasonId) {
        return res.status(400).send("not found");
    }
    SeasonDao.deleteSeason(SeasonId, cb);
    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(result);
    }
}