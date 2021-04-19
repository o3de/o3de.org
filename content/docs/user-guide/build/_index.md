---
title: "Build"
description: >-
    Learn the basics of Open 3D Engine's support for the CMake build system, and get started with
    your first full build of the Open 3D Engine Source and Atom test project.
weight: 200
---

{{< preview-new >}}

To support multiple native build toolchains, Open 3D Engine (O3DE) uses the [CMake build system](https://cmake.org/). While most configurable build systems make
it difficult to work cross-platform, CMake is intentionally designed to take generic configuration files and generate toolchain-specific project and build files.
This is an alternative to other build systems where compiler toolchains are explicitly called.

Here's an example showing how to build the editor while also adding support for the `AtomSampleViewer` project, packaged as a Gem:

<!-- TODO: Add other host platforms/toolchains here, max 1/platform -->

{{< tabs >}}
{{< tab name="Windows" codelang="cmd">}}cd <O3DE dir>
mkdir windows_vs2019
cmake -B windows_vs2019 -S . -G "Visual Studio 16 2019" ^
    -DLY_3RDPARTY_PATH=<3rdParty_fullpath> ^
    -DLY_UNITY_BUILD=ON ^
    -DLY_PROJECTS=AtomSampleViewer
cmake --build windows_vs2019 --config profile --target Editor -- /m
{{< /tab >}}
{{< /tabs >}}

O3DE requires CMake {{< versions/cmake >}} or higher.

## Section topics

| Topic | Description |
| --- | --- |
| [Configure and Build](./configure-and-build.md) | The full details on how to configure and build O3DE core, Gems, and projects. |
| [Gem CMake files](./gems.md) | Information about Gem CMake build files. |
| [Packages](./packages.md) | Learn about the Open 3D Engine package system, used to ship binaries along with your Gem or project. |
| [CMake settings reference](./reference.md) | Reference for user-configurable CMake settings specific to O3DE. |
| [Troubleshooting](./troubleshooting.md) | How to debug and troubleshoot CMake and build problems. |
