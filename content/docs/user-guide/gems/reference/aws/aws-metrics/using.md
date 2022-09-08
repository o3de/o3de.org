---
title: Using the Deployed Resources
description: Learn how to use the AWS Metrics Gem resources you deployed for your Open 3D Engine (O3DE) project.
toc: true
weight: 200
---

Once the AWS Metrics resources have been deployed, you can use features such as real-time analytics and batch analytics.

## Using real-time analytics

After deploying the AWS Cloud Development Kit (AWS CDK) application, an **Amazon CloudWatch** dashboard is created automatically to show the operational health metrics and sample metrics (TotalLogin) defined in the AWS CDK application.

To start the real-time analytics, go to the **Amazon Kinesis** console or use the AWS CLI [`start-application`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/kinesisanalytics/start-application.html) command to start the **Kinesis Data Analytics** application.

{{< important >}}
Please be aware that you are charged an hourly rate to run the application.
{{< /important >}}

The CloudWatch dashboard will start showing the metrics you sent from the client side while the application is running.

![Sample metrics dashboard](/images/user-guide/gems/reference/aws/aws-metrics/sample-metrics-dashboard.png)

Most of the components deployed for real-time analytics are extensible. You can customize the Kinesis Data Analytics application, analytics-processing Lambda, and CloudWatch dashboard from the AWS CDK application code or the AWS console to transform and analyze your streaming data.

Note that re-deploying the AWS CDK application will overwrite any changes you made through the AWS Console. Therefore it is suggested that you make the modification through the AWS CDK application code and redeploy the AWS CDK application.

## Enabling batch analytics

To enable the optional batch analytics feature, specify `batch_processing=true` when you synth and deploy the AWS CDK application.

```cmd
cdk synth -c batch_processing=true
cdk deploy -c batch_processing=true
```

Metrics data will be sent to the **Amazon S3 Data Lake** and saved in the parquet format. To make the data discoverable, go to the **AWS Glue** console or use the AWS CLI [`start-crawler`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/glue/start-crawler.html) command to start the Glue crawler deployed by the AWS CDK application. After the crawler finishes its work, the metrics event table will be updated. Then you can run queries on the data through **Amazon Athena** engine.

There are a few named queries created within your AWS CDK application under a specific work group for your project. You can run these sample queries as an example or create custom queries for batch analytics.

You can also create an **Amazon QuickSight** dashboard (not included in the AWS CDK application) to visualize the statistics. For instructions, see [Build the Amazon QuickSight Dashboard](https://docs.aws.amazon.com/solutions/latest/game-analytics-pipeline/deployment.html#step5) in the Game Analytics Pipeline documentation.

Similar to the real-time analytics, you can also customize the components for batch processing. For example, you can define custom transformation in the events processing Lambda or change the behavior of the Glue crawler to run it periodically.

## AWS CloudFormation stack output

The AWS CloudFormation stack deployed by the AWS CDK application contains the following outputs. You can use these outputs for reference and create the resource mapping file based on them.

| Output | Description |
| --- | --- |
| **AdminPolicyOutput** | Admin policy ARN to call service. |
| **AnalyticsApplicationName** | Kinesis Data Analytics application to process the real-time metrics data. |
| **DashboardName** | CloudWatch dashboard to monitor the operational health and real-time metrics. |
| **DeploymentStage** | Stage for the REST API deployment. |
| **EventsCrawlerName** | Glue Crawler to populate the AWS Glue Data Catalog with metrics events tables. |
| **RestApiId** | Service API Id for the analytics pipeline. |
| **UserPolicyOutput** | User policy ARN to call service. |
