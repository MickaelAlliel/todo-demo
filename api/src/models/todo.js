const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({

});

TodoSchema.virtual('created_on').get(() => {
    return this._id.getTimestamp();
})

module.exports = mongoose.model('Todo', TodoSchema);