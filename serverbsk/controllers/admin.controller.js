var userDao = require('./../dao/user.dao');
module.exports = {
    listAllUsers: listAllUsers,
    getUser: getUser,
    updateUser: updateUser,
    deleteUser: deleteUser
};

function listAllUsers(req, res) {
    userDao.listAllUsers(cb);
    function cb(err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    }
}

function getUser(req, res) {
    var userId = req.params.userId;
    if (!userId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }

    userDao.readuserById(userId, cb);

    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        result.isOwner = userId.toString() === result.user.toString() ? true : false
        result.isAdmin = req.decoded.role[0] === 'admin' ? true : false;
        res.status(200).send(result);
    }
}

function updateUser(req, res) {
    var userId = req.params.userId;
    var userInfo = req.body
    if (!userId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }
    userDao.updateuser(userId, userInfo, cb);
    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(result);
    }
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    if (!userId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }

    userDao.deleteUser(userId, cb);

    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(result);
    }
}
