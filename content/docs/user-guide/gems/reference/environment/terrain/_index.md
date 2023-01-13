---
linkTitle: Terrain
title: Terrain Gem
description: Introduction to the Open 3D Engine (O3DE) Terrain Gem.
toc: true
---


The Terrain Gem implements a *terrain system*, which is a system that defines the geometry, color, and surface types for a ground surface, renders the surface, and provides a physics representation.

## Features

The Terrain Gem has the following key features:

* Maps height, color, and surface data to regions of the world.
* Provides gradient-based and shape-based authoring tools and workflows to create and manipulate the terrain data.
* Exposes a queryable API that is usable by both simulation and rendering.
* Renders an efficient, high-quality terrain visualization across the view distance.
* Integrates with physics to provide a "physical" simulation of the terrain in the virtual world.

## Enabling the Terrain Gem

To enable the Terrain Gem, do the following:

1. Use **Project Manager** or the command line to add the Terrain Gem to your project.
2. Build your project using Project Manager, Visual Studio, or CMake.

## Getting started

Refer to the [Create terrain from images](/docs/learning-guide/tutorials/environments/create-terrain-from-images) tutorial for step-by-step instructions on authoring terrain.  
Refer to the [Terrain Developer Guide](/docs/user-guide/visualization/environments/terrain/terrain-developer-guide) for information on using and extending the terrain system as a developer.

## Level Components

| Component | Description |
| - | - |
| [Terrain World](/docs/user-guide/components/reference/terrain/world) | Enables the terrain system and provides the data required for other terrain components. |
| [Terrain World Debugger](/docs/user-guide/components/reference/terrain/world-debugger) | Offers a number of terrain debugging features. These visualizations are entirely optional, and can be toggled on or off individually. |
| [Terrain World Renderer](/docs/user-guide/components/reference/terrain/world-renderer) | Visualizes terrain in the world and controls the global terrain rendering properties. |

## Components

| Component | Description |
| - | - |
| [Terrain Layer Spawner](/docs/user-guide/components/reference/terrain/layer_spawner) | Spawns a terrain region contained within configurable bounds, and allows prioritization of overlapping terrain layers. |
| [Terrain Height Gradient List](/docs/user-guide/components/reference/terrain/height_gradient_list) | Provides terrain height data from a list of gradients. |
| [Terrain Surface Gradient List](/docs/user-guide/components/reference/terrain/surface-gradient-list) | Defines mappings between a gradient and a surface type on a terrain layer. |
| [Terrain Macro Material](/docs/user-guide/components/reference/terrain/terrain-macro-material) | Provides a macro level method of defining the appearance of a region of terrain. |
| [Terrain Surface Materials List](/docs/user-guide/components/reference/terrain/surface-material-list) | Defines mappings between a surface type and a render material. |
| [Terrain Physics Heightfield Collider](/docs/user-guide/components/reference/terrain/terrain-physics-collider) | Provides terrain data to a physics collider in the form of a heightfield and surface to material mapping. |

## CVARs

The Terrain Gem uses the following Console variables (CVARs) either at runtime via the console, or by placing them in configuration. See the general [CVAR guide](/docs/user-guide/appendix/cvars/) for more information on configuring CVARs.

### Terrain Physics

| Name | Description |
| - | - |
| `cl_terrainPhysicsColliderMaxJobs` | The maximum number of jobs to use when updating a Terrain Physics Collider (`-1` will use all available cores). |
| `physx_heightfieldDebugDrawDistance` | Distance for PhysX Heightfield debug visualization in meters. |
| `physx_heightfieldDebugDrawBoundingBox` | Draw the bounding box used for heightfield debug visualization. |
| `physx_heightfieldColliderUpdateRegionSize` | Size of a heightfield collider update region in meters, used for partitioning updates for faster cancellation. |

### Terrain Rendering

| Name | Description |
| - | - |
| `r_terrainClipmapDebugEnable` | Turn on clipmap debug rendering on the screen. |
| `r_terrainClipmapDebugOverlay` | The clipmap type to render on the screen. `0` is none, `1` is the macro texture clipmap, `2` is the detail texture clipmap. |
| `r_terrainClipmapDebugClipmapId` | The clipmap channel to be rendered on the screen. `0` is macro color, `1` is macro normal, `2` is detail color, `3` is detail normal, `4` is detail height, `5` is detail roughness, `6` is detail specular, `7` is detail metalness, and `8` is detail occlusion. |
| `r_terrainClipmapDebugClipmapLevel` | The clipmap level to be rendered on the screen. |
| `r_terrainClipmapDebugScale` | The size multiplier of the clipmap texture's debug display. |
| `r_terrainClipmapDebugBrightness` | A multiplier to the final output of the clipmap texture's debug display. |
| `r_terrainDebugDetailMaterials` | Enable detail material id visualization. |
| `r_terrainDebugDetailImageUpdates` | Enable visualization of detail material update regions. |
| `r_debugTerrainLodLevels` | Enable debug coloring for terrain mesh LODs. |
| `r_debugTerrainAabbs` | Enable visualization of terrain sector AABBs. |
