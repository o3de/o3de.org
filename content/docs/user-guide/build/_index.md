---
title: Build
description: Learn the basics of Open 3D Engine's support for the CMake build system, and get started with your first full build of the Open 3D Engine Source and Atom test project.
weight: 200
---

To support multiple native build toolchains, **Open 3D Engine** (O3DE) uses the [CMake build tools](https://cmake.org/). While most configurable build systems make it difficult to work cross-platform, CMake is intentionally designed to take generic configuration files and generate toolchain-specific project files, and then perform native builds.

 Once you've [registered O3DE](/docs/welcome-guide/setup) and [created an O3DE project](/docs/user-guide/project-config/project-manager/#creating-projects-using-project-manager), you can build your project with these commands:

{{< tabs name="CMake configure example" >}}
{{% tab name="Windows" %}}

```cmd
cd <project-directory>
cmake -B build/windows -S . -G "Visual Studio 16" -DLY_3RDPARTY_PATH=<absolute-path-to-packages>
cmake --build build/windows --target <ProjectName>.GameLauncher Editor --config profile -- -m
```

{{< note >}}
Use `Visual Studio 16` as the generator for Visual Studio 2019, and `Visual Studio 17` for Visual Studio 2022. For a complete list of common generators for each supported platform, refer to [Configuring projects](./configure-and-build/#configuring-projects).
{{< /note >}}

{{% /tab %}}
{{% tab name="Linux" %}}

{{< important >}}
When building using the O3DE pre-build **Snap** SDK, first export the `O3DE_SNAP` environment variable so CMake does not attempt to install Python pip requirements and fail. To export the `O3DE_SNAP` environment variable, run the command `export O3DE_SNAP` from the command line before running the CMake commands below.
{{< /important >}}

```shell
cd <project-directory>
cmake -B build/linux -S . -G "Ninja Multi-Config" -DLY_3RDPARTY_PATH=<absolute-path-to-packages>
cmake --build build/linux --target <ProjectName>.GameLauncher Editor --config profile
```

{{% /tab %}}
{{< /tabs >}}

Builds created with these commands are located in the `<project-directory>/<build-directory>/bin/profile` directory.

Refer to [Configure and Build](configure-and-build) for a list of other build configurations.

O3DE requires CMake {{< versions/cmake >}} or higher.

## Section topics

| Topic | Description |
| --- | --- |
| [Configure and Build](configure-and-build) | The full details on how to configure and build O3DE core, Gems, and projects. |
| [Build Generated Source Files](generated-source) | Learn how to use the AzAutoGen automation tool to generate source files when building a target. |
| [Engine and Project Distribution](distributable-engine) | Instructions on how to separate engine developer and project developer workflows, by creating fixed binaries to distribute to project teams. |
| [O3DE Packages](packages) | Learn about the O3DE package system that's used to ship binaries along with your Gem or project. |
| [Troubleshooting](troubleshooting) | How to debug and troubleshoot CMake and build problems. |
| [CMake Settings Reference](reference) | Reference for user-configurable CMake settings specific to O3DE. |
| [Script-Only 'Quick-Start' Projects](script-only-projects) | Details about Script only 'Quick Start' projects. |
| [Templates](templates) | Information about Project, Gem, and other Templates available in the engine |

## Related topics

| Topic | Description |
|---|---|
| [Windows Support](/docs/user-guide/platforms/windows) | Prerequisites for building on Windows 10. |
| [Linux Support](/docs/user-guide/platforms/linux) | Prerequisites for building on Linux. |
