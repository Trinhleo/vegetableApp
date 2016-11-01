var userDao = require('./../dao/user.dao');
var cryptoPasswordUtil = require('./../util/crypto-password.util');
var jwt = require('./../util/jwt.util');

module.exports = {
    signup: signup,
    signin: signin,
    signout: signout
};

function signin(req, res) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({
            message: "error input information!"
        });
    }
    var hashedpassword = cryptoPasswordUtil.cryptoPassword(req.body.password);
    var user = {
        username: req.body.username,
        password: hashedpassword
    };

    userDao.readUser(user, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send({
                message: "internal error"
            });
        }
        if (result && user.password === result.password) {
            var token_info = {
                _id: result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                displayName: result.displayName,
                roles: result.roles,
                email: result.email,
                createtionDate: result.createtionDate
            };
            var token = jwt.signToken(token_info);

            res.status(200).send({
                userInfo: token_info,
                access_token: token
            });
        } else {
            res.status(400).send({
                message: "username or password is false!"
            });
        }
    });
}

function signup(req, res) {
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.username || !req.body.password) {
        return res.status(403).send({
            message: "error input information!"
        });
    }
    var hashedpassword = cryptoPasswordUtil.cryptoPassword(req.body.password);
    var userInfo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        displayName: req.body.firstName + req.body.lastName,
        username: req.body.username,
        password: hashedpassword,
        email: req.body.email
    }
    userDao.readUser(userInfo, function (err, result) {
        if (err) {
            return res.status(500).send({
                message: "internal error"
            })
        };
        if (null !== result) {
            return res.status(400).send("user is existed!");
        }

        userDao.createUser(userInfo, function (err, result) {
            if (err) {
                return res.status(400).send({
                    errorcode: err.code,
                    errorms: err.errmsg
                });
            }
            var userInfoToSend = {
                _id: result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                displayName: result.displayName,
                email: result.email,
                createtionDate: result.createtionDate
            };
            res.status(200).send(userInfoToSend);
        });
    });
}

function signout(req, res) {
    res.status(200).send("signed out");
}