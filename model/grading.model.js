const mongoose = require("mongoose");

const gradingSchema = new mongoose.Schema({
    jobId: String,
    gradingId: String,
    grading: [{
        DisplayName: String,
        EntityId: String,
        FileName: String,
        fileId: String,
        markingResults: [{
            filename: String,
            marked: Boolean,
            testResult: [{
                output: String,
                expectOutput: String,
                marks: Number,
            }]
        }],
    }]
});


for (var p in gradingSchema.paths) {
    gradingSchema.path(p).required(true);
}
gradingSchema.path("grading").required(false);

const Grading = mongoose.model("Grading", gradingSchema);

module.exports = Grading;