var productionItemDao = require('./../dao/production-item.dao');
module.exports = {
    listAllProductionItems: listAllProductionItems,
    getProductionItem: getProductionItem,
    createProductionItem: createProductionItem,
    updateProductionItem: updateProductionItem,
    deleteProductionItem: deleteProductionItem
};

function listAllProductionItems(req, res) {
    productionItemDao.listAllProductionsItems(cb);
    function cb(err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    }
}

function getProductionItem(req, res) {
    var productionItemId = req.params.productionItemId;
    if (!productionItemId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }

    productionItemDao.readProductionsItemById(productionItemId, cb);

    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(200).send(result);
    }
}


function createProductionItem(req, res) {
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

function updateProductionItem(req, res) {
    var productionsItemId = req.params.productionItemId;
    var piInfo = req.body
    if (req.decoded.roles[0].toString() !== 'admin') {
        return status(403).send({
            errCode: 1,
            errMsg: "Bạn không có quyền quản trị"
        });
    }
    if (!productionsItemId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }

    productionItemDao.updateProductionItemId(productionsItemId, piInfo, cb);
    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(result);
    }
}

function deleteProductionItem(req, res) {
    var productionItemId = req.params.productionItemId;
    if (req.decoded.roles[0].toString() !== 'admin') {
        return status(403).send({
            errCode: 1,
            errMsg: "Bạn không có quyền quản trị"
        });
    }
    if (!productionItemId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }


    productionItemDao.deleteProductionItem(productionItemId, cb);

    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(result);
    }
}