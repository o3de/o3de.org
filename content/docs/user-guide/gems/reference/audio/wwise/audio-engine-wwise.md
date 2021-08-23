---
linkTitle: Wwise Audio Engine
title: Wwise Audio Engine Gem
description: The Wwise Audio Engine Gem provides support for using Audiokinetic Wave Works Interactive Sound Engine (Wwise) in Open 3D Engine (O3DE) projects.
toc: true
---

The Wwise Audio Engine Gem provides support for using the Audiokinetic Wave Works Interactive Sound Engine (Wwise) in Open 3D Engine (O3DE) projects.

The Wwise Audio Engine Gem requires the Audio System Gem.

For more information, refer to [Audio System Overview](/docs/user-guide/interactivity/audio/overview/).

## Enabling the Wwise Audio Engine Gem

To enable the Wwise Audio Engine Gem, do the following:

1. Use **O3DE Project Manager** or the command line to add the Wwise Audio Engine Gem to your project. Note that Wwise Audio Engine requires the [Audio System Gem](/docs/user-guide/gems/reference/audio/audio-system) as a dependency.

1. Download the [Wwise Launcher](https://www.audiokinetic.com/download/) and use it to install the Wwise audio SDK version 2021.1.1.7601 or later. Make sure to select the **SDK(C++)** component during installation.

    {{< note >}}
In general you can use more recent versions of Wwise than specified above, but some SDK updates will require code changes.
    {{< /note >}}

1. Build your project using Project Manager, Visual Studio, or CMake.

When you build your project, CMake looks for your Wwise installation by checking for the existence of variables in the following order:

1. The `LY_WWISE_INSTALL_PATH` CMake cache variable.

1. The `WWISEROOT` environment variable, which is set when installing Wwise.

Therefore, defining the `LY_WWISE_INSTALL_PATH` variable is typically optional, but you can use it to override `WWISEROOT`.
