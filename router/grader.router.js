const grading = require('../model/grading.model');
const job = require('../model/job.model');
const InfoForGrader = require("../model/infoForGrader.model");

// import grading from "../model/grading.model"
// import job from "../model/job.model"


async function updateGrading(req, res, next) {
    console.log('/put-grading');
    console.log('received information from grader pod with gradingId: '+);
    const params = req.headers;
    const body = req.body;
    // console.log(req.headers);
    // console.log(req.body);
    console.log(req.body.results[0].markings);
    if (params.key == 'oursecret') {
        try {
            const updatedJob = await job.findOneAndUpdate(
                { gradingId: body.gradingId },
                {
                    submissionCounts: body.numOfSubmissions,
                }
            );
            console.log('Updated job with id: ' + updatedJob._id + ' that has a gradingId of ' + updatedJob.gradingId)
            console.log(req.body.results)
            for (var student of req.body.results) {
                console.log("obj.markings:")
                console.log(student.markings)
                // for(var file of student)
                // $push: { "objects.$[stu]": { "markings": student.markings } }

                await grading.findOneAndUpdate(
                    { gradingId: body.gradingId },
                    {
                        $set: { "objects.$[stu]": { "markings": student.markings } },
                    },
                    {
                        "arrayFilters": [{ "stu.EntityId": student.EntityId }]
                    }
                );
            }
            res.send('200 OK\n Good work. Sleep tight :)')
        } catch (err) {
            console.log(err);
            res.status(400);
            res.json({
                message: "400 Internal server error.",
                details: err
            });
            return;
        }
    } else {
        res.status(403);
        res.json({
            message: 'missing parameter(s) or pramater(s) type incorrect.',
            details: {
                info: "Do I know you?"
            }
        });
    }
}
async function getLinks(req, res, next) {
    console.log("/joblinks");
    const params = req.query;
    const headers = req.headers
    if (headers.key == 'oursecret') {
        console.log("A grader is looking for information on grading " + params.gradingId);
        let info = await InfoForGrader.find({ gradingId: params.gradingId });
        if (Object.keys(info).length == 0) {
            res.status(404);
            res.json({
                message: 'Cannot find grading with given gradingId.'
            });
        } else {
            res.json(info);
        }
    } else {
        res.status(403);
        res.json({
            message: 'missing parameter(s) or pramater(s) type incorrect.',
            details: {
                info: "Do I know you?"
            }
        });
    }
}
module.exports = {
    updateGrading,
    getLinks
};