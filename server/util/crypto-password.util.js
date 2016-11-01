'use strict';
var crypto = require('crypto');
var cryptoAlgorithm = sha512;
const salt = 'secret';

module.exports = {
    cryptoPassword: saltHashPassword
};

function saltHashPassword(userpassword) {
    var passwordData = cryptoAlgorithm(userpassword);
    console.log('Passwordhash = ' + passwordData.passwordHash);
    return passwordData.passwordHash;
};

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
function genRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0, length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
function sha512(password) {
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        passwordHash: value
    };
};