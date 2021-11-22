---
linktitle: Features
title: Release Notes for Open 3D Engine 2111.1 - Features and Improvements
description: Features and improvements which appeared in Open 3D Engine release 2111.1.
weight: 1
---

## Networking

* Added support for Network Hierarchy of Entities - Provides a way to group network entities to combine their multiplayer input processing. ([RFC](https://github.com/o3de/sig-network/blob/main/rfcs/rfc-net-20211005-2-entityhierarchies.md))
* Added support for networking scripting inputs - Enables extensive use of script canvas to build and run networking scripts ([RFC](https://github.com/o3de/sig-network/blob/main/rfcs/rfc-net-20211005-1-inputscripting.md))
* Added Linux support for Client and Server targets in [O3DE-MultiplayerSample](https://github.com/o3de/o3de-multiplayersample).

### Cloud Services

* AWS GameLift Gem completed and out of preview 
    * Added Linux and FlexMatch support

## Testing 

* Parallel Python Test Execution and Standardization - Test Automation Framework that allows for parallel execution of python tests using multiple editor instances
* LyTestTools support for Linux

## Graphics and Audio
 
* AtomTressFX hair gem was implemented, displaying cutting edge hair technology based on the TressFX 4.1 In this version we introduced and improved both rendering methods (PPLL and ShortCut) and implemented the advanced Marshcner lighting model.
* Add support for refresh rate and sync interval support
* Enable Azslc for Linux
* Add support for xcb connections for Linux/Vulkan
* Add Renderdoc support via command line
* Add Pix support via command line
* Move RHI settings into settings registry
* Added GPU Buffer/Image memory visualizer
* AtomStarter game related fixed for mobile
* Enabled PipelineLibrary support to enable PSO caching for DX12 and Vulkan
* CPUProfiler is promoted from RHI to O3de
* Added support for GPU descriptor heap compaction for DX12 in case the gpu visible descriptor heap fragments
* Add support for taskgraph to SRG compilation
* Optimize SRG compilation to allow partial SRG updates
* Enable parallel encoding for Vulkan
* Fix a bunch of Vulkan validation errors
* Fix null descriptor issues for devices without null descriptor extension.
* Multiple fixes done to managing and creation of Vk swapchain
* Fix 3rd party path for android.
* Pass on ASV samples for Qualcomm and Mali devices.

## Core functionality

* Added Engine SDK layout support for Linux and Mac: [[Linux] Create an Engine SDK Layout that contains the debug, profile and release configurations o3de#3189](https://github.com/o3de/o3de/issues/3189), [[MacOS] Create an Engine SDK Layout that contains the debug, profile and release configurations o3de#3192](https://github.com/o3de/o3de/issues/3192)
* Added support for installing non-monolithic and monolithic artifacts into the same Engine SDK layout: [Add support for installing Monolithic and Non-Monolithic configurations into the same SDK layout o3de#3227](https://github.com/o3de/o3de/issues/3227)
* Added support for installing a Project Game Release Layout(Windows, Linux, MacOS): [Create a Project Game Release Layout o3de#3201](https://github.com/o3de/o3de/issues/3201)
* Added ComponentApplication Lifecycle Events to facilitate startup configuration for the GameLauncher: [o3de/o3de@`b3b646d`](https://github.com/o3de/o3de/commit/b3b646dad9c16d4a93cf1058034329c615c1a54b) 
* Updated the AssetBundler to use AZ::IO::Archive for creation of Pak Files: [Update AssetBundler to use AZ::IO::Archive for creating PAK files o3de#3419](https://github.com/o3de/o3de/issues/3419)
* Improved Error messags in the project's EngineFinder.cmake to help with indicating why the project could not locate the engine: [Improve the errors in EngineFinder.cmake o3de#4713](https://github.com/o3de/o3de/pull/4713)
* Added Multi-Config/Multi-Permutation support to the installer. This adds support for build configurations like debug, profile, release can be placed in the same installer. This also allows non-monolithic(Default) and monolithic(Monolithic) permutations to be added to the installer: [Adding support for multi-config/multi-permutation installer o3de#5062](https://github.com/o3de/o3de/pull/5062)
* Limit the configuration types available in the Engine SDK layout to only the configurations that were built. i.e If the SDK was only built with the profile configuration, only the profile configuration will be available when using the SDK with a project: [Build: Limit cmake build types based on Engine SDK build type o3de#2526](https://github.com/o3de/o3de/issues/2526)
* Added support for importing Json files. [Support for importing Json files o3de#4609](https://github.com/o3de/o3de/pull/4609)
* Better compiler detection on Linux. Passing `CMAKE_C_COMPILER` and `CMAKE_CXX_COMPILER` is no longer required. [Better compiler detection on Linux o3de#5376](https://github.com/o3de/o3de/pull/5376)
* Support for multiple configurations and monolithic into the SDK [Adding support for multi-config/multi-permutation installer o3de#5062](https://github.com/o3de/o3de/pull/5062)
* Adds stack traces to exception handling [Adding stack traces to exception handling in unit tests o3de#4708](https://github.com/o3de/o3de/pull/4708)
* Enabled override/virtual warnings [Enables override/virtual warnings o3de#4071](https://github.com/o3de/o3de/pull/4071)
* Limit configuration types a project sees when using an engine SDK [Limits configuration types a project sees when using an engine SDK o3de#4033](https://github.com/o3de/o3de/pull/4033)
* Enabled format securty warnings [Enabling warnings around format security o3de#3937](https://github.com/o3de/o3de/pull/3937)
* Set MSVC compiler into permissive mode [Setting /permissive- to make MSVC more "standard" o3de#3701](https://github.com/o3de/o3de/pull/3701)
* Improvements to input dependency tracking in runtime dependencies [Improves runtime dependencies input dependency o3de#3665](https://github.com/o3de/o3de/pull/3665)
* Enabled multiple warnings in MSVC and Clang [Enabling several warnings on MSVC that are not enabled by default and are good to have o3de#3378](https://github.com/o3de/o3de/pull/3378) [Linux/Clang fix warn-unused and related o3de#3376](https://github.com/o3de/o3de/pull/3376) [Enable warning MSVC 4296: 'operator': expression is always false o3de#3352](https://github.com/o3de/o3de/pull/3352) [SPEC-2513 Last warnings to get to Warning Level 4 o3de#3033](https://github.com/o3de/o3de/pull/3033) [SPEC-2513 Fixing w4018 o3de#2925](https://github.com/o3de/o3de/pull/2925)
* Adds support to compile with ASan [Adding support for ASan (Windows/MSVC) and fixing AzCore o3de#3292](https://github.com/o3de/o3de/pull/3292)
* Adds helper RUN targets in project-centric workflow [Create RUN target as helpers for the project-centric workflow (#2520) o3de#2635](https://github.com/o3de/o3de/pull/2635)

## Editor and tools

### Prefabs

* [Focus Mode - Viewport Interaction Model support for Prefabs o3de#3445](https://github.com/o3de/o3de/issues/3445) (first part of [Edit mode - Prefab edit operation o3de#3446](https://github.com/o3de/o3de/issues/3446)) 
* [Enable destroying entities spawned using a spawnable o3de#4154](https://github.com/o3de/o3de/pull/4154) 
* [Provide options to save prefabs when saving levels o3de#3440](https://github.com/o3de/o3de/pull/3440) 
* [Make prefab patch application use a best effort mechanism o3de#2110](https://github.com/o3de/o3de/pull/2110)

### Terrain

* Experimental Terrain System with mesh, physics and macro material support. This is in an optional Terrain Gem that is disabled by default. [Terrain System o3de#1847](https://github.com/o3de/o3de/issues/1847)

### Viewport

* Updates to how entity space is handled in the viewport.[Update how World/Parent/Local space function in the viewport o3de#3580](https://github.com/o3de/o3de/issues/3580)
* Updates to how selection works in the viewport.
* [Update how entity selection works in the default viewport](https://github.com/o3de/o3de/issues/3578)
* Can now create a project-specific Editor desktop shortcut from each project's menu. (Windows only)
* Can open CMake-GUI from each project's menu and from the project's Build button, pre-filled with the paths for that project.
* Project Manager will now prompt to get and setup Python on start up if Python is not found.
* Engine Name, version and path now visible in Engine Settings.
* Gem Catalog shows notifications when Gems and their dependencies are added or removed.
* Gem Catalog shows Gem dependencies.
* Gem Catalog notifies you when removing a Gem will also remove Gem dependencies.
* Project path automatically updates based on project name text input field.
* External Gems can now be added from the Gem Catalog.
* Project Manager logs output to the .o3de/Logs folder.

## Platforms

* Various Platform Abstraction Layer (PAL) changes required for restricted platforms. 
* Input context component: [Input context component o3de#4152](https://github.com/o3de/o3de/pull/4152)
* Barrier (formerly Synergy) Input Gem: [Barrier (formerly Synergy) Input Gem o3de#2336](https://github.com/o3de/o3de/pull/2336) 
* Added Floor, Ceil, and Round functions to AZ::Vector2/3/4: [Added Floor, Ceil, and Round functions to AZ::Vector2/3/4 o3de#4470](https://github.com/o3de/o3de/pull/4470) 
* Add support for a custom path root separator using a trait: [Add support for a custom path root separator using a trait. o3de#3678](https://github.com/o3de/o3de/pull/3678) 
* Change the InputDeviceImplementationRequest to be addressable by an InputDevcieId: [Change the InputDeviceImplementationRequest to be addressable by id o3de#2180](https://github.com/o3de/o3de/pull/2180) 
* Create XCB Connection mechanism for WSISurface implementation for Linux [Create XCB Connection mechanism for WSISurface implementation for Linux o3de#2400](https://github.com/o3de/o3de/pull/2400) 
* Linux Native Window support [Linux native window o3de#3975](https://github.com/o3de/o3de/pull/3975)
* Enable AZSLc and Shader Compilation on Linux [Enable AZSLc and Shader Compilation on Linux o3de#2338](https://github.com/o3de/o3de/pull/2338) 
* Add SPRIVCross package for Linux [Add SPRIVCross package for Linux o3de#2233](https://github.com/o3de/o3de/pull/2233)
* Remove 'AZ_TRAIT_DISABLE_FAILED_ASSET_PROCESSOR_TESTS' trait for Linux [LYN-2705: Remove 'AZ_TRAIT_DISABLE_FAILED_ASSET_PROCESSOR_TESTS' trait for Linux o3de#1235](https://github.com/o3de/o3de/pull/1235) 
* Python3 installation script for Linux machines [Python3 installation script for Linux machines o3de#832](https://github.com/o3de/o3de/pull/832) 
* Enable Vulkan RHI to build on Linux [LYN-2784: Enable Vulkan RHI to build on Linux o3de#267](https://github.com/o3de/o3de/pull/267) 
* Implement build project manager build button cross platform [Implement build project manager build button cross platform o3de#4248](https://github.com/o3de/o3de/pull/4248) 
* Implement open in file browser for Linux [Implement open in file browser for Linux o3de#4677](https://github.com/o3de/o3de/pull/4677)

## Build and Install

* Windows installer released for the 2111.1 release
* Windows nightly build installer available for the Development branch
* Debian package for Linux available for the 2111.release
* Debian nightly build package for Linux available for the Development branch

