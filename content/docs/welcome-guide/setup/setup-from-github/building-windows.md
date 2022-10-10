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

To prepare to build the engine and projects, choose one of the following build types based on the primary focus of your development work, then follow the instructions in the corresponding tab:

1. **Source engine** - Choose this build type if you plan to make frequent changes to the engine source code.

1. **Pre-built SDK engine** - Choose this build type if you're primarily interested in project development and you plan to make only infrequent changes (or no changes) to the engine source.

{{< tabs name="Engine build instructions" >}}
{{% tab name="Source engine" %}}

1. Create a package directory in a writeable location. The following examples use the directory `C:\o3de-packages`.

    ```cmd
    mkdir C:\o3de-packages
    ```

    The O3DE package downloader uses this directory to retrieve external libraries needed for the engine.

1. Get the Python runtime, which isn't included in the GitHub repo. The `o3de` script (part of the **O3DE CLI**) requires this runtime. You'll use this script to run common command line functions. This script also requires **CMake** to be installed and accessible on your device's path. If you haven't installed CMake, or you get an error that CMake cannot be found when running the script, refer to the [O3DE System Requirements](/docs/welcome-guide/requirements) page for installation instructions.

    Open a command prompt and change to the directory where you set up O3DE, then run the `get_python` script.

    ```cmd
    python\get_python.bat
    ```

1. Use CMake to create the Visual Studio project for the engine. Supply the build directory, the Visual Studio generator, the path to the packages directory that you created, and any other project options. Paths can be absolute or relative. Alternatively, you can use the CMake GUI to complete this step.

    ```cmd
    cmake -B build/windows -S . -G "Visual Studio 16" -DLY_3RDPARTY_PATH=C:\o3de-packages
    ```

    * Use `Visual Studio 16` as the generator for Visual Studio 2019, and `Visual Studio 17` for Visual Studio 2022. For a complete list of common generators for each supported platform, refer to [Configuring projects](/docs/user-guide/build/configure-and-build/#configuring-projects) in the User Guide.

    * `LY_3RDPARTY_PATH` is an optional custom definition. (Custom definitions are prefixed with `-D`.) Use it to specify the path to the downloadable package directory, also known as the "third-party path". Do not use trailing slashes when specifying the path to the packages directory.

1. (Optional) Use CMake to build the source engine. This step is optional because in the "source engine" build model, the engine is built inside of every project. If you plan on working with projects, to avoid building the engine twice, consider waiting until you learn how to create and build a project, which is covered in the [Project Creation](/docs/welcome-guide/create/) section. The following command builds the engine without a project.

    The following example shows the `profile` build configuration.

    ```cmd
    cmake --build build/windows --target Editor --config profile -- -m
    ```

    The `-m` is a recommended build tool optimization. It tells the Microsoft compiler (MSVC) to use multiple threads during compilation to speed up build times.
    The `--config` sets the build configuration type: `profile`, `debug`, or `release`. For setting up O3DE, `profile` is recommended. Read more on [O3DE's build configurations](/docs/user-guide/build/configure-and-build.md#generated-build-configurations).

    The engine takes a while to build. If you've used all the example commands in these steps, when the build is complete, you can find the engine tools and other binaries in `C:\o3de\build\windows\bin\profile`.

{{% /tab %}}
{{% tab name="Pre-built SDK engine" %}}

1. Create a package directory in a writeable location. The following examples use the directory `C:\o3de-packages`.

    ```cmd
    mkdir C:\o3de-packages
    ```

    The O3DE package downloader uses this directory to retrieve external libraries needed for the engine.

1. Get the Python runtime, which isn't included in the GitHub repo. The `o3de` script (part of the **O3DE CLI**) requires this runtime. You'll use this script to run common command line functions. This script also requires **CMake** to be installed and accessible on your device's path. If you haven't installed CMake, or you get an error that CMake cannot be found when running the script, refer to the [O3DE System Requirements](/docs/welcome-guide/requirements) page for installation instructions.

    Open a command prompt and change to the directory where you set up O3DE, then run the `get_python` script.

    ```cmd
    python\get_python.bat
    ```

1. Use CMake to create the Visual Studio project for the engine. Supply the build directory, the Visual Studio generator, the path to the packages directory that you created, and any other project options. Paths can be absolute or relative. Alternatively, you can use the CMake GUI to complete this step.

    ```cmd
    cmake -B build/windows -G "Visual Studio 16" -DLY_3RDPARTY_PATH=C:\o3de-packages -DLY_VERSION_ENGINE_NAME=o3de-install -DCMAKE_INSTALL_PREFIX=C:\o3de-install
    ```

    * Use `Visual Studio 16` as the generator for Visual Studio 2019, and `Visual Studio 17` for Visual Studio 2022. For a complete list of common generators for each supported platform, refer to [Configuring projects](/docs/user-guide/build/configure-and-build/#configuring-projects) in the User Guide.

    The preceding command specifies several noteworthy custom definitions (`-D`). All are optional but recommended in this example.

    * `LY_3RDPARTY_PATH` : The path to the downloadable package directory, also known as the "third-party path". Do not use trailing slashes when specifying the path to the packages directory.
    * `LY_VERSION_ENGINE_NAME` : The name you want to give the engine. Giving the install layout a different engine name ("o3de-install") than the source engine ("o3de") enables useful side-by-side options.
    * `CMAKE_INSTALL_PREFIX`: The path to the installed build of the engine source. The directory you specify here is your engine install directory. You will find the Project Manager, Editor, and other tools in the subdirectory `bin/Windows/profile/Default`. If you don't specify this option, the engine SDK binaries will be built to `<ENGINE_SOURCE>/install/bin/Windows/profile/Default`.

1. Use CMake to build the engine as an SDK, the same as if you installed the engine from an installer tool. The following example shows the `profile` build configuration.

    ```cmd
    cmake --build build/windows --target INSTALL --config profile -- -m
    ```

    The `-m` is a recommended build tool optimization. It tells the Microsoft compiler (MSVC) to use multiple threads during compilation to speed up build times.
    The `--config` sets the build configuration type: `profile`, `debug`, or `release`. For setting up O3DE, `profile` is recommended. Read more on [O3DE's build configurations](/docs/user-guide/build/configure-and-build.md#generated-build-configurations).

    The engine takes a while to build. If you've used all the example commands in these steps, when the build is complete, you can find the engine tools and other binaries in `C:\o3de-install\bin\Windows\profile\Default`.

{{% /tab %}}
{{< /tabs >}}

{{< note >}}
CMake [unity builds](https://cmake.org/cmake/help/latest/prop_tgt/UNITY_BUILD.html) are on by default. This is a CMake feature that can greatly improve build times by merging source files into single compilation units. If you encounter a build error, disabling unity builds might help debug the problem. To disable unity builds, run the `cmake` project generation command with the `-DLY_UNITY_BUILD=OFF` argument to regenerate your project files.
{{< /note >}}

## Register the engine

Registering the O3DE engine enables O3DE projects to find the engine, even when they exist in different locations on your computer. The registration process creates (or updates) the **O3DE manifest** in your user directory.

Choose the tab that corresponds to the engine build type you chose in the preceding set of instructions.

{{< tabs name="Engine registration instructions" >}}
{{% tab name="Source engine" %}}

1. Open a command window if you don't already have one open. Change your current directory to the source engine directory.

    ```cmd
    cd C:\o3de
    ```

1. Use the `o3de` script to register the engine.

    ```cmd
    scripts\o3de.bat register --this-engine
    ```

    The O3DE manifest file is `<USER_DIRECTORY>/.o3de/o3de_manifest.json`. The paths to all the registered engines, projects, and more are recorded in this file.

{{% /tab %}}
{{% tab name="Pre-built SDK engine" %}}

1. Open a command window if you don't already have one open. Change your current directory to the pre-built engine directory.

    ```cmd
    cd C:\o3de-install
    ```

1. Get the Python runtime for the pre-built engine.

    ```cmd
    python\get_python.bat
    ```

1. Use the `o3de` script to register the engine.

    ```cmd
    scripts\o3de.bat register --this-engine
    ```

    The O3DE manifest file is `<USER_DIRECTORY>/.o3de/o3de_manifest.json`. The paths to all the registered engines, projects, and more are recorded in this file.

{{% /tab %}}
{{< /tabs >}}

You're now ready to create a project. For an introduction to project configuration, refer to [Project Creation with Open 3D Engine](/docs/welcome-guide/create).
