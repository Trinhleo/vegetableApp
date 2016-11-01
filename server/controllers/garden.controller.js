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
    var gardenInfo = {
        // TODO
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
    var gardenInfo = req.body;
    if (!gardenId) {
        return res.status(400).send("not found");
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
        return res.status(400).send("not found");
    }
    gardenDao.deleteGarden(gardenId, cb);
    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(result);
    }
}