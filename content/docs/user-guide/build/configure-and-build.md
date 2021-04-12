---
title: Configure and Build
description: Learn how to use the CMake build tools with Open 3D Engine (O3DE).
weight: 100
---

{{< preview-new >}}

Building your O3DE project with CMake is done in two steps: Creating platform- and toolchain-specific configuration files, and then running the build on them. For many projects, you can combine these steps into a single command. However, it's also useful to know how to run through each step of the process individually, in case you want to make project changes without immediately rebuilding everything. CMake lets you configure and build from the command line, and also offers a GUI tool for ease of use.

As part of keeping builds fast, where possible, CMake uses its cache to hold information about project generation as well as builds. After you configure for the first time, you won't need to pass some options to CMake. This means that after setting up your first configure and build, you should be able to go through your normal development process without needing to change your build configuration except in some rare circumstances.

These instructions are for Windows x86\_64 platforms, but will get you started building on any platform as long as you generate the correct files and know if your platform needs additional arguments. For more information, see the [CMake configuration reference](./reference.md) or the build page for your platform.

## Supported compiler toolchains

O3DE has build support for the following platforms and toolchains:

<!-- TODO: Add download links -->
| Platform | Supported toolchains |
| --- | --- |
| Windows 64-bit | Visual Studio 2019 |
| macOS, iOS | XCode 11 or later |
| Android | Android Studio |
| Linux | Automake, Ninja (clang-6.0 required as compiler) |

## Requirements to build O3DE

In order to follow these build instructions, you'll need the following.

* CMake {{< versions/cmake >}} or later. [Download from the CMake project](https://cmake.org/download/).
* A toolchain for your _host_ platform, to build the editor and tools.
* A toolchain for your _target_ platform, to build your project. In most cases this will be the same as your host platform.

{{< important >}}
While O3DE is in private preview, the CMake build tools require additional information to get 3rd party packages required for build and configure.
Please contact us directly for the details.
{{< /important >}}

## Generating build files

{{< caution >}}
Even though this example only builds the editor and tools, make sure that you've correctly configured any projects _before_ running your build configure.
See [Project Configuration](/docs/user-guide/project-config) for details.
{{< /caution >}}

### Configure with the CMake CLI

When building using the CMake CLI, you'll need to have a build output directory created, know where your 3rd party libraries are, and which O3DE projects you want to be able to build and run. Walking through the following steps will get you started with your first O3DE build out of the box, let you know which values to change on subsequent builds, and help you learn how the build process works with CMake.

<!-- TODO: Tabs, when they work for non-code content in Markdown -->

1. Open a command line prompt and navigate to your O3DE installation.
2. Create a directory for your build: `mkdir windows_vs2019`
3. Run the CMake generator:
  
    ```cmd
    cmake -B windows_vs2019 -S . -G "Visual Studio 16 2019" ^
        -DLY_3RDPARTY_PATH=<3rdPaty_fullpath> ^
        -DLY_UNITY_BUILD=ON -DLY_PROJECTS=<Project name(s)>
    ```

    * `-B` : Location of build directory, where to put the generated files.
    * `-S` : Source directory, where the root CMake file is.
    * `-G` : The type of generator to use.
  
    The other arguments are custom definitions (`-D`) for the build script, used by O3DE:  

    * `LY_3RDPARTY_PATH` : The path to your 3rd party libraries. If any new 3rd party libraries are downloaded during configure, they'll be unpacked in this directory.
    * `LY_UNITY_BUILD` : Unity builds are a CMake feature that can greatly improve build times.
    * `LY_PROJECTS` : A `;`-separated list of projects to enable as build targets in the generated configuration files. This also creates a dependency tree for these projects.

{{< important >}}
You can create your build output directory anywhere, but in order to run your O3DE project, the build output *must* be a subdirectory of your O3DE install. This is so that
the engine can load assets located in relative paths.
{{< /important >}}

### Configure with the CMake GUI

CMake also offers an intuitive, GUI-based tool that you can use instead of the command line. In order to use the `cmake-gui` application with O3DE, set the following after launching it:

* Set the *Where is the source code:* value to your O3DE directory.
* Set the *Where to build your binaries:* value to a subdirectory of your O3DE directory where you want your build files and products to be generated.
* Use `Visual Studio 16 2019` as your generator.
* Your configure may fail at various points due to unset values. Make sure that you set the following parameters:
  * `LY_3RDPARTY_PATH` : The path to your 3rd party libraries. If any new 3rd party libraries are downloaded during configure, they'll be unpacked in this directory.
  * `LY_UNITY_BUILD` : Unity builds are a CMake feature that can greatly improve build times.
  * `LY_PROJECTS` : A `;`-separated list of projects to enable as build targets in the generated configuration files. This also creates a dependency tree for these projects.

## Build O3DE targets with CMake

CMake also provides tooling for invoking the native toolchain behind the scenes, after the toolchain files are configured and generated. Although CMake generates project files for the IDEs of toolchains which support them, you don't need to perform **any** builds in CMake if you don't want to. However, the CMake CLI offers quick support for ad-hoc builds without having to open a project file or use the native toolchain commands, so we recommend taking a moment to learn how to use it.

### Generated build configurations

O3DE supports a number of build configurations to support your development workflows of debugging, profiling, and generating releases of your projects. Each configuration has a set of properties that makes it suitable for performing certain tasks, and affect things like debug symbol tables, optimization levels, and which O3DE development tools can be used to inspect and send assets to a running project.

For the full set of flags used by the compiler for each build configuration, see the following CMake files in source:

* `cmake/Configurations.cmake`
* `cmake/Common/Configurations_common.cmake`
* `cmake/Common/<compiler>/Configurations_<compiler>.cmake`
* `cmake/Platform/<platform ID>/Configurations_<platform ID>.cmake`

{{< note >}}
On the Linux platform when generating configurations and makefiles for GNU Automake, the build configuration is selected at the time of toolchain file generation and can't be configured on a per-build basis. To change build types on Linux, you'll need to regenerate the build files. For more information on building on Linux, see [Deploy a O3DE multiplayer project's server on Linux](linux-build-lumberyard-executable.md).
{{< /note >}}

The following table is a high-level overview of what each build configuration does.

| Configuration | Effects |
| --- | --- |
| **Debug** | Maximum level of debugging support. Optimizations including function inlining will be avoided, making it easier to trace code. Some compilers may disable stack overflow or other memory protection runtime checks, making this the best build configuration for inspecting certain types of bugs affecting the stack. In supported IDEs, this also enables "Edit and continue" support. |
| **Profile** | Debugging symbol support, but optimizations are enabled (equivalent to clang `-O2`, non-aggressive optimizations.) This is the recommended profile for daily workflows, as it's the most representative of a release build but with symbols enabled. |
| **Release** | For your final release build. Non-aggressive optimizations and no debugging information. |

### Build your project

This section assumes you've already generated your project files into the O3DE subdirectory `windows_vs2019`. But once you've done that, it's just one line:

```cmd
cmake --build windows_vs2019  --config profile --target <Project Name> -- /m
```

Build products are placed at `windows_vs2019\bin\profile\`.

### Build the O3DE editor, engine, and tools

This section assumes you've already generated your project files into the O3DE subdirectory `windows_vs2019`. But once you've done that, it's just one line:

```cmd
cmake --build windows_vs2019  --config profile --target Editor -- /m
```

The editor has the engine and the required tools as dependencies - if there are any changes to them between editor rebuilds, they'll be rebuilt as well.

Build products are placed at `windows_vs2019\bin\profile\`.
