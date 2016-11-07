'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Vegetablecat Schema
 */
var ProductionItemSchema = new Schema({
    name: {
        type: String,
        default: true,
        trim: true,
        unique: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    edited: {
        type: Date,
    },
    deleted: {
        type: Date
    },
    imgUrl: {
        type: String,
        default: '/img/production-item/no-images.png'
    }
});

mongoose.model('ProductionItem', ProductionItemSchema);
