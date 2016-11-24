var productionItemDao = require('./../dao/production-item.dao');
var myIp = require('ip').address();
var myHost = require('./../config/server').HOST;
var port = require('./../config/server').PORT;
var urlPrefix = ('//').concat(myHost).concat(':').concat(port);
var _ = require('lodash');
module.exports = {
    listAllProductionItems: listAllProductionItems,
    getProductionItem: getProductionItem,
    createProductionItem: createProductionItem,
    updateProductionItem: updateProductionItem,
    deleteProductionItem: deleteProductionItem
};

function listAllProductionItems(req, res) {
    productionItemDao.listAllProductionItems({ isDeleted: false }, cb);
    function cb(err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        var pi = result;
        _.forEach(pi, function (p) {
            p._doc.imgUrlFull = urlPrefix.concat(p.imgUrl);
        });
        res.status(200).send(pi);
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

    productionItemDao.readProductionItem({ _id: productionItemId, isDeleted: false }, cb);

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
        var pi = result;
        pi._doc.imgUrlFull = urlPrefix.concat(pi.imgUrl);
        res.status(200).send(pi);
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
        name: req.body.name,
        description: req.body.description || ""
    };
    productionItemDao.createProductionItem(piInfo, cb);
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

    productionItemDao.updateProductionItem(productionsItemId, piInfo, cb);
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


    productionItemDao.updateProductionItem(productionItemId, { isDeleted: true, deleteDate: new Date }, cb);

    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(result);
    }
}