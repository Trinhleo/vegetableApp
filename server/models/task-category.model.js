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
    imgUrl: {
        type: String,
        default: '/img/task-category/no-image.svg'
    },
    type: {
        type: Number,
        require: true,
        unique: true
    }
});

    TaskCategorySchema.index({ "name": 1, "type": 1 }, { unique: true });
mongoose.model('TaskCategory', TaskCategorySchema);
