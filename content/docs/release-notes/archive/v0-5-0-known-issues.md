---
linktitle: v0.5.0
title: Known Issues for Open 3D Engine v0.5.0 (alpha)
description: Find out the known issues in O3DE v0.5.0 (alpha).
weight: 102
toc: true
menu_uuid: releasenotes
guide_img: "/images/release-notes/guide_img.svg"
---

Open 3D Engine (O3DE) Release v0.5.0 (alpha) has the following known issues:

## AI

* AI Components are unusable due to missing Agent Types.

## Asset Pipeline

* Virtual File System (VFS) is not currently working correctly.

## Atom

* Atom debug information is not currently displayed in the O3DE Editor.
* Duplication of entities throws an Out of Memory error.
* "Planting" with Dynamic Vegetation on Atom meshes results in unpredictable behavior.
* Rendering errors using Vulkan with NVidia's Titan X hardware.
* (macOS only) AutomatedTesting.GameLauncher and the O3DE Editor cannot be started.

### Global Illumination and Reflections

* Diffuse probes incorrectly alter **BoxShape** sizes.

### Raytracing

* Vulkan ray tracing crashes on NVidia 10-series cards.

### Render Hardware Interface (RHI)

* Changing Viewport layout while running with null renderer (-rhi=Null) causes an Editor crash.

  The following errors occur using RHI with Vulkan on Android platforms:

  * Dynamic Material Test throws Device Lost error upon switch test material on Mali
  * Device lost on Features/SSAO sample
  * Device lost error on Features/LightCulling sample
  * Device lost on Features/Exposure sample
  * Device lost on Features/Exposure sample
  * Unknown error assert for RPI/SceneReloadTest
  * Unknown error assert for RPI/Dynamic Material Test
  * Unknown error assert for RPI/AssetLoadTest
  * RPI/DynamicDrawTest assert: Vulkan API method failed: Unknown error
  * Crash on RPI/Bistrobenchmark sample

## Character

* You cannot currently save **Event Data** to **Motion Events**.

## Editor

* **New level** dialog has no way to select a different folder.
* O3DE Editor layout is broken in Atom projects when moved to a second monitor.

## UI Canvas (LYShine)

* UI Canvas cannot meet Mesh component dependencies at this time.
* The Masking function does not currently work with the Atom renderer.

## Platforms

* A target must currently be specified when registering a Gem.
* (macOS only) Using XCode's Modern Build System fails in Jenkins.
* (iOS only) CMake generator expressions used in the `Find<3rdParty>.cmake` files don't currently work.
* (iOS only) Building the `AutomatedTesting` project fails.
* (Android only) Building an APK with `gradlew assembleProfile` fails.

## Systems

* After AN o3de project is built, the `project_path` is still incorrectly points to "AutomatedTest".

