---
description: ' Use the Asset Validation gem''s seed mode in O3DE to ensure that your
  game assets are properly bundled. '
title: Using the Asset Validation Gem to Verify Seeds
weight: 200
---

After you've built a seed list but before you bundle, you can use the Asset Validation gem to verify that asset loads map back to seeds. The Asset Validation gem adds a set of seed-related commands to the O3DE console command window. You can use these commands to ensure that you have seeds for all assets that you want to bundle.

One of these commands, *seedmode*, makes a seed mode active. When seed mode is active and an asset file loads, O3DE traverses the dependency graph from the newly loaded asset until it finds a seed for the asset. If it doesn't find a seed for the asset, an error message displays. It warns you that the loaded file won't be bundled if you try to bundle using the seeds that you provided for the current validation session.

During development, use seed mode to ensure that as assets get added they're properly bundled and included in the shipping version of the game.

{{< note >}}
If you already have bundles to test, you can use *bundle mode* instead of seed mode. For more information, see [Using Bundle Mode to Test Bundles](/docs/user-guide/packaging/asset-bundler/verifying-bundles/bundle-mode).
{{< /note >}}

## Prerequisites

Enable the Asset Validation Gem in your game project using **Project Manager**.

## Seed Mode Commands

When you use O3DE Editor or the launcher to run your game, the following console commands are available:
+ **seedmode** - Enables or disables the reporting system.
+ **addseedpath** *<Relative cache path to an asset>* - Adds the specified asset and all of its dependencies as a seed to your dependency graph, so they no longer are reported as missing. The `addseedpath` command lets you test which assets should be added to your seed list for packaging.

  **Example**

  ```
  addseedpath levels\startergame\level.pak
  ```
+ **removeseedpath** *<Relative cache path to an asset>* - Removes an asset from the dependency graph.
+ **listknownassets** - Lists all the assets in your current dependency graph.
+ **addseedlist** *<Relative source path to a seed list>* - Adds all the seeds found in the specified seed list to your known dependency graph. Because the path is a source path, it is relative to your project directory.

  **Example**

  ```
  addseedlist Engine\SeedAssetList.seed
  ```
+ **removeseedlist** *<Relative source path to a seed list>* - Removes all the assets in a seed list from your graph.
+ **printblacklisted** - Enables or disables the display of approved assets in the system. Some assets, like shaders, are loaded at runtime and do not appear in your dependency graph. By design, shaders are packaged in their own `.pak` file, are not found in the dependency graph, and do not need to be reported by the system. However, you can use the `printblacklisted` command to force shaders or other approved asset types to be included in the dependency graph.

## Using Seed Mode

The following procedure shows how to use seed mode to troubleshoot a level that has missing assets.

**To test seed mode**

1. In the O3DE console, enter the command `seedmode`. Asset validation begins.

   ```
   seedmode
   [CONSOLE] Executing console command 'seedmode'
   (AssetValidation) - Asset Validation is now on
   ```

1. Enter game mode. In the console, seed mode reports multiple Asset not found in seed graph errors.
![\[Asset not found in seed graph errors in the O3DE console window.\]](/images/user-guide/assetbundler/asset-bundler-asset-validation-gem-1.png)

1. Exit game mode.

1. Enter the `addseedpath` command to add the missing asset file. This example uses the command `addseedpath levels\milestone2\level.pak`.

1. Enter game mode. The Asset not found errors no longer appear.
![\[Using the addseedpath command in the O3DE console window.\]](/images/user-guide/assetbundler/asset-bundler-asset-validation-gem-2.png)

### Handling Missing Asset Errors

If seed mode reports that an asset is missing, the asset might be one of the following:
+ Part of a list that you haven't added to the graph yet.
+ An asset that must be added as a dependency of another asset already found in the level.
+ An asset that must be a seed itself.
