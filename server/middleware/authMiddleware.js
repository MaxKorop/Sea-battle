const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.decode(token, process.env.JWT_SECRET_KEY);
        req.user = user;
        next();
        return;
    } catch (error) {
        console.log(error);
    }
}