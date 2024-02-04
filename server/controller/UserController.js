const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const generateToken = ({ id, login }) => {
    return jwt.sign(
        { id, login },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '24h' }
    );
};

class UserController {
    async logIn(req, res) {
        const { login, password } = req.body;
        const user = await User.findOne({ login });
        if (!user) return res.status(400).json({ message: 'User with this login does not exists' });
        const compare = await bcrypt.compare(password, user.password);
        if (!compare) return res.status(400).json({ message: 'Incorrect login or password' });
        const token = generateToken(user);
        return res.json({ token });
    }

    async signUp(req, res) {
        const { login, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 5);
        const createdUser = await User.create({ login, password: hashedPassword });
        const token = generateToken(createdUser);
        return res.json({ token });
    }

    async getStatistic(req, res) {
        return res.json({ statistic: {} });
    }
}

module.exports = new UserController()
