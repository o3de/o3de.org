---
linkTitle: Bundling Project Assets for Release
title: Bundling Project Assets for a Project Game Release Layout
description: Learn how to manage your assets and package them into asset bundles in Open 3D Engine (O3DE).
weight: 150
---

This topic is an introduction to using the **Asset Bundler** to bundle assets for a distributable *project game release layout*. Managing project assets into bundles can help reduce the project's size on disk, optimize the project's runtime, and organize the assets to make future asset releases easier. When preparing to distribute your project, use the instructions in this topic to help you create an asset bundle.


## Prerequisites

Build your project with the `release` configuration. This creates a *project game release layout*, which contains the application and files that you can distribute. Learn how to [create a project game release layout for Windows](/docs/user-guide/packaging/windows-release-builds).


## Bundling project assets

This tutorial contains the following steps: 

1. Set up Asset Bundler.
1. Create the game assets bundle.
1. Create the engine assets bundle.
1. Add the bundles to the release layout.


Throughout the steps, replace `<engine>` with either of the following:

- `C:\MyProject` -- For a source engine.
- `C:\o3de-install` -- For a pre-built SDK engine.


### Set up Asset Bundler

To set up and run Asset Bundler, do the following:

1. In your `<engine>` directory, use CMake to invoke Visual Studio to build Asset Bundler.

    ```cmd
    cmake --build build/windows --target AssetBundler --config profile -- -m
    ```

    This command contains the following options:

    - `--target AssetBundler` -- Sets the build target to Asset Bundler and Asset Bundler Batch, and their dependent modules.

    - `--config profile` -- Sets the build configuration to profile, which enables optimization and allows debugging.


1. Run `AssetBundler.exe` from the `<engine>\build\windows\bin\profile` directory. This opens Asset Bundler with a graphical user interface (GUI). (Alternatively, to use the command line interface (CLI), run `AssetBundlerBatch.exe`.)

    Now you should have Asset Bundler open, which looks like this in the GUI:

    {{< image-width "/images/user-guide/packaging/windows-release-build/asset-bundler-default-gui.png" "1000" "An annotated image of O3DE editor's user interface." >}}

<br></br>

{{< known-issue >}}
There may be errors and warnings about "AssetBundler" and "AssetSeedManager" that are listed in the console of Asset Bundler. You can safely ignore them.
{{< /known-issue >}}


### Create a bundle for game assets

The *game asset bundle* contains your project's levels and all of the assets within them, such as objects, environments, materials, and so on. When bundling your game assets, it's only important to bundle assets that your game actually uses in its levels. There's no need to include assets in your project directory that are never loaded in your project. You can use Asset Bundler to generate a list of assets that your levels depend on. This helps ensure that your resulting package file is at an optimal size.


#### Create a new seed asset list

1. In the Asset Bundler GUI, on the **Seeds** tab, in the **Seed List file** panel, click **Create new Seed List file**. For this example, you can name the file `GameSeedList`.

1. Select the `GameSeedList` file from **Seed List files**. This should highlight the whole row, not enable the check box.

1. In the **Product Assets** panel, click **+ Add Asset**, which opens the **Add Seed Asset** dialog.

1. In the list of platforms, select the **pc** check box.

1. Click **Browse...** to open File Explorer, and browse to the `levels` folder.

1. Select your level `.spawnable` file and press **Open**.

1. In the **Add Seed Asset** dialog, click **Add Seed**.

1. In the Asset Bundler GUI, in the **Product Assets** panel, verify that your seed list has the level assets.

1. Select the checkbox for your new seed list file and select **Save** in the main **File** menu.

#### Generate an asset list

1. In the Asset Bundler GUI, select the checkbox for your new seed list file from the list.

1. Click **Generate Asset Lists**, which opens the **Generate Asset List Files** dialog.

1. In the list of platforms, select the **pc** check box.

1. Click **Browse...**, which opens File Explorer.

1. In File Explorer, enter a name for your asset list, and then click **Save**. For this example, use the name `game.assetlist`.

1. Press **Create New File** in the **Generate Asset List Files** dialog.

1. In the Asset Bundler GUI, navigate to the **Asset Lists** tab to verify the assets in `game.assetlist`. The assets are listed in the **Asset List** panel.

#### Bundle your assets

1. In the Asset Bundler GUI, on the **Asset Lists** tab, in the **Asset List Files** panel, select your asset list (`game.assetlist`).

1. Click **Generate Bundle**, which opens the **Generate Bundles** dialog. 

1. Select an Output Bundle Name by clicking the **Browse...** button next to the Output Bundle Name field, which opens File Explorer. You can leave the other default options as is.

1. In File Explorer, enter a name for your package file, and then click **Open**. For this example, use the name `game.pak`.

1. Leave the other default options as is and click **Generate Bundles**.

For Windows, when Asset Bundler saves your bundle, it appends `_pc` to the bundle's name. So you should now have an asset bundle, `game_pc.pak`.


### Create a bundle for engine assets

Next, create a bundle for your project's engine assets. The *engine asset bundle* contains essential files needed to load and run the Game Launcher.

#### Generate an asset list from default seed lists

1. In the Asset Bundler GUI, navigate to the **Seeds** tab.

1. At the bottom of the **Seed List files** panel, select the **Default Seed Lists** check box. Make sure to deselect the `GameSeedList` file if it's selected from an earlier step. 

1. Click **Generate Asset Lists**, which opens the **Generate Asset List files** dialog.

1. In the list of platforms, select the **pc** check box.

1. Click **Browse...**, which opens File Explorer.

1. In File Explorer, enter a name for your asset list, and then click **Save**. For this example, we'll use the name `engine.assetlist`.

1. In the Asset Bundler GUI, navigate to the **Asset Lists** tab to verify the assets in `engine.assetlist`. The assets are listed in the **Asset List** panel.

#### Bundle your assets

1. In the Asset Bundler GUI, on the **Asset Lists** tab, in the **Asset List Files** panel, select the `engine.assetlist` file.

1. Click **Generate Bundle**, which opens the **Generate Bundles** dialog.

1. Select an Output Bundle Name by clicking the **Browse...** button next to the Output Bundle Name field, which opens File Explorer. 

1. In File Explorer, enter a name for your package file, and then click **Open**. For this example, use the name `engine.pak`.

1. Leave the other default options as is and click **Generate Bundles**.

For Windows, when Asset Bundler saves your bundle, it appends `_pc` to the bundle's name. So you should now have an asset bundle, `engine_pc.pak`. You can view your bundle under the **Completed Bundles list**.


### Add bundles to the project game release layout

Next, add your `game_pc.pak` and `engine_pc.pak` files to your project game release layout, so that the Game Launcher can load assets from those bundles.

1. Navigate to the `<install>\bin\Windows\release\<build>\Cache\pc` directory, which contains the bundled content in your project game release layout directory. For example, the default path could be:

   - `C:\MyProject\install\bin\Windows\release\Default\Cache\pc` -- For non-monolithic builds.
   
   - `C:\MyProject\install\bin\Windows\release\Monolithic\Cache\pc` -- For monolithic builds.

2. You may need to remove the `engine.pak` file that's automatically created when you create a project game release layout. You don't need it anymore because you created new bundles.

3. Add your new bundles, `game_pc.pak` and `engine_pc.pak`, to this directory.

Now you can run your project's Game Launcher and it will use your new bundles! 


## Final notes

In this tutorial, you learned how to bundle your projects assets, which is recommended for release builds as it can optimize your project before you distribute it. Managing assets into two bundles (game and engine assets) is one way to do it. In practice, your team may choose to manage your project assets into different sets of bundles.


## Related topics

| Topic | Description |
| - | - |
| [Creating a Project Game Release Layout for Windows](/docs/user-guide/packaging/windows-release-builds) | Learn how to create a project game release layout for Windows. |