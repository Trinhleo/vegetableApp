var seasonDao = require('./../dao/season.dao');
var gardenDao = require('./../dao/garden.dao');
module.exports = {
    listAllSeasons: listAllSeasons,
    listAllSeasonsOfGarden: listAllSeasonsOfGarden,
    listMySeasons: listMySeasons,
    getSeason: getSeason,
    createSeason: createSeason,
    updateSeason: updateSeason,
    deleteSeason: deleteSeason
};

function listAllSeasons(req, res) {
    seasonDao.listSeasons({}, cb);
    function cb(err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    }
}

function listAllSeasonsOfGarden(req, res) {
    var gardenId = req.params.gardenId;
    if (!gardenId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    };
    seasonDao.listSeasons({
        garden: gardenId
    }, cb);
    function cb(err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    }
}
function listMySeasons(req, res) {
    seasonDao.listSeasons({ user: req.decoded._id }, cb);
    function cb(err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    }
}

function getSeason(req, res) {
    var userId = req.decoded._id;
    var seasonId = req.params.seasonId;
    if (!seasonId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }

    seasonDao.readSeasonById(seasonId, cb);

    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        if (null === result) {
            return res.status(400).send({
                errCode: 0,
                errMsg: "Không tìm thấy!"
            });
        }
        result_doc.isOwner = userId.toString() === result.user.toString() ? true : false
        result_doc.isAdmin = req.decoded.role[0] === 'admin' ? true : false;
        res.status(200).send(result);
    }
}


function createSeason(req, res) {
    if (!req.body.name || !req.body.garden || !req.body.productionItem || req.body.seedQuantity < 0) {
        return res.status(500).send({
            errCode: 0,
            errMsg: "Lỗi nhập liệu"
        });
    }
    var seasonInfo = {
        user: req.decoded._id,
        name: req.body.name,
        garden: req.body.garden,
        productionItem: req.body.productionItem,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        seedQuantity: req.body.seedQuantity
    };
    seasonDao.createSeason(seasonInfo, cb);
    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(200).send(result);
    }
}

function updateSeason(req, res) {
    var userId = req.decoded._id;
    var seasonId = req.params.seasonId;
    var seasonInfo = req.body
    if (!seasonId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }

    seasonDao.readSeason({
        user: userId,
        _id: seasonId
    }, function (err, season) {
        if (err || !season) {
            return res.status(400).send({
                errCode: 1,
                errMsg: "Bạn không phải là chủ mùa vụ!"
            });
        }

        seasonDao.updateSeason(seasonId, seasonInfo, cb);
        function cb(err, result) {
            if (err) {
                return res.status(400).send(err);
            }

            res.status(200).send(result);
        }
    })
}

function deleteSeason(req, res) {
    var seasonId = req.params.seasonId;
    if (!seasonId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }

    seasonDao.readSeason({
        _id: gardenId,
        user: userId
    }, function (err, result) {
        if (err || null === result) {
            return res.status(400).send({
                errCode: 1,
                errMsg: "Bạn không phải là chủ mùa vụ!"
            });
        }
        SeasonDao.deleteSeason(seasonId, cb);

        function cb(err, result) {
            if (err) {
                return res.status(400).send(err);
            }

            res.status(200).send(result);
        }
    });
}