# Versioning of Custom Resources<a name="cloud-canvas-cgf-adding-aws-resources-versioning"></a>

In Lumberyard 1\.15 and earlier versions, the most recent version of Lambda code was used to process custom resource instance events\. This caused rollback issues when existing resources were processed by newer versions of the same code\.

Starting in Lumberyard version 1\.16, custom resources are locked by default to the version of the code that you used to create the resources\. If the code changes and an existing resource instance is updated or deleted, the same version of the code that created the resource processes the event\.

When new custom resource code is deployed, it does not replace the older code\. Resources that are created with the new code will be tied to the new code version\.

## Version Coercion<a name="cloud-canvas-cgf-adding-aws-resources-versioning-version-coercion"></a>

If necessary, you can override the locking of a custom resource to the version of the code with which it was created\. To specify a different Lambda function version for a custom resource instance's update and delete events, specify a value for `CustomResourceVersion` in the Cloud Canvas metadata that you have obtained from the [AWS Lambda console](https://console.aws.amazon.com/lambda/)\.

**Example**  
The following code specifies a value of `3` for `CustomResourceVersion`\.  

```
"MyCustomResource": {
    "Metadata": {
        "CloudCanvas": {
            "CustomResourceVersion": "3"
        }
    },
    "Type": "Custom::MyCustomType",
    "Properties": {
        "ServiceToken": {
            "Ref": "ProjectResourceHandler"
        }
    }
}
```

After you make this change, the specified version of the Lambda function will process the resource the next time that the resource is updated or deleted\.

Removing the `CustomResourceVersion` metadata entry restores the default behavior of using the version that created the resource\. Therefore, if you want a custom resource to always use a newer version of a handler, you must always specify a value for `CustomResourceVersion`\.

**Warning**  
Coercing a custom resource to process events with code different from the code that instantiated the resource exposes the resource group to risk of rollback failure\. You are responsible for determining the version of the Lambda function that you want your instance to use\. You can find the version from the AWS Lambda console\.

**Note**  
You can specify `$LATEST` as the value for `CustomResourceVersion`\. However, this replicates the unsafe behavior in previous versions of Lumberyard of using the most recent Lambda code version to process custom resource instance events\. This practice is not recommended for environments where failed stack updates cannot be tolerated\.

## Retention of Lambda Functions<a name="cloud-canvas-cgf-adding-aws-resources-versioning-retention-of-lambda-functions"></a>

Prior to Lumberyard version 1\.16, if you deleted a type definition and then updated your project stack, the Lambda functions associated with the type definition were also deleted\. These functions might include custom resource handler Lambda or ARN handler Lambda functions\.

This behavior could result in rollback errors and a potentially unrecoverable stack when you tried to update instances of the resource type\. For this reason, Lambda functions associated with resource types now remain in your account indefinitely and are deleted only when the project is deleted\.

**Note**  
Lambda functions are deleted in AWS only when you run `lmbr_aws project delete`\. If you delete your project stack locally but not in AWS, the Lambda functions associated with your resource types will remain\. To delete them, you can use the AWS console or the [Cloud Canvas cleanup tool](cloud-canvas-administration-aws-resource-cleanup.md#cloud-canvas-administration-aws-resource-cleanup-tool)\. Because the cleanup tool can be very destructive, use it with caution, and do not use it on production deployments\.

## Removing Unused Custom Resource Code<a name="cloud-canvas-cgf-adding-aws-resources-versioning-removing-unused-custom-resource-code"></a>

As you develop new custom resources or upgrade existing ones, Lambda function versions that are no longer referenced by any instances can remain in your AWS account\. In most cases, the existence of these orphaned Lambda functions should not affect your AWS account's [Lambda Limits](https://docs.aws.amazon.com/lambda/latest/dg/limits.html)\.

However, if you need to remove such instances, you can run the following command:

```
lmbr_aws project clean-custom-resources
```

This command deletes all custom resource Lambda functions in a project that satisfy the following criteria:
+ The function is not the most recent version\.
+ No existing custom resource instances were created using that version\.
+ No custom resource instances are currently using that version through the [version coercion](#cloud-canvas-cgf-adding-aws-resources-versioning-version-coercion) technique\.

## Physical IDs<a name="cloud-canvas-cgf-adding-aws-resources-versioning-physical-ids"></a>

Previously, the `PhysicalResourceId` that a custom resource handler returned was the same as the physical ID of the resource in its AWS CloudFormation stack\.

With the advent of versioning in Lumberyard 1\.16, custom resources embed their own version information in AWS CloudFormation's `PhysicalResourceId`\. If you are writing a Lambda function and need to extract the embedded ID from the AWS CloudFormation physical ID, use the `get_embedded_physical_id` function, as in the following example\.

```
from cgf_utils import custom_resource_utils 
actual_physical_id = custom_resource_utils.get_embedded_physical_id(stack_physical_id)
```

To access this module, make sure the `.import` file in your Lambda function directory includes `CloudGemFramework.Utils`\.

For source code, see the `lumberyard_version\dev\Gems\CloudGemFramework\vN\AWS\common-code\Utils\cgf_utils\cgf_utils.custom_resource_utils.py` module\.

## ARN Handlers<a name="cloud-canvas-cgf-adding-aws-resources-versioning-arn-handlers"></a>

Unlike custom resource handlers, ARN handlers are not version\-locked\. Determining an ARN is typically a simple operation that does not require versioning\.

## Backwards Compatibility<a name="cloud-canvas-cgf-adding-aws-resources-versioning-backwards-compatibility"></a>

Custom resources that were instantiated in Lumberyard projects prior to 1\.16 will continue to use the most recent version of the custom resource Lambda code to process their update and delete events\. If you want the safety benefits of versioning, you must delete existing custom resource instances and recreate them\.