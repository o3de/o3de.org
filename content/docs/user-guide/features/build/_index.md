---
title: "Build"
description: >-
    Learn the basics of Open 3D Engine's support for the CMake build system, and get started with
    your first full build of the Open 3D Engine Source and Atom test project.
weight: 200
---

In order to support multiple native build toolchains, Open 3D Engine uses the [CMake build system](https://cmake.org/). While most configurable build systems make
it difficult to work cross-platform, CMake is intentionally designed to take generic configuration files and generate toolchain-specific ones. This is an alternative to other
build systems where compiler toolchains are explicitly called.

Want to get started right away by building the `AtomSampleViewer` project?

{{< tabs >}}
{{< tab name="Windows (VS2019)" codelang="cmd">}}cd <O3DE dir>
mkdir build_win64
cmake -B windows_vs2019 -S . -G "Visual Studio 16 2019" -DLY_3RDPARTY_PATH=<3rdPaty_fullpath> -DLY_UNITY_BUILD=ON -DLY_PROJECTS=AtomSampleViewer
cmake --build windows_vs2019 --config profile --target AtomSampleViewer -- /m
{{< /tab >}}
{{< /tabs >}}

Now you can launch it from `windows_vs2019\build\profile\

## Section topics

| Topic | Description |
| --- | --- |
| [Configure and Build](./configure-and-build.md) | The full details on how to configure and build O3DE core, Gems, and projects. |
| [CMake settings reference](./reference.md) | Reference for user-configurable CMake settings specific to O3DE. |
<!-- | [CMake files for Gems](./gems.md) | How to write a CMake build file to use with a custom gem. | -->
<!-- | [Third-party library distribution](./thirdparty.md) | How to integrate with the third party packaging download system for Gems which depend on other products. | -->
<!-- | [Troubleshooting](./troubleshooting.md) | How to debug and troubleshoot CMake and build problems. | -->