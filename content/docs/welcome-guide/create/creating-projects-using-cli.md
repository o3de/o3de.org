---
linktitle: Creating Projects Using the CLI
title: Creating Projects Using the Command Line Interface
description: Learn how to create and build new Open 3D Engine (O3DE) projects from the default project template using the command line (CLI).
weight: 200
toc: true
---

The tutorial on this page and the video below provide an introduction to project configuration and building in Open 3D Engine (O3DE) using a command line interface (CLI).

The instructions here and in the video guide you through the following steps:

* Create a new O3DE project using the CLI.
* Create Visual Studio project files in your O3DE project directory.
* Build your O3DE project.

At the end of the tutorial you'll have a new O3DE project, based on the default "standard" project template, opened in **O3DE Editor**.

{{< youtube id="SZC13S0YZZs" title="Creating O3DE Projects Using Command Line" >}}

## Prerequisites

The following instructions assume that you have:

* Set up O3DE on your computer. For help, refer to [Set up Open 3D Engine](/docs/welcome-guide/setup).
* Registered an O3DE engine in the O3DE manifest. If you set up O3DE from GitHub, you must manually register the engine. For help, refer to [Register the engine](/docs/welcome-guide/setup/setup-from-github/#register-the-engine).
* Met all hardware and software requirements listed in [O3DE System Requirements](/docs/welcome-guide/requirements).

## Create a new O3DE project

You can create project directories either in the same directory as the O3DE root directory or outside of this directory. This documentation refers to the latter as "external projects".

This tutorial uses the following project name and directories in the examples. (Depending on how you set up O3DE, you might not have all of these directories.)

* O3DE engine source: `C:\o3de`
* Installed O3DE engine (contains pre-built SDK engine binaries): `C:\o3de-install`
* New project name and location: `C:\o3de-projects\MyProject`
* Package directory (created during [set up from GitHub](/docs/welcome-guide/setup/setup-from-github/#build-the-engine)): `C:\o3de-packages`

To start a project based on the standard template, complete the following steps.

1. Open a command line window and change to your O3DE engine directory.

    **Scenario 1:** If you set up your engine as a [source engine](/docs/welcome-guide/setup/setup-from-github/#build-the-engine), use the engine source directory.

    ```cmd
    cd C:\o3de
    ```

    **Scenario 2:** If you installed O3DE or built your engine as a [SDK engine](/docs/welcome-guide/setup/setup-from-github/#build-the-engine) using the `INSTALL` target, use the installed engine directory.

    ```cmd
    cd C:\o3de-install
    ```

1. Use the `o3de` script in the `scripts` subdirectory to create a new external project. The `create-project` command, used with the `project-path` and no other options, creates a new project using the default project template-the **standard** template. This command also registers the engine to the project in the project's `project.json` manifest.

    ```cmd
    scripts\o3de.bat create-project --project-path C:\o3de-projects\MyProject
    ```

    Additionally, this command registers the project, adding it to the list of known projects in the O3DE manifest located in `<USER_DIRECTORY>/.o3de/o3de_manifest.json`, and making **Project Manager** aware of your project.

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

1. Build the project launcher using the solution you created in the project's `build/windows_vs2019` directory. The `profile` build configuration is shown in this example.

    ```cmd
    cmake --build build/windows_vs2019 --target MyProject.GameLauncher Editor --config profile -- /m
    ```

    Note that when building the project for a pre-built SDK engine, even though you are not building **O3DE Editor**, it is still recommended to include `Editor` as a build target. While the GameLauncher doesn't depend on the Editor target, there are some Gems that do. If you leave off the Editor target when building your project, those Gems won't be included in the build.

    When building the project for a source engine, the **Asset Processor** and **Project Manager** are built too, since they are dependencies of **O3DE Editor**.

    The `/m` is a recommended build tool optimization, which tells the Microsoft compiler (MSVC) to use multiple threads during compilation to speed up build times.

1. When the build is complete, the project binaries can be found in the project directory under `build/windows_vs2019/bin/profile`. Run **O3DE Editor** to verify the project is ready to use.

    **Scenario 1:** If you set up your engine as a [source engine](/docs/welcome-guide/setup/setup-from-github/#build-the-engine), the Editor application is in the project build directory.

    ```cmd
    build\windows_vs2019\bin\profile\Editor.exe
    ```

    {{< note >}}
If your project build directory is outside the project path, you must include the project path when launching **O3DE Editor**, using the `--project-path` parameter.
    {{< /note >}}

    **Scenario 2:** If you installed O3DE or built your engine as a [SDK engine](/docs/welcome-guide/setup/setup-from-github/#build-the-engine) using the `INSTALL` target, you must include the project path when launching Editor. If you don't supply the project path when you run the Editor from the command line, **Project Manager** will launch. The project path can be absolute or relative. If relative, it must be relative to the _engine_ directory.

    ```cmd
    C:\o3de-install\bin\Windows\profile\Editor.exe --project-path C:\o3de-projects\MyProject
    ```

    {{< important >}}
If you built the engine from source using the INSTALL target, make sure you launch the Editor and other tools from the **install** directory, _not_ the engine's build directory. The Windows install directory will typically end in `/bin/Windows/profile`.
    {{< /important >}}

    In both scenarios, you can also run **Project Manager** (`o3de.exe`) from the same directory to edit your project's settings, add or remove Gems from the project, rebuild your project, and launch the Editor.

For more information about project configuration and building, refer to the [Project Configuration](/docs/user-guide/project-config) and [Build](/docs/user-guide/build) sections of the User Guide.
