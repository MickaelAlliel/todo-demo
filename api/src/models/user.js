const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }]
});

Schema.virtual('created_on').get(() => {
    return this._id.getTimestamp();
})

module.exports = mongoose.model('User', Schema);