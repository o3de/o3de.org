---
description:  Bundle assets and release your Open 3D Engine project. 
title: Build and bundle assets for release in O3DE
---

{{< preview-migrated >}}

 This tutorial guides you through the process of building the code and assets to release a O3DE project, using the [Starter Game sample project](/docs/userguide/samples/levels/starter-game.md). You'll learn how to:
+ Create a release build of your game's executable.
+ Set up the directory structure of a release build.
+ Compile shaders and generate shader paks.
+ Compile auxiliary data, like configuration information and gem assets.
+ Create bundled content using the asset bundling system.
+ Run a stand-alone release build for your project.

## Prerequisites {#asset-bundler-tutorial-release-prerequisites}

To complete the procedures in this tutorial, you need the following:

+ Visual Studio 2019 installed and configured to develop with C\+\+\. [Download Visual Studio from Microsoft](https://visualstudio.microsoft.com/downloads/)\.
+ \(Recommended\) Some familiarity with the [Asset Bundler concepts and terminology](/docs/user-guide/packaging/asset-bundler/concepts.md)\. This tutorial uses seed lists and asset lists to generate bundles\.

## Configure and Generate Build Files {#asset-bundler-tutorial-release-create-project}

1. If this is your first time building O3DE, create a directory for your generated IDE projects and build.
   ```cmd
   mkdir windows_vs2019
   ```

1. Configure CMake with the Starter Game enabled as a project, and generate the build files for your host toolchain.
   ```cmd
   cmake -B windows_vs2019 -S . -G "Visual Studio 16 2019" ^
     -DLY_PROJECTS=StarterGame
   ```

   {{< important >}}
   If this is your first time building O3DE, you'll also need to pass the location of your third-party libraries directory. Add
   the `-DLY_3RDPARTY_PATH` argument with this directory as a value. See the [build documentation](/docs/user-guide/build) for more
   tips on your first build.
   {{< /important >}}

## Create a release build {#asset-bundler-tutorial-release-create-release}

1. Build StarterGame in release mode.
   ```cmd
   cmake --build windows_vs2019 --config release --target StarterGame -- /m
   ```

## Create a directory structure for the game release {#asset-bundler-tutorial-release-build-directory}

1. Open a command prompt and navigate to the O3DE install root directory.

1. Create a directory for your game release. The following command creates the release directory `C:\Users\username\StarterGameRelease`:

   ```
   mkdir %USERPROFILE%\StarterGameRelease
   ```
**Note**
 You can create this directory anywhere you want, but the rest of this tutorial assumes the release directory is in this location. It's not recommended that you create this directory anywhere inside of your O3DE install. If you do, detecting missing assets and diagnosing bundle problems becomes more difficult.

1. Create a subdirectory that will contain the game binaries and libraries:

   ```
   mkdir %USERPROFILE%\StarterGameRelease\release
   ```

1. Copy the contents of the release build into the `StarterGameRelease\release` directory:

   ```
   xcopy /s build_vs2019\bin\release %USERPROFILE%\StarterGameRelease
   ```
**Note**
 Release builds include some metadata like debug symbols in a `.pdb` file. When releasing your game, make sure to delete any compiler metadata that's copied over that isn't needed for launching or running your game.

1. Create a subdirectory that will contain the game data:

   ```
   mkdir %USERPROFILE%\StarterGameRelease\startergame
   ```

   The remaining steps in this tutorial show how to build and copy your game data to this directory.

## Export level data {#asset-bundler-tutorial-release-export-level}

1. Open the O3DE Editor and load the Starter Game level by selecting **File** > **Open Level** \(Ctrl+O\) and selecting the **SinglePlayer** level.

1. Select **Game** > **Play Game** \(Ctrl+G\) from the Editor's main menu to enter Game mode. Roam through the level to load the shader assets. Make sure that you view as much of the level as possible, in order to load them all.

   You can also load shaders by flying the camera through the editor's viewport, but make sure that you load shaders around the player's starting area. Otherwise, running the standalone game executable will show a black screen.

1. Select **Game** > **Export to Engine** \(Ctrl+E\) from the Editor's main menu to export the level data to a `.pak`.

## Generate shaders and auxiliary data {#asset-bundler-tutorial-release-build-shaders}

1. Open a command prompt and navigate to `lumberyard_dir\dev\Tools\CrySCompileServer\x64\profile`.

1. Start the shader compiler. **Don't close the command prompt.**

   ```
   CrySCompileServer.exe
   ```

1. Open a second command prompt and navigate to the O3DE install root directory.

1. Compile and package the shaders:

   ```
   lmbr_pak_shaders.bat StarterGame D3D11 pc
   ```

   After building the shaders, close the command prompt window where `CrySCompileServer.exe` is running.

1. Copy the shader `.pak` files generated by the compiler into the game data folder:

   ```
   copy build\pc\StarterGame\* %USERPROFILE%\StarterGameRelease\startergame
   ```

1. Generate the game's auxiliary data:

   ```
   Tools\Python\python3 BuildReleaseAuxiliaryContent.py --platforms pc --buildFolder Bin64vc142
   ```

   The auxiliary data includes configuration information for the engine and game loading and level data.

1. Copy the auxiliary data to the release directory:

   ```
   xcopy /s startergame_pc_paks %USERPROFILE%\StarterGameRelease
   ```

## Generate game asset bundles {#asset-bundler-tutorial-release-generate-bundles}

1. Open a command prompt and navigate to the O3DE install root directory.

1. Bundle assets needed by the game engine:

   ```
   Bin64vc142\AssetBundlerBatch.exe assetLists --addDefaultSeedListFiles --assetListFile engine.assetlist
   Bin64vc142\AssetBundlerBatch.exe bundles --assetListFile engine_pc.assetlist --outputBundlePath %USERPROFILE%\StarterGameRelease\startergame\engine.pak
   ```

   This generates the `engine_pc.pak` file in your release folder. The engine pak contains the assets required by the engine and gems.

1. Bundle game content and level assets:

   ```
   Bin64vc142\AssetBundlerBatch.exe assetLists ^
        --addSeed Levels\Game\SinglePlayer\level.pak ^
        --addSeed project.json ^
        --addSeed gems.json ^
        --addSeed scripts/ai/navigation.xml ^
        --assetListFile startergame.assetlist
   Bin64vc142\AssetBundlerBatch.exe bundles --assetListFile startergame_pc.assetlist --outputBundlePath %USERPROFILE%\StarterGameRelease\startergame\startergame.pak
   ```

   This generates the `startergame_pc.pak` file in your release folder.
**Important**
`--addSeed` takes a path relative to your project folder \(for source assets\) or the asset cache \(for product assets\). For Starter Game, project source assets are located in `lumberyard_dir\dev\StarterGame`. Don't use absolute paths or paths relative to the current directory when adding a seed.

## Run your packaged release {#asset-bundler-tutorial-release-update-release}

1. Open a command prompt and navigate to your packaged release at `%USERPROFILE%\StarterGameRelease`.

1. Run the launcher executable for your game and load the map:

   ```
   release\StarterGameLauncher.exe +map singleplayer
   ```

If your content bundles are correct, the starter game will load and be playable. Use **Alt+F4** to exit the game.

If objects are displayed but textures are missing, it probably means you forgot to export the level before packaging assets or didn't add the `level.pak` file as a seed. You could also be missing some shaders - run through the level and build the shader package again.

If the test isn't successful, common issues may occur. For example, error messages may display, the launcher may shut down, or a black screen displays. For more information about troubleshooting common issues, see [Resolving Missing Assets](/docs/user-guide/packaging/asset-bundler/assets-resolving.md) and [Compiling Shaders for Release Builds](/docs/userguide/assets/shader-compilation.md).

**Note**
When you run the release build, it creates a `User` subdirectory under your release build directory. Be sure to delete this directory before shipping the release build.

## Next Steps {#asset-bundler-tutorial-release-next-steps}

Now that you've learned the basics of bundling assets for release, go on to further reading:
+ Learn about how bundles are mounted, so that you can load content dynamically. See [Creating Multiple Asset Bundles](/docs/user-guide/tutorials/packaging/tutorial-multiple-bundles.md).
+ Explore the asset bundler functionality. See [O3DE Asset Bundler Command-Line Tool Reference](/docs/user-guide/packaging/asset-bundler/command-line-reference.md).
+ Learn how to scan for missing dependencies in your bundles. See [Using the Missing Dependency Scanner](/docs/user-guide/packaging/asset-bundler/missing-dependency-scanner.md)
+ To ask questions about the Asset Bundler and get support, see [the Open 3D Engine forums](https://forums.awsgametech.com/).
