
var mongoose = require('mongoose');
require('../models/device-node.model.js');
var DeviceNode = mongoose.model('DeviceNode');

module.exports = {
    listAllDeviceNodes: listAllDeviceNodes,
    readDeviceNodeById: readDeviceNodeById,
    readDeviceNode: readDeviceNode,
    createDeviceNode: createDeviceNode,
    updateDeviceNode: updateDeviceNode,
    deleteDeviceNode: deleteDeviceNode
};

function listAllDeviceNodes(query,callback) {
    DeviceNode.find(query, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function readDeviceNodeById(id, callback) {
    DeviceNode.findById(id, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function readDeviceNode(query, callback) {
    DeviceNode.findOne(query, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function createDeviceNode(info, callback) {
    var deviceNode = new DeviceNode(info);

    deviceNode.save(function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });

}

function updateDeviceNode(id, info, callback) {

    DeviceNode.findByIdAndUpdate(id, info, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, true);
    });
}

function deleteDeviceNode(id, callback) {
    DeviceNode.findByIdAndRemove(id, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, true);
    });
}