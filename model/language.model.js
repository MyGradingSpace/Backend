const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema({
    language: String,
    version: String
});

const Language = mongoose.model("Language", languageSchema);

module.exports = Language;