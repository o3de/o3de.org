# Using the Cloud Canvas Command Line<a name="cloud-canvas-command-line"></a>

Cloud Canvas provides the `\dev\lmbr_aws.cmd` command line tool for working with AWS resources\. The tool invokes Python code that is located in the `\dev\Tools\lmbr_aws` directory\.

Notes
+  Lumberyard 1\.9 renamed some `lmbr_aws` commands\. For a list of the older commands and their newer equivalents, see [Command Reorganization](cloud-canvas-command-line-revision.md)\.
+ For information on using Dynamic Content Cloud Gem `lmbr_aws` commands to update dynamic content, see [Using lmbr\_aws for Dynamic Content](cloud-canvas-cloud-gem-dc-lmbr-aws.md)\. 
+ For information on `lmbr_aws` commands for the Cloud Gem Portal and the cloud gem framework, see [Using the Cloud Gem Framework Command Line](cloud-canvas-command-line-cgf.md)\.
+ For information on `lmbr_aws` commands that manage roles and permissions, see [Using the Cloud Canvas Command Line to Manage Roles and Permissions](cloud-canvas-rm-security-lmbr-aws.md)\.

## Syntax<a name="cloud-canvas-command-line-syntax"></a>

```
lmbr_aws {command} {command-arguments}
```

*\{command\}* is one of commands in the command summary section that follows\. *\{command\-arguments\}* are the arguments accepted by the command\. Arguments common to most commands are listed in the [Common Arguments](#cloud-canvas-command-line-common-arguments) section\. Arguments unique to a command are listed in the detail section for the command\.

## Configuration<a name="cloud-canvas-command-line-configuration"></a>

The tool gets its default AWS configuration from the same `~/.aws/credentials` and `~/.aws/config` files as the AWS command line tools \(for information, see [Configuring the AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)\)\. The `lmbr_aws` tool does not require that the AWS command line interface be installed\.

### Environment Variables<a name="cloud-canvas-command-line-configuration-evars"></a>

As with the AWS command line tools, the default AWS configuration can be overridden by using the following environment variables\.
+ `AWS_ACCESS_KEY_ID` The access key for your AWS account\.
+ `AWS_SECRET_ACCESS_KEY` The secret key for your AWS account\.
+ `AWS_DEFAULT_REGION` The default region to use; for example, `us-east-2`\.
+ `AWS_PROFILE` The default credential and configuration profile to use, if any\.

### Configuration Arguments<a name="cloud-canvas-command-line-configuration-override"></a>

The following arguments can be used to override the AWS configuration from all other sources:
+ `--assume-role{role-name}` or `-R {role-name}` – Specifies the IAM role to assume to perform the requested actions\. The credentials in the `~/.aws/credentials` file must be able to assume the specified role\.
+ `--aws-access-key {access-key}` – The AWS access key that is used\.
+ `--aws-secret-key {secret-key}` – The AWS secret key that is used\.
+ `--profile {profile-name}` or `-P {profile-name}` – The AWS command line tool profile that is used\.

## Common Arguments<a name="cloud-canvas-command-line-common-arguments"></a>

Most of the `lmbr_aws` commands accept the following arguments, in addition to their own individual arguments:
+ `--aws-directory {aws}` – Identifies the `{game}\AWS` directory to use\. The default is the value of the `sys_game_folder` property from `{root}\bootstrap.cfg` with `AWS` appended\.
+ `--game-directory {directory}` – Location of the game project directory\. The default is `{root}\{game}` where *\{game\}* is determined by the `sys_game_folder` setting in the `{root}\bootstrap.cfg` file\. 
+ `--help` or `-h` – Display help for the command\.
+ `--no-prompt` – Suppresses calls that request input from the command prompt window\.
+ `--region-override {AWS_region}` – Specify a non\-default AWS region to use in your `local-project-settings.json` file\. 

  `--root-directory {root}` – Identifies the *lumberyard\_installation*`\dev` directory\. The default is the current working directory\.
+ `--user-directory {user}` – Location of the user cache directory\. The default is `{root}\Cache\{game}\AWS` where *\{game\}* is determined by the `sys_game_folder` setting in the `{root}\bootstrap.cfg` file\. 
+ `--verbose` – Shows additional output when executing commands\.

## Commands<a name="cloud-canvas-command-line-commands"></a>

Following are the `lmbr_aws` commands\.

### `cloud-gem` Commands<a name="cloud-canvas-command-line-cloud-gem-commands"></a>

The `lmbr_aws cloud-gem` commands create, enable, and disable cloud gems\.

#### cloud\-gem create<a name="cloud-canvas-command-line-cloud-gem-create"></a>

Create a cloud gem\. This command is new in Lumberyard 1\.11\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `cloud-gem create` command accepts the following arguments:
+ `--directory {path}` 

  Optional\. The directory where the gem is created\. The default is `\dev\Gems\{name}\v{N}`, where *\{name\}* is the name that was specified by the `--gem` option and *\{N\}* is the major part of the gem version number as specified by the `--version` option\.
+ `--enable`

  Optional\. Enable the gem for the current project when the gem is created\. By default, the gem is not enabled when it is created\.
+ `--gem {name}` 

  Required\. The name of the gem to create\.
+ `--initial-content {initial-content-type}` 

  Optional\. Initialize the cloud gem's `AWS` directory with the contents specified by `{initial-content-type}`\.

  Following are possible values for `{initial-content-type}`\.
**Note**  
Before you can use the `api` content options, do one of the following:  
In Lumberyard Setup Assistant, choose **Compile the game code**
From a command prompt window on the `\dev\Tools\LmbrSetup\Win` directory, enter the following command:  

    ```
    lmbr capabilities enable compilegame
    ```
  + `api-lambda` 

    Define a resource group with Amazon API Gateway and AWS Lambda function resources that conform to the Cloud Gem Framework's Service API pattern\. You can add AWS resources as needed\. 
  + `api-lambda-bucket` 

    Define a resource group with API Gateway and Lambda function resources that conform to the Cloud Gem Framework's Service API pattern\. Also creates an Amazon S3 bucket resource\.
  + `api-lambda-dynamodb` 

    Define a resource group with API Gateway and Lambda function resources that conform to the Cloud Gem Framework's Service API pattern\. Also creates an Amazon DynamoDB table resource\.
  + `bucket` 

    Define a resource group that has an Amazon S3 bucket resource\.
  + `lambda` 

    Define a resource group that has a Lambda function resource\.
  + `no-resources` 

    Define a resource group that has no resources \(except [AccessControl](cloud-canvas-setting-access-permissions.md#cloud-canvas-setting-access-permissions-access-control), which is required\)\. This is the default value\.
  + `resource-manager-plugin` 

    Define a resource manager plugin\.
+ `--no-cpp-code` 

   Optional\. Define a gem that contains no C\+\+ code and does not build as a `.dll` file\. The gem can contain resource group definitions and/or resource manager plugins\.
+  `--version {version}` 

  Optional\. Set the gem version to the number specified by `{version}`\. The default is `1.0.0`\. The version number must be in the format `{number}.{number}.{number}`\. 

#### cloud\-gem disable<a name="cloud-canvas-command-line-cloud-gem-disable"></a>

Disable a cloud gem that is in the current project\. This command is new in Lumberyard 1\.11\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `cloud-gem disable` command accepts the following arguments:
+ `--gem {name}` 

  Required\. The name of the gem to disable\.

#### cloud\-gem enable<a name="cloud-canvas-command-line-cloud-gem-enable"></a>

Enable a cloud gem that is in the current project\. This command is new in Lumberyard 1\.11\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `cloud-gem enable` command accepts the following arguments:
+ `--gem {name}` 

  Required\. The name of the gem to enable\.

#### cloud\-gem\-tts import\-tts\-zip<a name="cloud-canvas-command-line-cloud-gem-tts"></a>

Import generated voice packages from the Cloud Gem Text\-to\-Speech service into a project\. This command is new in Lumberyard 1\.11\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `cloud-gem-tts import-tts-zip` command accepts the following arguments:
+ `--download-path {zip-path}` 

  Required\. The absolute path to a `.zip` file that was downloaded from the Text\-to\-Speech Cloud Gem Portal\.
+ ` --import-as-wav` 

   Optional\. Converts audio files to `.wav` file format when they are extracted\.

For more information on downloading and importing speech files, see [Text\-to\-Speech Cloud Gem Portal](cloud-canvas-cloud-gem-text-to-speech-cgp.md)\.

### `deployment` Commands<a name="cloud-canvas-command-line-deployment-commands"></a>

The `lmbr_aws deployment` commands manage Cloud Canvas deployments\.

**Note**  
In Lumberyard 1\.16 and later versions, the `deployment` commands install, modify, or remove gems in series rather than in parallel\. This prevents issues that can occur in AWS when multiple resource groups are created, updated, or deleted at the same time\.  
This default behavior can be overridden with the `--parallel` option, as in the following examples:  

```
lmbr_aws deployment create --deployment deployment_name --parallel
lmbr_aws deployment update --parallel
lmbr_aws deployment delete --deployment deployment_name --parallel
```

**Warning**  
Because it greatly increases the risk of errors when you modify your deployment, use of the `--parallel` option is not recommended\. 

#### deployment create<a name="cloud-canvas-command-line-deployment-create"></a>

Create a complete and independent copy of all the resources needed by the Lumberyard project\. 

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `deployment create` command accepts the following arguments:
+ `--deployment {deployment-name}` or `-d {deployment-name}`

  Required\. The name of the deployment to create\.
+ `--confirm-aws-usage` or `-C`

  Optional\. Confirms that you know that the `deployment create` command will create AWS resources for which you may be charged and that may perform actions that can affect permissions in your AWS account\. Specify this argument to disable the related confirmation prompt\.

#### deployment default<a name="cloud-canvas-command-line-deployment-default"></a>

Set or show the default user and project deployments\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `deployment default` command accepts the following arguments:
+ `--set {deployment}`

  Optional\. Sets the default to the provided deployment name\.
+ `--clear`

  Optional\. Clears the defaults\.
+ `--show`

  Optional\. Shows the defaults\.
+ `--project`

  Optional\. Applies `--set` and `--clear` to the project default instead of the user default\. Ignored for `--show`\.

  Only one of the `--set`, `--clear`, and `--show` arguments is allowed\.

  If `--set` or `--clear` is specified, this command updates the `{root}\user\AWS\user-settings.json` file\. If `--project` is provided, the `{root}\{game}\AWS\project-settings.json` file is updated\.

#### deployment delete<a name="cloud-canvas-command-line-deployment-delete"></a>

Delete a complete and independent copy of all the resources needed by the Lumberyard project\. 

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `deployment delete` command accepts the following arguments:
+ `--deployment {deployment-name}` or `-d {deployment-name}`

  Required\. The name of the deployment to delete\.
+ `--confirm-resource-deletion`

  Optional\. Acknowledges that the command will permanently delete the resources for the specified deployment\. If this argument is not specified, a confirmation prompt is issued\.

**Note**  
AWS CloudFormation cannot delete stacks that define Amazon S3 buckets that contain data\. To allow project stacks to be deleted, the `project-template.json` file specifies a `DeletionPolicy` of `Retain` for the configuration bucket\. This causes AWS CloudFormation to not delete the bucket when the project stack is deleted\. After the project stack has been deleted, the command removes all the objects from the configuration bucket and then deletes the bucket\.

#### deployment list<a name="cloud-canvas-command-line-deployment-list"></a>

List all deployments in the local project\.

Example output:

```
Name               Status           Reason                                                                        Timestamp          Id
-----------------  ---------------  ----------------------------------------------------------------------------  -----------------  --------------------------------------------------------------------------------------------------------------------------
AnotherDeployment  CREATE_PENDING   Resource is defined in the local project template but does not exist in AWS.
Development        CREATE_COMPLETE                                                                                03/04/16 18:43:11  arn:aws:cloudformation:us-east-2:<ACCOUNTID>:stack/foo-hw-Development-ZDLXUB7FKR94/8e6492f0-e248-11e5-8e7e-50d5ca6e60ae


User Default Deployment:    (none)
Project Default Deployment: Development
Release Deployment:         (none)
```

#### deployment list\-resources<a name="cloud-canvas-command-line-deployment-list-resources"></a>

List all of the resources associated with the project\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `deployment list-resources` command accepts the following arguments:
+ `--deployment {deployment-name}` or `-d {deployment-name}`

  Optional\. The name of the deployment to list resources for\. If not specified, lists all the project's resources\.

#### deployment protect<a name="cloud-canvas-command-line-deployment-protect"></a>

Marks a deployment as protected and issues a warning when a user \(for example, a game developer, programmer, or tester\) attempts to connected a development game client to live resources\. For more information, see [Using Protected Deployments ](cloud-canvas-protected-deployments.md)\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `deployment protect` command accepts the following arguments:
+ `--set {deployment-name}`

  Optional\. Specifies that the deployment is protected\.
+ `--clear {deployment-name}`

  Optional\. Specifies that the deployment is not protected\.
+ `--show`

  Optional\. Displays a list of the deployments that are currently protected\.
**Note**  
To display the protected status of deployments, you can also use either the [deployment list](#cloud-canvas-command-line-deployment-list) or [mappings list](#cloud-canvas-command-line-mappings-list) command\.

#### deployment release<a name="cloud-canvas-command-line-deployment-release"></a>

Sets, shows, or removes the release deployment\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `deployment release` command accepts the following arguments:
+ `--set {deployment-name}`

  Required\. The name of the deployment to set as the release\.
+ `--clear`

  Removes the release designation from the current release deployment\.
+ `--show`

  Shows the deployment that is currently configured as the release deployment\.

#### deployment tags<a name="cloud-canvas-command-line-deployment-tags"></a>

Manages the tags for a deployment\. Deployment tags specify resource group overrides for a deployment\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `deployment tags` command accepts the following arguments:
+ `--add` *\{tag\}* \[*\{tag\}* \.\.\.\]

  Optional\. Specifies the tags to add to a deployment\. The tags are saved in the `lumberyard_version\dev\project_name\AWS\local-project-settings.json` file\.
+ `--clear`

  Optional\. Clears all tags for a deployment\.
+ `--delete` *\{tag\}* \[*\{tag\}* \.\.\.\]

  Optional\. Specifies the tags to delete from a deployment\.
+ `--deployment {deployment-name}` or `-d {deployment-name}`

  Optional\. The name of the deployment\.
+ `--list`

  Optional\. Lists all the tags for a deployment\.

#### deployment update\-access<a name="cloud-canvas-command-line-deployment-update-access"></a>

Sets, shows, or removes the release deployment\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `deployment update-access` command accepts the following arguments:
+ `--confirm-aws-usage` or `-C`

  Optional\. Confirms that you know this command creates AWS resources for which you can be charged and that it may perform actions that can affect permissions in your AWS account\. Specify this argument to disable the related confirmation prompt\.
+ `--confirm-resource-deletion`

  Optional\. If the operation will delete resources permanently, confirms your acknowledgement and approval\. If this argument is not specified, you are prompted to confirm completion of the operation\. Specify this argument to disable the related confirmation prompt\.
+ `--confirm-security-change`

  Optional\. Confirms that you know that this command may make security\-related changes\. Specify this argument to disable the related confirmation prompt\.
+ `--deployment {deployment-name}` or `-d {deployment-name}`

  Optional\. The name of the deployment whose access stack is updated\. If omitted, the default deployment is updated\. Use \* to update all deployments\.

#### deployment update, deployment upload, deployment upload\-resources<a name="cloud-canvas-command-line-deployment-upload"></a>

Updates a deployment\. `deployment upload` or `deployment upload-resources` can be used instead of `deployment update`\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `deployment update` command accepts the following arguments:
+ `--confirm-aws-usage` or `-C`

  Optional\. Confirms that you know this command creates AWS resources for which you can be charged and that it may perform actions that can affect permissions in your AWS account\. Specify this argument to disable the related confirmation prompt\.
+ `--confirm-resource-deletion`

  Optional\. If the operation will delete resources permanently, confirms your acknowledgement and approval\. If this argument is not specified, you are prompted to confirm completion of the operation\. Specify this argument to disable the related confirmation prompt\.
+ `--confirm-security-change`

  Optional\. Confirms that you know that this command may make security\-related changes\. Specify this argument to disable the related confirmation prompt\.
+ `--deployment {deployment-name}` or `-d {deployment-name}`

  Optional\. The name of the deployment to update\. If omitted, the default deployment is updated\.

### `function` Commands<a name="cloud-canvas-command-line-function-commands"></a>

The `lmbr_aws function` commands manage folders, CloudWatch logs, and code for Lambda functions\.

#### function create\-folder<a name="cloud-canvas-command-line-function-create-folder"></a>

Recreates the default function folder for a Lambda function resource\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `function create-folder` command accepts the following arguments:
+ `--function {function-name}` or `-f {function-name}`

  Required\. The logical name of a Lambda function resource\.
+ `--resource-group {resource-group-name}` or `-r {resource-group-name}`

  Required\. The name of a resource group\.
+ `--force`

  Optional\. Skips checks for existence of resource and type of resource\. Used when creating folders for functions not yet created\.

#### function get\-log<a name="cloud-canvas-command-line-function-get-log"></a>

Retrieves data from a CloudWatch Logs log file\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `function get-log` command accepts the following arguments:
+ `--deployment {deployment-name}` or `-d {deployment-name}`

  Optional\. The name of a deployment\. If this argument is specified, the `--resource-group` argument must also be specified\. If this argument is omitted, then the function must exist in the project stack\.
+ `--function {function-name}` or `-f {function-name}`

  Required\. The logical name of a Lambda function resource\.
+ `--resource-group {resource-group-name}` or `-r {resource-group-name}`

  Optional\. The name of a resource group\. If specified, the `--deployment` argument must also be specified\.
+ `--log-stream-name {log-stream-name}` or `-l {log-stream-name}`

  Optional\. The log stream name or partial log stream name\. If omitted, the most recent log stream is shown\.

#### function upload\-code<a name="cloud-canvas-command-line-function-upload-code"></a>

Updates Lambda functions for a deployment or project\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `function upload-code` command accepts the following arguments:
+ `--deployment {deployment-name}` or `-d {deployment-name}`

  Optional\. The name of a deployment to update\. If neither this argument nor the `--project` argument is specified, the default deployment is updated\. If the `--project` argument is specified, the `--deployment` argument is ignored\.
+ `--function {function-name}`

  Optional\. The name of the Lambda function to update\. If not specified, all Lambda functions in the resource group are updated\.
+ `--keep`

  Optional\. Keep the generated `.zip` file instead of deleting it after it is uploaded\.
+ `--project`

  Optional\. Updates the project\. Overrides the `--deployment` argument\.
+ `--resource-group {resource-group-name}` or `-r {resource-group-name}`

  Optional\. The name of a resource group that has the function to update\.

### `login-provider` Commands<a name="cloud-canvas-command-line-login-provider-commands"></a>

The `lmbr_aws login-provider` commands add, remove, and update social network login providers in Amazon Cognito identity pool configuration\.

#### login\-provider add<a name="cloud-canvas-command-line-login-provider-add"></a>

Add a player login provider to the Amazon Cognito identity pool configuration\. Login providers allow your game's players to log in using their social network identity, such as Facebook or using their Amazon identity\. For more information, see [Controlling Access to Resources](cloud-canvas-setting-access-permissions.md)\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `login-provider add` command accepts the following arguments:
+ `--provider {provider-name}`

  Required\. The name of the provider\. The name must be `amazon`, `google` or `facebook`, or, if you are using a generic OpenID provider, a name that you choose\.
+ `--app-id {application-id}`

  Required\. The application id from your login provider \(this is usually different from your client ID\)\.
+ `--client-id {client-id}`

  Required\. The unique application client ID for the login provider\.
+ `--client-secret {client-secret}`

  Required\. The secret key to use with your login provider\.
+ `--redirect-uri {redirect-uri}`

  Required\. The redirect URI to use with your login provider\.
+ `--provider-uri {provider-uri}`

  Optional\. The URI for a generic open ID connect provider\. This is only use for generic OpenID providers\.
+ `--provider-port {provider-port}`

  Optional\. The port your provider listens on for its API\. This is only used for generic OpenID providers\.
+ `--provider-path {provider-path}`

  Optional\. The path portion of your provider's URI\. This is only used for generic OpenID providers\.

  This command saves its configuration in a `player-access/auth-settings.json` object in the project's configuration bucket so that the `PlayerAccessTokenExchange` Lambda function can access it\.
**Note**  
You must run `project upload` after running this command so that the [PlayerAccessIdentityPool](cloud-canvas-resource-definitions.md#cloud-canvas-deployment-access-template-player-access-identity-pool-resource) configuration is updated to reflect the change\. 

#### login\-provider remove<a name="cloud-canvas-command-line-login-provider-remove"></a>

Remove a player login provider from the Amazon Cognito identity pool configuration\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `login-provider remove` command accepts the following argument:
+ `--provider {provider-name}`

  Required\. The name of the provider\.

  The `login-provider remove` command saves the configuration in a `/player-access/auth-settings.json` object in the project's configuration bucket so that the `PlayerAccessTokenExchange` Lambda function can access it\.
**Note**  
You must run `lmbr_aws project upload` after running this command so that the [PlayerAccessIdentityPool](cloud-canvas-resource-definitions.md#cloud-canvas-deployment-access-template-player-access-identity-pool-resource) configuration is updated to reflect the change\. 

#### login\-provider update<a name="cloud-canvas-command-line-login-provider-update"></a>

Update a player login provider in the Amazon Cognito identity pool configuration\. Login providers allow your game's players to log in using their social network identity, such as Facebook, or using their Amazon identity\. For more information, see [Controlling Access to Resources](cloud-canvas-setting-access-permissions.md)\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `login-provider update` command accepts the following arguments:
+ `--provider {provider-name}`

  Required\. The name of the updated provider\. The name must be `amazon`, `google` or `facebook`, or, if you are using a generic OpenID provider, the name that you chose when the provider was added\.
+ `--app-id {application-id}`

  Optional\. The application ID from your login provider \(this is usually different from your client ID\)\.
+ `--client-id {client-id}`

  Optional\. The unique application client ID for the login provider\.
+ `--client-secret {client-secret}`

  Optional\. The secret key to use with your login provider\.
+ `--redirect-uri {redirect-uri}`

  Optional\. The redirect URI to use with your login provider\.
+ `--provider-uri {provider-uri}`

  Optional\. The URI for a generic open id connect provider\. This argument is used only for generic OpenID providers\.
+ `--provider-port {provider-port}`

  Optional\. The port the provider listens on for the provider's API\. This argument is used only for generic OpenID providers\.
+ `--provider-path {provider-path}`

  Optional\. The path portion of the provider's URI\. This argument is used only for generic OpenID providers\.

  The `login-provider update` command saves its configuration in a `/player-access/auth-settings.json` object in the project's configuration bucket so that the `PlayerAccessTokenExchange` Lambda function can access it\.
**Note**  
You must run `lmbr_aws project upload` after running this command so that the [PlayerAccessIdentityPool](cloud-canvas-resource-definitions.md#cloud-canvas-deployment-access-template-player-access-identity-pool-resource) configuration is updated to reflect the change\. 

### `mappings` Commands<a name="cloud-canvas-command-line-mappings-commands"></a>

The `lmbr_aws mappings` commands manage the mappings of logical to physical resource names in a Cloud Canvas deployment\.

#### mappings list<a name="cloud-canvas-command-line-mappings-list"></a>

Show the logical to physical resource name mappings\.

Example output:

```
Name                                     Type                         Id
---------------------------------------  ---------------------------  ----------------------------------------------------------------
HelloWorld.SayHello                      AWS::Lambda::Function        foo-hw-Development-ZDLXUB7FKR94-HelloWo-SayHello-1FADMFNE5M1CO
PlayerAccessIdentityPool                 Custom::CognitoIdentityPool  us-east-2:108f6d6a-f929-4212-9947-a03269b9582e
PlayerLoginIdentityPool                  Custom::CognitoIdentityPool  us-east-2:3020e175-0ddd-4860-8dad-1db57162cbb2
PlayerAccessTokenExchange  AWS::Lambda::Function        foo-hw-PlayerAccessTokenExchange-1BG6JJ94IZAUV
account_id                               Configuration                <ACCOUNTID>
region                                   Configuration                us-east-2
```

#### mappings update<a name="cloud-canvas-command-line-mappings-update"></a>

Update the friendly name to physical resource ID mappings for the current default deployment or the release deployment\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `mappings update` command accepts the following arguments:
+ `--release`

  Optional\. Causes the release mappings to be updated\. By default, only the mappings used when launching the game from inside the editor are updated\.

  The command looks in the [resource\-template\.json](cloud-canvas-resource-definitions.md#cloud-canvas-resource-template) file for `Metadata.CloudCanvas.PlayerAccess` properties on resource definitions\. It then queries AWS CloudFormation for the physical names of those resources in the current default deployment\. If the `--release` argument is specified, the release deployment is queried\. 
+ `--deployment {deployment-name}` or `-d {deployment-name}`

  Optional\. Exports client and server mapping files for the specified deployment to the `\dev\project_name\Config` directory in the format `{deployment_name}.player.awsLogicalMappings.json` and `{deployment_name}.server.awsLogicalMappings.json`\. The `{deployment-name}` argument is required and is case\-sensitive\.

  When you run a game launcher such as the one at `dev\Bin64vcNNN\CloudGemSamplesLauncher.exe`, you can use the `-cc_override_resource_map {mappings-name}` argument to choose the mapping\. For more information, see [Selecting a Deployment with a PC Launcher](cloud-canvas-testing-different-mappings.md#cloud-canvas-testing-different-mappings-selecting-a-deployment-pc-launcher)\.

### `parameter` Commands<a name="cloud-canvas-command-line-parameter-commands"></a>

The `lmbr_aws parameter` commands manage parameters for Cloud Canvas deployments and resource groups\.

#### parameter clear<a name="cloud-canvas-command-line-parameter-clear"></a>

Clears the specified parameter configuration for your project\. The project must be initialized \(a project stack must have been created\) before you can clear parameters\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `parameter clear` command accepts the following arguments:
+ `--deployment {deployment-name}` or `-d {deployment-name}`

  Optional\. Clears the parameter value for the specified deployment\. *\{deployment\-name\}* can be \*, in which case the parameter value used for all deployments that do not override the value is cleared\. If omitted, the parameter value is cleared for all deployments, including \*\.
+ `--resource-group {resource-group-name}` or `-r {resource-group-name}`

  Optional\. Clears the parameter value for the specified resource\-group\. *\{resource\-group\-name\}* can be \*, in which case the parameter value used for all resource groups that do not override the value is cleared\. If omitted, the parameter value is cleared for all resource groups, including \*\.
+ `--parameter {parameter-name}` or `-p {parameter-name}`

  Required\. The parameter to clear\.

#### parameter list<a name="cloud-canvas-command-line-parameter-list"></a>

Lists the parameters currently configured for your project\. The project must be initialized \(a project stack must have been created\) before you can list parameters\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `parameter list` command accepts the following arguments:
+ `--deployment {deployment-name}` or `-d {deployment-name}`

  Required\. Limits the list to the specified deployment\. *\{deployment\-name\}* can be \*, in which case parameters that apply to all deployments are listed\.
+ `--resource-group {resource-group-name}` or `-r {resource-group-name}`

  Required\. Limits the list to the specified resource group\. *\{resource\-group\-name\}* can be \*, in which case parameters that apply to all resource groups are listed\.
+ `--parameter {parameter-name}` or `-p {parameter-name}`

  Optional\. Limits the list to the specified parameter\.

#### parameter set<a name="cloud-canvas-command-line-parameter-set"></a>

Sets parameter configuration for your project\. The project must be initialized \(a project stack must have been created\) before you can set parameters\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `parameter set` command accepts the following arguments:
+ `--deployment {deployment-name}` or `-d {deployment-name}`

  Required\. Sets the parameter value for the specified deployment\. *\{deployment\-name\}* can be \*, in which case the parameter value is used for all deployments that do not override the value\.
+ `--resource-group {resource-group-name}` or `-r {resource-group-name}`

  Required\. Sets the parameter value for the specified resource group\. *\{resource\-group\-name\}* can be \*, in which case the parameter value is used for all resource groups that do not override the value\.
+ `--parameter {parameter-name}` or `-p {parameter-name}`

  Required\. Specifies the parameter whose value will be set\.
+ `--value {parameter-value}` or `-v {parameter-value}`

  Required\. Specifies the value to set\.

### `profile` Commands<a name="cloud-canvas-command-line-profile-commands"></a>

The `lmbr_aws profile` commands manage the AWS profiles that you use for Cloud Canvas\.

#### profile add<a name="cloud-canvas-command-line-profile-add"></a>

Add an AWS profile to the AWS command line tool configuration\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `profile add` command accepts the following arguments:
+ `--aws-access-key{accesskey}`

  Required\. The AWS access key associated with the added profile\.
+ `--aws-secret-key{secretkey}`

  Required\. The AWS secret key associated with the added profile\.
+ `--profile {profile-name}` or `-P {profile-name}`

  Required\. The name of the AWS profile to add\.
+ `--make-default`

  Optional\. Make the new profile the default profile\.

#### profile default<a name="cloud-canvas-command-line-profile-default"></a>

Set, clear, or show the default AWS profile\. The `profile default` command modifies the `DefaultProfile` section of the `[user\-settings\.json](cloud-canvas-resource-definitions.md#cloud-canvas-user-settings)` file\. As of Lumberyard 1\.15, the [Cloud Canvas cleanup tool](cloud-canvas-administration-aws-resource-cleanup.md#cloud-canvas-administration-aws-resource-cleanup-tool) uses this setting to determine the AWS profile to use\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `profile default` command accepts the following arguments:
+ `--set {profile-name}`

  Optional\. Set the default profile for the current deployment to the provided AWS profile name\. 
+ `--clear`

  Optional\. Clear the default profile\.
+ `--show`

  Optional\. Show the default profile\.

#### profile list<a name="cloud-canvas-command-line-profile-list"></a>

List the AWS profiles that have been configured\.

#### profile remove<a name="cloud-canvas-command-line-profile-remove"></a>

Remove an AWS profile from the AWS command line configuration\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `profile remove` command accepts the following argument:
+ `--profile {profile-name}` or `-P {profile-name}`

  Required\. The name of the AWS profile to remove\.

#### profile rename<a name="cloud-canvas-command-line-profile-rename"></a>

Rename an AWS profile in the AWS command line tool configuration\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `profile rename` command accepts the following arguments:
+ `--old {old-profile-name}`

  Required\. The name of the AWS profile to change\.
+ `--new {new-profile-name}`

  Required\. The new name of the AWS profile\.

#### profile update<a name="cloud-canvas-command-line-profile-update"></a>

Update an AWS profile\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `profile update` command accepts the following arguments:
+ `--aws-access-key{accesskey}`

  Optional\. The AWS access key associated with the updated profile\. The default is to not change the AWS access key associated with the profile\.
+ `--aws-secret-key{secretkey}`

  Optional\. The AWS secret key associated with the updated profile\. The default is to not change the AWS secret key associated with the profile\.
+ `--profile {profilename}` or `-P {profile-name}`

  Required\. The name of the AWS profile to update\.

**Note**  
To make an existing profile the default profile, use the [profile default \-\-set *\{profile\-name\}*](#cloud-canvas-command-line-profile-default) command\.

### `project` Commands<a name="cloud-canvas-command-line-project-commands"></a>

The `lmbr_aws project` commands manage Cloud Canvas projects in Lumberyard\.

#### project create<a name="cloud-canvas-command-line-project-create"></a>

Initialize Cloud Canvas resource management for a Lumberyard project\. This includes creating a set of default [Resource Definitions](cloud-canvas-resource-definitions.md) in the `dev\game\AWS` directory and a AWS CloudFormation stack that contains the resources that the Cloud Canvas resource manager uses to manage your game resources\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `project create` command accepts the following arguments:
+ `--stack {stack-name}`

  Optional\. The name used for the project's AWS CloudFormation stack\. The default is the name of the *\{game\}* directory\.
+ `--confirm-aws-usage` or `-C`

  Optional\. Confirms that you know this command will create AWS resources for which you may be charged and that it may perform actions that can affect permissions in your AWS account\. Specify this argument to disable the related confirmation prompt\.
+ `--files-only`

  Optional\. Writes the default configuration data to the `{game}\AWS` directory and exits\. The directory must be empty or must not exist\.
+ `--region {region}`

  Required\. The AWS region in which the project stack will be created\. 
**Note**  
The `region` argument can be used only with the `project create` and `resource-importer list-importable-resources` commands\. To manually override the AWS region in other `lmbr_aws` commands, use the `--region-override` argument\.

##### How `project create` Works<a name="cloud-canvas-command-line-project-create-details"></a>

The `project create` command performs the following tasks:

****

1. Creates the project's AWS CloudFormation stack using a bootstrap template that defines only the [Configuration Bucket](cloud-canvas-resource-deployments.md#cloud-canvas-configuration-bucket) resource\.

1. Uploads the [project\-template\.json](cloud-canvas-resource-definitions.md#cloud-canvas-project-template) file and the zipped up contents of the [project\-code subdirectory](cloud-canvas-resource-definitions.md#cloud-canvas-project-code-subdirectory) to the [Configuration Bucket](cloud-canvas-resource-deployments.md#cloud-canvas-configuration-bucket)\.

1. Uses the uploaded `project-template.json` file to perform an AWS CloudFormation stack update operation\. The `project-code.zip` file is used to create the Lambda function resources defined by the `project-template.json` file\.

**Note**  
If the `{root}\{game}\AWS` directory is empty or does not exist, `project create` creates the directory if necessary and copies the contents of the `dev\Tools\lmbr_aws\AWSResourceManager\default-project-content` directory to that directory\.
`project create` fails if a stack with the specified name already exists in the configured AWS account and region\. In this case you can use the `--stack` argument to specify a different name for the project stack\.
`project create` fails if the `dev\{game}\AWS\local-project-settings.json` file has a non\-empty `ProjectStackId` property\. Initially, the `ProjectStackId` property is not present in the `local-project-settings.json` file\. After the project stack is created in step 1, the `ProjectStackId` property is written to the file and is the project's AWS CloudFormation stack ID \.
If the stack update process in step 2 fails on the first attempt, you can retry by using the `project upload` command\. 

#### project create\-extension\-template<a name="cloud-canvas-command-line-project-create-extension-template"></a>

Creates an extension template for adding project, deployment, or deployment access resources that complement the existing `project-template.json`, `deployment-template.json`, or `deployment-access-template.json` files\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `project create-extension-template` command accepts the following arguments:
+ `--project`

  Optional\. Creates a `project-template-extensions.json` file in the project directory\.
+ `--deployment`

  Optional\. Creates a `deployment-template-extensions.json` file in the project directory\.
+ `--deployment-access`

  Optional\. Creates a `deployment-access-template-extensions.json` file in the project directory\.

#### project delete<a name="cloud-canvas-command-line-project-delete"></a>

Delete the AWS CloudFormation stack that contains your project's resources\. You must delete all of the project's deployments before deleting the project stack\. After deleting the project stack, you must create a new project stack before you can use AWS CloudFormation resource manager for your project\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `project delete` command accepts the following argument:
+ `--confirm-resource-deletion`

  Optional\. Confirms your acknowledgement and approval that the operation will delete resources permanently\. If this argument is not specified, you will be prompted to confirm completion of the operation\. Specify this argument to disable the related confirmation prompt\.

  AWS CloudFormation cannot delete stacks that define Amazon S3 buckets that contain data\. To allow project stacks to be deleted, the `project-template.json` file specifies a `DeletionPolicy` of `Retain` for the configuration bucket\. This causes AWS CloudFormation to not delete the bucket when the project stack is deleted\. After the project stack has been deleted, the command removes all the objects from the configuration bucket and then deletes the bucket\.

**Note**  
Before you use the `project delete` command, ensure that the default AWS credentials specified by the `~/.aws/credentials` file on the local file system are the same as the credentials that are specified in the Cloud Canvas **Credentials Manager**\. If the credentials are not the same, the project might not delete properly\. You can use the [Cloud Canvas Cleanup Tool](cloud-canvas-administration-aws-resource-cleanup.md#cloud-canvas-administration-aws-resource-cleanup-using-the-cloud-canvas-cleanup-tool) to remove orphaned resources after a failed project stack deletion\.

#### project list\-resources<a name="cloud-canvas-command-line-project-list-resources"></a>

List all of the resources associated with the project\.

#### project update, project upload<a name="cloud-canvas-command-line-project-upload"></a>

Update the project's AWS CloudFormation stack\. `project upload` can be used instead of `project update`\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `project update` command accepts the following arguments:
+ `--confirm-aws-usage` or `-C`

  Optional\. Confirms that you know this command will create AWS resources for which you may be charged and that it may perform actions that can affect permission in your AWS account\. Specify this argument to disable the related confirmation prompt\.
+ `--confirm-resource-deletion`

  Optional\. If the operation will delete resources permanently, confirms your acknowledgement and approval\. If this argument is not specified, you are prompted to confirm completion of the operation\. Specify this argument to disable the related confirmation prompt\.

##### How `project update` works<a name="cloud-canvas-command-line-project-upload-details"></a>

The project update command performs the following tasks:

1. Uploads the [project\-template\.json](cloud-canvas-resource-definitions.md#cloud-canvas-project-template) file and the zipped up contents of the [project\-code subdirectory](cloud-canvas-resource-definitions.md#cloud-canvas-project-code-subdirectory) to the [Configuration Bucket](cloud-canvas-resource-deployments.md#cloud-canvas-configuration-bucket)\.

1. Uses the uploaded `project-template.json` file to perform an AWS CloudFormation stack update operation\. The `project-code.zip` file is used to create the Lambda function resources defined by the `project-template.json` file\.

**Note**  
The `project update` command fails if the `dev\{game}\AWS\local-project-settings.json` file does not exist or does not have a valid `ProjectStackId` property\.

#### project update\-framework\-version<a name="cloud-canvas-command-line-project-update-framework-version"></a>

Updates the Cloud Gem framework version for a project\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `project update-code` command accepts the following arguments:
+ `--confirm-aws-usage` or `-C`

  Optional\. Confirms that you know that the `deployment create` command will create AWS resources for which you may be charged and that may perform actions that can affect permissions in your AWS account\. Specify this argument to disable the related confirmation prompt\.
+ `--confirm-resource-deletion`

  Optional\. Acknowledges that the command will permanently delete the resources belonging to the specified deployment\. If this argument is not specified, a confirmation prompt is issued\.
+ `--confirm-security-change`

  Optional\. Confirms that you know that this command may make security\-related changes\. Specify this argument to disable the related confirmation prompt\.

For more information, see [ Applying Framework Updates to a Project](cloud-canvas-cgf-rm-versioning.md#cloud-canvas-cgf-rm-versioning-applying-framework-updates)\.

### `resource-group` Commands<a name="cloud-canvas-command-line-resource-group-commands"></a>

The `lmbr_aws resource-group` commands manage the resource groups in your Cloud Canvas project\.

#### resource\-group add<a name="cloud-canvas-command-line-resource-group-add"></a>

**Note**  
The functionality of this command has changed in Lumberyard 1\.11\. This command is deprecated in favor of the [resource\-group enable](#cloud-canvas-command-line-resource-group-enable) and [cloud\-gem create](#cloud-canvas-command-line-cloud-gem-create) commands\. As of Lumberyard 1\.11, project local resource groups are deprecated in favor of cloud gems\. Because cloud gems are reusable, we recommend that you use them instead of local resource groups\.

As of Lumberyard 1\.11, the `resource-group add` command has the following behavior:
+ If the resource group specified in the `--resource-group` parameter exists but is disabled, the resource group is enabled\. This is the equivalent of the `lmbr_aws resource-group enable` command\.
+ If the resource group does not exist, the `lmbr_aws cloud-gem create` command is called to create a new resource group in a cloud gem\. The name of the cloud gem is specified by the `--resource-group {resource-group-name}` parameter\.
  + By default, the new gem has no resources\. This corresponds to the `cloud-gem create` command's `--initial-content no-resources` option\. 
  + If the `--include-example-resources` option is specified, the equivalent of the `cloud-gem create` command's `--initial-content api-lambda-dynamodb` option is called\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `resource-group add` command accepts the following arguments:
+ `--resource-group {resource-group-name}` or `-r {resource-group-name}`

  Required\. The name of an existing resource group to enable\. If no resource group with the specified name exists, specifies the name of the cloud gem and resource group to be created\.
+ `--gem {gem-path}`

  Optional\. Looks for the resource group definition at `Gems\group\AWS` or `gem-path\AWS`\.
+ `--include-example-resources`

  Optional\. The equivalent of the `--initial-content api-lambda-dynamodb` option of the [cloud\-gem create](#cloud-canvas-command-line-cloud-gem-create) command\.

#### resource\-group disable<a name="cloud-canvas-command-line-resource-group-disable"></a>

Disable a resource group for debugging\. This command is new in Lumberyard 1\.11\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `resource-group disable` command accepts the following argument:
+ `--resource-group {resource-group-name}` or `-r {resource-group-name}`

  Required\. The name of the resource group to disable\.

By default, when a cloud gem is enabled for a project, all its resource groups are enabled\. Disabling a resource group has the following consequences:
+ When a deployment is created, the resources that the disabled resource group defines are not created in AWS\.
+ When a deployment is updated, the resources that were defined by the disabled resource group are removed\.
+ The resource group is added to a list of disabled resource groups in the project's `local-project-settings.json` file\.

**Note**  
Prior to Lumberyard 1\.11, the `local-project-settings.json` file kept a list of *enabled* resource groups\. By default, all of a cloud gem's resource groups are enabled when the cloud gem is enabled\. Therefore, listing only the disabled resource groups makes it easier to identify them\. 

Usually it is better to disable the cloud gem that provides a resource group than to disable the resource group itself\. Therefore, we recommend that you use the `resource-group disable` command only for debugging or testing\. To reenable a resource group, you can use the `lmbr_aws resource-group enable` command\.

#### resource\-group enable<a name="cloud-canvas-command-line-resource-group-enable"></a>

Enable a resource group\. This command is new in Lumberyard 1\.11\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `resource-group disable` command accepts the following argument:
+ `--resource-group {resource-group-name}` or `-r {resource-group-name}`

  Required\. The name of the resource group to enable\.

#### resource\-group list<a name="cloud-canvas-command-line-resource-group-list"></a>

List all the resource groups found in the local deployment template and in the selected deployment in AWS\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `resource-group list` command accepts the following argument:
+ `--deployment {deployment-name}` or `-d {deployment-name}`

  Optional\. The name of the deployment to list resource groups for\. If not given, the default deployment is used\.

Example output:

```
Name            Status           Reason                                                                           Timestamp          Id
--------------  ---------------  -------------------------------------------------------------------------------  -----------------  --------------------------------------------------------------------------------------------------------------------------------------------------
AnotherResourceGroup  CREATE_PENDING   Resource is defined in the local deployment template but does not exist in AWS.
HelloWorld      CREATE_COMPLETE                                                                                   03/04/16 18:42:57  arn:aws:cloudformation:us-east-2:<ACCOUNTID>:stack/foo-hw-Development-ZDLXUB7FKR94-HelloWorld-WSGZ15EUWX52/9b909d20-e238-11e5-a98d-50fae987c09a
```

#### resource\-group list\-resources<a name="cloud-canvas-command-line-resource-group-list-resources"></a>

List all of the resources associated with the project\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `resource-group list-resources` command accepts the following arguments:
+ `--deployment {deployment-name}` or `-d {deployment-name}`

  Optional\. The name of the deployment to list resources for\. If not specified, lists all the project's resources\.
+ `--resource-group {resource-group-name}` or `-r {resource-group-name}`

  Optional\. The name of the resource group to list resources for\. If specified, `deployment` must also be specified\. If not specified, all deployment or project resources are listed\.

#### resource\-group remove<a name="cloud-canvas-command-line-resource-group-remove"></a>

**Note**  
The functionality of this command has changed in Lumberyard 1\.11\. This command is deprecated in favor of the [cloud\-gem disable](#cloud-canvas-command-line-cloud-gem-disable) and [resource\-group disable](#cloud-canvas-command-line-resource-group-disable) commands\.

As of Lumberyard 1\.11, the `resource-group remove` command has the following behavior:
+ If the resource group specified in the `--resource-group` parameter is provided by a cloud gem, disables the cloud gem\. This is the equivalent of the `lmbr_aws cloud-gem disable` command\.
+ If the resource group is not provided by a cloud gem, disables the resource group\. This is the equivalent of the `lmbr_aws resource-group disable` command\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `resource-group remove` command accepts the following argument:
+ `--resource-group {resource-group-name}` or `-r {resource-group-name}`

  Required\. The name of the resource group or cloud gem to be disabled\.

#### resource\-group upload\-resources \(upload, update\)<a name="cloud-canvas-command-line-resource-group-upload"></a>

Update a resource group's AWS CloudFormation stack in a deployment\. `resource-group upload` or `resource-group update` can be used instead of `resource-group upload-resources`\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `resource-group upload` command accepts the following arguments:
+ `--confirm-aws-usage` or `-C`

  Optional\. Confirms that you know this command will create AWS resources for which you may be charged and that it may perform actions that can affect permissions in your AWS account\. Specify this argument to disable the related confirmation prompt\.
+ `--confirm-resource-deletion`

  Optional\. If the operation will delete resources permanently, confirms your acknowledgement and approval\. Specify this argument to disable the related confirmation prompt\.
+ `--confirm-security-change`

  Optional\. Confirms that you know that this command may make security\-related changes\. Specify this argument to disable the related confirmation prompt\.
+ `--deployment {deployment-name}` or `-d {deployment-name}`

  Optional\. The name of the deployment to update\. If not specified, the default deployment is updated\.
+ `--resource-group {resource-group-name}`, or `-r {resource-group-name}`

  Required\. The name of the resource group to update\. If not specified, all resource groups in the deployment are updated\.

### `resource-importer` Commands<a name="cloud-canvas-command-line-resource-importer-commands"></a>

The `lmbr_aws resource-importer` commands list and import AWS resource definitions to your Cloud Canvas project\.

#### resource\-importer import\-resource<a name="cloud-canvas-command-line-resource-importer-import-resource"></a>

Import a resource to a resource group\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `resource-importer import-resource` command accepts the following arguments:
+ `--type {dynamodb|s3|lambda|sns|sqs}`

  Optional\. The type of the AWS resource to import\. Choose from **dynamodb**, **s3**, **lambda**, **sns** or **sqs**\.
+ `--arn ARN`

  Required\. The ARN of the AWS resource to import\.
+ `--resource-name {resource-name}`

  Required\. The name of the resource to import\.
+ `--resource-group {resource-group-name}` or `-r {resource-group-name}`

  Required\. The name of the resource group to import\.
+ `--download`

  Optional\. If specified, downloads the contents of the Amazon S3 bucket\.

#### resource\-importer list\-importable\-resources<a name="cloud-canvas-command-line-resource-importer-list-importable-resources"></a>

List all supported resources currently existing on AWS\.

In addition to the [Common Arguments](#cloud-canvas-command-line-common-arguments), the `resource-importer list-importable-resources` command accepts the following arguments:
+ `--type {dynamodb|s3|lambda|sns|sqs}`

  Required\. The type of the AWS resource to list\. Choose from **dynamodb**, **s3**, **lambda**, **sns** or **sqs**\.
+ `--region {region}`

  Optional\. The AWS region of the resources\. The default value is the region of the project stack, if it exists\.
**Note**  
The `region` argument can be used only with the `resource-importer list-importable-resources` and `project create` commands\. To manually override the AWS region in other `lmbr_aws` commands, use the `--region-override` argument\.