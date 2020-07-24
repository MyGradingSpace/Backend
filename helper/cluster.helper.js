const openshiftRestClient = require('openshift-rest-client').OpenshiftClient;

//your imports and functions here
const settings = {
};
// settings.config = {
//     url: "https://api.us-west-1.starter.openshift-online.com:6443",
//     auth: { 
//         token: "6UAnEQ6wNqUm5azBiMvVMHHEJKAweWraU2Hehni-J5o"
//     },
//     insecureSkipTlsVerify: true
// };
settings.config = {
  "apiVersion": "v1",
  "clusters": [
    {
      "cluster": {
        "server": "https://api.us-east-1.starter.openshift-online.com:6443"
      },
      "name": "api-us-east-1-starter-openshift-online-com:6443"
    }
  ],
  "contexts": [
    {
      "context": {
        "cluster": "api-us-east-1-starter-openshift-online-com:6443",
        "namespace": "my-grading-space",
        "user": "youx8420"
      },
      "name": "my-grading-space/api-us-east-1-starter-openshift-online-com:6443/youx8420"
    }
  ],
  "current-context": "my-grading-space/api-us-east-1-starter-openshift-online-com:6443/youx8420",
  "kind": "Config",
  "preferences": {},
  "users": [
    {
      "name": "youx8420",
      "user": {
        "token": "i2JUMuB1SLo8aDX6nPFlJfmfcdNPBIFQLFX29xqm1LM"
      }
    }
  ]
}



async function createDeployment(gradingId) {
    console.log("creating a deployment");

    const client = await openshiftRestClient(settings);

    const buildConfig = {
      "apiVersion": "apps/v1",
      "kind": "Deployment",
      "metadata": {
        "name": "grader-"+gradingId,
        "namespace": "my-grading-space"
      },
      "spec": {
        "selector": {
          "matchLabels": {
            "app": "mygradingspace-grader"
          }
        },
        "template": {
          "replicas": 1,
          "metadata": {
            "labels": {
              "app": "mygradingspace-grader"
            }
          },
          "spec": {
            "containers": [
              {
                "name": "grader-"+gradingId,
                "image": "php:7.4.6-apache",
                "ports": [
                  {
                    "containerPort": 80
                  }
                ],
                "command": ["watch"],
                "args": ["-n0", "sleep", "20"],
                "restartPolicy": "Never",
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
    // //fetch deployment

    //Above is a working deployments retrieval line!

    const deploy = await client.apis.apps.v1.namespaces('my-grading-space').deploy.post({body: buildConfig})

    
    const deployment = await client.apis.apps.v1.namespaces('my-grading-space').deployments("grader-"+gradingId).get()
    console.log("Created a deployment:");
    console.log(deployment);
    //Above is a working deployment line!

    // console.log("deployments:")
    // console.log(deployment)
    // //post data 

    // await client.apis['build.openshift.io'].v1.namespaces('default').buildconfigs(buildConfig.metadata.name).post(x)
    //remove deployment 
    //await client.apis.apps.v1.namespaces('default').deployments(deploymentManifest.metadata.name).delete()

    //remove build config
    //    await client.apis['build.openshift.io'].v1.namespaces('default').buildconfigs(buildConfig.metadata.name).delete()

}

module.exports = {
    createDeployment
    //have your functions' names here so it can be used when your file is imported by other js files as a module. 
    //go to ./data.helper.js to see how it's done.
}