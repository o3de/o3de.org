# Resource Deployments<a name="cloud-canvas-resource-deployments"></a>

You implement deployments using [AWS CloudFormation stacks](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacks.html)\. You create and manage the stacks using tools provided by Lumberyard\.

 A project may define any number of deployments, up to the limits imposed by AWS CloudFormation \(for more information, see [AWS CloudFormation Limits](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cloudformation-limits.html)\)\. Each deployment contains a completely independent set of the resources that the game requires\. For example, you can have separate development, test, and release deployments so that your development and test teams can work independently of the deployment used for the released version of the game\.

 An AWS account that hosts a Lumberyard project contains the following resources:
+ *\{project\}* – An AWS CloudFormation stack that acts as a container for all the project's deployments\.
+ *\{project\}*\-`Configuration` – An S3 bucket used to store configuration data\.
+ *\{project\}*\-`ProjectResourceHandler` – A Lambda function that implements the handler for the custom resources used in the templates\. See [Custom Resources](cloud-canvas-custom-resources.md)\.
+ *\{project\}*\-`ProjectResourceHandlerExecution` – An IAM role that grants the permissions used by the `ProjectResourceHandler` Lambda function when it is executing\.
+ *\{project\}*\-`PlayerAccessTokenExchange` – A Lambda function that implements the token exchange step in the player login process\. For more information, see [Controlling Access to Resources](cloud-canvas-setting-access-permissions.md)\.
+ *\{project\}*\-`PlayerAccessTokenExchangeExecution`– An IAM role that grants the permissions used by the `PlayerAccessTokenExchange` Lambda function when it runs\.
+ *\{project\}*\-*\{deployment\}* – AWS CloudFormation stacks for each of the project's deployments\.
+ *\{project\}*\-*\{deployment\}*`Access` – AWS CloudFormation stacks that control access to each of the project's deployments\.
+  *\{project\}*\-*\{deployment\}*`Access-PlayerAccessIdentityPool` – An Amazon Cognito identity pool used for player identity\. For more information, see [Controlling Access to Resources](cloud-canvas-setting-access-permissions.md)\.
+  *\{project\}*\-*\{deployment\}*`Access-PlayerLoginIdentityPool` – An Amazon Cognito identity pool that provides the temporary player identity used during the player login process\. For more information, see [Controlling Access to Resources](cloud-canvas-setting-access-permissions.md)\.
+ *\{project\}*\-*\{deployment\}*\-*\{resource\-group\}* – An AWS CloudFormation stack for each resource group of the project\.
+ *\{project\}*\-*\{deployment\}*\-*\{resource\-group\}*\-*\{resource\}* – The resources defined by a resource group\. Because of how AWS CloudFormation works, parts of these names have unique identifiers appended to them\. For example, for a project named MyGame with a deployment named Development and a feature named HighScore, the actual name of a Scores resource would be something like: `MyGame-Development-1FLFSUKM3MC4B-HighScore-1T7DK9P46SQF8-Scores-1A1WIH6MZKPRI`\. The tools provided by Lumberyard hide these actual resource names under most circumstances\.
+  *\{project\}*\-*\{iam\-policy\-or\-role\}* – An IAM policy or role that manages resource and deployment permissions\. For more information, see [Cloud Canvas Built\-In Roles and Policies](cloud-canvas-built-in-roles-and-policies.md)\.

## Configuration Bucket<a name="cloud-canvas-configuration-bucket"></a>

 The configuration [Amazon S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html) is used to store configuration data for the project\. The bucket is located at `/s3/buckets/<projectname>-configuration-<ID>/`\. The tools provided with Cloud Canvas manage uploads to this bucket\.

The `cgp-resource-code` directory contains resource and deployment information for cloud gems in the Cloud Gem Portal\. The `upload` directory contains objects that are uploaded from the `{game}/AWS` directory by the Cloud Canvas tools when stack management operations are performed\. The uploads for each operation get assigned a unique *\{upload\-id\}* value to prevent concurrent operations from impacting each other\.

### **project\-settings\.json**<a name="cloud-canvas-project-settings"></a>

 The `project-settings.json` file contains project configuration data\. 

The structure of the `project-settings.json` file is as follows:

```
{
    "{key}": "{value}",
    "deployment": {
        "{deployment}": {
            "{key}": "{value}",
            "resource-group": {
                "{resource-group}": {
                   "{key}": "{value}"
                }
            }
        }
    }
}
```

 The *\{key\}* and *\{value\}* pairs represent individual settings\. The pairs at the root apply to the project\. The pairs under *\{deployment\}* apply to that deployment\. The pairs under *\{resource\-group\}* apply to that resource group\. Either or both of *\{deployment\}* and *\{resource\-group\}* can be `*`, to indicate the settings they contain apply to all deployments or resource groups, respectively\. Settings under a named entry take precedence over settings under a `*` entry\.

**Note**  
As of Lumberyard 1\.8, the `ProjectStackId` property is stored in the `dev\<project name>\AWS\local-project-settings.json` file\. For more information, see [ProjectStackId Property](cloud-canvas-resource-definitions.md#cloud-canvas-local-project-settings-stackid-property)\.

#### DefaultDeployment Property<a name="cloud-canvas-project-settings-default-deployment-property"></a>

 The `DefaultDeployment` property identifies the deployment that is to be used by default when working in Lumberyard Editor\. The `DefaultDeployment` property in the [user\-settings\.json](cloud-canvas-resource-definitions.md#cloud-canvas-user-settings) file overrides this setting\. The project and user defaults can be set using the `lmbr_aws` [deployment default](cloud-canvas-command-line.md#cloud-canvas-command-line-deployment-default) command\. The `DefaultDeployment` setting is also used by the `lmbr_aws` [mappings update](cloud-canvas-command-line.md#cloud-canvas-command-line-mappings-update) command\.

#### ReleaseDeployment Property<a name="cloud-canvas-project-settings-release-deployment-property"></a>

 The `ReleaseDeployment` property identifies the deployment that is to be used in release builds of the game\. The `ReleaseDeployment` setting is used by the `lmbr_aws` [mappings update](cloud-canvas-command-line.md#cloud-canvas-command-line-mappings-update) command\.

#### DeploymentStackId Property, PendingDeploymentStackId<a name="cloud-canvas-project-settings-release-deploymentstackid-property"></a>

 The `DeploymentStackId` property identifies the [AWS CloudFormation stack](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacks.html) for a deployment\. The `PendingDeploymentStackId` property identifies a stack whose deployment is pending\. The project's resource groups are children of these stacks\. For more information, see [Resource Deployments](#cloud-canvas-resource-deployments)\.

The `DeploymentStackId` property is set by the [deployment create](cloud-canvas-command-line.md#cloud-canvas-command-line-deployment-create) command\. If for some reason you want to associate the deployment with an existing deployment, you can use the AWS Management Console to look up the stack's ARN and paste it into the `project-settings.json` file \(navigate to AWS CloudFormation, select the stack, select **Overview**, and then copy the value of the `Stack Id` property\)\.

#### DeploymentAccessStackId Property<a name="cloud-canvas-project-settings-release-deploymentaccessstackid-property"></a>

 The `DeploymentAccessStackId` property identifies the AWS CloudFormation stack for the resources that control access to a deployment\.

The `DeploymentAccessStackId` is set by the [deployment create](cloud-canvas-command-line.md#cloud-canvas-command-line-deployment-create) command\. If for some reason you want to associate the deployment with an existing deployment stack, you can use the AWS Management Console to look up the stack's ARN and paste it into the `project-settings.json` file \(navigate to AWS CloudFormation, select the stack, select **Overview**, and then copy the value of the `Stack Id` property\)\.

#### parameter Property<a name="cloud-canvas-project-settings-parameter-property"></a>

 The `parameter` property provides the values for resource template parameters\. The property must be in the following format\.

```
{
    ...
                    "parameter": {
                        "{template-parameter-name-1}": {template-parameter-value-1},
                        ...
                        "{template-parameter-name-n}": {template-parameter-value-n}
                    }
    ...
}
```