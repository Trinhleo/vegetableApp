var seasonDao = require('./../dao/season.dao');
var gardenDao = require('./../dao/garden.dao'); var myIp = require('ip').address() || '127.0.0.1';
var myHost = require('./../config/server').HOST;
var port = require('./../config/server').PORT;
var urlPrefix = ('//').concat(myHost).concat(':').concat(port);
var _ = require('lodash');
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
        _.forEach(result, function (gd) {
            var g = gd;
            g._doc.productionItemUrl = urlPrefix.concat(g.productionItem.imgUrl);
        });
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
        _.forEach(result, function (gd) {
            var g = gd;
            g._doc.productionItemUrl = urlPrefix.concat(g.productionItem.imgUrl);
        });
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
    var userId = req.decoded ? req.decoded._id : '';
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
        result._doc.productionItemUrl = urlPrefix.concat(result.productionItem.imgUrl);
        // result._doc.isOwner = userId.toString() === result.user.toString() ? true : false
        // result._doc.isAdmin = req.decoded.role[0] === 'admin' ? true : false;
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
    gardenDao.readGardenById(req.body.garden, callback);
    function callback(err, result) {
        if (err) {
            return res.status(500).send({ errCode: 0, errMsg: 'Lỗi hệ thống' });
        };
        if (null === result) {
            return res.status(500).send({ errCode: 1, errMsg: 'Vườn không tồn tại' })
        };

        if (result.approved === false) {
            return res.status(403).send({ errCode: 1, errMsg: 'Vườn chưa dược duyệt' })
        };

        console.log('approved', res.approved);

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