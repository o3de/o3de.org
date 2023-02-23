---
linktitle: Using the C++ API
title: Using the C++ API with the AWS Metrics Gem
description: Get an overview of using the C++ API with the AWS Metrics Gem in Open 3D Engine (O3DE).
toc: true
weight: 400
---

The AWS Metrics Gem provides a C++ API for submitting metrics and handling notifications using the O3DE EBus. For more information about using the EBus system, refer to the [EBus](/docs/user-guide/programming/messaging/ebus) documentation.

## Using the AWSMetricsRequestBus

Sample code for calling the APIs in C++.

```cpp
// Submit a metrics event and buffer it for sending in batch.
bool result = false;
AWSMetricsRequestBus::BroadcastResult(result, &AWSMetricsRequests::SubmitMetrics, metricsAttributes, 0, "C++", true);
 
// Or, submit a metrics event directly without using a buffer.
bool result = false;
AWSMetricsRequestBus::BroadcastResult(result, &AWSMetricsRequests::SubmitMetrics, metricsAttributes, 0, "C++", false);
 
// Flush all the buffered metrics events.
AWSMetricsRequestBus::Broadcast(&AWSMetricsRequests::FlushMetrics);
```

## Using the AWSMetricsNotificationBus

Use standard EBus notification handlers for capturing OnSendMetricsSuccess and OnSendMetricsFailure notifications in C++.

## C++ API Reference

See the O3DE API Reference Guide for a complete reference to the [AWS Metrics C++ API](/docs/api/gems/awsmetrics).
