---
title: "Creating a Project Game Release Layout for Windows"
linktitle: "Project Game Release Layout (Windows)"
description: Learn how to create a proejct game release layout for Windows with Open 3D Engine (O3DE). 
toc: true
---

This tutorial guides you through the process of creating a project game release layout for Windows PCs in **Open 3D Engine (O3DE)**. A *project game release layout* is a directory structure that contains the **Game Launcher** and the packaged assets needed to run the Game Launcher outside of the developer environment. 

*Bundled content* are product assets that're bundled from the project's `Cache/pc` directory into package files (`.pak`). The Game Launcher loads the bundled content that make up a project, such as its levels, objects, environment, and game play logic.

The instructions here guide you through the following steps:
- Set the starting level.
- Process your project's assets.
- Create a project game release layout.
- Run your project's Game Launcher.


## Prerequisites

The following instructions assume that you have:

- Set up O3DE on your computer. For help, refer to [Set up Open 3D Engine](/docs/welcome-guide/setup/).

- Created an O3DE project that contains at least one level. You may need to resolve any errors in your project in order to create a release build.

- Generated a Visual Studio project for your O3DE project. For help, refer to [Create a Visual Studio project](/docs/welcome-guide/create/creating-projects-using-cli/#create-a-visual-studio-project).


This tutorial uses the following project name and directories in the examples.

- Project name and location: `C:\MyProject`
- Third-party directory location: `C:\o3de-packages`


## Set the starting level

Before you create a project game release layout, specify the starting level that the Game Launcher will load first in your settings registry.

1. Create an `autoexec.game.setreg` file in `MyProject/Registry` directory and add the following lines. This sets the starting level by using `Loadlevel` and providing a path to the level. The path must be relative to the `Cache/pc` directory. In this example, the level asset is `mainmenu.spawnable`.


```
{
    "O3DE": {
        "Autoexec": {
            "ConsoleCommands": {
                "LoadLevel": "levels/mainmenu/mainmenu.spawnable"
            }
        }
    }
}
```


## Process assets

The Asset Processor or Asset Processor Batch are responsible for processing source assets into product assets, which the Game Launcher consumes at runtime.

1. Process your project's assets by following either one of the following instructions.
    
    - Use **CMake** to build the Asset Processor Batch and its dependencies by specifying the `MyProject.Assets` target. After building, this command runs Asset Processor Batch and processes the assets.

        ```cmd
        cmake --build build/windows_vs2019 --target MyProject.Assets --config profile -- /m
        ```

    - Run your project's Asset Processor to begin processing the assets.


{{< caution >}} Ensure that the Asset Processor or Asset Processor Batch processes all of your assets without failure. {{< /caution >}}


## Create a project game release layout

You can create a project game release layout by using a non-monolithic or monolithic build. A monolithic release layout only contains files that are necessary to run the project, such as the Game Launcher, bundled content, and a minimal set of dependent `.dll` files, if any. A non-monolithic release layout contains the same files needed to run the project, as well as the objects that you use for development such as tools, shader compilers, and all `.dll` files.  Non-monolithic releases are typically much larger than monolithic releases. On some platforms that don't allow loading shared objects, you must use a monolithic release.

In this step, you will use CMake to build either a monolithic or a non-monolithic project and specify the `INSTALL` target and `release` configuration. This handles several tasks:

- Creates an `install` directory that will contain your release layout.

- Bundles your game content into an `engine.pak` file by packaging all of the product assets in your `Cache/pc` directory.

- Builds the Game Launcher and other supporting files.

{{< note >}}
The Game Launcher may fail to load your assets if the `engine.pak` file is over 4GB. We suggest that you clean up and reprocess your assets to reduce the file size of your bundled content.
{{< /note >}}

### Monolithic project

1. Set up a new CMake build directory, `windows_mono`, for your monolithic build in your project directory. We recommend keeping this build directory separate from your non-monolithic build directory. Specify a monolithic build by enabling the `-D` option, `LY_MONOLITHIC_GAME`.

    ```cmd
    cmake -B build/windows_mono -S. -G "Visual Studio 16" -DLY_3RDPARTY_PATH=C:\o3de-packages -DLY_MONOLITHIC_GAME=1
    ```

2. Run the CMake build configuration in your monolithic build directory. This generates a Game Launcher and packages your project's assets in the `Cache` directory into `engine.pak`.

    ```cmd
    cmake --build build/windows_mono --target INSTALL --config release
    ```

The result is a project release install directory that's located at `install/bin/Windows/release/Monolithic`.


### Non-monolithic projects

1. Run the CMake build configuration in your non-monolithic build directory, `build/windows_vs2019`.

    ```cmd
    cmake --build build/windows_vs2019 --target INSTALL --config release
    ```

The result is a project release install directory that's located at `install/bin/Windows/release/Default`.


## Run the game launcher

Now that you've packaged your assets and built your project game release layout, you are ready to run your project's Game Launcher.

1. Open a command line window and change to your project's release build install directory.

2. Run the Game Launcher. Supply the path to the level that the project starts with. This opens the Game Launcher and loads the starting level.
    
    ```cmd
    ./MyProject.GameLauncher.exe
    ```  

Now you can distribute your project to other Windows devices! They must install 
[Microsoft Visual C++ (MSVC) Redistributable](https://docs.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-160) to run the Game Launcher.