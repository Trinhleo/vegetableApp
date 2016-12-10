var router = require('express').Router();
var galleryController = require('../controllers/gallery.controller.js');
var authMiddleware = require('../middlewares/authentication.js');
module.exports = function () {
    router.get('/images', authMiddleware.authentication, galleryController.getAllImages);
    router.get('/:id/images', authMiddleware.authentication, galleryController.getAllImagesByUserId);
    router.post('/images', authMiddleware.authentication, galleryController.createImage);
    router.put('/images/:id', authMiddleware.authentication, galleryController.updateImage);
    router.delete('/images/:id', authMiddleware.authentication, galleryController.deleteImage);
    return router;
};