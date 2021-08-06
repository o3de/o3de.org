---
title: Resource Mapping Files
description: Learn about the resource mapping file used by AWS Gems in the Open 3D Engine (O3DE).
weight: 300
toc: true
---

A **resource mapping file** is a JSON file that provides a map of **lookup names** to a collection of **attributes** about AWS resources. O3DE runtimes can query the mapping file to easily find and utilize AWS resources. Typically, a project under development will use a different deployment, and therefore a different mapping file, than the released version of the project.

A mapping file contains one or more resource entries and a set of global attributes.

**Resource entry format**

Each entry defines a lookup name - a logical name for the resource - and a collection of attributes in the following format:

```json
"<lookup name>":  {
    "Type": string, (required)
    "Name/ID": string, (required)
    "Region": string, (optional)
    "AccountId": string (optional)
}
```

***Supported attributes***
* Type - AWS resource type, e.g. AWS::Lambda::Function, AWS::S3::Bucket etc. Should map to a [CloudFormation resource type](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html).
* Name/ID - AWS resource name or id.
* Region - Used to override the global region attribute, if this resource is deployed to a different AWS region.
* AccountId - Used to override the global account id attribute, if this resource is deployed in a different AWS account.

**Global attributes**
The mapping file also supports three **required** global attributes:

* AccountId - The default AWS account containing resources in this mapping file.
* Region - The default region to use with this mapping file.
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

This mapping file has a single mapping: **MyKey**, which is a Lambda function called "ExampleLambda". It is deployed in us-west-2 in the AWS account with account ID "123456789123".

## Generating a resource mappings file

The mapping files have a well-defined [JSON format](/docs/user-guide/gems/reference/aws/aws-core/resource-mapping-schema.md). They can be generated using custom tools or by hand. However, the easiest way to generate or edit these files is by using the visual [resource mapping tool](/docs/user-guide/gems/reference/aws/aws-core/resource-mapping-tool.md) provided with O3DE.

All mapping files should be saved into the project's `Config` directory.

## Using resource mappings

Define the resource mapping file to use on load in the `ResourceMappingConfigFileName` setting in the `awscoreconfiguration.setreg` file, located in the project's `Registry` directory. See [Project Settings](./getting-started.md#project-settings) for more information about this file. The AWS Core Gem loads the defined mapping file on initialization and supports access to the mappings.

Use the request bus (`AWSResourceMappingRequestBus`) to interact with a configured resource mapping file. See [AWSResourceMappingRequests](https://o3de.org/docs/api/gems/awscore/class_a_w_s_core_1_1_a_w_s_resource_mapping_requests.html) for the class API reference for the bus.

**Example: Reading an entry**

```cpp
// Read settings for a mapping entry called "MyTableKey".
AZStd::string requestTableName = "";
AWSResourceMappingRequestBus::BroadcastResult(requestTableName, &AWSResourceMappingRequests::GetResourceNameId, "MyTableKey");

AZStd::string requestRegion = "";
AWSResourceMappingRequestBus::BroadcastResult(requestRegion, &AWSResourceMappingRequests::GetResourceRegion, "MyTableKey");
```
