---
linktitle: AWS Core
title: AWS Core Gem
description: Introduction to the Open 3D Engine (O3DE) AWS Core Gem.
weight: 100
toc: true
---

{{< important >}}
O3DE no longer includes AWS gems by default. Visit https://github.com/aws/o3de-repo for instructions on how to install AWS gems.
{{< /important >}}

The **AWS Core** Gem lets you use AWS services from within O3DE. Other AWS Gems typically have a dependency on this Gem since it provides the common mechanisms to do the following:
* Set up the required AWS SDK for C++.
* Configure platform clients.
* Make HTTPS RESTful calls.
* Handle generic responses and errors
* Set up and use AWS credentials.

## Features

The AWS Core Gem has the following key features:

* Initializes, [configures](https://docs.aws.amazon.com/sdk-for-cpp/v1/developer-guide/configuring.html), and terminates the [AWS SDK for C++](https://docs.aws.amazon.com/sdk-for-cpp/v1/developer-guide/welcome.html).
    * Includes platform extensions for the SDK for C++.
    * Provides a common client configuration ready for O3DE. Refer to [AWS Client configuration](https://docs.aws.amazon.com/sdk-for-cpp/v1/developer-guide/client-config.html) for details.

* Handles HTTPS calls to AWS services, including responses and errors.
* Lets you use AWS credentials, including existing AWS Command Line Interface (AWS CLI) profiles and roles, along with console variables (CVARs) for easier configuration. Refer to [Configuring AWS Credentials](./configuring-credentials/) for details.
* Supports AWS resource sharing, helping you identify AWS resources that you can use from O3DE.
* Provides utility functions that make it easier to work with AWS services and resources.

## Enabling the AWS Core Gem

To enable the AWS Core Gem, do the following:

1. Use **O3DE Project Manager** or the command line to add the AWS Core Gem to your project.

2. Build your project using Project Manager, Visual Studio, or CMake.

3. To configure your environment and project to use AWS services, follow the instructions in [Getting Started with AWS Gems](./getting-started/).
