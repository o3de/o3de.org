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
* Registered the O3DE engine in the O3DE manifest. If you set up O3DE from GitHub, you must manually register the engine. For help, refer to [Register the engine](/docs/welcome-guide/setup/setup-from-github/#register-the-engine).
* Met all Linux hardware and software requirements listed in [O3DE System Requirements](/docs/welcome-guide/requirements).

{{< note >}}
These instructions use $O3DE_ENGINE to refer to the absolute path where the O3DE source code is located on your local file system. 
{{< /note >}}

## Create an O3DE project

If you haven't yet created an O3DE project, do so now using the `o3de` script. $O3DE_PROJECT_PATH refers to the absolute path of the project and $O3DE_PROJECT_NAME refers to the name of the project.

```shell
$O3DE_ENGINE/scripts/o3de.sh create-project --project-path $O3DE_PROJECT_PATH
```

Refer to [Creating Projects Using the Command Line Interface](/docs/welcome-guide/create/creating-projects-using-cli) for more information on creating new O3DE projects.

## Project Build Generation

Although Unix Make Files are supported on Linux with cmake, it is recommended to use Ninja as a build system in order to support multiple configurations for generated builds. The instructions described for the different development flows will be based on "Ninja Multi-Config" as the cmake generator.

{{< note >}}
When generating projects, a project path is required. This can be an existing O3DE project, or a new one generated with the instructions provided through the [Projects](docs/user-guide/project-config) page. The instructions below will assume that $O3DE_PROJECT will refer to the absolute path of the project to base the build on. 
{{< /note >}}


### Multiple Config Builds
The following command generates a build folder, `build/linux`, under the root of the project folder, $O3DE_PROJECT, by using Ninja as the build generator and clang-12 as the compiler.

```shell

cd $O3DE_PROJECT_PATH

$O3DE_ENGINE/scripts/o3de.sh register --project-path .

cmake -B build/linux -S . -G"Ninja Multi-Config" -DCMAKE_C_COMPILER=clang-12 -DCMAKE_CXX_COMPILER=clang++-12 

```

### Single Config Builds

If you do not need to generate multi-config build folders, you can instead specify "Unix Makefiles" instead, but will need to specify a configuration the configuration at the time of project generation. ($BUILD_CONFIG below can be either debug, profile, or release)

```shell

cd $O3DE_PROJECT_PATH

$O3DE_ENGINE/scripts/o3de.sh register --project-path .

cmake -B build/linux -S . -G"Unix Makefiles" -DCMAKE_C_COMPILER=clang-12 -DCMAKE_CXX_COMPILER=clang++-12 -DCMAKE_BUILD_TYPE=$BUILD_CONFIG

```

## Building from command line

Once the build folder is generated, building from command line is the same process as for other platforms.

### Single Config Builds

For projects that were generated using the Unix Makefile generator, the configuration will already be specified during the project generation and you can only build for that configuration.

```shell

cd $O3DE_PROJECT_PATH

cmake --build build/linux --target=$O3DE_PROJECT_NAME.GameLauncher Editor
```


### Multiple Config Builds

For projects that were generated using the Ninja Multi-Config generator will require that the build configuration be part of the build command.

```shell

cd $O3DE_PROJECT_PATH

cmake --build build/linux --config profile --target=$O3DE_PROJECT_NAME.GameLauncher Editor
```

{{< note >}}
If you need to build the O3DE Project Manager, the above --target arguments will not build it by default. In order to build the O3DE Project Manager, you will need to set the target to **Project Manager**.  `--target ProjectManager` instead.
{{< /note >}}


## Advanced Topics

### Generating a Compilation Database

In conjuction with using the Ninja or the Unix Makefile generators, cmake has the option to generate a Compilation Database [compile-command.json](https://clang.llvm.org/docs/JSONCompilationDatabase.html). This file is used by IDEs such as Visual Studio Code or CLion to extract the compilation information from the build to support useful features such as Intellisense, compilation flags, etc. 


{{< note >}}
IDEs can use the `compile-command.json` only when Unity builds are turned off. Since Unity builds are enabled by default in O3DE, you will need to explicitly turn it off with the `-DLY_UNITY_BUILD=OFF` argument.
{{< /note >}}

To enable the generation of the compilation database file, include the following arguments in the project generation command:

```shell
-DCMAKE_EXPORT_COMPILE_COMMANDS=ON -DLY_UNITY_BUILD=OFF
```



