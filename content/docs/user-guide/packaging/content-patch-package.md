---
linkTitle: Content Patch Package
title: Creating a Content Patch Update Package
description: Learn how to create an Open 3D Engine (O3DE) content update patch package for your released project.
toc: true
weight: 300
---

This topic explains the process for creating a content patch update package for your **Open 3D Engine (O3DE)** project with **Asset Bundler**. This includes a patch bundle that contains just the asset updates, and a patched release bundle that contains all the game assets including the asset updates.

## Prerequisites

To follow along, you'll need a project with a release build that has been created through the steps in the previous topic, [Creating a Project Game Release Layout for Windows](windows-release-builds).

## Conventions used in this topic

This topic makes some assumptions about your project for clarity:

* Your project has a seed list file and an asset list for game only assets.
* You are using a source engine build within your project.

The following conventions are used in this topic as substitutions for your own directory and file names:

* Project name and directory: `C:\MyProject`
* Source engine build directory: `C:\MyProject\build\windows\bin\profile`
* Game asset seed list : `game_seed_list.seed`
* Game asset list: `game_v1.assetlist`

## Make asset changes to your project

Make a visual change to your project that simulates a content update. For demonstration purposes, you might add an asset to a level that is easy to spot when you test the update bundle. Save the changes to your level.

## Create an update package

There are four steps to creating an update package:

* Ensure all assets are processed.
* Generate new asset lists based on the changes.
* Create a patched release asset bundle that contains all the game assets and updates.
* Create a patch asset bundle that contains just the game asset updates.

## Process all project assets

For most updates, only the game assets will change. When upgrading to a new version of O3DE and pushing an update, you should regenerate all of the existing content to ensure it's properly updated, including the engine assets and auxiliary content.

To process the assets, run **Asset Processor** or **Asset Processor Batch** by following the steps in the [process assets](./windows-release-builds/#process-assets) section of the Windows release layout topic.

### Create a patched release asset list

Create a new version of the game asset list containing all the assets that are in the original `game_v1.assetlist` as well as the changes you saved to the level. This new asset list serves as the asset list for the patched release, and is used to generate a patch for existing distributions of your project in the next section.

{{< tabs name="Patched release asset list" >}}
{{% tab name="Asset Bundler GUI" %}}

1. Run `AssetBundlerBatch.exe` from the source engine build directory.
1. In the **Seeds** tab, select the `game_seed_list` by checking the box to its left. The seeds in the list appear in the main list view.
1. Choose **Generate Asset Lists** in the upper-right.
1. In the **Generate Asset List Files** dialog, choose **Browse...**.
1. In the new file dialog, enter `game_v2.assetlist` for the name, and choose **Open**.
1. In the **Generate Asset List Files** dialog, choose **pc** from the platform list.
1. Choose **Create New File**.

{{% /tab %}}
{{% tab name="Asset Bundler command" %}}

Alternatively, you can run this command to generate the asset list for a patched release.

```cmd
AssetBundlerBatch.exe assetLists --seedListFile game_seed_list.seed ^
    --assetListFile game_v2.assetlist
```

{{% /tab %}}
{{% /tabs %}}

After a short time, a dialog notifies you that the asset list has been created successfully. You can verify your changes have been added to the new patched release asset list by choosing the **Asset List** tab, selecting `game_v2` from **Asset list files**, and examining the contents in the main list window.

{{< note >}}
You don't need to update the `game_seed_list.seed` file because it already contains a reference to the level you updated. Changes to the level's dependencies are included when the asset list is generated.
{{< /note >}}

### Create a patch asset list

The patch asset list is applied to an existing distribution and only contains new and updated assets. To create a patch, you need to compare the v2 list against the v1 list and save the delta to a new asset list.

{{< tabs name="Patch asset list" >}}
{{% tab name="Asset Bundler GUI" %}}

9. In Asset Bundler, choose the **Rules** tab.
10. Choose **Create new Rules file**.
11. In the file dialog, enter `generate_v1_to_v2_patch.rules` for the file name, and choose **Open**.
12. Select `generate_v1_to_v2_patch` from the **Rules** list.
13. Choose **Add Step** from the **Comparison Steps** list.
14. Enter a name for the new step such as `Generate V1 to V2 Delta`.
15. Set the **Comparison Type** to `Delta`.
16. Choose **Browse...** under **Input A** and select the `game_v1.assetlist`.
17. Choose **Browse...** under **Input B** and select the `game_v2.assetlist`.
18. Choose **Run Selected Rule**.
19. In the **Run Rule** dialog, choose **Browse...**.
20. In the new file dialog, enter `game_v1_to_v2_patch.assetlist` for the name, and choose **Open**.
21. In the **Generate Asset List Files** dialog, choose **pc** from the platform list.
22. Choose **Create New File**.

{{% /tab %}}
{{% tab name="Asset Bundler command" %}}

Alternatively, you can run this command to generate the patch asset list.

```cmd
AssetBundlerBatch.exe compare --comparisonType delta ^
    --firstAssetFile game_v1.assetlist ^
    --secondAssetFile game_v2.assetlist ^
    --output game_v1_to_v2_patch.assetlist
```

{{% /tab %}}
{{% /tabs %}}

After a short time, a dialog notifies you that the asset list has been created successfully. You can verify that the patch asset list contains only the new changes by choosing the **Asset List** tab, selecting `game_v1_to_v2_patch` from **Asset list files**, and examining the contents in the main list window.

### Create asset bundles

Now you must create asset bundles (.pak files) for the new asset lists.

{{< tabs name="Create asset bundles" >}}
{{% tab name="Asset Bundler GUI" %}}

To generate the patched release asset bundle, do the following:

23. In the **Asset Lists** tab, select the `game_v2` asset list.
24. Choose **Generate Bundle**.
25. In the **Generate Bundles** dialog, choose **Browse...**.
26. In the file dialog, enter `game_v2.pak` for the file name and choose **Open**.
27. Choose **Generate Bundles**.

To generate the patch asset bundle, do the following:

28. In the **Asset Lists** tab, select the `game_v1_to_v2_patch` asset list.
29. Choose **Generate Bundle**.
30. In the **Generate Bundles** dialog, choose **Browse...**.
31. In the file dialog, enter `game_v1_to_v2_patch.pak` for the file name and choose **Open**.
32. Choose **Generate Bundles**.

{{% /tab %}}
{{% tab name="Asset Bundler command" %}}

Alternatively, you you can run these commands to generate bundles from the asset lists.

Use the following command to generate the patched release bundle containing all the game assets:

```cmd
AssetBundlerBatch.exe bundles --assetListFile game_v2.assetlist ^
    --outputBundlePath game_v2.pak
```

Use the following command to generate the patch bundle containing only the changed assets:

```cmd
AssetBundlerBatch.exe bundles --assetListFile game_v1_to_v2_patch.assetlist ^
    --outputBundlePath game_v1_to_v2_patch.pak
```

{{% /tab %}}
{{% /tabs %}}

In the next section, you'll test the new bundles with your project's release build.

## Test the asset bundles

You can test the asset bundles by simulating two user scenarios.

Because your release build currently has the original v1 asset bundle, start by testing the scenario where a user has your project installed and applies the patch asset bundle containing just the updated assets. Copy the patch asset bundle to your release asset directory.

```cmd
copy C:\MyProject\AssetBundling\Bundles\game_v1_to_v2_patch.pak ^
    C:\MyProject\install\bin\Windows\release\Monolithic\Cache\pc\
```

Launch the release build and check that your updates appear in the level.

```cmd
C:\MyProject\install\bin\Windows\release\Monolithic\MyProject.GameLauncher.exe
```

If the content patch was applied successfully, you'll see your updated content in the level.

Now you can simulate a user downloading a new release with the content patch already applied.

Delete the patch asset bundle and the v1 asset bundle from your game release:

```cmd
del C:\MyProject\install\bin\Windows\release\Monolithic\Cache\pc\game_v1_to_v2_patch.pak
del C:\MyProject\install\bin\Windows\release\Monolithic\Cache\pc\game_v1.pak
```

Copy the v2 asset bundle to the release:

```cmd
copy C:\MyProject\AssetBundling\Bundles\game_v2.pak ^
    C:\MyProject\install\bin\Windows\release\Monolithic\Cache\pc\
```

Relaunch the release build and check that your updates appear in the level:

```cmd
C:\MyProject\install\bin\Windows\release\Monolithic\MyProject.GameLauncher.exe
```

## Conclusion

You've learned how to generate a content patch to apply to an existing release. You can use these steps to create any number of updates through various releases of your project.