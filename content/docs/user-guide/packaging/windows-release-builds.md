---
title: "Creating a Project Game Release Layout for Windows"
linktitle: "Project Game Release Layout (Windows)"
description: Learn how to create a project game release layout for Windows with Open 3D Engine (O3DE). 
toc: true
---

This tutorial guides you through the process of creating a project game release layout for Windows PCs in **Open 3D Engine (O3DE)**. A *project game release layout* is a directory structure that contains the **Game Launcher** and the packaged assets needed to run the Game Launcher outside of the developer environment. 

A release build requires *Bundled content*, product assets pulled from the project's `Cache/pc` directory into package files (`.pak`). The Game Launcher loads the bundled content that make up a project, such as its levels, objects, environment, and gameplay logic.

The instructions here guide you through the following steps:
- Set the starting level.
- Process your project's assets.
- Create a project game release layout.
- Run your project's Game Launcher from the release.


## Prerequisites

The following instructions assume that you have:

- Set up O3DE on your computer as either a source engine or pre-built SDK engine. For help, refer to [Set up Open 3D Engine](/docs/welcome-guide/setup/). 

- Created an O3DE project that contains at least one level. You may need to resolve any errors in your project to create a project game release layout.

- Generated a Visual Studio project for either of the following:
  
    - If you are using a source engine, you must generate a Visual Studio project for your project. For help, refer to [Create a Visual Studio project](/docs/welcome-guide/create/creating-projects-using-cli/#create-a-visual-studio-project).
  
    - If you are using a pre-built SDK, you must generate a Visual Studio project for your engine. For help, refer to the **Pre-built SDK engine** tab in [Setup from GitHub](https://o3de.org/docs/welcome-guide/setup/setup-from-github/).

- Registered your project to your engine. For help, refer to 


This tutorial uses the following directories in the examples.

- Project name and directory: `C:/MyProject`
  - Project's profile build directory: `C:/MyProject/build/windows_vs2019/bin/profile`
  - Project's release build directory: `C:/MyProject/build/windows_vs2019/bin/release`

- Third-party directory: `C:/o3de-packages`
- Source engine: `C:/o3de`
- Pre-built SDK engine: `C:/o3de-install`


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

1. Process your project's assets by following either one of the following instructions in your project's profile build directory.
    
    - Use **CMake** to build the Asset Processor Batch and its dependencies by specifying the `MyProject.Assets` target. After building, this command runs Asset Processor Batch and processes the assets.

        ```cmd
        cmake --build build/windows_vs2019 --target MyProject.Assets --config profile -- /m
        ```

    - Launch `AssetProcessor.exe` to begin processing the assets.


{{< caution >}} Ensure that the Asset Processor or Asset Processor Batch processes all of your assets without failure. {{< /caution >}}


## Create a project game release layout

Now that you've prepared your project, you can create a project game release layout. There are different ways you can go about this, depending on how you set up your engine and whether you want to create a non-monolithic or monolithic release build.

When you set up O3DE, you may have built your engine as a *source engine* or a *pre-built SDK engine*. You can use either build type to create a project game release layout. For more information on build types, refer to [Build the engine](https://o3de.org/docs/welcome-guide/setup/setup-from-github/#build-the-engine).

Additionally, you can create a project game release layout that is either *non-monolithic* or *monolithic*. A monolithic release layout only contains files that are necessary to run the project, such as the Game Launcher, bundled content, and a minimal set of dependent `.dll` files, if any. A non-monolithic release layout contains the same files needed to run the project, as well as the objects that you use for development such as tools, shader compilers, and all `.dll` files.  Non-monolithic releases are typically much larger than monolithic releases. On some platforms that don't allow loading shared objects, you must use a monolithic release.

In this step, you will use CMake to build either a monolithic or a non-monolithic project and specify the `INSTALL` target and `release` configuration. This handles several tasks:

- Creates an `install` directory in your project directory that will contain the project's release layout.

- Bundles your game content into an `engine.pak` file by packaging all of the product assets in your `Cache/pc` directory.

- Builds the Game Launcher and other supporting files.

{{< todo >}}
The Game Launcher may fail to load your assets if the `engine.pak` file is over 4 GB. This issue will be resolved when development on the Asset Bundler is stable.
{{< /todo >}}

### Using source engine
 
With the source engine, you must use a project-centric configuration to create a project game release layout. In a project-centric configuration, the CMake source directory is in the project build directory.

The source engine supports non-monolithic projects by default. As listed under [Prerequisites](#prerequisites), you should have already created a Visual Studio project for the engine and registered the engine.

#### Non-monolithic

1. Use CMake to invoke Visual Studio to build your non-monolithic project. Specify the `INSTALL` target and `release` configuration.

    ```cmd
    cd C:/o3de-projects/MyProject
    cmake --build build/windows_vs2019 --target INSTALL --config release. 
    ```

The result is a project release install directory that's located in your project's directory at `install/bin/Windows/release/Default`. Your packaged assets are located in `Cache/pc` in your project release install directory.

#### Monolithic

1. Use CMake to create a Visual Studio project for a monolithic project. Specify a new CMake build directory, `build/windows_mono`, in your project directory to seperate it from your non-monolithic build directory. Specify a monolithic build by enabling the `-D` option, `LY_MONOLITHIC_GAME`.

    ```cmd
    cd C:/o3de-projects/MyProject
    cmake -B build/windows_mono -S. -G "Visual Studio 16" -DLY_3RDPARTY_PATH=C:\o3de-packages -DLY_MONOLITHIC_GAME=1
    ```

2. Use CMake to invoke Visual Studio to build your monolithic project. Specify the `INSTALL` target and `release` configuration. This generates a Game Launcher and packages your project's assets in the `<project>/Cache` directory into `engine.pak`.

    ```cmd
    cd C:/o3de-projects/MyProject
    cmake --build build/windows_mono --target INSTALL --config release
    ```

The result is a project release install directory that's located in your project's directory at `install/bin/Windows/release/Monolithic`. Your packaged assets are located in `Cache/pc` in your project release install directory. 


### Using pre-built SDK engine

With a pre-built SDK engine, you must append non-monolithic or monolithic artifacts to create a project game release layout. 

Verify that your project is registered to the pre-built SDK engine by checking your project's `project.json` file. To register your project use O3DE CLI from your pre-built SDK engine.

    ```cmd
    cd C:/o3de-install
    scripts/o3de.bat register --pp C:/o3de-projects/MyProject
    ```

#### Non-monolithic

The pre-built SDK engine supports non-monolithic projects by default. As listed under [Prerequisites](#prerequisites), you should have already created a Visual Studio project for the engine and registered the engine.

1. In your source engine, use CMake to invoke Visual Studio to append release non-monolithic artifacts to the SDK layout. 

    ```cmd
    cd C:/o3de
    cmake --build build/windows_vs2019 --target INSTALL --config release
    ```

The result is a project release install directory that's located in your project's directory at `install/bin/Windows/release/Default`. Your packaged assets are located in `Cache/pc` in your project release install directory.

#### Monolithic

1. Use CMake to create a Visual Studio project for an engine that supports monolithic projects. Specify a new CMake build directory, `build/windows_mono` in your pre-built SDK engine directory to seperate it from your non-monolithic build directory. Specify a monolithic build by enabling the `-D` option to `LY_MONOLITHIC_GAME`.

    ```cmd
    C:/o3de>cmake -B build/windows_mono -S . -DCMAKE_INSTALL_PREFIX=C:/o3de-install -DLY_VERSION_ENGINE_NAME=o3de-install -DLY_MONOLITHIC_GAME=1 
    ```

2. In your source engine, use CMake to invoke Visual Studio to append release non-monolithic artifacts to the SDK layout. 

    ```cmd
    cd C:/o3de
    cmake --build build/windows_mono --target INSTALL --config release
    ```

3. Use CMake to invoke Visual Studio to build your non-monolothic project using the pre-built SDK engine. 

The result is a project release install directory that's located in your project's directory at `install/bin/Windows/release/Monolithic`. Your packaged assets are located in `Cache/pc` in your project release install directory. 

## Run the game launcher

Now that you've packaged your assets and built your project game release layout, you are ready to run your project's Game Launcher.

1. Open a command line window and change to your project's release build install directory.

    - For monolithic release builds:
        ```cmd
        cd C:/o3de-projects/MyProject/install/bin/Windows/release/Monolithic
        ```

    - For non-monolithic release builds:
        ```cmd
        cd C:/o3de-projects/MyProject/install/bin/Windows/release/Default
        ```

2. Run the Game Launcher. This opens the Game Launcher and loads the starting level.
    
    ```cmd
    ./MyProject.GameLauncher.exe
    ```  
    
Now you can distribute your project to other Windows devices. To run the Game Launcher, [Microsoft Visual C++ (MSVC) Redistributable](https://docs.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-160) must be installed.