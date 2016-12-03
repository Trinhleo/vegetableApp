var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Task = new Schema({
    name: {
        type: String,
        default: '',
        required: true,
        trim: true,
        unique: true
    },
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
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    seedQuantity: {
        type: Number,
        default: 0,
        max: 10000
    },
    fertilizering: [{
        type: Schema.ObjectId,
        ref: 'Fertilizering'
    }],
    watering: [{
        type: Schema.ObjectId,
        ref: 'Watering'
    }],
    quantity: {
        type: Number,
        default: 0
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
Task.index({ "name": 1 }, { unique: true });
mongoose.model('Task', Task);
