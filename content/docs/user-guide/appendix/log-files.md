---
linktitle: Log Files
title: Open 3D Engine Log Files
description: Learn where to find common log files in Open 3D Engine (O3DE).
---

Find these common **Open 3D Engine (O3DE)** log files in the following locations:

| Log type | Location |
| --- | --- |
| **Asset Processor** job logs | `<PROJECT_ROOT>/user/log/JobLogs` |
| **CMake** build logs | `<BUILD_DIR>/CMakeFiles/CMakeOutput.log` <br> `<BUILD_DIR>/CMakeFiles/CMakeProjectBuildError.log` |
| **O3DE Editor** logs and dumps <br> (also used by other O3DE applications) | When project-path is set: `<PROJECT_ROOT>/user/log` <br> When project-path is not set: `<ENGINE_ROOT>/user/log` |
| **Project Manager** logs | `<USER>/.o3de/Logs/O3DE.log` |
| **DirectX12 Device Removed Reports** logs | `<USER>/.o3de/Logs/DRED/DRED_<TIMESTAMP>.log` |

{{< note >}}
Event logs with the `.azel` extension can be read using the TraceViewer script: `<ENGINE_ROOT>/Tools/EventLogTools/TraceViewer.py`.
{{< /note >}}
