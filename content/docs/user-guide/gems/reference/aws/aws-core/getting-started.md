---
title: Getting Started with AWS Gems
description: Learn how to set up the AWS Core Gem for accessing AWS services from your Open 3D Engine (O3DE) project.
toc: true
weight: 100
---

To get started using AWS Gems with AWS services in your O3DE project, complete the following steps.

1. [Create an AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html) if you don't have one.

1. Configure **AWS credentials** following the instructions in [Configuring AWS Credentials for O3DE](./configuring-credentials/).

    a. Confirm you have credentials using the command `aws configure list`.

1. Install the [AWS Cloud Development Kit (CDK)](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html#getting_started_install).

    a. Confirm the CDK is setup using the command `cdk --version`.

1. **Build** your O3DE project with the AWS Core Gem (and other AWS Gems you need) enabled.

1. Deploy the **CDK applications** for the AWS Gems you have enabled. See [Deploying the CDK Application](./cdk-application/) for instructions.

1. Configure a [resource mapping file](./resource-mapping-files/) using the [Resource Mapping Tool](./resource-mapping-tool/).

1. Associate the resource mapping file with the project. See the next section entitled [Project Settings](#project-settings).

You should now be able to utilize AWS functions in Lua script, Script Canvas, or C++ to communicate with your AWS resources. See [Scripting with AWS Core](./scripting/) for scripting examples.

## Prevent calls to Amazon EC2 Instance Metadata Service

AWS Gems use the [AWS C++ SDK](https://github.com/aws/aws-sdk-cpp) to call AWS resources. Unless your project is running on Amazon EC2 compute, it's recommended that you turn off Amazon EC2 Instance Metadata Service (IMDS) queries by setting the [AWS_EC2_METADATA_DISABLED](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html) environment variable to `true`. 
Setting this environment variable will prevent SDK resources from needlessly attempting to contact the Amazon EC2 IMDS for configuration, region, and credential information, which can result in delays and wasted network resources.

```
# macOS / Linux
export AWS_EC2_METADATA_DISABLED=true

# Windows (for all sessions)
setx AWS_EC2_METADATA_DISABLED true

# Windows (for just this session)
set AWS_EC2_METADATA_DISABLED=true
```

## Project settings

On start up the AWS Core Gem will look for the `awscoreconfiguration.setreg` file in the project's registry directory: `<ProjectName>\Registry`.

You will need to create this file if you want to set any of the following options. Use the format shown in the example.

| Setting | Description |
| --- | --- |
| **ProfileName** | \[Optional\] The project will use your **default** profile in `./aws/credentials` (on macOS and Linux) or `%USERPROFILE%\.aws\credentials` (on Windows). Override the **default** profile or any environment variable setting by using this variable. Must be a named profile in your `credentials` file. |
| **ResourceMappingConfigFileName** | \[Optional\] The name of the resource mapping file to load while starting up. Resource mapping files are expected to be located in `<ProjectName>\Config`. See [Resource Mapping Files](./resource-mapping-files/) for more information. |

{{< note >}}
If you make changes to this file, you will need to restart the O3DE Editor.
{{< /note >}}

Example registry settings file:

```json
{
    "Amazon":
    {
        "AWSCore": {
            "ProfileName": "testprofile",
            "ResourceMappingConfigFileName": "default_aws_resource_mappings.json"
        }
    }
}
```
