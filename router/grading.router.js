const grading = require("../model/grading.model");

async function getGrading(req, res, next) {
    console.log("/get-grading");
    const params = req.query;
    let Grading = await grading.find({ jobId: params.jobId });
    res.json(Grading);
}

async function createGrading(req, res, next) {
    console.log("/post-grading");
    const body = req.body;
    try {
        const newGrading = new grading({
            jobId: body.jobId,
            gradingId: body.gradingId,
            objects: body.objects,
            credential:body.credential,
        });
        // console.log(newGrading);
        const Grading = await newGrading.save();
        res.json(Grading);
    } catch (err) {
        res.status(400);
        res.json({
            message: "missing parameter(s) or pramater(s) type incorrect.",
            details: err
        });
        return;
    }
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