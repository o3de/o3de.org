---
linktitle: Metrics API
title: Performance Metrics Gathering in O3DE
description: Describes how to use the Performance Gathering API in Open 3D Engine (O3DE) to log performances metrics to JSON
weight: 450
---
## Performance Metrics Gathering Explained
The Performance Metrics Gathering API in the **Open 3D Engine (O3DE)** provides a standardize API for gathering metrics relevant to for querying a feature system performance metrics.
It provides a C++ interface for recording metrics based on the Google [Trace Event Format](https://docs.google.com/document/d/1CvAClvFfyA5R-PhYUmn5OOQtYMH4h6I0nSsKchNAySU/preview#) via the Event Logger API.
A Statistic collection API is provided via the [Statistical Manager](https://github.com/o3de/o3de/blob/development/Code/Framework/AzCore/AzCore/Statistics/StatisticsManager.h) which can record statistics over a period of frames and calculate higher level statistical results, such as mean, min, max, standard deviation and variance.
Finally Performance Collector system is provided which encapsulates a Statistical Manager and a JSON trace Event Logger to record statistical metrics data to record gathered statistics to the Google Trace Event Format.

## JSON Trace Event Logger
The section of the document will detail how to use the Event Logger API to register an Event Logger with the Event Logger Registrar(EventLoggerFactory) which provides accessibility to the Event Logger across multiple gems, use the a JSON Trace Event Logger to log metrics into the Google [Trace Event Format](https://docs.google.com/document/d/1CvAClvFfyA5R-PhYUmn5OOQtYMH4h6I0nSsKchNAySU/preview#) and how to visualize those metrics using a chromium based browser

[Recording using Json Trace Event Logger](./trace-event-logger.md)
