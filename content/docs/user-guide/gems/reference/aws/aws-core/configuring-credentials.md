---
title: Configuring AWS Credentials
description: Learn how to configure AWS credentials in Open 3D Engine for AWS cloud-connected features.
weight: 100
toc: true
---

{{< preview-new >}}

To work with AWS resources in O3DE, you will need to provision AWS Credentials for your users.

This can be achieved in two different ways:

* To provision long-term credentials, create an IAM user with programmatic credentials and use one of the methods below. See [AWS Credentials - Programmatic Access](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys) for more information.

* To provide short-term credentials, integrate with AWS ClientAuth or follow [https://docs.aws.amazon.com/IAM/latest/UserGuide/id\_credentials\_temp.html](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html)

Its strongly recommend against using your AWS root account for day-to-day tasks. Instead, its recommended you create a user in IAM with programmatic access credentials. Best practices are to change this account's access key regularly and to use a least-privileges role (see [https://docs.aws.amazon.com/IAM/latest/UserGuide/id\_credentials\_access-keys.html](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html)). If you are integrating with ClientAuth and the end user only needs to interact with deployed AWS resources, then you can skip local provisioning of AWS credentials

## AWS CLI

It is recommended to use the AWS CLI to manage the import and configuration of AWS credentials. If you have not configured credentials or region on your development machine, then the easiest way to satisfy this requirement is issue the following command:

```cmd
aws configure
```

Here you can provide your your AWS access key ID, secret access key, and default region when prompted.

If you don't have access keys and secret keys, you will need to create and export credentials for IAM users in your account. See [https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys).

You can easily imported exported credentials using the import command:

```cmd
aws configure import --csv file://credentials.csv
```

For more information see [https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)

## Provide local credential and config files

If you have an automated process or other provisioning mechanism, you can place pre-configured credentials for a user by providing credential and config files locally for the user.

Firstly, manually create or edit the `~/.aws/config` and `~/.aws/credentials` (macOS/Linux) or `%USERPROFILE%\.aws\config` and `%USERPROFILE%\.aws\credentials` (Windows) files to contain credentials and a default region, in the following format.

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

## Environment variables

You can also provide credentials using environmental variables:

| Variable | Description |
| --- | --- |
| `AWS_ACCESS_KEY_ID` | The AWS access key id to use. |
| `AWS_SECRET_ACCESS_KEY` | The AWS secret key id to use. |
| `AWS_SESSION_TOKEN` | The AWS session token to use (optional). If you are working with short-term credentials you will need to include the session token. |
| `AWS_DEFAULT_REGION` | The default AWS region. |

See [https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html) for further information.

## O3DE console variables

This will only work when using an O3DE runtime binary (launcher and editor). Credentials can be provided by setting the following Console Variables (CVARs), for example:

```cmd
od3d_editor.exe +cl_awsAccessKey AKXXXXXXXXXXX +cl_awsSecretKey xxXXXXXXBF/2Zp9Utk/h3yCo8nvbEXAMPLEKEY
```

Note: As console variable string size limitation, session token won't be supported.

| CVar | Description |
| --- | --- |
| `cl_awsAccessKey` | The AWS access key id to use |
| `cl_awsSecretKey` | The AWS secret key id to use |

See [https://docs.aws.amazon.com/lumberyard/latest/userguide/system-console.html](https://docs.aws.amazon.com/lumberyard/latest/userguide/system-console.html) for more information about working console variables.

## Setting a default named profile to work with O3DE

If your development machine is configured with named profiles in your local AWS credentials file, you can set a default profile to use with O3DE on a per project basis. See [AWS Core - Project Level Settings](./index.md#project-level-settings) for instructions.

You can use the following commands to help (Assumes AWS CLI 2.0):

```cmd
// Show the current defaults.
aws configure --list

// Show all the named profiles.
aws configure list--profiles
```

## More help

* Configuring credentials with the AWS CLI: [https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)  

* Configuring credentials for the AWS C++ SDK: [https://docs.aws.amazon.com/sdk-for-cpp/v1/developer-guide/credentials.html](https://docs.aws.amazon.com/sdk-for-cpp/v1/developer-guide/credentials.html)
