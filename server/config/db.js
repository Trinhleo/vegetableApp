var mongoose = require('mongoose');
var url = 'mongodb://127.0.0.1:27017/vuonrau-dev';
module.exports = {
    init: init
};

function init() {
    mongoose.connect(url); // connect to database
}