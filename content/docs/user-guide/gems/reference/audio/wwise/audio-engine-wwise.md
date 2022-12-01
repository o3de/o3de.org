---
linkTitle: Wwise Audio Engine
title: Wwise Audio Engine Gem
description: The Wwise Audio Engine Gem provides support for using Audiokinetic Wave Works Interactive Sound Engine (Wwise) in Open 3D Engine (O3DE) projects.
toc: true
---

The Wwise Audio Engine Gem provides support for using the Audiokinetic Wave Works Interactive Sound Engine (Wwise) in **Open 3D Engine (O3DE)** projects.

The Wwise Audio Engine Gem requires the Audio System Gem.

For more information, refer to [Audio System Overview](/docs/user-guide/interactivity/audio/overview/).

## Enabling the Wwise Audio Engine Gem

To enable the Wwise Audio Engine Gem, do the following:

1. Use **O3DE Project Manager** or the command line to add the Wwise Audio Engine Gem to your project. Note that Wwise Audio Engine requires the [Audio System Gem](/docs/user-guide/gems/reference/audio/audio-system) as a dependency.

1. Download the [Wwise Launcher](https://www.audiokinetic.com/download/) and use it to install the Wwise audio SDK version 2021.1.1.7601 or later. Make sure to select the **SDK(C++)** component during installation.

    {{< note >}}
In general you can use more recent versions of Wwise than specified above, but some SDK updates will require code changes.
    {{< /note >}}

1. (Recommended) Set the CMake cache variable `LY_WWISE_INSTALL_PATH` to the path where you installed Wwise. You can use `cmake-gui` to set this variable, or you can set it when you run the `cmake` build configuration command. By using this cache variable, CMake project regeneration will automatically be triggered if the variable is updated in the future.

    You can use the following CMake build configuration command to set `LY_WWISE_INSTALL_PATH` from your project directory.

    ```cmd
    cmake configure -B build/<platform> -G "Visual Studio 16" -DLY_3RDPARTY_PATH=<o3de-packages> -DLY_WWISE_INSTALL_PATH=<wwise-installation>
    ```

    {{< note >}}
Use `Visual Studio 16` as the generator for Visual Studio 2019, and `Visual Studio 17` for Visual Studio 2022. For a complete list of common generators for each supported platform, refer to [Configuring projects](/docs/user-guide/build/configure-and-build/#configuring-projects).
    {{< /note >}}

1. Build your project using Project Manager, Visual Studio, or CMake.

    {{< important >}}
Whenever updating the Wwise audio SDK to a newer version, if you have any existing O3DE projects that use the Wwise Audio Engine Gem, make sure to update `LY_WWISE_INSTALL_PATH` with the new path. Or, if you are relying on the `WWISEROOT` environment variable that is set during Wwise installation, be sure to regenerate the Visual Studio project files using `cmake` if you want them to use the newer SDK.
    {{< /important >}}

When you build your project, CMake looks for your Wwise installation by checking for the existence of specific variables, in the following order:

1. The `LY_WWISE_INSTALL_PATH` CMake cache variable.

1. The `WWISEROOT` environment variable, which is set when installing Wwise.
