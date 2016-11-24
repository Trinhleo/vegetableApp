'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaskCategorySchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true,
        unique: true,
        require: true
    },
    description: {
        type: String,
        default: ''
    },
    created: {
        type: Date,
        default: Date.now
    },
    isEdited: {
        type: Date,
    },
    isDeleted: {
        type: Date
    },
    imgUrl: {
        type: String,
        default: '/img/production-item/no-image.svg'
    },
    type: {
        type: Number,
        require: true
    }
});

TaskCategorySchema.index({ "name": 1, "type": 1 }, { unique: true });
mongoose.model('TaskCategory', TaskCategorySchema);
