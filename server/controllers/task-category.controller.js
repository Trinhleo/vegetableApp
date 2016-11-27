var TaskCategoryDao = require('./../dao/task-category.dao');
var myIp = require('ip').address();
var myHost = require('./../config/server').HOST;
var port = require('./../config/server').PORT;
var urlPrefix = ('//').concat(myHost).concat(':').concat(port);
var _ = require('lodash');
module.exports = {
    listTaskCategories: listTaskCategories,
    getTaskCategory: getTaskCategory,
    createTaskCategory: createTaskCategory,
    updateTaskCategory: updateTaskCategory,
    deleteTaskCategory: deleteTaskCategory
};

function listTaskCategories(req, res) {
    TaskCategoryDao.listTaskCategories({ isDeleted: false }, cb);
    function cb(err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        var pi = result;
        _.forEach(pi, function (p) {
            p._doc.imgUrlFull = urlPrefix.concat(p.imgUrl);
        });
        res.status(200).send(pi);
    }
}

function getTaskCategory(req, res) {
    var taskCategoryId = req.params.taskCategoryId;
    if (!taskCategoryId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }

    TaskCategoryDao.readTaskCategory({ _id: taskCategoryId, isDeleted: false }, cb);

    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        if (null === result) {
            return res.status(400).send({
                errCode: 0,
                errMsg: "Không tìm thấy!"
            });
        }
        var pi = result;
        pi._doc.imgUrlFull = urlPrefix.concat(pi.imgUrl);
        res.status(200).send(pi);
    }
}


function createTaskCategory(req, res) {
    if (!req.body.name || !Number.isInteger(req.body.type) || req.body.type < 0) {
        return res.status(500).send({
            errCode: 0,
            errMsg: "Lỗi nhập liệu"
        });
    }
    var piInfo = {
        name: req.body.name,
        description: req.body.description || "",
        type: req.body.type,
    };
    TaskCategoryDao.createTaskCategory(piInfo, cb);
    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(200).send(result);
    }
}

function updateTaskCategory(req, res) {
    var taskCategoryId = req.params.taskCategoryId;
    var piInfo = req.body
    if (req.decoded.roles[0].toString() !== 'admin') {
        return status(403).send({
            errCode: 1,
            errMsg: "Bạn không có quyền quản trị"
        });
    }
    if (!taskCategoryId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }

    TaskCategoryDao.updateTaskCategory(taskCategoryId, piInfo, cb);
    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(result);
    }
}

function deleteTaskCategory(req, res) {
    var taskCategoryId = req.params.taskCategoryId;
    if (req.decoded.roles[0].toString() !== 'admin') {
        return status(403).send({
            errCode: 1,
            errMsg: "Bạn không có quyền quản trị"
        });
    }
    if (!taskCategoryId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }


    TaskCategoryDao.updateTaskCategory(taskCategoryId, { isDeleted: true, deleteDate: new Date }, cb);

    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(result);
    }
}