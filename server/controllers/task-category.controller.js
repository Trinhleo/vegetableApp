var TaskCategoryDao = require('./../dao/production-item.dao');
var myIp = require('ip').address();
var myHost = require('./../config/server').HOST;
var port = require('./../config/server').PORT;
var urlPrefix = ('//').concat(myHost).concat(':').concat(port);
var _ = require('lodash');
module.exports = {
    listAllTaskCategorys: listAllTaskCategorys,
    getTaskCategory: getTaskCategory,
    createTaskCategory: createTaskCategory,
    updateTaskCategory: updateTaskCategory,
    deleteTaskCategory: deleteTaskCategory
};

function listAllTaskCategorys(req, res) {
    TaskCategoryDao.listAllTaskCategorys({ isDeleted: false }, cb);
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
    var TaskCategoryId = req.params.TaskCategoryId;
    if (!TaskCategoryId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }

    TaskCategoryDao.readTaskCategory({ _id: TaskCategoryId, isDeleted: false }, cb);

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
    if (!req.body.name) {
        return res.status(500).send({
            errCode: 0,
            errMsg: "Lỗi nhập liệu"
        });
    }
    var piInfo = {
        name: req.body.name,
        description: req.body.description || ""
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
    var productionsItemId = req.params.TaskCategoryId;
    var piInfo = req.body
    if (req.decoded.roles[0].toString() !== 'admin') {
        return status(403).send({
            errCode: 1,
            errMsg: "Bạn không có quyền quản trị"
        });
    }
    if (!productionsItemId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }

    TaskCategoryDao.updateTaskCategory(productionsItemId, piInfo, cb);
    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(result);
    }
}

function deleteTaskCategory(req, res) {
    var TaskCategoryId = req.params.TaskCategoryId;
    if (req.decoded.roles[0].toString() !== 'admin') {
        return status(403).send({
            errCode: 1,
            errMsg: "Bạn không có quyền quản trị"
        });
    }
    if (!TaskCategoryId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }


    TaskCategoryDao.updateTaskCategory(TaskCategoryId, { isDeleted: true, deleteDate: new Date }, cb);

    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(result);
    }
}