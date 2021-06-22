---
title: Resource Mapping Files
description: Learn about the resource mapping file used by AWS Gems in the Open 3D Engine (O3DE).
weight: 300
toc: true
---

A **resource mapping file** is a JSON file that provides a map of a **lookup name** to a collection of **properties** about an AWS resource. Each mapping has the following format:

**Resource entry format**

```json
string  {
    "Type": string, (required)
    "Name/ID": string, (required)
    "Region": string, (optional)
    "AccountId": string (optional)
}
```

Each entry has a lookup string - a logical name for the resource - that is used to find entries in the mapping file during usage.

* Type - AWS resource type, e.g. AWS::Lambda::Function, AWS::S3::Bucket, etc.
* Name/ID - AWS resource name or id
* Region - Used to override global region attribute if this resource is deployed to a different AWS region.
* AccountId - Used to override global account id attribute if we want to support cross account use case (arguable)

The mapping file also supports three global attributes:

* AccountId - The AWS account has resources in this mapping file
* Region - The region in which resources are located in this mapping file (should match with partition)
* Version - The json schema version of this document.

**Example of a complete mapping file**

```json
{
    "AWSResourceMappings": {
        "MyKey": {
            "Name/ID": "ExampleLambda",
            "Type": "AWS::Lambda::Function"
        }
    },
    "AccountId": "123456789123",
    "Region": "us-west-2",
    "Version": "1.0.0"
}
```

This mappings file has a single mapping: **MyKey**, which is a Lambda function called "ExampleLambda". It is deployed in us-west-2 in the AWS account with account ID "123456789123".

## Generating a resource mappings file

The mapping files have a well-defined JSON format. They can be generated using custom tools or by hand. However, the easiest way to generated these files is by using the visual [resource mapping tool](/docs/user-guide/gems/reference/aws/aws-core/resource-mapping-tool.md) provided with O3DE to generate and edit the files.

All mapping files should be saved into the project's `Config` directory.

## Using resource mappings

The resource mapping file to use on load is controlled by the `ResourceMappingConfigFileName` in the `awscoreconfiguration.setreg` file, located in the project's `Registry` directory. See [Project Settings](./getting-started.md#project-settings) for more information about this file. The AWS Core Gem will read this mapping file and support access to the mappings.

The AWS Core Gem provides a request bus (`AWSResourceMappingRequestBus`) to support interaction with a configured resource mapping file. Supported functions are described in the [AWSResourceMappingRequests](https://docs.o3de.org/docs/api/gems/awscore/class_a_w_s_core_1_1_a_w_s_resource_mapping_requests.html) class API reference.

**Example: Reading an entry**

```cpp
// Read settings for a mapping entry called "MyTableKey".
AZStd::string requestTableName = "";
AWSResourceMappingRequestBus::BroadcastResult(requestTableName, &AWSResourceMappingRequests::GetResourceNameId, "MyTableKey");

AZStd::string requestRegion = "";
AWSResourceMappingRequestBus::BroadcastResult(requestRegion, &AWSResourceMappingRequests::GetResourceRegion, "MyTableKey");
```
