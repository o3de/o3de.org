---
title: Open 3D Engine on Linux
linkTitle: Linux
description: An overview of Open 3D Engine support for development on Linux.
weight: 200
---

Read the [system requirements](/docs/welcome-guide/requirements) for information on setting up your Linux environment for development with Open 3D Engine.

{{< note >}}
The instructions provide here are based on building O3DE from source and not from pre-built O3DE SDK files. It assumes that the O3DE source code has been pulled from its github repository (or from a fork).
{{< /note >}}

{{< note >}}
The instructions below will assume that $O3DE_ENGINE refers to the absolute path of where the O3DE source code exists on the local file system. For target project(s), refer to Refer to [Projects](docs/user-guide/project-config) on how to create new O3DE projects. 
{{< /note >}}

## First Time Setup

Once the O3DE source code is downloaded onto your local file system, it needs to have Python 3.7 packages downloaded and initialized in order to proceed.

```shell
cd $O3DE_ENGINE/python

./get_python
```
## Projects

Refer to [Projects](docs/user-guide/project-config) on how to create new O3DE projects. 


## Project Build Generation

Although Unix Make Files are supported on Linux with cmake, it is recommended to use Ninja as aa build system in order to support multiple configurations for generated builds. The instructions described for the different development flows will be based on "Ninja Multi-Config" as the cmake generator.

{{< note >}}
When generating projects, a project path is required. This can be an existing O3DE project, or a new one generated with the instructions provided through the [Projects](docs/user-guide/project-config) page. The instructions below will assume that $O3DE_PROJECT will refer to the absolute path of the project to base the build on. 
{{< /note >}}


### Multiple Config Builds
The following command will generate a build folder under the root of the project folder $O3DE_PROJECT called build/linux, using Ninja as the build generator and clang-12 as the compiler.

```shell

cd $O3DE_PROJECT

$O3DE_ENGINE/scripts/o3de.sh register --project-path .

cmake -B build/linux -S . -G"Ninja Multi-Config" -DCMAKE_C_COMPILER=clang-12 -DCMAKE_CXX_COMPILER=clang++-12 

```

### Single Config Builds

If you do not need to generate multi-config build folders, you can instead specify "Unix Makefiles" instead, but will need to specify a configuration the configuration at the time of project generation. ($BUILD_CONFIG below can be either debug, profile, or release)

```shell

cd $O3DE_PROJECT

$O3DE_ENGINE/scripts/o3de.sh register --project-path .

cmake -B build/linux -S . -G"Unix Makefiles" -DCMAKE_C_COMPILER=clang-12 -DCMAKE_CXX_COMPILER=clang++-12 -DCMAKE_BUILD_TYPE=$BUILD_CONFIG

```

To build the project, you can specify a specific target (like Editor for the example below)

```shell

cd $O3DE_PROJECT

cmake --build build/linux --target=Editor
```


## Building from command line

Once the build folder is generated, building from command line at this point is the same as the other platforms. 

### Single Config Builds

For projects that were generated using the Unix Makefile generator, the configuration will already be specified during the project generation and you can only build for that configuration.

```shell

cd $O3DE_PROJECT

cmake --build build/linux 
```


### Multiple Config Builds

For projects that were generated using the Ninja Multi-Config generator will require that the build configuration be part of the build command.

```shell

cd $O3DE_PROJECT

cmake --build build/linux --config profile
```

## Advanced Topics

### Generating a compile_commands.json 

In conjuction with using the Ninja or the Unix Makefile generators, cmake has the option to generate a [compile-command.json](https://clang.llvm.org/docs/JSONCompilationDatabase.html) file that can be used by IDEs like Visual Studio Code to aid in its intellisense. 

{{< note >}}
The compile-command.json is only usable by IDEs when Unity builds are turned off. Since Unity builds are enabled by default in O3DE, you will need to explicitly turn it off with the **-DLY_UNITY_BUILD=OFF** argument.
{{< /note >}}

To support this, the following arguments need to be added to the project generation command line described previously.

```shell
-DCMAKE_EXPORT_COMPILE_COMMANDS=ON -DLY_UNITY_BUILD=OFF
```



