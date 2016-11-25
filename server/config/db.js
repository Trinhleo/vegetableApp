var mongoose = require('mongoose');
var url = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/vegetable-dev';
module.exports = {
    init: init
};

function init() {
    mongoose.connect(url); // connect to database
}