var gardenDao = require('./../dao/garden.dao');
module.exports = {
    listAllGardens: listAllGardens,
    getGarden: getGarden,
    createGarden: createGarden,
    updateGarden: updateGarden,
    deleteGarden: deleteGarden
};

function listAllGardens(req, res) {
    userId = req.decoded._id;
    gardenDao.listAllGardens(cb);
    function cb(err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        for (var x in result) {
            if (result[x].user._id.toString() === userId.toString()) {
                result.isOwner = true;
            }
        }
        res.status(200).send(result);
    }
}

function getGarden(req, res) {
    var userId = req.decoded._id;
    var gardenId = req.params.gardenId;

    if (!gardenId) {
        return res.status(400).send("not found");
    }

    gardenDao.readGardenById(gardenId, cb);

    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        result.isOwner = userId.toString === result.user.toString() ? true : false;
        res.status(200).send(result);
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
        productionItem: req.body.productionItem
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