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

At the end of the tutorial you'll have a new O3DE project based on the default project template.

## Prerequisites

The instructions that follow assume you have the following:

* O3DE installed on your computer. For help, see [Setup](/docs/welcome-guide/setup).
* An O3DE engine registered in the O3DE manifest. When setting up O3DE from GitHub, you must manually register the engine. For help, see [Register O3DE engine](/docs/welcome-guide/setup/setup-from-github/#register-o3de-engine).
* Met all hardware and software requirements listed in [System Requirements](/docs/welcome-guide/setup/requirements.md).

## Create a new O3DE project

<!---
Project directories can be located either in the same directory as the O3DE root directory or outside of this directory. The latter are referred to as "external projects" in this documentation.
-->
This tutorial will use the following project name and directories in the examples:

* O3DE engine directory: `C:\o3de`
* New project name and location: `C:\o3de\MyProject`
* Package directory (created earlier during [setup](/docs/welcome-guide/setup/setup-from-github/#create-a-packages-directory)): `C:\o3de-packages`

{{< caution >}}
External projects - projects created outside the engine directory - are considered experimental. They might be unstable, and will need updates to their project configuration in later versions of O3DE.
{{< /caution >}}

**To create a new O3DE project from command line**

1. Open a command line window and change to your O3DE engine directory. The default `o3de` directory is shown in this example.

    ```cmd
    cd C:\o3de
    ```

1. Use the `o3de` script in the `scripts` subdirectory to create a new project. The `create-project` command, used with the `project-path` and no other options, creates a new project using the default project template.

    ```cmd
    scripts\o3de.bat create-project --project-path MyProject
    ```

1. Register the project. This adds your new project to the list of known projects in the O3DE manifest, located at `<user directory>/.o3de/o3de_manifest.json`. Note that the full (absolute) path to the project is always needed for this command.

    ```cmd
    scripts\o3de.bat register --project-path C:\o3de\MyProject
    ```

1. Use CMake to create the Visual Studio project in the new project directory. Supply the build directory, the project directory, the Visual Studio generator, the path to the packages directory, and any other project options. Paths can be absolute or relative.

    ```cmd
    cmake -B MyProject/build -S MyProject -G "Visual Studio 16" -DLY_3RDPARTY_PATH=C:\o3de-packages -DLY_UNITY_BUILD=ON
    ```

    {{< caution >}}
Do not use trailing slashes when specifying the path to the packages directory.
    {{< /caution >}}

    {{< note >}}
Unity builds are recommended in many cases for improved build performance. If you encounter a build error, disable unity builds to help with debugging the problem.
    {{< /note >}}

1. Use CMake to build the project launcher, O3DE **Editor**, and **AssetProcessor**. Building the `profile` configuration is shown here. When specifying the Editor as a build target, the AssetProcessor will be built too, since it is a dependency of the Editor.

    ```cmd
    cmake --build MyProject/build --target MyProject.GameLauncher Editor --config profile -- /m
    ```

    {{< note >}}
The `/m` is a recommended build tool optimization, which tells the Microsoft compiler (MSVC) to use multiple threads during compilation to speed up build times.
    {{< /note >}}

1. This will take some time to build. When the build completes, the binaries are available in the project build path, under `bin\<build configuration>`. Run the Editor from the command line to verify a successful build, supplying the project directory path to the `--project-path` argument. The path can be absolute or relative. If relative, it must be relative to the _engine_ directory.

    ```cmd
    MyProject\build\bin\profile\Editor.exe --project-path MyProject
    ```

    {{< note >}}
In the 0.5 preview branch, to launch the Editor from Windows File Explorer, or to avoid having to supply the project path: Edit the file `bootstrap.cfg`, located in the root of the engine directory, and set `project_path` equal to the project path. For example: `project_path=MyProject`.
    {{< /note >}}

For more details about project configuration and building, see the sections on [Project Configuration](/docs/user-guide/project-config) and [Build](/docs/user-guide/build) in the User Guide.
