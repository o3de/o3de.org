---
linktitle: 25.05.0 Release Notes
title: Release Notes for Open 3D Engine 25.05.0
description: Full release notes for Open 3D Engine (O3DE) version 25.05.0.
weight: 888
toc: true
---

# O3DE 25.05.0 Release Notes

Open 3D Engine (O3DE) continues its forward momentum with a new set of updates focused on stability, performance, and overall user experience. As part of these improvements, Trackview has been comprehensively overhauled—thanks to contributions from Tech-Round—and is now fully operational within the O3DE ecosystem. Additionally, performance and usability enhancements to the Atom renderer have been delivered through the leadership of AWS and Huawei.  
For simulation, O3DE now implements the newly standardized simulation interfaces for ROS 2\. This interface standard is a joint endeavor between Open Robotics, Nvidia, and Open 3D Foundation via [Robotec.ai](http://robotec.ai/), to be implemented in upcoming releases of Open 3D Engine, Isaac Sim and Gazebo. (specs: [https://github.com/ros-simulation/simulation\_interfaces](https://github.com/ros-simulation/simulation_interfaces)). Meta has also streamlined the setup process for its Meta Quest Mobile SDK within O3DE. With package management now handled automatically by the 3rdparty packaging system, manual installation steps have been eliminated, improving developer workflow. More than 250 bugs were resolved for this release.

# Sig-Content

* TrackView stabilization and quality of life improvements  
  * Fixed TrackView example Python script  
* Script Canvas:  
  * Fix crash on Script Canvas editor close  
  * Update slot names if the referenced variable is renamed  
  * Fix default file path when saving a new graph  
  * Update the variable's property tree on rename  
  * Fixed issue with promoting variables from a node's slot  
  * Update slot names if the referenced variable is renamed  
  * Fixed deleted, or changed variables being left present in a graph’s variable map which led to many nondeterministic behaviors  
  * Fixed crash when opening invalid ScriptCanvas file  
  * Fixed graph deactivation error “Failed to get user data from graph. Constructed with invalid values”  
* Refactoring the MovieSystem so that it may be moved into a gem  
* Asset Processor analysis regarding how many assets are new files, outdated, have altered dependencies, or have new builders.
* Added filter to prevent the use of reserved words in the project names (e.g. "project", "name", "o3de")
* Fixed the mesh visibility flag that was not restored after loading a level

# Sig-Simulation

* SimulationInterfaces Gem: new Gem implementing standard ROS 2 simulation interfaces  
* ROS2 Gem: added segmentation feature to LiDAR sensor  
* ROS2 Gem: added notification bus to the spawner  
* ROS2 Gem: reimplemented PID controller  
* ROS2 Gem: fixed multiple bugs in ROS2Clock and joint manipulator; removed not working Python tests  
* WarehouseAssets assets-only Gem: meshes and prefabs were optimized  
* LevelGeoreferencing Gem: new Gem was created based on functionality from ROS 2 Gem  
* ProteusRobot assets-only Gem: the Gem was removed, the content was moved to ROS2RobotSamples Gem  
* RosRobotSample assets-only Gem: the Gem was removed, the content was moved to ROS2RobotSamples Gem  
* WarehouseSample assets-only Gem: the Gem was removed  
* Ros2FleetRobotTemplate: the template was simplified (removed render passes, removed one level)  
* Ros2ProjectTemplate: the template was regenerated (new level based on WarehouseAssets instead of WarehouseSample)  
* Ros2RoboticManipulationTemplate: the template was simplified (removed one level, render passes and many assets)  
* Ros2RoboticManipulationTemplate: assets for Panda Franka robot were moved to ROS2RobotSamples Gem
  
# Sig-Core

* RAM reduction by removing legacy asset table  
* Resolved issues with latest stable version of CMake
* Added option for running automated tests against the SDK version of the engine
  
# Sig-Networking

* Fix player spawning when client connects to a server during a server level load  
* AWS cloud service gems moved to separate repo to keep engine agnostic. See [aws/o3de-repo](https://github.com/aws/o3de-repo)  
* Non-monolithic release mode servers supported  
* Fix spawning network prefabs containing more than one entity  
* Multiplayer component autogen throws compile time error if accidentally creating multiplayer components with the same name  
* Game session “level” property added to automatically loading levels when a multiplayer game session begins  
* Better checks and warnings around invalid IP addresses

# Sig-Platform

* Addressed the Python shared library conflict on Linux, which caused segmentation faults when using the ROS2 environment and Ros2 GEM with O3DE.  
* Disabled Android's APK compression, allowing PAK files to load without significant delays or softlocks.  
* Fixed Python script execution errors in the Shader Management Console on Linux, allowing shader variants to be created successfully.  
* Addressed the build failures caused by missing symbols in the AWSNativeSDK version 1.11.288 for monolithic Android builds.  
* Deprecated legacy Android generation, deployment, and unit test scripts in favor of updated o3de.bat commands that support the latest Android SDK and Gradle versions.  
* Addressed the non-public API usage in the AWS Core Gem, allowing iOS games to pass Apple validation.  
* Addressed a mismatch of PAL\_PLATFORM\_NAME and PAL\_HOST\_PLATFORM\_NAME, which caused a CMake error during Android project generation on Linux.  
* Addressed the visibility of UI Editor elements and ensuring proper rendering in the scene.  
* Addressed the system hang on Linux when opening a level in the O3DE Editor.

# Sig-Graphics-audio

## Major features

* **Mature MGPU support**  
  * Major refactor of RHI MultiDeviceObject  
  * Multi-device masks for Images and Buffers  
  * CopyPass support for MGPU  
  * Fix Scope linkage for Scopes running on different devices  
  * Implicitly multi-device RayTracingAccelerationStructurePass  
  * Support inheriting device index from parent pass   
  * Improve frame graph when multi-device features are used  
  * Multi-device support for the BRDF texture generation  
  * Handle multiGPU Passes in ImGui Timestamp View  
  * Improve CopyPass to support device index for queries  
  * Calibrated Timestamps for multi-device timestamp comparability  
* **SubPass support** (40% bandwidth optimization)  
  * Added Subpass support to the RPI as designed here: [https://github.com/o3de/sig-graphics-audio/blob/main/rfcs/SubpassesSupportInRPI/RFC\_SubpassesSupportInRPI.md](https://github.com/o3de/sig-graphics-audio/blob/main/rfcs/SubpassesSupportInRPI/RFC_SubpassesSupportInRPI.md)  
  * Refactor Vulkan RenderPassBuilder to use a RenderAttachmentLayout  
  * Enable specialization constants for all RHI on all platforms  
  * Add support for subpasses to Vulkan and Metal  
* **Function/Specialization shader constants** - Added support for specialization constants for shader options. When using specialization constants there's no need to create a shader variant, the values for shader options are baked at runtime. Also added batching of shader variants as part of the work for using specialization constants. Supported on DX12, Vulkan and Metal.  
* **GeometryView** - Introduced a new class called GeometryView that helps to de-duplicate data between drawItems and drawPackets, as these now hold a pointer to the respective GeometryView, making both DrawPackets and DrawItems smaller in size and thus more cache friendly. Most importantly, it allows index and stream buffers and buffer views to be modified at runtime without having to rebuild DrawPackets/DrawItems.   
* **Vertex color support** - Added vertex color support to the BasePBR, StandardPBR and EnhancedPBR materials. Vertex color can be combined with the base color using a factor and a blending method that can be configured in the material. Vertex color can be enable/disable from the material

## Minor features

### Raytracing

* Implemented "Debug Ray Tracing" component \- Adds the level component "Debug Ray Tracing" which can be used to debug various properties of the ray tracing scene  
* Added Blas compaction for raytracing  
* Added support for one RayTracingAccelerationStructurePass per device   
* Added Indirect Dispatch and updated Fullscreen Dispatch for RPI::ComputePass and RPI::RayTracingPass  

### Pass

* Added a new method: Pass::ChangeConnection for changing how an Input or InputOutput slot is connected to another slot from a different pass.  
* Added ScopeQueries to CopyPass  
* Extended Pass functionality to improve inserting passes.  

### Vulkan

* Improved Vulkan barriers  
* Updated Vulkan Memory Allocator to 3.1.0 release  

### Rendering and Performance

* Enabled interoperability between rendering backends and other APIs  
* Removed static library targets from Atom\_RPI  
* Added Compute Shader support in \*.MaterialPipeline  
* Limited number of worker threads to capacity of m\_workerThreads   
* Added memory heaps for tracking Atom assets  
* Introduced scene/viewsrg\_all.srgi as a wrapper around scene/viewsrg.srgi  
* Added support for non-compositional Universal Scene Description (USD) geometry and animation 
* AR/VR/XR improvements \- The required OpenXR libraries are now automatically handled by the 3rdParty packaging system, voiding the need of manually installing the Meta Quest Mobile SDK, etc.  

## Various other fixes

### Rendering Pipeline

- Allow collapsing all passes in pass tree view 
- Added search bar to ImGui PassTree view
- Fixed Json de-/serialization of BufferAssets
- OcclusionBus improved support for culling by entity ID
- Fix a potential crash if RPI::Buffer is destroyed during upload
- Fixed all scope attachment clear actions except first being ignored
- Fixed issue where transient attachments are recreated
- Fixed some pass attachment binding-related functions not updated to new deque-based storage method
- Fixed a spurious crash with AttachmentReadback
- Fixed deadlocks that occurred on some Atom Sample Viewer (ASV) tests

### Lighting and Environment

- Improved light culling for Disk and Spot Lights
- Fixed shadows not rendering after switching levels
- Fixed Light Culling for Orthographic camera  
- Fixed sky atmosphere for multiple pipelines
- Fixed artifacts that may appear on the terrain when using some AMD GPUs
- Fixed artifacts that may appear on the screen when using quad-lights

### Pipeline State Management

- Fixed multi-threaded creation of PipelineStates in PipelineStateCache
- Added RTACPasses support for multiple devices
- Fixed enabling of DiffuseProbeGrid passes

### Hardware-Specific and RHI Fixes
- Add a mutex to the RHIRequirmentRequest Ebus
- Vulkan specific fixes:
  - Fixed SparseBinding memoryBindings for 3D texture
  - Fixed generating Buffer Barriers for Transient Attachments 
  - Fixed Vulkan version handling
  - Fixed validation error when subpassMergeFeedback is not supported
  - Added RHI HDR support (activated via CVAR)
- DX12 specific fixes:
  - Fixed bindless descriptors
  - Fixed DX12::StreamingImagePool related deadlock

### Performance, Debugging, and Resource Management
- Check count buffer of indirect draw arguments before accessing
- Skip stride size assert when binding a typed buffer
- ImGuiGpuProfiler support to ignore idle pipelines
- Fixed resetting and recording of timestamps

### Shader and Material
- Fixed Material Previews are not showing actual material
- Fixed Shader reload bug
- Fixed race condition related with Material::m_shaderVariantReadyEvent
- ShaderResourceGroupData: Fixed bindless indices for multiple devices
- Added functions StoreToRow/ColumnMajorFloat11 for Matrix3x3 for GPU constant buffer packing
- Bootstrap component running BRDF pipeline in console mode
- Fixed usage of RayTracing feature mask

### Asset System

- Fixed editor crash when importing actor with only blendshapes but no skin weights
- Fixed several issues with importing actor assets

### Validation and Error Handling
- Multiple validation layer errors fixed
- Fixed epsilon of GetInverseTransform function being too large
- Fixed a validation warning due to overlapping attachments in DiffuseProbeGrid and an AZ\_Assert for the AABB BLAS descriptor 
- Fixed validation error of ray-tracing pipeline still in use
- Adapted GpuCrashTracker to aftermath version 2024.2.0

### Platform and Compiler Specific
- Fixed compile errors on Mac and iOS
- Clang 19 fixes

### UI and Interface
- Added option to disable creating a native window for game launchers
- Fixed for LyShine Atlas Support

# AR/VR/XR

* OpenXRVk Gem: OpenXR dependency was updated (1.0.22 \-\> 1.1.41)  
* Improved the installation process for the Meta Quest Mobile SDK for O3DE. Installation is automatic now.

# Sig-docs-community

* Docs now make use of Hugo’s module system for the API docs, as part of the initiative to make docs easier to contribute to. Gone are the days of giant PRs in the o3de.org repository to update the API docs.  
* To that end, there have been some changes to the API docs generation process. Core contributors take note of the documentation for the new process in the sig-docs repo.  
* SIG-Simulation’s new work includes documentation updates for it. 🥳

# Known Issues in 25.05

* Some incompatibility with Clang 19 (or greater) has been reported. It is suggested to use at most Clang 18\. In case your distro is providing a greater version, you can always install an additional suggested version with the following steps: workaround is to downgrade the compiler when installing the engine:  
1. Install the latest compatible version of Clang (e.g. apt install clang-18).  
2. When the engine solution is generated (see *Step 3* at [official docs page](https://docs.o3de.org/docs/welcome-guide/setup/setup-from-github/building-linux)), append the desired compiler version:  
   ```bash
   cmake -B build/linux -S . -G "Ninja Multi-Config" \
   -DCMAKE_C_COMPILER=clang-18 -DCMAKE_CXX_COMPILER=clang++-18  
   ```
* Lua Editor \- Set breakpoints works only when script tab is focused \- [https://github.com/o3de/o3de/issues/18856](https://github.com/o3de/o3de/issues/18856)  
* New project with console errors and warnings \- [https://github.com/o3de/o3de/issues/18861](https://github.com/o3de/o3de/issues/18861)   

# Upcoming Impactful Changes

## Change to material-shaders (scheduled for 25.10.0 release in October 2025)

We are going to introduce several breaking changes to the materials for the 25.10.0 release, expected in October, which will impact material-shaders quite significantly. The first change, [PR 18392](https://github.com/o3de/o3de/pull/18392), encapsulates the material shader parameters into a struct MaterialParameters.

Functions used by the built-in material-types (StandardPBR, BasePBR, etc.) will get an extra parameter, e.g.:  
`VsOutput EvaluateVertexGeometry(VsInput IN, VsSystemValues SV);`

turns into  
`VsOutput EvaluateVertexGeometry(VsInput IN, VsSystemValues SV, const MaterialParameters params)`

and well as several subsequent functions as well. 

Material parameter access now happens with that struct, e.g.   
`float2 baseColorUv \= uvs\[MaterialSrg::m\_baseColorMapUvIndex\];`

will be   
`float2 baseColorUv \= uvs\[params.m\_baseColorMapUvIndex\];`

The struct cannot hold textures or samplers, so we had to replace these with indices and provide functions to fetch them (from the bindless SRG if supported, or from an fixed size array in the MaterialSrg), e.g.

`real3 sampledColor \= GetBaseColorInput(MaterialSrg::m\_baseColorMap, MaterialSrg::m\_sampler, baseColorUv, real3(MaterialSrg::m\_baseColor.rgb), o\_baseColor\_useTexture, uvDxDy, customDerivatives);`

turns into   
`real3 sampledColor \= GetBaseColorInput(GetMaterialTexture(params.m\_baseColorMap), GetMaterialTextureSampler(), baseColorUv, real3(params.m\_baseColor.rgb), o\_baseColor\_useTexture, uvDxDy, customDerivatives);`

If you are using the provided material types, this should have no impact beyond asset reprocessing.   
**MaterialCanvas** \- material shaders need to be regenerated, which happens when you open these materials with the MaterialCanvas editor.

## Change ray tracing RHI descriptors to declarative style (scheduled for 25.10.0 release in October 2025)

[PR18913](https://github.com/o3de/o3de/pull/18913) changes the declaration of the following ray-tracing related classes (and single-device counterparts):
`AZ::RHI::RayTracingBlasDescriptor`,
`AZ::RHI::RayTracingTlasDescriptor`,
`AZ::RHI::RayTracingPipelineStateDescriptor`,
`AZ::RHI::RayTracingShaderTableDescriptor`,
from a builder pattern to a declarative pattern.

Code which uses these ray tracing RHI functions directly needs to be updated to use the new structs.

A potential change could look as follows (eg. DiffuseProbeGridRayTracingPass, a custom ray tracing pass which separate from AZ::Render::RayTracingPass), old version:
```cpp
RHI::RayTracingPipelineStateDescriptor descriptor;
descriptor.Build()
    ->PipelineState(m_globalPipelineState.get())
    ->MaxPayloadSize(96)
    ->MaxAttributeSize(32)
    ->MaxRecursionDepth(MaxRecursionDepth)
    ->ShaderLibrary(rayGenerationShaderDescriptor)
        ->RayGenerationShaderName(AZ::Name("RayGen"))
    ->ShaderLibrary(missShaderDescriptor)
        ->MissShaderName(AZ::Name("Miss"))
    ->ShaderLibrary(closestHitShaderDescriptor)
        ->ClosestHitShaderName(AZ::Name("ClosestHit"))
    ->HitGroup(AZ::Name("HitGroup"))
        ->ClosestHitShaderName(AZ::Name("ClosestHit"))
;
```

New version:
```cpp
RHI::RayTracingPipelineStateDescriptor descriptor;
descriptor.m_pipelineState = m_globalPipelineState.get();
descriptor.m_configuration.m_maxPayloadSize = 96;
descriptor.m_configuration.m_maxAttributeSize = 32;
descriptor.m_configuration.m_maxRecursionDepth = MaxRecursionDepth;

descriptor.AddRayGenerationShaderLibrary(rayGenerationShaderDescriptor, Name("RayGen"));
descriptor.AddMissShaderLibrary(missShaderDescriptor, Name("Miss"));
descriptor.AddClosestHitShaderLibrary(closestHitShaderDescriptor, Name("ClosestHit"));

descriptor.AddHitGroup(Name("HitGroup"), Name("ClosestHit"));
```
