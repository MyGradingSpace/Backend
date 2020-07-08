const language = require("./router/language.router");
const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => { next(); });

mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, (err) => {
    if (err) throw err;
    console.log("Local DB Connected Successfully");
});

app.listen(process.env.PORT || process.env.port || 5000, () => {
    console.log(`App listening on port ${process.env.PORT || 5000}.`);
});

app.get("/get-all-languages", language.getAllLanguages);
