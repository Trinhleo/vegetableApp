const fileField = 'myfile';
const profileImgPath = './uploads/profile/';
const hostName = 'http://localhost:';
const port = 3000;
const profileImgPathUrl = '/profile/';
const maxImgFileSize = 1024 * 1024;

var multer = require('multer');
var path = require('path');
var fs = require('fs-extra');

module.exports = {
    uploadSingle: uploadSingle
};

function uploadSingle(req, res, next) {
    var id = req.decoded._id;
    var dir = profileImgPath + id;
    var imgUrl = profileImgPathUrl + id;
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, dir);
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
    });

    var upload = multer({
        storage: storage,
        limits: { fileSize: maxImgFileSize }
    }).single(fileField);

    // make dir and upload
    fs.mkdirs(dir, function (err) {
        if (err) {
            return res.status(500).send('cannot make dir!');
        }
        upload(req, res, function (uploadError) {
            console.log(req.file);
            if (!req.file) {
                return res.status(403).send("file not found or file is more large!");
            }

            if (req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/gif') {
                return res.status(403).send("not image format!");
            }

            if (uploadError) {
                console.log(uploadError);
                return res.status(400).send({
                    message: 'error in uploading /n' + uploadError
                });
            }

            req.profileImageURL = imgUrl + "/" + req.file.filename;
            console.log(req);
            next();
        });
    });
}