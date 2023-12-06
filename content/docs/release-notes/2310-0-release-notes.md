---
linktitle: 23.10.0 Release Notes
title: Release Notes for Open 3D Engine 23.10.0
description: Full release notes for Open 3D Engine (O3DE) version 23.10.0.
weight: 895
toc: true
---


**Open 3D Engine (O3DE)** 23.10 release levels up the authoring experience for game creators and robotics simulation developers. In addition to improvements to the core engine, robotics users in O3DE now have an updated ROS2 Gem, a Gem that provides integration with the [Robot Operating System (ROS2)](https://www.ros.org/), which provides drivers, state-of-the-art algorithms, and developer tools for robotics simulations.

## Highlights

Here are some highlights of O3DE 23.10, followed by a detailed list of features broken down by Special Interest Group (SIG).

1. New and Improved Authoring Experiences: Added compact nodes to Script Canvas. These are nodes that handle simple operations and utilize less visual space, making for a more compact and easier to debug graph. 

2. New Document Property Editor (experimental): Default Disabled, The Document Property Editor (DPE) is a new framework that allows tool creators to write editors without having to dive into the complexities inherent in Qt-based UI, element sorting, or user-driven filtering. The DPE allows developers to specify the layout, editing behavior, and general properties of a user interface in an XML-like "document", which the DocumentPropertyEditor widget interprets to create the desired user experience. O3DE's "Console Variables" editor is the first tool to be written using the DPE framework, with experimental support for a DPE-based Entity Inspector debuting in this release, capable of visualizing prefab overrides. How to enable: https://docs.o3de.org/docs/learning-guide/tutorials/entities-and-prefabs/override-a-prefab/#prefab-overrides-in-entity-inspector

3. New Prefab Overrides (experimental): Default disabled, requires DPE to be enabled. Added support for prefab overrides in the new Document Property Editor (DPE) inspector. Prefab overrides are now visible as blue dots in the inspector. Users can see and manipulate overrides on entities at property and component levels. (RFC: https://github.com/o3de/sig-content/issues/112) How to enable: (https://docs.o3de.org/docs/learning-guide/tutorials/entities-and-prefabs/override-a-prefab/#prefab-overrides-in-entity-inspector)

4. Installation and Gem Improvements: Automation to create remote object repos (gems, templates, and projects), making it easier than ever for users to access other users content in O3DE. Linux Snap packages for both Ubuntu 20.04 and 22.04 support, making it easier to install an already compiled version of O3DE on Linux. Many fixes to the installation and setup experience for Linux when utilizing Debian, Snap, or GitHub installation. 

5. Improved ability to export projects created with O3DE for Windows, Linux, Linux Server, and iOS, making it easier to distribute apps privately and publicly. Android project exporting coming soon. Documentation https://development--o3deorg.netlify.app/docs/user-guide/packaging/project-export/ 

6. Many visual and performance improvements to Atom (O3DE graphics and rendering system) including the start of mobile support for iOS/Android. 

7. Enhanced Robotics Features: Substantial improvements to robotic Project Templates. Manipulation template has been added to enable quick start with robotic arms. Templates now also include mini-tutorials that help to guide users through running them with Robot Operating System 2 (ROS 2) packages. Robotic manipulation components have been redesigned for modularity. Added support for prismatic joints. Camera sensor component has improved performance, configurability, and supports adding of noise. Two grippers are now available, finger gripper and vacuum gripper. Added Contact sensor component.

## Features and bug fixes

### sig-build

* Installer
     * Snap packaging updated to support Ubuntu 20.04 and 22.04 (https://github.com/o3de/o3de/pull/16025 and https://github.com/o3de/o3de/pull/16718)
     * Offline installer support (https://github.com/o3de/o3de.org/pull/2445)
     * Removed `[Developer Preview]` from the installer window (https://github.com/o3de/o3de/pull/16825)
     * Removed `pyyaml` from the post install dependencies (https://github.com/o3de/o3de/pull/16395)

* Engine
     * Minimum supported Windows version increased to Windows 10 version 20H2 (10.0.19042) (https://github.com/o3de/o3de/pull/15987)
     * Minimum supported Windows SDK version increased to Windows 10 SDK 10.0.19041.0 (https://github.com/o3de/o3de.org/pull/2442)

* Build
     * 3rdParty package contributions are now built and deployed in Github Actions (https://github.com/o3de/3p-package-source/pull/220)

### sig-content

* Features

     - Prefab Overrides: Added prefab override support on procedural prefabs. Users can make edits in DCC tools that immediately get reflected in the editor while also retaining existing override edits: https://github.com/o3de/o3de/pull/15760
     - Prefab: Added component type-name aliases for components in prefabs: https://github.com/o3de/o3de/pull/15256
     - Editor: Added operation name in undo/redo: https://github.com/o3de/o3de/pull/15146
     - Asset Browser: Added context menu and hotkeys for delete, rename, move, and duplicate operations to table and thumbnail view
     - Asset Browser: Prompt the user to rename a newly created asset
     - Asset Browser: Updated the icons to support high resolutions
     - Asset Browser: Added multi-selection support
     - Asset Browser: Added the asset inspector panel which provides all the details on a selected asset

* Bug fixes

     - Prefab: Blocked cross-prefab reparenting operation in transform component: https://github.com/o3de/o3de/pull/15889
     - Prefab: Removed `EditorEntityId` from serialized content in camera component: https://github.com/o3de/o3de/pull/15785
     - Prefab: Fixed warnings of missing entity referenced from sort order component: https://github.com/o3de/o3de/pull/15827
     - Prefab: Fixed empty component type-name aliases stored in pending and disabled components: https://github.com/o3de/o3de/pull/15985
     - Material Editor: Fixed launch failure when motion matching was enabled
     - Material Editor: Fixed viewport settings inspector data corruption
    
    

### sig-core

- Features
     - Added support for building O3DE with clang-cl that comes with Clang for Windows package that is part of Visual Studio 2022: https://github.com/o3de/o3de/pull/15018
     - Added an LZ4 Compressor/Decompressor support to the Compression Gem: https://github.com/o3de/o3de/pull/15326
     - Added a `createuuid` command to the SerializeContexTools application which allows users to replicate the creation O3DE of AssetID GUIDs using the releative paths of source asset files: https://github.com/o3de/o3de/pull/15344 and https://github.com/o3de/o3de/pull/15664
     - Added a new O3DE Archive Gem which uses a custom archive format for arching content: https://github.com/o3de/o3de/pull/15752, https://github.com/o3de/o3de/pull/16052, https://github.com/o3de/o3de/pull/16129. RFC (https://github.com/o3de/sig-core/pull/55)
     - Added Cross-Platform functions for querying OS environments variables `AZ::Utils::GetEnv` and `AZ::Utils::IsEnvSet` : https://github.com/o3de/o3de/pull/15842
     - Added support to CMake to add a Gem's variant DSO/DLL dependencies to be added to dependent Gems based on their `gem.json` "Dependencies" field : https://github.com/o3de/o3de/pull/15937
     - Updated the `o3de` CLI register command and CMake to automatically generate a CMakePresets file when registering or configuring a project for the first time. This allows projects to use the pre-made engine presets for configuring and building o3de: https://github.com/o3de/o3de/pull/15984
     - Added a `create-repo` and 'edit-repo` commands that allows the creation of a repo.json file that can point to remote repository of O3DE artifacts: https://github.com/o3de/o3de/pull/16090 and https://github.com/o3de/o3de/pull/16130
     - Added per launcher specific Setting Registry support (GameLauncher vs. ServerLauncher vs UnifiedLauncher). Settings Registry filenames support adding a tag `client`, `server` and `unified` to allow them to only load for a specific launcher: https://github.com/o3de/o3de/pull/16137
     - Introduced the `O3DE_BUILD_WITH_DEBUG_SYMBOLS_RELEASE` CMake Cache Variable to allow users to build Release configuration with debug symbols: https://github.com/o3de/o3de/pull/16147
     - Added [Settings Registry chain include support](https://development--o3deorg.netlify.app/docs/user-guide/settings/import-settings-registry/). Settings Registry files now support an `$import` directive to include other settings file: https://github.com/o3de/o3de/pull/16175
     - Added sdformat library to O3DE 3rdParty packages: https://github.com/o3de/3p-package-source/pull/204
     - Added new Quality System to allow developers to define groups of console variables in the Settings Registry that can be applied at runtime based on platform or user preferences: https://github.com/o3de/o3de/pull/16514

- Bug fixes
     - Fixed race condition in Lua debugging, where the Editor could send corrupted packets to the LuaIDE when attempting to step through Lua code: https://github.com/o3de/o3de/pull/15112
     - Updated `lz4` compression library to version 1.9.4: https://github.com/o3de/o3de/pull/15345 (o3de) https://github.com/o3de/3p-package-source/pull/193 (3p-package-source) 
     - Fix startup error in when launching the debug build of ProjectManager due to a dependency on the Python `psutils` module in the o3de CLI scripts, https://github.com/o3de/o3de/pull/15761
     - Added several improvements to launching the Game Launcher on Windows(such as DPI Scaling support, notifications when the window switches between fullscreen and windowed mode, etc...) : https://github.com/o3de/o3de/pull/15860
     - Fixed setting of RPATH paths in MacOS Bundles produced for O3DE Applications: https://github.com/o3de/o3de/pull/15957
     - Fixed detection of incompatible versions between when checking remote Gems: https://github.com/o3de/o3de/pull/15982
     - Updated default project template Asset Processing rules to prioritize assets inside Gems that are inside the project folder so that Gems inside a project folder have the correct relative path:  https://github.com/o3de/o3de/pull/16147
 
### sig-graphics-audio

- Large impact
     - Hybrid SSR-RayTraced Reflections - Added a raytracing pass for high quality hit detection and fallback data for the SSR pass.
     - Vulkan Memory Allocator support - Add VMA library for managing all GPU memory allocations on RHI_Vulkan. This means that that all memory allocations (buffers, images, transient and streaming images) now goes through VMA.
     - Mesh instancing work - This involved creating a new MeshInstanceManager for managing draw packets, adding support for instanced object transforms in shaders, adding support for VisibleObjectLists in the RPI Culling and enabling instanced draw calls in the MeshFeatureProcessor
     - Half float support to the shader pipeline to help with performance on mobile hardware
     - DX12MA support - Enables O3DE to use AMD's D3D12MemoryAllocation library as a replacement for our page sub-allocators for buffer pools.
     - Add support to allow directional cascades to avoid rendering objects that are completely covered in a smaller cascade
     - Support to get screenshot comparison testing for Atom working through the pytest framework.
     - Parts of the Initial framework for multi-gpu work for core RHI backend.

- Medium impact
     - Expanded Bindless support to be data driven amongst other things
     - Emplicit render resolution support for render pipeline which renders to a swapchain.
     - Shadow cascade pass optimization by rejecting more meshes based on frustum intersection between light and camera.
     - Add support to use the PipelineViewTag of a parent pass in the pipeline hierarchy
     - Refactor shading rate image initialization for OpenXr
     - Shader pipeline Optimizations made to the pipeline such that whenever the original *.shadervariantlist file changes, let's say because the user added a new variant, or because the user modified an existing variant, only the new/updated variant will be rebuilt.
     - Shader Management Console - Add support to List all materials which use the selected option as well as added the functionality to process user-provided system option setting files, extension ".systemoptions", live in the same path as the ",shader" file.
     - Volume Texture Support for AttachmentReadback
     - Added Volume(3D) Texture support to StreamingImage
     - Added support for initial visible geometry bus with mesh component controller bindings
     - Adds suport to setup tags on models and textures, which can then be queried and are used here to control min LOD 
     - Added Bilateral Filtering to the SSR roughness blur.
     - Added Downsampled Linear Depth passes.
     - Added support for callable shaders to the RayTracing PipelineState and ShaderTable.
     - Several optimizations and improvements for transparency handling in the DiffuseProbeGrid.

- Low impact
     - Add support for indirect ray tracing to Dx12 and Vulkan RHI backend
     - Add OnObjectSrgCreated event 
     - For terrain use ray traced geometry that should exactly match the geometry in the forward pass
     - MeshMotionVector pass optimization to only render moved or always dynamic meshes to MeshMotionVector pass.
     - Enable the RHI to dump a data file containing the current state of gpu memory allocations in response to asserts & other events.
     - Allow to unregister a View from a pipeline
     - Add API to enumerate RHI factories
     - Add ShadingRate 4x1 and 1x4 support for variable rate shading
     - Add support to consider emissive intensity unit for raytracing materials
     - Add support for the user to switch render pipelines at runtime via Editor and GameLauncher viewport.
     - Refactor Vulkan validation layer loading
     - Add support for multiple shaders in one source file which is applicable to Dx12 RayTracing
     - Add better suport for calculating size of attachments within passes
     - Add support for handling app suspend/resume for Android
     - Add callback when RHI system has been initialized
     - Add progress bar for ddgi bake textures

- Bug fixes
     - Various fixes for cached shadows.
     - Fix material editor/canvas viewport settings inspector data corruption
     - Fix various Vulkan validation errors across multiple pipelines and multiple features.
     - Various fixes related to MSAA
     - Fixing terrain mesh manager cleanup
     - Fix light accumulation in SSR raytraced fallback
     - Fix window resize related crashes on Vulkan
     - Atom Tools: Prevent asset selection widgets from displaying non existent assets
     - Atom Tools: Change file enumeration to add logging and use extension checks instead of wild cards
     - Atom Tools: Change cmake configuration files to create applications instead of executable
     - Fix "Device Lost" error when creating a UI Canvas with a texture larger than the window size.
     - Fix various vulkan crashes for Intel GPUs
    - Remove DX12 descriptor heap compaction as well as disable descriptor allocation if unbounded arrays are not supported
    - Fix the first-time Editor crash bugs
    - Fix issues with Vulkan instance creation if it failed due to a layer or an extension not being present.
    - Fixed indirect indexed draw for DX12
    - Add support to normalize the direction of simple spot lights on the CPU
    - Added AZ Event to notify Directional Light component config changes
    - Fix various issues related to iOS build to be able to run ASV samples on Iphone 8
    - Fix various rendering issue with high DPI
    - Added suport to not crash if a framegraph attachment is unused
    - Improve error-messages for Pass::ProcessConnection
    - Fix a diffuse probe grid issue when frame update count > 1


### sig-network

* Features:
     * Added sv_versionMismatch_check_enabled, allows disabling the server side checking the versions of network components for debugging purposes.
     * Added multi-threaded connection updates on the server to client updates allowing for higher performance. This is turned off by default but can be enabled with sv_multithreadedConnectionUpdates.

* Bug fixes:
    * Fixed an incorrect state on clients when an entity is destroyed.
    * Fixed a crash in NetBindComponent in certain scenarios.
    * Small logging improvements.
    * Fixed code generator for Authority->Server network properties for certain configurations.


### sig-platform

* **Features**

     * Support for Linux ARM64 (Aarch64). Updates and adjustments to support building and running on Linux ARM64 (https://github.com/o3de/o3de/pull/15667)
     * Enable WhiteBox Gem for Android ( https://github.com/o3de/o3de/pull/16283 )
     * Removed runtime system dependencies on OpenSSL to unify debian installer packages (https://github.com/o3de/o3de/pull/16226)

* **Bug Fixes**

     * Build fixes for Linux (https://github.com/o3de/o3de/pull/16559, https://github.com/o3de/o3de/pull/16257, https://github.com/o3de/o3de/pull/15772)
     * Build fixes for Mac (https://github.com/o3de/o3de/pull/16166, https://github.com/o3de/o3de/pull/16151, https://github.com/o3de/o3de/pull/15957)
     * Build fixes for iOS (https://github.com/o3de/o3de/pull/16357)
     * Fix Android window desctruction when suspendinng (https://github.com/o3de/o3de/pull/16363)
     * Linux Debian & SNAP installer fixes (https://github.com/o3de/o3de/pull/16275, https://github.com/o3de/o3de/pull/16025, https://github.com/o3de/o3de/pull/15977)
     * Fix Linux Game Mode esc functionality (https://github.com/o3de/o3de/pull/16074)


### sig-simulation


**Robotics gems (o3de/o3de-extras):**
Over 100 PRs merged in total for 23.10.
* **Summary of changes:**
     - Substantial improvements to robotic Project Templates. Manipulation template has been added to enable quick start with robotic arms. Templates now also include mini-tutorials that help to guide users through running them with Robot Operating System 2 (ROS 2) packages, for example https://github.com/o3de/o3de-extras/pull/450.
     - Robotic manipulation components have been redesigned for modularity, have plenty of extra features such as state, error and feedback publishing, and better handling overall for the FollowJointTrajectory action server. Any joint system can be simulated now, and components work with articulations as well as classic joints. These manipulation components now support prismatic joints as well.
     - Two grippers are now available, finger gripper and vacuum gripper. They can be controlled through ROS action server. 
     - Robot Import feature was significantly improved and expanded to include a degree of support for **SDFormat** along with URDF. Plugins are now handled during the import and converted to O3DE components such as sensors and robot control.
     - Camera sensor component has improved performance, configurability, and supports adding of noise.
     - Lidar sensor simulation is more modular now, enabling easier change of data acquisition methods (implementations) and sensor models. For example, point clouds can be optionally published in the raycaster to save extra copy, which is used in the RGL Gem. 
     - Contact sensor component has been added (a new sensor).
     - Update of the sensor system abstraction, including support for high-frequency data acquisition through simulation events. It is now easier for developers to add a new kind of sensor.
     - Better implementations for Inertial Measurement Unit and Wheel Odometry sensors.
     - [Warehouse Automation Gem](https://github.com/o3de/o3de-extras/tree/development/Gems/WarehouseAutomation), a new Gem including assets and components for elements such as conveyor belt, proximity sensor, pallets, etc.
     - Numerous bug fixes, improvements to UX and developer interfaces such as component buses for ROS 2 Gem components.

* **PR  list:**
Fixes (excluding less interesting ones such as fixes for compilation or recently introduced feature):
     - https://github.com/o3de/o3de-extras/pull/347
     - https://github.com/o3de/o3de-extras/pull/353
     - https://github.com/o3de/o3de-extras/pull/379
     - https://github.com/o3de/o3de-extras/pull/361
     - https://github.com/o3de/o3de-extras/pull/354
     - https://github.com/o3de/o3de-extras/pull/378
     - https://github.com/o3de/o3de-extras/pull/394
     - https://github.com/o3de/o3de-extras/pull/393
     - https://github.com/o3de/o3de-extras/pull/404
     - https://github.com/o3de/o3de-extras/pull/416
     - https://github.com/o3de/o3de-extras/pull/400
     - https://github.com/o3de/o3de-extras/pull/427
     - https://github.com/o3de/o3de-extras/pull/434
     - https://github.com/o3de/o3de-extras/pull/431
     - https://github.com/o3de/o3de-extras/pull/443
     - https://github.com/o3de/o3de-extras/pull/455
     - https://github.com/o3de/o3de-extras/pull/473
     - https://github.com/o3de/o3de-extras/pull/501
     - https://github.com/o3de/o3de-extras/pull/498
     - https://github.com/o3de/o3de-extras/pull/494
     - https://github.com/o3de/o3de-extras/pull/511


* **Enhancements:**

     - https://github.com/o3de/o3de-extras/pull/345
     - https://github.com/o3de/o3de-extras/pull/321
     - https://github.com/o3de/o3de-extras/pull/329
     - https://github.com/o3de/o3de-extras/pull/348
     - https://github.com/o3de/o3de-extras/pull/371
     - https://github.com/o3de/o3de-extras/pull/366
     - https://github.com/o3de/o3de-extras/pull/344
     - https://github.com/o3de/o3de-extras/pull/383
     - https://github.com/o3de/o3de-extras/pull/377
     - https://github.com/o3de/o3de-extras/pull/397
     - https://github.com/o3de/o3de-extras/pull/357
     - https://github.com/o3de/o3de-extras/pull/390
     - https://github.com/o3de/o3de-extras/pull/411
     - https://github.com/o3de/o3de-extras/pull/426
     - https://github.com/o3de/o3de-extras/pull/447
     - https://github.com/o3de/o3de-extras/pull/433
     - https://github.com/o3de/o3de-extras/pull/430
     - https://github.com/o3de/o3de-extras/pull/412
     - https://github.com/o3de/o3de-extras/pull/444
     - https://github.com/o3de/o3de-extras/pull/485
     - https://github.com/o3de/o3de-extras/pull/463
     - https://github.com/o3de/o3de-extras/pull/481
     - https://github.com/o3de/o3de-extras/pull/480
     - https://github.com/o3de/o3de-extras/pull/482
     - https://github.com/o3de/o3de-extras/pull/530
     - https://github.com/o3de/o3de-extras/pull/524
     - https://github.com/o3de/o3de-extras/pull/523
     - https://github.com/o3de/o3de-extras/pull/518


* **New Features:**

     - https://github.com/o3de/o3de-extras/pull/347
     - https://github.com/o3de/o3de-extras/pull/325
     - https://github.com/o3de/o3de-extras/pull/327
     - https://github.com/o3de/o3de-extras/pull/368
     - https://github.com/o3de/o3de-extras/pull/335
     - https://github.com/o3de/o3de-extras/pull/386
     - https://github.com/o3de/o3de-extras/pull/341
     - https://github.com/o3de/o3de-extras/pull/403
     - https://github.com/o3de/o3de-extras/pull/391
     - https://github.com/o3de/o3de-extras/pull/388
     - https://github.com/o3de/o3de-extras/pull/369
     - https://github.com/o3de/o3de-extras/pull/399
     - https://github.com/o3de/o3de-extras/pull/409
     - https://github.com/o3de/o3de-extras/pull/367
     - https://github.com/o3de/o3de-extras/pull/343
     - https://github.com/o3de/o3de-extras/pull/432
     - https://github.com/o3de/o3de-extras/pull/418
     - https://github.com/o3de/o3de-extras/pull/419
     - https://github.com/o3de/o3de-extras/pull/398
     - https://github.com/o3de/o3de-extras/pull/446
     - https://github.com/o3de/o3de-extras/pull/457
     - https://github.com/o3de/o3de-extras/pull/331
     - https://github.com/o3de/o3de-extras/pull/439
     - https://github.com/o3de/o3de-extras/pull/450
     - https://github.com/o3de/o3de-extras/pull/460
     - https://github.com/o3de/o3de-extras/pull/471
     - https://github.com/o3de/o3de-extras/pull/453
     - https://github.com/o3de/o3de-extras/pull/440
     - https://github.com/o3de/o3de-extras/pull/491
     - https://github.com/o3de/o3de-extras/pull/506
     - https://github.com/o3de/o3de-extras/pull/505
     - https://github.com/o3de/o3de-extras/pull/516
     - https://github.com/o3de/o3de-extras/pull/515
     - https://github.com/o3de/o3de-extras/pull/503
     - https://github.com/o3de/o3de-extras/pull/497
     - https://github.com/o3de/o3de-extras/pull/526

* **Engine (o3de/o3de)**
     - https://github.com/o3de/o3de/pull/16713
     - https://github.com/o3de/o3de/pull/16573
     - https://github.com/o3de/o3de/pull/16008

## Known issues
- Deleting an entity after attempting to create a cyclical reference between two entities causes Editor to crash CRITICAL https://github.com/o3de/o3de/issues/16843 
- Occasional Crash with Lua on Linux (only seen once) - https://github.com/o3de/o3de/issues/16865 
- On Linux, after critical assets have processed, it can take up to a minute for the editor to launch. 
- Asset Browser tiles are sorting inconsistently based on the tool's width https://github.com/o3de/o3de/issues/16860
- On Linux, the asset browser will sometimes not show assets in a newly created folder. Restarting the editor resolves the problem https://github.com/o3de/o3de/issues/16834
