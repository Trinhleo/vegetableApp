'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Vegetablecat Schema
 */
var PriceSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true,
        unique: true
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
    },
    unitPrice:{
        type: Number,
        default: 0
    }
});
PriceSchema.index({ "name": 1}, { unique: true });
mongoose.model('Price', PriceSchema);
