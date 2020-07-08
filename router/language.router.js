const language = require("../model/language.model");

async function getAllLanguages(req, res, next) {
    console.log("/get-all-languages");
    try {
        let Languages = await task.find();
        res.json(Languages);
    } catch (err) {
        res.json({ message: err });
    }
}

module.exports = {
    getAllLanguages,
    
};