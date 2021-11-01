---
linkTitle: Asset Processor
title: Asset Processor 
description: Asset processing job management in Open 3D Engine (O3DE) with Asset Processor.
weight: 200
toc: true
---

**Asset Processor** starts automatically with **Open 3D Engine (O3DE) Editor**, and runs as a background process. Asset Processor provides many asset related functions including the following:

* Detect new or updated source assets.
* Send **Create Jobs** requests to appropriate **Asset Builders**.
* Schedule process jobs provided by Asset Builders.
* Manage the process job queue.
* Provide status, logs, and messages about asset process jobs.
* Place generated product assets and related data in the **Asset Cache**.
* Send notifications when product assets have been updated so they can be hot reloaded by **O3DE Editor**, tools, and runtimes.
* Provide tools to retrieve information about source assets and product assets.
* Track source dependencies, job dependencies, and product dependencies.

With Asset Processor, a **Launcher** can be run on a target platform without deploying assets to that platform. Instead, the assets are accessed from the Asset Cache on a connected host platform. Asset Processor communicates through a USB connection with mobile target platforms using proxy requests.

On a host platform, connections between Asset Processor and O3DE Editor are automatically maintained. Asset Processor automatically restarts if you retrieve a new version or modify any of the data files that it needs to operate.

{{< note >}}
Symbolic links are not supported when using Asset Processor. To ensure that Asset Processor works properly, follow these guidelines:

* Do not use a symbolic link for your Asset Cache directory.
* Do not use symbolic links for scan directories.
* Use a unique Asset Cache directory.
* Do not share the Asset Cache directory with another host platform that is also running Asset Processor.
{{< /note >}}

## Asset Processor topics

| Topic | Description |
| - | - |
| [Interface](interface) | Learn to navigate Asset Processor's interface, and how to read the status of process jobs. |
| [Asset Processor Batch](asset-processor-batch) | With Asset Processor batch, you can batch process the source assets for a project in an automated build system. |
| [Configuration](configuration) | Asset Processor can be configured by setting options in the `AssetProcessorPlatformConfig.setreg` configuration file. |
| [Faster Scanning](faster-scannning) | Asset Processor's faster scanning mode uses source asset timestamps and quick source asset checks to determine if assets need to be processed. |
| [Debugging](debugging) | Learn several methods you can use to debug Asset Processor issues. |
| [Move Assets](move-assets) | Learn how to move assets to new directory locations in O3DE while maintaining internal references. |