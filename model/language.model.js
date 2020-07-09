const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema({
    name: String,
    version: String
});


for (var p in languageSchema.paths) {
    languageSchema.path(p).required(true);
}

const Language = mongoose.model("Language", languageSchema);

module.exports = Language;