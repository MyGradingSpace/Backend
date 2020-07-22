const openshiftRestClient = require('openshift-rest-client').OpenshiftClient;

//your imports and functions here
const settings = {
};
// console.log("Cluster URL:"+process.env.CLUSTER_URL)
settings.config = {
    url: "https://192.168.42.131:8443",
    auth: { //will probably hardcode username and password
        username: "system",
        password: "admin"
    },
    insecureSkipTlsVerify: true
};



async function createDeployment(gradingId) {
    console.log("creating a deployment");

    const client = await openshiftRestClient(settings);

    // const projects = await client.apis['project.openshift.io'].v1.projects.get({ qs: { labelSelector: 'my-grading-space' } })

    //    //create build config
    //    const buildConfig = require('./build-config.json')
    //    const create = await client.apis['build.openshift.io'].v1.namespaces('default').buildconfigs.post({ body: buildConfig })

    //access build config
    //   const deployment = await client.apis['build.openshift.io'].v1.namespaces('default').buildconfigs(buildConfig.metadata.name).get()

    //fetch all namespaces
    // const namespaces = await client.api.v1.namespaces.get()

    //create a deployment 
    // const deploymentManifest = require('./nginx-deployment.json')
    const buildConfig = {
        "apiVersion": "apps.openshift.io/v1",
        "kind": "DeploymentConfig",
        "metadata": {
            "name": "example",
            "namespace": "my-grading-space"
        },
        "spec": {
            "selector": {
                "app": "hello-openshift"
            },
            "replicas": 3,
            "template": {
                "metadata": {
                    "labels": {
                        "gradingId": gradingId
                    }
                },
                "spec": {
                    "containers": [
                        {
                            "name": "hello-openshift-container",
                            "image": "nginx",
                            "ports": [
                                {
                                    "containerPort": 8080
                                }
                            ],
                            "env": [
                                {
                                  "name": "GRADINGID",
                                  "value": gradingId
                                }
                              ]
                        }
                    ]
                }
            }
        }
    }

    const create = await client.apis.apps.v1.namespaces('my_grading_space').deployments.post({ body: buildConfig })

    //fetch deployment
    const deployment = await client.apis.apps.v1.namespaces('my_grading_space').deployments(buildConfig.metadata.name).get()

    //post data 

    await client.apis['build.openshift.io'].v1.namespaces('default').buildconfigs(buildConfig.metadata.name).post(x)

    const y = await client.apis['build.openshift.io'].v1.namespaces('default').buildconfigs(buildConfig.metadata.name).get(x)

    //remove deployment 
    await client.apis.apps.v1.namespaces('default').deployments(deploymentManifest.metadata.name).delete()

    //remove build config
    //    await client.apis['build.openshift.io'].v1.namespaces('default').buildconfigs(buildConfig.metadata.name).delete()

    return y

}

module.exports = {
    createDeployment
    //have your functions' names here so it can be used when your file is imported by other js files as a module. 
    //go to ./data.helper.js to see how it's done.
}