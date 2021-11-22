---
linktitle: 21.11 Release Notes
title: Release Notes for Open 3D Engine 21.11
description: Find out what was delivered in O3DE 21.11.
weight: 101
toc: true
menu_uuid: releasenotes
guide_img: "/images/release-notes/guide_img.svg"
---

Good news, everyone! The Open 3D Foundation is proud to announce that we've delivered our first stable release of Open 3D Engine (O3DE), version 21.11.

## Highlights

The O3DE community has been hard at work since our last release in July 2021

First off the bat, we're pleased to announce that we have binary installers for both Windows and Linux (Preview), with download hosting provided by Amazon.

## Features

### SIG-Networking

* Cloud Services
  * AWS GameLift Gem completed and out of preview 
        * Added Linux and FlexMatch support
* Networking
  * Added support for Network Hierarchy of Entities - Provides a way to group network entities to combine their multiplayer input processing. 
    * RFC: https://github.com/o3de/sig-network/blob/main/rfcs/rfc-net-20211005-2-entityhierarchies.md
  * Added support for networking scripting inputs - Enables extensive use of script canvas to build and run networking scripts 
    * RFC: https://github.com/o3de/sig-network/blob/main/rfcs/rfc-net-20211005-1-inputscripting.md
  * Added Linux support for Client and Server targets in [O3DE-MultiplayerSample](https://github.com/o3de/o3de-multiplayersample)
        * MultiplayerSample.GameLauncher and MultiplayerSample.ServerLauncher can be built and executed on Linux

### SIG-UI/UX

* Onboarding experience (covered in sig-content)
  * Remote gems
  * bug fixes in project manager
* Gameplay development experience
  * Improve prefabs editing in the viewport with the prefab editing focus mode (covered in sig-content)
  * Improve the searching experience in asset browser, users can now see the search results shown in a flat view without the folder structure, it makes it easier for users to find the files they are searching for faster (not covered in sig-content)
  * PhysX Joint related components adopt the new component editing mode in the viewport. Now users can edit the PhysX joints directly in the viewport using the manipulators. (covered in the sig-core)
* Look development experience
  * Improved the speed of iteration between Maya/Blender and O3DE with the hot reload feature (covered in sig-graphics-audio)
* Team collaboration experience
  * We are still evaluating this. will update more later.
* Editor extension experience
  * We introduced several things to improve the implementation efficiency for engine builders to extend O3DE with their own tools and workflows:
    * Sample gems to extend the UIs
    * Documentations to support users to extend the engine (should covered in sig-doc)
* Packaging and deployment experience
  * User can now easily package their project and share with their friends for them to play (not covered in sig build)

### SIG-Testing

* Parallel Python Test Execution and Standardization
  * Test Automation Framework that allows for parallel execution of python tests using multiple editor instances
* LyTestTools support for Linux 
  * LyTestTools automation framework now supports executing test cases on Linux

### SIG-Graphics/Audio

* AtomTressFX hair gem was implemented, displaying cutting edge hair technology based on the TressFX 4.1 In this version we introduced and improved both rendering methods (PPLL and ShortCut) and implemented the advanced Marshcner lighting model.

Remark: Keeva is a preliminary work courtesy of Apocalypse Studios and Denis Dyack.

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

### SIG-Core

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

### SIG-Content

* Prefabs 
  * Prefab Focus Mode. Enhanced support for editing prefabs in the viewport.
         Prefabs are now displayed in the Outliner and Viewport as a single object, regardless of how many entities are nested under them. To make changes to the prefab, the user now needs to expand it via the "Edit Prefab" action (there are multiple ways to access the action: right click context menu item, double click, + shortcut, edit button in the Outliner). That will move the Editor's focus to the selected Prefab; when a Prefab is in focus, editing is limited to it. All other instances of the same prefab in the scene will receive the changes in real time.
  * [Focus Mode - Viewport Interaction Model support for Prefabs o3de#3445](https://github.com/o3de/o3de/issues/3445) (first part of [Edit mode - Prefab edit operation o3de#3446](https://github.com/o3de/o3de/issues/3446)) 
  * Added support to delete entities spawned at runtime via the Spawnables system.
  * [Enable destroying entities spawned using a spawnable o3de#4154](https://github.com/o3de/o3de/pull/4154) 
  * Improved messaging for prefab save operations - when saving a prefab, the user is prompted to save the nested prefabs too. Also adds dialog for unsaved changes on all open prefabs when closing the Editor or switching to a different level.
  * [Provide options to save prefabs when saving levels o3de#3440](https://github.com/o3de/o3de/pull/3440)
  * Prefab patching now uses a best-effort mechanism, which allow levels to be loaded with errors.
  * [Make prefab patch application use a best effort mechanism o3de#2110](https://github.com/o3de/o3de/pull/2110)

* Terrain
  * Experimental Terrain System with mesh, physics and macro material support. This is in an optional Terrain Gem that is disabled by default.
  * [Terrain System o3de#1847](https://github.com/o3de/o3de/issues/1847)

* Viewport
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

### SIG-Platforms

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

### SIG-Build

* Windows installer released for the 2111.1 release
* Windows nightly build installer available for the Development branch
* Debian package for Linux available for the 2111.release
* Debian nightly build package for Linux available for the Development branch

## Bug Fixes

### SIG-Networking bug fixes

* Fixed dependencies for networking that could crash the Editor: [Open editor crashes o3de#5277](https://github.com/o3de/o3de/issues/5277)
* Enabled tests for HttpRequestor gem: [HttpRequestorGem's HttpTest is not running and running it fails o3de#4687](https://github.com/o3de/o3de/issues/4687)
* Changed the serialization format for networking to binary to save space and time: [NetworkPrefabProcessor stores the .network.spawnable in JSON causing file bloat o3de#4608](https://github.com/o3de/o3de/issues/4608) 
* Multiplayer NetworkInput Silently Fails Unless LocalPredictionPlayerInputComponent is Attached: [Multiplayer NetworkInput Silently Fails Unless LocalPredictionPlayerInputComponent is Attached o3de#3155](https://github.com/o3de/o3de/issues/3155)

### SIG-Graphics-Audio  bug fixes

* Material files are now backward compatible with material property renames, by defining version updates in the .materialtype file.
* Reduced build dependencies on .materialtype files so that modifying shader code will no longer cause all .material and .fbx files to reprocess.

### SIG-Core bug fixes

* Resolved issues with required gems not being treated as required when using an Engine SDK: [Required Gems are not set as required in the SDK Layout build o3de#3430](https://github.com/o3de/o3de/issues/3430)
* Fixed issue "Relocating the Project Game Release Layout outside of the install directory fails to initialize": [o3de/o3de@`6270128`](https://github.com/o3de/o3de/commit/627012840d62a8f10fd6a7c595bac0b68d936f4b)
* Fixed for launching the Editor through ProjectManager on Mac as well as other miscellaneous Project Manager fixes.: [[MacOS] Launching Editor from ProjectManager and other misc. fixes o3de#5264](https://github.com/o3de/o3de/pull/5264)
* Fixed level creation on Linux: [Fix level creation on Linux o3de#3488](https://github.com/o3de/o3de/pull/3488)
* Fixed rpaths when using an Engine SDK layout on Linux: [Fix rpaths during o3de sdk install on Linux o3de#3370](https://github.com/o3de/o3de/pull/3370)
* Added fix for Android Monolithic release builds: [Android release/monolithic-release fixes o3de#3788](https://github.com/o3de/o3de/pull/3788)
* Fixed issue where CMake targets which were wrapped in two layers of generator expressions could not be added as dependencies when using an Engine SDK layout: https://github.com/o3de/o3de/pull/2337/files
* Fixes for CMake 3,22rc [Fixes for CMake 3.22rc o3de#5314](https://github.com/o3de/o3de/pull/5314)
* LuaIDE->GridHub dependency added [Adds LuaIDE->GridHub dependency o3de#5229](https://github.com/o3de/o3de/pull/5229)
* Editor->LuaIDE dependency added [Makes Editor depend on LuaIDE o3de#4514](https://github.com/o3de/o3de/pull/4514)
* XCode generation fails [[MacOS] Generating XCode solution fails o3de#3832](https://github.com/o3de/o3de/issues/3832)
* It is not possible to create new Projects [It is not possible to create new Projects o3de#3443](https://github.com/o3de/o3de/issues/3443)
* runtime dependencies do not add target file dependencies [ly_add_target RUNTIME_DEPENDENCIES and ly_add_target_files does not add file dependencies on the TARGET o3de#3391](https://github.com/o3de/o3de/issues/3391)
* Jinja files are not being copied to install layout [Jinja files are not copied over to the INSTALL install laoyut when they are PUBLIC files o3de#2517](https://github.com/o3de/o3de/issues/2517) 
* Some projects are being re-processed in VS despite being clean [Some projects are re-processed in VS despite being clean o3de#2288](https://github.com/o3de/o3de/issues/2288)
* PhysX Gem can't be used as build dependency in engine SDK [PhysX Gem can't be used as build dependency in engine SDK Part 2 o3de#2126](https://github.com/o3de/o3de/issues/2126)
* 3rdParty runtime dependencies copied multiple times [3rdParty runtime dependencies copied multiple times o3de#2045](https://github.com/o3de/o3de/issues/2045) [PhysX Gem can't be used as build dependency in engine SDK o3de#1971](https://github.com/o3de/o3de/issues/1971)

### SIG-Content bug fixes

* Resolved numerous Scaling/Dpi issues affecting environments with multiple screens with different dpi settings. [Editor DPI/Scaling Issues o3de#3339](https://github.com/o3de/o3de/issues/3339)
* Prefabs now store entity sort order information correctly. [Fix Entity Outliner sort order with Prefabs enabled o3de#5297](https://github.com/o3de/o3de/pull/5297)
* Thickness of manipulator hit zones is configurable via a cvar.
* Add ability to configure manipulator line hitzone thickness o3de#3579 
* Restored lost fix - AP unresolved product dependency query failed to handle large number of products [Restore fix lost in merge: [LY-121929] Asset Processor Error : Sqlite… o3de#2202](https://github.com/o3de/o3de/pull/2202) 
* Added xml output version of scene dbgsg files [Add serialized output version (xml) of debug scene graph o3de#3437](https://github.com/o3de/o3de/pull/3437) 
* Fixed AP handling of cache copy failure [[LYN-4508] Fix cache copy failure o3de#1457](https://github.com/o3de/o3de/pull/1457) 
* Added early version of procedural prefab support [Squashed commit of Procedural Prefab work o3de#4481](https://github.com/o3de/o3de/pull/4481) 
* Fixed AP handling of absolute path wildcard dependencies [Convert resolved wildcard paths to relative path before saving in database o3de#4574](https://github.com/o3de/o3de/pull/4574)
* Fixed wildcard source dependencies not refreshing with new files [[LYN-7774] wildcard source dependencies not refreshing with new files o3de#5054](https://github.com/o3de/o3de/pull/5054) 
* Fixed unit test leaking assert absorber [[LYN-7245] Fix Assert Absorber being leaked o3de#5176](https://github.com/o3de/o3de/pull/5176) 
* Fixed unit test leaking thread [[LYN-7245] Fix test thread being created multiple times o3de#5267](https://github.com/o3de/o3de/pull/5267) 
* Fixed AssetBus mutex not being re-locked before modifying the context again [Fix AssetBus connection policy to re-lock the mutex afterward o3de#5575](https://github.com/o3de/o3de/pull/5575) 
* Fixed race condition in asset loading [[LYN-7463] Fix insert streaming request failure o3de#5604](https://github.com/o3de/o3de/pull/5604) 
* Fixed race condition in asset container loading [[SPEC-7644] ParallelDeepAssetReferences is failing intermittently o3de#5721](https://github.com/o3de/o3de/pull/5721)
* Project Manager
  * Better detection of whether a build fails when building through Project Manager
    * Link to view log while building
    * Showing the build button for projects that need to be rebuilt after a restart of Project Manager
    * Progress bars when deleting and cloning projects
    * Fix text being cut off incorrectly in multiple places in the Gem Catalog
    * Fixed lots of multiple of the same category appearing in the Gem Catalog
    * Fix some instances where building with Project Manager would take a long time with an install build
    * Project Manager window cannot be resized on Mac and Linux.
    * Project Manager window too large for screens under 800 pixels tall. [#3946](https://github.com/o3de/o3de/issues/3946)
    * Project Manager window background transparent on Mac.
    * "Edit Project Settings" menu does not support projects with spaces in the project path
    * Cannot type in "Project Location" field.
    * Crash when Python not found or misconfigured.
    * Quantity of Gems showed is not automatically updated in Project Manager [#4074](https://github.com/o3de/o3de/issues/4074)
    * Registered external Gems do not show up in Configure Gems when creating a project [#1965](https://github.com/o3de/o3de/issues/1965)
* Asset Processor
  * Fixed an issue where the Editor locks up when using bundle mode, after mounting a bundle that contains a legacy level [Unlocked a mutex after modifying the associated variable o3de#5625](https://github.com/o3de/o3de/pull/5625) 
  * Fixed a failing asset bundler periodic test [Asset bundler test fixes o3de#5548](https://github.com/o3de/o3de/pull/5548) 
  * Fixed all errors when using default seeds [Fixed all errors with default seeds o3de#5489](https://github.com/o3de/o3de/pull/5489) 
  * Fixed asset bundles in release builds [Bundled release build bug fixes cherry picked from development o3de#5270](https://github.com/o3de/o3de/pull/5270) 
  * Fixed a crash in the Asset Bundler GUI if you saved a bundle outside the default folder [Fixed crash if you save a bundle outside the default bundle folder (#4974) o3de#5255](https://github.com/o3de/o3de/pull/5255)
  * Improved error reporting when a node has mixed skinned and unskinned meshes [Better error reporting on mixing skinned and unskinned meshes. o3de#3158](https://github.com/o3de/o3de/pull/3158) 
  * Duplicate blend shape animations are now handled correctly, and fixed a crash with invalid animation targets [Fixed issues with blend shape animations o3de#3080](https://github.com/o3de/o3de/pull/3080) 
  * Updated how nodes are imported from AssImp into O3DE, and how poses are handled. Now all skinned meshes are imported with what Blender calls the "Rest Position" [Updated skeleton logic: o3de#2957](https://github.com/o3de/o3de/pull/2957) 
  * Fixed an issue where sometimes scene processing would run the wrong python script on a processed scene file 
  * [Cleared m_scriptFilename between scene files. o3de#2278](https://github.com/o3de/o3de/pull/2278) 
  * Sped up sqlite BuilderGuid_Source_SourceDependency index [{LYN-5460} SQLite BuilderGuid_Source_SourceDependency Index is slow o3de#3648](https://github.com/o3de/o3de/pull/3648) 
  * Asset bundler tests no longer time out [{LYN-5375} asset bundler tests timing out o3de#3356](https://github.com/o3de/o3de/pull/3356) 
  * Fixed failing periodic Asset Pipeline tests that were timing out and using the wrong project path [{SPEC-7366}4 Asset Pipeline Tests are failing in the periodic suite o3de#2727](https://github.com/o3de/o3de/pull/2727)

### SIG-Platforms bug fixes

* Miscellaneous bug fixes required for various platforms. 
* Fix the GameStateSamples Gem: [Fix the GameStateSamples Gem and remove an unused variable from DebugConsole.h o3de#3347](https://github.com/o3de/o3de/pull/3347) 
* Put the ShaderMetrics.json in the [@user](https://github.com/user)@ folder: [Put the ShaderMetrics.json in the @user@ folder. o3de#4402](https://github.com/o3de/o3de/pull/4402) 
* Fix "GameLauncher Log is Saved with Wrong File Extension": [Fix "GameLauncher Log is Saved with Wrong File Extension" (LYN-3972). o3de#1984](https://github.com/o3de/o3de/pull/1984) 
* Increase the max time in the iOS run loop from DBL_EPSILON to one millisecond: [Increase the max time in the iOS run loop. o3de#4580](https://github.com/o3de/o3de/pull/4580) 
* Fix bug in LocalFileIO::ConvertToAliasBuffer when a resolved alias ends in a path separator: [Fix bug in LocalFileIO::ConvertToAliasBuffer when a resolved alias ends in a path separator. o3de#5136](https://github.com/o3de/o3de/pull/5136) 
* Ensure to set both FilePathKey_ProjectUserPath and FilePathKey_ProjectLogPath to a writeable storage location on non-host platforms: [Add support for a custom path root separator using a trait. o3de#3678](https://github.com/o3de/o3de/pull/3678) 
* Fix the Editor launcher for LuaIDE on Linux [Fix the Editor launcher for LuaIDE on Linux o3de#3407](https://github.com/o3de/o3de/pull/3407) 
* Fix Linux/Vulkan/Editor crash on startup [Fix for Linux/Vulkan/Editor crash on startup o3de#2632](https://github.com/o3de/o3de/pull/2632) 
* Fix RPATH issues for qt/plugin binaries [Fix RPATH issues for qt/plugin binaries o3de#2018](https://github.com/o3de/o3de/pull/2018) 
* Linux fix launch project manager from editor [Linux fix launch project manager from editor o3de#4105](https://github.com/o3de/o3de/pull/4105) 
* Fix LuaIDE crash at startup caused by missing System Allocator Initialization [Fix LuaIDE crash at startup caused by missing System Allocator Initialization o3de#4130](https://github.com/o3de/o3de/pull/4130) 
* Fix failed 'server' platform assets on Linux related to Shaders [Fix failed 'server' platform assets on Linux related to Shaders o3de#4275](https://github.com/o3de/o3de/pull/4275) 
* Update MaterialEditor launcher to use platform traits for executable extensions [Update MaterialEditor launcher to use platform traits for executable extensions o3de#4429](https://github.com/o3de/o3de/pull/4429)
* Fix Issue saving new assets in Asset Editor on Linux [Fix Issue saving new assets in Asset Editor on Linux o3de#4537](https://github.com/o3de/o3de/pull/4537) 
* Fix prefab close dialog Editor crash on Linux [Fix prefab close dialog Editor crash on Linux o3de#4623](https://github.com/o3de/o3de/pull/4623) 
* Fix to prevent using legacy windows based logic to create a Path on Linux [Fix to prevent using legacy windows based logic to create a Path on Linux o3de#4704](https://github.com/o3de/o3de/pull/4704) 
* Fix Vulkan issues with VK_ERROR_OUT_OF_DATE caused by the swapchain not being updated on a resize [Fix Vulkan issues with VK_ERROR_OUT_OF_DATE caused by the swapchain not being updated on a resize o3de#4740](https://github.com/o3de/o3de/pull/4740) 
* Linux Fixes for Launching the Material Editor [Linux Fixes for Launching the Material Editor o3de#4808](https://github.com/o3de/o3de/pull/4808) 
* Update open file limit on linux for applications [Update open file limit on linux for applications o3de#4878](https://github.com/o3de/o3de/pull/4878) 
* Fix to set the Taskbar name and Game Launcher window title to the name of the Project [Fix to set the Taskbar name and Game Launcher window title to the name of the Project o3de#4986](https://github.com/o3de/o3de/pull/4986)
* Fix the GameStateSamples Gem: [Fix the GameStateSamples Gem and remove an unused variable from DebugConsole.h o3de#3347](https://github.com/o3de/o3de/pull/3347) 
* Put the ShaderMetrics.json in the [@user](https://github.com/user)@ folder: [Put the ShaderMetrics.json in the @user@ folder. o3de#4402](https://github.com/o3de/o3de/pull/4402) 
* Fix "GameLauncher Log is Saved with Wrong File Extension": [Fix "GameLauncher Log is Saved with Wrong File Extension" (LYN-3972). o3de#1984](https://github.com/o3de/o3de/pull/1984) 
* Increase the max time in the iOS run loop from DBL_EPSILON to one millisecond: [Increase the max time in the iOS run loop. o3de#4580](https://github.com/o3de/o3de/pull/4580) 
* Fix bug in LocalFileIO::ConvertToAliasBuffer when a resolved alias ends in a path separator: [Fix bug in LocalFileIO::ConvertToAliasBuffer when a resolved alias ends in a path separator. o3de#5136](https://github.com/o3de/o3de/pull/5136) 
* Ensure to set both FilePathKey_ProjectUserPath and FilePathKey_ProjectLogPath to a writeable storage location on non-host platforms: [Add support for a custom path root separator using a trait. o3de#3678](https://github.com/o3de/o3de/pull/3678) 
* Fix the Editor launcher for LuaIDE on Linux [Fix the Editor launcher for LuaIDE on Linux o3de#3407](https://github.com/o3de/o3de/pull/3407) 
* Fix Linux/Vulkan/Editor crash on startup [Fix for Linux/Vulkan/Editor crash on startup o3de#2632](https://github.com/o3de/o3de/pull/2632) 
* Fix RPATH issues for qt/plugin binaries [Fix RPATH issues for qt/plugin binaries o3de#2018](https://github.com/o3de/o3de/pull/2018) 
* Linux fix launch project manager from editor [Linux fix launch project manager from editor o3de#4105](https://github.com/o3de/o3de/pull/4105) 
* Fix LuaIDE crash at startup caused by missing System Allocator Initialization [Fix LuaIDE crash at startup caused by missing System Allocator Initialization o3de#4130](https://github.com/o3de/o3de/pull/4130) 
* Fix failed 'server' platform assets on Linux related to Shaders [Fix failed 'server' platform assets on Linux related to Shaders o3de#4275](https://github.com/o3de/o3de/pull/4275) 
* Update MaterialEditor launcher to use platform traits for executable extensions [Update MaterialEditor launcher to use platform traits for executable extensions o3de#4429](https://github.com/o3de/o3de/pull/4429) 
* Fix Issue saving new assets in Asset Editor on Linux [Fix Issue saving new assets in Asset Editor on Linux o3de#4537](https://github.com/o3de/o3de/pull/4537) 
* Fix prefab close dialog Editor crash on Linux [Fix prefab close dialog Editor crash on Linux o3de#4623](https://github.com/o3de/o3de/pull/4623) 
* Fix to prevent using legacy windows based logic to create a Path on Linux [Fix to prevent using legacy windows based logic to create a Path on Linux o3de#4704](https://github.com/o3de/o3de/pull/4704) 
* Fix Vulkan issues with VK_ERROR_OUT_OF_DATE caused by the swapchain not being updated on a resize [Fix Vulkan issues with VK_ERROR_OUT_OF_DATE caused by the swapchain not being updated on a resize o3de#4740](https://github.com/o3de/o3de/pull/4740)
* Linux Fixes for Launching the Material Editor [Linux Fixes for Launching the Material Editor o3de#4808](https://github.com/o3de/o3de/pull/4808) 
* Update open file limit on linux for applications [Update open file limit on linux for applications o3de#4878](https://github.com/o3de/o3de/pull/4878) 
* Fix to set the Taskbar name and Game Launcher window title to the name of the Project [Fix to set the Taskbar name and Game Launcher window title to the name of the Project o3de#4986](https://github.com/o3de/o3de/pull/4986)

## Deprecations

* Updated the FileIO Aliases to provide more accurate descriptions of the paths they represent: [Update FileIOAliases to be more accurately indicate which kind of paths they refer to o3de#4183](https://github.com/o3de/o3de/issues/4183), Impactful Change link: https://discord.com/channels/805939474655346758/852574203437121586/895059153247170590
* The AssetProcessor Exclude Filters are now treated relative to the Scan Folder: [Reserved keywords in the project path o3de#4044](https://github.com/o3de/o3de/issues/4044) Impactful Change link: https://discord.com/channels/805939474655346758/852574203437121586/902248898683363400
* The `--project-path` parameter is now treated relative to the current working directory in C++ Applications: [Update how Project Filepaths are calculated when not supplied via command line o3de#5194](https://github.com/o3de/o3de/pull/5194) Impactful Change link: https://discord.com/channels/805939474655346758/852574203437121586/905874057998766161
* Rewrote the AzToolsFramework ArchiveComponent to use the AZ::IO::Archive instead of 7za.exe. 7za.exe has been removed from the code base [Archive Component - Rewrite and additional work on Archive and Asset Bundler o3de#4332](https://github.com/o3de/o3de/pull/4332)
* Removes VTUNE profiler hooks from Cry [Removes VTUNE profiler hooks from Cry o3de#5291](https://github.com/o3de/o3de/pull/5291)
* Removes cry load dll functions [Cleanup: Remove cry load dll functions o3de#5295](https://github.com/o3de/o3de/pull/5295)
* Renamed PHYSX_ENABLE_RUNNING_BENCHMARKS to LY_PHYSX_ENABLE_RUNNING_BENCHMARKS [Renamed physx trait to make it consistent and show properly in cmake-gui o3de#5118](https://github.com/o3de/o3de/pull/5118) 
* Removes old "Integ" type of tests [Remove old "Integ" functionality from tests o3de#4688](https://github.com/o3de/o3de/pull/4688)
* Removes crcfix [Remove crcfix o3de#3294](https://github.com/o3de/o3de/pull/3294)
* Changed LY_UNITY_BUILD default to ON [Change LY_UNITY_BUILD default to "ON" o3de#3244](https://github.com/o3de/o3de/pull/3244)
* Removes CryString and related classes [Removal of CryString and related files/classes o3de#2757](https://github.com/o3de/o3de/pull/2757)

## Known issues

* Certain 3rdParty python modules cannot load in the Editor runtime on Linux, which blocks multiple tests using EditorPythonBindings.
* MaterialType Default Values Not Initially Applied. When changing a default material property value, materials may continue using the prior default value.
    [o3de/o3de#5213](https://github.com/o3de/o3de/issues/5213)
* MaterialType New Property Not Initially Applied. When adding new material properties, the Asset Processing may initially fail for material files, and the AP needs a re-scan or restart.
    [o3de/o3de#5215](https://github.com/o3de/o3de/issues/5215)
* Server launchers are manually relocatable. There is currently no automated build or asset layout generation. See instructions here https://o3de.org/docs/user-guide/gems/reference/aws/aws-gamelift/build-packaging-for-windows/ and https://o3de.org/docs/user-guide/gems/reference/aws/aws-gamelift/build-packaging-for-linux (can ignore GameLift specific steps if not relocating to GameLift instances).
* Monolithic release server builds are currently not supported.
* Network entity hierarchies are limited to hierarchies with max count of 16 entities.
* imgui keyboard not working in server launcher
* console is not working on server launcher.
* Legacy GridMate networking layer is still shipped in code, its not recommended for use for networking. See new networking components: https://o3de.org/docs/user-guide/networking/
* Mouse controls are not friendly to working over remote desktop connections. See https://github.com/o3de/o3de/issues/5339. You may need to turn off “'Capture Mouse Cursor” mode in the editor (**Edit -> Editor Settings -> Global Preferences->Camera)**

## Notes

The current version of Open 3D Engine's source code is 2111.1. Check out the [known issues](https://github.com/o3de/o3de/issues/1736) for 2111.1 (sources) and 21.11 (binaries).

**Note**: Source versions use the `XXXX.X` numbering model. Binary releases use the `XX.XX` numbering model, where the decimal place is moved to the left by 2 values from the original source code version, and any values after 4 are truncated.