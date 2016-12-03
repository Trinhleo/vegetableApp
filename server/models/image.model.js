'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ImageSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    garden: {
        type: Schema.ObjectId,
        ref: 'Garden'
    },
    name: {
        type: String,
        default: '',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    imgUrl: {
        type: String,
        default: ''
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
    }
});
module.exports = mongoose.model('Image', ImageSchema);
