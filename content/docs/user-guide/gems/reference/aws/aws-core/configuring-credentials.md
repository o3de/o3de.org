---
title: Configuring AWS Credentials
description: Learn how to configure AWS credentials in Open 3D Engine for AWS cloud-connected features.
weight: 150
toc: true
---

These instructions assume that you have (or will have) administrative access to an AWS account. For more information, see [AWS home page](https://aws.amazon.com/) for instructions on creating an account, [AWS account root user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html) and [Creating your first IAM admin user and group in the IAM User Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html). If you already have an AWS account but you do not have administrative access to it, see your AWS account administrator. 

The expectation is that, by the end of this guide and its linked resources, you will:
* Understand how to setup AWS usage for O3DE
* Understand how to controll permissions for AWS users via policies and groups
* Understand steps to take around team setup
* Have a sense about how to manage credentials during development and release/distribution phases of your project.

# General Advice for Working with AWS Credentials
You will also need to provision AWS credentials for your users. You can choose between short-term and long-term credentials. Long-term credentials are convenient during the development process. They're easier to configure, but you need to be careful they are kept secure. Short-term credentials are generally recommended when you distribute your builds and in release because they have a finite lifetime. For more information and best practices, refer to the AWS topic on [Best Practices for Managing AWS Access Keys](https://docs.aws.amazon.com/general/latest/gr/aws-access-keys-best-practices.html#use-roles) using IAM roles.

* To provision long-term credentials, create an AWS Identity and Access Management (IAM) user with programmatic credentials and use one of the methods below. See [AWS Credentials - Programmatic Access](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys) for more information.

* To provide short-term credentials, use a service like [AWS Cognito](https://aws.amazon.com/cognito/) or the AWS Security Token Service (STS) to generate [temporary security credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html). The [AWS Client Auth Gem](/docs/user-guide/gems/reference/aws/aws-client-auth) provides configuration points for using Cognito in O3DE.

It is strongly recommend against using your AWS account root user for day-to-day tasks. Instead, create user or roles in IAM to achieve this. Best practice is to change users' access keys regularly and follow the practice of least privileges. For more information on managing access keys, see [Managing Access Keys for IAM Users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) in the AWS IAM User Guide.


## Setting up Credentials as an Individual

This section assumes you have an [AWS IAM Administrator user](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html) setup for your AWS account.

For local development with AWS and O3DE setup an IAM user with long term programatic credentials. If you don't have access keys configured, use the AWS Console to generate and download new access key for an existing or new IAM user using the steps shown in the AWS Reference Guide for [Programmatic Access](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys).

Chose from the following options to setup a user's AWS credentials so they can be used in O3DE. If you are using [named profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html) remember to set the profile in the project settings.

### Option 1: Configured via the AWS CLI

It is recommended to use the [AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html) (CLI) (version 2) to manage the import and configuration of AWS credentials. If you have not configured credentials or a region on your computer, the easiest way to satisfy this requirement is to use the AWS `configure` command:

```cmd
aws configure
```

Using this command you can provide your AWS access key ID, secret access key, and default region manually when prompted. 

Alternatively, when you create new access keys for a user, you are given the option to download the keys as a CSV. You can then automatically import them using the AWS `import` sub-command (requires AWS CLI version 2):

```cmd
aws configure import --csv file://credentials.csv
```

For more information on using AWS CLI configure commands, see [Configuration and Credential File Settings](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) in the AWS CLI User Guide.

## Option 2: Configure local credentials via config files

If you have an automated process or other provisioning mechanism, you can place pre-configured user credentials in the standard AWS config files.

First, manually create or edit the `~/.aws/config` and `~/.aws/credentials` files (on macOS or Linux) or `%USERPROFILE%\.aws\config` and `%USERPROFILE%\.aws\credentials` files(on Windows) to contain credentials and a default region, in the following format.

In `~/.aws/config` or `%USERPROFILE%\.aws\config`

```toml
[default]
region=us-west-2
```

In `~/.aws/credentials` or `%USERPROFILE%\.aws\credentials` set up [named profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html). Note the ```default``` profile is a special profile that is used no profile is explicitly referenced. 

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

If your development machine is configured with named profiles in your local AWS credentials file, you can set a profile to be automatically used with O3DE on a per-project basis. This profile should be then set in the [O3DE Project Settings](./#project-settings) file and will then be used by default each time the Editor starts.

You can use the following commands to list your defaults and all named profiles (requires AWS CLI version 2):

```cmd
// Show the current defaults.
aws configure list

// Show all the named profiles.
aws configure list-profiles
```

## Setting Permissions for Individual Users

All AWS IAM users are given permissions through the attachment of managed or inline IAM polices. See [Changing permissions for an IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_change-permissions.html).

Its recommended that you:
* Use an Admin, that is a user with full permissions on an AWS account, when absolutely necessary, such as deploying and provisioning AWS resources.
* Grant [least privileges](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#grant-least-privilege) on your AWS users, that is they only have the minimum set of permissions on specific resources required through setting of managed IAM policies and other mechanisms.

To make managing permissions easier, its recommended that you create user groups. Many of the CDK samples provide with O3DE are based on the notion of two groups of users (you may have others):

* Admin - users required to own and manager resources. Typically performing updates and management of key resources.
* Users - set of users that take action on the resources as part of normally gameplay or simulation.





## Setting up Credentials for a Team

{{< note >}}
You can use [AWS Single Sign-On (SSO)](https://aws.amazon.com/single-sign-on/) instead of IAM to enable multiple users within a single AWS account to work with O3DE. In this usage pattern, the single AWS account serves as the management account for an organization in AWS Organizations, and that organization has no member accounts. To use AWS SSO, skip this topic and follow the instructions in Enterprise Setup instead. For related information, see the [What is AWS Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html) and [What is AWS Single Sign-On](https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html) guides.
{{< /note >}}

Steps:
1. Create IAM users using the set up

### Option 1: Using the AWS Core CDK

If you are using the [AWSCore Example Stack](./cdk-application.md) as starting point, it will create

## More help

* For general help with AWS CLI configuration commands, see [Configuring the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html).

* For help with configuring credentials for the **AWS C++ SDK**, see [Providing AWS credentials](https://docs.aws.amazon.com/sdk-for-cpp/v1/developer-guide/credentials.html).
