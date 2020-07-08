const mongoose = require("mongoose");

const gradingSchema = new mongoose.Schema({
    result:[{
        jobId:String,
        studentName: String,
        studentId: String,
        markingResults: Arrayof(Arrayof(Boolean)),
    }]
});

const Grading = mongoose.model("Grading", gradingSchema);

module.exports = Grading;