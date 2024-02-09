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
    async signUp(req, res) {
        try {
            const { login, password } = req.body;
            const user = await User.findOne({ login });
            if (user) return res.json({ message: 'User with this login already exists' });
            const hashedPassword = await bcrypt.hash(password, 5);
            const createdUser = await User.create({ login, password: hashedPassword });
            const token = generateToken(createdUser);
            return res.json({ token });
        } catch (error) {
            console.log(error)
            return res.status(500);
        }
    }
    
    async logIn(req, res) {
        try {
            const { login, password } = req.body;
            const user = await User.findOne({ login });
            if (!user) return res.json({ message: 'User with this login does not exists' });
            const compare = await bcrypt.compare(password, user.password);
            if (!compare) return res.json({ message: 'Incorrect login or password' });
            const token = generateToken(user);
            return res.json({ token });
        } catch (error) {
            console.log(error)
            return res.status(500);
        }
    }

    async getStatistic(req, res) {
        try {
            const { login } = req.user;
            const user = await User.findOne({ login });
            return res.json({ statistic: user.statistic });
        } catch (error) {
            console.log(error)
            return res.status(500);
        }
    }

    async addShot(req, res) {
        try {
            const { login } = req.user;
            const user = await User.findOne({ login });
            user.statistic.shots += 1;
            await user.save();
            const updatedUser = await User.findOne({ login });
            return res.json({ statistic: updatedUser.statistic });
        } catch (error) {
            console.log(error)
            return res.status(500);
        }
    }

    async addHit(req, res) {
        try {
            const { login } = req.user;
            const user = await User.findOne({ login });
            user.statistic.hits += 1;
            await user.save();
            const updatedUser = await User.findOne({ login });
            return res.json({ statistic: updatedUser.statistic });
        } catch (error) {
            console.log(error)
            return res.status(500);
        }
    }

    async addBattle(req, res) {
        try {
            const { login } = req.user;
            const user = await User.findOne({ login });
            user.statistic.battles += 1;
            await user.save();
            const updatedUser = await User.findOne({ login });
            return res.json({ statistic: updatedUser.statistic });
        } catch (error) {
            console.log(error)
            return res.status(500);
        }
    }

    async addWinningBattle(req, res) {
        try {
            const { login } = req.user;
            const user = await User.findOne({ login });
            user.statistic.wins += 1;
            await user.save();
            const updatedUser = await User.findOne({ login });
            return res.json({ statistic: updatedUser.statistic });
        } catch (error) {
            console.log(error)
            return res.status(500);
        }
    }

    async addLosingBattle(req, res) {
        try {
            const { login } = req.user;
            const user = await User.findOne({ login });
            user.statistic.loses += 1;
            await user.save();
            const updatedUser = await User.findOne({ login });
            return res.json({ statistic: updatedUser.statistic });
        } catch (error) {
            console.log(error)
            return res.status(500);
        }
    }
}

module.exports = new UserController()
