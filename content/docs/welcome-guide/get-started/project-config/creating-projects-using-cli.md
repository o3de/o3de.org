---
linktitle: Creating Projects Using the CLI
title: Creating Projects Using the Command Line
description: Learn how to create and build new Open 3D Engine (O3DE) projects from the default project template using the CLI.
weight: 100
toc: true
---

This tutorial provides an introduction to project configuration and building in Open 3D Engine (O3DE). The instructions here will guide you through the following steps:

* Create a new O3DE project.
* Create Visual Studio project files in your O3DE project directory.
* Build the O3DE project.

At the end of the tutorial you'll have a new O3DE project based on the default project template, ready to open in the **O3DE Editor**.

## Prerequisites

The instructions that follow assume you have the following:

* O3DE installed on your computer. For help, see [Setup](/docs/welcome-guide/setup).
* An O3DE engine registered in the O3DE manifest. When setting up O3DE from GitHub, you must manually register the engine. For help, see [Register O3DE engine](/docs/welcome-guide/setup/setup-from-github/#register-the-engine).
* Met all hardware and software requirements listed in [System Requirements](/docs/welcome-guide/setup/requirements.md).

## Create a new O3DE project

Project directories can be located either in the same directory as the O3DE root directory or outside of this directory. The latter are referred to as "external projects" in this documentation.

This tutorial uses the following project name and directories in the examples:

* O3DE engine directory: `C:\o3de`
* New project name and location: `C:\o3de-projects\MyProject`
* Package directory (created earlier during [setup](/docs/welcome-guide/setup/setup-from-github/#build-the-engine)): `C:\o3de-packages`

1. Open a command line window and change to your O3DE engine directory. The default `o3de` directory is shown in this example.

    ```cmd
    cd C:\o3de
    ```

1. Use the `o3de` script in the `scripts` subdirectory to create a new project. The `create-project` command, used with the `project-path` and no other options, creates a new project using the default project template.

    ```cmd
    scripts\o3de.bat create-project --project-path C:\o3de-projects\MyProject
    ```

1. Register the engine to the project. This adds your new project to the list of known projects in the O3DE manifest, located at `<USER_DIRECTORY>/.o3de/o3de_manifest.json`. Note that the full (absolute) path to the project is always needed for this command.

    ```cmd
    scripts\o3de.bat register --project-path C:\o3de-projects\MyProject
    ```

## Create a Visual Studio project

CMake is used to create Visual Studio projects.

1. Use CMake to create the Visual Studio project in your new project directory. Supply the build directory, the Visual Studio generator, the path to the packages directory, and any other project options. Paths can be absolute or relative.

    ```cmd
    cd C:\o3de-projects\MyProject
    cmake -B build/windows_vs2019 -G "Visual Studio 16" -DLY_3RDPARTY_PATH=C:\o3de-packages
    ```

    {{< caution >}}
Do not use trailing slashes when specifying the path to the packages directory.
    {{< /caution >}}

## Build the O3DE project

CMake is also used to build Visual Studio projects.

1. Use CMake to build the project launcher using the solution you created in the `/build/windows_vs2019` directory. The `profile` build configuration is shown in this example.

    ```cmd
    cmake --build build/windows_vs2019 --target MyProject.GameLauncher --config profile -- /m
    ```

    {{< note >}}
The `/m` is a recommended build tool optimization, which tells the Microsoft compiler (MSVC) to use multiple threads during compilation to speed up build times.
    {{< /note >}}

1. The project will take a while to build. In this example, when the build is complete, the project binaries can be found under `/build/windows_vs2019/bin/profile`.

1. Run the O3DE Editor, which is located in your engine directory, to verify the project is ready to use.

    The project path can be absolute or relative. If relative, it must be relative to the _engine_ directory.

    ```cmd
    C:\o3de\build\bin\profile\Editor.exe --project-path C:\MyProject
    ```

    If you don't supply the project path when you run the Editor from the command line, the **O3DE Project Manager** will launch. Using the Project Manager's GUI, you can edit your project's settings, add or remove Gems from the project, and launch the Editor.

For more information about project configuration and building, refer to the [Project Configuration](/docs/user-guide/project-config) and [Build](/docs/user-guide/build) sections of the User Guide.
