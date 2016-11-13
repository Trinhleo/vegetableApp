'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Vegetablecat Schema
 */
var ProductionItemSchema = new Schema({
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
