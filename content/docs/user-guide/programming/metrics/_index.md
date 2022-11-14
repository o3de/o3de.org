---
linktitle: Metrics API
title: Performance Metrics Gathering in O3DE
description: Describes how to use the Performance Gathering API in Open 3D Engine (O3DE) to log performances metrics to JSON
weight: 450
---
## Performance Metrics Gathering Explained
The Performance Metrics Gathering API in the **Open 3D Engine (O3DE)** provides a standardized API for gathering metrics relevant to for querying a feature system performance metrics.
It provides a C++ interface for recording metrics based on the Google [Trace Event Format](https://docs.google.com/document/d/1CvAClvFfyA5R-PhYUmn5OOQtYMH4h6I0nSsKchNAySU/preview#) via the Event Logger API.
A Statistic collection API is provided via the [Statistical Manager](https://github.com/o3de/o3de/blob/development/Code/Framework/AzCore/AzCore/Statistics/StatisticsManager.h), which can record statistics over a period of frames and calculate higher level statistical results, including minimum, maximum, standard deviation, and variance.
These two APIs are tied to the Performance Collector system, which encapsulates a Statistical Manager and a JSON trace Event Logger to record statistical metrics data to record gathered statistics to the Google Trace Event Format.

To learn how to use the Event Logger API in order to set up a JSON Trace Event Log into the Google [Trace Event Format](https://docs.google.com/document/d/1CvAClvFfyA5R-PhYUmn5OOQtYMH4h6I0nSsKchNAySU/preview#) and preview the logs in a Chromium-based browser, read [Recording using Json Trace Event Logger](./trace-event-logger.md).
