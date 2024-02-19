---
linktitle: 23.10.1 Release Notes
title: Release Notes for Open 3D Engine 23.10.1
description: Full release notes for Open 3D Engine (O3DE) version 23.10.1.
weight: 895
toc: true
---


The **Open 3D Engine (O3DE)** 23.10.1 fully implements Prefab Overrides and the Document Property Editor (DPE), enabling these by default. The release also simplifies steps for exporting packages, fixes crashes in the Material Canvas, implements Asset Browser optimizations to improve editor startup times in projects with large numbers of assets (e.g. several thousand assets), and ROS2 gem and Robotics Templates bug fixes and improvements.

## Highlights

Here are some highlights of O3DE 23.10.1, followed by a detailed list of features broken down by Special Interest Group (SIG).

1. **Prefab Overrides:** Prefab Overrides are now enabled by default. Addressed several stability, usability, and performance issues.  

2. **Materials and shaders:**
- Material canvas stability improvements, usability fixes, and configuration settings.
- Material canvas base and standard PBR nodes now use the material pipeline system to share shader code, generate fewer files, and look closer to the original material types. Material graph files will not need to be updated but users might need to delete previously generated material and shader files and let material canvas create new ones. It might take longer to process assets and update previews depending on how many material pipelines, platforms, and RHI are enabled. These can be configured in project and asset processor registry settings.
- Fixed material and shader builder warnings, errors, dependency tracking, and problems with consistent reloading that affected iterating on shaders and material types in and out of material canvas.
- Material component generate source materials feature now tracks and displays progress for generated materials to ensure that assets are ready before assigning them. This would previously print several warning messages when assigning unprocessed materials.
- Material component, instance editor, and generate source materials have been fixed to reference original source material types instead of generated files in the intermediate asset folder.
- The Atom instance database and instance id classes were updated with better support for tracking specific versions of assets so that new instances can be easily created when assets reload.

3. **Improved Editor Load Times:** Users with large asset databases have had issues with long startup times in the main editor. These changes add some high level optimizations, caching various values, replacing vectors and linear searches with unordered sets, removing seemingly unnecessary recursion, and other changes.

4. **VS 2022 MSVC 14.38 toolset build fixes (VS2022 17.8.x series)**: QT library is using Microsoft extension for stdext::checked_array_iterator which has been deprecated as part of the MSVC compiler 14.38 toolset.

5. **Improved Terrain feature stability:** Resolved several issues with crashes in the terrain system.

6. **ROS2 and Robotics Templates bug fixes and improvements:** 
- Improved spawn points reflection and handling during Robot Import .
- Made adjustments to the Robot Importer to better handle nested SDFs and OBJ meshes.
- Transform broadcasting is now much faster, resulting in even better performance of multi-robot simulations.
- Enhanced the user experience with robotics project templates by updating readmes and preview images.
- Optimized ROS 2 transform frame publishing.

7. **Added support for the Android Gradle plugin 8.1+:** Enable support for generating Android projects for Gradle 8.0+ and the Android Gradle Plugin 8.1+

## PR's for point release
* https://github.com/o3de/o3de/pull/17165 - Make sure ios export script uses correct asset processor path
* https://github.com/o3de/o3de/pull/17160 - Quality of life improvements for the project export script
* https://github.com/o3de/o3de/pull/17158 - fix instance pointer for EditorData attributes
* https://github.com/o3de/o3de/pull/17155 - Editor material component optimization to only render custom previews if properties are overridden
* https://github.com/o3de/o3de/pull/17154 - Simplifying thumbnail system asynchronous loading.
* https://github.com/o3de/o3de/pull/17153 - Fix AddFileToArchive
* https://github.com/o3de/o3de/pull/17149 - Cherry Pick Updates for Android scripts into the point release
* https://github.com/o3de/o3de/pull/17145 - Point release fix/installer export script support
* https://github.com/o3de/o3de/pull/17140 - Updated Linux GPG key
* https://github.com/o3de/o3de/pull/17139 - fixing material pipeline builder failure caused by relative texture references
* https://github.com/o3de/o3de/pull/17137 - Changing material canvas default sampler settings to common values from preexisting material types
* https://github.com/o3de/o3de/pull/17134 - fixed prefab adapter DOM update to fire regardless of update type
* https://github.com/o3de/o3de/pull/17127 - fixed missed generate source materials function to use progress dialog
* https://github.com/o3de/o3de/pull/17126 - Reduce the gap between DPE property rows
* https://github.com/o3de/o3de/pull/17121 - Fix material component generate source materials warnings/spam caused by assigning assets before they have been added to the catalog
* https://github.com/o3de/o3de/pull/17120 - add material canvas compile graph interval setting
* https://github.com/o3de/o3de/pull/17119 - Fix alpha clipping, cut out, and add opacity factor in material graph based material types
* https://github.com/o3de/o3de/pull/17106 - DPE Inspector support for IndexedChildNameLabelOverride
* https://github.com/o3de/o3de/pull/17104 - Fix performance drop caused by updating material component previews every time the asset load notification is received
* https://github.com/o3de/o3de/pull/17101 - Asset browser optimizations (changing container types, removing recursion, fixing memory leak)
* https://github.com/o3de/o3de/pull/17086 - Increment engine version for point release
* https://github.com/o3de/o3de/pull/17082 - Fix for crash from delayed refresh on deleted adapters
* https://github.com/o3de/o3de/pull/17077 - Fix for DPE widgets being briefly visible during reset
* https://github.com/o3de/o3de/pull/17076 - Properly inherit DescriptorAttributes::ParentContainerCanBeModified attribute
* https://github.com/o3de/o3de/pull/17074 - Fix for "Add Material Component" crash when prefab overrides are enabled
* https://github.com/o3de/o3de/pull/17071 - Prefab override fixes
* https://github.com/o3de/o3de/pull/17069 - Cherry picking material fixes from development into point release 23101
* https://github.com/o3de/o3de/pull/17062 - Fix for typeID in the DPE Inspector
* https://github.com/o3de/o3de/pull/17054 - Add lambda to reject replacement patches on nested rows
* https://github.com/o3de/o3de/pull/17011 - Fix for sequenced container crash in DPE-based Inspector
* https://github.com/o3de/o3de/pull/17008 - Fixed VS2022 17.8.0 and clang compilation of the SceneAPI PairIterato…
* https://github.com/o3de/o3de/pull/17006 - Add AssImp import settings to the Scene Processor
* https://github.com/o3de/o3de/pull/17005 - Fix debug output for scenes when two files with same name but different extensions exist
* https://github.com/o3de/o3de/pull/17004 - Scene Import mesh/material bugfixes
* https://github.com/o3de/o3de/pull/17003 - Consolidate the CreateTestFile function into the AzTest library
* https://github.com/o3de/o3de/pull/16999 - [DPE] Fix handling of pending/disabled components
* https://github.com/o3de/o3de/pull/16993 - Workaround Visual Studio 2019 compiler defect where it warns 
* https://github.com/o3de/o3de/pull/16989 - MSVC 14.38 toolset build fixes (VS2022 17.8.x series)
* https://github.com/o3de/o3de/pull/16988 - Fixed Wwise 3rdParty integration not using VS2022 libraries and fixed Compression gem issue that caused release applications to freeze on start
* https://github.com/o3de/o3de/pull/16973 - Fix asserts/crashes caused by missing component serialized identifiers
* https://github.com/o3de/o3de/pull/16960 - Fix terrain renderer memory trashing
* https://github.com/o3de/o3de/pull/16953 - Fix divide-by-zero bug when surface material size is too large
* https://github.com/o3de/o3de/pull/16952 - Fixing the gradle_windows.cmd script to set the JAVA_HOME env
* https://github.com/o3de/o3de/pull/16944 - Unused variable fix on Linux to point release
* https://github.com/o3de/o3de/pull/16906 - Prefab override cherry-picks, and defaulting DPE editing to "on"

**o3de-extras PR's:**
* [o3de/o3de-extras#588](https://github.com/o3de/o3de-extras/pull/588) - fix lidars in ROSBot prefabs (cherry picked from development with  [o3de/o3de-extras#620](https://github.com/o3de/o3de-extras/pull/620))
* [o3de/o3de-extras#602](https://github.com/o3de/o3de-extras/pull/602) - Change reflect in spawn points (cherry picked from development with  [o3de/o3de-extras#620](https://github.com/o3de/o3de-extras/pull/620))
* [o3de/o3de-extras#598](https://github.com/o3de/o3de-extras/pull/598) - Change spawnning of robots during import (cherry picked from development with  [o3de/o3de-extras#620](https://github.com/o3de/o3de-extras/pull/620))
* [o3de/o3de-extras#583](https://github.com/o3de/o3de-extras/pull/583) - Change kinematic update to pre-simulation (cherry picked from development with  [o3de/o3de-extras#620](https://github.com/o3de/o3de-extras/pull/620))
* [o3de/o3de-extras#584](https://github.com/o3de/o3de-extras/pull/584) - Broadcast transforms en masse. (cherry picked from development with  [o3de/o3de-extras#620](https://github.com/o3de/o3de-extras/pull/620))
* [o3de/o3de-extras#580](https://github.com/o3de/o3de-extras/pull/580) - Updated readmes to include new features, fix typos etc. (cherry picked from development with  [o3de/o3de-extras#620](https://github.com/o3de/o3de-extras/pull/620))
* [o3de/o3de-extras#586](https://github.com/o3de/o3de-extras/pull/586) - Fix template preview images; add obj support to templates' registry. (cherry picked from development with  [o3de/o3de-extras#620](https://github.com/o3de/o3de-extras/pull/620))
* [o3de/o3de-extras#524](https://github.com/o3de/o3de-extras/pull/524) - Add import optimization settings for obj files.
* [o3de/o3de-extras#578](https://github.com/o3de/o3de-extras/pull/578) - Adding UnitTest for verifying import of nested SDF import via the <include> tag
* [o3de/o3de-extras#591](https://github.com/o3de/o3de-extras/pull/591) - Fixed parenting of SDF model and link entity transforms. 
