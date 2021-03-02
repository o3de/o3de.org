---
description: ' Create asset bundles that can be distributed to patch and update a
  live O3DE game, while also making a new distribution for later downloads. '
title: Create content patches with O3DE
---
# Create content patches with O3DE {#asset-bundler-tutorial-content-patches}


****

|  |
| --- |
| This tutorial is out of date for the new Starter Game project that shipped as part of O3DE 1\.25\. We're working to revise it and provide better, more comprehensive instructions\.  |

This tutorial demonstrates a bundling process designed to simulate a patch update to existing content\. In this tutorial, you create a set of bundles that simulates a content patch\. These bundles include the patch itself, and a new version of the software to distribute with the patch already in place\. The update bundle contains only content that changed since the first set of bundles was created\. This topic covers:
+ Modifying an asset reference to reference a new asset that was not bundled previously\.
+ Creating an updated asset bundle that contains only updated or new assets\.
+ Running the new release build with new bundles\.

## Prerequisites {#asset-bundler-tutorial-content-patches-prerequisites}

To complete this tutorial, you should have completed the [Build and bundle assets for release in O3DE](/docs/user-guide/tutorials/packaging/tutorial-release.md) and [Creating Multiple Asset Bundles](/docs/user-guide/tutorials/packaging/tutorial-multiple-bundles.md) tutorials\. You should have:
+ A bundled release of Starter Game located at `%USERPROFILE%\StarterGameRelease`
+ The `startergame_pc.assetlist` file used to generate the starter game content bundle\.
+ The `dlc_level2.seed` seed list file used to generate the asset list for the level content bundle\.
+ The `dlc_level2_pc.assetlist` file used to generate the additional level content bundle\.

## Add a gem and modify the level {#asset-bundler-tutorial-content-add-gem}

For this tutorial you'll modify the `level2` level created in the previous tutorial\. You'll also be adding a new asset\-only gem to the Starter Game project, to demonstrate how to update auxiliary content in addition to pushing direct changes to a bundle\.

1. Launch the Project Configurator, make sure that the Starter Game is selected, and select **Enable Gems**\.
![\[Selecting the 'Enable Gems' button for the Starter Game in Project Configurator.\]](/images/user-guide/assetbundler/tutorial-content-patches/ui-project-configutator-create-1.25.png)

1. Search for the term *primitive* in the search bar\. The **Primitive Assets** gem should appear in the results list\. Select the checkbox to include it as part of the Starter Game, and then select **Save**\.
![\[Searching for 'primitive', then selecting the 'Primitive Assets' gem, followed by a 'Save' action.\]](/images/user-guide/assetbundler/tutorial-content-patches/02.png)
**Note**
The **Primitive Assets** gem is an asset\-only gem, so you aren't required to recompile any code for your game\. If you were adding a gem with a code component, you would also need to rebuild both the **profile** and **release** portions of your game and distribute the new binaries as part of the patch\. See the [Build and bundle assets for release in O3DE](/docs/user-guide/tutorials/packaging/tutorial-release.md) for build instructions and where the release binaries need to be located\.

1. Open the O3DE Editor and then open `level2` that you created in the [previous tutorial\.](/docs/user-guide/tutorials/packaging/tutorial-multiple-bundles.md)

1. Create a new entity in the level and assign it the `_box_1x1.fbx` mesh\.

   1. Right\-click in the viewport, somewhere within the frustum of the camera, and select **Create entity**\.

   1. Search for `_box_1x1.fbx` in the Asset Browser\.

   1. Drag the `_box_1x1.fbx` mesh onto your newly created entity in the level\.

   If you need a visual refresher on the editor UI for these steps, see [Creating Multiple Asset Bundles](/docs/user-guide/tutorials/packaging/tutorial-multiple-bundles.md)\.

1. Save the level by selecting **File** > **Save** \(Ctrl\-S\) from the main menu\.

1. Export the level by selecting **Game** > **Export to engine** \(Ctrl\-E\) from the main menu\.

1. Close the O3DE Editor\.

## Recreate the project bundles {#asset-bundler-tutorial-content-patches-recreate-bundles}

 In this step you'll version your old asset lists, generate new asset lists based on the changes to the level, and create two content packs: One for distributing to existing versions of the game as a patch, and one for directly downloading the latest version\.

**Note**
 For most game updates, only the content of your game assets will change\. When upgrading to a new version of O3DE and pushing an update, you should regenerate all of the existing content to ensure it's properly updated, including the engine assets and auxiliary content\.

1. Open a console and navigate to the O3DE root directory at `lumberyard_dir\dev`\.

1. Add a version identifier to the existing `dlc_level2_all_pc.assetlist` asset list:

   ```
   move dlc_level2_all_pc.assetlist dlc_level2_v1_all_pc.assetlist
   ```

1. Generate a new asset list `dlc_level2_v2_all_pc.assetlist` from the `dlc_level2.seed` file:

   ```
   Bin64vc141\AssetBundlerBatch.exe assetLists --seedListFile dlc_level2.seed --assetListFile dlc_level2_v2_all.assetlist
   ```
**Note**
 You don't need to update the `dlc_level2.seed` file here because only the dependences of the level have changed \- nothing about the asset itself that's used as the seed\.

1. Get the *delta* of the assets between the v1 and v2 contents\. Taking a delta gets everything that's changed between the two versions and generates a patch:

   ```
   Bin64vc141\AssetBundlerBatch.exe compare --comparisonType delta ^
       --firstAssetFile dlc_level2_v1_all_pc.assetlist ^
       --secondAssetFile dlc_level2_v2_all_pc.assetlist ^
       --output dlc_level2_v1_to_v2_patch.assetlist
   ```

1. Remove starter game and engine assets from the `dlc_level2_v2_all_pc.assetlist` and generate a new asset list with only the latest required `level2` assets:

   ```
   Bin64vc141\AssetBundlerBatch.exe compare --comparisonType complement ^
       --firstAssetFile startergame_pc.assetlist ^
       --secondAssetFile dlc_level2_v2_all_pc.assetlist ^
       --output dlc_level2_v2.assetlist
   Bin64vc141\AssetBundlerBatch.exe compare --comparisonType complement ^
       --firstAssetFile engine_pc.assetlist ^
       --secondAssetFile dlc_level2_v2_pc.assetlist ^
       --output dlc_level2_v2.assetlist ^
       --allowOverwrites
   ```

1. Create two new bundles, one for the patch and one for the new full distribution:

   ```
   Bin64vc141\AssetBundlerBatch.exe bundles --assetListFile dlc_level2_v1_to_v2_patch.assetlist --outputBundlePath dlc_level2_v1_to_v2_patch.pak
   Bin64vc141\AssetBundlerBatch.exe bundles --assetListFile dlc_level2_v2_pc.assetlist --outputBundlePath dlc_level2_v2.pak
   ```
**Important**
 Don't copy either of these files to the release folder yet\. The next section will cover testing each bundle to make sure that it contains the correct content, and that they load correctly\.

## Simulate user scenarios {#asset-bundler-tutorial-content-patches-simulate-the-user-scenarios}

Now you're ready to simulate two scenarios: users who have v1 of your game but upgrade to v2, and users who download v2 for the first time\.

### Simulate the v1 to v2 patch experience {#asset-bundler-tutorial-content-patches-simulating-the-v1-to-v2-patch-experience}

1. Open a console and navigate to the O3DE root directory\.

1. Copy the content patch to your release:

   ```
   copy dlc_level2_v1_to_v2_patch_pc.pak %USERPROFILE%\StarterGameRelease\startergame
   ```

1. Launch the starter game and check to see if the new 1x1 box appears in the level2 scene\.

   ```
   %USERPROFILE%\StarterGameRelease\release\StarterGameLauncher.exe +map level2
   ```

   If the content patch was applied successfully, you should see a scene similar to the following:
![\[A static scene displaying a boulder and an untextured 1x1 box.\]](/images/user-guide/assetbundler/tutorial-content-patches/03.png)

### Simulate the v2 download experience {#asset-bundler-tutorial-content-patches-simulating-the-v2-download-experience}

1. Delete the content patch and v1 data from your game release:

   ```
   del %USERPROFILE%\StarterGameRelease\startergame\dlc_level2_v1_to_v2_patch_pc.pak
   del %USERPROFILE%\StarterGameRelease\startergame\dlc_level2_pc.pak
   ```

1. Copy the level2 v2 content to the release:

   ```
   copy dlc_level2_v2_pc.pak %USERPROFILE%\StarterGameRelease\startergame
   ```

1. Launch the starter game and check to see if the new 1x1 box appears in the level2 scene\.

   ```
   %USERPROFILE%\StarterGameRelease\release\StarterGameLauncher.exe +map level2
   ```

## Conclusion {#asset-bundler-tutorial-content-patches-conclusion}

You've learned how to generate a content patch to apply to an existing game\. Now you know the general steps for distributing additional content and patches for your O3DE game:
+ Create a complete asset list using your newly created or updated content as a seed\.
+ Take the *complement* of this asset list from the original game assets and engine assets, to get only the assets needed by your new content\.
+ When you patch existing content, take the *delta* of the patch asset list against the asset list for the content you're applying the patch to\.