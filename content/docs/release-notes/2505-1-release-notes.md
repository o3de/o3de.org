---
linktitle: 25.05.1 Release Notes
title: Release Notes for Open 3D Engine 25.05.1
description: Full release notes for Open 3D Engine (O3DE) version 25.05.1.
# weight: 888
toc: true
---

# 25.05.1 Release Notes
25.05.1 is a maintenance release to fix issues found in the 25.05.0 release. Primarly focused on stability.

## Sig-Build
- Fix an error that prevents installation when the destination path contains spaces.

## Sig-Content
- Fix an error that prevents receving `OnActiveViewChanged` notification in ScriptCanvas and Lua.
- Fix a compilation error when using `ScriptCanvasNode` template.
- Fix margins of the splash screen when the Editor is started.

## Sig-Core
- Fix several `unused variable` errors when building the engine with the latest version of MSVC compiler.

## Sig-Graphics-Audio
- Fix an error that appears when GPU does not support Ray-Tracing.
- Fix a crash when using Vulkan RHI.
- Fix a crash when using the `CubeMap Capture` component.

## Sig-Platform
- Update the compatibility with the latest version of Android Studio (Gradle 8.10).
- Fix an error that prevents building any project when the `restricted` folder is missing.
- Fix the use of `o3de.sh` script from any location.

## Sig-Simulation
- Remove obsolete `requirements.txt` file from the ROS2 Gem.
- Fix `ROS2FrameComponentInterface` that does not work correctly when called from AssetBuilder for URDF and SDF files.
- Remove unused material slot descriptions from assets in `WarehouseAssets` and `ROS2SampleRobots` Gems

## Additional notes
- O3DE 25.05.1 was tested with **Microsoft Visual Studio 2022 17.4** (build tools: 19.44.35211) on Windows and **Clang 18** on Linux. If you are experiencing compilation errors when building the engine from source, please try to add these exact versions to your current development environment. Then, you can select the suggested compiler version when generating the engine solution for the first time (see *Step 3* of the official documentation for [Windows](https://docs.o3de.org/docs/welcome-guide/setup/setup-from-github/building-windows/#build-instructions) or [Linux](https://docs.o3de.org/docs/welcome-guide/setup/setup-from-github/building-linux/#build-instructions)):
  - Windows
    ```sh
    cmake -B build/windows -S . -G "Visual Studio 17" -T version=14.43
    ```
  - Linux
    ```sh
    cmake -B build/linux -S . -G "Ninja Multi-Config" -DCMAKE_C_COMPILER=clang-18 -DCMAKE_CXX_COMPILER=clang++-18
    ```
- An error message complaining about missing `xcb-input` library may happen when building the engine with an old Linux distribution. If you are using Ubuntu 22.04 LTS (or similar), please consider upgrading your default **CMake** installation to at least version **3.27**.