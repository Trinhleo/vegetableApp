
var mongoose = require('mongoose');
require('../models/production-item.model.js');
var ProductionItem = mongoose.model('ProductionItem');

module.exports = {
    listAllProductionItems: listAllProductionItems,
    readProductionItemById: readProductionItemById,
    readProductionItem: readProductionItem,
    createProductionItem: createProductionItem,
    updateProductionItem: updateProductionItem,
    deleteProductionItem: deleteProductionItem
};

function listAllProductionItems(query,callback) {
    ProductionItem.find(query, function (err, result) {
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

function readProductionItem(query, callback) {
    ProductionItem.findOne(query, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function createProductionItem(info, callback) {
    var productionItem = new ProductionItem(info);

    productionItem.save(function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });

}

function updateProductionItem(id, info, callback) {

    ProductionItem.findByIdAndUpdate(id, info, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, true);
    });
}

function deleteProductionItem(id, callback) {
    ProductionItem.findByIdAndRemove(id, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, true);
    });
}