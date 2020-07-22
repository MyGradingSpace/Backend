const grading = require("../model/grading.model");
const job = require("../model/job.model");
const jsonHelper = require("../helper/data.helper");
const D2L = require("valence");
const InfoForGrader = require("../model/infoForGrader.model");
const cluster = require("../helper/cluster.helper")

// import grading from "../model/grading.model";
// import job from "../model/job.model";
// import helper from "../helper/helper";
// import D2L from "valence";


async function getGrading(req, res, next) {
    console.log("/get-grading");
    const params = req.query;
    let Grading = await grading.find({ gradingId: params.gradingId });
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
            credential: body.credential,
        });
        // console.log(newGrading);
        const Grading = await newGrading.save();
        res.json(Grading);
        // console.log("Grading.gradingId:");
        // console.log(Grading.gradingId)
        var corrspondingJob = await job.findOne({ gradingId: Grading.gradingId });
        // console.log("corrspondingJob:");
        // console.log(corrspondingJob);

        //get all urls

        var D2LUserContext = new D2L.ApplicationContext(process.env.APP_ID, process.env.APP_KEY)
            .createUserContextWithValues("https://" + process.env.BRIGHTSPACE_HOST, 443, "lSj3-aOMLSfTGJcUkossnd", "_qWFeksnL-HqmHs2WXjaoD");
        // console.log(D2LUserContext.createAuthenticatedUrl("/d2l/api/le/1.34/219419/dropbox/folders/54721/submissions/1542823/files/2675648", "get"));
        var links = jsonHelper.createLinkJson(D2LUserContext,Grading,corrspondingJob);
        
        var newInfoForGrader = new InfoForGrader({
            gradingId: body.gradingId,
            links : links,
            configuration: corrspondingJob.configuration
        })

        newInfoForGrader = await newInfoForGrader.save()
        console.log("saved infoForGrader:");
        console.log(newInfoForGrader.toJSON());
        //TODO: call cluster ctrl to start a deployment with json.
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

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

module.exports = {
    getGrading,
    createGrading,
    deleteGrading,
};