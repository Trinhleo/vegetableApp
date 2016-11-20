var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var SeasonStatedSchema = new Schema({
    garden: {
        type: Schema.ObjectId,
        ref: 'Garden',
        require: true
    },
    season: {
        type: Schema.ObjectId,
        ref: 'Season',
        require: true
    },
});
mongoose.model('SeasonStated', SeasonStatedSchema);
