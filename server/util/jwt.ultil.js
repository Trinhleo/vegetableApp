'use strict';
var jwt = require('jwt-simple'); // used to create, sign, and verify tokens
const secretKey = "hnkt";
var expires = Date.now() + 86400000; // expires in 24 hours

module.exports = {
    signToken: sign,
    verifyToken: verify
};

function sign(information) {
    var token = jwt.encode({
        info: information,
        exp: expires
    }, secretKey);

    return token;
};
// code = 0 : success
// code = 1 : token false
// code = 2 : token expires
function verify(token, callback) {
    try {
        var decoded = jwt.decode(token, secretKey);
        console.log(decoded);
        console.log(new Date(decoded.exp))
    } catch (err) {
        callback(1, null);
        return;
    }
    if (Date.now() > (new Date(decoded.exp))) {
        console.log(2);
        callback(2, null);
    } else {
        console.log(0);
        callback(null, decoded.info);
    };
};

// var code = verify('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbmZvIjoidHJpbmgiLCJleHAiOjE0NzU2NDM3MzEwMTh9.iemESpWzupjFSrinsSjfPcIc4OoeRoS7UTf6AhjZAYk');
// sign("trinh");
// console.log(sign("trinh"));

