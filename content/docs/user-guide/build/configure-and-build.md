---
title: Configure and Build
description: Learn how to use the CMake build tools with Open 3D Engine (O3DE).
weight: 100
---

Building Open 3D Engine or any of its projects with CMake is done in two steps: Creating *Native projects* for a build toolchain, and then invoking that toolchain to build the engine or a project.

As part of keeping builds fast, CMake maintains a cache of both its internal values used for generation and takes advantage of any incremental builds supported by the native build tools. After your first configuration, you won't need to make any changes to the CMake cache unless you're changing a value needed to re-create native build projects. In most workflows, you'll only need to regenerate your native build projects whenever adding source code.

An important element of CMake in O3DE is that the same commands are used to configure and build **both** the engine itself and any O3DE projects.

{{< note >}}
These instructions are for Windows 10, but will get you started building on any platform as long as you generate the correct files and know if your platform needs additional arguments. For more information, see the [CMake configuration reference](./reference/) or the relevant [platform overview](/docs/user-guide/platforms/).
{{< /note >}}

## Supported compiler toolchains

O3DE has build support for the following platforms and toolchains:

<!-- TODO: Add download links -->
| Platform | Supported toolchains |
| --- | --- |
| Windows 64-bit | Visual Studio 2019 |
| macOS, iOS | XCode 11 or later |
| Android | Android Studio |
| Linux | Automake |

## Requirements to build O3DE

In order to follow these build instructions, you'll need the following.

* CMake {{< versions/cmake >}} or later. [Download from the CMake project](https://cmake.org/download/).
* A toolchain for your _host_ platform, to build the editor and tools.
* A toolchain for your _target_ platform, to build your project. In most cases this will be the same as your host platform.

## Configure with the CMake CLI

When building using the CMake CLI, you'll need to have a build output directory created, know where your 3rd party libraries are, and which O3DE projects you want to be able to build and run. Walking through the following steps will get you started with your first O3DE build out of the box, let you know which values to change on subsequent builds, and help you learn how the build process works with CMake.

<!-- TODO: Tabs, when they work for non-code content in Markdown -->

1. Open a command line prompt and navigate to the O3DE source *or* your project source.
2. Create a directory for your build: `mkdir build\windows_vs2019`
3. Run the CMake generator:
  
    ```cmd
    cmake -B build/windows_vs2019 -S . -G "Visual Studio 16 2019" ^
        -DLY_3RDPARTY_PATH=<o3de-packages-absolute-path>
    ```

    * `-B` : Location of build directory, where to put the generated files.
    * `-S` : Source directory, where the root CMake file is.
    * `-G` : The generator to use to create the native project files.
  
    The other argument is a custom definition (`-D`) for the build script, used by O3DE:  

    * `LY_3RDPARTY_PATH` : The *absolute* path to your [O3DE packages](./packages). If packages are missing during configuration, they'll be downloaded to this location.

    {{< note >}}
CMake [unity builds](https://cmake.org/cmake/help/latest/prop_tgt/UNITY_BUILD.html) are on by default. This is a CMake feature that can greatly improve build times by merging source files into single compilation units. If you encounter a build error, disabling unity builds might help debug the problem. To disable unity builds, run the previous `cmake` command with the `-DLY_UNITY_BUILD=OFF` argument to regenerate your project files.
    {{< /note >}}

## Configure with the CMake GUI

CMake also offers an intuitive, GUI-based tool that you can use instead of the command line. Launch the CMake GUI with:

```shell
cd <source-directory>
cmake-gui .
```

Set the following values in the GUI after launching it:

* Set the **Where is the source code:** text field to your O3DE directory.
* Set the **Where to build your binaries:** text field to a subdirectory of your O3DE directory where you want your build files and products to be generated.
* Use `Visual Studio 16 2019` as your generator.
* Your configure may fail at various points due to unset values. Make sure that you set the following parameters:
  * `LY_3RDPARTY_PATH` : The path to your 3rd party libraries. If any new 3rd party libraries are downloaded during configure, they'll be unpacked in this directory.

{{< note >}}
CMake [unity builds](https://cmake.org/cmake/help/latest/prop_tgt/UNITY_BUILD.html) are on by default. This is a CMake feature that can greatly improve build times by merging source files into single compilation units. If you encounter a build error, disabling unity builds might help debug the problem. To disable unity builds in the CMake GUI, find the `LY_UNITY_BUILD` variable and uncheck it, then regenerate your project files.
{{< /note >}}

## Build O3DE targets with CMake

CMake allows you to invoke the native toolchains from its generated projects with the `--build` option. CMake builds are offered for convenience - after generating a native project, you can work completely within an IDE. 

### Generated build configurations

O3DE supports a number of build configurations to support your development workflows of debugging, profiling, and generating releases of your projects. Each configuration has a set of properties that makes it suitable for performing certain tasks, and affect things like debug symbol tables, optimization levels, and which O3DE development tools can be used to inspect and send assets to a running project.

For the full set of flags used by the compiler for each build configuration, see the following CMake files in source:

* `cmake/Configurations.cmake`
* `cmake/Common/Configurations_common.cmake`
* `cmake/Common/<compiler>/Configurations_<compiler>.cmake`
* `cmake/Platform/<platform ID>/Configurations_<platform ID>.cmake`

{{< note >}}
On the Linux platform when generating configurations and makefiles for GNU Automake, the build configuration is selected at the time of toolchain file generation and can't be configured on a per-build basis. To change build types on Linux, you'll need to regenerate the build files. For more information, read [Linux support](/docs/user-guide/platforms/linux).
{{< /note >}}

The following table is a high-level overview of what each build configuration does.

| Configuration | Effects |
| --- | --- |
| **Debug** | Maximum level of debugging support. Optimizations including function inlining will be avoided, making it easier to trace code. Some compilers may disable stack overflow or other memory protection runtime checks, making this the best build configuration for inspecting certain types of bugs affecting the stack. In supported IDEs, this also enables "Edit and continue" support. |
| **Profile** | Debugging symbol support, but optimizations are enabled (equivalent to clang `-O2`, non-aggressive optimizations.) This is the recommended profile for daily workflows, as it's the most representative of a release build but with symbols enabled. |
| **Release** | For your final release build. Non-aggressive optimizations and no debugging information. |

### Build the O3DE editor, engine, and tools

```cmd
cd <o3de-source>
cmake --build build/windows_vs2019  --config profile --target Editor -- /m
```

Build products are placed in the `build\windows_vs2019\bin\profile` directory.

### Build a project

This section assumes you've already generated your project files into the project subdirectory `build\windows_vs2019`. But once you've done that, it's just one line:

```cmd
cd <project-directory>
cmake --build build/windows_vs2019  --config profile --target <Project Name>.GameLauncher -- /m
```

Build products are placed in the `build\windows_vs2019\bin\profile` directory.
