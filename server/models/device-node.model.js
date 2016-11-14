var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var DeviceNodeSchema = new Schema({
    name: {
        type: String,
        default: 'Dht11',
    },
    apiKey: {
        type: String,
        default: 'a-42o0m3-wlsfrvc7mh'
    },
    apiToken: {
        type: String,
        default: '@EUwdjdw*jNU6H@fXm'
    },
    type: {
        type: Number,
        default: 0
    },
    created:{
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deleteDate: {
        type: Date
    },
    isEdited: {
        type: Boolean,
        default: false
    },
    editDate: {
        type: Date
    },
    description: {
        type: String,
        default: ''
    }
});
mongoose.model('DeviceNode', DeviceNodeSchema);
