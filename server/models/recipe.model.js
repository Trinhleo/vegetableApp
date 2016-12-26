'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RecipeSchema = new Schema({
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
    productionItem: {
        type: Schema.ObjectId,
        ref: 'ProductionItem'
    },
    wateringRate: {
        type: Number
    },
    fertilizer: [{
        name: {
            type: Schema.ObjectId,
            ref: 'Fertilizer'
        },
        quantity: {
            type: Number,
            default: 0
        }
    }],
    time: {
        type: Number,
        default: 0
    },
    productRate: {
        type: Number,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now
    },
    isEdited: {
        type: Date,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deleteDate: {
        type: Date
    }
});

RecipeSchema.index({ "name": 1, "type": 1 }, { unique: true });
mongoose.model('Recipe', RecipeSchema);
