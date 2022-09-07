---
linkTitle: Scan Directories 
title: Scan Directories 
description: Scan directories are monitored by Asset Processor for new and updated assets.

weight: 300
toc: true
---

The entry point into the **Asset Pipeline** is to place a source asset into a scan directory. Scan directories are monitored by **Asset Processor** for new and updated source assets and asset dependencies.

The system paths to the scan directories are dependent on your project and O3DE configuration and installation. The list of directories below is in descending order of precedence. Source assets in your project directory override source assets in the Gems and Engine directories with the same relative path.

Asset processor monitors the following scan directories:

1. **Project** - The project root directory and subdirectories contain source assets specific to the project.

1. **Gems** - The directories of Gems that have been added to your project might contain source assets including example assets and critical assets.

1. **Engine & Editor** - The root directory and subdirectories of the engine and editor contain assets that are generally labeled critical and are required to run **O3DE Editor** and **Launcher**.

1. **Intermediate Assets** - The root directory for intermediate assets which are output by other sources.  These files should be treated like the **Asset Cache**, they are generated files which should not be modified, and do not need to be tracked by source control.

{{< note >}}
Files in scan directories that Asset Processor doesn't recognize, such as license files, are ignored by Asset Processor. Ignored files aren't copied to the **Asset Cache**, and won't appear in **Asset Browser** in O3DE Editor.
{{< /note >}}
