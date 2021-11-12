const mongoose = require('mongoose');

const postSchema = mongoose.Schema({

    title: {
        type: String,
        required: [true, "Please provide post title"],
    },

    description: {
        type: String,
        required: [true, "Please describe your post"],
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Posts', postSchema);