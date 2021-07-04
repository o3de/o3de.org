---
linktitle: Creating Projects Using the CLI
title: Creating Projects Using the Command Line Interface
description: Learn how to create and build new Open 3D Engine (O3DE) projects from the default project template using the CLI.
weight: 200
toc: true
---

This tutorial provides an introduction to project configuration and building in Open 3D Engine (O3DE). The instructions here guide you through the following steps:

* Create a new O3DE project using the command line interface (CLI).
* Create Visual Studio project files in your O3DE project directory.
* Build your O3DE project.

At the end of the tutorial you'll have a new O3DE project based on the default project template, opened in the **O3DE Editor**.

## Prerequisites

The following instructions assume that you have:

* O3DE installed or built as an SDK on your computer. For help, refer to [Setting up Open 3D Engine](/docs/welcome-guide/setup).
* An O3DE engine registered in the O3DE manifest. If you set up O3DE from GitHub, you must manually register the engine. For help, refer to [Register the engine](/docs/welcome-guide/setup/setup-from-github/#register-the-engine).
* Met all hardware and software requirements listed in [O3DE System Requirements](/docs/welcome-guide/setup/requirements).

## Create a new O3DE project

You can create project directories either in the same directory as the O3DE root directory or outside of this directory. This documentation refers to the latter as "external projects".

This tutorial uses the following project name and directories in the examples:

* O3DE engine install directory: `C:\o3de-install`
* New project name and location: `C:\o3de-projects\MyProject`
* Package directory (created earlier during [setup](/docs/welcome-guide/setup/setup-from-github/#build-the-engine)): `C:\o3de-packages`

1. Open a command line window and change to your O3DE engine install directory. The `o3de-install` directory created in [Setting up O3DE from GitHub](/docs/welcome-guide/setup/setup-from-github) is shown in this example.

    ```cmd
    cd C:\o3de-install
    ```

1. Use the `o3de` script in the `scripts` subdirectory to create a new project. The `create-project` command, used with the `project-path` and no other options, creates a new project using the default project template.

    ```cmd
    scripts\o3de.bat create-project --project-path C:\o3de-projects\MyProject
    ```

1. Register the engine to the project. This adds your new project to the list of known projects in the O3DE manifest, located at `<USER_DIRECTORY>/.o3de/o3de_manifest.json`. It also enables O3DE **Project Manager** to be aware of your project. Note that the full (absolute) path to the project is always needed for this command.

    ```cmd
    scripts\o3de.bat register --project-path C:\o3de-projects\MyProject
    ```

## Create a Visual Studio project

Use CMake to create the Visual Studio project for your O3DE project.

1. Create the Visual Studio project in your new project directory. Supply the build directory, the Visual Studio generator, the path to the packages directory, and any other project options. Paths can be absolute or relative.

    ```cmd
    cd C:\o3de-projects\MyProject
    cmake -B build/windows_vs2019 -G "Visual Studio 16" -DLY_3RDPARTY_PATH=C:\o3de-packages -DLY_UNITY_BUILD=ON
    ```

    {{< caution >}}
Do not use trailing slashes when specifying the path to the packages directory.
    {{< /caution >}}

## Build the O3DE project

Use CMake to build the Visual Studio project in the build directory of your O3DE project.

1. Build the project launcher using the solution you created in the `build/windows_vs2019` directory. The `profile` build configuration is shown in this example.

    ```cmd
    cmake --build build/windows_vs2019 --target MyProject.GameLauncher --config profile -- /m
    ```

    {{< note >}}
The `/m` is a recommended build tool optimization, which tells the Microsoft compiler (MSVC) to use multiple threads during compilation to speed up build times.
    {{< /note >}}

1. If you're using an installed O3DE engine (or engine SDK), the project should build within minutes. In this example, when the build is complete, the project binaries can be found under `build/windows_vs2019/bin/profile` in the project directory.

1. Run the O3DE Editor to verify the project is ready to use.

    The project path can be absolute or relative. If relative, it must be relative to the _engine_ directory. This example uses `C:\o3de-install` as the engine build directory. Your build directory might be different.

    ```cmd
    C:\o3de-install\bin\Windows\profile\Editor.exe --project-path C:\o3de-projects\MyProject
    ```

    {{< important >}}
If you built the engine from source using the INSTALL target, make sure you launch the Editor and other tools from the **install** directory, _not_ the build directory in the engine root. For example, the Windows install directory will typically end in `/bin/Windows/profile`.
    {{< /important >}}

    If you don't supply the project path when you run the Editor from the command line, the O3DE **Project Manager** will launch. Using the Project Manager's GUI, you can edit your project's settings, add or remove Gems from the project, and launch the Editor.

For more information about project configuration and building, refer to the [Project Configuration](/docs/user-guide/project-config) and [Build](/docs/user-guide/build) sections of the User Guide.
