---
linkTitle: Feature grid
title: 22.10.0 Feature Grid snapshot
description: Snapshot of the Open 3D Engine (O3DE) feature status grid for the 22.10.0 release.
toc: true
---
This feature grid shows the state of each feature system within **Open 3D Engine (O3DE)** for the 22.10.0 release. 

For an up-to-date feature grid and full notes, open the [Feature State Form](https://o3de.github.io/community/features/form.html) and refer to the [O3DE SIG Features Editing tool](https://o3de.github.io/community/features/) guide on how to use it. Features are reported by each individual O3DE Special Interest Group (SIG). For more information about each SIG and their responsibilities, refer to the [o3de/community repository](https://github.com/o3de/community/) on GitHub.

## SIG-Build 


### Build Systems 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Github Pipelines | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟢 Optimized | All  | [Link](https://github.com/o3de/o3de/tree/development/.github) | [Link](https://www.o3de.org/docs/contributing/to-code/git-workflow/) |
| Jenkins Pipelines | 🟡 Active | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🔵 In Progress | All  | [Link](https://github.com/o3de/o3de/tree/development/scripts/build/Jenkins) | [Link](https://github.com/o3de/sig-build/blob/main/AutomatedReview/JenkinsPipelineGuide.md) |
| Installer Builds | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟢 Optimized | Windows Linux  | [Windows Link](https://github.com/o3de/o3de/tree/development/cmake/Platform/Windows)&nbsp;[Linux Link](https://github.com/o3de/o3de/tree/development/cmake/Platform/Linux) | |
| Build Failure Analysis | 🟡 Active | 🟢 Complete | 🟢 Complete | 🔵 In Progress | 🔵 In Progress | All  | | [Link](https://github.com/o3de/sig-build/blob/main/AutomatedReview/RootCauseRunbook.md)
| Build Scripts | 🟡 Active | 🟢 Complete | 🟢 Complete | 🔵 In Progress | 🔵 In Progress | All  | [Link](https://github.com/o3de/o3de/tree/development/scripts/build/Platform) | |
| Build Environments | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟢 Optimized | All  | [Link](https://github.com/o3de/o3de/tree/development/scripts/build/build_node/Platform) | |
| Build Metrics | 🟡 Active | 🟢 Complete | 🟢 Complete | 🔵 In Progress | 🔵 In Progress | All  | [Link](https://github.com/o3de/o3de/tree/development/scripts/build) | |
| 3rd Party System | 🟡 Active | 🟢 Complete | 🟢 Complete | 🔵 In Progress | 🔵 In Progress | All  | [Link](https://github.com/o3de/3p-package-source) | |

### Infrastructure 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Jenkins | 🟡 Active | 🟢 Complete | 🟢 Complete | 🔵 In Progress | 🔵 In Progress | All  | [Link](https://github.com/o3de/o3de/tree/development/scripts/build/Jenkins) | [Link](https://www.o3de.org/docs/contributing/to-code/git-workflow/) |
| Github | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟢 Optimized | All  | [Link](https://github.com/o3de/o3de/tree/development/.github) | |
| LFS | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟢 Optimized | All  | |
| License Scanning | 🟡 Active | 🟢 Complete | 🟢 Complete | 🔵 In Progress | 🔵 In Progress | All  | [Link](https://github.com/o3de/o3de/tree/development/scripts/license_scanner) | |


## SIG-Content 

### Frameworks 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| AzToolsFramework | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All | | |
| Lua | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All | | [Link](https://www.o3de.org/docs/user-guide/scripting/lua/) |
| Prefabs | 🟡 Active | 🟠 Minimal | ⭕ Not Required | 🟠 Volatile | 🟡 Needs Optimization | All  | | |
| Qt for Python | 🟡 Active | 🟠 Minimal | ⭕ Not Required | 🔵 In Progress | 🔵 In Progress | Windows Linux  | | |

### Editor 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Asset Browser | 🟡 Active | 🟠 Minimal | ⭕ Not Required | 🟠 Volatile | 🔵 In Progress | Windows Linux MacOS  | | |
| Framework | | | | | | | | |
| Localization | 🔵 Backlogged | ❌ None | ❌ None | ❌ Unproven | ❌ Unsupported | | | |
| Undo / Redo | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟡 Needs Optimization | Windows Linux MacOS  | | |
| Asset Editor | 🟡 Active | 🟠 Minimal | ⭕ Not Required | 🟢 Stable | 🟡 Needs Optimization | Windows Linux MacOS  | | |
| Outliner | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🟠 Volatile | 🟡 Needs Optimization | Windows Linux MacOS  | | |
| Inspector | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🟠 Volatile | 🟡 Needs Optimization | Windows Linux MacOS  | | |
| Document Property Editor (DPE) | 🟡 Active | 🔵 In-Design | ⭕ Not Required | 🔵 In Progress | 🟡 Needs Optimization | Windows Linux MacOS  | | |

### Canvas Tools 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Graph Model | 🟡 Active | 🟠 Minimal | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | Windows Linux MacOS  | | |
| Graph Canvas | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | Windows Linux MacOS  | | |
| Landscape Canvas | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | Windows Linux MacOS  | | |

### Project Manager 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Remote Projects | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🔵 In Progress | 🔵 In Progress | Windows Linux MacOS  | | |
| Remote Gems | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🔵 In Progress | 🔵 In Progress | Windows Linux MacOS  | | |
| Remote Templates | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🔵 In Progress | 🔵 In Progress | Windows Linux MacOS  | | |
| Project Versioning | 🟡 Active | 🔵 In-Design | ⭕ Not Required | 🔵 In Progress | 🔵 In Progress | Windows Linux MacOS  | | |
| Template Management | 🟠 Planned | 🔵 In-Design | ⭕ Not Required | ❌ Unproven | ❌ Unsupported | Windows Linux MacOS  | | |
| Gem Management | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🔵 In Progress | 🔴 Needs Testing | Windows Linux MacOS  | | |
| Engine Versioning | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🔵 In Progress | 🟢 Optimized | Windows Linux MacOS  | | |

### Scripting 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Expression Evaluation | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All | | |
| Script Canvas | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🟠 Volatile | 🔴 Needs Testing | Windows Linux MacOS  | | [Link](https://www.o3de.org/docs/user-guide/scripting/script-canvas/) |
| Script Canvas Developer | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | Windows Linux MacOS  | | |
| Script Events | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🟠 Volatile | 🟢 Optimized | All | | [Link](https://www.o3de.org/docs/user-guide/scripting/script-events/) |
| Script Canvas Testing | 🟢 Complete | 🟡 Partial | ⭕ Not Required | 🟠 Volatile | 🟢 Optimized | Windows Linux MacOS  | | |
| Lua Editor | 🟢 Complete | 🟡 Partial | ⭕ Not Required | 🟠 Volatile | 🔴 Needs Testing | Windows Linux MacOS  | | [Link](https://www.o3de.org/docs/user-guide/scripting/lua/) |

### User Interface 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| LyShine (2D Render) | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🔴 Needs Testing | Windows Linux MacOS  | | |

### World Building 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Terrain | 🟡 Active | 🟢 Complete | 🟡 Minimal | 🟢 Stable | 🟢 Optimized | All | | |
| Dynamic Vegetation | 🟢 Complete | 🟢 Complete | 🟠 Partial | 🟢 Stable | 🟡 Needs Optimization | All | | |

### Viewport 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Manipulators | 🟡 Active | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | Windows Linux MacOS  | | |
| Component Mode | 🟡 Active | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | Windows Linux MacOS  | | |
| Viewport UI | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🟡 Needs Optimization | Windows Linux MacOS  | | |
| Interaction Model | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | Windows Linux MacOS  | | |
| Camera | 🟡 Active | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔵 In Progress | Windows Linux MacOS  | | |
| View Bookmarks | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🟡 Experimental | 🔵 In Progress | Windows Linux MacOS  | | |
| Manipulator Test Framework | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | Windows Linux MacOS  | | |
| Visibility | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | Windows Linux MacOS  | | |
| Editor Mode Visual Feedback | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🟡 Experimental | 🔵 In Progress | Windows Linux MacOS  | | |

### White Box Tool 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Atom Integration | 🟢 Complete | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  | | |
| Viewport Editing | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | Windows Linux MacOS  | | |
| Triangulation | 🔵 Backlogged | ❌ None | ⭕ Not Required | ❌ Unproven | ❌ Unsupported | Windows Linux MacOS  | | |
| Boolean Operations | 🔵 Backlogged | ❌ None | ⭕ Not Required | ❌ Unproven | ❌ Unsupported | Windows Linux MacOS  | | |
| Custom UV Mapping | 🔵 Backlogged | ❌ None | ⭕ Not Required | ❌ Unproven | ❌ Unsupported | Windows Linux MacOS  | | |

## SIG-Core 


### Core features 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| AzCore | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  | | 
| AzFramework | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  | | 
| Math libraries | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  | | 
| SDK Build | 🟢 Complete | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | Windows Linux MacOS  | | 
| Reflection frameworks | 🟠 Planned | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟡 Needs Optimization | All  | | 
| Streaming system | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🔵 In Progress | All  | | 
| Input system | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  | | 
| Logging and tracing | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟡 Needs Optimization | All  | | 
| Profiling | 🟡 Active | 🟠 Minimal | ⭕ Not Required | 🟠 Volatile | 🔵 In Progress | Windows  | | 
| Optimized standard library | 🟡 Active | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔵 In Progress | All  | | 
| Settings Registry | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟢 Optimized | All  | | 

## SIG-Graphics-Audio 

### Features 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Deferred Fog | 🟢 Complete | 🟡 Partial | 🟢 Complete | 🟢 Stable | 🟢 Optimized | All  | | [Link](https://o3de.org/docs/user-guide/components/reference/atom/deferred-fog/) |
| Tonemapping | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟡 Needs Optimization | All  | | [Link](https://www.o3de.org/docs/atom-guide/atom-sample-viewer/graphics-feature-samples/#tonemapping) |
| Direct Lighting / Area Lights | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟡 Needs Optimization | All  | | [Link](https://www.o3de.org/docs/user-guide/components/reference/atom/light/) |
| Meshes | 🟡 Active | 🟡 Partial | 🟢 Complete | 🟢 Stable | 🟡 Needs Optimization | All  | | [Link](https://www.o3de.org/docs/atom-guide/features/#meshes) |
| Skinned Meshes | 🟢 Complete | 🟡 Partial | 🟢 Complete | 🟢 Stable | 🟡 Needs Optimization | All  | | [Link](https://www.o3de.org/docs/atom-guide/features/#meshes) |
| Eye Adaptation | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟡 Needs Optimization | All  | | [Link](https://www.o3de.org/docs/atom-guide/features/#lighting) |
| Culling | 🟡 Active | 🟡 Partial | 🟢 Complete | 🔵 In Progress | 🟡 Needs Optimization | All  | | [Link](https://www.o3de.org/docs/user-guide/components/reference/atom/occlusion-culling-plane/) |
| HDR Pipeline | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟢 Optimized | All  | | [Link](https://www.o3de.org/docs/atom-guide/features/) |
| Shadows | 🟡 Active | 🟡 Partial | 🟢 Complete | 🟢 Stable | 🔵 In Progress | All  | | [Link](https://www.o3de.org/docs/user-guide/components/reference/atom/light/) |
| Skybox and Physical Sky | 🟢 Complete | 🟡 Partial | 🟢 Complete | 🟢 Stable | 🟢 Optimized | All  | | [Link](https://www.o3de.org/docs/atom-guide/features/#lighting) |
| SSAO | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🔵 In Progress | All  | | [Link](https://www.o3de.org/docs/atom-guide/features/#post-processing-effects-postfx) |
| Color Grading | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟢 Optimized | All  | | [Link](https://www.o3de.org/docs/atom-guide/features/#post-processing-effects-postfx) |
| Depth of Field | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟢 Optimized | All  | | [Link](https://www.o3de.org/docs/atom-guide/features/#post-processing-effects-postfx) |
| PBR Materials | 🟡 Active | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟡 Needs Optimization | All  | | [Link](https://www.o3de.org/docs/atom-guide/look-dev/materials/pbr/) |
| Post Processing Volumes | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟢 Optimized | All  | | [Link](https://www.o3de.org/docs/atom-guide/features/#post-processing-effects-postfx) |
| Decals | 🟡 Active | 🟡 Partial | 🟢 Complete | 🟢 Stable | 🟢 Optimized | All  | | [Link](https://www.o3de.org/docs/atom-guide/features/#lighting) |
| Screen Space Reflections | 🟡 Active | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟡 Needs Optimization | All  | | [Link](https://www.o3de.org/docs/atom-guide/features/#post-processing-effects-postfx) |
| Subsurface Scattering | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟡 Needs Optimization | All  | | [Link](https://www.o3de.org/docs/atom-guide/features/#post-processing-effects-postfx) |
| Motion Vectors | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟢 Optimized | All  | | [Link](https://www.o3de.org/docs/atom-guide/features/#post-processing-effects-postfx) |
| Temporal Anti-aliasing (TAA) | 🟡 Active | 🟡 Partial | 🟢 Complete | 🟢 Stable | 🟢 Optimized | All  | | [Link](https://www.o3de.org/docs/atom-guide/features/#post-processing-effects-postfx) |
| OpenXR | 🟡 Active | 🔵 In-Design | 🟡 Minimal | 🟠 Volatile | 🔵 In Progress | Windows Android  | | |

### Render Hardware Interface 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| DirectX 12 | 🟡 Active | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟡 Needs Optimization | Windows  | | [Link](https://www.o3de.org/docs/atom-guide/dev-guide/rhi/) |
| Vulkan | 🟡 Active | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟡 Needs Optimization | Windows Linux Android  | | [Link](https://www.o3de.org/docs/atom-guide/dev-guide/rhi/) |
| Metal | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🟠 Volatile | 🟡 Needs Optimization | MacOS iOS  | | [Link](https://www.o3de.org/docs/atom-guide/dev-guide/rhi/) |

### Audio 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Wwyse Integration | 🟢 Complete | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | Windows  | | [Link](https://www.o3de.org/docs/atom-guide/dev-guide/rhi/) |

## SIG-Network 

### Core Networking 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Transport API | 🟢 Complete | 🟡 Partial | ⭕ Not Required | ❌ Unproven | 🟡 Needs Optimization | | | [Link](https://www.o3de.org/docs/user-guide/networking/) |
| Multiple network interface support | 🟢 Complete | 🟡 Partial | ⭕ Not Required | ❌ Unproven | 🟡 Needs Optimization | | | [Link](https://www.o3de.org/docs/user-guide/networking/) |
| Compression (TCP/UDP) | 🟢 Complete | 🟢 Complete | ⭕ Not Required | ❌ Unproven | 🟡 Needs Optimization | | | [Link](https://www.o3de.org/docs/user-guide/gems/reference/multiplayer/multiplayer-compression/) |
| Metrics support | 🟢 Complete | 🟡 Partial | ⭕ Not Required | ❌ Unproven | 🟡 Needs Optimization | | | |
| UDP Core | 🟢 Complete | 🟡 Partial | ⭕ Not Required | ❌ Unproven | 🟡 Needs Optimization | | | |
| UDP: DTLS support | 🟢 Complete | 🟢 Complete | ⭕ Not Required | ❌ Unproven | 🟡 Needs Optimization | | | [Link](https://www.o3de.org/docs/user-guide/networking/aznetworking/encryption/) |
| UDP: Reliable queue support | 🟢 Complete | 🟡 Partial | ⭕ Not Required | ❌ Unproven | 🟡 Needs Optimization | | | |
| UDP: Fragmented packet support | 🟢 Complete | 🟡 Partial | ⭕ Not Required | ❌ Unproven | 🟡 Needs Optimization | | | |
| TCP | 🟢 Complete | 🟢 Complete | ⭕ Not Required | ❌ Unproven | 🟡 Needs Optimization | | | [Link](https://www.o3de.org/docs/user-guide/networking/aznetworking/packets/) |
| TCP: TLS Support | 🟢 Complete | 🟡 Partial | ⭕ Not Required | ❌ Unproven | 🟡 Needs Optimization | | | |
| TCP: Ringbuffer support Pkg Xmit | 🟢 Complete | 🟡 Partial | ⭕ Not Required | ❌ Unproven | 🟡 Needs Optimization | | | |

### Multiplayer 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Multiplayer component API | 🟢 Complete | 🟡 Partial | ⭕ Not Required | ❌ Unproven | 🟡 Needs Optimization | | | |
| Local Prediction | 🟢 Complete | 🟡 Partial | ⭕ Not Required | ❌ Unproven | 🟡 Needs Optimization | | | |
| Server Side Rollback | 🟢 Complete | 🟡 Partial | ⭕ Not Required | ❌ Unproven | 🟡 Needs Optimization | | | |
| Play in Editor Mode | 🟡 Active | 🟢 Complete | 🟠 Partial | ❌ Unproven | 🟡 Needs Optimization | | | [Link](https://o3de.org/docs/user-guide/networking/multiplayer/test-in-editor/) |
| Hosting/Joining a Game | 🟡 Active | 🟡 Partial | ⭕ Not Required | ❌ Unproven | 🟡 Needs Optimization | | | |
| Network property support | 🟢 Complete | 🟢 Complete | ⭕ Not Required | ❌ Unproven | 🟡 Needs Optimization | | | [Link](https://www.o3de.org/docs/user-guide/networking/aznetworking/autopackets/) |
| RPC support | 🟡 Active | 🟡 Partial | ⭕ Not Required | ❌ Unproven | 🟡 Needs Optimization | | | |
| Network Input support | 🟢 Complete | 🟡 Partial | ⭕ Not Required | ❌ Unproven | 🟡 Needs Optimization | | | |
| ScriptBind support | 🟢 Complete | 🟡 Partial | ⭕ Not Required | ❌ Unproven | 🟡 Needs Optimization | | | |
| Netbound entity support [NetBindComponent] | 🟢 Complete | 🟡 Partial | ⭕ Not Required | ❌ Unproven | 🟡 Needs Optimization | | | |
| Entity replication support | 🟢 Complete | 🟡 Partial | ⭕ Not Required | ❌ Unproven | 🟡 Needs Optimization | | | |
| Network Prefab Spawning | 🟢 Complete | 🟢 Complete | ⭕ Not Required | ❌ Unproven | 🔴 Needs Testing | | | [Link](https://www.o3de.org/docs/user-guide/networking/multiplayer/spawning/) |
| Networked Animation | ❌ Unscheduled | 🟠 Minimal | ❌ None | ❌ Unproven | 🔴 Needs Testing | | | |
| Network Audio Support | ❌ Unscheduled | ❌ None | ❌ None | ❌ Unproven | ❌ Unsupported | | | |
| Network Simulation (Physics) | 🟢 Complete | 🟡 Partial | ⭕ Not Required | ❌ Unproven | 🟡 Needs Optimization | | | |
| Quality of Service | 🟡 Active | 🟡 Partial | ⭕ Not Required | ❌ Unproven | 🟡 Needs Optimization | | | |
| Debugging Tools | 🟡 Active | 🟡 Partial | ⭕ Not Required | ❌ Unproven | 🟡 Needs Optimization | | | [Link](https://www.o3de.org/docs/user-guide/networking/multiplayer/debug-desync/) |
| Metrics | 🟡 Active | 🟡 Partial | ⭕ Not Required | ❌ Unproven | 🟡 Needs Optimization | | | |

### AWS Cloud Services 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| HTTPS Support | 🟢 Complete | 🟢 Complete | ⭕ Not Required | ❌ Unproven | 🔴 Needs Testing | | | |
| Restful API Support | 🟢 Complete | 🟡 Partial | ⭕ Not Required | ❌ Unproven | 🔴 Needs Testing | | | |
| AWS C++ SDK Support | 🟢 Complete | 🟡 Partial | ⭕ Not Required | ❌ Unproven | 🔴 Needs Testing | | | [Link](https://www.o3de.org/docs/user-guide/gems/reference/aws/aws-core/getting-started/) |
| Client Side Ident & Auth | 🟢 Complete | 🟢 Complete | ⭕ Not Required | ❌ Unproven | 🔴 Needs Testing | | | [Link](https://www.o3de.org/docs/user-guide/gems/reference/aws/aws-client-auth/) |
| Runtime Metrics | 🟢 Complete | 🟢 Complete | ⭕ Not Required | ❌ Unproven | 🔴 Needs Testing | | | [Link](https://www.o3de.org/docs/user-guide/gems/reference/aws/aws-metrics/) |
| Amazon GameLift Support | 🟡 Active | 🟡 Partial | ⭕ Not Required | ❌ Unproven | 🔴 Needs Testing | | | [Link](https://www.o3de.org/docs/user-guide/gems/reference/aws/aws-gamelift/) |

### Microsoft Azure Cloud Services 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Core services | ❌ Unscheduled | | | | | | | |

### Networking for Tools 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Remote Tools Connect | 🟢 Complete | 🟡 Partial | ⭕ Not Required | ❌ Unproven | 🔴 Needs Testing | | | [Link](https://development--o3deorg.netlify.app/docs/user-guide/gems/reference/debug/remote-tools/) |

## SIG-Platform 


### Platform Abstraction Layer 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| PAL CMake | 🟡 Active | 🟡 Partial | | | | | | |
| PAL Tools/Editor/AP | 🟡 Active | 🟡 Partial | | | | | | |

### Platform Configure (Engine Centric) 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Windows | 🟢 Complete | 🟢 Complete | | | | | | |
| Mac | 🟢 Complete | 🟢 Complete | | | | | | |
| Android | 🟢 Complete | 🟢 Complete | | | | | | |
| Linux | 🟢 Complete | 🟢 Complete | | | | | | |

### Platform Build (Engine Centric) 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Windows | 🟢 Complete | 🟢 Complete | | | | | | |
| Mac | 🟢 Complete | 🟢 Complete | | | | | | |
| Android | 🟢 Complete | 🟢 Complete | | | | | | |
| Linux | 🟢 Complete | 🟢 Complete | | | | | | |

### Platform Configure (Project Centric) 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Windows | 🟢 Complete | 🟢 Complete | | | | | | |
| Mac | 🟢 Complete | 🟢 Complete | | | | | | |
| Android | 🟢 Complete | 🟢 Complete | | | | | | |
| Linux | 🟢 Complete | 🟢 Complete | | | | | | |

### Platform Build (Project Centric) 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Windows | 🟢 Complete | 🟢 Complete | | | | | | |
| Mac | 🟢 Complete | 🟢 Complete | | | | | | |
| Android | 🟢 Complete | 🟢 Complete | | | | | | |
| Linux | 🟢 Complete | 🟢 Complete | | | | | | |

### O3DE Object Externalization 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Project | 🟢 Complete | 🟢 Complete | | | | | | |
| Gem | 🟢 Complete | 🟢 Complete | | | | | | |
| Template | 🟢 Complete | 🟢 Complete | | | | | | |
| Restricted | 🟡 Active | 🟡 Partial | | | | | | |
| Repo | 🟡 Active | 🔵 In-Design | | | | | | |

### Language/Localization 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Editor | 🟢 Complete | 🟢 Complete | | | | | | |
| Runtime | 🟡 Active | 🟡 Partial | | | | | | |

### Packaging 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Windows | 🟢 Complete | 🟢 Complete | | | | | | |
| Mac | 🟢 Complete | 🟢 Complete | | | | | | |
| Android | 🟢 Complete | 🟢 Complete | | | | | | |
| Linux | 🟢 Complete | 🟢 Complete | | | | | | |

## SIG-Simulation

### Animation 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Animation Playback Control | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  | | |
| Pose Blending | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  | | |
| Animation Syncing | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  | | |
| Motion Events | 🔵 Backlogged | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  | | |
| Bone Masking | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  | | |
| Motion Extraction (Root Motion) | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  | | |
| Motion Matching | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🟡 Experimental | 🔵 In Progress | All  | | |
| Debug Rendering | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  | | |
| Animation Sharing | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  | | |
| Animation Compression | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  | | |
| Multi-threading | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  | | |
| Retargeting | 🟢 Complete | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  | | |
| Inverse Kinematics (IK) | 🟢 Complete | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  | | |
| LOD | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  | | |
| Blend Tree/State Machine | 🟢 Complete | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  | | |
| Transition Conditions | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  | | |
| Wildcard Conditions | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  | | |
| Debugging Tools (Anim Graph) | 🟢 Complete | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  | | |
| Visual Tools | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  | | |
| Software Skinning (Linear, Dual-Quat) | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  | | |
| GPU Skinning (Linear, Dual-Quat) | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  | | |
| Morph Target/Facial Animation | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  | | |
| GPU Accelerated Morphing | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  | | |
| Simulated Objects/Dynamic Bones | 🟢 Complete | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  | | |
| Ragdoll Runtime | 🟢 Complete | 🟡 Partial | ⭕ Not Required | 🟡 Experimental | 🔵 In Progress | All  | | |
| Cloth Authoring | 🟢 Complete | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  | | |
| Collider Authoring Tools | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🔵 In Progress | 🔵 In Progress | All  | | |
| Attachments | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  | | |
| Skinned Attachments | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  | | |
| Full-body IK | 🔵 Backlogged | ❌ None | ⭕ Not Required | ❌ Unproven | ❌ Unsupported | All  | | |
| Live Debugging | 🔵 Backlogged | ❌ None | ⭕ Not Required | ❌ Unproven | ❌ Unsupported | All  | | |

### Physics API (minimal, non-backend specific) 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Collision Filtering | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟠 Volatile | 🔴 Needs Testing | | | |
| Collision Filtering - Programmable Reserved Bits | 🔵 Backlogged | ❌ None | | | | | | |
| Joints | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | | | |
| Rigid Bodies | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | | | |
| Multiple Scenes | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟡 Experimental | 🔴 Needs Testing | | | |
| Character Controller | 🟢 Complete | 🟡 Partial | ⭕ Not Required | 🟠 Volatile | 🔴 Needs Testing | | | |
| Ragdoll | 🟢 Complete | 🟡 Partial | ⭕ Not Required | 🟠 Volatile | 🔴 Needs Testing | | | |
| Materials | 🟡 Active | 🟢 Complete | ⭕ Not Required | 🟠 Volatile | 🔴 Needs Testing | | | |
| Shapes | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | | | |
| Heightfields | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🟠 Volatile | 🔴 Needs Testing | | | |
| Wind | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟡 Experimental | 🔴 Needs Testing | | | |
| Scene Queries | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | | | |

### Nvidia PhysX Integration 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Ticking | 🔵 Backlogged | 🟡 Partial | ⭕ Not Required | 🟠 Volatile | 🔴 Needs Testing | All  | | |
| Rigid Body Simulation | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟡 Needs Optimization | All  | | |
| Continuous Collision Detection (CCD) | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  | | |
| Collision Asset Pipeline | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  | | |
| Convex Decomposition | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  | | |
| Primitive Fitting | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  | | |
| Primitive Colliders | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  | | |
| Asset Colliders | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  | | |
| Shape Colliders | 🟢 Complete | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  | | |
| Heightfield Colliders | 🟡 Active | 🟠 Minimal | ⭕ Not Required | 🟠 Volatile | 🟡 Needs Optimization | All  | | |
| Triggers | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  | | |
| Force Regions | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  | | |
| Wind | 🔵 Backlogged | 🟡 Partial | ⭕ Not Required | 🟡 Experimental | 🔴 Needs Testing | All  | | |
| Materials | 🟡 Active | 🟢 Complete | 🟢 Complete | 🟠 Volatile | 🔴 Needs Testing | All  | | |
| Collision Filtering | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  | | |
| Joints | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  | | |
| Articulations | 🟠 Planned | ❌ None | ⭕ Not Required | ❌ Unproven | 🔴 Needs Testing | All  | | |
| Character Controller | 🟢 Complete | 🟠 Minimal | ⭕ Not Required | 🟠 Volatile | 🔴 Needs Testing | All  | | |
| Ragdoll | 🟡 Active | 🟡 Partial | 🟢 Complete | 🟠 Volatile | 🔴 Needs Testing | All  | | |
| Scripting | 🟢 Complete | 🟠 Minimal | ❌ None | 🟠 Volatile | 🔴 Needs Testing | All  | | |
| Scene Queries | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  | | |
| Multi-Scene | 🔵 Backlogged | ❌ None | ⭕ Not Required | ❌ Unproven | 🔴 Needs Testing | All  | | |
| PhysX Visual Debugger Integration | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | Windows  | | |
| Debug Visualization | 🟢 Complete | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | Windows Linux MacOS  | | |
| Mesh Simplification | ❌ Unscheduled | | | | | | | |

### Cloth - NvCloth Integration 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Generic API | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  | | |
| Support for Mesh Components | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔵 In Progress | All  | | |
| Support for Actor Components | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔵 In Progress | All  | | |
| Mesh Simplification | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  | | |
| Simulation Constraints | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  | | |
| Realtime Editing | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  | | |
| Wind | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  | | |
| Actor Colliders | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  | | |
| CCD | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  | | |
| Self Collision | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  | | |
| Async Simulation | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  | | |
| Debug Visualization | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  | | |
| Environmental Collision | 🔵 Backlogged | ❌ None | | | | | | |
| Painting Tool | 🔵 Backlogged | ❌ None | | | | | | |
| LOD | 🔵 Backlogged | ❌ None | | | | | | |
| Mesh Collision | 🔵 Backlogged | ❌ None | | | | | | |

### Destruction - Nvidia Blast Integration 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Authoring/Pipeline | 🔵 Backlogged | 🔵 In-Design | ⭕ Not Required | 🟡 Experimental | 🔴 Needs Testing | Windows  | | |
| Geometry Destruction Simulation | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟡 Experimental | 🔴 Needs Testing | Windows  | | |
| Materials | 🟡 Active | 🟢 Complete | ⭕ Not Required | 🟡 Experimental | 🔴 Needs Testing | Windows  | | |
| Scripting | 🟢 Complete | 🟠 Minimal | ⭕ Not Required | 🟡 Experimental | 🔴 Needs Testing | Windows  | | |
| Atom Integration | 🔵 Backlogged | 🟠 Minimal | ⭕ Not Required | 🟡 Experimental | 🔴 Needs Testing | Windows  | | |
| PhysX Integration | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟡 Experimental | 🔴 Needs Testing | Windows  | | |

### Vehicles 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Vehicles | ❌ Unscheduled | | | | | | | |

### Fluids 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Fluids | ❌ Unscheduled | | | | | | | |

### Soft Bodies 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Soft Bodies | ❌ Unscheduled | | | | | | | |

## SIG-Testing 

### AutomatedReview 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Early Warning | 🟢 Complete | 🟢 Complete | 🟡 Minimal | 🟢 Stable | 🟡 Needs Optimization | All  | [Link](https://github.com/o3de/o3de/tree/development/scripts/commit_validation) | [Link](https://www.o3de.org/docs/contributing/to-code/validation-errors/) |
| Test Metrics | 🟠 Planned | 🟠 Minimal | 🟠 Partial | 🟡 Experimental | 🔴 Needs Testing | All  | | |
| GitHub CODEOWNERS | 🟢 Complete | 🟢 Complete | 🟠 Partial | 🟢 Stable | 🟢 Optimized | All  | [Link](https://github.com/o3de/o3de/blob/development/.github/CODEOWNERS) | |
| Unstable Test Alarm | 🟠 Planned | 🔵 In-Design | ⭕ Not Required | ❌ Unproven | 🔴 Needs Testing | All  | [Link](https://github.com/o3de/sig-testing/blob/main/rfcs/intermittent_failures.md) | |

### Test Tools 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| CTest | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟡 Needs Optimization | Windows Linux MacOS  | [Link](https://github.com/o3de/o3de/blob/development/cmake/LYTestWrappers.cmake) | [Link](https://www.o3de.org/docs/user-guide/testing/getting-started/) |
| GoogleTest | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟡 Needs Optimization | Windows Linux MacOS  | [Link](https://github.com/o3de/o3de/tree/development/Code/Tools/AzTestRunner) | [Link](https://www.o3de.org/docs/user-guide/testing/aztest/aztest/) |
| GoogleBenchmark | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟡 Needs Optimization | Windows Linux MacOS  | | |
| PyTest | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟡 Needs Optimization | Windows Linux MacOS  | [Link](https://github.com/o3de/o3de/blob/development/python/requirements.txt) | [Link](https://www.o3de.org/docs/user-guide/testing/getting-started/) |
| O3DE EditorTest | 🟡 Active | 🟡 Partial | 🟢 Complete | 🟡 Experimental | 🟡 Needs Optimization | Windows Linux  | [Link](https://github.com/o3de/o3de/blob/development/Tools/LyTestTools/ly_test_tools/o3de/editor_test.py) | [Link](https://www.o3de.org/docs/user-guide/testing/parallel-pattern/) |
| O3DE GameTest | 🟠 Planned | 🔵 In-Design | ❌ None | ❌ Unproven | 🔴 Needs Testing | All  | | |
| LyTestTools | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟡 Needs Optimization | Windows Linux MacOS  | [Link](https://github.com/o3de/o3de/tree/development/Tools/LyTestTools) | [Link](https://www.o3de.org/docs/user-guide/testing/lytesttools/getting-started/) |

## SIG-UI-UX 

### UI Components 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Breadcrumb navigation | 🟢 Complete | 🟢 Complete | 🟠 Partial | 🟢 Stable | 🔴 Needs Testing | Windows Linux MacOS  | | [Link](https://www.o3de.org/docs/tools-ui/component-library/uidev-breadcrumbs-component/) |
| Browse Edit | 🟢 Complete | 🟢 Complete | 🟠 Partial | 🟢 Stable | 🟢 Optimized | Windows Linux MacOS  | | [Link](https://www.o3de.org/docs/tools-ui/component-library/uidev-browse-edit-component/) |
| Button | 🟢 Complete | 🟢 Complete | 🟠 Partial | 🟢 Stable | 🟢 Optimized | Windows Linux MacOS  | | [Link](https://www.o3de.org/docs/tools-ui/component-library/uidev-button-component/) |
| Card | 🟢 Complete | 🟢 Complete | 🟠 Partial | 🟢 Stable | 🔴 Needs Testing | Windows Linux MacOS  | | [Link](https://www.o3de.org/docs/tools-ui/component-library/uidev-card-widget/) |
| Checkbox | 🟢 Complete | 🟢 Complete | 🟠 Partial | 🟢 Stable | 🟢 Optimized | Windows Linux MacOS  | | [Link](https://www.o3de.org/docs/tools-ui/component-library/uidev-checkbox-component/) |
| Combobox | 🟢 Complete | 🟢 Complete | 🟠 Partial | 🟢 Stable | 🔴 Needs Testing | Windows Linux MacOS  | | [Link](https://www.o3de.org/docs/tools-ui/component-library/uidev-combobox-component/) |
| Context menu | 🟢 Complete | 🟢 Complete | 🟠 Partial | 🟢 Stable | 🟢 Optimized | Windows Linux MacOS  | | [Link](https://www.o3de.org/docs/tools-ui/component-library/uidev-context-menu-component/) |
| Filtered search | 🟡 Active | 🟢 Complete | 🟠 Partial | 🟢 Stable | 🔴 Needs Testing | Windows Linux MacOS  | | [Link](https://www.o3de.org/docs/tools-ui/component-library/uidev-filtered-search-component/) |
| Line edit | 🟢 Complete | 🟢 Complete | 🟠 Partial | 🟢 Stable | 🟢 Optimized | Windows Linux MacOS  | | [Link](https://www.o3de.org/docs/tools-ui/component-library/uidev-line-edit-component/) |
| Progress indicators | 🟢 Complete | 🟡 Partial | 🟡 Minimal | 🔵 In Progress | 🔴 Needs Testing | Windows Linux MacOS  | | [Link](https://www.o3de.org/docs/tools-ui/component-library/uidev-progress-indicators-component/) |
| Radio button | 🟢 Complete | 🟢 Complete | 🟠 Partial | 🟢 Stable | 🟢 Optimized | Windows Linux MacOS  | | [Link](https://www.o3de.org/docs/tools-ui/component-library/uidev-radio-button-component/) |
| Reflected property editor | 🟢 Complete | 🟢 Complete | 🟡 Minimal | 🟢 Stable | 🔴 Needs Testing | Windows Linux MacOS  | | [Link](https://www.o3de.org/docs/tools-ui/component-library/uidev-reflected-property-editor-component/) |
| Document Property Editor | 🟡 Active | 🟠 Minimal | ❌ None | 🟡 Experimental | 🔴 Needs Testing | Windows Linux MacOS  | | |
| Scrollbar | 🟢 Complete | 🟢 Complete | 🟠 Partial | 🟢 Stable | 🟢 Optimized | Windows Linux MacOS  | | [Link](https://www.o3de.org/docs/tools-ui/component-library/uidev-scrollbar-component/) |
| Slider | 🟢 Complete | 🟢 Complete | 🟠 Partial | 🟢 Stable | 🔴 Needs Testing | Windows Linux MacOS  | | [Link](https://www.o3de.org/docs/tools-ui/component-library/uidev-sliders-component/) |
| Spinbox | 🟢 Complete | 🟢 Complete | 🟠 Partial | 🟢 Stable | 🔴 Needs Testing | Windows Linux MacOS  | | [Link](https://www.o3de.org/docs/tools-ui/component-library/uidev-spinbox-component/) |
| Widget Docking | 🟢 Complete | 🟢 Complete | 🟠 Partial | 🟢 Stable | 🔴 Needs Testing | Windows Linux MacOS  | | [Link](https://www.o3de.org/docs/tools-ui/component-library/uidev-styled-dock-component/) |
| Tab | 🟡 Active | 🟡 Partial | 🟡 Minimal | 🟢 Stable | 🔴 Needs Testing | Windows Linux MacOS  | | [Link](https://www.o3de.org/docs/tools-ui/component-library/uidev-tab-component/) |
| Tag | 🔵 Backlogged | 🟠 Minimal | ❌ None | 🟢 Stable | 🔴 Needs Testing | Windows Linux MacOS  | | |
| Tooltip | 🟡 Active | 🟢 Complete | ❌ None | 🟢 Stable | 🟢 Optimized | Windows Linux MacOS  | | |
| Toggle switch | 🟢 Complete | 🟢 Complete | 🟠 Partial | 🟢 Stable | 🟢 Optimized | Windows Linux MacOS  | | [Link](https://www.o3de.org/docs/tools-ui/component-library/uidev-toggle-switch-component/) |
| Tree view | 🟢 Complete | 🟢 Complete | 🟠 Partial | 🟢 Stable | 🔴 Needs Testing | Windows Linux MacOS  | | [Link](https://www.o3de.org/docs/tools-ui/component-library/uidev-tree-view-component/) |
| Array | 🔵 Backlogged | 🟠 Minimal | ❌ None | 🟢 Stable | 🔴 Needs Testing | Windows Linux MacOS  | | |
| Table view | 🟢 Complete | 🟢 Complete | 🟡 Minimal | 🟢 Stable | 🔴 Needs Testing | Windows Linux MacOS  | | [Link](https://www.o3de.org/docs/tools-ui/component-library/uidev-table-view-component/) |
| Window | 🟢 Complete | 🟢 Complete | ❌ None | 🟢 Stable | 🟢 Optimized | Windows Linux MacOS  | |  |
| Wizard Bar | 🔵 Backlogged | ⭕ Deprecated | ❌ None | ⭕ Deprecated | ❌ Unsupported | | | |

### UX Patterns 

| Module | Feature | Functional | Content | Code/API | Performance | Platform | Github Link | Doc Link |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Component Card | 🟡 Active | 🟡 Partial | | | | | | [Link](https://www.o3de.org/docs/tools-ui/ux-patterns/component-card/overview/) |
| Error & Warnings handling | 🟠 Planned | 🟠 Minimal | | | | | | [Link](https://www.o3de.org/docs/tools-ui/ux-patterns/error/overview/) |
| Hotkey management | 🔵 Backlogged | 🟠 Minimal | | | | | | |
| UI/UX Responsiveness standards | 🔵 Backlogged | ❌ None | | | | | | |
| Viewport interaction | 🔵 Backlogged | 🔵 In-Design | | | | | | |
