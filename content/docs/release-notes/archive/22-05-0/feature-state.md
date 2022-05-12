---
linkTitle: Feature grid
title: 22.05.0 Feature Grid snapshot
description: Snapshot of the Open 3D Engine (O3DE) feature status grid for the 22.05.0 release.
toc: true
---

The **Open 3D Engine (O3DE)** feature grid is a record of the state of each feature system within O3DE and its current state of support. The feature grids contained on this page were generated for the 22.05.0 release. For an up-to-date feature grid, see the [o3de/community feature grid](https://o3de.github.io/community/features/form.html).

Features are reported via each individual O3DE Special Interest Group (SIG). For more information about each SIG and their responsibilities, see the [o3de/community repository](https://github.com/o3de/community/) on GitHub.
 
## SIG-Build 

### Build Systems 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| Github Pipelines | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟢 Optimized | All  |
| Jenkins Pipelines | 🟡 Active | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🔵 In Progress | All  |
| Installer Builds | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟢 Optimized | Windows Linux  |
| Build Failure Analysis | 🟡 Active | 🟢 Complete | 🟢 Complete | 🔵 In Progress | 🔵 In Progress | All  |
| Build Scripts | 🟡 Active | 🟢 Complete | 🟢 Complete | 🔵 In Progress | 🔵 In Progress | All  |
| Build Environments | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟢 Optimized | All  |
| Build Metrics | 🟡 Active | 🟢 Complete | 🟢 Complete | 🔵 In Progress | 🔵 In Progress | All  |
| 3rd Party System | 🟡 Active | 🟢 Complete | 🟢 Complete | 🔵 In Progress | 🔵 In Progress | All  |

### Infrastructure 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| Jenkins | 🟡 Active | 🟢 Complete | 🟢 Complete | 🔵 In Progress | 🔵 In Progress | All  |
| Github | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟢 Optimized | All  |
| LFS | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟢 Optimized | All  |
| License Scanning | 🟡 Active | 🟢 Complete | 🟢 Complete | 🔵 In Progress | 🔵 In Progress | All  |

## SIG-Content 

### Frameworks 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| AzToolsFramework | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All |
| Lua | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All |
| Prefabs | || || ||
| Qt for Python | || || ||

### Editor 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| Asset Browser | 🟡 Active | 🔵 In-Design | ⭕ Not Required | 🟢 Stable | 🔵 In Progress | Windows Linux MacOS  |
| Framework | || || ||
| Localization | || || ||
| Undo / Redo | || || ||
| Asset Editor | 🔵 Backlogged | 🟠 Minimal | ⭕ Not Required | 🟢 Stable | 🔵 In Progress | Windows Linux MacOS  |

### Canvas Tools 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| Graph Model | 🟡 Active | 🟠 Minimal | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | Windows Linux MacOS  |
| Graph Canvas | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | Windows Linux MacOS  |
| Landscape Canvas | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | Windows Linux MacOS  |

### Project Manager 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| Remote Projects | 🟡 Active | 🔵 In-Design | ⭕ Not Required | 🔵 In Progress | 🔵 In Progress | Windows Linux  |
| Project versioning | 🟡 Active | 🔵 In-Design | ⭕ Not Required | 🔵 In Progress | 🔵 In Progress | Windows Linux  |
| Template Management | 🟠 Planned | ❌ None | ⭕ Not Required | ❌ Unproven | ❌ Unsupported | Windows Linux  |
| Gem Creation Wizard | 🟠 Planned | ❌ None | ⭕ Not Required | ❌ Unproven | ❌ Unsupported | Windows Linux  |
| Remote Gems Improvements (URI vs. URL) | 🟠 Planned | ❌ None | ⭕ Not Required | ❌ Unproven | ❌ Unsupported | Windows Linux  |
| Remote Gems (Initial) | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔵 In Progress | Windows Linux  |

### Scripting 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| Expression Evaluation | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All |
| Script Canvas | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🟠 Volatile | 🔴 Needs Testing | Windows Linux MacOS  |
| Script Canvas Developer | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | Windows Linux MacOS  |
| Script Events | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All |
| Script Canvas Testing | 🟢 Complete | 🟡 Partial | ⭕ Not Required | 🟠 Volatile | 🟢 Optimized | Windows Linux MacOS  |
| Lua Editor | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | Windows Linux MacOS  |

### User Interface 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| LyShine (2D Render) | 🟡 Active | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🔴 Needs Testing | Windows Linux MacOS  |

### Animation 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| Animation Playback Control | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  |
| Pose Blending | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  |
| Animation Syncing | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  |
| Motion Events | 🔵 Backlogged | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  |
| Bone Masking | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  |
| Motion Extraction (Root Motion) | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  |
| Motion Matching | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🟡 Experimental | 🔵 In Progress | All  |
| Debug Rendering | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  |
| Animation Sharing | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  |
| Animation Compression | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  |
| Multi-threading | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  |
| Retargeting | 🟢 Complete | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  |
| Inverse Kinematics (IK) | 🟢 Complete | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  |
| LOD | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  |
| Blend Tree/State Machine | 🟢 Complete | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  |
| Transition Conditions | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  |
| Wildcard Conditions | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  |
| Debugging Tools (Anim Graph) | 🟢 Complete | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  |
| Visual Tools | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  |
| Software Skinning (Linear, Dual-Quat) | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  |
| GPU Skinning (Linear, Dual-Quat) | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  |
| Morph Target/Facial Animation | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  |
| GPU Accelerated Morphing | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  |
| Simulated Objects/Dynamic Bones | 🟢 Complete | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  |
| Ragdoll Runtime | 🟢 Complete | 🟡 Partial | ⭕ Not Required | 🟡 Experimental | 🔵 In Progress | All  |
| Cloth Authoring | 🟢 Complete | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  |
| Collider Authoring Tools | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🔵 In Progress | 🔵 In Progress | All  |
| Attachments | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  |
| Skinned Attachments | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  |

### World Building 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| Terrain | 🟡 Active | 🟠 Minimal | ❌ None | 🟡 Experimental | 🟡 Needs Optimization | Windows |
| Dynamic Vegetation | 🟢 Complete | 🟢 Complete | 🟠 Partial | 🟢 Stable | 🟡 Needs Optimization | All |

### Viewport 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| Manipulators | 🟡 Active | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | Windows Linux MacOS  |
| Component Mode | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🔵 In Progress | 🔴 Needs Testing | Windows Linux MacOS  |
| Viewport UI | 🟡 Active | 🟠 Minimal | ⭕ Not Required | 🔵 In Progress | 🔴 Needs Testing | Windows Linux MacOS  |
| Interaction Model | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | Windows Linux MacOS  |
| Camera | 🟡 Active | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | Windows Linux MacOS  |
| View Bookmarks | 🟡 Active | 🟠 Minimal | ⭕ Not Required | 🟡 Experimental | 🔴 Needs Testing | Windows Linux MacOS  |
| Manipulator Test Framework | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | Windows Linux MacOS  |
| Visibility | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | Windows Linux MacOS  |
| Editor Mode Visual Feedback | 🟡 Active | 🟠 Minimal | ⭕ Not Required | 🟡 Experimental | 🔵 In Progress | Windows Linux MacOS  |

### White Box Tool 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| Atom Integration | 🟢 Complete | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  |
| Viewport Editing | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | Windows Linux MacOS  |
| Triangulation | 🔵 Backlogged | ❌ None | ⭕ Not Required | ❌ Unproven | ❌ Unsupported | Windows Linux MacOS  |
| Boolean Operations | 🔵 Backlogged | ❌ None | ⭕ Not Required | ❌ Unproven | ❌ Unsupported | Windows Linux MacOS  |
| Custom UV Mapping | 🔵 Backlogged | ❌ None | ⭕ Not Required | ❌ Unproven | ❌ Unsupported | Windows Linux MacOS  |

## SIG-Core 

### Core features 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| AzCore | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  |
| AzFramework | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  |
| Math libraries | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  |
| SDK Build | 🟢 Complete | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | Windows Linux MacOS  |
| Reflection frameworks | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🟡 Needs Optimization | All  |
| Streaming system | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🔵 In Progress | All  |
| Input system | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  |
| Logging and tracing | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟡 Needs Optimization | All  |
| Profiling | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🟠 Volatile | 🔵 In Progress | Windows  |
| Optimised standard library | 🟡 Active | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔵 In Progress | All  |

### Physics API (minimal, non-backend specific) 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| Collision Filtering | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟠 Volatile | 🔴 Needs Testing ||
| Collision Filtering - Programmable Reserved Bits | 🔵 Backlogged | ❌ None |||||
| Joints | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing ||
| Rigid Bodies | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing ||
| Multiple Scenes | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟡 Experimental | 🔴 Needs Testing ||
| Character Controller | 🟢 Complete | 🟡 Partial | ⭕ Not Required | 🟠 Volatile | 🔴 Needs Testing ||
| Ragdoll | 🟢 Complete | 🟡 Partial | ⭕ Not Required | 🟠 Volatile | 🔴 Needs Testing ||
| Materials | 🟡 Active | 🟢 Complete | ⭕ Not Required | 🟠 Volatile | 🔴 Needs Testing ||
| Shapes | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing ||
| Heightfields | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🟠 Volatile | 🔴 Needs Testing ||
| Wind | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟡 Experimental | 🔴 Needs Testing ||
| Scene Queries | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing ||

### Nvidia PhysX Integration 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| Ticking | 🔵 Backlogged | 🟡 Partial | ⭕ Not Required | 🟠 Volatile | 🔴 Needs Testing | All  |
| Rigid Body Simulation | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟡 Needs Optimization | All  |
| Continuous Collision Detection (CCD) | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  |
| Collision Asset Pipeline | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  |
| Convex Decomposition | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  |
| Primitive Fitting | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  |
| Primitive Colliders | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  |
| Asset Colliders | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  |
| Shape Colliders | 🟢 Complete | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  |
| Heightfield Colliders | 🟡 Active | 🟠 Minimal | ⭕ Not Required | 🟠 Volatile | 🟡 Needs Optimization | All  |
| Triggers | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  |
| Force Regions | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  |
| Wind | 🔵 Backlogged | 🟡 Partial | ⭕ Not Required | 🟡 Experimental | 🔴 Needs Testing | All  |
| Materials | 🟡 Active | 🟢 Complete | 🟢 Complete | 🟠 Volatile | 🔴 Needs Testing | All  |
| Collision Filtering | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  |
| Joints | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  |
| Articulations | 🟠 Planned | ❌ None | ⭕ Not Required | ❌ Unproven | 🔴 Needs Testing | All  |
| Character Controller | 🟢 Complete | 🟠 Minimal | ⭕ Not Required | 🟠 Volatile | 🔴 Needs Testing | All  |
| Ragdoll | 🟡 Active | 🟡 Partial | 🟢 Complete | 🟠 Volatile | 🔴 Needs Testing | All  |
| Scripting | 🟢 Complete | 🟠 Minimal | ❌ None | 🟠 Volatile | 🔴 Needs Testing | All  |
| Scene Queries | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  |
| Multi-Scene | 🔵 Backlogged | ❌ None | ⭕ Not Required | ❌ Unproven | 🔴 Needs Testing | All  |
| PhysX Visual Debugger Integration | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | Windows  |
| Debug Visualization | 🟢 Complete | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | Windows Linux MacOS  |
| Mesh Simplification | ❌ Unscheduled | || || |

### Cloth - NvCloth Integration 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| Generic API | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  |
| Support for Mesh Components | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔵 In Progress | All  |
| Support for Actor Components | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔵 In Progress | All  |
| Mesh Simplification | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  |
| Simulation Constraints | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  |
| Realtime Editing | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  |
| Wind | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  |
| Actor Colliders | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  |
| CCD | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  |
| Self Collision | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  |
| Async Simulation | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  |
| Debug Visualization | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🔴 Needs Testing | All  |
| Environmental Collision | 🔵 Backlogged | ❌ None | || ||
| Painting Tool | 🔵 Backlogged | ❌ None | || ||
| LOD | 🔵 Backlogged | ❌ None | || ||
| Mesh Collision | 🔵 Backlogged | ❌ None | || ||

### Destruction - Nvidia Blast Integration 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| Authoring/Pipeline | 🔵 Backlogged | 🔵 In-Design | ⭕ Not Required | 🟡 Experimental | 🔴 Needs Testing | Windows  |
| Geometry Destruction Simulation | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟡 Experimental | 🔴 Needs Testing | Windows  |
| Materials | 🟡 Active | 🟢 Complete | ⭕ Not Required | 🟡 Experimental | 🔴 Needs Testing | Windows  |
| Scripting | 🟢 Complete | 🟠 Minimal | ⭕ Not Required | 🟡 Experimental | 🔴 Needs Testing | Windows  |
| Atom Integration | 🔵 Backlogged | 🟠 Minimal | ⭕ Not Required | 🟡 Experimental | 🔴 Needs Testing | Windows  |
| PhysX Integration | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟡 Experimental | 🔴 Needs Testing | Windows  |

### Vehicles 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| Vehicles | ❌ Unscheduled | || || |

### Fluids 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| Fluids | ❌ Unscheduled | || || |

### Soft Bodies 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| Soft Bodies | ❌ Unscheduled | || || |

## SIG-Graphics-Audio 

### Features 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| Deferred Fog | 🟢 Complete | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | All  |
| Tonemapping | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟡 Needs Optimization | All  |
| Direct Lighting / Area Lights | 🟢 Complete | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟡 Needs Optimization | All  |
| Meshes | 🟡 Active | 🟡 Partial | 🟢 Complete | 🟢 Stable | 🟡 Needs Optimization | All  |
| Skinned Meshes | 🟡 Active | 🟡 Partial | 🟢 Complete | 🟢 Stable | 🟡 Needs Optimization | All  |
| Eye Adaptation | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟡 Needs Optimization | All  |
| Culling | 🟡 Active | 🟡 Partial | 🟢 Complete | 🔵 In Progress | 🟡 Needs Optimization | All  |
| HDR Pipeline | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟡 Needs Optimization | All  |
| Shadows | 🟡 Active | 🟡 Partial | 🟢 Complete | 🔵 In Progress | 🟡 Needs Optimization | All  |
| Skybox and Physical Sky | 🟢 Complete | 🟡 Partial | 🟢 Complete | 🟢 Stable | 🟡 Needs Optimization | All  |
| SSAO | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟢 Optimized | All  |
| Color Grading | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟡 Needs Optimization | All  |
| Depth of Field | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟡 Needs Optimization | All  |
| PBR Materials | 🟡 Active | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟡 Needs Optimization | All  |
| Post Processing Volumes | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟡 Needs Optimization | All  |
| Decals | 🟡 Active | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟡 Needs Optimization | All  |
| Screen Space Reflections | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟡 Needs Optimization | All  |
| Subsurface Scattering | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟡 Needs Optimization | All  |
| Motion Vectors | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟢 Optimized | All  |
| Temporal Anti-aliasing (TAA) | 🟡 Active | 🟡 Partial | 🟢 Complete | 🔵 In Progress | 🟡 Needs Optimization | All  |

### Render Hardware Interface 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| DirectX 12 | 🟡 Active | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟡 Needs Optimization | |
| Vulkan | 🟡 Active | 🟢 Complete | ⭕ Not Required | 🟢 Stable | 🟡 Needs Optimization | |
| Metal | 🟡 Active | 🟡 Partial | ⭕ Not Required | 🟠 Volatile | 🟡 Needs Optimization | |

### Audio 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| Wwise Integration | 🟢 Complete | 🟡 Partial | ⭕ Not Required | 🟢 Stable | 🟢 Optimized | |

## SIG-Network 

### Core Networking 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| Transport API | 🟢 Complete | || || |
| Multiple network interface support | 🟢 Complete | || || |
| Compression (TCP/UDP) | 🟢 Complete | || || |
| Metrics support | 🟢 Complete | || || |
| UDP Core | 🟢 Complete | || || |
| UDP: DTLS support | 🟢 Complete | || || |
| UDP: Reliable queue support | 🟢 Complete | || || |
| UDP: Fragmentated packet support | 🟢 Complete | || || |
| TCP | 🟢 Complete | || || |
| TCP: TLS Support | 🟢 Complete | || || |
| TCP: Ringbuffer support Pkg Xmit | 🟢 Complete | || || |

### Multiplayer 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| Multiplayer component API | 🟢 Complete | || || |
| Local Prediction | 🟢 Complete | || || |
| Server Side Rollback | 🟢 Complete | || || |
| Play in Editor Mode | 🟡 Active | || || |
| Hosting/Joining a Game | 🟢 Complete | || || |
| Network property support | 🟢 Complete | || || |
| RPC support | 🟢 Complete | || || |
| Network Input support | 🟡 Active | || || |
| ScriptBind support | 🟡 Active | || || |
| Netbound entity support [NetBindComponent] | 🟢 Complete | || || |
| Entity replication support | 🟢 Complete | || || |
| Network Prefab Spawning | 🟡 Active | || || |:w
| Networked Animation | ❌ Unscheduled | || || |
| Network Audio Support | ❌ Unscheduled | || || |
| Network Simulation (Physics) | 🟢 Complete | || || |
| Quality of Service | 🟡 Active | || || |
| Debugging Tools | 🟡 Active | || || |
| Metrics | 🟡 Active | || || |

### AWS Cloud Services 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| HTTPS Support | 🟢 Complete | || || |
| Restful API Support | 🟡 Active | || || |
| AWS C++ SDK Support | 🟢 Complete | || || |
| Client Side Ident & Auth | 🟡 Active | || || |
| Runtime Metrics | 🟡 Active | || || |
| Amazon GameLift Support | 🟡 Active | || || |

### Microsoft Azure Cloud Services 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| Core services | ❌ Unscheduled | || || |

## SIG-Platform 

### Platform Abstraction Layer 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| PAL CMake | 🟡 Active | 🟡 Partial | || ||
| PAL Tools/Editor/AP | 🟡 Active | 🟡 Partial | || ||

### Platform Configure (Engine Centric) 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| Windows | 🟢 Complete | 🟢 Complete | || ||
| Mac | 🟢 Complete | 🟢 Complete | || ||
| Android | 🟢 Complete | 🟢 Complete | || ||
| Linux | 🟢 Complete | 🟢 Complete | || ||

### Platform Build (Engine Centric) 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| Windows | 🟢 Complete | 🟢 Complete | || ||
| Mac | 🟢 Complete | 🟢 Complete | || ||
| Android | 🟢 Complete | 🟢 Complete | || ||
| Linux | 🟢 Complete | 🟢 Complete | || ||


### Platform Configure (Project Centric) 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| Windows | 🟡 Active | 🟡 Partial | || ||
| Mac | 🟡 Active | 🟡 Partial | || ||
| Android | 🟡 Active | 🟡 Partial | || ||
| Linux | 🟡 Active | 🟡 Partial | || ||

### Platform Build (Project Centric) 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| Windows | 🟡 Active | 🟡 Partial | || ||
| Mac | 🟡 Active | 🟡 Partial | || ||
| Android | 🟡 Active | 🟡 Partial | || ||
| Linux | 🟡 Active | 🟡 Partial | || ||

### O3DE Object Externalization 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| Project | 🟢 Complete | 🟢 Complete | || ||
| Gem | 🟢 Complete | 🟢 Complete | || ||
| Template | 🟢 Complete | 🟢 Complete | || ||
| Restricted | 🟡 Active | 🟡 Partial | || ||
| Repo | 🟡 Active | 🔵 In-Design | || ||

### Language/Localization 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| Editor | 🟢 Complete | 🟢 Complete | || ||
| Runtime | 🟡 Active | 🟡 Partial | || ||

### Packaging 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| Windows | 🟢 Complete | 🟢 Complete | || ||
| Mac | 🟢 Complete | 🟢 Complete | || ||
| Android | 🟢 Complete | 🟢 Complete | || ||
| Linux | 🟢 Complete | 🟢 Complete | || ||

## SIG-Testing 

### AutomatedReview 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| Early Warning | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟢 Optimized | |
| CTest | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟢 Optimized | |
| GoogleTest | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟢 Optimized | |
| GoogleBenchmark | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟢 Optimized | |
| PyTest | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟢 Optimized | |
| O3DE EditorTest | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟢 Optimized | |
| Test Metrics | 🟢 Complete | 🟢 Complete | 🟢 Complete | 🟢 Stable | 🟢 Optimized | |

## SIG-UI-UX 

### UI Components 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| Breadcrumb navigation | 🟢 Complete | 🟢 Complete | || ||
| Browse Edit | 🟢 Complete | 🟢 Complete | || ||
| Button | 🟢 Complete | 🟢 Complete | || ||
| Card | 🟠 Planned | 🟡 Partial | || ||
| Checkbox | 🟢 Complete | 🟢 Complete | || ||
| Combobox | 🟢 Complete | 🟢 Complete | || ||
| Context menu | 🟢 Complete | 🟢 Complete | || ||
| Filtered search | 🟠 Planned | 🟡 Partial | || ||
| Line edit | 🟢 Complete | 🟢 Complete | || ||
| Progress indicators | 🟢 Complete | 🟢 Complete | || ||
| Radio button | 🟢 Complete | 🟢 Complete | || ||
| Reflected property editor | 🟠 Planned | 🟡 Partial | || ||
| Scrollbar | 🟢 Complete | 🟢 Complete | || ||
| Slider | 🟢 Complete | 🟢 Complete | || ||
| Spinbox | 🟢 Complete | 🟢 Complete | || ||
| Styled dock | 🟢 Complete | 🟢 Complete | || ||
| Tab | 🟠 Planned | 🟡 Partial | || ||
| Toggle switch | 🟢 Complete | 🟢 Complete | || ||
| Tree view | 🟢 Complete | 🟢 Complete | || ||
| Array | ❌ Unscheduled | ❌ None | || ||
| Table view | 🟢 Complete | 🟢 Complete | || ||

### UX Patterns 

| Module | Feature | Functional | Content | Code/API | Performance | Platform |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| Component Card | 🟡 Active | 🟡 Partial | || ||
| Error handling | 🟠 Planned | 🟠 Minimal | || ||
| Hotkey management | 🔵 Backlogged | 🟠 Minimal | || ||
| UI/UX Responsiveness standard | 🔵 Backlogged | ❌ None | || ||
| Viewport interaction | 🔵 Backlogged | 🔵 In-Design | || ||
