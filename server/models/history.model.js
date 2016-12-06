'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var HistorySchema = new Schema({
    apiKey: {
        type: String
    },
    temperature: {
        type: Number
    },
    humidity: {
        type: Number
    },
    created: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deleteDate: {
        type: Date
    }
});

mongoose.model('History', HistorySchema);
