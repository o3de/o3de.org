# Resources<a name="cloud-canvas-cgf-service-api-resources"></a>

A cloud gem's service API is implemented based on the resources that are defined in the cloud gem's [resource\-template\.json](cloud-canvas-resource-definitions.md#cloud-canvas-resource-template) file\. The following are the key resources for a cloud gem:
+ `ServiceAPI` – An AWS CloudFormation custom resource provided by the Cloud Gem Framework\. The handler for this resource configures API Gateway to use the cloud gem's `swagger.json` file\.
+ `ServiceLambda` – An AWS Lambda function that implements the cloud gem's functionality\.
+ `ServiceLambdaConfiguration` – An AWS CloudFormation custom resource provided by Cloud Canvas Resource Manager that [configures](cloud-canvas-custom-resources.md#cloud-canvas-custom-resources-lambda-configuration) the `ServiceLambda` resource\.

To add definitions for these resources to a `resource-template.json` file, enter the following command\.

```
lmbr_aws cloud-gem-framework add-service-api-resources --resource-group <gem-name>
```

In addition to adding the resources mentioned, the `add-service-api-resources` command does the following:
+ Adds a `swagger.json` file to the cloud gem's AWS directory, if one doesn't already exist\.
+ Adds the `ServiceAPI` and `ServiceLambda` resources to the `AccessControl` resource definition's `DependsOn` property\. This insures that the `AccessControl` resource is processed by AWS CloudFormation after the `ServiceAPI` and `ServiceLambda` resources have been processed\.

To use the service API resources that you add to a `resource-template.json` file, you must upload those resources to AWS\. To upload them, you can use the `lmbr_aws resource‑group upload` command, the `lmbr_aws deployment upload` command, or click **Upload Resources** in the **Resource Manager** feature in Lumberyard Editor\.

## Custom::ServiceApi Resource<a name="cloud-canvas-cgf-service-api-resources-customserviceapi"></a>

The handler for the `Custom::ServiceApi` AWS CloudFormation resource is provided by the Cloud Gem Framework\. This handler creates, updates, and deletes API Gateway REST API, operation, deployment, and stage resources as needed\.

`ServiceApi` resource definitions accept the following parameters:

```
{
    "Resources": {
        ... 
        "ServiceApi": {
            "Type": "Custom::ServiceApi", 
            "Properties": {
                "ServiceToken": { "Ref": "ProjectResourceHandler" }, 
                "ConfigurationBucket": { "Ref": "ConfigurationBucket" }, 
                "ConfigurationKey": { "Ref": "ConfigurationKey" }, 
                "CacheClusterSize": { "Ref": "ServiceApiCacheClusterSize" }, 
                "CacheClusterEnabled": { "Ref": "ServiceApiCacheClusterEnabled" }, 
                "MethodSettings": { ... }, 
                "SwaggerSettings": {
                    "ServiceLambdaArn": { "Fn::GetAtt": [ "ServiceLambda", "Arn" ] }
                }
            },
            ...
```

`ServiceToken`  
Identifies the Lambda function that implements the custom resource handler\.

`ConfigurationBucket`  
Identifies the bucket that contains the uploaded `swagger.json` file\.

`ConfigurationKey`  
Identifies the location in the bucket where the `swagger.json` file is uploaded\.

`CacheClusterSize`  
Provides the API Gateway [cacheClusterSize](https://docs.aws.amazon.com/apigateway/api-reference/link-relation/stage-create/#cacheClusterSize) value when you create or update the API Gateway stage\.

`CacheClusterEnabled`  
Provides the API Gateway [cacheClusterEnabled](https://docs.aws.amazon.com/apigateway/api-reference/link-relation/stage-create/#cacheClusterEnabled) value when your create or update the API Gateway stage\.

`MethodSettings`  
Not implemented\.

`SwaggerSettings`  
Provides values that you insert into the uploaded `swagger.json` file before it is passed to API Gateway\. For example, you can use `$ServiceLambdaArn$` in the `swagger.json` file to insert the value of the `SwaggerSettings` `ServiceLambdaArn` property\. 

The following settings are automatically defined for you:

`ResourceGroupName`  
The name of the resource group that is defined the `ServiceApi` resource\.

`DeploymentName`  
The name of the deployment that the `ServiceApi` resource is in\.

`RoleArn`  
The ARN of the role that grants API Gateway the permission to invoke the `ServiceLambda` \(or other permissions configured by the [Cloud Canvas Resource Manager Security System](cloud-canvas-rm-security.md)\)\.

`Region`  
The AWS [region](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html) where the RESTful API resides\.

`RestApiResourceName`  
The name to use for the API Gateway REST API resource\. API Gateway takes this value from the swagger [infoObject](http://swagger.io/specification/#infoObject) `title` property \(set to `$RestApiResourceName$` in the default `swagger.json` file\)\. This is the stack name of the resource group with the `ServiceApi` logical resource ID appended \(usually `-ServiceApi`\)\.