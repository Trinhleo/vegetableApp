var DeviceNodeDao = require('./../dao/device-node.dao');
module.exports = {
    listAllDeviceNodes: listAllDeviceNodes,
    getDeviceNode: getDeviceNode,
    createDeviceNode: createDeviceNode,
    updateDeviceNode: updateDeviceNode,
    deleteDeviceNode: deleteDeviceNode
};

function listAllDeviceNodes(req, res) {
    DeviceNodeDao.listAllDeviceNodes(cb);
    function cb(err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    }
}

function getDeviceNode(req, res) {
    var deviceNodeId = req.params.deviceNodeId;
    if (!deviceNodeId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }

    DeviceNodeDao.readDeviceNodeById(deviceNodeId, cb);

    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(200).send(result);
    }
}


function createDeviceNode(req, res) {
    if (!req.body.name) {
        return res.status(500).send({
            errCode: 0,
            errMsg: "Lỗi nhập liệu"
        });
    }
    var pInfo = {
        name: req.body.name
    };
    DeviceNodeDao.createSeason(pInfo, cb);
    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(200).send(result);
    }
}

function updateDeviceNode(req, res) {
    var DeviceNodeId = req.params.DeviceNodeId;
    var pInfo = req.body
    if (req.decoded.roles[0].toString() !== 'admin') {
        return status(403).send({
            errCode: 1,
            errMsg: "Bạn không có quyền quản trị"
        });
    }
    if (!DeviceNodeId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }

    DeviceNodeDao.updateDeviceNodeId(DeviceNodeId, piInfo, cb);
    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(result);
    }
}

function deleteDeviceNode(req, res) {
    var DeviceNodeId = req.params.DeviceNodeId;
    if (req.decoded.roles[0].toString() !== 'admin') {
        return status(403).send({
            errCode: 1,
            errMsg: "Bạn không có quyền quản trị"
        });
    }
    if (!DeviceNodeId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }


    DeviceNodeDao.deleteDeviceNode(DeviceNodeId, cb);

    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(result);
    }
}