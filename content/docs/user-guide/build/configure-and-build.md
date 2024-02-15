---
title: Configure and Build
description: Learn how to use the CMake build tools with Open 3D Engine (O3DE).
weight: 100
---

Building **Open 3D Engine (O3DE)** or any of its projects with CMake is done in two steps: Creating *native projects* for a build toolchain, and then invoking that toolchain to build the engine or a project.

As part of keeping builds fast, CMake maintains a cache of its internal values used for generation of project files and takes advantage of any incremental builds supported by the native build tools. After your first configuration, you won't need to make any changes to the CMake cache unless you're changing a value needed to re-create native build projects. In most workflows, you'll only need to regenerate your native build projects whenever adding source code.

An important element of CMake in O3DE is that the same commands are used to configure and build **both** the engine itself and any O3DE projects.

## Prerequisites

To create and build projects in O3DE, you must configure the required software for your platform as described in the [Software prerequisites and configuration](/docs/welcome-guide/requirements/#software-prerequisites) section of the system requirements topic.

You'll need to identify the following:

* A toolchain for your _host_ platform, to build the editor and tools.
* A toolchain for your _target_ platform, to build your project. In many cases, this will be the same as your host platform.

### Supported compiler toolchains

O3DE has build support for the following platforms and toolchains:

| Platform | Supported toolchains |
| --- | --- |
| Windows 64-bit | Visual Studio ([supported versions](/docs/welcome-guide/requirements/#microsoft-visual-studio)) |
| Linux | Clang/LLVM |
| macOS, iOS | XCode {{< versions/xcode >}} or later |
| Android | Android Clang/LLVM |

{{< note >}}
For additional platform-specific requirements and information, refer to [O3DE System Requirements](/docs/welcome-guide/requirements), the [CMake Settings Reference](/docs/user-guide/build/reference), and the relevant [platform overviews](/docs/user-guide/platforms/).
{{< /note >}}

## First project

To get you started with your first O3DE build out of the box, we recommend that you follow the [Creating Projects Using the Command Line Interface](/docs/welcome-guide/create/creating-projects-using-cli/) tutorial in the Get Started Guide.

There you will learn the basics, including how to:

* Start a new project using `o3de create-project`.
* Generate project files using `cmake -G`.
* Build the project using `cmake --build`.

The remaining sections in this topic will cover configuring and building with CMake in more detail, including which values to change on subsequent builds.

## Configuring projects

Configuring a project involves defining variables for the CMake cache and generating project files that are needed to build your project. You can do this from the command line or terminal window using the CMake CLI, or by using the CMake GUI.

To configure an O3DE project using CMake, you'll need the following information:

* The locations of the build source and output directories.
* The generator you want to use to create the native project files.

    | Platform / Build System | Generator |
    | --- | --- |
    | Windows / Visual Studio 2019 | `Visual Studio 16` |
    | Windows / Visual Studio 2022 | `Visual Studio 17` |
    | Linux / Ninja | `Ninja Multi-Config` |

* The location of the downloadable packages, also known as the third-party libraries. The default location is `<user>/.o3de/3rdParty` for Windows, and `$HOME/.o3de/3rdParty` for Linux.

### Configure with the CMake CLI

The typical CMake command used to configure a project looks like the following:

{{< tabs name="CMake configure example" >}}
{{% tab name="Windows" %}}

```cmd
cmake -B build/windows -S . -G "Visual Studio 16" -DLY_3RDPARTY_PATH=<downloadable-packages-directory>
```

{{% /tab %}}
{{% tab name="Linux" %}}

{{< important >}}
When building using the O3DE pre-build **Snap** SDK, first export the `O3DE_SNAP` environment variable so CMake does not attempt to install Python pip requirements and fail. To export the `O3DE_SNAP` environment variable, run the command `export O3DE_SNAP` from the command line before running the CMake commands below.
{{< /important >}}

```shell
cmake -B build/linux -S . -G "Ninja Multi-Config" -DLY_3RDPARTY_PATH=<downloadable-packages-directory>
```

{{% /tab %}}
{{< /tabs >}}

* `-B` : Location of build directory, where to put the generated files.
* `-S` : Source directory, where the root CMakeLists.txt file is. Optional when running `cmake` from the source directory.
* `-G` : The generator to use to create the native project files.

The other argument is a custom definition (`-D`) for the build script, used by O3DE:  

* `LY_3RDPARTY_PATH` : The *absolute* path to your [O3DE packages](./packages). If packages are missing during configuration, they'll be downloaded to this location.

{{< note >}}
CMake [unity builds](https://cmake.org/cmake/help/latest/prop_tgt/UNITY_BUILD.html) are on by default. This is a CMake feature that can greatly improve build times by merging source files into single compilation units. If you encounter a build error, disabling unity builds might help debug the problem. To disable unity builds, run the previous `cmake` command with the `-DLY_UNITY_BUILD=OFF` argument to regenerate your project files.
{{< /note >}}

### Configure with the CMake GUI

CMake also offers an intuitive, GUI-based tool that you can use instead of the command line.

1. Launch the CMake GUI with:

    ```shell
    cd <source-directory>
    cmake-gui .
    ```

1. Set the following values in the GUI after launching it:

    * Set the **Where is the source code:** text field to your O3DE project directory.
    * Set the **Where to build the binaries:** text field to a subdirectory of your O3DE project where you want your build files to be generated. Typical values are `<project-dir>/build/windows` for Windows, and `<project-dir>/build/linux` for Linux platforms.

1. (Optional) Choose the **Add Entry** button and add a cache entry for the `LY_3RDPARTY_PATH` downloadable package directory. Use the following values for this entry:

    * **Name:** LY_3RDPARTY_PATH
    * **Type:** STRING
    * **Value:** `<directory where you want CMake to download the packaged libraries>`

    If you don't provide this entry, the libraries will be downloaded to the default directory: `<user>/.o3de/3rdParty` for Windows, and `$HOME/.o3de/3rdParty` for Linux.

1. Choose **Configure** to configure your project. This will also download any needed packages to the path set by `LY_3RDPARTY_PATH`.

1. Specify the generator for the project.

    * **For Windows:** Visual Studio 16 _or_ Visual Studio 17
    * **For Linux:** Ninja Multi-Config

1. Inspect the variables that are read in and update any that are not correct.

    {{< note >}}
CMake [unity builds](https://cmake.org/cmake/help/latest/prop_tgt/UNITY_BUILD.html) are on by default. This is a CMake feature that can greatly improve build times by merging source files into single compilation units. If you encounter a build error, disabling unity builds might help debug the problem. To disable unity builds in the CMake GUI, find the `LY_UNITY_BUILD` variable and uncheck it.
    {{< /note >}}

1. Choose **Generate** to generate the project files in the build directory.

## Building O3DE targets with CMake

CMake enables you to invoke the native toolchains from its generated projects with the `--build` option. CMake builds are offered for convenience - after generating a native project, you can work completely within an IDE.

### Generated build configurations

O3DE supports a number of build configurations to support your development workflows of debugging, profiling, and generating releases of your projects. Each configuration has a set of properties that makes it suitable for performing certain tasks, and affect things like debug symbol tables, optimization levels, and which O3DE development tools can be used to inspect and send assets to a running project.

For the full set of flags used by the compiler for each build configuration, see the following CMake files in source:

* `cmake/Configurations.cmake`
* `cmake/Common/Configurations_common.cmake`
* `cmake/Common/<compiler>/Configurations_<compiler>.cmake`
* `cmake/Platform/<platform ID>/Configurations_<platform ID>.cmake`

The following table is a high-level overview of what each build configuration does.

| Configuration | Effects |
| --- | --- |
| **Debug** | Maximum level of debugging support. Optimizations including function inlining will be avoided, making it easier to trace code. Some compilers may disable stack overflow or other memory protection runtime checks, making this the best build configuration for inspecting certain types of bugs affecting the stack. In supported IDEs, this also enables "Edit and continue" support. |
| **Profile** | Debugging symbol support, but optimizations are enabled (equivalent to clang `-O2`, non-aggressive optimizations.) This is the recommended profile for daily workflows, as it's the most representative of a release build but with symbols enabled. |
| **Release** | For your final release build. Non-aggressive optimizations and no debugging information. |

### Build the O3DE editor, engine, and tools

Use the following command to build just the Editor and its tool dependencies:

{{< tabs name="CMake engine build example" >}}
{{% tab name="Windows" %}}

```cmd
cmake --build build/windows --target Editor --config profile -- -m
```

* `--build` : Location of build directory, where to put the build output.
* `--target` : Build target(s). More than one can be specified, separated by a space.
* `--config` : The build configuration. Refer to the previous section on [Generated build configurations](#generated-build-configurations).
* `-m` : A recommended build tool optimization. It tells the Microsoft compiler (MSVC) to use multiple threads during compilation to speed up build times.

In this example, build products are placed in the `build\windows\bin\profile` directory.

{{% /tab %}}
{{% tab name="Linux" %}}

```shell
cmake --build build/linux --target Editor --config profile -j <number of parallel build tasks>
```

* `--build` : Location of build directory, where to put the build output.
* `--target` : Build target(s). More than one can be specified, separated by a space.
* `--config` : The build configuration. Refer to the previous section on [Generated build configurations](#generated-build-configurations).
* `-j` : A recommended build tool optimization. It tells the Ninja build tool the number of parallel build tasks that will be executed simultaneously. The 'number of parallel build tasks' is recommended to match the number of cores available on the Linux host machine.

In this example, build products are placed in the `build/linux/bin/profile` directory.

{{% /tab %}}
{{< /tabs >}}

### Build a project

Use the following command to build the project, Editor, and its tool dependencies:

{{< tabs name="CMake project build example" >}}
{{% tab name="Windows" %}}

```cmd
cmake --build build/windows --target <ProjectName>.GameLauncher Editor --config profile -- -m
```

Refer to the previous section for an explanation of each parameter.

In this example, build products are placed in the `build\windows\bin\profile` directory.

{{% /tab %}}
{{% tab name="Linux" %}}

```shell
cmake --build build/linux --target <ProjectName>.GameLauncher Editor --config profile -j <number of parallel build tasks>
```

Refer to the previous section for an explanation of each parameter.

In this example, build products are placed in the `build/linux/bin/profile` directory.

{{% /tab %}}
{{< /tabs >}}

## Simulate an automated review run

To test a build in your branch, you can use the `ci_build.py` Python script that's included with O3DE to simulate the automated review (AR) run that is executed on the Jenkins build nodes. Any contributions you make to the O3DE repo will need to pass this test run before your GitHub pull request can be merged.

Use the following instructions to run `ci_build.py` to simulate an AR run. This build script is located in the `<O3DE_engine>/scripts/build/` directory. The script requires the environment variable `LY_3RDPARTY_PATH` to be set to your downloadable packages ("third-party") folder.

{{< tabs name="Simulate AR run example" >}}
{{% tab name="Windows" %}}

1. Set the `LY_3RDPARTY_PATH` environment variable if it has not been set.

    ```cmd
    set LY_3RDPARTY_PATH=<path to your downloadable packages folder>
    ```

    For example, to use the default downloadable packages folder, set the following path:

    ```cmd
    set LY_3RDPARTY_PATH=%USERPROFILE%\.o3de\3rdParty
    ```

1. Run the following command from the engine root folder.

    ```cmd
    python\python.cmd -u scripts\build\ci_build.py --platform Windows --type <test_type>
    ```

    For the `<test_type>`, use any test type that is defined in the file `scripts\build\Platform\Windows\build_config.json`. For example, to run a test suite for the profile configuration, you can use `profile_vs2019`.

    ```cmd
    python\python.cmd -u scripts\build\ci_build.py --platform Windows --type profile_vs2019
    ```

{{% /tab %}}
{{% tab name="Linux" %}}

1. Set the `LY_3RDPARTY_PATH` environment variable if it has not been set.

    ```shell
    export LY_3RDPARTY_PATH=<path to your downloadable packages folder>
    ```

    For example, to use the default downloadable packages folder, set the following path:

    ```shell
    export LY_3RDPARTY_PATH=~/.o3de/3rdParty
    ```

1. Run the following command from the engine root folder.

    ```shell
    python/python.sh -u scripts/build/ci_build.py --platform Linux --type <test_type>
    ```

    For `<test_type>`, use any test type that is defined in the file `scripts/build/Platform/Linux/build_config.json`. For example, to run a test suite for the profile configuration, you can use `test_profile`.

    ```shell
    python/python.sh -u scripts/build/ci_build.py --platform Linux --type test_profile
    ```

{{% /tab %}}
{{< /tabs >}}
