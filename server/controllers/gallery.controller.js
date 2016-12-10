var galleryDao = require('./../dao/gallery.dao');
var multer = require('multer');
var path = require('path');
var fs = require('fs-extra');

var myIp = require('ip').address() || '127.0.0.1';
var myHost = require('./../config/server').HOST;
var port = require('./../config/server').PORT;
var urlPrefix = ('//').concat(myHost).concat(':').concat(port);

const fileField = 'myfile';
const galleryPath = './public/gallery/';
const galleryPathUrl = '/gallery/';
const maxImgFileSize = 1024 * 1024;

module.exports = {
    getAllImages: getAllImages,
    getAllImagesByGardenId: getAllImagesByGardenId,
    getAllImagesByUserId: getAllImagesByUserId,
    createImage: createImage,
    updateImage: updateImage,
    deleteImage: deleteImage
};

function getAllImages(req, res) {
    var id = req.decoded._id;
    galleryDao.listImages({
        isDeleted: false
    }, function (err, result) {
        if (err) {
            res.status(500).send('internal error!');
        } else {
            for (var x in result) {
                result[x].imgUrl = req.protocol.concat(urlPrefix).concat(result[x].imgUrl);
            };
            res.status(200).send(result);
        }
    });
};

function getAllImagesByGardenId(req, res) {
    var gardenId = req.params.gardenId;
    galleryDao.listImages({
        garden: gardenId,
        isDeleted: false
    }, function (err, result) {
        if (err) {
            return res.status(500).send('internal error!');
        };
        for (var x in result) {
            result[x].imgUrl = urlPrefix.concat(result[x].imgUrl);
        };
        res.status(200).send(result);
    });
};

function getAllImagesByUserId(req, res) {
    var id = req.decoded._id;
    galleryDao.listImages({
        user: id,
        isDeleted: false
    }, function (err, result) {
        if (err) {
            res.status(500).send('internal error!');
        } else {
            for (var x in result) {
                result[x].imgUrl = req.protocol.concat(urlPrefix).concat(result[x].imgUrl);
            };
            res.status(200).send(result);
        }
    });
};


function createImage(req, res) {
    console.log('im here');
    var gardenId = req.params.id;
    var id = req.decoded._id;
    var dir = galleryPath + id;
    var imgUrl = galleryPathUrl + id;
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, dir);
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
    })
    var upload = multer({
        storage: storage,
        limits: { fileSize: maxImgFileSize }
    }).single(fileField);
    // make dir and upload
    fs.mkdirs(dir, function (err) {
        if (err) {
            return res.status(500).send('cannot make dir!');
        };
        upload(req, res, function (uploadError) {
            if (!req.file) {
                return res.status(403).send("file not found or file is more large!");
            };
            if (req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/gif') {
                return res.status(403).send("not image format!");
            };
            if (uploadError) {
                console.log(uploadError);
                return res.status(400).send({
                    message: 'error in uploading'
                });
            };
            var image = {
                user: id,
                name: req.body.name,
                garden: req.body.gardenId,
                imgUrl: imgUrl + "/" + req.file.filename
            };
            if (gardenId) {
                image.garden = gardenId;
            };
            galleryDao.createImage(image, function (err, result) {
                console.log(result);
                if (err || null === result) {
                    console.log(err);
                    return res.status(400).send();
                }
                res.status(200).send({
                    imgUrl: result.imgUrl
                });

            });
        });
    })
};

function updateImage(req, res) {

};

function deleteImage(req, res) {
    console.log(req);
    galleryDao.deleteImage(req.params.id, function (err, result) {
        if (err) {
            return res.status(500).send(err);
        };
        if (null === result) {
            return res.status(403).send("image not found!");
        };
        res.status(200).send("image is deleted!");
    });
};
