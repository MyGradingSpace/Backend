const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema({
    _id: String,
    name: String,
});

const Language = mongoose.model("Language", languageSchema);

module.exports = Language;