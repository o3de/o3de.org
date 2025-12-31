---
linktitle: 25.10.0 Release Notes
title: Release Notes for Open 3D Engine 25.10.0
description: Full release notes for Open 3D Engine (O3DE) version 25.10.0.
weight: 885
toc: true
---

# 25.10.0 Release Notes
The O3DE 25.10 release is a huge milestone for the Open 3D Engine community. It has more than 100 bug fixes, performance enhancements, and some systems were overhauled to improve usability and user experience. This release is another example of how our developers - from China to India to the United States and Europe - collaborate to advance open source 3D development.

A major highlight of the 25.10 release is the reengineered installation process. Installation now features better reporting, reduced download dependency errors, and no longer attempts to uninstall itself. This allows users to manually install dependencies if needed. Other important changes include:
- A more efficient build process.
- An improved debugging experience (up to 50% reduction in editor memory usage, faster build times when debugging, and a many fold decrease in iteration time, from minutes to seconds).
- Added compatibility with the C++ 20 standard.
- A more dependable asset processor that detects dependencies and is better optimized for performance.

The 25.10 release has an increased variety of frameworks that can be used with O3DE simulations. Additionally, O3DE's robotics components have been split out from the ROS2 gem, offering users better flexibility in how to use these components. Parts of the ROS2 gem have been refactored to improve the user experience for the O3DE community.

Overall, we're excited for the community to enjoy all the bug fixes and optimizations packed into this release - both mentioned here and many more! Thank you to everyone who contributed - as this would have not been possible without you! Your passion, collaboration and leadership has made O3DE what it is today.

# Full list of changes

## SIG-Build
- Port the Automated Review (AR) workflow from Jenkins to GitHub Actions. It uses CCache for transfering artifacts between stages. The current workflow on Jenkins will be deprecated in a future release. [o3de#18605]
- Update third-party dependencies to resolve security notices. [o3de#18742, o3de#18804, o3de#18805, o3de#18806]
- Add support for compiler caching (CCache or SCCache) to MSVC configuration. [o3de#18767, o3de#19158]
- Fix syntax errors in the scripts for configuring an Automated Review build node for Android on Linux. [o3de#18784]
- Fix warning messages in Clang due to unused variables. [o3de#18845, o3de#18914, o3de#19049]
- Increase the timeout when testing the read / write operations for binary files. [o3de#18895]
- Fix a warning message (CMP0175) in CMake 3.31 (or greater) due to invalid parameters in `add_custom_command` function. [o3de#18966]
- Add options for disabling unneeded platforms when running the Automated Review workflow. [o3de#18967]
- Fix compile errors on recent versions of MSVC and Clang. [o3de#18979, o3de#18994, o3de#19086, o3de#19150, o3de#19152, o3de#19163, o3de#19197, o3de#19200, o3de#19247]
- Fix a warning message (CMP0177) in CMake 4.0 (or greater) due to not-normalized file paths in the SDK installation. [o3de#19001]
- Add optimizations to the caching strategy of the Automated Review workflow to improve build performance and configuration flexibility. [o3de#19010]
- Remove the retry action and Android dependencies from the Automated Review workflow on Windows. [o3de#19035]
- Improve the output log when CMake is configuring a new project by showing basic information about the system and progress updates. [o3de#19089]
- Improve timeout and other settings of the cache of the Automated Review workflow. [o3de#19090]
- Use the compressed version of third-party packages in the Automated Review workflow to reduce possible failures. [o3de#19104]
- Upgrade the codebase to C++20 standard. [o3de#19125] 
- Add support for Microsoft Trusted Signing when generating the Windows installer. [o3de#19133]
- Remove the `AZ_PUSH_DISABLE_DLL_EXPORT_BASECLASS_WARNING` macro. [o3de#19155]
- Remove the `AZ_PUSH_DISABLE_DLL_EXPORT_MEMBER_WARNING` macro. [o3de#19160]
- Re-enable the `deprecated-this-capture` warning on MSVC and Clang. [o3de#19165]
- Fix a compile error when building monolithic builds on Windows due to `AZ_BUDGET` macro. [o3de#19169]
- Remove `no-relaxed-template-template-args` option on Clang. [o3de#19177]
- Fix an error when installing third-party dependencies that require patches but Git is not found in the system. [o3de#19184]
- Add an option to choose the preferred version of Gradle in the Automated Review workflow. [o3de#19242]
- Disable build targets for Script-Only mode when compiling the engine in monolithic mode. [o3de#19259]
- Update the minimum required version of CMake to version 3.24. Please refer to the [Additional Notes](#additional-notes) section for further details about upgrading older systems. [o3de#19268]
- Change the Window installer to force completing the installation process even if an optional post-installation step is failing. [o3de#19628]

## SIG-Content
- Add a maximum length for the name when creating a new level. [o3de#6202]
- Fix the option to assign the current graph to any entity that is selected in the Outliner of ScriptCanvas. [o3de#11663]
- Improve labels of Gem Dependencies tab in the Project Manager. [o3de#13132]
- Fix syntax of the link addresses that are pointing to the main documentation. [o3de#15894]
- Add support for wildcard in the asset paths of the seed list for the Asset Bundler. [o3de#18808]
- Add initial support for an external crash-reporting system using the CrashPad library. The feature is still in early-stage and disabled by default at compilation time. [o3de#18631]
- Change the settings for importing assets in order to assume Y as the Up axis when no other coordinate system is defined. The new behavior is disabled by default for existing projects in order to guarantee backward compatibility, and it has to be enabled in the setting registry. [o3de#18686]
- Add initial support for breakpoints in ScriptCanvas. The feature is still in early-stage and disabled by default at compilation time. [o3de#18719] 
- Split the ScriptCanvas Editor from the main O3DE Editor, making it a standalone application. [o3de#18722]
- Update the third-party library for Whitebox gem, and install it from the source code rather than a pre-compiled package. [o3de#18729]
- Fix a performance issue when changing properties of components in the Entity Inspector. [o3de#18732]
- Fix an error that results to import an invalid actor when using the GLB and GLTF formats. [o3de#18800]
- Force the creation of Dynamic Slices in order to be compatible with the UiSpawner component. [o3de#18803]
- Remove deprecated Spawner and RandomTimedSpawner components that are still using Slices. [o3de#18815]
- Change the output of the Asset Processor Batch to be shown as soon as it is generated. [o3de#18817]
- Add an option to select the format type (XML, JSON, binary) for loading / saving asset files that are managed by the Asset Editor. [o3de#18823, o3de#18889]
- Fix the coordinate system of imported animations from FBX files. [o3de#18829, o3de#19016, o3de#19061]
- Add an option to extract embedded textures when importing model assets. [o3de#18844]
- Fix an error that prevents to display gems in the Project Manager after that their version is changed. [o3de#18858]
- Expose the property handlers for UI assets from the LyShine gem, in order to be available also to external gems. [o3de#18876]
- Fix missing default settings when exporting a Script-Only project. [o3de#18888]
- Fix an error that prevents to receive a notification event in ScriptCanvas and Lua when the active camera is changed. [o3de#18892]
- Fix letter case of field labels in the Project Manager to maintain consistency. [o3de#18936]
- Add support for connecting the Lua Editor automatically to the Remote Tools gem in order to use the extended features (breakpoint, class references, etc.) [o3de#18941] 
- Fix the storage of last used asset paths in the Asset Editor. All its settings are now relying upon the Settings Registry. [o3de#18952]
- Add a keyboard shortcut for entering in the Simulate mode. [o3de#18958]
- Fix drag&drop action to create a new ScriptCanvas component when a script file is moved from the Asset Browser to the main Viewport. [o3de#18960, o3de#19025]
- Fix a crash when pressing "Run All Tests" in the Script Canvas Developer gem. [o3de#18963] 
- Fix a tooltip description in the Asset Editor. [o3de#18978]
- Fix a compilation error due to an ambiguous reference in the ScriptCanvas Editor class. [o3de#18990]
- Fix the "Go To Line" dialog in the Lua Editor to get focus automatically when CTRL + G is used. [o3de#19003]
- Fix a crash when trying to save a new Prefab with the same name of a previously deleted one. [o3de#19011]
- Add UiElementGroup component in LyShine gem to enforce the same state (visible, interaction, etc.) on all children recursively. [o3de#19018]
- Fix the alpha property of UI components to use decimal points between 0.0 and 1.0. [o3de#19017]
- Fix field labels of the Entity Inspector to change their background color when matching the current search filter. [o3de#19019]
- Improve the policy for managing critical assets in the job queue of the Asset Processor, in order to reduce the startup time and optimize the CPU usage. Additional options for fine-tuning the job executions are available. [o3de#19024]
- Fix drag&drop action to cancel the operation when an asset is moved to its initial position in the Asset Asset Browser. An additional deadzone is provided to reduce the sensitivity for starting a new action. [o3de#19032]
- Remove deprecated system for generating Console Help. [o3de#19041]
- Remove deprecated dialogs for Level Export and Level Builder that are still using Slices. [o3de#19050]
- Fix settings for opening Lua script files into an external editor. [o3de#19053]
- Fix a potential crash when requesting to process again an asset from the Asset Processor. [o3de#19057]
- Remove deprecated code for calculating intersections and distances. [o3de#19072] 
- Move the lock file of the Asset Processor in a user-space location on Linux. [o3de#19076]
- Fix an invalid job scheduling for processing asset dependencies in the Asset Processor when multiple platforms are enabled. [o3de#19100]
- Remove deprecated code for `AABB` and `OBB` classes. [o3de#19112]
- Remove deprecated code for managing Slices in the Editor and convert the related example files to Prefabs. [o3de#19141]
- Add a confirmation dialog when closing the Project Manager while an action (export or build) is still in progress. [o3de#19142]
- Fix the default Viewport settings to match the Camera component values. [o3de#19144]
- Fix issues with the evaluation of dependencies results when scheduling the jobs of the Asset Processor. [o3de#19182]
- Fix an assertion in `ViewManager` class due to `Aabb::SetMin()` and `Aabb::SetMax()` when using debug builds. [o3de#19189]
- Fix assets that remain pending in the Asset Processor due to missing or cyclic dependencies. [o3de#19220]
- Add support for Optick, Superluminal, and Tracy profilers as optional gems. [o3de-extras#834]

## SIG-Core
- Remove the deprecated `is_pod` trait from AzCore library. [o3de#15892]
- Add support for Unicode UTF-8 symbols in paths of asset file and folders on Windows. [o3de#18741] 
- Fix an error in `deque::at(AZStd::size_t)` function. [o3de#18748]
- Rename `Log2` function to `RequiredBitsForValue`. [o3de#18751] 
- Refactor `BehaviorContext` to move common code from templates to plain functions, in order to reduce the final binary size [o3de#18772, o3de#18814]
- Add `SmoothCriticallyDamped` function to AzCore library. [o3de#18801]
- Fix `Interface<Profiler>` to be used from external gems. [o3de#18902]
- Fix for preserving UTF-8 characters when resolving paths in the cache folder. [o3de#19071]
- Convert core engine libraries (`AzCore`, `AzFramework` and `AzToolsFramework`) to be built as shared libraries rather than static. It provides a reduction in size for compiled binaries and the debug symbol database on all platforms. Please refer to the [dedicated section in "Impactful Changes"](#core-engine-libraries) for further details. [o3de#19111]

## SIG-Graphics-Audio
- Fix the documentation link of the Chromatic Aberration component [o3de#16538]
- Move material parameters from the Shader Resource Group (`MaterialSrg`) to a dedicated structure (`MaterialParameter`). [o3de#18392]
- Split material shaders into two file types: definition and implementation. [o3de#18549]
- Allocate only one queue per queue family on Vulkan. [o3de#18558]
- Add a recreation cache for `ResourceView`s to `Resource`. [o3de#18715]
- Refactor `ResourceView` into a base class for `ImageView` and `BufferView`. Rename `Build*View` to `Get*View`. [o3de#18725] 
- Fix the Deferred Fog component to reload the noise texture only when its settings are changed. [o3de#18726]
- Improve the performance of compiling Shader Resource Groups (SRGs) by reducing the number of allocations. [o3de#18728]
- Improve `ShaderStreamBufferViewsInterface` by adding the ability to query `IndexBufferView` and `StreamBufferView`. Add a new `DrawSrg::m_modelLodMeshIndex` shader constant for returning the sub-mesh index. It is disabled by default for not affecting the material pipeline, and it has be enabled with a shader macro. [o3de#18730] 
- Separate light assignment and shadow evaluation (rendering pipeline) from applying a light to a surface (material). [o3de#18739]
- Add support for Masked Occlusion Culling on Linux. [o3de#18745]
- Fix the clear action for `BufferView` on Vulkan, in order to perform the action only on itself rather than the whole buffer. [o3de#18747]
- Add a new `PassAttachmentBindingList` class to ensure that for-each loops with `m_attachmentBindings` use the correct attachment binding count. [o3de#18749]
- Fix compile error due to missing include of `ShaderResourceGroupPool.h` file on Windows. [o3de#18750] 
- Move `GpuCrashTracker` class for integrating Nsight Aftermath from the global namespace to the dedicated ones of the rendering backends (DirectX 12 and Vulkan). [o3de#18753]
- Fix a crash when Raytracing Debug component is used with the Terrain component. [o3de#18754]
- Fix the Terrain component to be visible to the raytracing. [o3de#18755]
- Fix shaders to include `ParallaxDepth.azsli` only when the parallax is enabled by the material. [o3de#18761]
- Add a macro definition for identifying the material type when the generated shaders of material pipeline are compiled. [o3de#18762] 
- Fix the condition to active an error message about the pass state in `Pass::FrameBegin(...)` method. [o3de#18773]
- Add the support for defining in the `.materialpipeline` assets a list of custom shader constants that have to be added to `DrawSrg`. [o3de#18775]
- Reduce the pre-allocation of memory for requiring less RAM memory on Vulkan. [o3de#18789]
- Fix a large performance drop when multiple GPUs are used. [o3de#18793]
- Remove `OnRenderPipelineChanged` override from `RayTracingDebugFeatureProcessor` class. [o3de#18798]
- Add support for having different values of Shader Resource Group (SRG) constants across different GPUs. [o3de#18816]
- Fix the recreation of Raytracing Top Level Acceleration Structure (TLAS) to avoid happening every frame. [o3de#18843]
- Fix a crash when using Debug Ray Tracing component with a GPU that does not support raytracing. [o3de#18859]
- Allow transient attachments to be on multiple GPUs. [o3de#18877]
- Refactor to duplicate the `RaytracingAccelerationStructure` pass for every GPU where raytracing is enabled. [o3de#18881]
- Disable the compaction of Raytracing Acceleration Structures for models with too many sub-meshes. [o3de#18882]
- Add Motion Blur as a post-processing effect. [o3de#18884]
- Fix values of jittered matrix in `ViewSrg`. [o3de#18906] 
- Change the descriptors of Raytracing classes to use a declarative style. [o3de#18913]
- Fix scope queries to `RayTracingAccelerationStructure` pass when only animated meshes are updated in the scene. [o3de#18934] 
- Add support for shading multiple views at once. [o3de#18946]
- Fix a shading precision issue that causes invalid values on Quest 3. [o3de#18947]
- Add helper functions to debug special values in shaders (not a number, infinite, negative, zero). [o3de#18948]
- Fix compilation errors when disabling `USE_BINDLESS_SRG` macro in `RayTracingFeatureProcessor` class. [o3de#18956]
- Fix methods to get/set lighting channels of Light and Mesh components. All channels are now enabled by default, rather than only the first one. [o3de#18959]
- Fix an error message when using a GPU that does not support raytracing. [o3de#18968]
- Convert `MeshFeatureProcessor::GetDrawSrg()` method to return a constant reference to prevent accidental changes to the source. [o3de#18969]
- Add support for adding GPUs dynamically to the device mask of RaytracingFeatureProcessor. [o3de#18989]
- Optimize the cross-device `CopyPass` by using cross-device resources provided by DirectX 12 and Vulkan. [o3de#18991]
- Fix a crash when using the CubeMap Capture component. [o3de#18992]
- Fix a race condition in `GeometryView` class. [o3de#19009]
- Fix a crash when minimizing the Editor on Windows using Vulkan. [o3de#19038]
- Fix minor errors in the initialization of `RHI::Device` descriptors. [o3de#19059]
- Convert the `RHI::GeometryView` constructor with one parameter to `explicit`, in order to prevent implicit instantiations. [o3de#19067] 
- Fix potential deadlocks in the asynchronous work queue of the rendering pipeline. [o3de#19075]
- Add support for generating bindless indices for structured Buffer Views on Vulkan. [o3de#19077]
- Fix a crash that occurs when meshes in the `RaytraceFeatureProcessor` class are reloaded by the Asset Processor. [o3de#19084]
- Fix a random crash due to `StreamingImage` resources being accessed after free. [o3de#19092]
- Fix the initialization of shared samplers in order to guarantee that it always happens at least once. [o3de#19094]
- Fix job dependencies in order to rebuild Materials only if `.materialtype` file is changed, rather than for every material shader. [o3de#19101]
- Convert the connections of Screen-Space Ambient Occlusion (SSAO) pass from using the global pipeline to parent attachment slots. [o3de#19102]
- Add support for additional raytracing vertex formats. [o3de#19105]
- Enhance the error message when the provided Shader Resource Group (SRG) mismatches the requested from the shader on Vulkan. [o3de#19118]
- Add `CS_SAMPLERS` macro in the material shaders where it is still missing. [o3de#19119]
- Add a `DrawItemType` property to the shaders of every material, in order to provide information about which Draw Item has to be generated. [o3de#19120]
- Fix an assert in order to be triggered only when the maximum number of samplers cannot fit the `SceneMaterialSrg` array. [o3de#19132]
- Restore `SetShaderConstant(...)` function for backwards compatibility with Lua functors of existing user-created materials. [o3de#19134]
- Fix an error that leads to discard Morph Targets data during import. [o3de#19151]
- Convert Atom libraries (`Atom_RHI.Reflect` and `Atom_RHI.Public`) to be built as shared libraries rather than static. [o3de#19154]
- Fix a resource leak when exiting from the Game Launcher. [o3de#19162]
- Fix artifacts that can appear when using the Cloth gem. [o3de#19183]
- Fix a crash on Vulkan when a material tries to access a texture that is not bound yet. [o3de#19233]
- Add components for VR controllers and interaction ray to the OpenXR gem. [o3de-extras#903, o3de-extras#907]
- Convert `XR::Factory::GetPlatformService()` function to return a `Crc32` type. [o3de-extras#934]
- Re-enable OpenXR gem on Linux. [o3de-extras#975]

## SIG-Network
- Change the player ID of `NetworkDebugPlayer` component to `public` in order to be accessible. [o3de#14987]
- Add a comment to clarify that the NetEntityId is the same across all clients and servers. [o3de#15145]

## SIG-Platform
- Fix the display refresh rate that is reported on Linux. [o3de#18576]
- Add a console parameter to manage the ability of resizing a new Game Launcher window on Linux. [o3de#18721]
- Fix invalid sequences of `OnPress`/`OnRelease` events when holding a key on Linux. [o3de#18893]
- Fix an error that prevents receiving the `OnHeld` event when using a gamepad on Linux. [o3de#18933]
- Fix an error that prevents to use custom splash screen and icon on Android. [o3de#19161]
- Fix a crash on Android after resuming the Game Launcher application. [o3de#19186]

## SIG-Simulation
- Update the third-party library V-HACD to 4.1.0, and install it from the source code rather than a pre-compiled package. [o3de#18718]
- Replace math functions of EMotionFX with the ones in AzCore library. [o3de#18763]
- Add a BlendTree node to support FABRIK as Inverse Kinematic (IK) solver. [o3de#18894]
- Add `GetShapeConfiguration()` method to retrieve the configuration of a physics shape without depending on PhysX gem. [o3de#18900]
- Fix implementation of `SetUpDirection(...)` method in the Character Controller component. [o3de#18953]
- Add BlendTree nodes for converting rotations from/to degrees angles. [o3de#19052]
- Fix the Recent Files menu in EMotionFX to show full file paths. [o3de#19093]
- Fix an invalid behavior for updating bounds in Actor component when using a network character. [o3de#19149]
- Create a new ROS2Controllers gem by moving the relative implementation out from the ROS2 gem. [o3de-extras#923]
- Create a new ROS2Robot Importer gem by moving the relative implementation out from the ROS2 gem. [o3de-extras#923]
- Create a new ROS2Sensors gem by moving the relative implementation out from the ROS2 gem. [o3de-extras#923]
- Major refactor of ROS2 Frame system in order to be easier to use and more flexible. [o3de-extras#968]
- Add structures and EBuses to configure ROS2 Sensor components. [o3de-extras#914]
- Add ROS2 Clock system component to expose its request EBus as public API. [o3de-extras#944]
- Add Kinematic and Force modes to the Rigid Body Twist Control component. [o3de-extras#936]
- Disable ROS2ContactSensor and ROS2Spawner components when `gazebo_msgs` package is not available. [o3de-extras#842]
- Multiple fixes in ArticulationLink component. [o3de#19227] [o3de-extras#844]
- Change the behavior of selecting tracking entity for simulated entities. Add additional services and filtering methods to the Simulation Interfaces gem. [o3de-extras#962]
- Add support for Named Poses in the Simulation Interfaces gem. [o3de-extras#908]
- Add support for Worlds in the Simulation Interfaces gem. [o3de-extras#956]
- Add possibility to disable ROS 2 services/actions related to the Simulation Interfaces gem. [o3de-extras#947]
- Update version of `simulation_interfaces` package to 1.1.0. [o3de-extras#976]

## SIG-Testing
- Add parameters for pointing the Asset Processor to a custom location when running test cases on external projects. [o3de#17560]
- Fix errors reported by Address Sanitizer (ASan) on all test cases. [o3de#18702]
- Disable the failing tests for the Automated Review (AR) workflow on GitHub Actions. [o3de#18792]
- Fix `periodic` test. [o3de#19103]
- Temporarily disable tests for `o3de_export_project` on Linux. [o3de#19243]

# Impactful Changes

## Minimum CMake Version
The minimum requirement for **CMake** is now set to version **3.24**, in order to support new changes that were introduced in this release. Most Linux distributions already provide a greater version by default. If you are still using Ubuntu 22.04 LTS, you may need to upgrade your default installation to a more recent version.

## Core Engine Libraries
The main engine libraries are refactored as described in the dedicated [Request for Comments (RFC)](https://github.com/o3de/sig-core/blob/main/rfcs/rfc-core-2025-04-20-shared-az-framework-libraries.md), but these changes should be totally transparent to your project and gem files. The most important advantages are:
- AzCore, AzFramework, and AzToolsFrameworks are now defined as shared libraries (DLLs) for non-monolithic builds. So instead of being purely static libraries that are linked into all modules individually (Tools, Editor, Gems) they will be sharing the same common library at runtime.
- O3DEKernel was a work-around for sharing O3DE environment variables across different modules that were defined in AzCore. Since AzCore is now shared as well, O3DEKernel is no longer needed.
- Debug Symbols for AzCore, AzFramework, and AzToolsFramework are no longer duplicated in each individual PDB / Debug symbols table for each module. They now only exist for their corresponding AZ library, which reduces the symbol file size total significantly.
- This also helps debugging in Linux, as every gem is loaded with their debug symbols individually. Now it is much less likely to run out of memory due to the debug symbols being loaded into memory.
- The total size of the built binaries dropped significantly. The overall saving is 54.50% on Windows and 72.31% on Linux.
- The installer packages reduced by 26% on Windows and by 40% on Linux.

Please refer to the above RFC for before/after comparisons and further technical details.

## Material Pipeline
The Material Pipeline has received several changes in order to enable for supporting multiple material types with Ray Tracing in a future release (see the [Request for Comments(RFC)](https://github.com/o3de/sig-graphics-audio/issues/152/) for further details).

If your project contains only `.material` asset files that rely upon the built-in material types (BasePBR, StandardPBR, etc.), this should have no impact on your files. It is required to ask the Asset Processor to reprocess all the material assets the first time that you open the project after upgrading to 25.10, in order to refresh its cache directory to match the latest changes.

In case you are using Material Canvas to author custom materials, their shader files have to be regenerated again. This process happens automatically when you open the desired custom material in the Graph Editor.

Instead, if you have implemented custom materials using shader files or custom material pipelines that use the existing materials, then there might be higher impacts on your files since some function definitions have been changed. In the following, you can find the most important ones, but please refer to the specific [PR 18392](https://github.com/o3de/o3de/pull/18392), [PR 18549](https://github.com/o3de/o3de/pull/18549), [PR 18739](https://github.com/o3de/o3de/pull/18739) for further details. You can also use `StandardPBR_Defines.azsli`, `StandardPBR.azsli` together with `ForwardPass_StandardLighting.azsli` for guidance, or refer to the [dedicated documentation page)](https://docs.o3de.org/docs/atom-guide/dev-guide/materials/material-pipeline-material-shader-interface) for more details about the new interface.

#### Material Parameters
The material shader parameters are now encapsulated into a `MaterialParameters` struct, which is passed as an extra parameter in the function used by built-in material types. For example:
```cpp
VsOutput EvaluateVertexGeometry(VsInput IN, VsSystemValues SV);
```
turns into
```cpp
VsOutput EvaluateVertexGeometry(VsInput IN, VsSystemValues SV, const MaterialParameters params);
```

Accessing to material parameters now happens with this struct. For example:
```cpp
float2 baseColorUv = uvs[MaterialSrg::m_baseColorMapUvIndex];
```
will be
```cpp
float2 baseColorUv = uvs[params.m_baseColorMapUvIndex];
```

The struct cannot hold textures or samplers, so they are replaced by indices. New functions are provided to fetch them easily (from the bindless SRG, if supported. Otherwise, from a fixed-size array in the `MaterialSrg` struct). For example:
```cpp
real3 sampledColor = GetBaseColorInput(MaterialSrg::m_baseColorMap, MaterialSrg::m_sampler, baseColorUv, real3(MaterialSrg::m_baseColor.rgb), o_baseColor_useTexture, uvDxDy, customDerivatives);
```
turns into:
```cpp
real3 sampledColor ` GetBaseColorInput(GetMaterialTexture(params.m_baseColorMap), GetMaterialTextureSampler(), baseColorUv, real3(params.m_baseColor.rgb), o_baseColor_useTexture, uvDxDy, customDerivatives);
```

#### Material Definitions
The material definitions are splitted into two files (e.g. `StandardPBR.azsli` turns into `StandardPBR_Defines.azsli` and `StandardPBR.azsli`).
The shader template now looks roughly like this:
```cpp
#include MATERIAL_TYPE_DEFINES_AZSLI_FILE_PATH  // "StandardPBR_Defines.azsli", declare structs and defines

#include <ForwardPassVertexData.azsli>          // declare VsInput, VsOut and VsSystemValues
#include <ForwardPassPipelineCallbacks.azsli>   // provide callback functions that use VsSystemValues

#include MATERIAL_TYPE_AZSLI_FILE_PATH          // "StandardPBR.azsli", implement material functions

// Vertex and Pixel - Shader Functions
```

The `VsInput`, `VsOutput` and `VsSystemValues` structs are moved into the `ForwardPassVertexData.azsli`, reacting to defines from the material like `MATERIAL_USE_VERTEX0POSITION`. `ForwardPassPipelineCallback.azsli` contains functions that encapsulate access to SRG members (e.g. `GetObjectToWorldMatrix(VsSystemValues SV)`).

#### Light Evaluation
The light evaluation is now separated from the light assignment and shadow evaluation, making the former part of the materials and the rest part of the render pipeline. In the `LightingData` struct, the `LightinChannelMask` moves to the `Surface` stgructg, and the `tileIterator` moves to a separate parameter.

Then, the render pipeline is now responsible for light assignment and shadows, and the material for PBR light evaluation. The `EvaluateLighting` function moves from the material-specific `BasePBR_LightingEval.azsli` to the pipeline-provided `ForwardPassEvaluateLighting.azsli`, and uses material-provided `InitializeLightingData()` and `FinalizeLightingData()` functions.
The `ApplyPointLights()` functions moves from `PointLights.azsli` to `ForwardPassPointLights.azsli`, where it handles the light assignment. Moreover, the `ApplyPointLight()` function moves to `ForwardPassPointLights.azsli`, but now only handles the shadow evaluation. It delegates the remaining functionality to a `PointLightUtil` class, which does attenuation checks and provides at least an `Apply()` method.

The `PointLightUtil` class needs to be provided by the material, although a default PBR implementation for all supported light types is provided in `Atom/Features/PBR/Lights/Lights.azsli`. This implementation still use the `GetDiffuseLighting()` - `GetSpecularLighting()` functions that can separately be overloaded by the material.

### Ray Tracing RHI
Projects that use Ray Tracing RHI functions directly need to be updated to use the new structs that are introduced in [PR 18913](https://github.com/o3de/o3de/pull/18913). An example of a potential upgrade is (e.g. `DiffuseProbeGridRayTracingPass`, a custom ray tracing pass which separate from `AZ::Render::RayTracingPass`).

```cpp
RHI::RayTracingPipelineStateDescriptor descriptor;
descriptor.Build()
  ->PipelineState(m_globalPipelineState.get())
  ->MaxPayloadSize(96)
  ->MaxAttributeSize(32)
  ->MaxRecursionDepth(MaxRecursionDepth)
  ->ShaderLibrary(rayGenerationShaderDescriptor)
    ->RayGenerationShaderName(Name("RayGen"))
  ->ShaderLibrary(missShaderDescriptor)
    ->MissShaderName(Name("Miss"))
  ->ShaderLibrary(closestHitShaderDescriptor)
    ->ClosestHitShaderName(Name("ClosestHit"))
  ->HitGroup(Name("HitGroup"))
    ->ClosestHitShaderName(Name("ClosestHit"))
```
turns into
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

## Simulation Gems Restructure
The `ROS2` gem has been restructured into multiple smaller gems to improve modularity and maintainability. The following gems have been created by extracting relevant functionality from the original `ROS2` gem:
- **ROS2Controllers**: Contains components and systems for controlling robots in a ROS 2 environment (joint manipulations, vehicle control, etc.).
- **ROS2RobotImporter**: Provides tools and components for importing robot models and configurations from URDF/SDFormat files.
- **ROS2Sensors**: Includes components and systems for simulating various sensors in a ROS 2 context.

The original `ROS2` gem now focuses on core ROS 2 communication functionalities, while the new gems handle specific aspects of robot simulation and interaction. Include all four Gems in your project if you were previously using the `ROS2` gem to ensure that all functionalities remain available.

## ROS2 Gem API
The ROS2 gem has undergone significant API changes to improve usability and functionality. Key changes include:
- **Refactored Frame System**: The frame system has been redesigned to be more flexible and easier to use, with improved support for dynamic frames and better integration with the ROS 2 ecosystem.
- **New Sensor Configuration Structures and EBuses**: New structures and event buses have been added to facilitate the configuration of ROS2 sensor components, allowing for more straightforward setup and customization of sensors.
- **ROS2 Clock System Component**: A new clock system component has been introduced, exposing its request EBus as a public API, enabling better time synchronization and management within ROS 2 applications.

Another important change is that `ROS2` Gem can be now linked to your project using `Gem::ROS2.API` cmake target instead of `Gem::ROS2.Static`. While the latter is still available for backward compatibility, the most common tools and interfaces are now provided by the new target. It is recommended to use `Gem::ROS2.Static` only if you need to access low-level functionalities that are not exposed by the public API, e.g., when implementing a custom sensor component or clock system.

# Upcoming Impactful Changes

## WarehouseAutomation Gem
The `WarehouseAutomation` Gem is planned to be removed in the next release as it became obsolete. The old version of the Gem will be still available to download using the Project Manager, but the source code will be removed from the repository. The valuable assets that were part of the Gem are included in the `WarehouseAssets` Gem (since O3DE 25.05), which is actively maintained and updated. The proximity sensor functionality is deprecated due to the removal of `gazebo_msgs` package in ROS 2, and the conveyor belt implementation is not optimal and needs significant improvements.

# Known Bugs
- Resizing the Editor window while using Vulkan may cause noticeable lag.
- On Linux with Vulkan, resizing the Game Launcher window may cause the launcher to crash.

# Additional Notes
- O3DE 25.10 was tested with **Microsoft Visual Studio 2022 17.4** (build tools: 19.44.35211) on Windows and **Clang 18** on Linux. If you are experiencing compilation errors when building the engine from source, please try to add these exact versions to your current development environment. Then, you can select the suggested compiler version when generating the engine solution for the first time (see *Step 3* of the official documentation for [Windows](https://docs.o3de.org/docs/welcome-guide/setup/setup-from-github/building-windows/#build-instructions) or [Linux](https://docs.o3de.org/docs/welcome-guide/setup/setup-from-github/building-linux/#build-instructions)):
  - Windows
    ```sh
    cmake -B build/windows -S . -G "Visual Studio 17" -T version=14.43
    ```
  - Linux
    ```sh
    cmake -B build/linux -S . -G "Ninja Multi-Config" -DCMAKE_C_COMPILER=clang-18 -DCMAKE_CXX_COMPILER=clang++-18
    ```
