---
linktitle: Deprecations
title: Release Notes for Open 3D Engine 2111.1 - Deprecations
description: Features and capabilities which are deprecated in Open 3D Engine release 2111.1.
weight: 3
---

* The legacy GridMate networking layer is still shipped, but should not be used for new projects.
* Updated the FileIO Aliases to provide more accurate descriptions of the paths they represent ([Update FileIOAliases to be more accurately indicate which kind of paths they refer to o3de#4183](https://github.com/o3de/o3de/issues/4183)). The following aliases have been removed, and their replacement is listed (if required):
  * `@devroot@` - Use `@engroot@` 
  * `@devassets@` - Use `@projectroot@/Assets`.
  * `@projectcache@`
* AssetProcessor Exclude Filters are now treated relative to the Scan Folder and path separators `/` no longer need to be escaped. ([Reserved keywords in the project path o3de#4044](https://github.com/o3de/o3de/issues/4044)). 
* The `--project-path` parameter is now treated relative to the current working directory in C++ Applications. The same applies to the `/Amazon/AzCore/Bootstrap/project_path` settings key. ([Update how Project Filepaths are calculated when not supplied via command line o3de#5194](https://github.com/o3de/o3de/pull/5194))
* Rewrote the AzToolsFramework ArchiveComponent to use `AZ::IO::Archive` instead of `7za.exe`. `7za.exe` has been removed from the code base ([Archive Component - Rewrite and additional work on Archive and Asset Bundler o3de#4332](https://github.com/o3de/o3de/pull/4332))
* Removed `VTUNE` profiler hooks from Cry ([Removes VTUNE profiler hooks from Cry o3de#5291](https://github.com/o3de/o3de/pull/5291))
* Removed Cry load dll functions ([Cleanup: Remove cry load dll functions o3de#5295](https://github.com/o3de/o3de/pull/5295))
* Renamed `PHYSX_ENABLE_RUNNING_BENCHMARKS` to `LY_PHYSX_ENABLE_RUNNING_BENCHMARKS` ([Renamed physx trait to make it consistent and show properly in cmake-gui o3de#5118](https://github.com/o3de/o3de/pull/5118) )
* Removed old "Integ" tests ([Remove old "Integ" functionality from tests o3de#4688](https://github.com/o3de/o3de/pull/4688))
* Removed `crcfix` ([Remove crcfix o3de#3294](https://github.com/o3de/o3de/pull/3294))
* Removed `CryString` and related classes ([Removal of CryString and related files/classes o3de#2757](https://github.com/o3de/o3de/pull/2757))
