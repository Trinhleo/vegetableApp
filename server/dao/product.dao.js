
var mongoose = require('mongoose');
require('../models/Product.model.js');
var Product = mongoose.model('Season');

module.exports = {
    listAllProducts: listAllProducts,
    // readProductById: readProductById,
    // readProduct: readProduct,
    // createProduct: createProduct,
    // updateProduct: updateProduct,
    // deleteProduct: deleteProduct
};

function listAllProducts(callback) {
    Product.aggregate([
        { $match: { isDeleted: false, status: { $gt: 0 } } },
        {
            $group: {
                _id: '$productionItem',
                count: { $sum: 1 },
                productionItem: { $first: '$productionItem' }
            }
        }],
        function (err, results) {
            if (err) {
                return callback(err, null);
            }
            Product.populate(results, { "path": "productionItem" }, cb);
            function cb(error, productGroups) {
                if (error) {
                    return callback(err, null);
                }
                callback(null, productGroups);
            }
        });
}
