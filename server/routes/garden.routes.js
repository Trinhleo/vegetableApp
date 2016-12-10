var router = require('express').Router();
var gardenController = require('../controllers/garden.controller.js');
var seasonController = require('../controllers/season.controller.js');
var galleryController = require('../controllers/gallery.controller.js');

var authMiddlewares = require('../middlewares/authentication.js');
module.exports = function () {
    // User Routes
    router.get('/', authMiddlewares.authentication, authMiddlewares.isAdmin, gardenController.listAllGardens);
    router.get('/approved', gardenController.listAllGardensApproved);
    router.get('/un-approved', authMiddlewares.authentication, authMiddlewares.isAdmin, gardenController.listAllGardensUnApproved);
    router.get('/my-gardens', authMiddlewares.authentication, gardenController.listMyGardens);
    router.post('/', authMiddlewares.authentication, gardenController.createGarden);
    router.get('/:gardenId', gardenController.getGarden);
    router.get('/:gardenId/approve', authMiddlewares.authentication, authMiddlewares.isAdmin, gardenController.approve);
    router.get('/:gardenId/un-approve', authMiddlewares.authentication, authMiddlewares.isAdmin, gardenController.unApprove);
    router.get('/:gardenId/seasons', seasonController.listAllSeasonsOfGarden);
    router.get('/:gardenId/images', galleryController.getAllImagesByGardenId);
    router.put('/:gardenId', authMiddlewares.authentication, gardenController.updateGarden);
    router.delete('/:gardenId', authMiddlewares.authentication, gardenController.deleteGarden);
    return router;
};