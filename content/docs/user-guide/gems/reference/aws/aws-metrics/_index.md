---
linktitle: AWS Metrics
title: AWS Metrics Gem
description: Introduction to the Open 3D Engine (O3DE) AWS Metrics Gem.
toc: true
---

The **AWS Metrics** Gem provides an extensible, out-of-the-box instrumentation and analytics solution for O3DE developers. It builds an analytics pipeline using the AWS Core Gem, and connects you to AWS services that support common metrics operations on your analytics data, including:

* Ingestion
* Storage
* Analysis
* Monitoring
* Reporting

Using this Gem, you can generate and submit metrics events in a thread-safe manner from C++, Lua, and Script Canvas. To use AWS services for real-time and batch analytics, you can deploy the sample AWS Cloud Development Kit (AWS CDK) application as a reasonable starting point. You can also extend the AWS CDK application to a full, production-ready solution to meet your production and scaling needs. Refer to [Game Analytics Pipeline](https://aws.amazon.com/solutions/implementations/game-analytics-pipeline/) on the AWS website for a detailed look at the architecture.

## Enabling the AWS Metrics Gem

To enable the AWS Metrics Gem, do the following:

1. Use **O3DE Project Manager** or the command line to add the AWS Metrics Gem to your project. Note that AWS Metrics requires the [AWS Core Gem](/docs/user-guide/gems/reference/aws/aws-core) as a dependency.

1. Build your project using Project Manager, Visual Studio, or CMake.

1. To configure AWS Metrics for your project, follow the instructions in [Setting Up the AWS Metrics Gem](./setup/).
