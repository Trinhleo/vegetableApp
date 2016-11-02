
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
    approved: {
        type: Boolean,
        default: false
    },
    imgUrl: {
        type: String,
        default: '/img/gardens/no-images.png'
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
    }
});

GardenSchema.index({ location: '2dsphere' });
mongoose.model('Garden', GardenSchema);
