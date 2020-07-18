const grading = require('../model/grading.model');
const job = require('../model/job.model');

// import grading from "../model/grading.model"
// import job from "../model/job.model"


async function updateGrading(req, res, next) {
    console.log('/put-grading');
    console.log('received information from a grader pod:');
    console.log(req);
    const params = req.query;
    const body = req.body;
    if (params.key == 'oursecret') {

        const updatedJob = await job.findOneAndUpdate(
            { gradingId: body.gradingId },
            {
                submissionCounts: body.numOfSubmissions,
            }
        );
        console.log('Updated job with id: ' + updatedJob._id + ' that has a gradingId of ' + updatedJob.gradingId)

        for (var obj of body.markings) {

            grading.findOneAndUpdate(
                { gradingId: body.gradingId },
                { $set: { "objects.$[stu]": { "markings": req.body.testResult } } },
                {
                    "arrayFilters": [{ "stu.EntityId": obj.EntityId }]
                }, (res) => {
                    console.log("updated a student marking record: \n" + res);
                }
            );

            // await grading.update(
            //     { gradingId: body.gradingId },
            //     {
            //         submissionCounts: body.numOfSubmissions,
            //     }
            // );
        }
        res.send('200 OK\n Good work. Sleep tight :)')
    } else {
        res.status(400);
        res.json({
            message: 'missing parameter(s) or pramater(s) type incorrect.',
            details: {
                info: "Do I know you?"
            }
        });
    }
}

module.exports = {
    updateGrading
};