# Resource Type Specification<a name="cloud-canvas-cgf-adding-aws-resources-resource-type-specification"></a>

Resource types are specified in a Cloud Canvas `project-template.json` file\. For types that Cloud Canvas natively supports, the file is located at `Gems\CloudGemFramework\version\AWS\project-template.json`\. The existing resource is named `CoreResourceTypes`\.

**Note**  
You should not interact with this file\. You are not prevented from modifying this file to support new types or even change the support for existing types\. However, your changes are not received or usable by others with whom you share your gem\.

The template file for new types that you want to add support for in your gem is located at `lumberyard_version\dev\Gems\gem_name\AWS\project_template.json`\.

Resources are specified in the template as follows:

```
{
    "Resources": {
        "<resource-name>": {
            "Type": "Custom::ResourceTypes",
            "Properties": {
                "ServiceToken": {
                    "Fn::GetAtt": [
                        "ProjectResourceHandler",
                        "Arn"
                    ]
                },
                "LambdaConfiguration": <lambda-configuration>,
                "LambdaTimeout": <seconds>,
                "Definitions": {
                    <definition>,
                    <definition>,
                    ...
                }
            }
        },
        "<lambda-resource-name>": <lambda-resource-definition>
    }
}
 
<lambda-configuration> := {
    "Fn::GetAtt": {
        [ "<lambda-resource-name>", "ComposedLambdaConfiguration" ]
    }
}
 
<definition> := 
    "<type-name>": {
        "PermissionMetadata": {
            "RestrictActions": [ "<action>", "<action>", ... ],
            "DefaultRoleMappings": [
                <role-mapping>,
                <role-mapping>,
                ...
            ]
        },
        "ArnFormat": "<arn-format>",
        "ArnFunction": <lambda-function-spec>,
        "HandlerFunction": <lambda-function-spec>,
        "DisplayInfo": {
            "AWSConsoleUrls": [
                <console-url>
            ]
        }
    }
 
<console-url> := {
    "Label": "<label>",
    "Url": "<url>"
}
 
<lambda-function-spec> := {
    "Function": "<function-handler>",
    "HandlerPolicyStatement": [
        <policy>,
        <policy>,
        ...
    ],
}
 
<lambda-resource-definition> := {
    "Properties": {
        "ConfigurationBucket": {
            "Ref": "Configuration"
        },
        "ConfigurationKey": {
            "Ref": "ConfigurationKey"
        },
        "FunctionName": "<lambda-folder-name>",
        "Runtime": "python3.7",
        "ServiceToken": {
            "Fn::GetAtt": [
                "ProjectResourceHandler",
                "Arn"
            ]
        }
    },
    "Type": "Custom::LambdaConfiguration"
}
```

## Values to Specify<a name="cloud-canvas-cgf-adding-aws-resources-values-to-specify"></a>

Replace the following items in the template with your own values as required\.


****  

| Item | Description | 
| --- | --- | 
| <resource–name> |  Specifies a custom name for the resource\. The name must be unique in the template\.  | 
| <lambda–resource–name>  |  Specifies the name of a `Custom::LambdaConfiguration` element that you include to provide Lambda code for your types\. This entry is required if you specify either the `ArnFunction` or `HandlerFunction` entries\.  | 
| <lambda–timeout> |  Specifies the timeout, in seconds, to apply to the specified `ArnFunction` or `HandlerFunction` entries\.  | 
| <lambda‑directory‑name>  |  Specifies the name of a subdirectory to add to your gem's `\AWS\project-code\lambda-code` directory\. This subdirectory contains Lambda code that is required for the `ArnFunction` or `HandlerFunction` entries\.  | 
| <type–name> |  Specifies a AWS CloudFormation type in the `AWS::` namespace or a custom type that is prefixed with `Custom::`\.  | 

## Elements in the Type Definition<a name="cloud-canvas-cgf-adding-aws-resources-elements-in-the-type-definition"></a>

This section describes the other elements in a type definition\.

### PermissionMetadata<a name="cloud-canvas-cgf-adding-aws-resources-permissionmetadata"></a>

Optional\. Contains the metadata configuration information for an instance of the type that controls permissions\.


****  

| Item | Description | 
| --- | --- | 
| <action>  | Specifies an [IAM action](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_actionsconditions.html) that instances of the resource type are permitted to have in the role that is created for them\. Wildcards are permitted\. | 
| <role‑mapping> | Specifies a default [Cloud Canvas role mapping](cloud-canvas-built-in-roles-and-policies.md#cloud-canvas-rm-security-roles-policies-role-mapping-metadata) to apply to instances of this type\. | 

### ArnFormat<a name="cloud-canvas-cgf-adding-aws-resources-arnformat"></a>

Required if `ArnFunction` is not specified\. Specifies the ARN for instances of the resource in the *<arn–format>* format string\. The following substitutions are allowed:


****  

| Item | Description | 
| --- | --- | 
| <region> | Specifies the region of the AWS CloudFormation stack\. | 
| <account–id>  | Specifies the AWS account ID\. | 
| <resource‑name> | Specifies the physical resource ID of the resource instance\. | 

The following example specifies the ARN for a Lambda function:

```
arn:aws:lambda:<region>:<account-id>:function:<resource-name>
```

### ArnFunction<a name="cloud-canvas-cgf-adding-aws-resources-arnfunction"></a>

Required if `ArnFormat` is not specified\. Specifies a module and function to retrieve the ARN for the resource\.


****  

| Item | Description | 
| --- | --- | 
| <function‑handler>  | Specifies a reference to a function in the string format: Module\.Function\. The module must be located in the resource\_types subdirectory of your gem's ServiceLambda directory\. | 
| <policy> | Specifies an [IAM policy statement](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html#Statement) that specifies the permissions that the Lambda function requires to execute\. The HandlerPolicyStatement can be omitted if the Lambda function requires no permissions\. | 

`ArnFunction` is required by some resources that do not have an ARN that can be computed from the substitutions in `ArnFormat`, such as an Amazon SQS queue\. An Amazon SQS queue requires a call to the `GetQueueAttributes` API to obtain its ARN\. `ArnFunction` supports the same substitutions as `ArnFormat`\.

**Note**  
Be sure that you specify any required permissions for your function in the `HandlerPolicyStatement` element of the `PermissionMetadata` field\. These permissions are shared with the `HandlerFunction` if one exists\.

### HandlerFunction<a name="cloud-canvas-cgf-adding-aws-resources-handlerfunction"></a>

Required if the type begins with `Custom::`\. Specifies a module and function that runs custom code in response to the `Create`, `Update,` and `Delete` events of the custom resource\.


****  

| Item | Description | 
| --- | --- | 
| <function‑handler>  | Specifies a reference to a function in the string format: Module\.Function\. This module must be located in the resource\_types subdirectory of your gem's ServiceLambda directory\. | 
| <policy>  | Specifies an [IAM policy statement](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html#Statement) that specifies the permissions that the Lambda function requires to execute\. The HandlerPolicyStatement can be omitted if the Lambda function requires no permissions\. | 

Custom resources \(that is, entries in the `Resources` section of the form `"Type": "Custom::<name>"`\) should define their `ServiceToken` to point to the Cloud Canvas `ProjectResourceHandler`\. The `ProjectResourceHandler` dispatches the events to your module so that your custom code can run with the correct permissions\.

Be sure to specify any required permissions for your function in the `HandlerPolicyStatement` element of the `PermissionMetadata` field\. These permissions are shared with the `ArnFunction` if it exists\. Custom resource handlers process the events [as defined by AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/crpg-ref-requests.html)\.

### DisplayInfo<a name="cloud-canvas-cgf-adding-aws-resources-displayinfo"></a>

Optional\. Contains user interface information to display\. Currently, this consists exclusively of *<console\-url>*, which has a *<label>* and a *<url>*\. The *<url>* is relative to https://console\.aws\.amazon\.com/ and can use the same substitutions as `ArnFormat`\.

The following example specifies links to view resources in the AWS Management Console and in CloudWatch Logs\.

```
"AwsConsoleUrls": [
        {
        "Label": "View resource in AWS console",
        "Url":
          "/lambda/#/functions/<resource-name>"
        },
        {
        "Label": "View CloudWatch Logs",
        "Url":
          "/cloudwatch/?#logStream:group=/aws/lambda/<resource-name>"
        }
        ]
```