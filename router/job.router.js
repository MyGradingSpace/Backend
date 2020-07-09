const language = require("../model/language.model");

async function getAllLanguages(req, res, next) {
    console.log("/get-all-languages");
    try {
        let Languages = await language.find();
        res.json(Languages);
    } catch (err) {
        res.json({ message: err });
    }
}

async function createLanguage(req, res, next) {
    console.log("/post-language");
    const body = req.body;
    const newLanguage = new language({
        language: body.language,
        version: body.version,
    });
    console.log(newLanguage);
    try {
        const Language = await newLanguage.save();
        res.json(Language);
    } catch (err) {
        res.json({ message: err });
    }

}

module.exports = {
    getAllLanguages,
    createLanguage,
};