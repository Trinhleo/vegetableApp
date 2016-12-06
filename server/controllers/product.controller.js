var productDao = require('./../dao/product.dao');
var seasonDao = require('../dao/season.dao');
var myIp = require('ip').address() || '127.0.0.1';
var myHost = require('./../config/server').HOST;
var port = require('./../config/server').PORT;
var urlPrefix = ('//').concat(myHost).concat(':').concat(port);
var _ = require('lodash');
module.exports = {
    listAllProducts: listAllProducts,
    listAllProductsByGroupId: listAllProductsByGroupId,
};

function listAllProducts(req, res) {
    productDao.listAllProducts(cb);
    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        var pi = result;
        _.forEach(pi, function (p) {
            p.imgUrlFull = urlPrefix.concat(p.productionItem.imgUrl);
        });
        res.status(200).send(pi);
    }
};
function listAllProductsByGroupId(req, res) {
    var groupId = req.params.groupId;
    if (!groupId) {
        return res.status(400).send({
            errMsg: "Không tìm thấy"
        });
    }
    seasonDao.listSeasons({ productionItem: groupId, isDeleted: false }, cb);
    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        _.forEach(result, function (gd) {
            var g = gd;
            g._doc.productionItemUrl = urlPrefix.concat(g.productionItem.imgUrl);
        });
        res.status(200).send(result);
    }
};
