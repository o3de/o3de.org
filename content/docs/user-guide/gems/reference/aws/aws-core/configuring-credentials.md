---
title: Configuring AWS Credentials
description: Learn how to configure AWS credentials in Open 3D Engine for AWS cloud-connected features.
weight: 150
toc: true
---

These instructions assume that you have (or will have) administrative access to an AWS account. For more information, see [AWS home page](https://aws.amazon.com/) for instructions on creating an account, information about the [AWS account root user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html) and [Creating your first IAM admin user and group in the IAM User Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html). If you already have an AWS account, but you do not have administrative access to it, see your AWS account administrator. 

The expectation is that, by the end of this guide and its linked resources, you will:
* Understand how to set up AWS credentials for O3DE
* Understand how to control permissions for AWS users via policies and groups
* Understand steps to take around team setup.
* Have a sense about how to manage credentials during the development and release/distribution phases of your project.

The setup flow for an [individual user](#setting-up-credentials-as-an-individual):
* Create any IAM users required
* Export their credentials to the local environment
* Add any AWS permissions required

To [manage a team](#setting-up-credentials-for-a-team):
* Setup users and IAM credentials
* Create user groups 
* Add AWS IAM users to the appropriate user group
* Add AWS permissions to the user groups

## General Advice for Working with AWS Credentials
You will need to provide AWS credentials for users. You can choose between short-term and long-term credentials. Long-term credentials are convenient during the development process. They're easier to configure, but you need to be careful they are kept secure. Short-term credentials are generally recommended when you distribute your builds to external users because they have a finite lifetime. For more information and best practices, refer to the AWS topic on [Best Practices for Managing AWS Access Keys](https://docs.aws.amazon.com/general/latest/gr/aws-access-keys-best-practices.html#use-roles) using IAM roles.

* To provision long-term credentials, create an AWS Identity and Access Management (IAM) user with programmatic credentials and use one of the methods below. See [AWS Credentials - Programmatic Access](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys) for more information. 

* To provide short-term credentials, use [AWS Cognito](https://aws.amazon.com/cognito/) or [AWS Security Token Service](https://docs.aws.amazon.com/STS/latest/APIReference/welcome.html) to generate [temporary security credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html). The [AWS Client Auth Gem](/docs/user-guide/gems/reference/aws/aws-client-auth) provides configuration points for using Cognito in O3DE.

* To support IAM roles, see the [IAM roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html) documentation for more information and follow [Using an IAM role in the AWS CL](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-role.html) for setup information.

It is strongly recommend against using your AWS account root user for day-to-day tasks. Instead, create user or roles in IAM to achieve this. Best practice is to change users' access keys regularly and follow the practice of least-privileges. For more information on managing access keys, see [Managing Access Keys for IAM Users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) in the AWS IAM User Guide.


## Setting up Credentials as an Individual

This section assumes you have an [AWS IAM Administrator user](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html) setup for your AWS account.

For local development with AWS setup this guide covers how to use an IAM user with long term programmatic credentials. If you don't have access keys configured, use the AWS Console to generate and download new access keys for an existing or new IAM user using the steps shown in the AWS Reference Guide for [Programmatic Access](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys).

If you want to use short-term credentials for working with AWS, please see setup information in the [AWS Client Auth Gem](/docs/user-guide/gems/reference/aws/aws-client-auth).

Chose from the following options to set up a user's AWS credentials for use in O3DE. If you are using [named profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html) remember to set the profile in the project settings.

### Option 1: Create a named profile via the AWS CLI

O3DE recommends using the [AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html) (CLI) (version 2) to manage the import and configuration of AWS credentials. If you have not configured credentials or a region on your computer, the easiest way to satisfy this requirement is to use the AWS `configure` command:

```cmd
aws configure
```

Using this command you can provide your AWS access key ID, secret access key, and default region manually when prompted. 

Alternatively, when you create new access keys for a user, you are given the option to download the keys as a CSV. You can then automatically import them using the AWS `import` sub-command (requires AWS CLI version 2):

```cmd
aws configure import --csv file://credentials.csv
```

This will create a named profile based on the name of the iam user in your .credentials file. You can control what profile is used by default in the AWS CLI, either by setting a ```[default]``` profile or through the use of the [AWS_DEFAULT_PROFILE](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html#using-profiles) environment variable.

For more information on using AWS CLI configure commands, see [Configuration and Credential File Settings](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) in the AWS CLI User Guide. 

You can also utilize IAM roles via role based profiles, see [Using an IAM role in the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-role.html) for further information.

### Option 2: Configure local credentials via config files

If you have an automated process or other provisioning mechanism, you can place pre-configured user credentials in the standard AWS config files.

First, manually create or edit the `~/.aws/config` and `~/.aws/credentials` files (on macOS or Linux) or `%USERPROFILE%\.aws\config` and `%USERPROFILE%\.aws\credentials` files(on Windows) to contain credentials and a default region, in the following format.

In `~/.aws/config` or `%USERPROFILE%\.aws\config` set your default region

```toml
[default]
region=us-west-2
```

In `~/.aws/credentials` or `%USERPROFILE%\.aws\credentials` set up [named profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html). Note the ```default``` profile is a special profile that is used when no profile is explicitly referenced. 

```
[default]
aws_access_key_id=AKXXXXXXXXXXX
aws_secret_access_key=xxXXXXXXBF/2Zp9Utk/h3yCo8nvbEXAMPLEKEY
```

### Option 3: Using environment variables to provide credentials

You can also provide AWS credentials using environmental variables:

| Variable | Description |
| --- | --- |
| `AWS_ACCESS_KEY_ID` | The AWS access key id to use. |
| `AWS_SECRET_ACCESS_KEY` | The AWS secret key id to use. |
| `AWS_SESSION_TOKEN` | The AWS session token to use (optional). If you are working with short-term credentials you will need to include the session token. |
| `AWS_DEFAULT_REGION` | The default AWS region. |

For more information on using environment variables for credentials, see [Environment variables to configure the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html) in the AWS CLI User Guide.

### Option 4: Using O3DE console variables to provide credentials

This will only work when using an O3DE runtime binary (Launcher and Editor). Credentials can be provided by setting Console Variables (CVARs), such as in the following example:

```cmd
Editor.exe +cl_awsAccessKey AKXXXXXXXXXXX +cl_awsSecretKey xxXXXXXXBF/2Zp9Utk/h3yCo8nvbEXAMPLEKEY
```

Note: Because of a console variable string size limitation, providing session tokens using this method is not supported.

| CVar | Description |
| --- | --- |
| `cl_awsAccessKey` | The AWS access key id to use. |
| `cl_awsSecretKey` | The AWS secret key id to use. |


## Setting a default profile to use in O3DE

If your development machine is configured with named profiles in your local AWS credentials file, you can set a profile to be automatically used with O3DE on a per-project basis. This profile should be then set in the [O3DE Project Settings](./getting-started/#project-settings) file and will then be used by default each time the Editor starts.

You can use the following commands to list your defaults and all named profiles (requires AWS CLI version 2):

```cmd
// Show the current defaults.
aws configure list

// Show all the named profiles.
aws configure list-profiles
```

## Controlling Permissions for Users
All AWS IAM users are given permissions through the attachment of managed or inline IAM polices. See [Changing permissions for an IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_change-permissions.html).

Its recommended that you:
* Use an Admin user, that is a user with full permissions on an AWS account, when absolutely necessary, such as deploying and provisioning AWS resources.
* Grant [least privileges](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#grant-least-privilege) on your AWS users, that is they only have the minimum set of permissions on specific resources they require. This is controlled through setting of managed IAM policies and other mechanisms.
* As you add and review AWS resources, you update managed policies to grant or revoke the appropriate permissions.

### Create an IAM User Groups
To make managing permissions easier, it's recommended that you create [user groups](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups.html). User groups let you specify permissions for multiple users at time, which can make it easier to manage the permissions for those users.

You can create user groups via the console, the cli or through the CloudFormation/CDK. We recommend you create at least two user groups to work with AWS in O3DE:
* Admins - Administrator users required to own and manage AWS resources. Typically, performing updates and management of key resources.
* Users - set of users that take action on the resources as part of normally gameplay or simulation.

#### Create a user group via the AWS Console
1. Sign in to the AWS Management Console, if you are not already signed in, at https://console.aws.amazon.com/iamv2
2. Open the IAM console. To do this, in the AWS navigation bar, choose Services. Then choose **IAM**.
3. In the IAM console's navigation pane, choose **Groups**.
4. Choose **Create New Group**.
5. On the Set Group Name page, for Group Name, enter a name for the new group. 
6. Choose Next Step.
7. On the **Attach Policy** page, choose **Next Step** without attaching any policies or attach any current policies relevant to the group.
8. Choose **Create Group**. 

#### Create a user group via the AWS CLI
1. Install and configure the AWS CLI as above, see [Installing the AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/installing.html).
2. Generate a user group
```
aws iam create-group --group-name MyUserGroup
```

#### Create user groups via the AWS CDK Examples
The AWSCore CDK stack will autogenerate sample Admins and Users user groups for you. By default, these groups are named ```O3DE-AWS-PROJECT-Admins``` and ```O3DE-AWS-PROJECT-Users```.

See the [CDK setup instructions](cdk-application) for more details.

### Add Users to the User Group
You can add users to IAM User Groups via the console or the CLI. See [Adding and removing users in an IAM user group ](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups_manage_add-remove-users.html) for full details.

You can quickly add users via the cli as follows:

```
aws iam add-user-to-group --group-name MyGroup --user-name MyNewUser
```

### Attach Permissions to the User Group
You can attach IAM policies to a user group to control the permissions they have access to. This can be done via the Console, the AWS CLI or via CloudFormation/CDK. See [Attaching a policy to an IAM user group ](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups_manage_attach-policy.html) to attach permissions via the AWS Console or CLI.

#### Working with O3DE CDK Examples
If you deploy both the Core and example stack you can see examples of automatically generating user permissions via the ```generate_user_policy``` and ```generate_admin_policy``` functions, which are then automatically attached to the user groups via the call to ```__grant_access```.

See the CDK [Permissions](https://docs.aws.amazon.com/cdk/latest/guide/permissions.html) documentation for more details.

Many of the feature gems, such as [AWS Metrics]() create managed policies for users and admins that can then be attached manually to these groups. 

##### Via the Console
* Open the AWS console at https://console.aws.amazon.com/cloudformation.
* Navigate to the desired stack in a region.
* Click **Resources** tab.
* Look for ```AWS::IAM::ManagedPolicy``` in the stack, record the policy name.
* Then go to https://console.aws.amazon.com/iam
* Select **user groups**
* Click on the user group
* Select **permissions**, then **add permissions** and select **attach polices**.
* Filter for policy to attach and select it
* Hit **Attach Policies**.

##### Via the AWS CLI

* List all stacks ```aws cloudformation describe-stacks --region <region>````
* [List required stack resources](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-listing-stack-resources.html) ```aws cloudformation list-stack-resources --stack-name <feature stack> --region <region>```
* Search for the ```WS::IAM::ManagedPolicy```resources and record the physical id of the resource, which should be in the form of the policy ARN.
* [Attach the relevant policy](https://docs.aws.amazon.com/cli/latest/reference/iam/attach-group-policy.html) to the user groups as desired: ```aws iam  attach-group-policy --group-name <group name> --policy-arn <policy arn>```

## Setting up Credentials for a Team

{{< note >}}
You can use [AWS Single Sign-On (SSO)](https://aws.amazon.com/single-sign-on/) instead of IAM to enable multiple users within a single AWS account to work with O3DE. In this usage pattern, the single AWS account serves as the management account for an organization in AWS Organizations, and that organization has no member accounts. To use AWS SSO, skip this topic and follow the instructions in Enterprise Setup instead. For related information, see the [What is AWS Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html) and [What is AWS Single Sign-On](https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html) guides.
{{< /note >}}

To set up a team, repeat the instructions above to:
1. Create IAM relevant IAM groups to group users. See the [Create an IAM User Groups](#create-an-iam-user-groups) instructions in this guide.
2. Provide any [permissions required](#attach-permissions-to-the-user-group) to access AWS resources to those user groups. 
3. Create any IAM users and distribute credentials using the instructions above for [individual users](#setting-up-credentials-as-an-individual) as a guide.
4. [Add users](#add-users-to-the-user-group) to the relevant user groups to grant them permissions required.

Please read [General Advice for Working with AWS Credentials](#general-advice-for-working-with-aws-credentials) to decide the right method of providing AWS IAM credentials for your O3DE project.

## More help

* For general help with AWS CLI configuration commands, see [Configuring the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html).
* For help with configuring credentials for the **AWS C++ SDK**, see [Providing AWS credentials](https://docs.aws.amazon.com/sdk-for-cpp/v1/developer-guide/credentials.html).
* For help with manging permissions for AWS resources see [Policies and permissions in IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html).
* For help with using [IAM Roles]().
