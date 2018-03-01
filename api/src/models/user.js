const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

});

UserSchema.virtual('created_on').get(() => {
    return this._id.getTimestamp();
})

module.exports = mongoose.model('Todo', UserSchema);