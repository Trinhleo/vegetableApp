
module.exports.errorHandler = function () {
    return function (err, req, res, next) {
        console.log(err);
        if (err) {
            res.status(err.statusCode || 500).send({
                message: 'internal error!'
            });
        }
    };
};