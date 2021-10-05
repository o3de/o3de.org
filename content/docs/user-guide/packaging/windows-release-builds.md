---
title: "Building a Windows Release"
linktitle: "Windows Release"
description: Learn how to package and build your project for release with Open 3D Engine (O3DE) on Windows. 
toc: true
---

This tutorial guides you through the process of packaging and building an **Open 3D Engine (O3DE)** project for release on Windows. A *release build* of your project is a standalone application that you can distribute. It uses packaged assets to load all of the contents that make up a project, such as its code, shaders, levels, and other assets.

The instructions here guide you through the following steps:
- Process your project's assets.
- Create a release build for your project.
- Run your project's Game Launcher.

## Prerequisites

The following instructions assume that you have:

- Set up O3DE on your computer. For help, refer to [Set up Open 3D Engine](\docs\welcome-guide\setup\_index.md).

- An O3DE project that's ready to release. You may need to resolve any errors in your project in order to create a release build.

- A Visual Studio project for your O3DE project. For help, refer to [Create a Visual Studio project](/docs/welcome-guide/create/creating-projects-using-cli/#create-a-visual-studio-project).

This tutorial uses the following project name and directory in the examples.

- Project name and location: `C:\MyProject`


## Process project assets

The **Asset Processor** or **Asset Processor Batch** (CLI) processes your project's asset files and stores them in the cache. A build release requires all of the assets in the cache to be packaged in `.pak` files. You must process all of your project's assets before you build a release.

1. Process assets. Depending on if you already have the Asset Processor or not, follow either of the following steps:
   - **If you have the Asset Processor**: You may already have the Asset Processor if you built your project for development by using the Editor target. Run the Asset Processer and wait for it to process all of your assets.

   - **If you don't have the Asset Processor**: You can build the Asset Processor and its dependencies by specifying the `MyProject.Assets` target. After building, this command runs **Asset Processor Batch** and processes the assets. 


        ```cmd
        cmake --build build/windows_vs2019 --target MyProject.Assets --config profile -- /m
        ```

{{< caution >}} Ensure that the Asset Processor processes all of your assets without failure. {{< /caution >}}

## Build a release

You can build a release for a non-monolithic or monolithic project. A non-monolithic project contains supporting files used for development. A monolithic project only includes files needed to run the project.

You will use CMake to build either a monolithic or a non-monolithic project and specify the `INSTALL` target and `release` configuration.

### Monolithic projects

Create a project release install layout for a monolithic project, which contains the Game Launcher, third-party `.dll` files, and `engine.pak`.

1. Set up a new CMake build directory, `windows_mono`, for your monolithic build in your project folder. We recommend keeping this build directory separate from your non-monolithic build directory. Specify a monolithic build by enabling the `-D` option, `LY_MONOLITHIC_GAME`.

    ```cmd
    cmake -B build/windows_mono -S. -G "Visual Studio 16" -DLY_3RDPARTY_PATH=C:\o3de-packages -DLY_MONOLITHIC_GAME=1
    ```

2. Run the CMake build configuration on your monolithic build. This generates a Game Launcher and packages your project's assets in the `Cache` folder into `engine.pak`.

    ```cmd
    cmake --build build/windows_mono --target INSTALL --config release
    ```

The result is an installation folder that contains the Game Launcher, `.dll` files, `engine.json`, `project.json`, `and engine.pak`. The release build install folder's location and layout looks like the following:

    <project>/install/bin/windows/release/monolithic
    ├───Cache
    │   └───pc
    │       └───engine.pak
    ├───eventlogger
    ├───user
    │   ├───Cache
    │   └───log
    ├───DevTestProject.GameLauncher.exe    
    ├───engine.json
    ├───project.json
    ├───PhysXDevice64.dll
    └───PhysXGpu_64.dll



### Non-monolithic projects

Create a project release install layout with the Game Launcher, engine-built `.dll` files, third-party `.dll` files, and `engine.pak`.

1. Run the CMake build configuration in your build directory, `build/windows_vs2019`. This generates a Game Launcher, copies `.dll` files, and packages your project's assets in the `Cache` folder into `engine.pak`.

    ```cmd
    cmake --build build/windows_mono --target INSTALL --config release
    ```

## Test the game launcher

Now that you've packaged your assets and built your project for release, you are ready to test your project's Game Launcher by using the command line interface.

1. Open a command line window and change to your project's release build install directory.

2. Run the standalone project's game launcher. Supply the path to the level that the project starts with.

    ```cmd
    ./MyProject.GameLauncher.exe +loadlevel levels/level/MainLevel.spawnable
    ```

Now you are able to run a build release of your O3DE project and distribute it!