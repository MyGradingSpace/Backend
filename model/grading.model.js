const mongoose = require("mongoose");

const gradingSchema = new mongoose.Schema({
    jobId: String,
    gradingId: String,
    credential: {
        SessionId: String,
        SessionKey: String,
        SessionSkew: String
    },
    objects: [{
        DisplayName: String,
        EntityId: String,
        FileName: String,
        fileId: String,
        submissionId: String,
        markings: [{
            filename: String,
            marked: Boolean,
            testResult: [{
                output: String,
                expectOutput: String,
                marks: Number,
                match: Boolean
            }]
        }],
    }]
});


for (var p in gradingSchema.paths) {
    gradingSchema.path(p).required(true);
}

const Grading = mongoose.model("Grading", gradingSchema);

module.exports = Grading;