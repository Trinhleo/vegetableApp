var FertilizerDao = require('./../dao/fertilizer.dao');
module.exports = {
    listAllFertilizers: listAllFertilizers,
    getFertilizer: getFertilizer,
    createFertilizer: createFertilizer,
    updateFertilizer: updateFertilizer,
    deleteFertilizer: deleteFertilizer
};

function listAllFertilizers(req, res) {
    FertilizerDao.listFertilizers({ isDeleted: false }, cb);
    function cb(err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    }
}

function getFertilizer(req, res) {
    var fertilizerId = req.params.fertilizerId;
    if (!fertilizerId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }

    FertilizerDao.readFertilizer({ _id: fertilizerId, isDeleted: false }, cb);

    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(200).send(result);
    }
}


function createFertilizer(req, res) {
    if (!req.body.name) {
        return res.status(500).send({
            errCode: 0,
            errMsg: "Lỗi nhập liệu"
        });
    }
    var dvnInfo = {
        name: req.body.name,
        description: req.body.description || ''
    };
    FertilizerDao.createFertilizer(dvnInfo, cb);
    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(200).send(result);
    }
}

function updateFertilizer(req, res) {
    var fertilizerId = req.params.fertilizerId;
    var dvnInfo = req.body
    if (req.decoded.roles[0].toString() !== 'admin') {
        return status(403).send({
            errCode: 1,
            errMsg: "Bạn không có quyền quản trị"
        });
    }
    if (!fertilizerId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }

    FertilizerDao.updateFertilizer(fertilizerId, dvnInfo, cb);
    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(result);
    }
}

function deleteFertilizer(req, res) {
    var fertilizerId = req.params.fertilizerId;
    if (req.decoded.roles[0].toString() !== 'admin') {
        return status(403).send({
            errCode: 1,
            errMsg: "Bạn không có quyền quản trị"
        });
    }
    if (!fertilizerId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }


    FertilizerDao.updateFertilizer(fertilizerId, { isDeleted: true, deleteDate: new Date() }, cb);

    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(result);
    }
}