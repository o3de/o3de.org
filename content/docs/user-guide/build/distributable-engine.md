---
title: Create Distributable Open 3D Engine Builds
linktitle: Engine and Project Distribution
description: Learn the process for building a full bundle of libraries and executables that you can distribute to internal teams to use your customized version of Open 3D Engine (O3DE).
weight: 200
---

Often, project developers are working on teams where engineers and others will be modifying the core **Open 3D Engine (O3DE)** code for internal needs. In these cases you need a _distributable build_ of the customized O3DE and project (also known as a "pre-built SDK engine"), so that your team can all collaborate using the same technical stack that's provided in-house.

This topic guides you through the creation of an engine build to distribute internally as part of project development, which can be used by a project-dedicated team while keeping the engine-dedicated team's work separated and independent.

The steps outlined in this section are appropriate for build engineers to set up continuous integration (CI) systems which create and distribute new builds on a regular basis, or for developers who need to make regular one-off builds for smaller teams.

## Prerequisites

The prerequisites required for creating a distributable build are:

* O3DE source code.
* A location to host the distributable build, such as source control.

## Example values

These instructions use the following example paths:

* O3DE source path: `C:\o3de-source`
* Project directory: `W:\MyProject`

These instructions use the following example CMake cache values:

* `LY_VERSION_ENGINE_NAME`: "MyO3DE"

{{< note >}}
This example uses the Visual Studio generators and Windows `cmd` syntax for command-line instructions. For Linux users, change your CMake generator to `Ninja Multi-Config`, use a different build directory for CMake, and modify CLI syntax accordingly. Make sure that distributable engines on Linux systems are hosted on an `ext*`-format filesystem for performance reasons.

For multi-platform projects where project teams will be working from a distributable build, each distributable build should be placed in a distinct directory set through `CMAKE_INSTALL_PREFIX`.
{{< /note >}}

## Overview

Creating a distributable build for project developers while keeping core engine developers in a separate path involves the following major steps:

1. Building a local O3DE SDK with the `install` target
1. Configuring your project to use the local SDK for builds
1. Building the project
1. Creating the distributable build of the engine
1. Providing the distributable build to project developers

The exact process involved in the last step varies depending on your in-house development practices, although we recommend using source control with good blob support for your build distribution. For teams using open source solutions we recommend [git LFS](https://git-lfs.github.com/).

When creating a new distributable build of the O3DE core tools, each step should be performed _every_ time a new build is created, to ensure that any changes to the engine which affect engine or project configuration are correctly picked up.

## Create a local SDK

The first step in creating a distributable build is generating local binaries from your engine source, used to build your project and create the final distributable engine build.

### Build the `INSTALL` target

Perform the following steps from the O3DE source directory (`C:\o3de-source` in this example):

1.  Generate the toolchain project files using a unique `LY_VERSION_ENGINE_NAME` CMake cache setting. This value is the name of the engine used by **Project Manager** and the O3DE registration system. Giving the install layout a different engine name than the source engine enables the engines to be registered side-by-side.

    ```cmd
    cmake -B build/windows -G "Visual Studio 16" --config profile -DLY_VERSION_ENGINE_NAME="MyO3DE"
    ```

    Other cache variables to consider setting on this line (using the `-D` option) include:

    * `LY_3RDPARTY_PATH` : The path to a custom downloadable package directory, also known as the "third-party path". Do not use trailing slashes when specifying the path to the packages directory.
    * `CMAKE_INSTALL_PREFIX`: The parent directory of the `bin` directory containing the distributable binaries. You will find the Project Manager, Editor, and other binaries in the subdirectory `bin\Windows\profile\Default`. If you don't specify this option, the engine SDK binaries will be built to `<ENGINE_SOURCE>\install\bin\Windows\profile\Default`.

    {{< note >}}
Use `Visual Studio 16` as the generator for Visual Studio 2019, and `Visual Studio 17` for Visual Studio 2022. For a complete list of common generators for each supported platform, refer to [Configuring projects](../configure-and-build/#configuring-projects).
    {{< /note >}}

    The **profile** configuration is recommended for distributed builds, as it provides additional logging and engine introspection capabilities useful during project development at minimal performance cost. **debug** builds are primarily useful during engine development.

1.  Build the `INSTALL` target.

    ```cmd
    cmake --build build/windows --target INSTALL --config profile
    ```

    The binaries will be placed into a distributable install directory specified by the `CMAKE_INSTALL_PREFIX` CMake cache variable, or in an `install` subdirectory of the source code by default.

Run the following step from the distributable install directory:

1. Install the version of Python and modules required by the engine.
   
   ```cmd
   python\get_python.bat
   ```

### Register the engine

The next step in creating a distributable build of the engine tools is to register the locally installed engine. You must re-run this registration step any time you make a change to `LY_VERSION_ENGINE_NAME`.

Register the engine locally with the `o3de` script. Run the following command from your distributable install directory:
    
```cmd
scripts\o3de.bat register --this-engine
```

{{< note >}}
If there is a conflict in the existing `o3de_manifest.json` file on the system, the engine registration will fail and the `o3de` output provides information on how to fix the error. We recommend either automating this process through a script (for teams with rapid iteration requiring new builds) or using unique engine names for each new distributable (for teams requiring stability, rollback to previous builds outside of source control, or with infrequent distributable updates).
{{< /note >}}

At this point, the installed engine build is now registered in the O3DE config directory (by default `%USERPROFILE%\.o3de`) in the `o3de_manifest.json` file.

## Project association

At this point, you're ready to either create a new project for distribution or re-associate an existing project with the install build that will be used to create the distributable.

### Create a new project

Run the following command from the distributable install directory:
   
```cmd
scripts\o3de.bat create-project -pp W:\MyProject
```

### Update an existing project

If you have an existing project to update rather than creating a new one, the user performing project updates is responsible for making sure that any changes are available in any remote resource such as source control as well, since at minimum the `project.json` is modified during an engine association update.

Use the `o3de` script to re-register your project with the install build. This will be used to create the distributable build for your project.
   
```cmd
scripts\o3de.bat register -pp W:\MyProject
```

The `engine` field of the `project.json` file will now be the name of the engine that was set as `LY_ENGINE_VERSION_NAME` during configuration.

## Perform a project build

Whether you have created a new project or updated an existing one, in order to create your final distributable build, you need to build the project and the final engine binaries to check into source control. 

From your project directory, configure and build the project.
    
```cmd
cmake -B build/windows -S .
cmake --build build/windows --config profile
```

## (Optional) Create and load an initial level

To help creative teams who will be using the tools (but not building them), we recommend creating an initial level for them to load as a first step in working with the project.

1. Launch your local build of the editor with the project loaded. 
    
    ```cmd
    C:\o3de\bin\Windows\profile\Default\Editor.exe --project-path W:\MyProject
    ```
1. After the Asset Processor finishes and the Editor loads, if your project isn't already configured to load a level, you'll see a dialog instructing you to load or create a level. In this example, it's been named "MyLevel".
2. Quit the Editor.
3. Create or modify a registry file for your project at `<project-location>\Registry\autoexec.game.setreg`. For this example, it would be located at `W:\MyProject\Registry\autoexec.game.setreg`.
   
   Add the following to this file:    
    ```
    {
        "O3DE": {
            "Autoexec": {
                "ConsoleCommands": {
                    "LoadLevel": "MyLevel"
                }
            }
        }
    }
    ```

To verify that the level loads when the game is launched, run the project's game launcher:

```cmd
W:\MyProject\build\windows\bin\profile\MyProject.GameLauncher.exe
```

## Create a distributable build

The final step to create the binaries for distribution to project developers is to create the set of install binaries that they can use without building the engine from source. Like you did to create the local binaries for the engine, you'll now create binaries for the project.

From the project directory, run the following steps:

1. Create an install build of the project.
    
    ```cmd
    cmake --build build\windows --config profile --target INSTALL
    ```

    This creates the binaries in an `install` subdirectory of your project. For our example it would be `W:\MyProject\install`.

## Distribute your build

At this point, the created `install` directory is your final set of distributables. It's up to your team to decide where to host the build, but we recommend a source control system that has good blob support.

{{< important >}}
The .gitignore rule automatically adds folders for git to ignore. The `.gitignore` file is located in the project root after project creation. If using another source control system, make sure the following subdirectories of your project are ignored and not checked in:
    
    ```
    \user
    \build
    \Cache
    ```

These files are generated locally during builds, and checking them in may cause issues for developers. Reference the `.gitignore` file in the project root to verify the list of directories and files to ignore.
{{< /important >}}

At this point, you're ready to have your team perform local setup for either engine development or project development.

### Engine development setup

Engine developers will work on O3DE source code and create new distributable builds. To enable their workflows, perform the following steps on their workstations:

1. Get your modified engine source code from its hosted location.
1. Install the Python runtime and modules required by the engine. Run the following command from the directory containing engine source:

    ```cmd
    python\get_python.bat
    ```
1. Register the engine locally. Run the following command from the directory containing engine source:

    ```cmd
    scripts\o3de.bat register --this-engine
    ```
1. Get the project from its hosted location.
1. Register the project with the _local development engine_. Run the following command from the directory containing the engine source:
   
   ```cmd
   scripts\o3de.bat register -pp W:\MyProject
   ```
1. Follow the [project build instructions](https://o3de.org/docs/user-guide/build/) to generate any project-specific builds, such as the launcher.

### Project developer setup

Project developers will work on project-specific source code or use O3DE creative tools to add project content. To enable their workflows, project developers are required to _only_ pull a project from its hosted location.

Whenever working on their project, project developers should launch the tools that were checked in as the distibutable engine build. These tools are located in the project's `install\bin\Windows\profile\Default` subdirectory.

### License file generation

License attribution files (often called the NOTICES file) can be generated during the project development process to properly attribute any code or packages that were imported. To scan project directories for licenses, project developers can run a script located in the engine's `scripts\license_scanner` subdirectory.

In this example, with the engine, project, and `C:\o3de-source\3rdParty` as your downloadable packages folder, run the following script in the engine source folder:
   ```cmd
   python\python.cmd scripts\license_scanner\license_scanner.py ^
     --config-file scripts\license_scanner\scanner_config.json ^
     --license-file-path build\windows_vs2019\NOTICES.txt ^
     --package-file-path build\windows_vs2019\spdx-packages.json ^
     --scan-path C:\o3de-source W:\MyProject C:\o3de-source\3rdParty
   ```
This will scan the engine, project, and `C:\o3de-source\3rdParty` folders for license files using a default configuration in the `scanner_config.json` file, then generate a `NOTICES.txt` in the build output folder. In addition, if a `PackageInfo.json` file is detected in `C:\o3de-source\3rdParty`, the script will scan the file and add a package license manifest for each package to a summary file called `spdx-packages.json`.

{{< note >}}
The scanner script will perform filename scans based on the configuration of the `scanner_config.json` file, but it is not guaranteed to find all license files, nor catch recursive dependencies. To ensure there is sufficient attribution in your project, we recommend tools such as [Scancode Toolkit](https://github.com/nexB/scancode-toolkit) and [Fossology](https://www.fossology.org) to further validate your dependencies.
{{< /note >}}
