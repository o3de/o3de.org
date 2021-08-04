---
title: Create an O3DE Gem
description: Learn about the requirements for creating a component to use with the Open 3D Engine Gem system.
weight: 200
---

You can develop your own independent modules to distribute and build as Open 3D Engine (O3DE) Gems. A Gem is just a
bundle of code and/or assets, a manifest file, a CMake build file, and an optional display icon for project configuration
tools. This is all that's needed to ship a Gem.

Although you can create a Gem manually by creating all of the files yourself, it's recommended to use the `o3de` tool:

```cmd
o3de create-gem -gp <path to create gem at>
```

This will create your Gem with a standard file structure and CMake files created from [templates](https://github.com/o3de/o3de/tree/development/Templates).

For more information on how to use the `o3de` tool, refer to [Project Configuration CLI Reference](/docs/user-guide/project-config/cli-reference/)

## Gem Assets

Each Gem has an `Assets` directory that can contain models, textures, scripts, animations, and more. Asset files are accessed the same way as they are in a game project. O3DE uses this root directory to find the asset file path. For example, when O3DE looks for the `textures/rain/rainfall_ddn.tif` file, it looks in the `<GemName>/Assets/textures/rain/` directory.

## Gem Code (Optional)

Gem code can be contained in any directory that is picked up by the `CMakeLists.txt` file of the Gem, although, by convention, Gems with only one source module
use `Code` for the directory name.

## Manifest file

Each Gem is required to have a `gem.json` manifest file, describing the Gem. See the [Gem manifest documentation](./manifest.md) for information on writing a
manifest.

## Icon file (Optional)

Each Gem can also contain an optional image to use as an icon in GUI project configuration tools. This image should be a `.png`, `.gif`, or `.jpg` with dimensions of 140x80, and named `preview.<ext>`.

## CMakeLists.txt file

Gems also require a `CMakeLists.txt` CMake build file, so that they can be picked up by the O3DE build system. This should be a standard CMake file for building your
Gem's source code. For Gems that use binary libraries or executables that aren't distributed as source, O3DE has a [third-party package system](/docs/user-guide/build/packages.md).

Your `CMakeLists.txt` file is like any other CMake file. When you create it, keep the following important points in mind:

* The target generated for the Gem will have the Gem name as defined in the `gem.json` manifest.
  This will be the active target during the invocation of your Gem's `CMakeLists.txt`.
* You can use the functions available in the core O3DE build system. See the contents of the `cmake` directory in source.
* Avoid the use of `file(DOWNLOAD ...)`. The package system of O3DE is a robust replacement, and should be used instead.

# Creating an Asset-Only Gem

When you create a Gem without a specified template by using the command `o3de create-gem -gp <path to create a gem at>`, it's created from the "DefaultGem" template. This creates a Gem for packaging both code and assets. You can also create a Gem that provides only assets by specifying the "AssetGem" template through the `create-gem` command:

```cmd
o3de create-gem --gem-path <path to create gem at> --template-name AssetGem
# or
o3de create-gem --gem-path <path to create gem at> --template-path <engine-root>\Templates\AssetGem
## Gem Templates
O3DE provides a list of Gem templates, which can be found in the [Templates](https://github.com/o3de/o3de/tree/development/Templates) directory in the O3DE repository.
