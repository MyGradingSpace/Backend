const mongoose = require("mongoose");

const infoForGraderSchema = new mongoose.Schema({
    gradingId: String,
    links: [
        {
            EntityId: String,
            filename: String,
            link: String
        }
    ],
    configuration: [{
        filename: String,
        testCases: [{
            input:String,
            output: String,
            marks: Number
        }]
    }]
});


for (var p in infoForGraderSchema.paths) {
    infoForGraderSchema.path(p).required(true);
}

const InfoForGrader = mongoose.model("InfoForGrader", infoForGraderSchema);

module.exports = InfoForGrader;