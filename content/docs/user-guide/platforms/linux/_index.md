---
title: Open 3D Engine on Linux
linkTitle: Linux
description: An overview of Open 3D Engine support for development on Linux.
weight: 200
---

**Open 3D Engine (O3DE)** includes support for the Linux platform. Learn how to build O3DE tools and projects for the supported versions of Linux using the instructions included here.

## Prerequisites

The following instructions assume that you have:

* Set up O3DE in a project-centric [source engine](/docs/user-guide/appendix/glossary#source-engine) configuration from GitHub. For help, refer to [Setting up O3DE from GitHub](/docs/welcome-guide/setup/setup-from-github).
* Registered the O3DE engine in the O3DE manifest. If you set up O3DE from GitHub, you must manually register the engine. For help, refer to [Register the engine](/docs/welcome-guide/setup/setup-from-github/building-linux/#register-the-engine).
* Met all Linux hardware and software requirements listed in [O3DE System Requirements](/docs/welcome-guide/requirements).

{{< note >}}
These instructions use `$O3DE_ENGINE` to refer to the absolute path where the O3DE source code is located on your local file system.
{{< /note >}}

## Create an O3DE project

If you haven't yet created an O3DE project, do so now using the `o3de` script. $O3DE_PROJECT_PATH refers to the absolute path of the project and $O3DE_PROJECT_NAME refers to the name of the project.

```shell
$O3DE_ENGINE/scripts/o3de.sh create-project --project-path $O3DE_PROJECT_PATH
```

Refer to [Creating Projects Using the Command Line Interface](/docs/welcome-guide/create/creating-projects-using-cli) for more information on creating new O3DE projects.

## Generate the build folder

Although CMake supports Unix Make Files on Linux, we recommend that you use Ninja as a build system to support multiple configurations in your generated builds. These instructions use "Ninja Multi-Config" as the CMake generator.

{{< important >}}
When building using the O3DE pre-build **Snap** SDK, first export the `O3DE_SNAP` environment variable so CMake does not attempt to install Python pip requirements and fail. To export the `O3DE_SNAP` environment variable, run the command `export O3DE_SNAP` from the command line before running the CMake commands below.
{{< /important >}}

### Multiple Config Builds
The following command generates a build folder, `build/linux`, under the root of the project folder, `$O3DE_PROJECT_PATH`, by using Ninja as the build generator and clang-12 as the compiler.


```shell

cd $O3DE_PROJECT_PATH

cmake -B build/linux -S . -G "Ninja Multi-Config"

```

### Single Config Builds

If you do not need to generate multi-config build folders, you can specify "Unix Makefiles" as the generator for CMake. You will need to specify a configuration at the time of project generation. Valid values for $BUILD_CONFIG include: `debug`, `profile`, and `release`.

```shell

cd $O3DE_PROJECT_PATH

cmake -B build/linux -S . -G "Unix Makefiles" -DCMAKE_BUILD_TYPE=$BUILD_CONFIG

```

## Building from command line

Once the build folder is generated, building from command line is the same process as for other platforms.

{{< important >}}
When building using the O3DE pre-build **Snap** SDK, first export the `O3DE_SNAP` environment variable so CMake does not attempt to install Python pip requirements and fail. To export the `O3DE_SNAP` environment variable, run the command `export O3DE_SNAP` from the command line before running the CMake commands below.
{{< /important >}}

### Multiple Config Builds

When building a project that was generated using the Ninja Multi-Config generator, include the build configuration in the build command.

```shell

cd $O3DE_PROJECT_PATH

cmake --build build/linux --config profile --target $O3DE_PROJECT_NAME.GameLauncher Editor
```

### Single Config Builds

When building a project that was generated using the Unix Makefile generator, CMake will use the configuration that you specified during project generation.

```shell

cd $O3DE_PROJECT_PATH

cmake --build build/linux --target $O3DE_PROJECT_NAME.GameLauncher Editor
```

## Advanced Topics

### Generating a Compilation Database

To support code completion and other IntelliSense features found in IDEs such as Visual Studio, instruct CMake to generate a compilation database ([compile-command.json](https://clang.llvm.org/docs/JSONCompilationDatabase.html)) file as part of the project generation command. 

{{< note >}}
IDEs can use the `compile-command.json` only when Unity builds are turned off. Since Unity builds are enabled by default in O3DE, you will need to explicitly turn it off with the `-DLY_UNITY_BUILD=OFF` argument.
{{< /note >}}

To enable the generation of the compilation database file, include the following arguments in the project generation command:

```shell
-DCMAKE_EXPORT_COMPILE_COMMANDS=ON -DLY_UNITY_BUILD=OFF
```
