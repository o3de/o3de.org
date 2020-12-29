# Cloud Gem Framework and Resource Manager Versioning<a name="cloud-canvas-cgf-rm-versioning"></a>

Lumberyard offers a versioning system that makes it easier to update a project from one version of the Cloud Gem Framework and the **Cloud Canvas Resource Manager** to another\. The versioning system has the following advantages:
+ Cloud gems can have separate versions\.
+ Cloud gems can specify the version of Lumberyard that they work with\.
+ The resource manager and Cloud Gem Framework are implemented in directory structures that support versioning\.
+ Lumberyard can provide multiple versions of the Cloud Gem Framework and the resource manager at the same time\.
+ Lumberyard can innovate while still supporting gems that depend on early versions of the framework\.

This document describes these changes at an architectural level\. For concrete steps on updating existing projects and gems to use versioning, see [Updating Projects and Cloud Gems to Version 1\.0\.0 of the Cloud Gem Framework](cloud-canvas-cgf-updating-projects-gems.md)\.

## Versioning Convention<a name="cloud-canvas-cgf-rm-versioning-convention"></a>

Lumberyard gems use a simplified [semantic versioning](http://semver.org/), which defines version numbers in the form *major*\.*minor*\.*revision*\. Lumberyard increments the major version for changes that cause previous code not to work, including any change that breaks the code or configuration that is not directly controlled by the Cloud Gem Framework\.

Every major version change is released by creating a new code base in a new `\dev\Gems\CloudGemFramework\vN` directory, where `N` is the major version number\.

Minor updates replace the code in the `\dev\Gems\CloudGemFramework\vN` directory\. Earlier major versions of the framework continue to be released with Lumberyard for an unspecified amount of time before they are removed from the release\.

## Multiple Versions of the Cloud Gem Framework Gem<a name="cloud-canvas-cgf-rm-versioning-multiple"></a>

The new directory structure in Cloud Gem Framework 1\.0\.0 enables coexistence of multiple versions of the Cloud Gem Framework Gem\. Gem implementation has moved from the `\dev\Gems\CloudGemFramework\` directory to the `\dev\Gems\CloudGemFramework\v<N>\` directory\. The intent is that all nonbreaking changes be made in the `v<Current>` directory\. When breaking changes occur, a `v<Next>` directory is created to contain the updated implementation\. The `v<Current>` directory contents remain either unchanged or updated without breaking changes\. A gem can now have different versions of its `gem.json` file in the `v1` and the `v2` directory, for example\. This enables the gem to specify different versions\. Lumberyard's build and project configuration tools support gems in subdirectories\.

**Note**  
The **Cloud Canvas Resource Manager** now allows gems to be in directories other than `\Gems\<gem-name>`\. The [resource\-group add](cloud-canvas-command-line.md#cloud-canvas-command-line-resource-group-add) `lmbr_aws resource-group add` command's `--gem` option now takes an optional value that specifies the gem directory path\. The specified directory path can be either relative to the current working directory or a full path\.

## Applying Framework Updates to a Project<a name="cloud-canvas-cgf-rm-versioning-applying-framework-updates"></a>

When Lumberyard releases a new major version of the framework, you can choose when to disable the old framework version and when to enable the new one\.

If a minor version of the framework is released and you replace the framework configuration in the `CloudGemFramework\vN` directory, errors will occur\. The errors are displayed in the console when you load your project into Lumberyard Editor\.

After the new version is discovered and enabled, the next step is to update the project's infrastructure in AWS as dictated by the new framework version\. The `lmbr_aws` tool and the Cloud Canvas Resource Manager detect when an upgrade is needed by checking the project's current framework version in two places: the `local-project-settings.json` file and in the project's Amazon S3 configuration bucket\. If either value is not exactly the same as the framework version, the command exits with an error and takes no action\.

To update your project infrastructure, use the `lmbr_aws project update-framework-version` command\. If the `update-framework-version` command detects a framework version change, it performs the following actions :

1. Executes the `before_project_framework_version_change(hook, from_version, to_version)` hook method in plugin `update.py` modules\.

1. Updates the project stack\.

1. Executes the `after_project_framework_version_change(hook, from_version, to_version)` hook method in plugin `update.py` modules\.

1. Saves the new framework version to the `local-project-settings.json` file and to the project configuration bucket in Amazon S3\.

The project's framework version is updated after all hooks are successfully called and all updates completed\.

### Update Deployments Manually<a name="cloud-canvas-cgf-rm-versioning-applying-framework-updates-deployments"></a>

The `lmbr_aws project update-framework-version` command never updates deployment, deployment access, or resource group stacks\. The update hooks can make changes to resource templates, Lambda code, and other items\. However, you must perform all deployment, deployment access and resource group stack updates separately after the `project update-framework-version` command completes\.

To help custom tools deal with old stacks, the framework version that is in effect for the stack is provided by the `FrameworkVersion` template parameter\. If this parameter is not present, the tool should assume that the stack predates version 1\.1\.0 of the framework\.

In the case of a major version change, Lumberyard tools \(including `lmbr_aws`\) can refuse to work with any stack that has not yet been updated\. However, for minor version changes, the tools should continue to work with deployment and resource group stacks that have not yet been updated\.

To update the deployment stack \(and all of its resource group stacks\), you can use the `lmbr_aws` [deployment update](cloud-canvas-command-line.md#cloud-canvas-command-line-deployment-upload) command\. To update the deployment access stack, you can use the [deployment update\-access](cloud-canvas-command-line.md#cloud-canvas-command-line-deployment-update-access) command\.

## Resource Manager Merged into the Cloud Gem Framework Gem<a name="cloud-canvas-cgf-rm-versioning-resource-manager-cgf-gem-merge"></a>

In Lumberyard 1\.10, resource manager functionality has been taken over by the Cloud Gem Framework Gem\. Accordingly, and to allow resource manager to be versioned, the contents of the `\dev\tools\lmbr_aws\` directory have moved to the `dev\Gems\CloudGemFramework\v<N>\ResourceManager\` directory, with the following exceptions:
+ The `\dev\tools\lmbr_aws\` directory still contains the `cli.py` and `gui.py` modules\. These modules are loaded by the `lmbr_aws.cmd` file and the resource manager user interface in Lumberyard Editor\. These modules discover which project is current by looking in the `\dev\bootstrap.cfg` file\. They then look in the project's `\dev\project_name\gems.json` file to get the `Version` value for `CloudGemFramework`\. The modules then forward the request to the corresponding `cli.py` or `gui.py` module for the specified version of the framework\. If no version of the framework is enabled, a warning message that the gem must be enabled is displayed\.
+ The `dev\Tools\lmbr_aws\test\` directory still contains the `RunAllTests.cmd`, `cleanup.cmd`, and Python module files that support them\. The `RunAllTests.cmd` file has been updated to run tests from the `CloudGemFramework\v<N>\` directory\. As new releases occur, the file will be updated to include all versions of the framework\.

## Global Project Code Directories and Project Templates<a name="cloud-canvas-cgf-rm-versioning-project-code-directories-project-templates"></a>

In Cloud Gem Framework 1\.0\.0 \(Lumberyard version 1\.10\), the project code directories and project templates have also changed to support versioning\.

### Project Code Directories<a name="cloud-canvas-cgf-rm-versioning-project-code-directories"></a>

The `\<project>\AWS\project-code` directory formerly contained code for the following Lambda functions:
+ `ProjectPlayerAccessTokenExchangeHandler`
+ `ProjectResourceHandler`
+ `ProjectServiceLambda`

Previously, this Lambda code was copied from the `\dev\tools\lmbr_aws\AWSResourceManager\default-project-content\project-code` directory when the project was created\.

This code is now located in the `\Gems\CloudGemFramework\vN\AWS\lambda-code\` directory in subdirectories divided by Lambda function\.

**Note**  
Using a `<gem>\AWS\project-code` or a `resource-group\<resource-group>\project-code` directory to inject code into the project Lambda function is no longer supported\.

### Project Templates<a name="cloud-canvas-cgf-rm-versioning-project-templates"></a>

The following template files have moved to the `\Gems\CloudGemFramework\vN\ResourceManager\resource_manager\templates` directory\.
+ `deployment-access-template.json`
+ `deployment-template.json`
+ `project-template.json`

When the framework updates a stack, it uses these templates as a base to create the project's actual templates\. Then it uploads the templates to AWS CloudFormation\. 

**Note**  
Starting in Lumberyard 1\.10, you can use extension files to add resources to each of these templates\. For more information, see [Template Extension Files](cloud-canvas-resource-definitions.md#cloud-canvas-template-extension-files)\.

## Sharing Code<a name="cloud-canvas-cgf-rm-versioning-sharing-code"></a>

The `lmbr_aws cloud-gem-framework` [add\-service\-api\-resources](cloud-canvas-command-line-cgf.md#cloud-canvas-command-line-cgf-add-service-api-resources) command adds a service API to a resource group\. Before Lumberyard version 1\.10, it copied the service Lambda code for dispatching service API calls from the `CloudGemFramework\AWS\resource-manager-code\default-resource-group-content\lambda-function-code` directory to the resource group's `lambda-function-code` directory\.

In version 1\.10, Lumberyard adds a general purpose code sharing mechanism\. You can use this mechanism to include a single copy of the service API dispatch code in all the Lambda functions that require it\. For more information, see [Using Shared Code](cloud-canvas-cgf-shared-code.md)\.