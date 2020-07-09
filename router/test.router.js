async function healthCheck(req, res, next) {
    console.log("/health-check");
    res.json("Healthy! :p");
}


module.exports = {
    healthCheck
};