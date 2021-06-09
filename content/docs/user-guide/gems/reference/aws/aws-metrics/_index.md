---
linktitle: AWS Metrics
title: AWS Metrics Gem
description: Open 3D Engine (O3DE) AWS Metrics Gem reference.
toc: true
---

{{< preview-new >}}

The AWS Metrics Gem provides an extensible, out-of-the-box instrumentation and analytics solution for O3DE developers. It builds an analytics pipeline using the AWS Core Gem, and connects you to AWS services that support common metrics operations on your analytics data, including:

* ingestion
* storage
* analysis
* monitoring
* reporting

Using this Gem, metrics events can be generated and submitted in a thread safe manner from C++, Lua, and Script Canvas. You can deploy the sample CDK application as a reasonable starting point to use AWS services for real-time and batch analytics. You can extend the CDK application to a full production-ready solution to meet your production and scaling needs. Refer to the AWS guide on the [Game Analytics Pipeline](https://aws.amazon.com/solutions/implementations/game-analytics-pipeline/) for an in-depth look at the architecture.
