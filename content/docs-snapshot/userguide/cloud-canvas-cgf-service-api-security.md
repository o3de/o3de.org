# Security<a name="cloud-canvas-cgf-service-api-security"></a>

When you make APIs available on the Internet, you must be concerned with security\. A best practice is to limit API access to only the people who require it\. However, some APIs must be called by the game client\. These APIs can be called by any game player or potentially anyone on the Internet\.

For all APIs, consider the following:
+ Use the access control mechanism described in the next section to limit API access to only those who require it\.

   
+ Don't trust parameter values provided by the client\. Verify that the parameter values match expectations before you use them\. Be careful when inserting parameter values into query strings that are sent to DynamoDB or other services\. For more information, see [code injection](https://en.wikipedia.org/wiki/Code_injection)\.

   
+ API Gateway [automatically protects](https://aws.amazon.com/api-gateway/faqs/#security) your backend systems from distributed denial\-of\-service \(DDoS\) attacks, whether attacked with counterfeit requests \(Layer 7\) or SYN floods \(Layer 3\)\. However, this does not protect from less frequent requests that do not trigger API Gateway's protections\. These other requests might still have a significant impact on your operating costs due to excessive I/O or on game performance\. 

## Access Control<a name="cloud-canvas-cgf-service-api-security-access-control"></a>

Configuring access control for a service API involves setting three distinct sets of permissions:

1. The `execute-api` operation, enforced by API Gateway\.

1. The Lambda [https://docs.aws.amazon.com/lambda/latest/dg/API_Invoke.html](https://docs.aws.amazon.com/lambda/latest/dg/API_Invoke.html) function, enforced by AWS Lambda

1. Access to the cloud gem resource, enforced by the resource's AWS service \(for example, Amazon DynamoDB or Amazon S3\.\)

In all three cases, you use the [Cloud Canvas Resource Manager Security](cloud-canvas-rm-security.md) system to configure access\. This involves putting `Permissions` metadata on the `ServiceApi` and `ServiceLambda` resource definitions, as well as on the definitions of resources accessed by the `ServiceLambda` code\. This is illustrated in the following diagram:

![\[Configuring access control\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cgf-service-api-3.png)

The permissions granted by `ServiceApi` are described in detail in the next section\. `ServiceLambda` gives `ServiceApi` permission to invoke the Lambda function\. Other resources give `ServiceLambda` the permissions that the Lambda function requires\.

## Service API Permissions<a name="cloud-canvas-cgf-service-api-security-service-api-permissions"></a>

You can secure service API operations on an individual basis\. For example, you could give permission to submit high scores to the game, and permission to delete fraudulent high scores to someone who manages operations\.

By default, only valid AWS IAM credentials can execute operations\. This is done using swagger [security requirement](http://swagger.io/specification/#securityRequirementObject) and [security definitions](http://swagger.io/specification/#securityDefinitionsObject) objects that are added to each operation during [upload processing](cloud-canvas-cgf-service-api-cgf-extension-object.md#cloud-canvas-cgf-service-api-cgf-extension-object-upload-processing), unless the swagger operation object already defines a security object\. You can configure API Gateway to use other forms of security, or none at all, by putting security objects in swagger object definitions in your `swagger.json` file\.

To grant permission to execute an operation, modify your `resource-template.json` file to include metadata on the `ServiceApi` resource definition, as in the following example\.

```
{
    "Resources": {
        ...
        "ServiceApi": {
            "Type": "Custom::ServiceApi", 
            "Properties": { ... },
            "Metadata": {
                "CloudCanvas": {
                    "Permissions": [
                        {
                            "AbstractRole": [ "ProjectOwner", "DeploymentOwner" ],
                            "Action": "execute-api:*",
                            "ResourceSuffix": "/*"
                        },
                        {
                            "AbstractRole": "Player",
                            "Action": "execute-api:Invoke",
                            "ResourceSuffix": "/*/POST/score/*"
                        },
                        {
                            "AbstractRole": "DevOps",
                            "Action": "execute-api:Invoke",
                            "ResourceSuffix": "/*/DELETE/score/*"
                        }
                    ]
                }
            }
        }
    ...
}
```

The `AbstractRole` property determines who has permission to call the API\. Cloud Canvas has built in `Player`, `ProjectOwner`, and `DeploymentOwner` roles\. You can create others as required\. The `abstract` role specified here is mapped to an actual AWS IAM role using metadata on the role definitions\. For details, see [Understanding the Resource Manager Security System](cloud-canvas-rm-security.md)\.

The `Action` and `ResourceSuffix` are used by the Cloud Canvas Resource Manager access control to generate an AWS IAM policy document statement\. This process is described in [Statement Reference of IAM Policies for Executing API in API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-control-access-using-iam-policies-to-invoke-api.html#api-gateway-calling-api-permissions)\.

The `Action` property determines what the permission allows someone to do\. When you grant permissions to the `Player` abstract role, specify the permission `execute-api:Invoke`\. This gives the player permission to invoke the API\. When you grant permissions to the `ProjectOwner` and `DeploymentOwner` abstract roles, specify the permission `execute-api:*`\. This grants permission to invoke the API and manage the API's cache\. For other roles, use your own requirements to determine whether to grant a role permission to manage the cache, invoke the API, or both\.

The access control system calculates the ARN of the API Gateway REST API resource to which the action can be applied\. The `ResourceSuffix` property from the `Permission` metadata provides only the /`stage-name`/`HTTP-VERB`/`resources-path-specifier` part of the ARN described in the [Statement Reference of IAM Policies for Executing API in API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-control-access-using-iam-policies-to-invoke-api.html#api-gateway-calling-api-permissions)\.

For `ServiceAPI`, the `stage-name` is always `api`\. You can specify either `/api/...` or `/*/...` in the `ResourceSuffix` property value\. A `ResourceSuffix` value of `/api/*` or `/*` grants permissions for all operations on all paths of the service API\.