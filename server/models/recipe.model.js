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
    wateringRate: {
        type: Number
    },
    fertilizeringRate: {
        type: Number
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
    }
});

RecipeSchema.index({ "name": 1, "type": 1 }, { unique: true });
mongoose.model('Recipe', RecipeSchema);
