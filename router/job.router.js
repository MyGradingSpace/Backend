const job = require("../model/job.model");

async function getAllJobs(req, res, next) {
    console.log("/get-all-jobs");
    const params = req.query;
    let jobs = await job.find({ professorId: params.professorId });
    res.json(jobs);
}

async function createJob(req, res, next) {
    console.log("/post-job");
    const body = req.body;
    const newJob = new job({
        professorName: body.professorName,
        professorId: body.professorId,
        course: body.course,
        orgUnitId: body.orgUnitId,
        dropbox: body.dropbox,
        folderId: body.folderId,
        gradingCounts: 0,
        submissionCounts: 0,
        configuration: body.configuration,
    });
    console.log(newJob);
    const Job = await newJob.save();
    res.json(Job);
}

async function updateJob(req, res, next) {
    console.log("/put-job");
    const params = req.query;
    const body = req.body;
    const updatedJob = await job.updateOne(
        { _id: params._id },
        {
            gradingCounts: body.gradingCounts,
            submissionCounts: body.submissionCounts,
            gradingId: body.gradingId,
        }
    );
    res.json(updatedJob);
}

async function deleteJob(req, res, next) {
    console.log("/delete-job");
    const params = req.query;
    const selectJob = await job.deleteOne({
        _id: params._id
    });
    res.json(selectJob);
}

module.exports = {
    getAllJobs,
    createJob,
    updateJob,
    deleteJob,
};