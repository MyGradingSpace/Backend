/* eslint-disable no-prototype-builtins */
const job = require("../model/job.model");
const grading = require("../router/grading.router");

async function getAllJobs(req, res, next) {
    console.log("/get-all-jobs");
    const params = req.query;
    let jobs = await job.find({ professorId: params.professorId });
    res.json(jobs);
}

async function createJob(req, res, next) {
    console.log("/post-job");
    const body = req.body;
    try {
        var gradingId = makeGradingId(body.course, body.dropbox);
        const newJob = new job({
            professorName: body.professorName,
            professorId: body.professorId,
            course: body.course,
            orgUnitId: body.orgUnitId,
            dropbox: body.dropbox,
            folderId: body.folderId,
            languageId: body.languageId,
            gradingId: gradingId,
            gradingCounts: 0,
            submissionCounts: 0,
            configuration: body.configuration,
        });
        console.log(newJob);
        const Job = await newJob.save();
        res.json(Job);
        console.log(newJob);
    } catch (err) {
        res.status(400);
        res.json({
            message: "missing parameter(s) or pramater(s) type incorrect.",
            // input: req.body,
            details: err
        });
        return;
    }
}

async function updateJob(req, res, next) {
    console.log("/put-job");
    const params = req.query;
    const body = req.body;
    if (req.body.hasOwnProperty("gradingId") && req.body.hasOwnProperty('gradingCounts') && req.body.hasOwnProperty('submissionCounts')) {
        const updatedJob = await job.updateOne(
            { _id: params._id },
            {
                gradingId: body.gradingId,
                gradingCounts: body.gradingCounts,
                submissionCounts: body.submissionCounts,
            }
        );
        res.json(updatedJob);
    } else {
        res.status(400);
        res.json({
            message: "missing parameter(s) or pramater(s) type incorrect.",
            details: {
                missingProperties: req.body.hasOwnProperty("_id") ? "" : "_id " +
                    req.body.hasOwnProperty("gradingId") ? "" : "gradingId " +
                    req.body.hasOwnProperty("gradingCounts") ? "" : "gradingCounts " +
                    req.body.hasOwnProperty("submissionCounts") ? "" : "submissionCounts ",
                info: {}
            }
        });
    }
}

async function deleteJob(req, res, next) {
    console.log("/delete-job");
    const params = req.query;
    const selectJob = await job.deleteOne({
        _id: params._id
    });
    res.json(selectJob);
}

function makeGradingId(Course, Dropbox) {
    let date_ob = new Date();
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 4; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    result = date_ob.getFullYear() +
        "-" + date_ob.getMonth() +
        "-" + Course.split(" ")[0].split("-")[0] +
        "-" + Dropbox.split(' ').join('') +
        "-" + result;
    // console.log(result);
    return result;
}

module.exports = {
    getAllJobs,
    createJob,
    updateJob,
    deleteJob,
};