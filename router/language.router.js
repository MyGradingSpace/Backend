const language = require("../model/language.model");

async function getAllLanguages(req, res, next) {
    console.log("/get-all-languages");
    let Languages = await language.find();
    res.json(Languages);

}

async function createLanguage(req, res, next) {
    console.log("/post-language");
    const body = req.body;
    if (req.body.hasOwnProperty("name") && req.body.hasOwnProperty('version')) {
        const newLanguage = new language({
            name: body.name,
            version: body.version,
        });
        console.log(newLanguage);
        const Language = await newLanguage.save();
        res.json(Language);
    } else {
        res.status(400);
        res.json({ message: "missing parameters." });
    }
}

module.exports = {
    getAllLanguages,
    createLanguage,
};