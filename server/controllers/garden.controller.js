var gardenDao = require('./../dao/garden.dao');
module.exports = {
    listAllGardens: listAllGardens,
    getGarden: getGarden,
    createGarden: createGarden,
    updateGarden: updateGarden,
    deleteGarden: deleteGarden
};

function listAllGardens(req, res) {
    gardenDao.listAllGardens(cb);
    function cb(err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    }
}

function getGarden(req, res) {
    var gardenId = req.params.gardenId;
    if (!gardenId) {
        return res.status(400).send("not found");
    }

    gardenDao.readGardenById(gardenId, cb);

    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }
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
    var gardenId = req.params.gardenId;
    if (!gardenId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });

    }
    var gardenInfo = req.body;
    if (!gardenId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }
    gardenDao.updateGarden(gardenId, gardenInfo, cb);
    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(result);
    }
}

function deleteGarden(req, res) {
    var gardenId = req.params.gardenId;
    if (!gardenId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }
    gardenDao.deleteGarden(gardenId, cb);
    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(result);
    }
}