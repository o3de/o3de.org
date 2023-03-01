---
title: Building for Windows
description: Learn how to build Open 3D Engine (O3DE) on Windows from its GitHub source.
weight: 100
toc: true
---

Once you have a local copy of the O3DE source, you can build the engine, including key tools such as **Asset Processor**, **O3DE Editor**, and **Project Manager**. If you have not yet cloned the source from GitHub, refer to [Setting up O3DE from GitHub](../setup-from-github).

## Prerequisites

The following instructions assume that you have:

* Met all hardware and software requirements listed in [O3DE System Requirements](/docs/welcome-guide/requirements).
* Configured the required Windows software as described in the [Windows software configuration](/docs/welcome-guide/requirements/#microsoft-windows) section of the system requirements topic.

## Build the engine

When building the engine from source, you have a few configuration options, based on the focus and needs of your development work:

* Build type
* Build configuration

### Build type

1. **Source engine** - Choose this build type if you plan to make frequent changes to the engine source code. The engine can be built by itself, if your primary interest is engine development, or it can also be built with a project that uses your custom build.

1. **Pre-built SDK engine** - Choose this build type if you're primarily interested in creating a distributable engine for project development, and you plan to make only infrequent changes to the engine source.

{{< tip >}}
If you don't intend to make any changes to the engine source, consider downloading and installing O3DE using the [installer for Windows](/docs/welcome-guide/setup/installing-windows/) instead.
{{< /tip >}}

### Build configuration

1. **Debug** - Provides the maximum level of debugging support. Optimizations including function inlining will be avoided, making it easier to trace code. Some compilers may disable stack overflow or other memory protection runtime checks, making this the best build configuration for inspecting certain types of bugs affecting the stack. In supported IDEs, this also enables "Edit and continue" support.

1. **Profile** - Offers debugging symbol support, but optimizations are enabled (equivalent to clang `-O2`, non-aggressive optimizations). This is the recommended profile for daily workflows, as it's the most representative of a release build but with symbols enabled.

1. **Release** - Use this for a final release build. Includes non-aggressive optimizations and no debugging information.

### Build instructions

The following instructions show how to build a *source engine* in *profile* configuration. Building a pre-built SDK engine is a little more complicated. For details, refer to the topic on [creating distributable engine builds](/docs/user-guide/build/distributable-engine) in the User Guide.

1. (Optional) If you don't already have a package directory, create one in a writeable location. The following examples use the directory `C:\o3de-packages`. Alternatively, you can let the build process use the default package directory that's also used by the O3DE installer, located in `<user>\.o3de\3rdParty`. This can save disk space if you have multiple version of O3DE, such as an engine built from source and one or more installed versions of the engine.

    ```cmd
    mkdir C:\o3de-packages
    ```

    The O3DE package downloader uses this directory to retrieve external libraries needed for the engine.

1. Get the Python runtime, which isn't included in the GitHub repo. The `o3de` script (part of the **O3DE CLI**) requires this runtime. You'll use this script to run common command line functions. This script also requires **CMake** to be installed and accessible on your device's path. If you haven't installed CMake, or you get an error that CMake cannot be found when running the script, refer to the [O3DE System Requirements](/docs/welcome-guide/requirements) page for installation instructions.

    Open a command prompt and change to the directory where you set up O3DE, then run the `get_python` script.

    ```cmd
    # Run from the o3de engine root.
    python\get_python.bat
    ```

1. Use CMake to create the Visual Studio project for the engine. Supply the build directory, the Visual Studio generator, the path to the packages directory that you created, and any other project options. Paths can be absolute or relative. Alternatively, you can use the CMake GUI to complete this step.

    ```cmd
    cmake -B build/windows -S . -G "Visual Studio 16" -DLY_3RDPARTY_PATH=C:\o3de-packages
    ```

    * Use `Visual Studio 16` as the generator for Visual Studio 2019, and `Visual Studio 17` for Visual Studio 2022. For a complete list of common generators for each supported platform, refer to [Configuring projects](/docs/user-guide/build/configure-and-build/#configuring-projects) in the User Guide.

    * `LY_3RDPARTY_PATH` is an optional custom definition. (Custom definitions are prefixed with `-D`.) Use it to specify the path to the downloadable package directory, also known as the "third-party path". Do not use trailing slashes when specifying the path to the packages directory. You can also leave this option off to use the default package directory.

1. (Optional) Use CMake to build the source engine. This step is optional because in the "source engine" build model, the engine is built inside of every project. If you plan on working with projects, to avoid building the engine twice, consider waiting until you learn how to create and build a project, which is covered in the [Project Creation](/docs/welcome-guide/create/) section.

    The following command builds the engine, without a project, using the `profile` build configuration.

    ```cmd
    cmake --build build/windows --target Editor --config profile -- -m
    ```

    The `-m` is a recommended build tool optimization. It tells the Microsoft compiler (MSVC) to use multiple threads during compilation to speed up build times.

    The `--config` sets the [build configuration type](/docs/user-guide/build/configure-and-build.md#generated-build-configurations): `debug`, `profile`, or `release`.

    The engine takes a while to build. If you've used all the example commands in these steps, when the build is complete, you can find the engine tools and other binaries in `<engine>\build\windows\bin\profile`.

    {{< note >}}
CMake [unity builds](https://cmake.org/cmake/help/latest/prop_tgt/UNITY_BUILD.html) are on by default. This is a CMake feature that can greatly improve build times by merging source files into single compilation units. If you encounter a build error, disabling unity builds might help debug the problem. To disable unity builds, run the `cmake` project generation command with the `-DLY_UNITY_BUILD=OFF` argument to regenerate your project files.
    {{< /note >}}

1. After your first build of the engine, be sure to register it in the O3DE manifest using the steps in the next section.

## Register the engine

Registering the O3DE engine enables O3DE projects to find the engine, even when they exist in different locations on your computer. The registration process creates (or updates) the **O3DE manifest** in your user directory.

1. From a command window, use the `o3de` script to register the engine.

    ```cmd
    # Run from the o3de engine root.
    scripts\o3de.bat register --this-engine
    ```

    The O3DE manifest file is `<user>\.o3de\o3de_manifest.json`. The paths to all the registered engines, projects, and more are recorded in this file.

You're now ready to create a project. For an introduction to project configuration, refer to [Project Creation with Open 3D Engine](/docs/welcome-guide/create).
