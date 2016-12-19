var userDao = require('./../dao/user.dao');
var myIp = require('ip').address();
var myHost = require('./../config/server').HOST;
var port = require('./../config/server').PORT;
var urlPrefix = ('//').concat(myHost).concat(':').concat(port);
var cryptoPasswordUtil = require('./../util/crypto-password.util');
module.exports = {
    me: getMyUserInfo,
    userInfo: getUserInfo,
    updateProfile: updateProfile,
    changePictureProfile: changePictureProfile,
    changePassword: changePassword
};

function getMyUserInfo(req, res) {
    var id = req.decoded._id;
    userDao.readUserById(id, function (err, result) {
        console.log(result);
        if (err || null === result) {
            console.log(err);
            return res.status(400).send();
        }
        var userInfo = {
            _id: result._id,
            firstName: result.firstName,
            lastName: result.lastName,
            displayName: result.displayName,
            email: result.email,
            creationDate: result.creationDate,
            profileImageURLFull: urlPrefix.concat(result.profileImageURL),
            profileImageURL: result.profileImageURL
        };
        res.status(200).send(userInfo);
    });
};

function getUserInfo(req, res) {
    var userId = req.params.userId;
    if (!userId) {
        return res.status(400).send("not found");
    }
    userDao.readUserById(userId, function (err, result) {
        console.log(result);
        if (err || null === result) {
            console.log(err);
            return res.status(400).send("user not found");
        }
        var userInfo = {
            _id: result._id,
            firstName: result.firstName,
            lastName: result.lastName,
            displayName: result.displayName,
            creationDate: result.creationDate,
            profileImageURLFull: urlPrefix.concat(result.profileImageURL),
            profileImageURL: result.profileImageURL
        };
        res.status(200).send(userInfo);
    });
}

function updateProfile(req, res) {
    var id = req.decoded._id;
    userDao.updateUser(id, req.body, function (err, result) {
        console.log(result);
        if (err || null === result) {
            console.log(err);
            res.status(400).send();
        } else {
            console.log(result);
            res.status(200).send("success");
        }
    });
}

function changePictureProfile(req, res) {
    var id = req.decoded._id;
    var user = {
        profileImageURL: req.profileImageURL
    };

    userDao.updateUser(id, user, function (err, result) {
        console.log(result);
        if (err) {
            console.log(err);
            return res.status(400).send(
                {
                    errMsg : "Lỗi hệ thống"
                }
            );
        }
        console.log("change avatar", result);
        res.status(200).send({
            profileImageURL: req.profileImageURL,
            profileImageURLFull: urlPrefix.concat(result.profileImageURL),
        });

    });
    //     });
    // });
}

function changePassword(req, res) {
    userId = req.decoded._id;
    if (!req.body.oldPassword || !req.body.newPassword) {
           return res.status(400).send({
                errCode: 0,
                errMsg: "Mật khẩu cũ và mật khẩu mới là bắt buộc!"
            });
    }
    userDao.readUserById(userId, cb);
    function cb(err, result) {
        if (err) {
               return res.status(400).send({
                errCode: 0,
                errMsg: "Không tìm thấy người dùng này!"
            });
        }
        var hashedPassword = cryptoPasswordUtil.cryptoPassword(req.body.oldPassword);

        if (result.password !== hashedPassword) {
            return res.status(400).send({
                errCode: 0,
                errMsg: "Mật khẩu cũ không khớp!"
            });
        }
        if (req.body.oldPassword === req.body.newPassword) {
            return res.status(400).send({
                errCode: 0,
                errMsg: "Mật khẩu mới phải khác mật khẩu cũ!"
            });
        }
        var hashedNewPassword = cryptoPasswordUtil.cryptoPassword(req.body.newPassword);
        userDao.updateUser(userId, { password: hashedNewPassword }, function (error, result) {
            if (err) {
                return res.status(500).send({
                    errCode: 0,
                    errMsg: "Lỗi hệ thống"
                });
            }
            res.status(200).send("Đổi mật khẩu thành công!");
        })
    }
}