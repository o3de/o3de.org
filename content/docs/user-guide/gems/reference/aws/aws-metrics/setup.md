---
linktitle: Setting Up
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

See the instructions in [AWS Core Gem Set Up]() for help with installing and configuring these prerequisites.

## Setting up AWS Metrics

Using the AWS Metrics Gem in your project requires the following set up steps:

* Add the AWS Metrics to your project.
* Deploy the CDK application.
* Link the CDK application to the client.

### Adding AWS Metrics to your project

Use Project Manager to add the **AWS Metrics Gem** to your project. At the same time, you can also verify that the **AWS Core Gem** is enabled in your project, too.

TODO: Link to Project Manager.

### Deploying the CDK application

With the AWS Metrics Gem enabled, you can deploy the sample CDK application to build the AWS-backed analytics pipeline shown in the following diagram.

![Analytics pipeline provided by the sample CDK application](/images/user-guide/gems/reference/aws/aws-metrics/sample-analytics-pipeline.png)

The pipeline will mainly focus on two uses cases: hot/near real time for operations and cold/batch for BI use cases (such as DAU, MAU). The sample analytics pipeline uses API Gateway (a service endpoint) for the user access and administrative interface, Kinesis Data Streams and Kinesis Data Firehose for streaming ingestion, Kinesis Data Analytics + CloudWatch for real-time analytics, S3 for date lake integration, and Glue plus Athena for batch analytics.

To deploy this sample application, follow the deploy steps in the AWS Core documentation.

TODO: Add link.

### Linking the CDK application

After deploying the CDK application, your project's resource mapping file must be updated to export the deployed REST API information.

The `RESTApiStage` and `RESTApiId` must be added to the file, as shown in the following example.

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

For details on the resource mapping file and its reference in the AWS Core configuration registry file, see **(Resource Mapping File Topic)** in the AWS Core documentation.

TODO: Add link.
