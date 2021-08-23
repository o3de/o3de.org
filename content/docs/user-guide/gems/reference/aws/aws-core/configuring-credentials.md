---
title: Configuring AWS Credentials
description: Learn how to configure AWS credentials in Open 3D Engine for AWS cloud-connected features.
weight: 150
toc: true
---

To work with AWS resources in O3DE, you first need an AWS account. See the [AWS home page](https://aws.amazon.com/) for instructions on creating an account.

You will also need to provision AWS credentials for your users. You can choose between short-term and long-term credentials. Long-term credentials are convenient during the development process. They're easier to configure, but you need to be careful they are kept secure. Short-term credentials are generally recommended for release because they have a finite lifetime. For more information and best practices, refer to the AWS topic on [Best Practices for Managing AWS Access Keys](https://docs.aws.amazon.com/general/latest/gr/aws-access-keys-best-practices.html#use-roles) using IAM roles.

* To provision long-term credentials, create an AWS Identity and Access Management (IAM) user with programmatic credentials and use one of the methods below. See [AWS Credentials - Programmatic Access](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys) for more information.

* To provide short-term credentials, use the [AWS Client Auth Gem](/docs/user-guide/gems/reference/aws/aws-client-auth) or use the AWS Security Token Service (STS) to generate [temporary security credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html).

It is strongly recommend against using your AWS root account for day-to-day tasks. Instead, create a user in IAM with programmatic access credentials. Best practice is to change this account's access key regularly and follow the practice of least privileges. For more information on managing access keys, see [Managing Access Keys for IAM Users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) in the AWS IAM User Guide.

## AWS CLI

It is recommended to use the [AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html) (CLI) (version 2) to manage the import and configuration of AWS credentials. If you have not configured credentials or a region on your computer, the easiest way to satisfy this requirement is to use the AWS `configure` command:

```cmd
aws configure
```

Using this command you can provide your AWS access key ID, secret access key, and default region when prompted.

If you don't have access keys and secret keys, you must sign in as an IAM user, create an access key, and download credentials using the steps shown in the AWS Reference Guide for [Programmatic Access](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys).

You can easily imported the exported credentials using the AWS `import` sub-command (requires AWS CLI version 2):

```cmd
aws configure import --csv file://credentials.csv
```

For more information on using AWS CLI configure commands, see [Configuration and Credential File Settings](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) in the AWS CLI User Guide.

## Providing local credential and config files

If you have an automated process or other provisioning mechanism, you can place pre-configured user credential and config files.

First, manually create or edit the `~/.aws/config` and `~/.aws/credentials` files (on macOS or Linux) or `%USERPROFILE%\.aws\config` and `%USERPROFILE%\.aws\credentials` files(on Windows) to contain credentials and a default region, in the following format.

In `~/.aws/config` or `%USERPROFILE%\.aws\config`

```toml
[default]
region=us-west-2
```

In `~/.aws/credentials` or `%USERPROFILE%\.aws\credentials`

```toml
[default]
aws_access_key_id=AKXXXXXXXXXXX
aws_secret_access_key=xxXXXXXXBF/2Zp9Utk/h3yCo8nvbEXAMPLEKEY
```

## Using environment variables to provide credentials

You can also provide credentials using environmental variables:

| Variable | Description |
| --- | --- |
| `AWS_ACCESS_KEY_ID` | The AWS access key id to use. |
| `AWS_SECRET_ACCESS_KEY` | The AWS secret key id to use. |
| `AWS_SESSION_TOKEN` | The AWS session token to use (optional). If you are working with short-term credentials you will need to include the session token. |
| `AWS_DEFAULT_REGION` | The default AWS region. |

For more information on using environment variables for credentials, see [Environment variables to configure the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html) in the AWS CLI User Guide.

## Using O3DE console variables to provide credentials

This will only work when using an O3DE runtime binary (Launcher and Editor). Credentials can be provided by setting Console Variables (CVARs), such as in the following example:

```cmd
Editor.exe +cl_awsAccessKey AKXXXXXXXXXXX +cl_awsSecretKey xxXXXXXXBF/2Zp9Utk/h3yCo8nvbEXAMPLEKEY
```

Note: Because of a console variable string size limitation, providing session tokens using this method is not supported.

| CVar | Description |
| --- | --- |
| `cl_awsAccessKey` | The AWS access key id to use. |
| `cl_awsSecretKey` | The AWS secret key id to use. |

## Setting a default profile

If your development machine is configured with named profiles in your local AWS credentials file, you can set a default profile to use with O3DE on a per-project basis. See [Project Settings](./_index.md#project-settings) for more information.

You can use the following commands to list your defaults and all named profiles (requires AWS CLI version 2):

```cmd
// Show the current defaults.
aws configure list

// Show all the named profiles.
aws configure list-profiles
```

## More help

* For general help with AWS CLI configuration commands, see [Configuring the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html).

* For help with configuring credentials for the **AWS C++ SDK**, see [Providing AWS credentials](https://docs.aws.amazon.com/sdk-for-cpp/v1/developer-guide/credentials.html).
