---
description: ' Learn how to create separate asset bundles for a release build with
  multiple game levels in Lumberyard. '
title: Creating Multiple Asset Bundles
---
# Creating Multiple Asset Bundles {#asset-bundler-tutorial-multiple-bundles}


****

|  |
| --- |
| This tutorial is out of date for the new Starter Game project that shipped as part of Lumberyard 1\.25\. We're working to revise it and provide better, more comprehensive instructions\.  |

The [Build and bundle assets for release in Lumberyard](/docs/user-guide/tutorials/packaging/tutorial-release.md) tutorial gets you started with using the asset bundling system to produce a game release\. However, it doesn't represent what most games require\. In this tutorial, you learn the bundling process for a common use case: Games that download additional content after the player launches the game\. The tutorial shows you how to create a release build with multiple game levels in separate asset bundles that have the contents of the base game removed\.

This topic covers the following points:
+ Adding a new level and basic content to the Starter Game project\.
+ Creating multiple asset bundles separated by game level\.
+ Running the new build with and without the additional bundles\.

## Prerequisites {#asset-bundler-tutorial-multiple-bundles-prerequisites}

This tutorial requires completing [Build and bundle assets for release in Lumberyard](/docs/user-guide/tutorials/packaging/tutorial-release.md)\. After finishing that tutorial, you should have:
+ A bundled release of Starter Game located at `%USERPROFILE%\StarterGameRelease`
+ The `startergame_pc.assetlist` and `engine_pc.assetlist` asset list files used to generate the starter game asset bundles\.

It's also useful to be familiar with the [Open 3D Engine Asset List Comparison Operations](/docs/user-guide/features/packaging/asset-bundler/list-operations.md) for this tutorial\.

## Create a second level {#asset-bundler-tutorial-multiple-bundles-create-a-second-level}

 In this section of the tutorial, you'll create a new level for the Starter Game that displays a static scene containing a single entity\.

1. Launch the editor, and create a second level\. Name it **level2**\.
![\[Creating a new level in Lumberyard Editor.\]](/images/user-guide/assetbundler/tutorial-multiple-bundles/01.png)

1. Create a camera\. Right\-click on the viewport and choose **Create camera entity from view**\.
![\[Choose Create camera entity from current view.\]](/images/user-guide/assetbundler/tutorial-multiple-bundles/02.png)

1. Create an object in front of the camera\. To make sure that the object you create is located correctly, you may need to pull the perspective in the viewport back a bit so that you can clearly see the view frustum of the camera and know where the place the object\.

   1. Create a new entity in the level by right\-clicking in the viewport somewhere within the camera frustum, and selecting **Create entity**\.
![\[Right-clicking in the Lumberyard Editor viewport to create a new entity.\]](/images/user-guide/assetbundler/tutorial-multiple-bundles/03.png)

   1. In the Asset Browser view, search for the **am\_rock\_boulder\_01\.cgf** mesh\.
![\[Select the search bar in the Asset Browser view to search for the mesh, and then select the am_rock_boulder_01.cgf result.\]](/images/user-guide/assetbundler/tutorial-multiple-bundles/04.png)

   1. Drag the boulder mesh on to the entity you created\.
![\[Assigning the boulder mesh to an entity with drag-and-drop.\]](/images/user-guide/assetbundler/tutorial-multiple-bundles/05.png)

1. Make sure that the boulder is visible from the camera position by running your game in the editor\. Select **Game** > **Play Game** \(Ctrl\-G\)\. If you can't see the boulder, adjust its position with the editor's **Move** tool and make sure it appears within the camera's view\.

1. Select **File** > **Save** \(Ctrl\-S\) to save the level\.

1. Select **Game** > **Export to Engine** \(Ctrl\-E\) to export the level\.

1. Exit the editor\.

## Generate the new content bundle {#asset-bundler-tutorial-multiple-bundles-generate-bundles}

 In the [Build and bundle assets for release in Lumberyard](/docs/user-guide/tutorials/packaging/tutorial-release.md) tutorial, you created two `.pak` bundles for the game release\. This new level you've created only uses the already\-available assets that are bundled with your game, making it easy to distribute only the content that you need\. One important feature available in Lumberyard Beta v1\.24 and later is the ability to distribute level data as part of its own `.pak`, rather than with the auxiliary game data\.

 This section of the tutorial walks you through creating a new asset list based on the `level2.pak` dependencies, removing duplicate entries that already appear in `startergame_pc.pak`, and bundling the level for distribution\.

##  {#asset-bundler-tutorial-multiple-bundles-generating-new-bundles}

1. Create the seed list and asset list for `level2.pak`:

   ```
   Bin64vc141\AssetBundlerBatch.exe seeds --addSeed levels\level2\level.pak --seedListFile dlc_level2.seed
   Bin64vc141\AssetBundlerBatch.exe assetLists --seedListFile dlc_level2.seed --assetListFile dlc_level2_all.assetlist
   ```

1. Get the *complement* of the assets between `startergame_pc.assetlist` from the previous tutorial and `dlc_level2_all_pc.assetlist`\. This generates a new asset list containing game content exclusive to `level2`\.

   ```
   Bin64vc141\AssetBundlerBatch.exe compare --comparisonType complement ^
       --firstAssetFile startergame_pc.assetlist ^
       --secondAssetFile dlc_level2_all_pc.assetlist ^
       --output dlc_level2.assetlist
   ```
**Important**
 The ordering of `--firstAssetFile` and `--secondAssetFile` here is required\. The compliment comparison works by taking content located in `secondAssetFile` which isn't referenced in `firstAssetFile` - not the other way around\. See [Open 3D Engine Asset List Comparison Operations](/docs/user-guide/features/packaging/asset-bundler/list-operations.md) for all of the details\.

1. Get the *complement* of the assets between `engine_pc.assetlist` from the previous tutorial and l`dlc_level2_pc.assetlist`\. This removes engine\-specific content from the `level2` assets\.

   ```
   Bin64vc141\AssetBundlerBatch.exe compare --comparisonType complement ^
       --firstAssetFile engine_pc.assetlist ^
       --secondAssetFile dlc_level2_pc.assetlist ^
       --output dlc_level2.assetlist ^
       --allowOverwrites
   ```

1. Create the asset bundle for `level2`:

   ```
   Bin64vc141\AssetBundlerBatch.exe bundles --assetListFile dlc_level2_pc.assetlist --outputBundlePath %USERPROFILE%\StarterGameRelease\startergame\dlc_level2.pak
   ```

## Test the new level in release {#asset-bundler-tutorial-multiple-bundles-simulate-downloading-additional-content}

1. Open a console and navigate to the release directory at `%USERPROFILE%\StarterGameRelease`

1. Launch the new map:

   ```
   release\StarterGameLauncher.exe +map level2
   ```

If everything works, you should see a scene similar to the following:

![\[A static level scene displaying a single boulder mesh located in front of the camera.\]](/images/user-guide/assetbundler/tutorial-multiple-bundles/06.png)

## Conclusion {#asset-bundler-tutorial-multiple-bundles-conclusion}

You now have a working example of a release build of a PC game on Lumberyard that uses multiple asset bundles\. These bundles do not contain duplicate files, and you've performed a workflow that matches how a downloadable content system would add new content to an already released game\.

## Next Steps {#asset-bundler-tutorial-multiple-bundles-next-steps}

Learn how to bundle patch updates instead of all\-new content with the next tutorial in this series: [Create content patches with Lumberyard](/docs/user-guide/tutorials/packaging/tutorial-content-patches.md)\.