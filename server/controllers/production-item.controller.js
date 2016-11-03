var productionItemDao = require('./../dao/production-item.dao');
module.exports = {
    listAllProductionItems: listAllProductionItems,
    getProductionItem: getProductionItem,
    createProductionsItem: createProductionsItem,
    updateProductionItem: updateProductionItem,
    deleteProductionItem: deleteProductionItem
};

function listAllProductionsItems(req, res) {
    productionItemDao.listAllProductionsItems(cb);
    function cb(err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    }
}

function getProductionsItem(req, res) {
    var productionsItemId = req.params.productionsItemId;
    if (!seasonId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }

    productionItemDao.readProductionsItemById(productionsItemId, cb);

    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(200).send(result);
    }
}


function createProductionsItem(req, res) {
    if (!req.body.name) {
        return res.status(500).send({
            errCode: 0,
            errMsg: "Lỗi nhập liệu"
        });
    }
    var piInfo = {
        name: req.body.name
    };
    productionItemDao.createSeason(piInfo, cb);
    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(200).send(result);
    }
}

function updateProductionsItem(req, res) {
    var productionsItemId = req.params.productionsItemId;
    var piInfo = req.body
    if (req.decoded.roles[0].toString() !== 'admin') {
        return status(403).send({
            errCode: 1,
            errMsg: "Bạn không có quyền quản trị"
        });
    }
    if (!seasonId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }

    productionItemDao.updateProductionsItemId(productionsItemId, piInfo, cb);
    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(result);
    }
}

function deleteProductionsItem(req, res) {
    var productionsItemId = req.params.productionsItemId;
    if (req.decoded.roles[0].toString() !== 'admin') {
        return status(403).send({
            errCode: 1,
            errMsg: "Bạn không có quyền quản trị"
        });
    }
    if (!seasonId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }


    productionItemDao.deleteProductionItem(productionsItemId, cb);

    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(result);
    }
}