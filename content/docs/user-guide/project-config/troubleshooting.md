---
linktitle: Troubleshooting
title: Troubleshooting O3DE Project Configuration
description: A troubleshooting guide for project configuration in Open 3D Engine (O3DE).
toc: true
weight: 160
---

This topic will help you identify and resolve some common issues that you might encounter during project configuration. If you don't find your problem covered here, try searching [our forums](https://github.com/o3de/o3de/discussions) or asking in the [O3DE Discord](https://discord.com/invite/xNb2q4SJKJ).

If you believe your configuration problem is due to a bug in O3DE, check [existing bug reports](https://github.com/o3de/o3de/issues) and [file an issue](https://github.com/o3de/o3de/issues/new/choose) if you can!

Looking for error logs or memory dumps? Refer to [Open 3D Engine Log Files](/docs/user-guide/appendix/log-files) for locations.

## Tips for adding and removing Gems

- When you register a new Gem to your project, the path to the Gem's directory is added in your project's `project.json` configuration file under `external_subdirectories`.

- To check if a Gem is enabled for your project, you can find the list of enabled Gems in your project folder in the `Code/enabled_gems.cmake` file. 

## CMake error: Not an existing directory

**Issue:** CMake cannot find the directory of the specified Gem. When adding external Gems to your project, you must register the Gem's directory to your project. This enables your project to find the Gem. This issue may occur if the Gem's directory location has changed.

**Remedy:** Check that the correct path of the Gem is registered to your project. You can find the paths to a registered Gem in your project's `project.json` configuration file under `external_subdirectories`. If necessary, update the Gem's directory path, or clean up any obsolete paths.

## Editor and Asset Processor running incorrect project when using O3DE.exe (Source Engine only)

**Issue:** The Editor and the Asset Processor that is launched by the `O3DE.exe` runs with the incorrect project. This occurs if the executable directory is underneath a project root that differs from the launched project. This issue may occur if using an` O3DE.exe` built in a project-centric workflow where the build directory is placed under the project root. This is due to applications first detecting the project root via scanning upwards for a `project.json` file before using the `--project-path` option.  
This issue will not occur when using O3DE.exe with an SDK Engine.

**Remedy:** Close the current `O3DE.exe` instance and navigate over to the new project's directory. If the new project has successfully built, then run the `O3DE.exe` in the `<project-path>/build/<build-dir-name>/bin/profile` directory.
