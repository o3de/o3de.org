---
linktitle: Advanced Topics
title: Advanced Topics for the AWS Metrics Gem
description: Learn additional features of the AWS Metrics Gem in Open 3D Engine (O3DE) that go beyond the basics.
toc: true
weight: 500
---

{{< preview-new >}}

## Console command

The AWSMetrics gem provides the following two console commands to dump statistics and enable/disable offline recording.

TODO: Convert to table.

**AWSMetricsSystemComponent.DumpStats**: Used to show statistics for the metrics submission in the console. Statistics includes: Total number of events sent to the local file or AWS backed backend, total number of successes, total number of failures and total number of drops.

**AWSMetricsSystemComponent.EnableOfflineRecording**: Used to enable/disable offline recording. If this feature is enabled, metrics events will be sent to a local file. Customers have the option to resubmit events stored in the local file by specifying the "submit" argument when disable the feature, like "AWSMetricsSystemComponent.EnableOfflineRecording false submit".

## Client configuration

You can change a few client settings in the client configuration file Gems/AWSMetrics/Code/Registry/awsMetricsClientConfiguration.setreg.

Configurable settings include:

TODO: Convert to table.

**OfflineRecording**: Whether send metrics to a local file instead of the AWS backed backend. Default to false. You can change this setting at runtime as well using the console command AWSMetricsSystemComponent.EnableOfflineRecording.

**MaxQueueSizeInMb**: Maximum size (in MB) for the local buffer for sending metrics events in batch. Default to 0.3. Suggest to be less than 5MB due to the limit for the Kinesis Data Stream. Refer to the AWS documentation on [PutRecords](https://docs.aws.amazon.com/kinesis/latest/APIReference/API_PutRecords.html) for more information.

**QueueFlushPeriodInSeconds**: Flush period (in seconds) for flushing the metrics events queue. Default to 60.

**MaxNumRetries**: Maximum number of retries for sending metrics events before dropping them. Default to 1.

## Metrics event schema

The AWS Metrics Gem uses an Event JSON Schema for validating the metrics events submitted from the client or sent to the Service API. Any metrics event that fail the validation will be dropped. Any custom metrics attributes that are not defined in the schema will be added to the `event_data` field of the metrics event as a flat JSON dictionary.

TODO: Add link to Event JSON Schema.

If you want to customize the schema, update it in both `Gems\AWSMetrics\Code\Include\Public\AWSMetricsConstant.h` and `api_spec.json` inside your CDK application. You will need to rebuild the editor/launcher and redeploy your CDK application after this change.

## Migrate to production-ready solution

The sample CDK application provides a reasonable starting point to use AWS analytics services that is thoughtful with respect to security, cost and usability. Experienced developers can also customize the CDK application or even migrate it to the production-ready solution detailed in the AWS guide on the [Game Analytics Pipeline](https://aws.amazon.com/solutions/implementations/game-analytics-pipeline/).
