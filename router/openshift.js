//access openshift client
const openshiftRestClient = require('openshift-rest-client').OpenshiftClient;

//login to openshift
(async function () {
    const settings = {
    };
  
    settings.config = {
      url: process.env.CLUSTER_URL,
      auth: { //will probably hardcode username and password
        username: process.env.ADMIN_USERNAME, 
        password: process.env.ADMIN_PASSWORD  
      },
      insecureSkipTlsVerify: true
    };
  
    const client = await openshiftRestClient(settings);
  })();

//get projects
const projects = await client.apis['project.openshift.io'].v1.projects.get({qs: {labelSelector: 'someOpenShiftLabel'}})

async function createDeployment(name, json) {
    console.log("creating a deployment");

//    //create build config
//    const buildConfig = require('./build-config.json')
//    const create = await client.apis['build.openshift.io'].v1.namespaces('default').buildconfigs.post({ body: buildConfig })

    //access build config
//   const deployment = await client.apis['build.openshift.io'].v1.namespaces('default').buildconfigs(buildConfig.metadata.name).get()

    //fetch all namespaces
    const namespaces = await client.api.v1.namespaces.get()

    //create a deployment 
    const deploymentManifest = require('./nginx-deployment.json')
    const create = await client.apis.apps.v1.namespaces('default').deployments.post({ body: deploymentManifest })

    //fetch deployment
    const deployment = await client.apis.apps.v1.namespaces('default').deployments(deploymentManifest.metadata.name).get()

    //post data 
    x = {
        "gradingId": "whatever",
        "links":[
            {
              "studentId": 123456789,
              "link": "https://mylearningspace.wlu.ca/blahblah"
            }
          ]
      }
    
    await client.apis['build.openshift.io'].v1.namespaces('default').buildconfigs(buildConfig.metadata.name).post(x)
    
    const y = await client.apis['build.openshift.io'].v1.namespaces('default').buildconfigs(buildConfig.metadata.name).get(x)
    
    //remove deployment 
    await client.apis.apps.v1.namespaces('default').deployments(deploymentManifest.metadata.name).delete()

    //remove build config
//    await client.apis['build.openshift.io'].v1.namespaces('default').buildconfigs(buildConfig.metadata.name).delete()

    return y

}