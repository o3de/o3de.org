# Resource Definitions<a name="cloud-canvas-resource-definitions"></a>

Resource definitions for your game project are AWS CloudFormation template files that determine the resources \(for example, DynamoDB databases, Lambda functions, and access control information\) that will be created in AWS for the game\. Game code uses AWS resources and expect those resources to exist and to be configured in a specific way\. The resource definitions determine this architecture and configuration\.

## Game Resource Definitions<a name="cloud-canvas-resource-definitions-location"></a>

A description of the resources required by the game is stored in files under the `dev\{game}\AWS` directory, where `dev` is the Lumberyard installation `\dev` subdirectory and *\{game\}* is the directory identified by the `sys_game_folder` property in the \\`dev\bootstrap.cfg` file\. For example, if your game is the Samples Project, your resource definition path might be `C:\lumberyard_version\dev\SamplesProject\AWS`\. These files should be checked into the project's source control system along with your other game code and data\.

The default *\{game\}*`\AWS` directory contents are created by the `lmbr_aws` [project create](cloud-canvas-command-line.md#cloud-canvas-command-line-project-create) command\.

In addition, some user\-specific configuration data is kept in the `dev\Cache\{game}\{OS}\user\AWS` directory\. The contents of this directory should not be checked into the project's source control system\.

The following shows the contents of these `AWS` directories\. 

```
dev\{game}\AWS\
    resource-group\
        {resource-group-name}\
            lambda-function-code\
                (Lambda function Code)
            resource-template.json
    local-project-settings.json
 
dev\Cache\{game}\{OS}\user\AWS\
    user-settings.json
```

The `.json` files are described in the following sections\.

### resource\-group\\*\{resource\-group\}* Directory<a name="cloud-canvas-resource-group-subdirectories"></a>

The AWS resources used by the game are organized into separate resource groups\. The `resource-group` directory contains these in individual `{resource-group}` subdirectories\. Each `{resource-group}` subdirectory is typically named after your game project and can contain a `lambda-function-code` directory and a `resource-template.json` file\.

#### The lambda\-function\-code Directory<a name="cloud-canvas-lambda-function-code-subdirectory"></a>

The `lambda-function-code` subdirectory is present when a resource template defines [Lambda function](https://docs.aws.amazon.com/lambda/latest/dg/) resources\. This directory can contain source files that implement those functions\. Lumberyard uploads the code from this directory when using the template to update the AWS CloudFormation stack\.

**Note**  
Use of the `lambda-function-code` directory is deprecated\. For more information, see [Lambda Code Directories](#cloud-canvas-resource-definitions-lambda-code-directory)\.

#### resource\-template\.json<a name="cloud-canvas-resource-template"></a>

A `resource-template.json` file is an [AWS CloudFormation template](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-guide.html) that defines the AWS resources associated with each resource group\. You can specify any AWS resource type supported by AWS CloudFormation in your `resource-template.json` file\. For a list of the available resource types, see the AWS CloudFormation [AWS Resource Types Reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html)\.

To determine the resource group stacks to include in a deployment, Lumberyard reads the `resource-template.json` files in `AWS\resource-group` subdirectories and in the `AWS` subdirectories of enabled cloud gems\. Following are two examples\.

```
\dev\CloudGemSamples\AWS\resource-group\CloudGemAWSBehavior\resource-template.json
\dev\Gems\CloudGemMessageOfTheDay\AWS\resource-template.json
```

#### **local\-project\-settings\.json**<a name="cloud-canvas-local-project-settings"></a>

The `dev\<project name>\AWS\local-project-settings.json` file contains a `ProjectStackId` identifier that points to AWS, the Cloud Gem Framework version number, and a list of any resource groups that have been disabled for the project\. The following example shows the format of the `local-project-settings.json` file for the Cloud Gem Samples project:

```
{
    "ProjectStackId": "arn:aws:cloudformation:{aws-region}:{aws-access-id}:stack/CloudGemSamples/{uuid}", 
    "DisabledResourceGroups": [], 
    "FrameworkVersion": "1.1.1"
}
```

**Note**  
Prior to Lumberyard 1\.11, the `local-project-settings.json` file kept a list of *enabled* resource groups\. By default, all of a cloud gem's resource groups are enabled when the cloud gem is enabled\. Listing only the disabled resource groups makes it easier to identify them for debugging\. See [resource\-group disable](cloud-canvas-command-line.md#cloud-canvas-command-line-resource-group-disable)\.

**Note**  
As of Lumberyard 1\.8, the `project-settings.json` file is stored in the project's [Configuration Bucket](cloud-canvas-resource-deployments.md#cloud-canvas-configuration-bucket)\. The bucket is defined by the project's AWS CloudFormation stack template\.

##### ProjectStackId Property<a name="cloud-canvas-local-project-settings-stackid-property"></a>

The `ProjectStackId` property identifies the [AWS CloudFormation stack](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacks.html) for the project\. This stack contains the resources used by Cloud Canvas to manage your Lumberyard project\. Initially, the `ProjectStackId` property is not present in the `local-project-settings.json` file\. After the project stack is created, the `ProjectStackId` property is written to the file and is the project's AWS CloudFormation stack ID \.

The `ProjectStackId` property is set by the [project create](cloud-canvas-command-line.md#cloud-canvas-command-line-project-create) command\. If for some reason you want to associate the project with an existing project stack, you can use the AWS Management Console to look up the stack's ARN and paste it into the `local-project-settings.json` file \(navigate to AWS CloudFormation, select the stack, select **Overview**, and then copy the value of the `Stack Id` property\)\.

#### user\-settings\.json<a name="cloud-canvas-user-settings"></a>

The `user-settings.json` file contains user\-specific configuration data\. The file is created on the first run of the Cloud Canvas Resource Manager or the first time that `lmbr_aws` is run on a project\. 

**File Location**  
The `user-settings.json` file is found at `dev\Cache\{game}\{OS}\user\AWS\user-settings.json`\. It is not in the `dev\{game}\AWS` directory along with the other files described in this section because it should not be checked into the project's source control system\.

**Default AWS Profile**  
The `DefaultProfile` section of the `user-settings.json` file contains the AWS profile that the `lmbr_aws` command uses for the project\. To set the profile for a Cloud Canvas project, use the following command:

```
lmbr_aws profile default --set profile_name
```

For more information, see [profile default](cloud-canvas-command-line.md#cloud-canvas-command-line-profile-default)\.

## Project Template Files<a name="cloud-canvas-project-template-files"></a>

Cloud Canvas project template files are [AWS CloudFormation templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-guide.html) that define resources, stacks, and deployment permissions for a project\. Following are the project template files:
+ `project-template.json`
+ `deployment-template.json`
+ `deployment-access-template.json`

The content of each of these template files can be supplemented with a corresponding `*-extensions.json` file\. Starting in Lumberyard 1\.10, these files are located in the `\Gems\CloudGemFramework\vN\ResourceManager\resource_manager\templates` directory, where *N* represents a Cloud Gem framework version number\.

### project\-template\.json<a name="cloud-canvas-project-template"></a>

The `project-template.json` file is an [AWS CloudFormation template](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-guide.html) that defines project\-wide resources that support the Cloud Canvas resource management system\. For information about Cloud Canvas Resource Manager, see [Understanding Cloud Canvas Resource Manager](cloud-canvas-ui-rm-overview.md)\. For security\-related information, see [Understanding the Resource Manager Security System](cloud-canvas-rm-security.md)\.

### deployment\-template\.json<a name="cloud-canvas-deployment-template"></a>

In versions of Lumberyard prior to 1\.10, the project's copy of the `deployment-template.json` file contained stack definitions for each of the project's resource groups\. These resources are now inserted into the base template before it is passed to AWS CloudFormation\. To determine the resource group stacks to include, Lumberyard reads the `resource-template.json` files in `AWS\resource-group` subdirectories and in the `AWS` subdirectories of enabled gems\.

### deployment\-access\-template\.json<a name="cloud-canvas-deployment-access-template"></a>

The `deployment-access-template.json` file is an [AWS CloudFormation Template](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-guide.html) that defines the resources used to secure a deployment\. For information about Cloud Canvas Resource Manager, see [Understanding Cloud Canvas Resource Manager](cloud-canvas-ui-rm-overview.md)\. For security\-related information, see [Understanding the Resource Manager Security System](cloud-canvas-rm-security.md)\.

#### Parameters<a name="cloud-canvas-deployment-access-template-parameters"></a>

The deployment access stack defines parameters that identify the deployment and other resources that are needed to set up security for the deployment\. A value for each of these parameters is provided by Cloud Canvas when a deployment is created\.

#### Resources<a name="cloud-canvas-deployment-access-template-resources"></a>

This section describes some of the key resources that are defined in the example `deployment-access-template.json` file\.

##### Player<a name="cloud-canvas-deployment-access-template-player-resource"></a>

The `Player` resource describes the [IAM role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html) that determines the access granted to the player\. For example, for the game to invoke a Lambda function, the player must be allowed the `lambda:InvokeFunction` action on the Lambda function resource\.

The role's policies are determined by the `PlayerAccess` metadata elements found on resources in the project's resource templates \(see [resource\-template\.json](#cloud-canvas-resource-template)\)\. The role's policies are updated by the `PlayerAccess` custom resources that appear in the [deployment\-access\-template\.json](#cloud-canvas-deployment-access-template) and in the [resource\-template\.json](#cloud-canvas-resource-template) files\. The `PlayerAccessIdentityPool` [Amazon Cognito identity pool](https://docs.aws.amazon.com/cognito/latest/developerguide/identity-pools.html) resource allows players to assume this role\.

For more information, see [PlayerAccessIdentityPool](#cloud-canvas-deployment-access-template-player-access-identity-pool-resource) and [Controlling Access to Resources](cloud-canvas-setting-access-permissions.md)\.

##### PlayerLoginRole<a name="cloud-canvas-deployment-access-template-player-login-role-resource"></a>

The `PlayerLoginRole` resources describes the [IAM role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html) that is temporarily assumed by the player as part of the login process\.

For more information, see [Controlling Access to Resources](cloud-canvas-setting-access-permissions.md)\.

##### PlayerLoginIdentityPool<a name="cloud-canvas-deployment-access-template-player-login-identity-pool-resource"></a>

The `PlayerLoginIdentityPool` resource describes the [Amazon Cognito identity pool](https://docs.aws.amazon.com/cognito/latest/developerguide/identity-pools.html) that provides the player with a temporary identity during the login process\.

For more information, see [Controlling Access to Resources](cloud-canvas-setting-access-permissions.md)\.

##### PlayerAccessIdentityPool<a name="cloud-canvas-deployment-access-template-player-access-identity-pool-resource"></a>

The `PlayerAccessIdentityPool` resource describes the [Amazon Cognito identity pool](https://docs.aws.amazon.com/cognito/latest/developerguide/identity-pools.html) that provides the player with a temporary identity during the login process\.

For more information, see [Controlling Access to Resources](cloud-canvas-setting-access-permissions.md)\.

### Template Extension Files<a name="cloud-canvas-template-extension-files"></a>

Starting in Lumberyard 1\.10, you can use the following extension files to add resources to the project templates:
+ `deployment-access-template-extensions.json`
+ `deployment-template-extensions.json`
+ `project-template-extensions.json`

You can use the extension files to define new outputs, metadata, and resources\. The addition of template parameters is not supported\.

To create extension files, you can use the `lmbr_aws` [project create\-extension\-template](cloud-canvas-command-line.md#cloud-canvas-command-line-project-create-extension-template) command\. To create a template file of a particular type, use the corresponding argument, as the following examples show\.
+ To create a `project-template-extensions.json` file, type:

  ```
  lmbr-aws project create-extension-template --project 
  ```
+ To create a `deployment-template-extensions.json` file, type:

  ```
  lmbr-aws project create-extension-template --deployment
  ```
+ To create a `deployment-access-template-extensions.json` file, type:

  ```
  lmbr-aws project create-extension-template --deployment-access
  ```

In the base \(nonextension\) template files, the `Custom::AccessControl` resource `DependsOn` property includes all the resources defined in the extension files if the `DependsOn` property does not specify `AccessControl`\.

## Code Directories<a name="cloud-canvas-cgf-code-directories"></a>

The location and naming of code directories has changed in Lumberyard 1\.10\. For more information, see [ Cloud Gem Framework and Resource Manager Versioning](cloud-canvas-cgf-rm-versioning.md)\.

### Lambda Code Directories<a name="cloud-canvas-resource-definitions-lambda-code-directory"></a>

Starting in Lumberyard 1\.10, we recommend that you put your Lambda code in `AWS\lambda-code\<lambda-name>` directories \(for example, `dev\Gems\CloudGemPlayerAccount\AWS\lambda-code`\) and your shared code in a `common-code` directory \(for example, `dev\Gems\CloudGemPlayerAccount\AWS\common-code`\)\. 

In versions of Lumberyard prior to 1\.10, the code for a resource group's Lambda functions was kept in an `AWS\lambda-function-code` directory\. As of Lumberyard 1\.10, the use of `AWS\lambda-function-code` and `AWS\<lambda-name>-lambda-code` directories is no longer recommended\. Support for them will be removed in a future release\. Instead, we recommend that you put your Lambda code in `AWS\lambda-code\<lambda-name>` directories\.

In addition, the use of the `shared-lambda-code` directory is no longer recommended\. Support for it will also be removed in a future release\. Instead, use the more flexible `common-code` directory\. For more information, see [Using Shared Code](cloud-canvas-cgf-shared-code.md)\. For information about upgrading your projects and cloud gems to version 1\.0\.0 of the Cloud Gem framework, see [Updating Projects and Cloud Gems to Version 1\.0\.0 of the Cloud Gem Framework](cloud-canvas-cgf-updating-projects-gems.md)\.

### The project\-code Directory<a name="cloud-canvas-project-code-subdirectory"></a>

The `dev\Gems\CloudGemFramework\vN\AWS\project-code` subdirectory contains the source code for the [AWS CloudFormation Custom Resource](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-custom-resources.html) handler that is used in the project's AWS CloudFormation templates\. For information about custom resources, see [Custom Resources](cloud-canvas-custom-resources.md)\.

It also contains the code that implements the token exchange step of the player login process\. For more information, see [Controlling Access to Resources](cloud-canvas-setting-access-permissions.md)\.