var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var SeasonSchema = new Schema({
    product: {
        type: Schema.ObjectId,
        ref: 'ProductionItem',
        require: true
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
    quantity: {
        type: Number,
        default: 0,
        max: 10000
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deleteDate: {
        type: Date
    }
});
mongoose.model('Product', SeasonSchema);
