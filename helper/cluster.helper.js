const openshiftRestClient = require('openshift-rest-client').OpenshiftClient;
const k8Config = require('openshift-rest-client').config;

//your imports and functions here
const settings = {
};
console.log("Cluster URL:"+process.env.CLUSTER_URL)
settings.config = {
    url: "https://api.us-west-1.starter.openshift-online.com:6443",
    auth: { 
        token: "6UAnEQ6wNqUm5azBiMvVMHHEJKAweWraU2Hehni-J5o"
    },
    insecureSkipTlsVerify: true
};
const config = {
    "apiVersion": "v1",
    "clusters": [
      {
        "cluster": {
          "server": "https://api.us-west-1.starter.openshift-online.com:6443"
        },
        "name": "api-us-west-1-starter-openshift-online-com:6443"
      },
      {
        "cluster": {
          "certificate-authority-data": "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURDekNDQWZPZ0F3SUJBZ0lRRGl0amk2ZDA1ZG5OaEMva2d1eXozREFOQmdrcWhraUc5dzBCQVFzRkFEQXYKTVMwd0t3WURWUVFERXlRd056ZGxaV1ZsTkMxallURmtMVFEyTmpJdE9UZ3pNaTAyTWpZd1kyTTJaV0ZtWmprdwpIaGNOTWpBd05qRTVNVE0wT1RJM1doY05NalV3TmpFNE1UUTBPVEkzV2pBdk1TMHdLd1lEVlFRREV5UXdOemRsClpXVmxOQzFqWVRGa0xUUTJOakl0T1Rnek1pMDJNall3WTJNMlpXRm1aamt3Z2dFaU1BMEdDU3FHU0liM0RRRUIKQVFVQUE0SUJEd0F3Z2dFS0FvSUJBUURWemVQUlhSWEVRZ1FZM25jaXNMWm5CV1dqaEIrbzFTNzVvMkJWU042Qgo4dkZTV2VCQ0daM2N0MTBNUGk2UUZmalRKSytjdXNIQ0VaQlpMZ2Vya0pWSHNSbEdCaUJVNTRqRzJGci9SUk0xCnpud0psOWpFbkk2a29Camx6ZHRNd0xLRlpSQUFCbkRsUzhOOCt5LzZ4dVlNUEJPMTB3TENWdFNTWnBtbzRGRFEKd2kySFZGU2dwaGgvb2hjVWhGK3RnbytXRjhSMTdiNlAyMHdoWmxpR2w0VWNBbGo0a3pzYTFGdWc2ZEI2RHNDSQpsait4UG8xVWRMQWh6T2lTV3p0MDZIcUY2RkszSEJEbS9Fcm1raERob0hFa3ZDVnBnREFOd3dGbzhUc3dTKzIrClpKK3NCb2ZPdkhvanB0M295bmg3TThiQ2RYUlRSWk9mbENJbjVzcnA0VDRIQWdNQkFBR2pJekFoTUE0R0ExVWQKRHdFQi93UUVBd0lDQkRBUEJnTlZIUk1CQWY4RUJUQURBUUgvTUEwR0NTcUdTSWIzRFFFQkN3VUFBNElCQVFCVQo4czZBWGhleDNQS0FwQmtUZnFoSEJ6UmZjbjJYYkRJSWc2RlQydmkzNFNTSVB0ZGk3andnMS9DQVdWZ0NIYkFUClQyN0NxdVU2ZG5sb3ZOczJnUDRXZDdnNTd6OUhCTStuZER1bEhYOGRrYlgwZkxoQjE1NXl1K1JNQlk2T3hhdFoKclhQZzBYMnNKaml4OFdxSXdEUit5MTc4WThFaE1UNG94TjZOcENqU2VjNGZqRlRmczdML0IybXEzVXZWcmxIYgo1eUpldkNBSW5qdnhORjFkSWNKc1RhNHcwbm5tL25Jd3pNT3JmUFJ0ZElXZlhpbUN0eEFOWjdVNWpqVmprYlpOCkVsckZiT2FGYk5KZno1YkgrazN2VlVuNDFrQkg2N1IybHE2OFpvZS83cFU5YlptRVV3SFNhL2NFc2R1RjRsY1YKNk5HY0xibERhQ2I0YXhNMkdGNFkKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=",
          "server": "https://104.197.104.104"
        },
        "name": "gke_theta-spirit-280814_us-central1-c_web"
      }
    ],
    "contexts": [
      {
        "context": {
          "cluster": "api-us-west-1-starter-openshift-online-com:6443",
          "namespace": "demo-proj",
          "user": "edmund-lui98/api-us-west-1-starter-openshift-online-com:6443"
        },
        "name": "demo-proj/api-us-west-1-starter-openshift-online-com:6443/edmund-lui98"
      },
      {
        "context": {
          "cluster": "gke_theta-spirit-280814_us-central1-c_web",
          "user": "gke_theta-spirit-280814_us-central1-c_web"
        },
        "name": "gke_theta-spirit-280814_us-central1-c_web"
      }
    ],
    "current-context": "demo-proj/api-us-west-1-starter-openshift-online-com:6443/edmund-lui98",
    "kind": "Config",
    "preferences": {},
    "users": [
      {
        "name": "edmund-lui98/api-us-west-1-starter-openshift-online-com:6443",
        "user": {
          "token": "6UAnEQ6wNqUm5azBiMvVMHHEJKAweWraU2Hehni-J5o"
        }
      },
      {
        "name": "gke_theta-spirit-280814_us-central1-c_web",
        "user": {
          "auth-provider": {
            "config": {
              "access-token": "ya29.a0AfH6SMD5NnOk2UmsjzIL33WuqeNc679q7OgK_EGEUaECWY_oceZqJb5rsyQu1mpa8llia0De_u9pgHLft0_-LHKSAfG1GMdIctRdnY4MYmNMMuGm7oQk6NA_1WupCjm-nPbJhwsn82qnQZph_B_ryHaB4Y4NnKWSxWIexVEeEYm-nw",
              "cmd-args": "config config-helper --format=json",
              "cmd-path": "C:\\Program Files (x86)\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd",
              "expiry": "2020-07-22T05:47:49Z",
              "expiry-key": "{.credential.token_expiry}",
              "token-key": "{.credential.access_token}"
            },
            "name": "gcp"
          }
        }
      }
    ]
  }
  openshiftRestClient({config}).then((client) => {
    console.log(client);
  });



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
        "apiVersion": "v1",
        "kind": "DeploymentConfig",
        "metadata": {
            "name": "example",
            "namespace": "demo-proj"
        },
        "spec": {
            "selector": {
                "app": "hello-openshift"
            },
            "replicas": 3,
            "template": {
                "metadata": {
                    "labels": {
                        "app": "hello-openshift"
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
    //const create = await client.apis['build.openshift.io'].v1.namespaces('default').deploy.post({ body: buildConfig })

    //const create = await client.apis.template.v1.deploymentconfigs.post(buildConfig);
    //client.api.template.v1.deploymentconfigs

    // //fetch deployment
    const deployment = await client.apis.apps.v1.namespaces('demo-proj').deployments("backend-git").get()
    const deploy = await client.apis.apps.v1.namespaces('demo-proj').deploy.post({body: buildConfig})
    console.log(deployment)
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