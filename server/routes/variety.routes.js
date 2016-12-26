var router = require('express').Router();
var VarietyController = require('../controllers/Variety.controller.js');
var authMiddlewares = require('../middlewares/authentication.js');
module.exports = function () {
    // User Routes
    router.get('/', VarietyController.listAllVarieties);
    router.post('/', authMiddlewares.authentication, authMiddlewares.isAdmin, VarietyController.createVariety);
    router.get('/:varietyId', VarietyController.getVariety);
    router.put('/:varietyId', authMiddlewares.authentication, authMiddlewares.isAdmin, VarietyController.updateVariety);
    router.delete('/:varietyId', authMiddlewares.authentication, authMiddlewares.isAdmin, VarietyController.deleteVariety);
    return router;
};