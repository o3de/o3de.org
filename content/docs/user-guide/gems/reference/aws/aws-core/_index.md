---
linktitle: AWS Core
title: AWS Core Gem
description: Introduction to the Open 3D Engine (O3DE) AWS Core Gem.
weight: 100
toc: true
---

{{< preview-new >}}

The AWS Core Gem enables you to use AWS services from within O3DE. Other AWS Gems typically have a dependency on this Gem since it provides the common mechanisms to set up the required AWS C++ SDKs, configure platform clients, make HTTPS RESTful calls, handle generic responses and errors, and set up and utilize AWS credentials.

## Features

The AWS Core Gem has the following key features:

* Initializes, [configures](https://docs.aws.amazon.com/sdk-for-cpp/v1/developer-guide/configuring.html), and terminates [AWS C++ SDK](https://docs.aws.amazon.com/sdk-for-cpp/v1/developer-guide/welcome.html).

  * Includes platform extensions for AWS C++ SDK.
  * Provides common client config ready for O3DE. See [Client Configuration](https://docs.aws.amazon.com/sdk-for-cpp/v1/developer-guide/client-config.html) in the AWS C++ SDK for details.

* Handles making HTTPS calls to AWS services including handling responses and errors.
* Provides mechanism for utilizing AWS credentials including using existing AWS CLI profiles & roles along with CVars for easy configuration. See [Configuring AWS Credentials](./configuring-credentials.md) for details.
* Supports AWS resource sharing, making it easy to identify an AWS resource to use from O3DE.
* Provides utility functions to make it easy to work with AWS.

## Enabling the AWS Core Gem

To enable the AWS Core Gem, do the following:

1. Use **O3DE Project Manager** or the command line to add the **AWS Core Gem** to your project.

1. Build your project using Project Manager, Visual Studio, or CMake.

1. Continue with the [Getting Started](./getting-started.md) instructions to configure your environment and project to use AWS services.
