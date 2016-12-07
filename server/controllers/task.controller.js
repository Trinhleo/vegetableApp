var taskDao = require('./../dao/Task.dao');
var gardenDao = require('./../dao/garden.dao'); var myIp = require('ip').address() || '127.0.0.1';
var myHost = require('./../config/server').HOST;
var port = require('./../config/server').PORT;
var urlPrefix = ('//').concat(myHost).concat(':').concat(port);
var cron = require('node-cron');
var _ = require('lodash');
module.exports = {
    listAllTasks: listAllTasks,
    // listAllTasksOfGarden: listAllTasksOfGarden,
    listAllTasksOfSeason: listAllTasksOfSeason,
    listAllTasksOfSeasonDone: listAllTasksOfSeasonDone,
    listAllTasksOfSeasonUnDone: listAllTasksOfSeasonUnDone,
    listMyTasks: listMyTasks,
    getTask: getTask,
    createTask: createTask,
    updateTask: updateTask,
    deleteTask: deleteTask
};

function listAllTasks(req, res) {
    taskDao.listTasks({ isDeleted: false }, cb);
    function cb(err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        _.forEach(result, function (gd) {
            var g = gd;
            g._doc.productionItemUrl = urlPrefix.concat(g.productionItem.imgUrl);
        });
        res.status(200).send(result);
    }
}

function listAllTasksOfSeason(req, res) {
    var seasonId = req.params.seasonId;
    if (!seasonId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    };
    taskDao.listTasks({
        season: seasonId,
        isDeleted: false
    }, cb);
    function cb(err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        // _.forEach(result, function (gd) {
        //     var g = gd;
        //     g._doc.productionItemUrl = urlPrefix.concat(g.productionItem.imgUrl);
        // });
        res.status(200).send(result);
    }
}
function listAllTasksOfSeasonDone(req, res) {
    var seasonId = req.params.seasonId;
    if (!seasonId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    };
    taskDao.listTasks({
        season: seasonId,
        isDeleted: false,
        status: 1
    }, cb);
    function cb(err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        // _.forEach(result, function (gd) {
        //     var g = gd;
        //     g._doc.productionItemUrl = urlPrefix.concat(g.productionItem.imgUrl);
        // });
        res.status(200).send(result);
    }
}
function listAllTasksOfSeasonUnDone(req, res) {
    var seasonId = req.params.seasonId;
    if (!seasonId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    };
    taskDao.listTasks({
        season: seasonId,
        isDeleted: false,
        status: 0
    }, cb);
    function cb(err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        // _.forEach(result, function (gd) {
        //     var g = gd;
        //     g._doc.productionItemUrl = urlPrefix.concat(g.productionItem.imgUrl);
        // });
        res.status(200).send(result);
    }
}
function listMyTasks(req, res) {
    taskDao.listTasks({ user: req.decoded._id, isDeleted: false }, cb);
    function cb(err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    }
}

function getTask(req, res) {
    var userId = req.decoded ? req.decoded._id : '';
    var taskId = req.params.taskId;
    if (!taskId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }
    taskDao.readTaskById(taskId, cb);

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
        result._doc.productionItemUrl = urlPrefix.concat(result.productionItem.imgUrl);
        // result._doc.isOwner = userId.toString() === result.user.toString() ? true : false
        // result._doc.isAdmin = req.decoded.role[0] === 'admin' ? true : false;
        res.status(200).send(result);
    }
}


function createTask(req, res) {
    var userId = req.decoded._id;
   

    if (!req.body.type || !req.body.date || !req.body.season) {
        return res.status(500).send({
            errCode: 0,
            errMsg: "Lỗi nhập liệu"
        });
    }
    var taskInfo = {
        user: userId,
        season: req.body.season,
        type: req.body.type,
        date: req.body.date
    };

    taskDao.createTask(taskInfo, cb);
    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(200).send(result);
    }
}

function updateTask(req, res) {
    var userId = req.decoded._id;
    var taskId = req.params.taskId;
    var taskInfo = req.body
    if (!taskId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }

    taskDao.readTask({
        user: userId,
        _id: taskId
    }, function (err, task) {
        if (err || !task) {
            return res.status(400).send({
                errCode: 1,
                errMsg: "Bạn không phải là chủ mùa vụ!"
            });
        }

        taskDao.updateTask(taskId, taskInfo, cb);
        function cb(err, result) {
            if (err) {
                return res.status(400).send(err);
            }

            res.status(200).send(result);
        }
    })
}

function deleteTask(req, res) {
    var taskId = req.params.taskId;
    var userId = req.decoded._id;
    if (!taskId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }

    taskDao.readTask({
        _id: taskId,
        user: userId
    }, function (err, result) {
        if (err || !result) {
            return res.status(400).send({
                errCode: 1,
                errMsg: "Bạn không phải là chủ mùa vụ!"
            });
        }
        taskDao.updateTask(taskId, { isDeleted: true, deleteDate: new Date() });

        function cb(err, result) {
            if (err) {
                return res.status(400).send(err);
            }

            res.status(200).send(result);
        }
    });
}