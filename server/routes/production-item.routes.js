var router = require('express').Router();
var productionItemController = require('../controllers/production-item.controller.js');
var authMiddlewares = require('../middlewares/authentication.js');
module.exports = function () {
    // User Routes
    router.get('/', productionItemController.listAllproductionItems);
    router.post('/', authMiddleware.authentication, authMiddlewares.hasRole, productionItemController.createProductionsItem);
    router.get('/:productionItemId', productionItemController.getProductionItem);
    router.put('/:productionItemId', authMiddleware.authentication, authMiddlewares.hasRole, productionItemController.updateProductionItem);
    router.delete('/:productionItemId', authMiddleware.authentication, authMiddlewares.hasRole, productionItemController.deleteProductionItem);
    return router;
};