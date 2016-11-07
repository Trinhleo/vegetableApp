
var mongoose = require('mongoose');
require('../models/Product.model.js');
var Product = mongoose.model('Product');

module.exports = {
    listAllProducts: listAllProducts,
    readProductById: readProductById,
    readProduct: readProduct,
    createProduct: createProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct
};

function listAllProducts(callback) {
    Product.find({}, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function readProductById(id, callback) {
    Product.findById(id, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function readProduct(product, callback) {
    Product.findOne({
        name: product.name
    }, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function createProduct(info, callback) {
    var product = new Product(info);

    product.save(function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });

}

function updateProduct(id, info, callback) {

    Product.findByIdAndUpdate(id, info, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, true);
    });
}

function deleteProduct(id, callback) {
    Product.findByIdAndRemove(id, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, true);
    });
}