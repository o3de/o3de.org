---
linktitle: 26.05.0 Release Notes
title: Release Notes for Open 3D Engine 26.05.0
description: Full release notes for Open 3D Engine (O3DE) version 26.05.0.
weight: 882
toc: true
---

# 26.05.0 Release Notes

The O3DE 26.05 release maintains a strong focus on engine stability. Thanks to community feedback over the past months, it provides hundreds of patches to solve reported issues. It also improves the user experience across all bundled tools, and initiates a codebase clean-up to deprecate legacy parts.

But that's not all. This release introduces highly requested preview features, laying the groundwork for further enhancements in the coming months.

Here are the notable [highlights](#highlights) for this release. For a comprehensive breakdown, jump to the [full list of changes](#full-list-of-changes), which is organized by Special Interest Group (SIG) and includes links to the relative Pull Requests (PRs).

To start using O3DE 26.05, follow the steps on the [Get Started](https://docs.o3de.org/docs/welcome-guide/setup/) page. Then, you can start building a new project choosing from one of the [provided templates](https://docs.o3de.org/docs/learning-guide/samples/templates/), or explore a pre-made example for [games](https://docs.o3de.org/docs/learning-guide/samples/advanced/) or [robotics](https://docs.o3de.org/docs/learning-guide/samples/robotic).

# Highlights

- **Introducing the Open Particle System**. O3DE now contains a new gem for authoring visual effects (VFX) using particles. It provides a simulation runtime that is directly integrated with the Atom render, a dedicated editor that can be used for previewing particles during their creation, and several examples to demonstrate the included capabilities. Three particle types are supported - sprite, ribbon and mesh - and several modules can be applied to affect their behaviors (e.g. color, force, speed). See more details in the [dedicated section](https://docs.o3de.org/docs/user-guide/visualization/particles/) of the documentation site.

  Please note that this gem is still at an **experimental** stage, and its usage in production is discouraged. The gem may be subject to impactful changes in the near future, and new additional capabilities may be introduced. Any feedback is highly welcome for improving the general quality and stability of this new gem.

- **Creating C++ Components from the Editor**. When developing custom components, there is no more need for accessing the command-line interface (CLI), or copy-paste existing files. A new graphical tool has been added to simplify the addition of new C++ components to projects. It can be accessed directly from the Editor using the `File > New Component` menu option, and it will take care of all scaffolding (creating header/source files, registrating them with the build system, etc.).

- **Propagating Activation throught the Entity Hierarchy**. The option for selecting the initial state of an entity has been restored in the Inspector panel. It allows to choose if an entity has to be activated automatically at startup (`Active`), or at a later time by code (`Inactive`). But, as opposite to the past releases, the activation state is now propagated automatically to all descendants, resulting in a full (de)activation of the entire hierarchy. The system can be tweaked at a fine-grained level, using a bitmask for better controlling when a child entity has effectively to be activated or not. Find further details about the new activation system in the [dedicated section](https://docs.o3de.org/docs/user-guide/programming/components/entity-activation-system/).

- **Builder for Generic Assets**. The Generic Asset types, which were already part of the engine, can now opt into an automatic asset bundling, which includes dependency registration and binary conversion for faster loading.

- **Generating Automatic LODs**. When prototyping a scene, it may happen that some models do not contain all the geometries at different Level Of Details (LODs). A new `Auto-Generate Missing LODs` option has been added to the FBX importer to try fixing this scenario. The option has to be activated manually, and allows to generate automatically the missing LODs during the import process.

- **Extending the Display Mapper**. New types have been added to the `Display Mapper` component, in order to support tone mapping  based on *AgX* (in four variants - *Standard*, *Golden*, *Punchy* and *Warm*) and *Khronos PBR Neutral*.

- **Sky Atmosphere as a Dedicated Gem.** The component for rendering a physical-based sky atmosphere is available since O3DE 22.10 as part of the core rendering gems, but not all projects may need it. In order to reduce the final size of exported projects, the `SkyAtmosphere` component and all its render passes are now moved to a dedicated gem, and activated only on-demand. When upgrading to O3DE 26.05, existing projects that are using this component have to activate it manually by [adding the dedicated gem in the project settings](https://docs.o3de.org/docs/user-guide/project-config/add-remove-gems). But no other actions are required - the Asset Processor will take care of redirecting automatically the existing asset references to the new location, without any additional change to existing levels and prefabs.

- **Deprecating PhysX 4**. Back in O3DE 23.05, the support for PhysX 5 was added as an optional alternative over PhysX 4, which has continued to be the default choice for new game-related projects. Starting from this release, all new projects will use PhysX 5 by default, and existing projects are suggested to upgrade to the newer version since the older one will be removed in the next release. In order to assist users during the migration process, a new `upgrade-physx-gem` command is available for converting all component references. It can be accessed from the O3DE CLI as follows: `<engine_directory>/scripts/o3de.<bat/sh> upgrade-physx-gem --project-path <project_directory_to_upgrade>`

- **Supporting ROS2 Lyrical Luth (LTS)**. All gems for robotics have been upgraded and tested against the pre-release version of the recently-released ROS2 Lyrical Luth. This guarantees an adeguate compatibility of all robotics features with the new long-term supported distribution.

- **Upgrading the Simulation Interface**. The reference gem for Simulation Interfaces now provides all the implementation that are required to be compatible with multiple revisions of the specification: 1.4.0, 1.5.0, 1.6.0 and 2.1.0.

- **Supporting the Recent Toolchains**. Several compilation fixes have been added to ensure compatibility with Microsoft Visual Studio 2026 and Clang 17 - 20. Please note that the minimum supported version for this release is still Clang 14, but it will be raised to Clang 18 in the next one.

- **Bundled CMake is now the Default**. O3DE no longer depends on a system-installed CMake package in the installer workflow, or when using the Project Manager to build projects. Instead, it uses the bundled CMake version by default. This improves setup consistency on both Linux and Windows, reduces external prerequisites, and helps avoid build issues caused by mismatched local CMake installations. This can still be overriden if a system CMake is preferred.

# Full List of Changes

## Sig-Core
- Fix an assertion in `ViewManager` class when setting AABB bounds using `SetMin` and `SetMax` methods. [o3de#19189] 
- Fix a compile error when building in release mode on Clang. [o3de#19200]
- Add `[]` operator for all vector and matrix classes. [o3de#19228]
- Fix to support finding Python in `$USERPROFILE` directory. [o3de#19230]
- Fix several compile errors to ensure compatibility with the latest Visual Studio 2026. [o3de#19280][o3de#19758]
- Disable Fast Math on all platforms. In the past versions, it was active by default only on Windows and Android. It can now be enabled via a dedicated CMake option. [o3de#19303]
- Deprecation of legacy classes and functions that are part of `CryCommon`. [o3de#19359][o3de#19369][o3de#19472][o3de#19482][o3de#19484][o3de#19492][o3de#19501][o3de#19502][o3de#19505][o3de#19514]
- Edit `BehaviorContext::IsCallable` function to add the missing `override` keyword. [o3de#19389]
- Fix compile errors when using a C++23 toolchain. This updates improve forward compatibility, but it does not change the default target level (C++20). [o3de#19425]
- Remove `GeometryUtil` files. [o3de#19438]
- Remove stub files of legacy particle system. [o3de#19475]
- Fix several compile errors with Clang-CL on Windows. [o3de#19559]
- Enable CMake Policy CMP0168 when it is available, in order to download `FetchContent` libraries during the configuration phase. [o3de#19563]
- Add a `Policy.cmake` file to decouple CMake policies from the root CMakeLists file. [o3de#19583]
- Optimize `AZ::IO::Streamer` to reduce the latency and improve throughput. [o3de#19632]
- Fix an unexpected behavior when SDK variant is used with Clang 16 (or greater).  [o3de#19692]

## Sig-Build
- Update several external dependencies. [o3de#19180][o3de#19241][o3de#19456][o3de#19471][o3de#19474][o3de#19480][o3de#19487][o3de#19489][o3de#19488][o3de#19520]
- Remove `O3DE.GameLauncher` from the build targets when monolithic mode is used. [o3de#19259] 
- Disable a warning message when WhiteBox gem is enabled. [o3de#19337]
- Improve CMake errors for failed AutoGen expansion. [o3de#19507]
- Add a check of adequate free space in Automatic Review (AR) to fix disk space reallocation issues. [o3de#19531]
- Remove the deprecated shortcut link to `Editor.exe` in Windows installer. [o3de#19542]
- Fix the detection of Ninja when the Script-Only mode is used. [o3de#19548]
- Add an option in build scripts to select gems programmatically without modifying the `project.json` file. [o3de#19555]
- Improve `CompilerLauncher.cmake` to suppport Ninja, Visual Studio and XCode generators. [o3de#19560]
- Fix debug flags for Compiler Launcher on Windows. [o3de#19568]
- Update the Automated Review (AR) to use CMake 4.2.3. [o3de#19578]
- Update the version of bundled CMake to 4.2.3. [o3de#19592]
- Fix a build error in monolithic mode, due to invalid method for including external dependencies. [o3de#19608]
- Fix a link error when building in monolithic mode, due to a circular dependency in Atom. [o3de#19611]
- Fix build errors due to the resolution of full paths on Windows. [o3de#19634]
- Remove the dependency from the `cmake` system package in the Linux installer. It now uses the bundled version of CMake by default. [o3de#19705]
- Fix a link in the Window Installer to open "Terms of Use" in the default browser. [o3de#19727]

## Sig-Content
- Add an option to generate automatically missing LODs when a model is imported. [o3de#18711]
- Add a new interface between Scene API and AssImp, in order support other libraries for importing assets. [o3de#18931]
- Move `Project Settings` menu into `Editor Settings`. [o3de#19143]
- Add a new toggle to invert the zoom direction when using the mouse wheel. [o3de#19170]
- Improve the precision of input values in the `Go To Position` dialog. [o3de#19174][o3de#19185]
- Fix the dropdown selector of Asset Editor to hide abstract classes. [o3de#19181]
- Remove the incompatibility constraint between SimpleMotion and AnimGraph components. [o3de#19192] 
- Add a new GUI for creating C++ components from the Editor. [o3de#19203][o3de#19225]
- Fix a race condition that does not allow Asset Processor to finalize assets when they contain cyclic or missing dependencies. [o3de#19220]
- Fix the Inspector panel to prevent expanding when a prefab uses a long file path. [o3de#19254]
- Fix the selection outline around the component cards in the Inspector panel. [o3de#19258]
- Add a new tab for Windows in `Platform Settings` to select the graphics backend (DirectX 12 or Vulkan) and the validation mode. [o3de#19262]
- Fix a dependency error between jobs in Asset Processor. [o3de#19264] 
- Refactor editor files in the LyShine gem to reduce cyclic inclusions. [o3de#19265]
- Fix to prevent hiding the mouse when a debugger is connected. [o3de#19278]
- Preliminary changes for supporting the upgrade to Qt6 in a future release. [o3de#19282][o3de#19291][o3de#19304]
- Fix procedural prefabs to refresh correctly when a child instance is contained. [o3de#19283]
- Fix a missing assignment of the asset hint value when a new mesh is set, which may lead to undesired overrides in the main level. [o3de#19287]
- Change build script of WhiteBox gem to fetch external dependencies from a repository mirror. [o3de#19316]
- Fix a crah when closing Script Canvas editor as a standalone application. [o3de#19317]
- Add Entity-driven Startup and Hierarchical Activation handling. A new Active State bitmask is used to enable multiple simultaneous active flags. Note that Transform component is now always active during the entity lifecycle to propagate state changes (i.e. it activates at initialization and it is deactivated at destruction). [o3de#19319]
- Fix the initialization of the FFMPEG plugin at start. [o3de#19324]
- Fix column resizing of `Select Joint` dialog in Animation Editor. [o3de#19336]
- Fix keyboard shortcuts that do not work in Script Canvas editor when it is launched as a standalone application. [o3de#19364]
- Remove legacy OpenGL widget in the Animation editor. [o3de#19366]
- Add option in Asset Bundler to save file paths into the generated asset lists. [o3de#19419]
- Fix a warning message that a Parent Entity is missing, due to an invalid check in `PrefabDomUtils` . [o3de#19422]
- Restore the fix for applying the correct coordinate system on the root transform when an FBX animation is imported. [o3de#19440]
- Extend the LookAt component with new options for managing the rotation speed, or disable the rotation on a specific axis. [o3de#19441]
- Add a progress overlay when the Editor is waiting for Asset Processor to compile critical assets, preventing some case of the application being considered unresponsive. [o3de#19513]
- Fix all the usages of `--project-path` where argument values were not wrapped in quotes, in order to support whitespaces within file paths. [o3de#19551]
- Add `ClassWizard` directory to the SDK variant of the engine. [o3de#19561]
- Known working versions of CMake and Ninja Build System are now included in `/CMake/runtime` and `/Ninja` subfolders of the installer. When using the Project Manager to create and build projects, these tools are preferred over the system installed versions, leading to fewer problems with the system environment conflicting with the required build environment of O3DE. [o3de#19564]
- Add a new Generic Asset Builder. It allows Generic Asset Types (an existing feature) to now opt into automatic asset building, which includes dependency registration, and binary conversion for faster loading. [o3de#19572]
- Fix a crash when opening files in Lua editor. [o3de#19589]
- Fix an error message in Asset Processor when a prefab is empty. [o3de#19647]
- Fix a compile error due to an invalid include of `ViewportTitleDlg.moc` file. [o3de#19655]
- Fix a crash when using drag&drop in the ScriptCanvas editor. [o3de#19658]
- Change the behavior of `DeleteFile` method in Asset Processor to succeed when the required file doesn't exist anymore. [o3de#19660]

## Sig-Graphics-Audio
- Add support for Alternate Frame Rendering. [o3de#19060]
- Move `MeshInfo` and `MaterialInfo` structs from the `RayTracing` Feature Processor to the `Mesh` Feature Processor. [o3de#19123]
- Fix importing of blend shapes data. [o3de#19151]
- Convert the remaining Atom library (`Atom_RPI.Public`) to be built as shared library rather than static. [o3de#19166]
- Remove the default constructor of `AZ::RHI::GeometryView`. [o3de#19176]
- Remove `AZ_FORCE_CPU_GPU_INSYNC` macro from public Atom headers. [o3de#19179]
- Update external dependencies of MiniAudio gem to a more recent version. [o3de#19195][o3de#19234]
- Restore the use of render passes without output attachments. [o3de#19196]
- Edit materials to enable the emissive mode automatically when an  emissive color exists. [o3de#19206]
- Fix to limit the number of commands list that are sent to the rendering pipeline. [o3de#19207]
- Edit `GetBufferView` and `GetImageView` methods to use the `const` qualifier. [o3de#19211]
- Add a new native particle VFX solution called Open Particle System. It contains a particle runtime, a dedicated editor for authoring particles and several examples. It supports three types of particles (sprite, ribbon and mesh) and different modifiers (velocity, speeds, forces, etc.). The gem is introduced in preview, and not yet ready for production use. [o3de#19213]
- Fix invalid entries in `RHI::OptionalDeviceExtensionNames`. [o3de#19215]
- Add basic support for Cluster-level Acceleration Structure (CLAS) in Vulkan. [o3de#19218]
- Update Meshlets gem to be compatible with the latest changes of Atom. [o3de#19222]
- Remove declarations of unused functions in Atom. [o3de#19223]
- Add a new Feature Processor for Deferred Materials. The generation of draw packets is controlled by a dedicated CVAR, and it disabled by default. [o3de#19231]
- Edit animated mesh to keep a reference of the original asset. [o3de#19240]
- Edit the creation functions for `BufferViewIndexAndOffset` and `IndexBufferViewIndexAndOffset` to accept `const` arguments. [o3de#19245]
- Several enhancements to integrate the Open Particle System within the engine framework and improve its general stability. [o3de#19248][o3de#19255][o3de#19266][o3de#19301][o3de#19320][o3de#19328][o3de#19338][o3de#19342][o3de#19360][o3de#19370][o3de#19376][o3de#19433][o3de#19655][o3de#19712][o3de#19757]
- Fix to ensure that `MeshInfoManager::m_meshInfoBuffer` is updated when at least one callback returns true. [o3de#19249]
- Remove uneeded `const_cast` expressions in Atom. [o3de#19251]
- Expose the underlying containers of GraphData nodes in SceneAPI, and remove control points from `MeshData` and `BlendShapeData`. [o3de#19297]
- Fix a crash when enabling ray-tracing for DebugOBB shapes. [o3de#19298]
- Add new tone mappers for AgX (four variants) and Khronos PRB Neutral. They can in be used as alternative of the existing ones (ACES). [o3de#19312]
- Improve error messages when Buffers are accessed outside their bounds, or do not match the expected stride size. [o3de#19344] 
- Fix a crash when previewing depth images with the Atom Pass Viewer. [o3de#19367]
- RayTracingDebug component now also supports visualizing the emissive color and irradiance color of surfaces being sent to the GPU. [o3de#19387]
- Diffuse Probe Grid component was not taking into account light sources, only sky lighting. It now takes into account all bounce lighting from light sources and emissive sources. [o3de#19388]
- Edit the Asset Processor to return an error when a shader file (`.azsl` or `azsli`) contains a `#include` statement with an invalid file path. [o3de#19315][o3de#19393]
- Fix the position of debug text in 3D scenes. [o3de#19414]
- Edit `SceneGraph::Find` to use the `const` qualifier. [o3de#19421]
- Add a new Unlit material type. [o3de#19427]
- Fix a compilation error due to an implicit narrowing from 64-to-32 bits in IndexBufferView. [o3de#19437]
- Expose `GetExposure` / `SetExposure` methods of ImageBaseLight component to scripting. [o3de#19476]
- Fix import of meshes with keyframes that could result in a wrong transform. [o3de#19478]
- Move SkyAtmosphere component out of Atom and into its own gem. You will need to activate this gem in projects that use SkyAtmosphere, but existing levels are unaffected since the serializer will point automatically to the new location. In projects that did not use it, it will reduce the overall size of your project's shipping image. [o3de#19479][o3de#19490][o3de#19494][o3de#19547]
- Change all definitions of named colors in `AZ::Colors` to use `AZ::u8` rather than `float`. [o3de#19522]
- Fix to reduce the moire pattern by enabling the anisotropic filtering. [o3de#19524] 
- Fix a crash when the GPU device does not support Transfer Queue. [o3de#19579]
- Fix compilation of Miniaudio for Mac / iOS platforms. [o3de#19584][o3de#19586]
- Add a warning message that Mesh Render in Open Particle System gem is still unsupported, and some issues may happen on some platforms. [o3de#19596]
- Fix an error message due to a duplicated AssetHandler registration in MiniAudio gem. [o3de#19635]
- Fix a crash when assigning an actor instance to `Actor` component. [o3de#19639]
- Fix a crash occuring when actor instances are invisible, or the actor mesh is not valid. [o3de#19646]
- Fix a massive slowdown when `SetMaterialProperties` method is used every frame. [o3de#19701]

## Sig-Platform
- Make Restricted objects completely optional. [o3de#19080]
- Reduce the verbosity level of messages related to missing Restricted objects. [o3de#19204]
- Fix several build errors on macOS platform. [o3de#19445]
- Add placeholders to support external dependencies of macOS (ARM64). Note that this is just a preliminary step, which will be extendend in future releases. [o3de#19466]

## Sig-Simulation
- Add a field to control the playback speed of animations. [o3de#19173]
- Add a deprecation notice for PhysX 4 gem. A new `upgrade-physx-gem` tool is available to upgrade existing projects to PhysX 5. [o3de#19582][o3de#19588]
- Mitigate a physics performance regression caused by VHACD decomposing meshes into far too many convex hulls compare to before. The default budget is now set to 8 convex hulls, but it can be manually increased for specific scenarios. [o3de#19651]
- Fix `SimpleMotion` component to be able to play an animation multiple times. [o3de#19673]
- Fix an incorrect representation in Editor of `CharacterController` component when a not-default scale is applied. [o3de#19703]
- Edit `RigidBody` component to allow forcing a new transform value without disabling the physics simulation. [o3de#19706]
- Add an offset property to `Articulation` component to support an initial position of joints. [o3de#19708]
- [ROS2] Add support for ROS2 Lyrical Luth.
- [ROS2] Add support for ROS2 node args with registry.
- [ROS2] Various fixes: subscription handler, namespaces handling, rigid bodies handling.
- [ROS2Controllers] Add optional setpoint articulation. 
- [ROS2COntrollers] Various fixes: setpoint articulation, JointsPositionComponent, PID reflection.
- [SimulationInterfaces] Add support for simulation_interface 1.4.0/1.5.0/1.6.0 and 2.1.0.
- [SimulationInterfaces] Add support for SpawnEntities.srv.
- [SimulationInterfaces] Add support for INVALID_POSE.
- [SimulationInterfaces] Add API for reverse lookup for simulated entities.
- [SimulationInterfaces] Add batch spawn entities.
- [SimulationInterfaces] Add notifications for state changes.
- Robotic asset Gems and templates: update ROS2 exaples, cleanup prefabs.

## Sig-Testing
- Fix crashes and memory errors in the benchmarks for `AzCore` features. [o3de#19209]
- Add new unit tests for `AZStd::copy_backward`. [o3de#19284]
- Fix a compile error due to an unused variable in tests for `MeshOptimizer` component. [o3de#19323]
- Fix `AzTestRunner` for running tests on projects using the SDK variant of the engine. [o3de#19739]

