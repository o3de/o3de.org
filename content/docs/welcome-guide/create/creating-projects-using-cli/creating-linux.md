---
title: Creating Projects on Linux
description: Learn how to use the command line interface (CLI) on Linux to create and build new Open 3D Engine (O3DE) projects from the default project template.
weight: 200
toc: true
---

Use the instructions in this tutorial to create an O3DE project for the Linux host platform. You can create project directories either in the same directory as the O3DE root directory or outside of this directory. This documentation refers to the latter as "external projects".

## Prerequisites

The following instructions assume that you have:

* Met all hardware and software requirements listed in [O3DE System Requirements](/docs/welcome-guide/requirements).
* Set up O3DE on your computer. For help, refer to [Set up Open 3D Engine](/docs/welcome-guide/setup).
* Registered the O3DE engine in the O3DE manifest. If you set up O3DE from GitHub, you must manually register the engine. For help, refer to [Register the engine](/docs/welcome-guide/setup/setup-from-github/building-linux/#register-the-engine).

This tutorial uses the following project name and directories in the examples. Depending on how you set up O3DE, you might not have all of these directories, or you might have used different directory names.

| Directory | Description |
| --- | --- |
| `o3de` | O3DE engine source. |
| `o3de-install` | Installed O3DE engine, containing pre-built SDK engine binaries. |
| `o3de-projects/MyProject` | New project name and location. |
| `o3de-packages` | Package directory, created earlier during [setup](/docs/welcome-guide/setup/setup-from-github/building-linux/#build-the-engine). |

## Create a new O3DE project

To start a project based on the standard template, complete the following steps.

1. Open a terminal window and change to your O3DE engine directory by doing one of the following:

    * If you set up your engine as a [source engine](/docs/welcome-guide/setup/setup-from-github/building-linux/#build-the-engine), use the engine source directory. Example:

        ```shell
        cd $HOME/o3de
        ```

    * If you installed O3DE or built your engine as an [SDK engine](/docs/welcome-guide/setup/setup-from-github/building-linux/#build-the-engine) using the `INSTALL` target, use the installed engine directory. Example:

        ```shell
        cd $HOME/o3de-install
        ```

1. To create a new external project, use the `o3de` script in the `scripts` subdirectory. The `create-project` command, used with the `project-path` and no other options, creates a new project using the **standard** template (the default project template).

    ```shell
    scripts/o3de.sh create-project --project-path $HOME/o3de-projects/MyProject
    ```

    When creating a project, this command also makes two important registrations:

    * It associates your project with an engine by registering the engine in the project's `project.json` manifest, using the engine's registered name. You can find this manifest in the project's root directory. The registration for an engine named "o3de" looks like the following example:

        ```json
        "engine": "o3de",
        ```

        {{< note >}}
If you change the engine's registered name, or wish to use a different engine with the project, you will need to update this manifest entry.
        {{< /note >}}

    * It registers the project in the O3DE manifest, adding it to the list of known projects, and making **Project Manager** aware of your project. The O3DE manifest is located in `$HOME/.o3de/o3de_manifest.json`. The registration for a project located in `/home/username/o3de-projects/MyProject` looks like the following example:

        ```json
        "projects": [
            "/home/username/o3de-projects/MyProject"
        ],
        ```

        {{< note >}}
If you move the project, you will need to update this manifest entry.
        {{< /note >}}

## Create a Linux build project

Use **CMake** to create the Linux build project for your O3DE project.

1. Create the Linux build project in your new project directory. Supply the build directory, the Ninja Multi-Config generator, the path to the packages directory, and any other project options. Paths can be absolute or relative.

    ```shell
    cd $HOME/o3de-projects/MyProject
    cmake -B build/linux -S . -G "Ninja Multi-Config" -DLY_3RDPARTY_PATH=$HOME/o3de-packages
    ```

    {{< note >}}
CMake [unity builds](https://cmake.org/cmake/help/latest/prop_tgt/UNITY_BUILD.html) are on by default. This is a CMake feature that can greatly improve build times by merging source files into single compilation units. If you encounter a build error, disabling unity builds might help debug the problem. To disable unity builds, run the previous `cmake` command with the `-DLY_UNITY_BUILD=OFF` argument to regenerate your project files.
    {{< /note >}}

    {{< caution >}}
Do not use trailing slashes when specifying the path to the packages directory.
    {{< /caution >}}

## Build the O3DE project

Use CMake to build the Linux build project in the build directory of your O3DE project.

1. Build the project launcher using the solution that you created in the project's `build/linux` directory. The following example shows the `profile` build configuration.

    ```shell
    cmake --build build/linux --target MyProject.GameLauncher Editor --config profile -j <number of parallel build tasks>
    ```

    {{< important >}}
When building the project for a pre-built SDK engine, even though you aren't building **O3DE Editor**, we still highly recommend including `Editor` as a build target. While the GameLauncher doesn't depend on the Editor target, some Gems do. If you leave off the Editor target, those Gems aren't included in the build.
    {{< /important >}}

    When building the project for a source engine, you build the **Asset Processor** and Project Manager too, since they are dependencies of O3DE Editor.

    The `-j` is a recommended build tool optimization. It tells the Ninja build tool the number of parallel build tasks that will be executed simultaneously. The value for 'number of parallel build tasks' is recommended to match the number of cores available on the Linux host machine.

    Example:

    ```shell
    cmake --build build/linux --target MyProject.GameLauncher Editor --config profile -j 8
    ```

1. When the build is complete, you can find the project binaries in the project directory under `build/linux/bin/profile`. To verify that the project is ready to use, run O3DE Editor by doing one of the following:

    * If you set up your engine as a [source engine](/docs/welcome-guide/setup/setup-from-github/building-linux/#build-the-engine), run the Editor from the project build directory.

        ```shell
        build/linux/bin/profile/Editor
        ```

        {{< note >}}
If your project build directory is outside the project path, you must include the project path (using the `--project-path` parameter) when launching O3DE Editor.
        {{< /note >}}

    * If you installed O3DE or built your engine as an [SDK engine](/docs/welcome-guide/setup/setup-from-github/building-linux/#build-the-engine) using the `INSTALL` target, run the Editor from the installed engine's build directory. (If you don't supply the project path, **Project Manager** launches instead.) The project path can be absolute or relative to the engine directory.

        ```shell
        $HOME/o3de-install/bin/Linux/profile/Default/Editor --project-path $HOME/o3de-projects/MyProject
        ```

        {{< important >}}
If you built the engine from source using the `INSTALL` target, make sure that you launch the Editor _and_ other tools from the installed engine's build directory, _not_ the engine's build directory. The Linux install directory typically ends in `/bin/Linux/profile/Default`.
        {{< /important >}}

You can also run Project Manager (`o3de`) from the same directory to edit your project's settings, add or remove Gems from the project, rebuild your project, and launch the Editor.

{{< caution >}}
When you launch the Editor, the **Asset Processor** from the same directory will also launch.  To launch the Editor from a different directory, you must close any **Asset Processor** tasks that are running.
{{< /caution >}}

For more information about project configuration and building, refer to the [Project Configuration](/docs/user-guide/project-config) and [Build](/docs/user-guide/build) sections of the user guide.
