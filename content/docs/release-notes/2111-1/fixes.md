---
linktitle: Bug Fixes
title: Release Notes for Open 3D Engine 2111.1 - Bug Fixes
description: Bugs fixed in Open 3D Engine release 2111.1.
weight: 2
---

## Networking

* Fixed dependencies for networking that could crash the Editor: [Open editor crashes o3de#5277](https://github.com/o3de/o3de/issues/5277)
* Enabled tests for HttpRequestor gem: [HttpRequestorGem's HttpTest is not running and running it fails o3de#4687](https://github.com/o3de/o3de/issues/4687)
* Changed the serialization format for networking to binary to save space and time: [NetworkPrefabProcessor stores the .network.spawnable in JSON causing file bloat o3de#4608](https://github.com/o3de/o3de/issues/4608) 
* Multiplayer NetworkInput Silently Fails Unless LocalPredictionPlayerInputComponent is Attached [Multiplayer NetworkInput Silently Fails Unless LocalPredictionPlayerInputComponent is Attached o3de#3155](https://github.com/o3de/o3de/issues/3155)

## Graphics and audio

* Material files are now backward compatible with material property renames, by defining version updates in the `.materialtype` file.
* Reduced build dependencies on `.materialtype` files so that modifying shader code will no longer cause all `.material` and `.fbx` files to reprocess.

## Core functionality

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

## Editor and tools

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

### Project Manager

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
    
### Asset Processor

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

## Platforms

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
