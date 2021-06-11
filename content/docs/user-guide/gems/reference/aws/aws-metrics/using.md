---
title: Using the Deployed Resources
description: Learn how to use the AWS Metrics Gem resources you deployed for your Open 3D Engine (O3DE) project.
toc: true
weight: 200
---

{{< preview-new >}}

## Using real-time analytics

After deploying the CDK application, an **AWS CloudWatch** dashboard is created automatically to show the operational health metrics and sample metrics (TotalLogin) defined in the CDK application.

To start the real-time analytics, go to the **AWS Kinesis** console or use the AWS CLI command (https://docs.aws.amazon.com/cli/latest/reference/kinesisanalytics/start-application.html) to start the **Kinesis Data Analytics** application.

{{< important >}}
Please be aware that you are charged an hourly rate to run the application.
{{< /important >}}

The CloudWatch dashboard will start showing the metrics you sent from the client side while the application is running.

![Sample metrics dashboard](/images/user-guide/gems/reference/aws/aws-metrics/sample-metrics-dashboard.png)

Most of the components deployed for real-time analytics are extensible. You can customize the Kinesis Data Analytics application, analytics processing Lambda, and CloudWatch dashboard via the CDK application code or the AWS console to transform and analyze your streaming data.

Note that re-deploying the CDK application will overwrite any changes you made via the AWS Console. It's suggested to make the modification via the CDK application code and redeploy the CDK application.

## Enabling batch analytics

You can enable the optional batch analytics feature by specifying `batch_processing=true` when you synth and deploy the CDK application.

```cmd
cdk synth -c batch_processing=true
cdk deploy -c batch_processing=true
```

Metrics data will be sent to the **S3 Data Lake** and saved in the parquet format. To make the data discoverable, go to the **AWS Glue** console or use the AWS CLI command (https://docs.aws.amazon.com/cli/latest/reference/glue/start-crawler.html) to start the Glue crawler deployed by the CDK application. After the crawler finishes its work, the metrics event table will be updated. Then you can run queries on the data through **Amazon Athena** engine.

There are a few named queries created within your CDK application under a specific work group for your project. You can run these sample queries as an example or create custom queries for batch analytics.

You can also create a **QuickSight** dashboard (not included in the CGP application) to visualize the statistics: https://docs.aws.amazon.com/solutions/latest/game-analytics-pipeline/deployment.html#step5

Similar to the real-time analytics, you can also customize the components for batch processing. For example, you can define custom transformation in the events processing Lambda or change the behavior of the Glue crawler to run it periodically.

## CloudFormation stack output

The CloudFormation stack deployed by the CDK application contains the following outputs. You can use these outputs for reference and create the resource mapping file based on them.

TODO: Create a table.

AdminPolicyOutput: Admin policy ARN to call service

AnalyticsApplicationName: Kinesis Data Analytics application to process the real-time metrics data

DashboardName: CloudWatch dashboard to monitor the operational health and real-time metrics

DeploymentStage: Stage for the REST API deployment

EventsCrawlerName: Glue Crawler to populate the AWS Glue Data Catalog with metrics events tables

RestApiId: Service API Id for the analytics pipeline

UserPolicyOutput: User policy arn to call service
