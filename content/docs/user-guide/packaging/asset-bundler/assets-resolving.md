---
description: ' Resolve missing assets in your O3DE game project. '
title: Resolving Missing Assets
weight: 200
---

After you build and package your O3DE game, you want to frequently verify that your packages contain every asset they require. For information about verifying your asset bundles, see [Verifying that Bundles Contain Required Assets](/docs/user-guide/packaging/asset-bundler/verifying-bundles/).

When you identify a potential missing asset, you want to include it so that the asset is no longer missing in your next bundled game package.

An asset that is missing from a bundle might be one of the following:
+ **A missing product dependency** - An asset that references another asset, but did not declare it as a product dependency, or the referenced asset was removed during the [asset list comparison process](/docs/user-guide/packaging/asset-bundler/list-operations/).
+ **A hardcoded file load** - Assets loaded by path or by asset ID in C++.
+ **A false positive** - The asset appeared to be missing from a bundle, but is not actually used. For example, you might have an editor-only asset that appears to be missing that is never loaded or used in your game's launcher.

To resolve the missing asset, check each of these possibilities in turn.

## Missing Product Dependencies 

A missing asset might have been loaded as a reference from O3DE or from your game code's interaction with another asset. In these cases, you can resolve the issue by emitting a new product dependency.

### Finding the Asset Reference

To find the source of the asset reference, try the following approaches:
<!-- 
Missing topic. 

+ Use the Asset Processor Batch's [missing dependency scanner](/docs/user-guide/packaging/asset-bundler/verifying-bundles/missing-dependency-scanner/). -->
+ Debug the file load using the following methods:
  + Set breakpoints, if possible
  + Add extra `print` commands
  + Try interacting with your game in different ways to see what triggers the missing asset to load.

As a hint to where to start debugging, note that most file loading routes through [`AzFramework::IO::Archive`](/docs/api/frameworks/azframework/class_a_z_1_1_i_o_1_1_archive.html). Setting breakpoints or adding additional debugging logic \(like `printf` statements\) can help identify what is triggering the asset load that you are investigating.

### Finding the Builder to Update 

Track down the job that generates the asset that references your missing asset. Then you can update the generated asset to emit the missing asset as a product dependency. The source of the generated asset can be obvious if it has a file extension that is associated with a known builder.

If the source of the generated asset is not obvious, you can use the asset database to look up the information.

**To look up a job that generates an asset**

1. In the **Products** table, search for the asset that you want to update to emit a dependency. The following example search for a material uses [DB Browser for SQLite](https://sqlitebrowser.org/) to explore the asset database:
![\[Searching for an asset in the Products table.\]](/images/user-guide/assetbundler/asset-bundler-assets-resolving-1.png)

1. Look up the `JobPK` value in the **Jobs** table, as in the following example:
![\[Looking up a value in the asset database Jobs table.\]](/images/user-guide/assetbundler/asset-bundler-assets-resolving-2.png)

1. Look up the `JobKey` or `BuilderGuid` in your code base.

### Updating the Builder to Emit the Dependency 

After you've identified the builder which emits the product that is missing the dependency, update the builder. For more information, see [Declare Product Dependencies](/docs/user-guide/packaging/asset-bundler/overview/#why-use-product-dependencies).

## Hardcoded File Loads 

To resolve missing assets from hardcoded file loads, find where in code the file is loaded and then choose a resolution strategy.

### Finding the File Load 

We recommend the following techniques for tracking down a hardcoded file load:

1. Using breakpoints in code.

2. Adding additional log messages to the code base.

3. Doing a "find in files" search for strings that refer to the missing asset.

For more information, see [Finding the Asset Reference](#asset-bundler-assets-resolving-finding-the-asset-reference) earlier in this topic.

### Resolving the Missing Asset

To resolve the missing asset from a hardcoded file load, try the following options:
+ **Remove the hardcoded load** - By emitting assets as product dependencies from relevant builders, you can use seed lists with fewer files that are easier to maintain.
+ **Add as seed** - If you can't or don't want to replace the hard-coded asset load, you can add the referenced file as a seed to your game's seed list. Because adding the seed changes only data and doesn't require recompiling your game, this approach can be useful later in development and minimizes code changes. For information about adding the referenced file as a seed to your game's seed list, see the [O3DE Asset Bundler Command-Line Tool Reference](/docs/user-guide/packaging/asset-bundler/command-line-reference.md).
+ **Use the Wildcard Dependency System** - If your project uses relative path loads or wildcard path loads, you can declare the dependencies in a dependencies file. This technique is explained in the following section.

## False Positives

Some assets and asset references are used only in the editor or in launchers during development. These assets aren't used in release builds. Therefore, you can consider any assets that are missing from bundles that aren't used in release builds to be false positives.

### Removing False Positives From Missing Asset Scanning Results

After you've verified that an asset is not used in your release builds, you can use the file tagging system to tag it so that it doesn't appear in future scans. For more information, see [Using the File Tagging System to Include or Exclude Assets](/docs/user-guide/packaging/asset-bundler/file-tagging.md).
