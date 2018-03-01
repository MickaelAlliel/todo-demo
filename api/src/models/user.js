const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    // Dummy user
});

Schema.virtual('created_on').get(() => {
    return this._id.getTimestamp();
})

module.exports = mongoose.model('User', Schema);