---
linktitle: Setting Up Metrics
title: Setting Up the AWS Metrics Gem
description: Learn how to set up the AWS Metrics Gem for your Open 3D Engine (O3DE) project.
toc: true
weight: 100
---

{{< preview-new >}}

## Prerequisites

The AWS Metrics Gem requires the following to be installed and configured:

* AWS Command Line Interface (CLI)
* AWS Cloud Development Kit (CDK)
* AWS credentials
* O3DE AWS Core Gem

See [Getting Started with AWS Gems](/docs/user-guide/gems/reference/aws/aws-core/getting-started.md) for help with installing and configuring these prerequisites.

## Setting up AWS Metrics

Complete the following set up steps to use the AWS Metrics Gem in your project:

* Enable the AWS Metrics Gem in your project.
* Deploy the CDK application.
* Update the resource mapping file to use the deployed AWS resources.

### Enabling the AWS Metrics Gem in your project

If you haven't already added and built the **AWS Metrics Gem** in your project, do so now using the instructions in [Enabling the AWS Metrics Gem](./_index.md#enabling-the-aws-metrics-gem).

### Deploying the CDK application

Deploy the sample CDK application to build the AWS-backed analytics pipeline shown in the following diagram.

![Analytics pipeline provided by the sample CDK application](/images/user-guide/gems/reference/aws/aws-metrics/sample-analytics-pipeline.png)

The pipeline will mainly focus on two uses cases: hot/near-real-time for operations and cold/batch for BI use cases (such as DAU, MAU). The sample analytics pipeline uses API Gateway (a service endpoint) for the user access and administrative interface, Kinesis Data Streams and Kinesis Data Firehose for streaming ingestion, Kinesis Data Analytics + CloudWatch for real-time analytics, S3 for date lake integration, and Glue plus Athena for batch analytics.

For instructions on how to deploy the CDK application, see the deploy steps in [Deploying the CDK Application](/docs/user-guide/gems/reference/aws/aws-core/cdk-application.md) in the AWS Core documentation.

### Using deployed AWS resources

After deploying the CDK application, your project's resource mapping file must be updated to export the deployed REST API information.

Use the [Resource Mapping Tool](/docs/user-guide/gems/reference/aws/aws-core/resource-mapping-tool.md) to add the `RESTApiStage` and `RESTApiId` information to your project's resource mapping file. The new sections will be similar to the following example.

**project_aws_resource_mappings.json**

```json
{
    "AWSResourceMappings": {
        "AWSMetrics.RESTApiStage": {
            "Type": "AWS::ApiGateway::Stage",
            "Name/ID": "rest_api_stage_name"
        },
        "AWSMetrics.RESTApiId": {
            "Type": "AWS::ApiGateway::RestApi",
            "Name/ID": "rest_api_id_value"
        }
        ....
    },
    "AccountId": "12345677789",
    "Region": "us-west-2",
    "Version": "1.0.0"
}
```
