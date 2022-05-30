const jwt = require('jsonwebtoken')
const {isNull} = require("underscore");

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
            res.status(401).json({message: "authMiddleware error: User is not authorized"})
            return 0
        }
        req.user = jwt.verify(token, process.env.SECRET_KEY)
        next()

    } catch (e) {
        res.status(401).json({message: "authMiddleware error: User is not authorized"})
    }
}