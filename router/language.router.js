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
    if(req.body.hasOwnProperty("name") && req.body.hasOwnProperty('version')) {
        const newLanguage = new language({
            name: body.name,
            version: body.version,
        });
        console.log(newLanguage);
        try {
            const Language = await newLanguage.save();
            res.json(Language);
        } catch (err) {
            res.status(400);
            res.json({ message: err });
        }
    } else {
        res.status(400);
        res.json({ message: "missing parameters." });
    }


}

module.exports = {
    getAllLanguages,
    createLanguage,
};