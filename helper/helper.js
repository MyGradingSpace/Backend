
function createDownloadUrls(userContext, gradingObj, jobObj) {
    var result = []
    const orgUnitId = jobObj.orgUnitId
    const folderId = jobObj.folderId
    for(obj in gradingObj.objects) {
        result.push(userContext.createAuthenticatedUrl("/d2l/api/le/1.34/"+orgUnitId+"/dropbox/folders/"+folderId+"/submissions/"+obj.submissionId+"/files/"+obj.fileId, "get"));
    }
    console.log("createDownloadUrls for orgUnit "+jobObj.orgUnitId+":");
    console.log(result);
    return result;
}

module.exports = {
    createDownloadUrls
};