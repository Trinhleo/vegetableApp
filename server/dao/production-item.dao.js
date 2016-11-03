
var mongoose = require('mongoose');
require('../models/productionItem.model.js');
var ProductionItem = mongoose.model('ProductionItem');

module.exports = {
    listAllProductionItems: listAllProductionItems,
    readProductionItemById: readProductionItemById,
    readProductionItem: readProductionItem,
    createProductionItem: createProductionItem,
    updateProductionItem: updateProductionItem,
    deleteProductionItem: deleteProductionItem
};

function listAllProductionItems(callback) {
    ProductionItem.find({}, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function readProductionItemById(id, callback) {
    ProductionItem.findById(id, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function readProductionItem(productionItem, callback) {
    ProductionItem.findOne({
        name: productionItem.name
    }, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function createProductionItem(info, callback) {
    var productionItem = new productionItem(info);

    productionItem.save(function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });

}

function updateProductionItem(id, info, callback) {

    productionItem.findByIdAndUpdate(id, info, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, true);
    });
}

function deleteProductionItem(id, callback) {
    productionItem.findByIdAndRemove(id, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, true);
    });
}