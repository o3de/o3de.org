---
linktitle: CLI Reference
title: Asset Bundler Command Line Tool Reference
description: Command reference for the Open 3D Engine Asset Bundler command-line tool, AssetBundlerBatch. This reference covers the available commands, their options, and basic use cases.
weight: 800
---

The Open 3D Engine Asset Bundler is driven by a command-line tool called `AssetBundlerBatch`. This tool manages seed lists, asset lists, comparisons, and asset bundles. The asset bundler is **not** used to compile assets into the format used by the bundler for distribution - that is the role of the Asset Processor. Before running the Asset Bundler, make sure that you:
+  Enable each platform for which assets should be bundled. Enabled platforms are managed by editing the `dev/AssetProcessorPlatformConfig.ini` file in your project.
+ Run the Asset Processor to ensure that assets and their metadata are up to date.

See the [Asset Bundler Concepts and Terms](/docs/user-guide/packaging/asset-bundler/concepts/) or [Glossary](/docs/user-guide/appendix/glossary/) for definitions of terms used in this reference.

## General Use 

 The format for `AssetBundlerBatch` commands is:

```cmd
AssetBundlerBatch command --parameterWithArgs arg1,arg2 --flagParameter ...
```

 The `AssetBundlerBatch` executable is contained in the `dev/Bin64HostPlatform` folder of your project.

The elements in this example invocation break down to:
+  `command` - The command for the asset bundler to run. Examples include `seeds` and `assetLists`.
+  `--parameterWithArgs` - An argument which takes parameters. If a parameter can take more than one argument, you can either separate arguments with a `,` character without using whitespace, or by giving the parameter multiple times:
  + `--parameterWithArgs arg1,arg2`
  + `--parameterWithArgs="arg1,arg2"`
  + `--parameterWithArgs arg1 --parameterWithArgs arg2`
  + `--parameterWithArgs="arg1" --parameterWithArgs="arg2"`

   These styles of writing parameters can be freely mixed and matched. Note that not all arguments take more than one input parameter.
+  `--flagParameter` - A flag which doesn't take any arguments. Flags represent boolean values and turn features of the Asset Bundler on and off.

 An example command is:

{{< tabs name="Command line example-General Use" >}}
{{% tab name="Windows" %}}

```cmd
build\windows\bin\profile\AssetBundlerBatch.exe seeds --seedFileList MyProject\AssetBundling\SeedLists\AllDependencies.seed ^
    --addPlatformToSeeds ^
    --platform ios,pc
```

{{% /tab %}}
{{% tab name="Linux" %}}

```shell
build/linux/bin/profile/AssetBundlerBatch seeds --seedFileList MyProject/AssetBundling/SeedLists/AllDependencies.seed \
    --addPlatformToSeeds \
    --platform ios,linux
```

{{% /tab %}}
{{< /tabs >}}


### Options 

 The options in this section are valid for all Asset Bundler subcommands.

**`--help` / `-h`**

Without a command, prints out the help text for `AssetBundlerBatch`. When used with a command, prints the help information for that command.

**`--verbose`**

Enables more detailed output messages. `Error` and `Warning` messages will display the file name and line number which generated the message. This flag is intended for use when looking at source files or generating output for debugging purposes.

## Seed lists - `seeds`

The `seeds` command is used to manage seed lists, the first phase of the Asset Bundler workflow. Seed list files have the `.seed` extension.

This command requires an existing cache of assets for each provided platform. To make sure that the cache is up to date, update the supported platforms and run the Asset Processor.

### Options

**`--seedListFile`**

The seed list to modify and save. This file must be writable and have the `.seed` extension. The file is created if it doesn't exist. The argument's value may be either an absolute or engine-root-relative path.

* *Type:* Single-value argument
* *Required:* Yes

**`--addSeed`**

Add seeds to the seed list for the `--platform` values. If a seed does not exist for one of the specified platforms, then the invalid platforms are ignored. The argument's value may be any number of cache-relative paths to pre-processed assets.

Although `.slice` files are built and present in the asset cache, they aren't product assets and don't generate dependencies when added to a seed list. Avoid using them as seeds.

* *Type:* Multi-value argument
* *Required:* No

**`--removeSeed`**

Remove the `--platform` values for the provided seeds. If a seed is not available for a platform, it's ignored. A seed is not completely removed from the seed list until it has no associated platforms.

* *Type:* Multi-value argument
* *Required:* No

**`--addPlatformToSeeds`**

Adds the `--platform` values to all seeds in the seed list. If a seed isn't valid for a provided platform, a warning is printed indicating the affected seed and the platform that caused the warning. The seed is updated for all other valid platforms.

* *Type:* Flag
* *Required: No*

**`--removePlatformFromSeeds`**

Removes the `--platform` values from all seeds in the seed list. If this would remove all platforms for an existing seed, the seed is unchanged and a warning is printed. Use `--removeSeed` to remove a seed from a seed list.

* *Type:* Flag
* *Required:* No

**`--print`**

Prints the contents of the seed list after performing operations.

* *Type:* Flag
* *Required:* No

**`--platform`**

The platforms used for this command. Defaults to all supported platforms for the current project. Supported platforms can be changed by modifying `AssetProcessorPlatformConfig.ini`.

Platform names can be found in the `AssetProcessorPlatformConfig.ini` file, or as folder names found under `dev/Cache/ProjectName`.

* *Type:* Multi-value argument
* *Required:* No

**`--updateSeedPath`**

Updates the relative paths for every seed in the seed list.

* *Type:* Flag
* *Required:* No

**`--removeSeedPath`**

Removes the relative path hints for every seed in the seed list. This argument is useful when you want to share your seed list with a third party.

* *Type:* Flag
* *Required:* No

### Examples

In the following examples, assume that the current project has enabled the platforms `pc`, `ios`, and `android`.

**Example : Add seed**

Create the seed list `testFile.seed` if it doesn't exist, and add the `asset1.pak` and `asset2.pak` assets as seeds for the `PC` platform:

{{< tabs name="Command line example-Add seed" >}}
{{% tab name="Windows" %}}

```cmd
build\windows\bin\profile\AssetBundlerBatch.exe seeds --seedListFile testFile.seed ^
    --addSeed cache\asset_path\asset1.pak,cache\asset_path\asset2.pak ^
    --platform pc
```

{{% /tab %}}
{{% tab name="Linux" %}}

```cmd
build/linux/bin/profile/AssetBundlerBatch seeds --seedListFile testFile.seed \
    --addSeed cache/asset_path/asset1.pak,cache/asset_path/asset2.pak \
    --platform linux
```

{{% /tab %}}
{{< /tabs >}}

**Example : Add platforms**

Add the `ios` and `android` platforms for all seeds in the `testFile.seed` seed list:

{{< tabs name="Command line example-Add platforms" >}}
{{% tab name="Windows" %}}

```cmd
build\windows\bin\profile\AssetBundlerBatch.exe seeds --seedListFile testFile.seed --addPlatformToSeeds --platform ios,android
```

{{% /tab %}}
{{% tab name="Linux" %}}

```cmd
build/linux/bin/profile/AssetBundlerBatch seeds --seedListFile testFile.seed --addPlatformToSeeds --platform ios,android
```

{{% /tab %}}
{{< /tabs >}}

**Example : Display seed list contents**

Show the contents of the `testFile.seed` file, including the absolute and relative paths of all assets used as seeds:

{{< tabs name="Command line example-Display seed list contents" >}}
{{% tab name="Windows" %}}

```cmd
build\windows\bin\profile\AssetBundlerBatch.exe seeds --seedListFile testFile.seed --print
```

{{% /tab %}}
{{% tab name="Linux" %}}

```cmd
build/linux/bin/profile/AssetBundlerBatch seeds --seedListFile testFile.seed --print
```

{{% /tab %}}
{{< /tabs >}}

## Asset Lists - `assetLists` 

The `assetLists` command is used to manage and create asset lists. See the `--assetListFile` argument for how platform information is encoded in asset list file names. Asset list files have the `.assetlist` extension.

This command requires an existing cache of assets for each provided platform. To make sure that the cache is up to date, update the supported platforms and run the Asset Processor.

### Options

**`--assetListFile`**

The base name of the platform-specific asset list files to be generated. This file's path must be writable, and the file name must have the `.assetlist` extension. The argument's value may be either an absolute or engine-root-relative path.

The asset list files generated are named based on the value of this argument and the provided platforms. For an argument value of `path/assetFile.assetlist`, each platform gets an asset file created as `path/assetFile_Platform.assetlist`. For example, `assetFile.assetlist` for the platform `pc` is named `assetFile_pc.assetlist`.

`assetLists` invocations must contain either the `--assetListFile` argument or `--print` flag.

* *Type:* Single-value argument
* *Required:* No

**`--seedListFile`**

The seed list used to generate the asset list. This argument can be used along with other arguments that provide seeds.

* *Type:* Single-value argument
* *Required:* No

**`--addSeed`**

Individual seeds used to generate the asset list. This argument can be used along with other arguments that provide seeds.

Although `.slice` files are built and present in the asset cache, they aren't product assets and don't generate dependencies when used as seeds. Avoid using them as seeds.

* *Type:* Multi-value argument
* *Required:* No

**`--addDefaultSeedListFiles`**

Automatically include the default seed lists for the O3DE Engine, default project, and all enabled Gems. As project-relative paths, the files that define default assets are:
+  **Engine** - `Engine/Engine_Dependencies.xml`
+  **Gems** - `Gems/gem_name/Assets/gem_name_Dependencies.xml`
+  **Project** - `project_name/project_name_Dependencies.xml`

By default, the project dependencies includes pre-loaded particle libraries and game-wide audio, excluding level-specific audio.

This argument can be used along with other arguments that provide seeds.

* *Type:* Flag
* *Required:* No

**`--skip`**

A list of assets to ignore. This can include both seed assets and any dependencies that were picked up by the asset processor. The argument value is a comma-separated list of cache-relative paths to assets that have already been pre-processed.

* *Type:* Multi-value argument
* *Required:* No

**`--platform`**

The platforms used for this command. Defaults to all supported platforms for the current project. Supported platforms can be changed by modifying `AssetProcessorPlatformConfig.ini`.

Enabled platform names can be found in the `AssetProcessorPlatformConfig.ini` file, or as directories under `dev/Cache/ProjectName`.

* *Type:* Multi-value argument
* *Required:* No

**`--print`**

 Output a list of all product dependencies. The behavior of this argument depends on which other arguments are provided to the `AssetBundlerBatch argumentList` command:
+ `--assetListFile` without operations: Read an existing asset list from disk and display its contents.
+ `--assetListFile` with operations: Generate a new asset list and display its contents.
+ Without `--assetListFile`: Display the contents of the asset list that would be generated.

Each of these behaviors is illustrated in the [assetList examples](#asset-bundler-command-line-reference-assetlists-examples).

`AssetBundlerBatch assetLists` commands must contain either the `--assetListFile` argument to generate new asset lists, or the `--print` flag to write information to the console.

* *Type:* Flag
* *Required:* No

**`--dryRun`**

 Run without generating new asset lists.

* *Type:* Flag
* *Required:* No

**`--generateDebugFile`**

Generate a file that contains additional information about asset inclusion for debugging purposes. This file contains a hierarchical list of every asset contained within the asset list file, as well as information about which seeds marked each specific asset as a product dependency. The debug file is stored in the same path as the `--assetListFile`, with the extension `.assetlistdebug`.

This argument requires the use of `--assetListFile`. If you use the `--print` argument, the output of the generated files is displayed in the console, not the output of the debug file.

* *Type:* Flag
* *Required:* No

**`--allowOverwrites`**

Allow overwriting of existing asset files. By default, existing asset lists will not be regenerated.

* *Type:* Flag
* *Required:* No

### Examples 

In the following examples, assume that the seed list `testFile.seed` exists and that the `pc`, `ios`, and `android` platforms are enabled.

**Example : Display default assets**

Display which asset lists would be generated from the seed lists for the O3DE Engine and enabled Gems for a project's default platforms:

{{< tabs name="Command line example-Display default assets" >}}
{{% tab name="Windows" %}}

```cmd
build\windows\bin\profile\AssetBundlerBatch.exe assetLists --addDefaultSeedListFiles --print
```

{{% /tab %}}
{{% tab name="Linux" %}}

```cmd
build/linux/bin/profile/AssetBundlerBatch assetLists --addDefaultSeedListFiles --print
```

{{% /tab %}}
{{< /tabs >}}

**Example : Display asset lists for default platforms**

Use an input asset list and the project's default platforms to display that asset list's contents:

{{< tabs name="Command line example-Display asset lists for default platforms" >}}
{{% tab name="Windows" %}}

```cmd
build\windows\bin\profile\AssetBundlerBatch.exe assetLists --assetListFile assetListFile.assetlist --print
```

{{% /tab %}}
{{% tab name="Linux" %}}

```cmd
build/linux/bin/profile/AssetBundlerBatch assetLists --assetListFile assetListFile.assetlist --print
```

{{% /tab %}}
{{< /tabs >}}

**Example : Create an asset list and debug file from a seed list**

Generate an asset list `testList_pc.assetlist` and debug information `testList_pc.assetlistdebug` from the `testFile.seed` seed list:

{{< tabs name="Command line example-Create an asset list and debug file from a seed list" >}}
{{% tab name="Windows" %}}

```cmd
build\windows\bin\profile\AssetBundlerBatch.exe assetLists --assetListFile testList.assetlist ^
    --seedListFile testFile.seed ^
    --platform pc ^
    --generateDebugFile
```

{{% /tab %}}
{{% tab name="Linux" %}}

```cmd
build/linux/bin/profile/AssetBundlerBatch assetLists --assetListFile testList.assetlist \
    --seedListFile testFile.seed \
    --platform linux \
    --generateDebugFile
```

{{% /tab %}}
{{< /tabs >}}

**Example : Display asset list contents for a platform**

Display the contents of the `testList_pc.assetlist` file:

{{< tabs name="Command line example-Display asset list contents for a platform" >}}
{{% tab name="Windows" %}}

```cmd
build\windows\bin\profile\AssetBundlerBatch.exe assetLists --assetListFile testList.assetlist --platform pc --print
```

{{% /tab %}}
{{% tab name="Linux" %}}

```cmd
build/linux/bin/profile/AssetBundlerBatch assetLists --assetListFile testList.assetlist --platform linux --print
```

{{% /tab %}}
{{< /tabs >}}

**Example : Regenerate asset lists from a seed list**

Regenerate all asset lists from the `testFile.seed` seed list, overwriting the `testList_pc.assetlist` file if it exists:

{{< tabs name="Command line example-Regenerate asset lists from a seed list" >}}
{{% tab name="Windows" %}}

```cmd
build\windows\bin\profile\AssetBundlerBatch.exe assetLists --assetListFile testList.assetlist --seedListFile testFile.seed --allowOverwrites
```

{{% /tab %}}
{{% tab name="Linux" %}}

```cmd
build/linux/bin/profile/AssetBundlerBatch assetLists --assetListFile testList.assetlist --seedListFile testFile.seed --allowOverwrites
```

{{% /tab %}}
{{< /tabs >}}

## Comparison rules - `comparisonRules` 

The `comparisonRules` command is used to generate comparison rules files. Comparison rules files are used as inputs for the [compare](#asset-bundler-command-line-reference-compare) subcommand. Comparison rules files are pre-built descriptions of which operations to perform and in what order. For more information on comparison rules, see [Open 3D Engine Asset List Comparison Operations](/docs/user-guide/packaging/asset-bundler/list-operations/).

### Options 

**`--comparisonRulesFile`**

 The comparison rules file to generate.

* *Type:* Single-value argument
* *Required:* Yes

**`--comparisonType`**

 The comparison types to apply, in the given order. Valid values are:
+ *0* or *delta*: Delta comparison
+ *1* or *union*: Union
+ *2* or *intersection*: Intersection
+ *3* or *complement*: Complement
+ *4* or *filePattern*: FilePattern
+ *5* or *intersectionCount*: IntersectionCount

For more information about how each of these rules operates on input files, see [Open 3D Engine Asset List Comparison Operations](/docs/user-guide/packaging/asset-bundler/list-operations/).

The `intersectionCount` comparison type can't be combined with any other comparison type as part of a rule list.

* *Type:* Multi-value argument
* *Required:* Yes

**`--filePatternType`**

The type of file pattern matching to use on the provided file patterns. Valid values are:
+ *0*: Perform wildcard matching - the `*` character will match any number of characters
+ *1*: Perform regular expression matching

* *Type:* Multi-value argument. The number of parameters for the `--filePatternType` argument must match the number of FilePattern arguments to the `--comparisonType` argument.
* *Required:* No

**`--filePattern`**

The file patterns to use for building the list of files that will be compared by the corresponding `--comparisonType`. The patterns are interpreted according to the corresponding `--filePatternType` parameter.

* *Type:* Multi-value argument. The number of parameters for the `--filePattern` argument must match the number of FilePattern arguments to the `--comparisonType` argument.
* *Required:* No

**`--allowOverwrites`**

Allow overwriting of existing comparison rules files. By default, existing files will not be overwritten.

* *Type:* Flag
* *Required:* No

### Examples 

**Example : Generate a delta and filter for XML files**

 Generate a comparison rules file which produces a delta comparison, and then filters the results to include only XML files:

{{< tabs name="Command line example-Generate a delta and filter for XML files" >}}
{{% tab name="Windows" %}}

```cmd
build\windows\bin\profile\AssetBundlerBatch.exe comparisonRules --comparisonRulesFile deltaFilterXML.rules ^
     --comparisonType delta,filePattern ^
     --filePatternType 0 ^
     --filePattern "*xml"
```

{{% /tab %}}
{{% tab name="Linux" %}}

```cmd
build/linux/bin/profile/AssetBundlerBatch comparisonRules --comparisonRulesFile deltaFilterXML.rules \
     --comparisonType delta,filePattern \
     --filePatternType 0 \
     --filePattern "*xml"
```

{{% /tab %}}
{{< /tabs >}}

## Comparisons - `compare` 

The `compare` command is used to take pairs of asset lists as input, perform a comparison operation, and write the result of the comparison as a new asset list. See [Open 3D Engine Asset List Comparison Operations](/docs/user-guide/packaging/asset-bundler/list-operations/) for details on comparison operations.

### Options 

**`--comparisonRulesFile`**

The comparison rules file to load rules from. Comparisons from the rules file will be performed before any other comparisons given as arguments, and are evaluated in the order that the rules file was created with.

* *Type:* Single-value argument
* *Required:* No

**`--comparisonType`**

The comparison types to apply to the input files. The first `--comparisonType` parameter is applied to the first arguments of `--firstAssetListFile` and `--secondAssetListFile`, the second comparison is applied to the second parameters of those arguments, and so on.

Valid values are:
+ *0* or *delta*: Delta comparison
+ *1* or *union*: Union
+ *2* or *intersection*: Intersection
+ *3* or *complement*: Complement
+ *4* or *filePattern*: FilePattern
+ *5* or *intersectionCount*: IntersectionCount

For more information about how each of these rules operate on input files, see [Open 3D Engine Asset List Comparison Operations](/docs/user-guide/packaging/asset-bundler/list-operations/).

The `intersectionCount` comparison type can't be combined with any other comparison type.

* *Type:* Multi-value argument
* *Required:* Yes

**`--filePatternType`**

The type of file pattern matching to use on the provided file patterns. Valid values for this argument are:
+ *0*: Perform wildcard matching - the `*` character will match any number of characters
+ *1*: Perform regular expression matching

* *Type:* Multi-value argument. The number of parameters for the `--filePatternType` argument must match the number of `FilePattern` comparison arguments to the `--comparisonType` argument.
* *Required:* No

**`--filePattern`**

The file patterns to use for matching asset file paths from inputs. The patterns are interpreted according to the corresponding `--filePatternType` parameter. The first pattern is used with the first occurrence of the `FilePattern` comparison type, the second with the second occurrence, and so on.

* *Type:* Multi-value argument. The number of parameters for the `--filePattern` argument must match the number of `FilePattern` comparison arguments to the `--comparisonType` argument.
* *Required:* No

**`--firstAssetListFile`**

The files to use as the first set of inputs for comparison.

* *Type:* Multi-value argument. The number of parameters for the `--firstAssetListFile` argument must match the number of arguments to the `--comparisonType` argument.
* *Required:* No

**`--secondAssetListFile`**

The files to use as the second set of inputs for comparisons that require a second input file. This argument isn't used for the `FilePattern` or `IntersectionCount` comparison types.

* *Type:* Multi-value argument. The number of parameters for the `--secondAssetListFile` argument must match the number of non-`FilePattern` arguments to the `--comparisonType` argument.
* *Required:* No

**`--output`**

The output files for the result of each performed comparison. Output files can be a file, or a variable passed from another comparison. Variables start with the `$` character. For more about variables, see [Open 3D Engine Asset List Comparison Operations](/docs/user-guide/packaging/asset-bundler/list-operations/).

* *Type:* Multi-value argument. The number of parameters for the `--output` argument must match the number of parameters to the `--comparisonType` argument.
* *Required:* No

**`--print`**

This argument behaves differently depending on whether it's given as a flag or has a parameter list.
+ **Flag (no arguments)**: Prints the final comparison result to the console.
+  **With arguments**: Prints the contents of each argument to the console after comparisons complete. Arguments can either be files or variables.

* *Type:* Multi-value argument or flag
* *Required:* No

**`--allowOverwrites`**

Allow overwriting of existing output files. By default, existing files will not be overwritten.

* *Type:* Flag
* *Required:* No

### Examples 

**Example : Compare to generate a delta**

Generate a new asset list `deltaAssetList.assetlist` by taking the files that appear in either `firstAssetList_pc.assetlist` or `secondAssetList_pc.assetlist`, but not both:

{{< tabs name="Command line example-Compare to generate a delta" >}}
{{% tab name="Windows" %}}

```cmd
build\windows\bin\profile\AssetBundlerBatch.exe compare --comparisonType delta ^
     --firstAssetFile firstAssetList_pc.assetlist ^
     --secondAssetFile secondAssetList_pc.assetlist ^
     --output deltaAssetList.assetlist
```

{{% /tab %}}
{{% tab name="Linux" %}}

```cmd
build/linux/bin/profile/AssetBundlerBatch compare --comparisonType delta \
     --firstAssetFile firstAssetList_pc.assetlist \
     --secondAssetFile secondAssetList_pc.assetlist \
     --output deltaAssetList.assetlist
```

{{% /tab %}}
{{< /tabs >}}

**Example : Compare based on file path matching**

Generate a new asset list `filePatternAssetList.assetlist` that contains only XML files from the `assetList_pc.assetlist` file:

{{< tabs name="Command line example-Compare based on file path matching" >}}
{{% tab name="Windows" %}}

```cmd
build\windows\bin\profile\AssetBundlerBatch.exe compare --comparisonType filePattern ^
    --filePatternType 0 ^
    --filePattern "*.xml" ^
    --firstAssetFile assetList_pc.assetlist ^
    --output filePatternAssetList.assetlist
```

{{% /tab %}}
{{% tab name="Linux" %}}

```cmd
build/linux/bin/profile/AssetBundlerBatch compare --comparisonType filePattern \
    --filePatternType 0 \
    --filePattern "*.xml" \
    --firstAssetFile assetList_pc.assetlist \
    --output filePatternAssetList.assetlist
```

{{% /tab %}}
{{< /tabs >}}

**Example : Count intersection across multiple asset lists**

Use `intersectionCount` on `engine_pc.assetlist`, `game_pc.assetlist`, and `patch_pc.assetlist` to print out assets which appear 2 times or more between any of these asset lists:

{{< tabs name="Command line example-Count intersection across multiple asset lists" >}}
{{% tab name="Windows" %}}

```cmd
build\windows\bin\profile\AssetBundlerBatch.exe compare --comparisonType intersectionCount ^
    --firstAssetFile engine_pc.assetlist,game_pc.assetlist,patch_pc.assetlist ^
    --print
```

{{% /tab %}}
{{% tab name="Linux" %}}

```cmd
build/linux/bin/profile/AssetBundlerBatch compare --comparisonType intersectionCount \
    --firstAssetFile engine_pc.assetlist,game_pc.assetlist,patch_pc.assetlist \
    --print
```

{{% /tab %}}
{{< /tabs >}}

## Bundle settings - `bundleSettings` 

The `bundleSettings` command is used to manage bundle settings files, which are configuration files that let you store commonly used bundle configurations for easy reuse and automation.

### Options 

**`--bundleSettingsFile`**

The bundle settings file to be modified when running this command. If this file already exists, only those settings that are specified by the command invocation are changed.

* *Type:* Single-value argument
* *Required:* Yes

**`--assetListFile`**

Sets the asset list file to use in bundle generation.

* *Type:* Single-value argument
* *Required:* No

**`--outputBundlePath`**

Sets the location where the generated asset bundle is written to. Asset bundles use the `.pak` file extension.

* *Type:* Single-value argument
* *Required:* No

**`--bundleVersion`**

Sets the bundle format version to use in generation. The only allowed value is `1`.

* *Type:* Single-value argument
* *Required:* No

**`--maxSize`**

Sets the maximum allowed size for individual bundles, in MB. If any generated bundle is larger than the maximum size, it will be split into smaller bundles and named accordingly.

* *Type:* Single-value argument
* *Required:* No

**`--platform`**

The platforms to update the bundle settings for. Defaults to the project's enabled platforms, defined in `AssetProcessorPlatformConfig.ini`. Valid platform names can be found in the platform configuration file or as folder names under `dev/Cache/ProjectName`.

* *Type:* Multi-value argument
* *Required:* No

**`--print`**

Prints the contents of the bundle settings file to the console after modifying all values.

* *Type:* Flag
* *Required:* No

### Examples 

The following examples assume that these platforms are enabled for the project: `pc`

**Example : Set default max bundle size and asset list for PC**

Create a bundler settings file `defaults_pc.bundlesettings` for PC with the maximum bundle size set to 1024 MB and the `allAssets_pc.assetlist` asset list as its input:

{{< tabs name="Command line example-Set default max bundle size and asset list for PC" >}}
{{% tab name="Windows" %}}

```cmd
build\windows\bin\profile\AssetBundlerBatch.exe bundleSettings --bundleSettingsFile defaults.bundlesettings ^
    --maxSize 1024 ^
    --assetListFile allAssets.assetlist ^
    --platforms pc
```

{{% /tab %}}
{{% tab name="Linux" %}}

```cmd
build/linux/bin/profile/AssetBundlerBatch bundleSettings --bundleSettingsFile defaults.bundlesettings \
    --maxSize 1024 \
    --assetListFile allAssets.assetlist \
    --platforms linux
```

{{% /tab %}}
{{< /tabs >}}

## Asset bundles - `bundles` 

The `bundles` command is used to generate the final bundle (`.pak`) files that contain all of the assets from an asset list. Bundles can't be modified once created, only regenerated.

### Options 

**`--bundleSettingsFile`**

The bundle settings file to be loaded. If arguments are provided that would override the settings file, the arguments override the settings file.

* *Type:* Single-value argument
* *Required:* No

**`--assetListFile`**

The asset list file to use in bundle generation.

* *Type:* Single-value argument
* *Required:* No

**`--outputBundlePath`**

 The location where the generated asset bundle is written to. Asset bundles use the `.pak` file extension.
* *Type:* Single-value argument
* *Required:* No

**`--bundleVersion`**

The bundle format version to use in generation. The only allowed value is `1`.

* *Type:* Single-value argument
* *Required:* No

**`--maxSize`**

The maximum allowed size for individual bundles, in MB. If any generated bundle is larger than the maximum size, it will be split into smaller bundles and named accordingly.

* *Type:* Single-value argument
* *Required:* No

**`--platform`**

The platforms to generate bundles for. Defaults to the project's enabled platforms, defined in `AssetProcessorPlatformConfig.ini`. Valid platform names can be found in the platform configuration file or as folder names under `dev/Cache/ProjectName`.

* *Type:* Multi-value argument
* *Required:* No

**`--allowOverwrites`**

Allow overwriting of existing bundle files. By default, bundles are not overwritten.

* *Type:* Flag
* *Required:* No

### Examples 

In the following examples, assume that the current project has enabled the platforms `pc`, `ios`, and `android`.

**Example : Create a bundle for PC using a settings file**

Create a `assets_pc.pak` bundle for PC, using the `defaults_pc.bundlesettings` file:

{{< tabs name="Command line example-Create a bundle for PC" >}}
{{% tab name="Windows" %}}

```cmd
build\windows\bin\profile\AssetBundlerBatch.exe bundles --outputBundlePath assets.pak --bundleSettingsFile defaults.bundlesettings --platform pc
```

{{% /tab %}}
{{% tab name="Linux" %}}

```cmd
build/linux/bin/profile/AssetBundlerBatch bundles --outputBundlePath assets.pak --bundleSettingsFile defaults.bundlesettings --platform linux
```

{{% /tab %}}
{{< /tabs >}}

**Example : Create bundles for all platforms**

Create bundles for all of a project's enabled platforms, using the `allAssets_pc.assetlist`, `allAssets_ios.assetlist`, and `allAssets_android.assetlist` files:

{{< tabs name="Command line example-Create bundles for all platforms" >}}
{{% tab name="Windows" %}}

```cmd
build\windows\bin\profile\AssetBundlerBatch.exe bundles --outputBundlePath assets.pak --maxSize 512 --assetListFile allAssets.assetlist
```

{{% /tab %}}
{{% tab name="Linux" %}}

```cmd
build/linux/bin/profile/AssetBundlerBatch bundles --outputBundlePath assets.pak --maxSize 512 --assetListFile allAssets.assetlist
```

{{% /tab %}}
{{< /tabs >}}

## Bundle from seed - `bundleSeed` 

The `bundleSeed` command is used to generate bundles directly from seeds and their dependencies, without the use of an intermediate asset list. No other files besides the required seeds are used as input, and only bundle files are produced as output.

### Options 

**`--addSeed`**

The seeds to be used in bundle file generation. All asset dependencies of these seeds are included in the bundle as well. Argument parameters should be given as cache-relative paths to pre-processed assets.

* *Type:* Multi-value argument
* *Required:* Yes

**`--bundleSettingsFile`**

The bundle settings file to be loaded. If arguments are provided that would override the settings file, the arguments override the settings file.

* *Type:* Single-value argument
* *Required:* No

**`--outputBundlePath`**

The location where the generated asset bundle is written to. Asset bundles use the `.pak` file extension.

* *Type:* Single-value argument
* *Required:* No

**`--bundleVersion`**

The bundle format version to use in generation. The only allowed value is `1`.

* *Type:* Single-value argument
* *Required:* No

**`--maxSize`**

The maximum allowed size for individual bundles, in MB. If any generated bundle is larger than the maximum size, it will be split into smaller bundles and named accordingly.

* *Type:* Single-value argument
* *Required:* No

**`--platform`**

The platforms to update the bundle settings for. Defaults to the project's enabled platforms, defined in `AssetProcessorPlatformConfig.ini`. Valid platform names can be found in the platform configuration file or as folder names under `dev/Cache/ProjectName`.

* *Type:* Multi-value argument
* *Required:* No

**`--allowOverwrites`**

Allow overwriting of existing bundle files. By default, bundles are not overwritten.

* *Type:* Flag
* *Required:* No

### Examples 

**Example : Regenerate bundle for a seed**

Regenerate the bundle `processed.pak` for the `example.cgf` asset and all of its dependencies, with a maximum size of 512MB.

{{< tabs name="Command line example-Regenerate bundle for a seed" >}}
{{% tab name="Windows" %}}

```cmd
build\windows\bin\profile\AssetBundlerBatch.exe bundleSeed --addSeed example.cgf --outputBundlePath processed.pak --maxSize 512 --allowOverwrites
```

{{% /tab %}}
{{% tab name="Linux" %}}

```cmd
build/linux/bin/profile/AssetBundlerBatch bundleSeed --addSeed example.cgf --outputBundlePath processed.pak --maxSize 512 --allowOverwrites
```

{{% /tab %}}
{{< /tabs >}}
