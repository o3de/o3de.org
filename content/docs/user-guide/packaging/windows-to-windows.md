---
title: "Packaging and release"
description: Learn how to package and build your project for release with Open 3D Engine (O3DE) on Windows. 
toc: true
---

The tutorial on this page guides you through the manual process of packaging and building an **Open 3D Engine (O3DE)** project for release on Windows platforms. A *release build* of your project is a standalone application that you can distribute. It uses packaged assets to load all of the contents that make up a project, such as its code, shaders, levels, and other assets.

The instructions here guide you through the following steps:
- Create a release build for your O3DE project.
- Package your O3DE project's assets into PAK files.
- Set up the installation folder that will contain your standalone O3DE project.
- Run your standalone O3DE project.


## Prerequisites

The following instructions assume that you have:
- Set up O3DE on your computer. For help, refer to [Set up Open 3D Engine](\docs\welcome-guide\setup\_index.md).
- Created a Visual Studio project for your O3DE project. For help, refer to the [Create Visual Studio project](/docs/welcome-guide/create/creating-projects-using-cli/#create-a-visual-studio-project) section of the Creating Projects using CLI guide.
- An O3DE project that's ready to release. You may need to resolve any errors in your project in order to create a release build.


## Create a release build for your O3DE project

This tutorial uses the following project name and directories in the examples.

- Project name and location: `C:\MyProject`
- Standalone project name and location: `C:\MyProject_install`

Use **CMake** to build the Visual Studio project for release. 

You must supply the path to your project's build directory and the `release` option. This builds your project's Game Launcher. 

1. Build the project launcher using the Visual Studio solution in the project's `build/windows_vs2019` directory. Specify the `release` build configuration to build the project for release. 
   
```cmd
cmake --build build\windows_vs2019  --config release --target MyProject.GameLauncher -- \m
```

You can find your project's game launcher, `MyProject.GameLauncher.exe`, and other release build binary files in `C:\MyProject\build\windows_vs2019\bin\release`.


## Package assets

An O3DE project release build requires packaged assets in order to launch and load properly. Packaged assets are stored in PAK (`.pak`) files. 

There are two PAK files that your project release build needs to run: 
- `engine.pak`: Contains assets that're needed to start the 3D engine, including other drivers such as the file engine and configuration. Your project game launcher loads engine assets first.
- `pc.pak`: Contains all assets that're needed by your project, such as those in `engine.pak` as well as levels, mesh, shaders, and more.

To manually package assets, add the assets that you want to package into a compressed ZIP file and rename the file with a `.pak` extension. The instructions below guide you through manually packaging assets.

1. Navigate to the directory `C:\MyProject\Cache\pc`, which contains the assets that you need to pack.


### Package engine assets into `engine.pak`

1. Create a compressed ZIP file that contains the following directories and all of the files that're located at the root of the `pc` directory.
   - config\
   - fonts\
   - passes\
   - shader\
   - shaderlib\
   - shaderresourcegroups\
   - shaders\
   - textures\
   - .\
  
2. Rename the compressed file to `engine.pak`.


### Package all assets into `pc.pak`

1. Create a compressed ZIP file that contains all of the directories and files that're located at the root of the `pc` directory.

2. Rename the compressed file to `pc.pak`.


## Prepare installation folder

The installation folder is a container for the release build and all of its assets, that you can then distribute independently. It contains the binary files for the project's release build, the PAK files, and the bootstrap file.

1. Create an installation folder anywhere in your computer: `C:\MyProject_install`.

2. Set up the required subfolders in your installation folder. The installation folder must have the following layout: 
   
    ```
    C:\MyProject_install\   
    +---cache
    |   +---pc
    |
    +---bin     
        +---Registry
        
    ```

3. Add the release build binaries by copying `MyProject.GameLauncher.exe` and all of the `.dll` files from the folder `C:\MyProject\build\windows\bin\release\` to the folder `C:\MyProject_install\bin\`.

4. Add the release build registry files by copying all of the files from the folder `C:\MyProject\build\windows\bin\release\Registry\` to the folder `C:\MyProject_install\bin\Registry\`.

5. Add the PAK files by copying the files you created earlier, `engine.pak` and `pc.pak`, to `C:\MyProject_install\cache\pc`.

6. Add the bootstrap file by copying `bootstrap.game.release.windows.setreg` from `C:\MyProject\Cache\pc` to `C:\MyProject_install\cache\pc`. 

{{< note >}} The file `bootstrap.game.release.windows.setreg` is also in the PAK file `pc.pak`, but you must copy it again because the game launcher looks for it as a loose file. {{< /note >}}

After setting up, your installation folder should look like this: 

- `C:\MyProject_install\`  
    ![`C:\MyProject_install\`](\images\user-guide\packaging\file-structure-1.png)

- `C:\MyProject_install\bin`  
    ![`C:\MyProject_install\bin`](\images\user-guide\packaging\file-structure-3.png)

- `C:\MyProject_install\cache\pc`  
    ![`C:\MyProject_install\cache\pc`](\images\user-guide\packaging\file-structure-2.png)


## Test the game launcher

Now that you've built your project for release, packaged your assets, and setup an installation folder, you are ready to test your O3DE project's game launcher by using the command line interface.

1. Open a command line window and change to the standalone project's installation folder.

    ```cmd
    cd C:\MyProject_install
    ```

2. Run the standalone project's game launcher. Supply the path to the level that the project starts with, the path to the cached project

    ```cmd
    bin\MyProject.GameLauncher.exe +loadlevel levels\level\MainLevel.spawnable --project-path cache --project-cache-path cache --engine-path cache
    ```

    Now you are able to run your O3DE project as a standalone application and distribute it!