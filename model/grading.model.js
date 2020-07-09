const mongoose = require("mongoose");

const gradingSchema = new mongoose.Schema({
    result:[{
        jobId:String,
        studentName: String,
        studentId: String,
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