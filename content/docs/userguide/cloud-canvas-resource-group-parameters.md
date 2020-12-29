# Resource Manager Resource Group Parameters<a name="cloud-canvas-resource-group-parameters"></a>

Cloud Canvas Resource Manager uses AWS CloudFormation templates to describe the AWS resources needed for a project\. AWS CloudFormation templates can have parameters\. You provide the values for these parameters when a template creates or updates a stack\.

AWS CloudFormation template parameters are useful when you want separate deployments of a resource group to be configured differently\. For example, you could configure an internal test instance of Amazon DynamoDB to use lower throughput than a public instance\.

Follow the steps below to use AWS CloudFormation template parameters for your resource groups\.

**To use template parameters**

1. [Define a parameter in the AWS CloudFormation template](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html)\. You must provide a default value for the parameter\. Be sure not to remove or modify the parameter definitions used by Cloud Canvas \(for example, `ConfigurationBucket` or `ConfigurationKey`\)\.

1. [Reference the parameter](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-ref.html) when you define a resource\. You can use parameters to provide values for resource properties, including passing settings to Lambda functions through the Cloud Canvas [Custom::LambdaConfiguration](cloud-canvas-custom-resources.md#cloud-canvas-custom-resources-lambda-configuration) resource\.

1. Use the `lmbr_aws parameter list`, `parameter set`, and `parameter clear` commands to view and set parameter values\. These commands are described later in this document\.

1. Update \(or create\) the resource group stack using the `lmbr_aws resource-group upload` command, or click **Upload Resources** in the Cloud Canvas Resource Manager window in Lumberyard Editor\.

## Parameter Configuration<a name="cloud-canvas-resource-group-parameters-parameter-configuration"></a>

A project's parameter configuration is stored in a [**project\-settings\.json**](cloud-canvas-resource-deployments.md#cloud-canvas-project-settings) file object in the project's configuration bucket\. The bucket is defined by the project's AWS CloudFormation stack template\.

You can specify parameter values for a specific deployment or for all deployments by using the `*` character as a wildcard in place of a deployment name\. You can also specify parameter values for a specific resource group or for all resource groups by using the `*` in place of a resource group name\. If you provide a parameter value for both a wildcard \(`*`\) entry and a named entry, the value from the named entry overrides the value from the wildcard entry\.

The following table shows the `lmbr_aws` commands for listing, setting, and clearing parameter values\. Your project must be initialized \(that is, a project stack must have been created\) before you can list, set, or clear parameter values\. For usage details, visit the corresponding links in the table\.


****  

| `lmbr_aws` command  | Description  | 
| --- | --- | 
| [parameter list](cloud-canvas-command-line.md#cloud-canvas-command-line-parameter-list) | Lists the parameters currently configured for your project\. | 
| [parameter set](cloud-canvas-command-line.md#cloud-canvas-command-line-parameter-set) | Sets parameter configuration for your project\. | 
| [parameter clear](cloud-canvas-command-line.md#cloud-canvas-command-line-parameter-clear) | Clears the specified parameter configuration for your project\. | 