var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var SeasonSchema = new Schema({
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
    garden: {
        type: Schema.ObjectId,
        ref: 'Garden',
        require: true
    },
    status: {
        type: Number,
        default: 0
    },
    productionItem: {
        type: Schema.ObjectId,
        ref: 'ProductionItem',
        require: true
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
mongoose.model('Season', SeasonSchema);
