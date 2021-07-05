---
title: "Build"
description: >-
    Learn the basics of Open 3D Engine's support for the CMake build system, and get started with
    your first full build of the Open 3D Engine Source and Atom test project.
weight: 200
---

To support multiple native build toolchains, Open 3D Engine (O3DE) uses the [CMake build tools](https://cmake.org/). While most configurable build systems make it difficult to work cross-platform, CMake is intentionally designed to take generic configuration files and generate toolchain-specific project files, and then perform native builds.

Once you've [registered O3DE]() and [created a project](), you can build your project with the commands:

{{< tabs >}}
{{< tab name="Windows" codelang="cmd">}}cd <project-directory>
mkdir build\windows
cmake -B build/windows -S . -G "Visual Studio 16 2019" ^
    -DLY_3RDPARTY_PATH=<absolute-path-to-packages> ^
    -DLY_UNITY_BUILD=ON 
cmake --build build/windows --config profile --target <ProjectName>.GameLauncher -- /m
{{< /tab >}}
{{< tab name="Linux" codelang="bash">}}cd <project-directory>
mkdir -p build/linux-dedicated
cmake -B build/linux-dedicated -S . \
    -DLY_3RDPARTY_PATH=<absolute-path-to-packages> \
    -DLY_UNITY_BUILD=ON
cmake --build build/linux-dedicated --config profile --target <ProjectName>.ServerLauncher
{{< /tab >}}
{{< /tabs >}}

Builds created with these commands are located in the `<project-directory>/<build-dir>/bin/profile` directory.

O3DE requires CMake {{< versions/cmake >}} or higher.

## Section topics

| Topic | Description |
| --- | --- |
| [Configure and Build](configure-and-build/) | The full details on how to configure and build O3DE core, Gems, and projects. |
| [Packages](packages/) | Learn about the Open 3D Engine package system, used to ship binaries along with your Gem or project. |
| [CMake settings reference](reference/) | Reference for user-configurable CMake settings specific to O3DE. |
| [Troubleshooting](troubleshooting/) | How to debug and troubleshoot CMake and build problems. |

## Related topics

| Topic | Description |
|---|---|
| [Windows suppport](/docs/user-guide/platforms/windows) | Prerequisites for building on Windows 10. |
| [Linux support](/docs/user-guide/platforms/linux) | Prerequisites for building on Linux. |
