---
linkTitle: Python Asset Builder
title: Customize Asset Processing with Python Asset Builder
description: Use Python to process assets in Open 3D Engine with Python Asset Builder.
weight: 600
toc: true
---

With **Python Asset Builder**, you can create custom process jobs for assets produced in content creation tools such as Maya and Houdini, or any source asset type with a known file format.

To use Python Asset Builder, you must enable the [Python Asset Builder Gem](/docs/user-guide/gems/reference/script/python/python-asset-builder).

## Python Asset Builder implementation

Python Asset Builders follow the same design pattern and function of [Asset Builders](../pipeline/asset-builders). A Python Asset Builder takes a source asset and produces runtime optimized product assets that are stored in the **Asset Cache**. Python Asset Builders have three parts:

* **Descriptor** is a class that provides **Asset Processor** with the builder's ID and file patterns for asset types it can process.
* **Create Jobs** provides a `CreateJobsRequest` handler that produces a `CreateJobsResponse`. The response contains information that Asset Processor uses to queue job processes for the Python Asset Builder.
* **Process Job** provides a `ProcessJobRequest` handler that produces a `ProcessJobResponse` and generates product assets. The response contains information that Asset Processor needs to place the product assets in the Asset Cache and information used to track the product assets and their product dependencies.

## Writing a Python Asset Builder

There are four steps to create a Python Asset Builder:

* [Add a Bootstrap Script](bootstrap) - Add the Python Asset Builder script to a bootstrap location.
* [Create a Descriptor](descriptor) - Add the Descriptor that provides the Asset Builder ID and file patterns and register handlers for job creation and processing.
* [Implement Create Jobs](create-jobs) - Define logic in the callback method for `CreateJobs` that responds with the job information.
* [Implement Process Job](process-job) - Define logic for `ProcessJob` to generate product asset files and dependencies.
