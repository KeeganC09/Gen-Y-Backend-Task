const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({

    email: {
        type: String,
        required: [true, "Please provide your email"],
        trim: true,
        unique: true,
        lowercase: true
    },

    hash_password: {
        type: String,
        required: [true, "Please provide your Password"],
    },

    admin: {
        type: Boolean
    }

}, {
    timestamps: true
});

userSchema.virtual('password').set(function (password) {
    this.hash_password = bcrypt.hashSync(password, 12)
});

userSchema.methods = {
    authenticate: function (password) {
        return bcrypt.compareSync(password, this.hash_password);
    }
}

module.exports = mongoose.model('User', userSchema);