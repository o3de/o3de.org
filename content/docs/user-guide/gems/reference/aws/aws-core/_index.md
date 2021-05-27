---
linktitle: AWS Core
title: AWS Core Gem
description: Open 3D Engine (O3DE) AWS Core Gem reference.
weight: 100
toc: true
---

{{< preview-new >}}

The AWS Core Gem enables developers to utilize AWS services from O3DE. It provides the common mechanisms to set up the required AWS C++ SDKs, configure platform clients, make HTTPS restful calls, handle generic responses & errors, and set up and utilize AWS credentials.

The Gem has the following key features:

* Initializes, [configures](https://docs.aws.amazon.com/sdk-for-cpp/v1/developer-guide/configuring.html), and terminates [AWS C++ SDK](https://docs.aws.amazon.com/sdk-for-cpp/v1/developer-guide/welcome.html).

  * Includes platform extensions for AWS C++ SDK.
  * Provides common client config ready for O3DE: [https://github.com/aws/aws-sdk-cpp/blob/master/Docs/ClientConfiguration\_Parameters.md](https://github.com/aws/aws-sdk-cpp/blob/master/Docs/ClientConfiguration_Parameters.md).

* Handles making HTTPS calls to AWS services including handling responses and errors.
* Provides mechanism for utilizing AWS Credentials including using existing AWS CLI profiles & roles along with CVars for easy configuration. See [Configuring AWS Credentials](./configuring-credentials.md) for more details.
* Supports AWS Resource sharing, making it easy to identify an AWS resource to use from O3DE.
* Provides utility functions to make it easy to work with AWS.

## Project level settings

On start up the AWS Core Gem will look for an `awscoreconfiguration.setreg` file in the current project directory: `<ProjectName>/Registry/awscoreconfiguration.setreg`.

In this file you can set the following options:

| Setting | Description |
| --- | --- |
| ProfileName | \[Optional\] The project will use **default** profile in `./aws/credential`. Overrides the **default** profile or any environment variable setting by using this variable. Must be a named profile in your credential file. |
| ResourceMappingConfigFileName | \[Optional\] The name of the resource mappings file to load while starting up. This variable is required if you need to utilize resource mappings file during runtime (which should be located under `<ProjectName>/Config` directory). See [Resource Mapping Tool & APIs](./resource-mapping.md) for more information. |

Example registry settings file:

```json
{
    "Amazon":
    {
        "AWSCore": {
            "ProfileName": "testprofile",
            "ResourceMappingConfigFileName": "test_aws_resource_mappings.json"
        }
    }
}
```

Example project mappings file:

```json
{
    "AWSResourceMappings": {
        "MyKey": {
            "Name/ID": "Thing",
            "Type": "AWS::Lambda::Function"
        }
    },
    "AccountId": "123456789",
    "Region": "us-west-2",
    "Version": "1.0.0"
}
```
