const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    title: String,
    completed: { type: Boolean, default: false }
});

Schema.virtual('created_on').get(() => {
    return this._id.getTimestamp();
})

module.exports = mongoose.model('Todo', Schema);