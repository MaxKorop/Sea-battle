const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    statistic: {
        shots: {
            type: Number,
            default: 0
        },
        hits: {
            type: Number,
            default: 0
        },
        battles: {
            type: Number,
            default: 0
        },
        wins: {
            type: Number,
            default: 0
        },
        loses: {
            type: Number,
            default: 0
        }
    }
});

const User = mongoose.model('users', userSchema);

module.exports = User;