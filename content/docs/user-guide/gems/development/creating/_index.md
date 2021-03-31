---
title: Create an O3DE Gem
description: Learn about the requirements for creating a component to use with the Open 3D Engine Gem system.
weight: 100
---

{{< preview-migrated >}}

You can develop your own independent components to distribute and build as Open 3D Engine Gems. A Gem is just a
bundle of code and/or assets, a manifest file, a CMake build file, and an optional display icon for project configuration
tools. This is all that's needed to ship a Gem.

## Gem Assets

Each Gem has an `Assets` directory that contains models, textures, scripts, and animations. Asset files are accessed the same way as they are in a game project. O3DE uses this root directory to find the asset file path. For example, when O3DE looks for the `textures/rain/rainfall_ddn.tif` file, it looks in the `<GemName>/Assets/textures/rain/rainfall_ddn.tif` directory.

## Gem Code

Gem code can be contained in any directory which is picked up by the `CMakeLists.txt` file of the Gem, although by convention Gems with only one source module
use `Code` for the directory name.

## Manifest file

Each Gem is required to have a `gem.json` manifest file, describing the Gem. See the [Gem manifest documentation](./manifest.md) for information on writing a
manifest.

## Icon file (Optional)

Each Gem can also contain an optional image to use as an icon in GUI project configuration tools. This image should be a `.png`, `.gif`, or `.jpg` with dimensions of 140x80, and named `preview.<ext>`.

## CMakeLists.txt file

Gems also require a `CMakeLists.txt` CMake build file, so that they can be picked up by the O3DE build system. This should be a standard CMake file for building your
Gem's source code. For Gems which use binary libraries or executables not distributed as source, O3DE has a [third-party package system](/docs/user-guide/build/packages.md).

Your `CMakeLists.txt` file is like any other CMake file. When you create it, keep the following important points in mind:

* The target generated for the Gem will have the Gem name as defined in the `gem.json` manifest.
  This will be the active target during the invocation of your Gem's `CMakeLists.txt`.
* You can use the functions available in the core O3DE build system. See the contents of the `cmake` directory in source.
* Avoid the use of `file(DOWNLOAD ...)`. The third-party package system of O3DE is a robust replacement, and should be used instead.
