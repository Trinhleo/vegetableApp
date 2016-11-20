
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
/**
 * Garden Schema
 */
var GardenSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: true,
        trim: true,
        unique: true
    },
    address: {
        type: String,
        default: '',
        required: true,
        trim: true
    },
    area: {
        type: Number,
        default: 0.00,
        min: 0.00,
        max: 1000000,
        required: true,
    },
    deviceNode: {
        type: Schema.ObjectId,
        ref: 'DeviceNode'
    },
    approved: {
        type: Boolean,
        default: false
    },
    imgUrl: {
        type: String,
        default: '/img/garden/no-image.svg'
    },
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    location: {
        type: [Number], required: true
    },
    productionItem:
    [{
        type: Schema.ObjectId,
        ref: 'ProductionItem'
    }],
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

GardenSchema.index({ location: '2dsphere' });
mongoose.model('Garden', GardenSchema);
