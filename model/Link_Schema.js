const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: { type: String, required: true, unique: true },
    longUrl: { type: String, required: true }
});

module.exports = mongoose.model('Url', urlSchema);
