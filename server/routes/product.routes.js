var router = require('express').Router();
var productController = require('../controllers/product.controller.js');
var authMiddlewares = require('../middlewares/authentication.js');
module.exports = function () {
    router.get('/', productController.listAllProducts);
    router.get('/:groupId', productController.listAllProductsByGroupId);
    return router;
};