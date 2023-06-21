const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userModel = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'Password is required']
    },
});

userModel.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userModel);
module.exports = User;