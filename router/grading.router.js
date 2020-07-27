const grading = require("../model/grading.model");
const job = require("../model/job.model");
const InfoForGrader = require("../model/infoForGrader.model");

const jsonHelper = require("../helper/data.helper");
const D2L = require("valence");
const cluster = require("../helper/cluster.helper")

async function getGrading(req, res, next) {
    console.log("/get-grading");
    const params = req.query;
    let Grading;
    if (params.gradingId) {
        Grading = await grading.find({ gradingId: params.gradingId });
    } else if (params.jobId) {
        Grading = await grading.find({ jobId: params.jobId });
    }
    res.json(Grading);
}

async function createGrading(req, res, next) {
    console.log("/post-grading");
    const body = req.body;
    console.log(body);
    try {
        const newGrading = new grading({
            jobId: body.jobId,
            gradingId: body.gradingId,
            objects: body.objects,
            credential: body.credential,
        });
        const Grading = await newGrading.save();
        res.json(Grading);
        var corrspondingJob = await job.findOne({ gradingId: Grading.gradingId });

        var D2LUserContext = new D2L.ApplicationContext(process.env.APP_ID, process.env.APP_KEY)
            .createUserContextWithValues("https://" + process.env.BRIGHTSPACE_HOST, 443, "lSj3-aOMLSfTGJcUkossnd", "_qWFeksnL-HqmHs2WXjaoD");
        var links = jsonHelper.createLinkJson(D2LUserContext, Grading, corrspondingJob);

        var newInfoForGrader = new InfoForGrader({
            gradingId: body.gradingId,
            links: links,
            configuration: corrspondingJob.configuration
        })

        newInfoForGrader = await newInfoForGrader.save()
        console.log("saved infoForGrader:");
        console.log(newInfoForGrader.toJSON());
        cluster.createDeployment(body.gradingId);
    } catch (err) {
        console.log(err);
        res.status(400);
        res.json({
            message: "missing parameter(s) or pramater(s) type incorrect.",
            details: err
        });
        return;
    }
}

async function deleteGrading(req, res, next) {
    console.log("/delete-grading");
    const params = req.query;
    const selectGrading = await grading.deleteOne({
        _id: params._id
    });
    res.json(selectGrading);
}

async function deleteGradingThroughGradingId(id) {
    console.log("/delete-grading-through-jobId");
    await grading.deleteOne({ gradingId: id });
    await InfoForGrader.deleteOne({ gradingId: id });
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

module.exports = {
    getGrading,
    createGrading,
    deleteGrading,
    deleteGradingThroughGradingId,
};