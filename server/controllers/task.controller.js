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
    listMyTasks: listMyTasks,
    getTask: getTask,
    createTask: createTask,
    updateTask: updateTask,
    deleteTask: deleteTask
};

// cron.schedule('* * * * *', function () {
//     Task.find().sort('-created').populate('garden', 'name').exec(function (err, Tasks) {
//         if (err) {
//             ;
//         } else {

//             // for (var ss in Tasks) {
//             //     console.log(Tasks[ss]);
//             // }
//         }
//     });

// });
// check status realtime;
// setInterval(realtime, 1000);
// function realtime() {
//     var sse = [];
//     TaskDao.listTasks({ status: { $lt: 2 }, isDeleted: false })
//     Task.find().sort('-created').populate('garden', 'name').exec(function (err, Tasks) {
//         if (err) {
//             ;
//         } else {
//             var ss = Tasks;
//             for (var i in ss) {
//                 var dateNow = new Date();
//                 if (ss[i].startDate <= dateNow && ss[i].endDate > dateNow) {
//                     ss[i].status = 1;
//                     ss[i].save();
//                 } else if (ss[i].endDate <= dateNow) {
//                     var Task = ss[i];
//                     var seadQ = Task.seedQuantity
//                     Task.status = 2;
//                     Task.quantity = _.random(seadQ / 2, seadQ);
//                     Task.save();
//                 }
//             }
//         }
//     });
// };

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

// function listAllTasksOfGarden(req, res) {
//     var gardenId = req.params.gardenId;
//     if (!gardenId) {
//         return res.status(400).send({
//             errCode: 0,
//             errMsg: "Không tìm thấy!"
//         });
//     };
//     taskDao.listTasks({
//         garden: gardenId,
//         isDeleted: false
//     }, cb);
//     function cb(err, result) {
//         if (err) {
//             return res.status(500).send(err);
//         }
//         _.forEach(result, function (gd) {
//             var g = gd;
//             g._doc.productionItemUrl = urlPrefix.concat(g.productionItem.imgUrl);
//         });
//         res.status(200).send(result);
//     }
// }
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
        _.forEach(result, function (gd) {
            var g = gd;
            g._doc.productionItemUrl = urlPrefix.concat(g.productionItem.imgUrl);
        });
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

    if (!req.body.name || !req.body.garden || !req.body.productionItem || req.body.seedQuantity < 0) {
        return res.status(500).send({
            errCode: 0,
            errMsg: "Lỗi nhập liệu"
        });
    }
    gardenDao.readGardenById(req.body.garden, callback);
    function callback(err, result) {
        if (err) {
            return res.status(500).send({ errCode: 0, errMsg: 'Lỗi hệ thống' });
        };
        if (null === result) {
            return res.status(500).send({ errCode: 1, errMsg: 'Vườn không tồn tại' })
        };

        if (result.approved === false) {
            return res.status(400).send({ errCode: 1, errMsg: 'Vườn chưa dược duyệt' })
        };

        if (result.user._id.toString() !== userId) {
            return res.status(400).send({ errCode: 1, errMsg: 'Bạn không phải là chủ vườn    ' })
        }

        console.log('approved', res.approved);

        var taskInfo = {
            user: req.decoded._id,
            name: req.body.name,
            garden: req.body.garden,
            productionItem: req.body.productionItem,
            startDate: req.body.startDate || '',
            endDate: req.body.endDate || '',
            seedQuantity: req.body.seedQuantity
        };

        taskDao.createTask(taskInfo, cb);
        function cb(err, result) {
            if (err) {
                return res.status(400).send(err);
            }
            res.status(200).send(result);
        }
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