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
        type: Schema.Types.Mixed
    }
});

const User = mongoose.model('users', userSchema);

module.exports = User;