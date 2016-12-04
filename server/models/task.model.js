var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Task = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    },
    season: {
        type: Schema.ObjectId,
        ref: 'Season',
        require: true
    },
    status: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        required: true
    },
    type: {
        type: Schema.ObjectId,
        required: true
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
mongoose.model('Task', Task);
