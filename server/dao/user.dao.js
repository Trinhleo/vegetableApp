
var mongoose = require('mongoose');
require('../models/user.model.js');
var User = mongoose.model('User');

module.exports = {
    listAllUsers: listAllUsers,
    readUserById: readUserById,
    readUser: readUser,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser
};

function listAllUsers(callback) {
    User.find({}, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function readUserById(id, callback) {
    User.findById(id, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function readUser(user, callback) {
    // find the user
    User.findOne({
        username: user.username
    }, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function createUser(creditial, callback) {
    var user = new User(creditial);

    user.save(function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });

}

function updateUser(id, creditial, callback) {

    User.findByIdAndUpdate(id, creditial, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, true);
    });
}

function deleteUser(id, callback) {
    User.findByIdAndRemove(id, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, true);
    });
}