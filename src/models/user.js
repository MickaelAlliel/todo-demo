const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    machine_id: String
});

Schema.virtual('created_on').get(() => {
    return this._id.getTimestamp();
})

module.exports = mongoose.model('User', Schema);