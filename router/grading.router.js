const grading = require("../model/grading.model");

async function getGrading(req, res, next) {
    console.log("/get-grading");
    const params = req.query;
    let grading = await grading.find({ _id: params._id });
    res.json(grading);
}

async function createGrading(req, res, next) {
    console.log("/post-grading");
    const body = req.body;
    const newGrading = new grading({
        jobId: body.jobId,
        grading: body.grading,
    });
    console.log(newGrading);
    const Grading = await newGrading.save();
    res.json(Grading);
}

async function updateGrading(req, res, next) {
    console.log("/put-grading");
    //waiting for more information
}

async function deleteGrading(req, res, next) {
    console.log("/delete-grading");
    const params = req.query;
    const selectGrading = await grading.deleteOne({
        _id: params._id
    });
    res.json(selectGrading);
}

module.exports = {
    getGrading,
    createGrading,
    updateGrading,
    deleteGrading,
};