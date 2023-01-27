---
linkTitle: Batch
title: Asset Processor Batch
description: The Asset Processor Batch application can be used to compile all the assets for a project on a build server.
weight: 200
toc: true
---

You can use **Asset Processor Batch** as part of an automated build system for **Open 3D Engine (O3DE)**. The `AssetProcessorBatch.exe` application compiles all assets for the current project and enabled platforms. If the process succeeds without errors, it exits with a `0` code.

`AssetProcessorBatch.exe` accepts the following command line parameters for overriding the default behavior:

* `--platforms=<comma separated list>`
* `--project-path=<name of game folder>`

Example:

```cmd
AssetProcessorBatch.exe --platforms=pc,ios --project-path=MyTestProjectPath
```
