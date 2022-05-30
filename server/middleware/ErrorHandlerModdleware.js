const ApiError = require('../error/ApiError')

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        res.status(404).json({message: err.message})
        return 0
    }
    res.status(500).json({message: 'Unexpected error'})
    return 0
}