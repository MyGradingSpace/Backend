const mongoose = require("mongoose");

const gradingSchema = new mongoose.Schema({
    jobId: String,
    grading: [{
        DisplayName: String,
        EntityId: String,
        FileName: String,
        fileId: String,
        downloadAddress: String,
        markingResults: {
            filename: String,
            testResult: [{
                output: String,
                expectOutput: String,
                marks: Number,
            }]
        },
    }]
});

const Grading = mongoose.model("Grading", gradingSchema);

module.exports = Grading;