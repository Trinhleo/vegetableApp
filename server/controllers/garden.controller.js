var gardenDao = require('./../dao/garden.dao');
var myIp = require('ip').address() || '127.0.0.1';
var myHost = require('./../config/server').HOST;
var port = require('./../config/server').PORT;
var urlPrefix = ('//').concat(myHost).concat(':').concat(port);
var _ = require('lodash');
module.exports = {
    listAllGardens: listAllGardens,
    listAllGardensApproved: listAllGardensApproved,
    listMyGardens: listMyGardens,
    listAllGardensOfUser: listAllGardensOfUser,
    getGarden: getGarden,
    createGarden: createGarden,
    updateGarden: updateGarden,
    deleteGarden: deleteGarden,
    approve: approve,
    unApprove: unApprove
};

function listAllGardens(req, res) {
    gardenDao.listAllGardens({}, cb);
    function cb(err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        var gardens = result;
        _.forEach(gardens, function (gd) {
            var g = gd;
            if (req.decoded && (g.user._id.toString() === req.decoded._id.toString())) {
                g.isOwner = true;
            }
            g._doc.imgUrlFull = urlPrefix.concat(g.imgUrl);
            g._doc.userHostProfileImageURL = urlPrefix.concat(gd.user.profileImageURL);
            _.forEach(gd.productionItem, function (pi) {
                pi._doc.imgUrlFull = urlPrefix.concat(pi.imgUrl);
            });
        });
        res.status(200).send(gardens);
    }
}
function listAllGardensApproved(req, res) {
    gardenDao.listAllGardens({ approved: true }, cb);
    function cb(err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        var gardens = result;
        _.forEach(gardens, function (gd) {
            var g = gd;
            if (req.decoded && (g.user._id.toString() === req.decoded._id.toString())) {
                g.isOwner = true;
            }
            g._doc.imgUrlFull = urlPrefix.concat(g.imgUrl);
            g._doc.userHostProfileImageURL = urlPrefix.concat(gd.user.profileImageURL);
            _.forEach(gd.productionItem, function (pi) {
                pi._doc.imgUrlFull = urlPrefix.concat(pi.imgUrl);
            });
        });
        res.status(200).send(gardens);
    }
}


function listMyGardens(req, res) {
    var userId = req.decoded._id;
    gardenDao.listAllGardens({ user: userId }, cb);
    function cb(err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        var gardens = result;
        _.forEach(gardens, function (gd) {
            var g = gd;
            g._doc.imgUrlFull = urlPrefix.concat(g.imgUrl);
            _.forEach(g.productionItem, function (pi) {
                pi._doc.imgUrlFull = urlPrefix.concat(pi.imgUrl);
            });
        });
        res.status(200).send(gardens);
    }
}

function listAllGardensOfUser(req, res) {

    if (!req.params.userId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }
    userId = req.params.userId;
    gardenDao.listAllGardensByUserId(userId, cb);
    function cb(err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        var gardens = result;
        _.forEach(gardens, function (gd) {
            var g = gd;
            g._doc.imgUrlFull = urlPrefix.concat(g.imgUrl);
            _.forEach(g.productionItem, function (pi) {
                pi._doc.imgUrlFull = urlPrefix.concat(pi.imgUrl);
            });
        });
        res.status(200).send(gardens);
    }
}

function getGarden(req, res) {
    var userId = req.decoded ? req.decoded._id : '';
    // var isAdmin = req.decoded && req.decoded.roles[0] === 'admin' ? true : false;
    var gardenId = req.params.gardenId;

    if (!gardenId) {
        return res.status(400).send("not found");
    }

    gardenDao.readGardenById(gardenId, cb);

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
        var garden = result;
        garden._doc.imgUrlFull = urlPrefix.concat(garden.imgUrl);
        garden._doc.userHostProfileImageURL = urlPrefix.concat(result.user.profileImageURL);
        _.forEach(garden.productionItem, function (pi) {
            pi._doc.imgUrlFull = urlPrefix.concat(pi.imgUrl);
        });
        res.status(200).send(garden);
    }
}

function createGarden(req, res) {

    if (!req.body.name || !req.body.address || !req.body.area || req.body.area < 0 || req.body.location.length === 0) {
        return res.status(500).send({
            errCode: 0,
            errMsg: "Lỗi nhập liệu"
        });
    }
    var gardenInfo = {
        name: req.body.name,
        address: req.body.address,
        area: req.body.area,
        user: req.decoded._id,
        location: req.body.location,
        productionItem: req.body.productionItem,
        deviceNode: req.body.deviceNode,
        description: req.body.description,
    };
    gardenDao.createGarden(gardenInfo, cb);
    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(200).send(result);
    }
}

function updateGarden(req, res) {
    var userId = req.decoded._id;
    var gardenId = req.params.gardenId;
    if (!gardenId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });

    }
    var gardenInfo = req.body;
    gardenDao.readGarden({
        _id: gardenId,
        user: userId
    }, function (err, result) {
        if (err || null === result) {
            return res.status(400).send({
                errCode: 1,
                errMsg: "Bạn không phải là chủ vườn!"
            });
        }
        gardenDao.updateGarden(gardenId, gardenInfo, cb);
        function cb(err, result) {
            if (err) {
                return res.status(400).send(err);
            }

            res.status(200).send(result);
        }
    });
}

function deleteGarden(req, res) {
    var userId = req.decoded._id;
    var gardenId = req.params.gardenId;
    if (!gardenId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }
    gardenDao.readGarden({
        _id: gardenId,
        user: userId
    }, function (err, result) {
        if (err || null === result) {
            return res.status(400).send({
                errCode: 1,
                errMsg: "Bạn không phải là chủ vườn!"
            });
        }
        gardenDao.deleteGarden(gardenId, cb);
        function cb(err, result) {
            if (err) {
                return res.status(400).send(err);
            }

            res.status(200).send(result);
        }
    });
}
function approve(req, res) {

    var gardenId = req.params.gardenId;
    gardenDao.updateGarden(gardenId, { approved: true }, cb);
    function cb(err, result) {
        if (err) {
            return res.status(400).send(
                {
                    errCode: 0,
                    errMsg: "Lỗi hệ thống!"
                }
            )
        };
        res.status(200).send({
            msg: "Vườn được duyệt thành công!"
        });
    }
}

function unApprove(req, res) {

    var gardenId = req.params.gardenId;

    gardenDao.updateGarden(gardenId, { approved: false }, cb);
    function cb(err, result) {
        if (err) {
            return res.status(400).send(
                {
                    errCode: 0,
                    errMsg: "Lỗi hệ thống!"
                }
            )
        };
        res.status(200).send({
            msg: "Vườn được bỏ duyệt thành công!"
        });
    }
}