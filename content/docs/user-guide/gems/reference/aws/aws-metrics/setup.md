---
linktitle: Setting Up Metrics
title: Setting Up the AWS Metrics Gem
description: Learn how to set up the AWS Metrics Gem for your Open 3D Engine (O3DE) project.
toc: true
weight: 100
---

## Prerequisites

The AWS Metrics Gem requires the following to be installed and configured:

* AWS Cloud Development Kit (CDK)
* AWS credentials
* O3DE AWS Core Gem

The [AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html) (CLI) (version 2) is optional but also strongly recommended.

See [Getting Started with AWS Gems](/docs/user-guide/gems/reference/aws/aws-core/getting-started/) for help with installing and configuring these prerequisites.

## Setting up AWS Metrics

Complete the following set up steps to use the AWS Metrics Gem in your project:

* Enable the AWS Metrics Gem in your project.
* Deploy the CDK application.
* Update the resource mapping file to use the deployed AWS resources.

### 1. Enable the AWS Metrics Gem

If you haven't already added and built the **AWS Metrics Gem** in your project, follow the steps to [add the gem](/docs/user-guide/project-config/add-remove-gems/) to your current project.

### 2. Deploy the CDK application

Use the CDK synth and deploy commands from the AWS Metrics Gem directory to deploy the sample CDK application and build the AWS-backed analytics pipeline shown in the following diagram. For help with these deployment operations, refer to the synth and deploy steps in [Deploying the CDK Application](/docs/user-guide/gems/reference/aws/aws-core/cdk-application/) in the AWS Core documentation.

![Analytics pipeline provided by the sample CDK application](/images/user-guide/gems/reference/aws/aws-metrics/sample-analytics-pipeline.png)

The pipeline focuses on two use cases: hot/near-real-time for operations and cold/batch for BI use cases (such as DAU, MAU). The sample analytics pipeline uses Amazon API Gateway (a service endpoint) for the user access and administrative interface, Amazon Kinesis Data Streams and Kinesis Data Firehose for streaming ingestion, Kinesis Data Analytics and Amazon CloudWatch for real-time analytics, Amazon Simple Storage Service (S3) for date lake integration, and AWS Glue and Amazon Athena for batch analytics.

### 3. Update the resource mapping file

After deploying the CDK application, your project's resource mapping file must be updated to export the deployed REST API information so that you can use the deployed AWS resources.

Use the [Resource Mapping Tool](/docs/user-guide/gems/reference/aws/aws-core/resource-mapping-tool/) to add the `RESTApiStage` and `RESTApiId` mappings to your project's resource mapping file. The new sections will be similar to the following example.

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
