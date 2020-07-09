const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    professorName: String,
    professorId: String,
    course: String,
    orgUnitId: String,
    dropbox: String,
    folderId: String,
    gradingCounts: Number,
    submissionCounts: Number,
    gradingId: String,
    configuration: [{
        filename: String,
        testCases: [{
            input: String,
            output: String,
            marks: Number,
        }]
    }],
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;