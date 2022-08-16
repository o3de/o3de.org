---
linktitle: 2111.1 Release Notes
title: Release Notes for Open 3D Engine 2111.1
description: Find out what was delivered in O3DE 2111.1
weight: 899
toc: true
---

Good news, everyone! The Open 3D Foundation is proud to announce that we've delivered our first stable release of Open 3D Engine (O3DE), version 2111.1.

## Highlights

### Open 3D Engine binaries installer

There's now a binary installer for Windows for Open 3D Engine! Now you can try out our creative tools without building from source every time. This model - sometimes called "Open 3D Engine as an SDK" or "Open 3D Engine toolkit" - delivers pre-built binaries, DLLs, and headers which you can use for local development. For users who want to try out our tools without going through build time iterations, or are only interested in seeing how to write Gems and extensions to O3DE which don't require core source changes, the installer is an ideal new way to try out these workflows and find issues with us.

For everyone who's joining us as a creative worker in simulations and games eager to try out Open 3D Engine: Please keep in mind our journey is just beginning! Don't expect to make a full, production-ready game in O3DE - yet. Right now we want our community to grow by playing with these tools and giving us feedback that we need to make O3DE a long-term success. That means if you're committed to trying the binary installer, be prepared for hiccups as you work, and be ready to file bugs (or maybe even make a code contribution!) as you encounter issues.

Want to try it? [Download the Windows installer for O3DE Stable 21.11!](https://o3debinaries.org/download/windows.html)

{{< note >}}
For this release of O3DE, we're using two version numbers due to some technical limitations of Windows that we're working on resolving. The source releases of O3DE are versioned **2111.1**, and binary installers are named **Stable 21.11**.
{{< /note >}} 

### Linux support

Open 3D Engine is now considered to be available in preview for Linux! Don't expect to have support for everything you need quite yet, and we're still making sure that all the bugs and issues are ironed out, but you can now run O3DE client applications and runtimes - like the O3DE Editor itself - on Linux desktop.

![The O3DE Editor running on an X desktop environment on Ubuntu 20.04 LTS (Focal Fossa)](/images/release-notes/2111-1/linux-desktop.png)

Right now we only have official support for Ubuntu 20.04.3 LTS (Focal Fossa) as a pre-built binary debian package. Other Linux systems which meet the [hardware and software requirements](/docs/welcome-guide/requirements/) are considered experimental and may need modifications to successfully run Open 3D Engine. To get started with O3DE on Linux, check out the [Linux install documentation](/docs/welcome-guide/setup/installing-linux). Or, learn how to build O3DE for Linux from source with the [Linux build documentation](/docs/welcome-guide/setup/setup-from-github/building-linux/).

And of course, you can [download the Debian package for Ubuntu 20.04.3 LTS!](https://o3debinaries.org/download/linux.html)

### Atom improvements

Atom, the rendering library that powers Open 3D Engine, has received numerous improvements in this release, too.  Atom is now supported on Linux in a preview state alongside this release's support for the platform! In particular, AZSLc now compiles for Linux, null video devices no longer cause crashes, and [XCB](https://xcb.freedesktop.org/) connection support was added. The Vulkan rendering components of Atom were also all-up improved to help bring Linux support forward.

More than just improvements and new platform support, Atom also now has improved debugging tools! First, the CPU profiler has been elevated to work with all of O3DE, allowing everyone to get more accurate profiling for their runtimes. We've also added support for [renderdoc]( https://renderdoc.org/) and provided a custom GPU visualizer so that you can perform advanced diagnostics on rendering pipelines.

For content creators, Atom now has support for [TressFX 4.1]( https://github.com/GPUOpen-Effects/TressFX/) via the AtomTressFX Gem. With the AtomTressFX Gem, you have the power to create, model, and simulate realistic hair, fur, and other dense thin-volumed surfaces.

### Editor improvements

Open 3D Engine Editor 2111.1 has major improvements across the board in terms of performance and stability, like the rest of the engine, and content creation workflows are getting a lot of attention! Thanks to user feedback and sessions conducted with the O3DE UI/UX Special Interest Group, we collected a number of important adjustments that our community wanted.

Most importantly, prefabs are now represented as a single object in the world, and you must use the **Edit Prefab** action on a prefab in the Editor in order to edit the prefab itself. Prefab editing is available through **double-clicking** on an object in the Editor. While locked to the prefab edit mode, other instances of the prefab visible through the Editor viewport will receive real-time updates.

And another change that we thought was so important that it deserves its own callout: This means is no more "sticky-select" in the Editor by default! You no longer have to double-click when deselecting an entity that you're editing. If you'd like to re-enable this feature, it can be changed in Editor Settings or with the `/Amazon/Preferences/Editor/StickySelect` registry setting.

### Heightfield-based terrain

We now have an experimental terrain system! Even basic terrain is important for designing outdoor environments and larger-scale worlds. The terrain system uses [heightmaps](https://en.wikipedia.org/wiki/Heightmap) to define deformations over a geometric plane to create world terrain. Anyone familiar with heightmaps should be able to play around with terrain now, and we encourage all of our users to try this feature when creating outdoor scenes in Open 3D Engine.

![Heightfield Terrain editing in the O3DE Editor](/images/release-notes/2111-1/terrain.png)

For the full information on implementation progress and the planned design, please see [O3DE SIG-Content RFC #4](https://github.com/o3de/sig-content/blob/main/rfcs/rfc-4-terrain-system.md).

### External Gems support in Project Manager

Open 3D Engine Project Manager now has improvements which allow the support of Gems that exist outside of the official Gem catalog! This feature comes along with the ability to register a source control repository with the Project Manager, and use this as an external source to pull and install Gems for your project. In addition, we've fixed a critical bug: Project Manager now correctly auto-adds and auto-displays Gem dependencies which affect your project configuration.

### Script Canvas performance and editing

2111.1 contains plenty of performance improvements, but one which affects all project runtimes and performance in the Editor is worth calling out. Script Canvas now uses JSON as its file format instead of XML, which gives an average 71% file size reduction. Smaller files means faster loads, too! And not just that, but with the migration away from XML serialization and towards more flexible JSON tools, it's easier than ever to write external tools and scripts that can ingest Script Canvas JSON files.

## Features

### Networking

* Added support for Network Hierarchy of Entities, which provides a way to group network entities to combine their multiplayer input processing. ([RFC](https://github.com/o3de/sig-network/blob/main/rfcs/rfc-net-20211005-2-entityhierarchies.md))
* Added support for networking scripting inputs, which enables extensive use of script canvas to build and run networking scripts ([RFC](https://github.com/o3de/sig-network/blob/main/rfcs/rfc-net-20211005-1-inputscripting.md))
* Added Linux support for Client and Server targets in [O3DE-MultiplayerSample](https://github.com/o3de/o3de-multiplayersample).

#### Cloud Services

* The AWS GameLift Gem is completed and out of preview.
  * Added Linux support
  * Added [AWS GameLift FlexMatch](https://docs.aws.amazon.com/gamelift/latest/flexmatchguide/match-intro.html) support

### Testing

* Parallel Python Test Execution and Standardization - Test Automation Framework that allows for parallel execution of python tests using multiple editor instances
* LyTestTools support for Linux

### Graphics and Audio

*	Add the AtomTressFX hair Gem for cutting edge hair rendering technology based on TressFX 4.1
*	Add support for refresh rate syncing and sync intervals
*	Enable `Azslc` for Linux
*	Add support for xcb connections for Linux/Vulkan
*	Add Renderdoc support via command line
*	Add Pix support via command line
*	Move RHI settings into settings registry
*	Add GPU Buffer/Image memory visualizer
*	AtomStarter game related fixed for mobile
*	Enable PipelineLibrary to support PSO caching for DX12 and Vulkan
*	Promote CPUProfiler from RHI to O3DE
*	Add support for GPU descriptor heap compaction in DX12 
*	Add support for taskgraph to SRG compilation
*	Optimize SRG compilation to allow partial SRG updates
*	Enable parallel encoding for Vulkan
*	Fix numerous Vulkan validation errors
*	Fix null descriptor crash for devices without null descriptor extensions
*	Fixes for managing and creating Vulkan swapchains
*	Fix 3rd party path for Android
*	Improvements to ASV samples for Qualcomm and Mali devices

### Core functionality

* Added Engine SDK layout support for Linux and Mac: [[Linux] Create an Engine SDK Layout that contains the debug, profile and release configurations](https://github.com/o3de/o3de/issues/3189), [[MacOS] Create an Engine SDK Layout that contains the debug, profile and release configurations](https://github.com/o3de/o3de/issues/3192)
* Added support for installing non-monolithic and monolithic artifacts into the same Engine SDK layout: [Add support for installing Monolithic and Non-Monolithic configurations into the same SDK layout](https://github.com/o3de/o3de/issues/3227)
* Added support for installing a Project Game Release Layout(Windows, Linux, MacOS): [Create a Project Game Release Layout](https://github.com/o3de/o3de/issues/3201)
* Added ComponentApplication Lifecycle Events to facilitate startup configuration for the GameLauncher: [o3de/o3de@`b3b646d`](https://github.com/o3de/o3de/commit/b3b646dad9c16d4a93cf1058034329c615c1a54b) 
* Updated the AssetBundler to use AZ::IO::Archive for creation of Pak Files: [Update AssetBundler to use AZ::IO::Archive for creating PAK files](https://github.com/o3de/o3de/issues/3419)
* Improved Error messages in the project's EngineFinder.cmake to help with indicating why the project could not locate the engine: [Improve the errors in EngineFinder.cmake](https://github.com/o3de/o3de/pull/4713)
* Added Multi-Config/Multi-Permutation support to the installer. This adds support for build configurations like debug, profile, release can be placed in the same installer. This also allows non-monolithic(Default) and monolithic(Monolithic) permutations to be added to the installer: [Adding support for multi-config/multi-permutation installer](https://github.com/o3de/o3de/pull/5062)
* Limit the configuration types available in the Engine SDK layout to only the configurations that were built. i.e If the SDK was only built with the profile configuration, only the profile configuration will be available when using the SDK with a project: [Build: Limit cmake build types based on Engine SDK build type](https://github.com/o3de/o3de/issues/2526)
* Added support for importing Json files. [Support for importing Json files](https://github.com/o3de/o3de/pull/4609)
* Better compiler detection on Linux. Passing `CMAKE_C_COMPILER` and `CMAKE_CXX_COMPILER` is no longer required. [Better compiler detection on Linux](https://github.com/o3de/o3de/pull/5376)
* Support for multiple configurations and monolithic into the SDK [Adding support for multi-config/multi-permutation installer](https://github.com/o3de/o3de/pull/5062)
* Adds stack traces to exception handling [Adding stack traces to exception handling in unit tests](https://github.com/o3de/o3de/pull/4708)
* Enabled override/virtual warnings [Enables override/virtual warnings](https://github.com/o3de/o3de/pull/4071)
* Limit configuration types a project sees when using an engine SDK [Limits configuration types a project sees when using an engine SDK](https://github.com/o3de/o3de/pull/4033)
* Enabled format security warnings [Enabling warnings around format security](https://github.com/o3de/o3de/pull/3937)
* Set MSVC compiler into permissive mode [Setting /permissive- to make MSVC more "standard"](https://github.com/o3de/o3de/pull/3701)
* Improvements to input dependency tracking in runtime dependencies [Improves runtime dependencies input dependency](https://github.com/o3de/o3de/pull/3665)
* Enabled multiple warnings in MSVC and Clang [Enabling several warnings on MSVC that are not enabled by default and are good to have](https://github.com/o3de/o3de/pull/3378) [Linux/Clang fix warn-unused and related](https://github.com/o3de/o3de/pull/3376) [Enable warning MSVC 4296: 'operator': expression is always false](https://github.com/o3de/o3de/pull/3352) [SPEC-2513 Last warnings to get to Warning Level 4](https://github.com/o3de/o3de/pull/3033) [SPEC-2513 Fixing w4018](https://github.com/o3de/o3de/pull/2925)
* Adds support to compile with ASan [Adding support for ASan (Windows/MSVC) and fixing AzCore](https://github.com/o3de/o3de/pull/3292)
* Adds helper RUN targets in project-centric workflow [Create RUN target as helpers for the project-centric workflow (#2520)](https://github.com/o3de/o3de/pull/2635)

### Editor and tools

#### Prefabs

* [Focus Mode - Viewport Interaction Model support for Prefabs](https://github.com/o3de/o3de/issues/3445) (first part of [Edit mode - Prefab edit operation](https://github.com/o3de/o3de/issues/3446)) 
* [Enable destroying entities spawned using a spawnable](https://github.com/o3de/o3de/pull/4154) 
* [Provide options to save prefabs when saving levels](https://github.com/o3de/o3de/pull/3440) 
* [Make prefab patch application use a best effort mechanism](https://github.com/o3de/o3de/pull/2110)

#### Terrain

* Experimental Terrain System with mesh, physics and macro material support. This is in an optional Terrain Gem that is disabled by default. [Terrain System](https://github.com/o3de/o3de/issues/1847)

#### Viewport

* Updates to how entity space is handled in the viewport.[Update how World/Parent/Local space function in the viewport](https://github.com/o3de/o3de/issues/3580)
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

### Platforms

* Various Platform Abstraction Layer (PAL) changes required for restricted platforms. 
* Input context component: [Input context component](https://github.com/o3de/o3de/pull/4152)
* Barrier (formerly Synergy) Input Gem: [Barrier (formerly Synergy) Input Gem](https://github.com/o3de/o3de/pull/2336) 
* Added Floor, Ceil, and Round functions to AZ::Vector2/3/4: [Added Floor, Ceil, and Round functions to AZ::Vector2/3/4](https://github.com/o3de/o3de/pull/4470) 
* Add support for a custom path root separator using a trait: [Add support for a custom path root separator using a trait.](https://github.com/o3de/o3de/pull/3678) 
* Change the InputDeviceImplementationRequest to be addressable by an InputDevcieId: [Change the InputDeviceImplementationRequest to be addressable by id](https://github.com/o3de/o3de/pull/2180) 
* Create XCB Connection mechanism for WSISurface implementation for Linux [Create XCB Connection mechanism for WSISurface implementation for Linux](https://github.com/o3de/o3de/pull/2400) 
* Linux Native Window support [Linux native window](https://github.com/o3de/o3de/pull/3975)
* Enable AZSLc and Shader Compilation on Linux [Enable AZSLc and Shader Compilation on Linux](https://github.com/o3de/o3de/pull/2338) 
* Add SPRIVCross package for Linux [Add SPRIVCross package for Linux](https://github.com/o3de/o3de/pull/2233)
* Remove 'AZ_TRAIT_DISABLE_FAILED_ASSET_PROCESSOR_TESTS' trait for Linux [LYN-2705: Remove 'AZ_TRAIT_DISABLE_FAILED_ASSET_PROCESSOR_TESTS' trait for Linux](https://github.com/o3de/o3de/pull/1235) 
* Python3 installation script for Linux machines [Python3 installation script for Linux machines](https://github.com/o3de/o3de/pull/832) 
* Enable Vulkan RHI to build on Linux [LYN-2784: Enable Vulkan RHI to build on Linux](https://github.com/o3de/o3de/pull/267) 
* Implement build project manager build button cross platform [Implement build project manager build button cross platform](https://github.com/o3de/o3de/pull/4248) 
* Implement open in file browser for Linux [Implement open in file browser for Linux](https://github.com/o3de/o3de/pull/4677)

### Build and Install

* Windows installer released for the 2111.1 release
* Windows nightly build installer available for the Development branch
* Debian package for Linux available for the 2111.1 release
* Debian nightly build package for Linux available for the Development branch


## Bug Fixes

### Networking bug fixes

* Fixed dependencies for networking that could crash the Editor: [Open editor crashes](https://github.com/o3de/o3de/issues/5277)
* Enabled tests for HttpRequestor Gem: [HttpRequestorGem's HttpTest is not running and running it fails](https://github.com/o3de/o3de/issues/4687)
* Changed the serialization format for networking to binary to save space and time: [NetworkPrefabProcessor stores the .network.spawnable in JSON causing file bloat](https://github.com/o3de/o3de/issues/4608) 
* Multiplayer network input silently fails unless `LocalPredictionPlayerInputComponent` is attached: [Multiplayer NetworkInput Silently Fails Unless LocalPredictionPlayerInputComponent is Attached](https://github.com/o3de/o3de/issues/3155)

### Audio bug fixes

* Material files are now backward compatible with material property renames, by defining version updates in the `.materialtype` file.
* Reduced build dependencies on .materialtype files so that modifying shader code will no longer cause all .material and .fbx files to reprocess.

### Core Editor and Tools bug fixes

* Resolved issues with required Gems not being treated as required when using an Engine SDK: [Required Gems are not set as required in the SDK Layout build](https://github.com/o3de/o3de/issues/3430)
* Fixed issue "Relocating the Project Game Release Layout outside of the install directory fails to initialize": [o3de/o3de@`6270128`](https://github.com/o3de/o3de/commit/627012840d62a8f10fd6a7c595bac0b68d936f4b)
* Fixed error when launching the Editor through Project Manager on Mac as well as other miscellaneous Project Manager fixes: [[MacOS] Launching Editor from ProjectManager and other misc. fixes](https://github.com/o3de/o3de/pull/5264)
* Fixed level creation on Linux: [Fix level creation on Linux](https://github.com/o3de/o3de/pull/3488)
* Fixed rpaths when using an Engine SDK layout on Linux: [Fix rpaths during o3de sdk install on Linux](https://github.com/o3de/o3de/pull/3370)
* Added fix for Android Monolithic release builds: [Android release/monolithic-release fixes](https://github.com/o3de/o3de/pull/3788)
* Fixed issue where CMake targets which were wrapped in two layers of generator expressions could not be added as dependencies when using an Engine SDK layout: https://github.com/o3de/o3de/pull/2337/files
* Fixes for CMake 3.22rc [Fixes for CMake 3.22rc](https://github.com/o3de/o3de/pull/5314)
* LuaIDE->GridHub dependency added: [Adds LuaIDE->GridHub dependency](https://github.com/o3de/o3de/pull/5229)
* Editor->LuaIDE dependency added: [Makes Editor depend on LuaIDE](https://github.com/o3de/o3de/pull/4514).
* Fixed a problem where XCode generation fails: [[MacOS] Generating XCode solution fails](https://github.com/o3de/o3de/issues/3832).
* Fixed an error where it is not possible to create new Projects: [It is not possible to create new Projects](https://github.com/o3de/o3de/issues/3443).
* Runtime dependencies do not add target file dependencies: [ly_add_target RUNTIME_DEPENDENCIES and ly_add_target_files does not add file dependencies on the TARGET](https://github.com/o3de/o3de/issues/3391).
* Jinja files are not being copied to install layout: [Jinja files are not copied over to the INSTALL install layout when they are PUBLIC files](https://github.com/o3de/o3de/issues/2517).
* Some projects are being re-processed in Visual Studio despite being clean: [Some projects are re-processed in VS despite being clean](https://github.com/o3de/o3de/issues/2288).
* PhysX Gem can't be used as build dependency in engine SDK: [PhysX Gem can't be used as build dependency in engine SDK Part 2](https://github.com/o3de/o3de/issues/2126).
* 3rdParty runtime dependencies copied multiple times: [3rdParty runtime dependencies copied multiple times](https://github.com/o3de/o3de/issues/2045) [PhysX Gem can't be used as build dependency in engine SDK](https://github.com/o3de/o3de/issues/1971).

### Content functionality bug fixes

* Resolved numerous Scaling/DPI issues affecting environments with multiple screens with different DPI settings: [Editor DPI/Scaling Issues](https://github.com/o3de/o3de/issues/3339).
* Prefabs now store entity sort order information correctly: [Fix Entity Outliner sort order with Prefabs enabled](https://github.com/o3de/o3de/pull/5297)
* Thickness of manipulator hit zones is now configurable via a console variable (cvar).
* Added ability to configure manipulator line hitzone thickness.
* Restored lost fix - Asset Processor unresolved product dependency query failed to handle large number of products: [Restore fix lost in merge: [LY-121929] Asset Processor Error : Sqlite…](https://github.com/o3de/o3de/pull/2202).
* Added xml output version of scene `dbgsg` files: [Add serialized output version (xml) of debug scene graph](https://github.com/o3de/o3de/pull/3437).
* Fixed AP handling of cache copy failure: [Fix cache copy failure](https://github.com/o3de/o3de/pull/1457).
* Added early version of procedural prefab support: [Squashed commit of Procedural Prefab work](https://github.com/o3de/o3de/pull/4481).
* Fixed AP handling of absolute path wildcard dependencies: [Convert resolved wildcard paths to relative path before saving in database](https://github.com/o3de/o3de/pull/4574).
* Fixed wildcard source dependencies not refreshing with new files: [wildcard source dependencies not refreshing with new files](https://github.com/o3de/o3de/pull/5054).
* Fixed unit test leaking assert absorber: [Fix Assert Absorber being leaked](https://github.com/o3de/o3de/pull/5176).
* Fixed unit test leaking thread: [Fix test thread being created multiple times](https://github.com/o3de/o3de/pull/5267).
* Fixed AssetBus mutex not being re-locked before modifying the context again: [Fix AssetBus connection policy to re-lock the mutex afterward](https://github.com/o3de/o3de/pull/5575).
* Fixed race condition in asset loading: [Fix insert streaming request failure](https://github.com/o3de/o3de/pull/5604).
* Fixed race condition in asset container loading: [ParallelDeepAssetReferences is failing intermittently](https://github.com/o3de/o3de/pull/5721).
* **Project Manager**
  * Better detection of whether a build fails when building through Project Manager
    * Link to view log while building
    * Showing the build button for projects that need to be rebuilt after a restart of Project Manager
    * Progress bars when deleting and cloning projects
    * Fix text being cut off incorrectly in multiple places in the Gem Catalog
    * Fixed lots of multiple of the same category appearing in the Gem Catalog
    * Fix some instances where building with Project Manager would take a long time with an install build
    * Project Manager window cannot be resized on Mac and Linux.
    * Project Manager window too large for screens under 800 pixels tall: [#3946](https://github.com/o3de/o3de/issues/3946)
    * Project Manager window background transparent on Mac.
    * "Edit Project Settings" menu does not support projects with spaces in the project path
    * Cannot type in "Project Location" field.
    * Crash when Python not found or misconfigured.
    * Quantity of Gems showed is not automatically updated in Project Manager: [#4074](https://github.com/o3de/o3de/issues/4074)
    * Registered external Gems do not show up in Configure Gems when creating a project: [#1965](https://github.com/o3de/o3de/issues/1965)
* **Asset Processor**
  * Fixed an issue where the Editor locks up when using bundle mode, after mounting a bundle that contains a legacy level: [Unlocked a mutex after modifying the associated variable](https://github.com/o3de/o3de/pull/5625).
  * Fixed a failing Asset Bundler periodic test: [Asset bundler test fixes](https://github.com/o3de/o3de/pull/5548).
  * Fixed all errors when using default seeds: [Fixed all errors with default seeds](https://github.com/o3de/o3de/pull/5489).
  * Fixed asset bundles in release builds: [Bundled release build bug fixes cherry picked from development](https://github.com/o3de/o3de/pull/5270).
  * Fixed a crash in the Asset Bundler GUI if you saved a bundle outside the default folder: [Fixed crash if you save a bundle outside the default bundle folder (#4974)](https://github.com/o3de/o3de/pull/5255).
  * Improved error reporting when a node has mixed skinned and unskinned meshes: [Better error reporting on mixing skinned and unskinned meshes.](https://github.com/o3de/o3de/pull/3158).
  * Duplicate blend shape animations are now handled correctly, and fixed a crash with invalid animation targets: [Fixed issues with blend shape animations](https://github.com/o3de/o3de/pull/3080).
  * Updated how nodes are imported from AssImp into O3DE, and how poses are handled. Now all skinned meshes are imported with what Blender calls the "Rest Position": [Updated skeleton logic:](https://github.com/o3de/o3de/pull/2957).
  * Fixed an issue where sometimes scene processing would run the wrong Python script on a processed scene file.
  * [Cleared m_scriptFilename between loading scene files.](https://github.com/o3de/o3de/pull/2278).
  * Sped up sqlite `BuilderGuid_Source_SourceDependency` index: [SQLite BuilderGuid_Source_SourceDependency Index is slow](https://github.com/o3de/o3de/pull/3648).
  * Asset bundler tests no longer time out: [asset bundler tests timing out](https://github.com/o3de/o3de/pull/3356).
  * Fixed failing periodic Asset Pipeline tests that were timing out and using the wrong project path: [4 Asset Pipeline Tests are failing in the periodic suite](https://github.com/o3de/o3de/pull/2727).

### Platforms bug fixes

* Miscellaneous bug fixes required for various platforms. 
* Fixed the GameStateSamples Gem: [Fix the GameStateSamples Gem and remove an unused variable from DebugConsole.h](https://github.com/o3de/o3de/pull/3347).
* Moved the ShaderMetrics.json file to the [@user@](https://github.com/user)@ folder: [Put the ShaderMetrics.json in the @user@ folder.](https://github.com/o3de/o3de/pull/4402).
* Fixed a bug where the game launcher log is saved with the wrong file extension": [Fix "GameLauncher Log is Saved with Wrong File Extension" (LYN-3972).](https://github.com/o3de/o3de/pull/1984).
* Increased the max time in the iOS run loop from `DBL_EPSILON` to one millisecond (1ms): [Increase the max time in the iOS run loop.](https://github.com/o3de/o3de/pull/4580).
* Fixed a bug in `LocalFileIO::ConvertToAliasBuffer` when a resolved alias ends in a path separator: [Fix bug in LocalFileIO::ConvertToAliasBuffer when a resolved alias ends in a path separator.](https://github.com/o3de/o3de/pull/5136).
* Ensured both `FilePathKey_ProjectUserPath` and `FilePathKey_ProjectLogPath` are set to a writeable storage location on non-host platforms: [Add support for a custom path root separator using a trait.](https://github.com/o3de/o3de/pull/3678).
* Fixed the O3DE Editor launcher for LuaIDE on Linux: [Fix the Editor launcher for LuaIDE on Linux](https://github.com/o3de/o3de/pull/3407).
* Fixed a Linux/Vulkan/Editor crash on startup: [Fix for Linux/Vulkan/Editor crash on startup](https://github.com/o3de/o3de/pull/2632).
* Fixed RPATH issues for qt/plugin binaries: [Fix RPATH issues for qt/plugin binaries](https://github.com/o3de/o3de/pull/2018).
* Fixed a crash encountered on Linux when launching Project Manager from the O3DE Editor: [Linux fix launch project manager from editor](https://github.com/o3de/o3de/pull/4105).
* Fixed a LuaIDE crash at startup caused by missing the System Allocator Initialization step: [Fix LuaIDE crash at startup caused by missing System Allocator Initialization](https://github.com/o3de/o3de/pull/4130).
* Fixed failed 'server' platform assets related to shaders on Linux: [Fix failed 'server' platform assets on Linux related to Shaders](https://github.com/o3de/o3de/pull/4275).
* Updated the Material Editor launcher to use platform traits for executable extensions: [Update MaterialEditor launcher to use platform traits for executable extensions](https://github.com/o3de/o3de/pull/4429).
* Fixed an issue encountered when saving new assets in the Asset Editor on Linux: [Fix Issue saving new assets in Asset Editor on Linux](https://github.com/o3de/o3de/pull/4537).
* Fixed an O3DE Editor crash on Linux when closing a prefab dialog: [Fix prefab close dialog Editor crash on Linux](https://github.com/o3de/o3de/pull/4623).
* Added a fix to prevent using legacy Windows-based logic to create a path on Linux: [Fix to prevent using legacy windows based logic to create a Path on Linux](https://github.com/o3de/o3de/pull/4704).
* Fixed Vulkan issues with VK_ERROR_OUT_OF_DATE caused by the swapchain not being updated on a resize: [Fix Vulkan issues with VK_ERROR_OUT_OF_DATE caused by the swapchain not being updated on a resize](https://github.com/o3de/o3de/pull/4740).
* Fixed launch issues for the Material Editor on Linux: [Linux Fixes for Launching the Material Editor](https://github.com/o3de/o3de/pull/4808).
* Updated the open file limit on Linux for applications: [Update open file limit on linux for applications](https://github.com/o3de/o3de/pull/4878).
* Fixed the Taskbar name and Game Launcher window title to show the name of the project: [Fix to set the Taskbar name and Game Launcher window title to the name of the Project](https://github.com/o3de/o3de/pull/4986).

## Deprecations

* The legacy GridMate networking layer is still shipped, but should not be used for new projects.
* Updated the FileIO Aliases to provide more accurate descriptions of the paths they represent ([Update FileIOAliases to be more accurately indicate which kind of paths they refer to](https://github.com/o3de/o3de/issues/4183)). The following aliases have been removed, and their replacement is listed (if required):
  * `@devroot@` - Use `@engroot@` 
  * `@devassets@` - Use `@projectroot@/Assets`.
  * `@projectcache@`
* AssetProcessor Exclude Filters are now treated relative to the Scan Folder and path separators `/` no longer need to be escaped. ([Reserved keywords in the project path](https://github.com/o3de/o3de/issues/4044)).
* The `--project-path` parameter is now treated relative to the current working directory in C++ Applications. The same applies to the `/Amazon/AzCore/Bootstrap/project_path` settings key. ([Update how Project Filepaths are calculated when not supplied via command line](https://github.com/o3de/o3de/pull/5194))
* Rewrote the AzToolsFramework ArchiveComponent to use `AZ::IO::Archive` instead of `7za.exe`. `7za.exe` has been removed from the code base ([Archive Component - Rewrite and additional work on Archive and Asset Bundler ](https://github.com/o3de/o3de/pull/4332))
* Removed `VTUNE` profiler hooks from Cry ([Removes VTUNE profiler hooks from Cry](https://github.com/o3de/o3de/pull/5291))
* Removed Cry load dll functions ([Cleanup: Remove cry load dll functions](https://github.com/o3de/o3de/pull/5295))
* Renamed `PHYSX_ENABLE_RUNNING_BENCHMARKS` to `LY_PHYSX_ENABLE_RUNNING_BENCHMARKS` ([Renamed physx trait to make it consistent and show properly in cmake-gui](https://github.com/o3de/o3de/pull/5118) )
* Removed old "Integ" tests ([Remove old "Integ" functionality from tests](https://github.com/o3de/o3de/pull/4688))
* Removed `crcfix` ([Remove crcfix](https://github.com/o3de/o3de/pull/3294))
* Removed `CryString` and related classes ([Removal of CryString and related files/classes](https://github.com/o3de/o3de/pull/2757))

## Known issues

* Certain 3rd-party Python modules cannot load in the O3DE Editor runtime on Linux, which blocks multiple tests using *EditorPythonBindings*.
* `MaterialType Default Values Not Initially Applied` error. When changing a default material property value, materials may continue using the prior default value.
  * GitHub Issue: [o3de/o3de#5213](https://github.com/o3de/o3de/issues/5213)
* `MaterialType New Property Not Initially Applied` error. When adding new material properties, the Asset Processor may initially fail for material files, and the AP needs a re-scan or restart.
  * GitHub Issue: [o3de/o3de#5215](https://github.com/o3de/o3de/issues/5215)
* GameLift server launchers are manually relocatable. There is currently no automated build or asset layout generation. See instructions here: [AWS GameLift Gem Build Packaging for Windows](/docs/user-guide/Gems/reference/aws/aws-gamelift/build-packaging-for-windows/) and [AWS GameLift Gem Build Packaging for Linux](/docs/user-guide/Gems/reference/aws/aws-gamelift/build-packaging-for-linux). (You can ignore GameLift-specific steps if you are not relocating your servers to GameLift instances).
* Monolithic release server builds are currently not supported.
* Network entity hierarchies are limited to hierarchies with max count of 16 entities.
* `imgui` keyboard is not working in server launcher.
* `consol`e is not working on server launcher.
* The legacy GridMate networking layer is still shipped in code. We recommend you do **not** use it for networking. Instead, use the new O3DE networking components: [O3DE Networking documentation](/docs/user-guide/networking/).
* Mouse controls are not friendly to working over remote desktop connections. See https://github.com/o3de/o3de/issues/5339. You may need to turn off **Capture Mouse Cursor** mode in the editor (**Edit** -> **Editor Settings** -> **Global Preferences** -> **Camera**)
* On CPUs with 6 or less hardware threads, the Editor may freeze during certain editing scenarios due to running out of internal Job Manager threads.  The number of CPU hardware threads affects the number of Job Manager threads created, which currently has a hard minimum value of 2. At 6 CPU hardware threads, this minimum is reached. The issue can be worked around by creating a `user\Registry\boostrap.setreg` file with the following contents:

  ```json
  { "Amazon": { "AzCore": { "Runtime": { "ConsoleCommands": { "cl_jobThreadsMinNumber": 3 } } } } }
  ```

  This configuration file sets the hard minimum to 3 threads, which ensures that the Job Manager has enough threads to continue processing.
* The O3DE Editor may crash if launched before project assets have been processed and PhysX tab in FBX Settings is used. This is due to the global physics material library asset being not ready to be used.

  To work around this issue, run AssetProcessor to process project assets before launching Editor for the first time. After all assets are processed initially, Editor can be launched without manually running AssetProcessor.

* If the user has previously used O3DE and an `o3de_manifest.json` file exists in their `<user>/.o3de` (Windows) or `$HOME/.o3de` (Linux) directory, when they go to build a project using the current installer version of O3DE, it may fail with an error similar to the following:

  ```cmd
  CMake Error at CMakeLists.txt:10 (find_package):
  By not providing "Findo3de.cmake" in CMAKE_MODULE_PATH this project has
  asked CMake to find a package configuration file provided by "o3de", but
  CMake did not find one.
  Could not find a package configuration file provided by "o3de" with any of
  the following names:
  o3deConfig.cmake
  o3de-config.cmake
  ```

  To work around this issue, perform the following steps:

    1. Go to the `<user>/.o3de` or `$HOME/.o3de` directory (this directory is hidden on some platforms by default) and delete the existing `o3de_manifest.json` file.
    1. Launch O3DE again to create a new one.
    1. Attempt the build again.

  At this point the build should succeed since the only reference is to the currently installed version of O3DE.


## Notes

The current version of Open 3D Engine's source code is **2111.1**. Check out the [known issues](https://github.com/o3de/o3de/issues/1736) for 2111.1 (sources) and 21.11 (binaries).

**Note**: Source versions use the `XXXX.X` numbering model. Binary releases use the `XX.XX` numbering model, where the decimal place is moved to the left by 2 values from the original source code version, and any values after 4 are truncated.
