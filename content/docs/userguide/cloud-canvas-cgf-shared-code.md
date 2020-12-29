# Using Shared Code<a name="cloud-canvas-cgf-shared-code"></a>

The `lmbr_aws cloud-gem-framework` [add\-service\-api\-resources](cloud-canvas-command-line-cgf.md#cloud-canvas-command-line-cgf-add-service-api-resources) command adds a service API to a resource group\. Prior to Lumberyard version 1\.10, it copied the service Lambda code for dispatching service API calls from the `CloudGemFramework\AWS\resource-manager-code\default-resource-group-content\lambda-function-code` directory to the resource group's `lambda-function-code` directory\.

In version 1\.10, Lumberyard adds a general purpose code sharing mechanism\. You can use this mechanism to include a single copy of the service API dispatch code in all the Lambda functions that require it\. Place the code to be shared in a subdirectory of a gem's `AWS\common-code` directory\. The subdirectory name is the name of the code package\.

An `.import` file can be found in a gem's AWS directory or a project's resource group directory\. The file can be placed any of the following directories to indicate that the code depends on a set of specified packages:
+ `lambda-code\<lambda-name>\`
+ `lambda-function-code\`
+ `<lambda-name>-lambda-code\`
+ `resource-manager-code\`
+ `common-code\<package-name>\`

You can use the `common-code\<package-name>\` directory to add dependencies recursively\. The `lambda-code\<lambda-name>\` directory is new in Lumberyard 1\.10\. For more information about this directory, see [Lambda Code Directories](cloud-canvas-resource-definitions.md#cloud-canvas-resource-definitions-lambda-code-directory)\.

The`.import` file has the following format:

```
<gem-name>.<package-name>
<gem-name>.<package-name>
...
```

The entries in the `.import` file instruct the Cloud Gem framework to include the contents of the specified gem's `AWS\common-code\<package-name>` directory\. For Lambda code, the contents of the directory are included in the `.zip` file that contains other Lambda code\. When resource manager loads the code specified by `sys.path` \(the Python default module search path, or `PYTHONPATH`\), the `resource-manager-code` directory is included in that path\.

The service API dispatch code can be found at `Gems\CloudGemFramework\v<N>\AWS\common-code\LambdaService`\. The `Gems\CloudGemFramework\v<N>\AWS\common-code\LambdaSettings` directory contains code for accessing injected settings\.