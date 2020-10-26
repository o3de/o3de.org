# Custom Resources<a name="cloud-canvas-custom-resources"></a>

Cloud Canvas provides a number of [AWS CloudFormation custom resources](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-custom-resources.html) that can be used in the AWS CloudFormation template files for the project, deployment, and resource group\. These custom resources are implemented by the Lambda function code found in the `dev\{game}\AWS\project-code` directory and the `ProjectResourceHandler` resource defined in the `dev\{game}\AWS\project-template.json` file\. Rather than static entities, these resources act more like library functions\. Each custom resource has input and output properties\.

A summary list of custom resources follows\.
+ [CognitoIdentityPool](#cloud-canvas-custom-resources-cognito-identity-pool) – Manages Amazon Cognito identity pool resources\. 
+ [CognitoUserPool](#cloud-canvas-custom-resources-cognito-user-pool) – Manages Amazon Cognito user pool resources\.
+ [EmptyDeployment](#cloud-canvas-custom-resources-empty-deployment) – Used in the `deployment-template.json` when there are no resource groups defined\.
+ [ResourceGroupConfiguration](#cloud-canvas-custom-resources-resource-group-configuration) – Provides configuration data for a resource\-group's AWS CloudFormation stack resource\.
+ [LambdaConfiguration](#cloud-canvas-custom-resources-lambda-configuration) – Provides configuration data for Lambda function resources and maintains the Lambda function's execution role\.
+ [Helper](#cloud-canvas-custom-resources-helper) – Provides convenience functions for use in templates\. 
+ [Cloud Gem Framework Service API](cloud-canvas-cgf-service-api.md) – Provides programmatic access to cloud gem functionality that you can use to implement cloud\-connected features in your game\.

For information on controlling access to resources, see [Controlling Access to Resources](cloud-canvas-setting-access-permissions.md)\.

## CognitoIdentityPool<a name="cloud-canvas-custom-resources-cognito-identity-pool"></a>

The `Custom::CognitoIdentityPool` resource is used in the `deployment-access-template.json` file to create and configure Amazon Cognito identity pool resources\.

### Input Properties<a name="cloud-canvas-custom-resources-cognito-identity-pool-input-properties"></a>
+ `ConfigurationBucket`

  Required\. The name of the Amazon S3 bucket that contains the configuration data\.
+ `ConfigurationKey`

  Required\. The Amazon S3 object key prefix where project configuration data is located in the configuration bucket\. This property causes the custom resource handler to be executed by AWS CloudFormation for every operation\.
+ `IdentityPoolName`

  Required\. The name of the identity pool\.
+ `UseAuthSettingsObject`

  Required\. Must be either `true` or `false`\. Determines whether the Amazon Cognito identity pool is configured to use the authentication providers that were created from the `add-login-provider` command\.
+ `AllowUnauthenticatedIdentities`

  Required\. Must be either `true` or `false`\. Determines whether the Amazon Cognito identity pool is configured to allow unauthenticated identities\. See [Identity Pools](https://docs.aws.amazon.com/cognito/latest/developerguide/identity-pools.html) for more information on Amazon Cognito's support for authenticated and unauthenticated identities\. 
+ `Roles`

  Optional\. Determines the IAM role assumed by authenticated and unauthenticated users\. See [ SetIdentityPoolRoles](https://docs.aws.amazon.com/cognitoidentity/latest/APIReference/API_SetIdentityPoolRoles.html) for a description of this property\.

### Output Properties<a name="cloud-canvas-custom-resources-cognito-identity-pool-output-properties"></a>
+ `IdentityPoolName`

  The name of the identity pool \(same as the `IdentityPoolName` input property\)\.
+ `IdentityPoolId`

  The physical resource name of the identity pool\.

## CognitoUserPool<a name="cloud-canvas-custom-resources-cognito-user-pool"></a>

The `Custom::CognitoUserPool` resource is used in the [Player Account Cloud Gem Portal](cloud-canvas-cloud-gem-player-account.md) `resource-template.json` file to create and configure Amazon Cognito user pool resources\. You can use this resource to add Amazon Cognito user pools and link them to an Amazon Cognito identity pool\.

### Input Properties<a name="cloud-canvas-custom-resources-cognito-user-pool-input-properties"></a>
+ `PoolName`

  Required\. The name of the user pool\.
+ `ConfigurationKey`

  Required\. The Amazon S3 object key prefix where project configuration data is located in the configuration bucket\. This property causes the custom resource handler to be executed by AWS CloudFormation for every operation\.
+ `ServiceToken`

  Required\. The handler for this custom resource type\.
+ `ClientApps`

  Required\. A list of client apps to be created for the user pool\. At least one must be provided\.
+ `LambdaConfig`

  Optional\. A map of a Lambda trigger name to a Lambda function ARN\. This map is passed to the Amazon Cognito `CreateUserPool` API when a user pool is created and to the Amazon Cognito `UpdateUserPool` API when a user pool is updated\. 

### Metadata: Linking a User Pool to an Identity Pool<a name="cloud-canvas-custom-resources-cognito-user-pool-metadata"></a>

To link a `Custom::CognitoUserPool` to a `Custom::CognitoIdentityPool`, you add an `Identities` section to the `Metadata CloudCanvas` section, as in the following example\.

```
"Metadata": {
    "CloudCanvas": {
        "Identities": [
            {
                "IdentityPoolName": "PlayerAccess",
                "ClientApp": "DefaultClientApp"
            }
        ]
    }
}
```

The handler for `Custom::CognitoIdentityPool` looks for this metadata on `Custom::CognitoUserPool` resources when it configures the identity pool\. The `IdentityPoolName` in the user pool's metadata must match the `IdentityPoolName` in the identity pool's properties\. `ClientApp` must be one of the apps listed in the user pool's `ClientApps` property\.

### Output Properties<a name="cloud-canvas-custom-resources-cognito-user-pool-output-properties"></a>
+ `UserPoolName`

  The name of the user pool\.
+ `UserPoolId`

  The ID of the user pool\.
+ `ClientApps`

  A list that contains the `ClientId `and `ClientName` of each of the user pool's client apps\.
+ `PhysicalResourceId`

  The physical resource ID of the user pool\.

## EmptyDeployment<a name="cloud-canvas-custom-resources-empty-deployment"></a>

The `Custom::EmptyDeployment` resource is used in the `deployment-template.json` file when there are no resource groups defined\. This is necessary to satisfy the AWS CloudFormation requirement that a template define at least one resource\.

This resource supports no input or output properties\.

## ResourceGroupConfiguration<a name="cloud-canvas-custom-resources-resource-group-configuration"></a>

The `Custom::ResourceGroupConfiguration` resource is used in the `deployment-template.json` to identify the location of the copy of the `resource-template.json` file in the configuration bucket that should be used for a specific resource group\.

### Input Properties<a name="cloud-canvas-custom-resources-resource-group-configuration-input-properties"></a>
+ `ConfigurationBucket`

  Required\. The name of the Amazon S3 bucket that contains the configuration data\.
+ `ConfigurationKey`

  Required\. The Amazon S3 object key prefix where the deployment configuration data is located in the configuration bucket\.
+ `ResourceGroup`

  Required\. The name of the resource group that is to be configured\.

### Output Properties<a name="cloud-canvas-custom-resources-resource-group-configuration-output-properties"></a>
+ `ConfigurationBucket`

  The name of the Amazon S3 bucket that contains the configuration data\. This is always the same as the `ConfigurationBucket` input property\.
+ `ConfigurationKey`

  The Amazon S3 object key prefix where the specified resource group's configuration data is located in the configuration bucket\. This is the input `ConfigurationKey` with the string `ResourceGroup` and the value of `ResourceGroup` appended\.
+ `TemplateURL`

  The Amazon S3 URL of the resource group's copy of the `resource-template.json` in the configuration bucket\. This value should be used as the resource group's `TemplateURL` property value\.

## LambdaConfiguration<a name="cloud-canvas-custom-resources-lambda-configuration"></a>

The `Custom::LambdaConfiguration` resource is used in `resource-template.json` files to provide configuration data for Lambda function resources\.

### Input Properties<a name="cloud-canvas-custom-resources-lambda-configuration-input-properties"></a>
+ `ConfigurationBucket`

  Required\. The name of the Amazon S3 bucket that contains the configuration data\.
+ `ConfigurationKey`

  Required\. The Amazon S3 object key prefix where configuration data for the resource group is located in the configuration bucket\.
+ `FunctionName`

  Required\. The friendly name of the Lambda function resource being configured\. 
+ `Settings`

  Optional\. Values that are made available to the Lambda function code\.
+ `Runtime`

  Required\. Identifies the runtime used for the Lambda function\.

### Output Properties<a name="cloud-canvas-custom-resources-lambda-configuration-output-properties"></a>
+ `ConfigurationBucket`

  The name of the Amazon S3 bucket that contains the configuration data\. This is always the same as the `ConfigurationBucket` input property\.
+ `ConfigurationKey`

  The Amazon S3 object key prefix where the specified function's zipped code is located in the configuration bucket\.
+ `Runtime`

  The Lambda runtime used by the function\. This is always the same as the input `Runtime` property value\.
+ `Role`

  The ID of the Lambda function execution created for this function\.

For information on how the `LambdaConfiguration` custom resource is used to allow Lambda functions to perform specified actions on specific project resources, see [Controlling Access to Resources](cloud-canvas-setting-access-permissions.md)\.

## Helper<a name="cloud-canvas-custom-resources-helper"></a>

The `Custom::Helper` resource is used in templates to perform simple tasks similar to those performed by AWS CloudFormation's [Intrinsic Functions](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference.html)\.

### Input Properties<a name="cloud-canvas-custom-resources-helper-input-properties"></a>
+ `Input`

  Provides a JSON object that is processed by the custom resource handler\.

### Output<a name="cloud-canvas-custom-resources-helper-output-properties"></a>

The output is the processed version of the JSON object that is provided by the `Input` property\.

### Helper Function<a name="cloud-canvas-custom-resources-helper-functions"></a>

The `Helper` resource supports the following function\. The function is applied to the `Input` property value by resource handler to produce its output\.

#### HelperFn::LowerCase<a name="cloud-canvas-custom-resources-helper-functions-lower-case"></a>

Converts a string to lowercase\.

Syntax

```
{ "HelperFn::LowerCase" : "converted-string-value" }
```

**Example**  
The following example from the `project-template.json` file uses `HelperFn::LowerCase` to lower the case of a stack name\.

```
{
    ...
    "Resources": {
    ...
        "Helper": {
            "Type": "Custom::Helper",
            "Properties": {
                "Input": {
                    "LowerCaseStackName": { "HelperFn::LowerCase": { "Ref": "AWS::StackName" } }
                },
                "ServiceToken": ...
            }
        },
    ...
            { "Fn::Join": [ "", [ "arn:aws:s3:::", { "Fn::GetAtt": [ "Helper", "LowerCaseStackName" ] }, "-*" ] ] }
    ...
}
```