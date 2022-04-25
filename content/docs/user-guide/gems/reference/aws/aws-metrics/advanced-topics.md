---
linktitle: Advanced Topics
title: Advanced Topics for the AWS Metrics Gem
description: Learn additional features of the AWS Metrics Gem in Open 3D Engine (O3DE) that go beyond the basics.
toc: true
weight: 500
---

## Console command

The AWS Metrics Gem provides two `AWSMetricsSystemComponent` console commands to dump statistics and enable/disable offline recording.

### DumpStats

Used to show statistics for the metrics submission in the console. Statistics include the following.

* Total number of events sent to the local file or AWS-backed backend.
* Total number of successes.
* Total number of failures.
* Total number of drops.

```console
AWSMetricsSystemComponent.DumpStats
```

### EnableOfflineRecording

Used to enable/disable offline recording. If this feature is enabled, metrics events will be sent to a local file. You have the option to resubmit events stored in the local file by specifying the `submit` argument when disabling the feature.

```console
AWSMetricsSystemComponent.EnableOfflineRecording false submit
```

## Client configuration

You can change a few client settings in the client configuration file `Gems\AWSMetrics\Code\Registry\awsMetricsClientConfiguration.setreg`.

Configurable settings include the following.

| Settings | Description |
| --- | --- |
| **OfflineRecording** | Whether send metrics to a local file instead of the AWS-backed backend. <br> Defaults to false. <br> You can change this setting at runtime using the console command `AWSMetricsSystemComponent.EnableOfflineRecording`. |
| **MaxQueueSizeInMb** | Maximum size (in MB) for the local buffer for sending metrics events in batch. <br> Defaults to 0.3. <br> Suggested to be less than 5 MB due to the limit for the Kinesis Data Stream. Refer to the Amazon Kinesis [PutRecords](https://docs.aws.amazon.com/kinesis/latest/APIReference/API_PutRecords.html) documentation for more information.
| **QueueFlushPeriodInSeconds** | Flush period (in seconds) for flushing the metrics events queue. <br> Defaults to 60. |
| **MaxNumRetries** | Maximum number of retries for sending metrics events before dropping them. <br> Defaults to 1. |

## Metrics event schema

The AWS Metrics Gem uses an [Event JSON Schema](./event-schema/) for validating the metrics events submitted from the client or sent to the Service API. Any metrics event that fails the validation will be dropped. Any custom metrics attributes that are not defined in the schema will be added to the `event_data` field of the metrics event as a flat JSON dictionary.

If you want to customize the schema, update it in both `Gems\AWSMetrics\Code\Include\Public\AWSMetricsConstant.h` and `api_spec.json` inside your CDK application. You will need to rebuild your project and redeploy your CDK application after this change.

## Migrate to production-ready solution

The sample CDK application provides a reasonable starting point to use AWS analytics services that is thoughtful with respect to security, cost, and usability. Experienced developers can also customize the CDK application or even migrate it to the production-ready solution detailed in the AWS guide on the [Game Analytics Pipeline](https://aws.amazon.com/solutions/implementations/game-analytics-pipeline/).
