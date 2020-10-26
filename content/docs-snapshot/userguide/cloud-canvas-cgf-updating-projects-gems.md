# Updating Projects and Cloud Gems to Version 1\.0\.0 of the Cloud Gem Framework<a name="cloud-canvas-cgf-updating-projects-gems"></a>

A cloud gem is a gem that depends on the [Cloud Gem Framework](cloud-canvas-cloud-gem-framework-intro.md)\. Starting in Lumberyard 1\.10 \(and Cloud Gem Framework 1\.0\.0\), [gem versioning support](cloud-canvas-cgf-rm-versioning.md) makes the work of updating Lumberyard cloud gem projects much easier\. However, manual steps are required to update projects and gems that were created before Cloud Gem Framework version 1\.0\.0\.

## Updating Existing Cloud Gem Projects<a name="cloud-canvas-cgf-updating-projects-gems-updating-existing-cloud-gem-projects"></a>

To update an existing cloud gem project, you must update the project's `gems.json` file and runtime configuration\.

**To update an existing Lumberyard project**

1. In the project's `dev\<project-name>\gems.json` file, find the entry for `CloudGemFramework`\. Change the `Version` value to `1.0.0` and the `Path` value to `Gems/CloudGemFramework/v1`, as in the following example\.

   ```
           {
               "Path": "Gems/CloudGemFramework/v1",
               "Uuid": "6fc787a982184217a5a553ca24676cfa",
               "Version": "1.0.0",
               "_comment": "CloudGemFramework"
           },
   ```

1. In a command prompt window, run the following command to update the project's runtime configuration\.

   ```
   dev\Tools\LmbrSetup\Win\lmbr.exe projects populate-appdescriptors -projects <project-name>
   ```

   For more information about `populate-appdescriptors`, see [Projects Commands](lmbr-exe-project.md) in the documentation for [Managing Game Projects with Lmbr\.exe](lmbr-exe.md)\.

### Update the Project's AWS Directory<a name="cloud-canvas-cgf-updating-projects-gems-update-projects-aws-directory"></a>

To update the project's AWS directory, you must delete the project, deployment access, and deployment template files\. But before you delete the template files, you must save any roles or resources that you added\.

**To update the AWS directory**

1. Delete the `<project>\AWS\project-code` directory\. If you have made changes to this code, you must update the `CloudGemFramework\vN\lambda-code` directory content to preserve the changes that you made\.

1. If you added roles or other resources to the `<project>\AWS\project-template.json` file, create a `<project>\AWS\project-template-extensions.json` file and copy those resource definitions into the `project-template-extensions.json` file\.

1. Delete the `<project>\AWS\project-template.json` file\.

1. If you added roles or other resources to the `<project>\AWS\deployment-access-template.json` file, create a `<project>\AWS\deployment-access-template-extensions.json` file and copy those resource definitions into the `deployment-access-template-extensions.json` file\.

1. Delete the `<project>\AWS\deployment-access-template.json` file\.

1. If you added resources to the `<project>\AWS\deployment-template.json` file, create a `<project>\AWS\deployment-template-extensions.json` file and copy those resource definitions into the `deployment-template-extensions.json` file\.

1. Delete the `<project>\AWS\deployment-template.json` file\.

### Update the Project's Resource Group Directories<a name="cloud-canvas-cgf-updating-projects-gems-update-projects-resource-group-directories"></a>

When no Lambda resources exist for a resource group, you can simply remove the resource group's Lambda code directories\.

**To remove Lambda code directories from a project resource group**

1. For each `<project>\AWS\resource-group\<resource-group-name>` directory, check whether its `resource-template.json` file defines AWS Lambda function resources\.

1. If the `resource-template.json` file does not define any Lambda resources, delete the following directories:
   + `<project>\AWS\resource-group\<resource-group-name>\lambda-function-code`
   + `<project>\AWS\resource-group\<resource-group-name>\<lambda-name>-lambda-code `

1. If the `resource-template.json` file defines AWS Lambda function resources, perform the steps described in [Updating Lambda Code](#cloud-canvas-cgf-updating-projects-gems-updating-lambda-code)\.

## Updating Existing Cloud Gems<a name="cloud-canvas-cgf-updating-projects-gems-updating-existing-cloud-gems"></a>

To update an existing cloud gem, you must update the gem's `gem.json` file and either remove its Lambda code directories or update its Lambda code\.

**To update an existing cloud gem**

1. In the `<gem>\gem.json` file, find the entry for `CloudGemFramework`\. Change `VersionConstraints` to the following value\.

   ```
   "VersionConstraints": [ "~>1.0" ],
   ```

1. If the `<gem>\AWS\resource-template.json` file does not exist or does not define any AWS Lambda function resources, delete the `<gem>\AWS\lambda-function-code` directory and any `<gem>\AWS\<lambda-name>-lambda-code` directories\. Otherwise, perform the steps in [Updating Lambda Code](#cloud-canvas-cgf-updating-projects-gems-updating-lambda-code)\.

### Updating Lambda Code<a name="cloud-canvas-cgf-updating-projects-gems-updating-lambda-code"></a>

Updating Lambda code involves reorganizing your existing Lambda code directories and creating `.import` files as needed\. For information on the reasons for this directory restructuring, see [ Cloud Gem Framework and Resource Manager Versioning](cloud-canvas-cgf-rm-versioning.md)\.

**To update your Lambda code**

1. For each of the following Lambda code directories, perform the steps that follow\.
   + `<project>\AWS\resource-group\<resource-group-name>\lambda-function-code`
   + `<project>\AWS\resource-group\<resource-group-name>\<lambda-name>-lambda-code`
   + `<gem>\AWS\lambda-function-code`
   + `<gem>\AWS\<lambda-name>-lambda-code`

1. If the code directory contains the `service.py` and `errors.py` files that support service API dispatching, delete them and add an `.import` file with the following content to the directory:

   ```
   CloudGemFramework.LambdaService
   ```

1. If the code directory contains a `CloudCanvas` subdirectory, delete the subdirectory\. If you did not have to create an `.import` file in step 2, add an `.import` file that has the following content:

   ```
   CloudGemFramework.LambdaSettings
   ```

   If you already created an `.import` file in step 2, add `CloudGemFramework.LambdaSettings` to the `.import` file, as in the following example:

   ```
   CloudGemFramework.LambdaService
   CloudGemFramework.LambdaSettings
   ```

1. Move the contents of the code directory \(along with the new `.import` file, if any\) into a `<parent-dir>\lambda-code\<lambda-name>` directory\. Note the following:
   + If you had code for multiple Lambda functions in the single `lambda-function-code` directory, decide which modules to put into the subdirectory of the `lambda-code` directory, and place them there\.
   + If you have code that is used by multiple Lambda functions, put that code in a `<parent-dir>\common-code\<import-name>` directory\. To include the code with the rest of the Lambda code when it is uploaded, use an `.import` file\.

For more information about these changes, see [ Cloud Gem Framework and Resource Manager Versioning](cloud-canvas-cgf-rm-versioning.md)\.