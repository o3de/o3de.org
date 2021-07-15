---
linktitle: Troubleshooting
title: Troubleshooting for Project Configuration
description: 'A troubleshooting guide for project configuration in Open 3D Engine.'
toc: true
---

{{< preview-new >}}

This topic will help you identify and resolve some common issues that you might encounter during project configuration. If you don't find your problem covered here, try searching [our forums](https://github.com/o3de/o3de/discussions) or asking in the [O3DE Discord](https://discord.com/invite/xNb2q4SJKJ).

If you believe your configuration problem is due to a bug in O3DE, check [existing bug reports](https://github.com/o3de/o3de/issues) and [file an issue](https://github.com/o3de/o3de/issues/new/choose) if you can!

## Tips for adding and removing Gems

- When you register a Gem to your project, the path to the Gem's directory is added in your project's `project.json` configuration file under `external_subdirectories`. 
  
- To check if a Gem is enabled for your project, you can find the list of enabled Gems in your project folder in the `Code/enabled_gems.cmake` file. 
  

## CMake error: Not an existing directory
                                       
**Issue:** CMake cannot find the directory of the specified Gem. When adding external Gems to your project, you must register the Gem's directory to your project. This allows your project to find the Gem. This issue may occur if the Gem's directory location has changed.

**Remedy:** Check that the correct path of the Gem is registered to your project. You can find the paths to a registered Gem in your project's `project.json` configuration file under `external_subdirectories`. If necessary, update the Gem's directory path, or clean up any obsolete paths.

