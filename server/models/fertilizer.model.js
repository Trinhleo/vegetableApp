'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Vegetablecat Schema
 */
var FertilizerSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true,
        unique: true
    },
    unitPrice: {
        type: Number,
        default: 0
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
    imgUrl: {
        type: String,
        default: '/img/production-item/no-image.svg'
    }
});
FertilizerSchema.index({ "name": 1}, { unique: true });
mongoose.model('Fertilizer', FertilizerSchema);
