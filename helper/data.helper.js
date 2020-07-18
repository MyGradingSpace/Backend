
function createLinkJson(userContext, gradingObj, jobObj) {
    var result = [];
    const orgUnitId = jobObj.orgUnitId;
    const folderId = jobObj.folderId;
    console.log("gradingObj:")
    console.log(gradingObj)
    for (var obj of gradingObj.objects) {
        console.log("obj:")
        console.log(obj)
        result.push(
            {
                EntityId: obj.EntityId,
                filename: obj.FileName,
                link: userContext.createAuthenticatedUrl("/d2l/api/le/1.34/" + orgUnitId + "/dropbox/folders/" + folderId + "/submissions/" + obj.submissionId + "/files/" + obj.fileId, "get")
            });
    }
    console.log("createDownloadUrls for orgUnit " + jobObj.orgUnitId + ":");
    console.log(result);
    return result;
}

module.exports = {
    createLinkJson: createLinkJson
};