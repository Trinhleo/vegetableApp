var VarietyDao = require('./../dao/variety.dao');
module.exports = {
    listAllVarieties: listAllVarieties,
    listVarietiesByPid: listVarietiesByPid,
    getVariety: getVariety,
    createVariety: createVariety,
    updateVariety: updateVariety,
    deleteVariety: deleteVariety
};

function listAllVarieties(req, res) {
    VarietyDao.listAllVarieties({ isDeleted: false }, cb);
    function cb(err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    }
}

function listVarietiesByPid(req, res) {
    VarietyDao.listAllVarieties({ productionItem: req.params.productionItemId, isDeleted: false }, cb);
    function cb(err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    }
}



function getVariety(req, res) {
    var varietyId = req.params.varietyId;
    if (!varietyId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }

    VarietyDao.readVariety({ _id: varietyId, isDeleted: false }, cb);

    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(200).send(result);
    }
}


function createVariety(req, res) {
    if (!req.body.name || !req.body.productionItem) {
        return res.status(500).send({
            errCode: 0,
            errMsg: "Lỗi nhập liệu"
        });
    }
    var dvnInfo = {
        productionItem: req.body.productionItem,
        name: req.body.name,
        description: req.body.description || ''
    };
    VarietyDao.createVariety(dvnInfo, cb);
    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(200).send(result);
    }
}

function updateVariety(req, res) {
    var varietyId = req.params.varietyId;
    var dvnInfo = req.body
    if (req.decoded.roles[0].toString() !== 'admin') {
        return status(403).send({
            errCode: 1,
            errMsg: "Bạn không có quyền quản trị"
        });
    }
    if (!varietyId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }

    VarietyDao.updateVariety(varietyId, dvnInfo, cb);
    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(result);
    }
}

function deleteVariety(req, res) {
    var varietyId = req.params.varietyId;
    if (req.decoded.roles[0].toString() !== 'admin') {
        return status(403).send({
            errCode: 1,
            errMsg: "Bạn không có quyền quản trị"
        });
    }
    if (!varietyId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }


    VarietyDao.updateVariety(varietyId, { isDeleted: true, deleteDate: new Date() }, cb);

    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(result);
    }
}