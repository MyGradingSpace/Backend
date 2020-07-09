const test =  require("./router/test.router");
const language = require("./router/language.router");
const job = require("./router/job.router");
const grading = require("./router/grading.router");

const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => { next(); });
var dboptions = {
    user:'admin',
    pass:'example',
    useNewUrlParser: true,
    useUnifiedTopology: true
};
// mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}?authSource=admin`, dboptions , (err) => {
//     if (err) throw err;
//     console.log("Local DB Connected Successfully");
// });
mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, (err) => {
    if (err) throw err;
    console.log("Local DB Connected Successfully");
});

app.listen(process.env.PORT || process.env.port || 5000, () => {
    console.log(`App listening on port ${process.env.PORT || 5000}.`);
});

//health-check
app.get("/health-check", test.healthCheck);
//languages
app.get("/all-languages", language.getAllLanguages);
app.post("/language", language.createLanguage);
//jobs
app.get("/all-jobs", job.getAllJobs);
app.post("/job", job.createJob);
app.put("/job", job.updateJob);
app.delete("/job", job.deleteJob);
//grading