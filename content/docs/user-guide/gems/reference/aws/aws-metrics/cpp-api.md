---
linktitle: Using C++ API
title: Using C++ API with the AWS Metrics Gem
description: Get an overview of using the C++ API with the AWS Metrics Gem in Open 3D Engine (O3DE).
toc: true
weight: 400
---

{{< preview-new >}}

The AWS Metrics Gem provides a C++ API for submitting metrics and handling notifications using the O3DE EBus. For more information about using the EBus system, please check https://docs.aws.amazon.com/lumberyard/latest/userguide/ebus-intro.html.

## Using the AWSMetricsRequestBus

Sample code for calling the APIs in C++.

```cpp
// Submit a metrics event and buffer it for sending in batch.
bool result = false;
AWSMetricsRequestBus::BroadcastResult(result, &AWSMetricsRequests::SubmitMetrics, metricsAttributes, 0, "C++", true);
 
// Submit a metrics event directly without using buffer.
bool result = false;
AWSMetricsRequestBus::BroadcastResult(result, &AWSMetricsRequests::SubmitMetrics, metricsAttributes, 0, "C++", false);
 
// Flush all the buffered metrics events.
AWSMetricsRequestBus::Broadcast(&AWSMetricsRequests::FlushMetrics);
```

## Using the AWSMetricsNotificationBus

You can define custom EBus handlers for capturing notifications in C++. 

TODO: Add example of OnSendMetricsSuccess and OnSendMetricsFailure.

For a complete reference to the AWS Metrics C++ API, see the O3DE C++ API Reference Guide.

TODO: Add link.
