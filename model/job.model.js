const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    professorName: String,
    professorId: String,
    course: String,
    dropbox: String,
    gradingCounts: Number,
    submissionCounts: Number,
    configuration: [{
        filename: String,
        testCases: [{
            input: String,
            output: String,
            marks: Number,
        }]
    }],
    gradingId: String,
});

const Language = mongoose.model("Language", languageSchema);

module.exports = Language;