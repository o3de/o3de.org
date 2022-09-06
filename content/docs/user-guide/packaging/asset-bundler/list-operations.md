---
description: ' Learn about the comparison operations used in bundling assets with
  Open 3D Engine. '
title: 'Asset List Comparison Operations'
weight: 500
---

Asset list comparisons are rules provided to the `AssetBundlerBatch.exe` tool to determine which files should be included or excluded from the final bundle asset list. The asset list files have the suffix `.assetlist` and contain a flat list of paths and names of asset files. 

{{< note >}}
While the comparison operations use terms from set theory, they are not exactly the same as the actual set operations. This is particularly true of the [delta comparison operation](#asset-list-delta-comparison-operation), which includes a file entry in both sets if one of those files has been modified in the second set. Additionally, file pattern matching is not a set operation.
{{< /note >}}

## Asset List Delta Comparison Operation 

This operation takes two asset list files to create an asset list for a bundle with only the assets that you need to ship in your release bundle. Use this operation to create bundles for incremental updates, such as delta patches for levels. To use this operation, run AssetBundlerBatch.exe with a `--comparisonType` argument value of `0` or `delta`.

To perform a delta comparison operation, open a command prompt, and run the following command:

```
AssetBundlerBatch.exe compare ^
--comparisonType delta ^
--firstAssetFile firstAssetList_pc.assetlist ^
--secondAssetFile secondAssetList_pc.assetlist ^
--output deltaAssetList.assetlist
```

The following diagram shows the delta comparison operation.

![Diagram showing the inputs and results of a delta comparison operation.](/images/user-guide/assetbundler/delta-comparison-operator.png)

## Asset List Union Comparison Operation 

This operation takes two asset list files to create an asset list for a bundle that combines all the assets from both lists. It includes only the modified version of a file in the output asset list, not the original from the first asset list. Use this operation when you have two bundles that no longer need to be separate and should be combined into a single bundle. To use this operation, run AssetBundlerBatch.exe with a `--comparisonType` argument value of `1` or `union`.

To perform a union comparison operation, open a command prompt, and run the following command:

```
AssetBundlerBatch.exe compare ^
--comparisonType union ^
--firstAssetFile firstAssetList_pc.assetlist ^
--secondAssetFile secondAssetList_pc.assetlist ^
--output unionAssetList.assetlist
```

The following diagram shows the union comparison operation.

![Diagram showing the inputs and results of a union comparison operation.](/images/user-guide/assetbundler/union-comparison-operator.png)

## Asset List Intersection Comparison Operation 

This operation takes two asset list files to create a bundle asset list with only items that are in both asset lists. To use this operation, run AssetBundlerBatch.exe with a `--comparisonType` argument value of `2` or `intersection`.

To perform an intersection comparison operation, open a command prompt and run the following command:

```
AssetBundlerBatch.exe compare ^
--comparisonType intersection ^
--firstAssetFile firstAssetList_pc.assetlist ^
--secondAssetFile secondAssetList_pc.assetlist ^
--output intersectionAssetList.assetlist
```

The following diagram shows the intersection comparison operation.

![Diagram showing the inputs and results of a intersection comparison operation.](/images/user-guide/assetbundler/intersection-comparison-operator.png)

## Asset List Intersection Count Comparison Operation 

This operation takes any number of asset files to create a bundle asset list with only items that appear a given number of times across all of the asset lists. This comparison type can't be used as part of a series of comparison rules, and requires the use of the `--intersectionCount` argument. To use this operation, run AssetBundlerBatch.exe with the `--comparisonType` value of `5` or `intersectionCount`.

To perform an intersection count comparison operation, open a command prompt and run the following command:

```
AssetBundlerBatch.exe intersectionCount ^
--comparisonType intersectionCount ^
--intersectionCount 3 ^
--firstAssetFile firstAssetList_pc.assetlist,secondAssetList_pc.assetlist,thirdAssetList_pc.assetlist ^
--output intersectionCountAssetList.assetlist
```

The following diagram shows the intersection comparison operation.

![Diagram showing the inputs and results of a intersection count comparison operation.](/images/user-guide/assetbundler/intersection-comparison-count-operator.png)

## Asset List Complement Comparison Operation 

This operation takes two asset list files to create a bundle asset list with each item in the second asset list that is not in the first list. It works like the delta comparison, except that it does not check the file hash and will not include modified versions of a file that is in both lists. To use this operation, run AssetBundlerBatch.exe with a `--comparisonType` argument value of `3` or `complement`.

To perform a complement comparison operation, open a command prompt, and run the following command:

```
AssetBundlerBatch.exe compare ^
--comparisonType complement ^
--firstAssetFile firstAssetList_pc.assetlist ^
--secondAssetFile secondAssetList_pc.assetlist ^
--output complementAssetList.assetlist
```

The following diagram shows the intersection comparison operation.

![Diagram showing the inputs and results of a intersection comparison operation.](/images/user-guide/assetbundler/complement-comparison-operator.png)

## Asset List File Pattern Operation 

This operation takes an asset list file, and a file pattern to apply. Any files that match this pattern in the asset list will be included in the output asset list. To use this operation, run AssetBundlerBatch.exe with a `--comparisonType` argument value of `4` or `filepattern`.

To perform a file pattern comparison operation, open a command prompt and run the following command:

```
AssetBundlerBatch.exe compare ^
--comparisonType filepattern ^
--filePatternType 0 ^
--filePattern "*.xml" ^
--firstAssetFile assetList_pc.assetlist ^
--output filePatternAssetList.assetlist
```

{{< note >}}
The previous command looks for files that have the `.xml` suffix for inclusion. You can replace it with any wildcard- or regex-based file pattern that you want to use for comparison.
{{< /note >}}

The following diagram shows the file pattern comparison operation.

![Diagram showing the inputs and results of a file pattern comparison operation.](/images/user-guide/assetbundler/file-pattern-operation.png)

## How to Perform Multiple Asset List Comparison Operations 

The following guidance shows the process of creating an asset list for a game patch that only contains modified and updated text \(`.txt`\) file content. During the process, it also validates the asset list contents against an inclusion list generated as the result of an intersection comparison.

The following diagram shows the comparison process and the outputs for this example.

![Diagram that shows the use of multiple comparison rules to include only specific assets in your release bundle.](/images/user-guide/assetbundler/patch-bundle-example.png)

### Prerequisites 

To complete the procedures in this tutorial, make sure that you have the following set up:
+ An installed and configured version of Open 3D Engine.
+ An O3DE project ready to build and compile. 

### Setup 

Create the files that you will use in this tutorial.

1. In your game project's root folder, create these empty files:
   + `FileA.txt`
   + `FileB.txt`
   + `FileC.txt`
   + `FileD.txt`
   + `FileE.cfg`
   + `FileF.cfg`
   + `do-not-add-me.txt`

1. Process the assets on your project by running [Asset Processor](/docs/user-guide/assets/asset-processor/).

### Create asset list files for the comparison operation 

Create the `.seed` and `.assetlist` files to use in your comparisons.

1. Open a command prompt, navigate to the directory where you output the asset list files, and run the following command to create your initial seed list:

   ```
   AssetBundlerBatch.exe seeds ^
   --addSeed FileA.txt,FileB.txt,FileC.txt,FileD.txt,FileE.cfg,FileF.cfg ^
   --seedListFile include-list.seed
   ```

1. Run this command to create your asset list from the seed list:

   ```
   AssetBundlerBatch.exe assetlists ^
   --seedListFile include-list.seed ^
   --assetListFile include-list.assetlist
   ```

1. Run this command to create your v1 seed file:

   ```
   AssetBundlerBatch.exe seeds ^
   --addSeed FileA.txt,FileB.txt ^
   --seedListFile mygame_v1.seed
   ```

1. Run this command to create your v1 asset list file:

   ```
   AssetBundlerBatch.exe assetlists ^
   --seedListFile mygame_v1.seed ^
   --assetListFile mygame_v1.assetlist
   ```

1. Run this command to create your v2 seed file:

   ```
   AssetBundlerBatch.exe seeds ^
   --addSeed FileA.txt,FileB.txt,FileC.txt,fileE.cfg,fileF.cfg,do-not-add-me.txt ^
   --seedListFile mygame_v2.seed
   ```

1. Run this command to create your v2 asset list file:

   ```
   AssetBundlerBatch.exe assetlists ^
   --seedListFile mygame_v2.seed ^
   --assetListFile mygame_v2.assetlist --print
   ```

This last command should produce output that looks like this, enabled by the --print flag:

```
Printing assets for Platform ( pc ):
- filea.txt
- fileb.txt
- filec.txt
- filee.cfg
- filef.cfg
- do-not-add-me.txt
Total number of assets for Platform ( pc ): 6.
```

You have now created the `.seed` and `.assetlist` files that you need to start the comparison operations and assemble a final bundle asset list.

{{< note >}}
At this point, you can choose either one of the next two steps to complete the tutorial. To run each comparison command individually, see the steps in section 1.6.4. To run all of the comparison operations in one command, see the steps in section 1.6.5.
{{< /note >}}

### Run the individual step comparison commands 

1. Open a command prompt and navigate to the directory where you output the asset list files. Run the following command:

   ```
   AssetBundlerBatch.exe compare ^
   --comparisonType delta ^
   --firstAssetFile  mygame_v1_pc.assetlist ^
   --secondAssetFile mygame_v2_pc.assetlist ^
   --output multistep_delta.assetlist ^
   --print
   ```

   In this step the files that are in the v1 asset list, `fileA.txt` and `fileB.txt`, are removed based on `comparisonType 0`, the delta comparison type. Your command output should look like this:

   ```
   Printing assets from the comparison result multistep_delta_pc.assetlist.
   ------------------------------------------
   - filee.cfg
   - do-not-add-me.txt
   - filec.txt
   - filef.cfg
   Total number of assets (4).
   ---------------------------
   Saving results of comparison operation...
   Save successful!
   ```

1. Remove any files from the asset list that aren't in the inclusion list by running this command from the prompt:

   ```
   AssetBundlerBatch.exe compare ^
   --comparisonType intersection ^
   --firstAssetFile include_pc.assetlist ^
   --secondAssetFile multistep_delta_pc.assetlist ^
   --output multistep_include.assetlist ^
   --print
   ```

   For this step, the file `do-not-add-me.txt` is removed because it isn't in the generated inclusion list, based on specified the intersection comparison \(`comparisonType 2`\). Your command output should look like this:

   ```
   Printing assets from the comparison result multistep_include_pc.assetlist.
   ------------------------------------------
   - filec.txt
   - filee.cfg
   - filef.cfg
   Total number of assets (3).
   ---------------------------
   Saving results of comparison operation...
   Save successful!
   ```

1. Run this command to remove anything that is not a text \(`.txt`\) file from the asset list:

   ```
   AssetBundlerBatch.exe compare ^
   --comparisonType filepattern ^
   --filePatternType 0 ^
   --filePattern *.txt ^
   --firstAssetFile multistep_include_pc.assetlist ^
   --output multistep_filepattern.assetlist ^
   --print
   ```

   For this step, the two `.cfg` files are removed because they don't match the file pattern, based on the file pattern comparison \(`comparisonType 4`\). Your command output should look like this:

   ```
   Printing assets from the comparison result multistep_filepattern_pc.assetlist.
   ------------------------------------------
   - filec.txt
   Total number of assets (1).
   ---------------------------
   Saving results of comparison operation...
   Save successful!
   ```

### Run the multiple step comparison command 

You can also perform all of these commands in a single command. The multiple step command is equivalent to running all of the commands in the prior steps individually, and uses variables you specify to store the intermediate results of the comparisons.

In this example, the multiple step comparison command runs the 3 comparisons sequentially, storing the results in variables that are used in the next steps. The delta comparison between v1 and v2 is stored into the `$delta_all` variable, and then runs the intersection comparison on the inclusion list with the asset list `$delta_all`, storing the results in the `$delta_include` variable. Finally, the file pattern comparison is run against all text files stored in the `$delta_include` variable. The output of this final command is stored in the file, `mygame_v1tov2_patch.assetlist`.

To try this approach, open a command prompt, and navigate to the directory where you output the asset list files. Run the following command:

```
AssetBundlerBatch.exe compare ^
--comparisonType delta,intersection,filepattern ^
--filePatternType 0 ^
--filePattern *.txt ^
--firstAssetFile mygame_v1_pc.assetlist,include_pc.assetlist,$delta_include ^
--secondAssetFile mygame_v2_pc.assetlist,$delta_all ^
--output $delta_all,$delta_include,mygame_v1tov2_patch.assetlist ^
--print
```

The command should produce output that looks like this:

```
Printing assets from the comparison result mygame_v1tov2_patch_pc.assetlist.
------------------------------------------
- filec.txt
Total number of assets (1).
---------------------------
Saving results of comparison operation...
Save successful!
```

You can also confirm that the operation was successful by opening `mygame_v1tov2_patch.assetlist` in a text editor and checking that it only contains the files you expect to see.

### How multiple comparisons work 

When running multiple step commands, use a comma-separated list for each relevant parameter. The individual steps in the command match up to their placement in this comma-separated parameter value list.

The previous example uses three comparison operations. The first two comparisons reference a first and second asset list file, and the last comparison references a file pattern and the first asset file. The multiple step command broken down into its component parts looks like this:


**Breaking down the process of a single multiple comparison command**

| Command Parameter | Step 1  | Step 2 | Step 3 |
| --- | --- | --- | --- |
| comparisonType | delta | intersection | filepattern |
| firstAssetFile | mygame\_v1\_pc.assetlist | include\_pc.assetlist (temp file) | $delta\_include |
| secondAssetFile | mygame\_v2\_pc.assetlist | $delta\_all | N/A |
| filePatternType | N/A | N/A | Wildcard (parameter value 0) |
| filePattern | N/A | N/A | \*.txt |
| output | $delta\_all | $delta\_include | mygame\_v1tov2\_patch.assetlist |

Read this table horizontally to see the data supplied to each comparison during each step of the process. Read this table vertically to see the parameter used for each command for each step.
