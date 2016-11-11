var userDao = require('./../dao/user.dao');
module.exports = {
    me: getMyUserInfo,
    userInfo: getUserInfo,
    updateProfile: updateProfile,
    changePictureProfile: changePictureProfile
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
            displayName: result.displayName,
            creationDate: result.creationDate,
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
            return res.status(400).send();
        }
        console.log("change avatar", result);
        res.status(200).send({ profileImageURL: req.profileImageURL });

    });
    //     });
    // });
}