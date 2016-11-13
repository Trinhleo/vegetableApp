var router = require('express').Router();
var productionItemController = require('../controllers/production-item.controller.js');
var authMiddlewares = require('../middlewares/authentication.js');
module.exports = function () {
    // User Routes
    router.get('/', productionItemController.listAllProductionItems);
    router.post('/', authMiddlewares.authentication, authMiddlewares.isAdmin, productionItemController.createProductionItem);
    router.get('/:productionItemId', productionItemController.getProductionItem);
    router.put('/:productionItemId', authMiddlewares.authentication, authMiddlewares.isAdmin, productionItemController.updateProductionItem);
    router.delete('/:productionItemId', authMiddlewares.authentication, authMiddlewares.isAdmin, productionItemController.deleteProductionItem);
    return router;
};