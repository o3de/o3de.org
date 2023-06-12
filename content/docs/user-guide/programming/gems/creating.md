---
title: Create an O3DE Gem
description: Learn about the requirements for creating a component to use with the Open 3D Engine Gem system.
weight: 200
---

You can develop your own independent modules to distribute and build as **Open 3D Engine (O3DE)** Gems. A Gem is just a bundle of code and/or assets, a manifest file, a CMake build file, and an optional display icon for project configuration tools. This is all that's needed to ship a Gem.

The minimum requirements for a Gem is a directory with a `CMakeLists.txt` build file and a `gem.json` manifest file.

Although you can create a Gem manually by creating all of the files yourself, it's recommended to use the `o3de` tool located in the `<engine>/scripts` directory:

{{< tabs name="Create a Gem" >}}
{{% tab name="Windows" %}}

```cmd
<engine>\scripts\o3de.bat create-gem -gp <path to create gem at>
```

{{% /tab %}}
{{% tab name="Linux" %}}

```cmd
<engine>/scripts/o3de.sh create-gem -gp <path to create gem at>
```

{{% /tab %}}
{{< /tabs >}}

This will create your Gem with a standard file structure and CMake files created from [templates](https://github.com/o3de/o3de/tree/development/Templates).

For more information on how to use the `o3de` tool, refer to [Project Configuration CLI Reference](/docs/user-guide/project-config/cli-reference/).

## Assets

Each Gem has an `Assets` directory that can contain models, textures, scripts, animations, and more. Asset files are accessed the same way as they are in a game project. O3DE uses this root directory to find the asset file path. For example, when O3DE looks for the `textures/rain/rainfall_ddn.tif` file, it looks in the `<GemName>/Assets/textures/rain/` directory.

Assets used by your Gem in a launcher runtime should have their source assets listed in a [Gem dependencies `.xml` file](#gem-dependencies) or their compiled asset path should be listed in [`<GemName>/Assets/seedList.seed`](#default-gemnameassetsseedlistseed). 

### Default `<GemName>/Assets/seedList.seed`

This file contains a list of compiled asset paths and platforms that will automatically appear in the *Asset Bundler* GUI making it easy for users to find and include in their project asset bundle.
They will also be included in a bundle when the [*AssetBundlerBatch* `--addDefaultSeedListFiles`](/docs/user-guid/packaging/asset-bundler/command-line-reference/#options) CLI option is used.
The `seedList.seed` approach is useful when you want to provide a ready-to-use list of default compiled assets and the platforms they're used on.

Refer to the [Asset Bundler documentation](/docs/user-guide/packaging/asset-bundler/) for more information on the *Asset Bundler*, `.seed` files and bundling assets,

{{<important>}}
The filename `seedList.seed` is case-sensitive and must be in your Gem `Assets` folder or the seed list will not automatically appear in the *Asset Bundler* GUI.
{{</important>}}

### Gem dependencies

The Gem dependencies `.xml` file contains a list of source assets which will be used by the *Asset Processor* to create a seed list containing all the compiled asset paths and platforms.
Using the Gem dependencies file is convenient for specifying source assets with glob patterns, for example when you want to include all shader variants, but does require running the Asset Processor.   

Refer to [Default dependencies for O3DE projects](/docs/user-guide/packaging/asset-bundler/default-dependencies/) for instructions on creating Gem dependencies.



## Code (optional)

Gem code can be contained in any directory that is picked up by the `CMakeLists.txt` file of the Gem, although, by convention, Gems with only one source module use `Code` for the directory name.

A Gem that contains code is known as a *Code Gem*. For more information on developing Code Gems, refer to [Code Gem Specifications](/docs/user-guide/programming/gems/code-gems).

## Manifest file

Each Gem is required to have a `gem.json` manifest file, describing the Gem. See the [Gem manifest documentation](./manifest) for information on configuring a
manifest.

## Icon file (optional)

Each Gem can also contain an optional image to use as an icon in GUI project configuration tools. This image should be a `.png`, `.gif`, or `.jpg` with dimensions of 140x80, and named `preview.<ext>`. The relative path to a Gem's icon is specified in `gem.json`.

## CMakeLists.txt file

Gems also require a `CMakeLists.txt` CMake build file, so that they can be picked up by the O3DE build system. This should be a standard CMake file for building your
Gem's source code, and it should be located in the Gem's root directory.

For Gems that use binary libraries or executables that aren't distributed as source, O3DE has a [third-party package system](/docs/user-guide/build/packages/).

Your `CMakeLists.txt` file is like any other CMake file. When you create it, keep the following important points in mind:

* The target generated for the Gem will have the Gem name as defined in the `gem.json` manifest. This will be the active target during the invocation of your Gem's `CMakeLists.txt`.
* You can use the functions available in the core O3DE build system. See the contents of the `cmake` directory in source.
* Avoid the use of `file(DOWNLOAD ...)`. The package system of O3DE is a robust replacement, and should be used instead.

## Creating an asset-only Gem

When you create a Gem without specifying a template, it's created from the "DefaultGem" template. This creates a Gem for packaging both code and assets. You can also create a Gem that provides only assets by specifying the "AssetGem" template through the `create-gem` command:

{{< tabs name="Create an asset Gem" >}}
{{% tab name="Windows" %}}

```cmd
<engine>\scripts\o3de.bat create-gem --gem-path <path to create gem at> --template-name AssetGem
# or
<engine>\scripts\o3de.bat create-gem --gem-path <path to create gem at> --template-path <engine-root>\Templates\AssetGem
```

{{% /tab %}}
{{% tab name="Linux" %}}

```cmd
<engine>/scripts/o3de.sh create-gem --gem-path <path to create gem at> --template-name AssetGem
# or
<engine>/scripts/o3de.sh create-gem --gem-path <path to create gem at> --template-path <engine-root>/Templates/AssetGem
```

{{% /tab %}}
{{< /tabs >}}

## Gem templates

O3DE provides a list of Gem templates, which can be found in the [Templates](https://github.com/o3de/o3de/tree/development/Templates) directory in the O3DE repository, or in your O3DE engine installation.
