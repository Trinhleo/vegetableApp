'use strict';
var mongoose = require('mongoose');
require('../models/image.model.js');
var Image = mongoose.model('Image');
module.exports = {
    listImages: listImages,
    getImageById: getImageById,
    createImage: createImage,
    updateImage: updateImage,
    deleteImage: deleteImage
};

function listImages(query, callback) {
    Image.find(query).sort('-created').exec(function (err, images) {
        if (err) {
            console.log(err);
            callback(err, null);
        } else {
            callback(null, images);
        }
    })
};

function getImageById(id, callback) {
    Image.findById(id, function (err, result) {
        if (err) {
            console.log(err);
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
};

// function readImage(id, callback) {
//     // find the image
//     User.findOne({
//         username: user.username
//     }, function (err, result) {
//         if (err) {
//             console.log(err);
//             callback(err, null);
//         } else {
//             callback(null, result);
//         }
//     })
// };

function createImage(image, callback) {
    console.log(image);
    var img = new Image(image);
    img.save(function (err, result) {
        if (err) {
            console.log(err);
            callback(err, null);
        } else {
            callback(null, result);
        }
    });

};
function updateImage(id, image, callback) {
    console.log(image);
    Image.findByIdAndUpdate(id, function (err, result) {
        if (err || null === result) {
            console.log(err);
            return callback(err, null);
        };
        return callback(null, result)
    })

};

function deleteImage(id, callback) {
    Image.findByIdAndDelete(id, function (err, image) {
        if (err) {
            return callback(err, null);
        }
        return callback(null, image)
    })
};