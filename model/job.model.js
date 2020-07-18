const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    professorName: String,
    professorId: String,
    course: String,
    orgUnitId: String,
    dropbox: String,
    folderId: String,
    gradingId: String,
    gradingCounts: Number,
    submissionCounts: Number,
    languageId: String,
    configuration: [{
        filename: String,
        testCases: [{
            input: String,
            output: String,
            marks: Number,
        }]
    }],
});

for (var p in jobSchema.paths) {
    jobSchema.path(p).required(true);
}

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;