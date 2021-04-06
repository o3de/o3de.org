---
linktitle: Creating Projects Using the CLI
title: Creating Projects Using the Command Line
description: Learn how to create new Open 3D Engine projects from a project template using the CLI.
weight: 100
toc: true
---

{{< preview-new >}}

This tutorial provides an introduction to project configuration in Open 3D Engine (O3DE). The instructions here will guide you through the following steps:

* Creating a new O3DE project.
* Creating a Visual Studio project in the O3DE project directory.
* Building the O3DE **Editor** and **AssetProcessor** in the O3DE project directory.

At the end of the tutorial, you will have a new O3DE project, based on the default project template.

## Prerequisites

The instructions that follow assume you have the following:

* O3DE installed on your computer. For help, see [Setup](/docs/welcome-guide/setup).
* An O3DE engine registered in the O3DE manifest. When setting up O3DE from GitHub, you must manually register the engine. For help, see [Register O3DE engine](/docs/welcome-guide/setup/setup-from-github/#register-o3de-engine).
* Met all requirements listed in [System Requirements](/docs/welcome-guide/setup/requirements.md).

## Create a new O3DE project

Project directories can be located either in the same directory as the O3DE root directory or outside of this directory. The latter are referred to as "external projects" in this documentation.

{{< caution >}}
External projects are considered experimental. They might be unstable in some scenarios.
{{< /caution >}}

**To create a new O3DE project from command line**

1. Open a command line in your O3DE engine directory.

    ```cmd
    cd o3de
    ```

1. Create the project directory.

    ```cmd
    scripts\o3de create-project --project-path <full path to project>
    ```

1. Register the project.

    ```cmd
    scripts\o3de register -p <full path to project>
    ```

## Create the Visual Studio project

Use CMake to generate the Visual Studio project files for your O3DE project.

**To create the Visual Studio project from command line**

1. Open a command line to your project directory.

    ```cmd
    cd <path to project>
    ```

1. Invoke CMake using the project path, build path, Visual Studio generator, and 3rd party path. Paths can be absolute or relative.

    ```cmd
    cmake -S <path to project> -B <path to project>/build -G "Visual Studio 16 2019" -DLY_3RDPARTY_PATH=%LY_3RDPARTY_PATH% -DLY_UNITY_BUILD=ON
    ```

## Build the O3DE Editor and AssetProcessor

Build the O3DE **Editor** and **AssetProcessor** executables from within your project directory.

**To build the Editor and AssetProcessor from command line**

1. Open a command line to your project directory.

    ```cmd
    cd <path to project>
    ```

1. Use CMake to build the Editor target using the profile configuration. AssetProcessor will also be built since it is a target dependency.

    ```cmd
    cmake --build <path to project>/build --target Editor --config profile -- /m
    ```

1. Once the build completes, the binaries will be available in the build path. Run the Editor from the command line to verify a successful build. Be sure to supply a project path. The path can be absolute or relative. If relative, make sure the path ends with the project directory name.

    ```cmd
    build\bin\profile\Editor.exe --project-path <path to project>
    ```

For more details about project configuration and building, see the sections on [Project Configuration](/docs/user-guide/project-config) and [Build](/docs/user-guide/build) in the User Guide.
