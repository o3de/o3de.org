---
linktitle: Terrain World Renderer
title: Terrain World Renderer Component
description: The Terrain World Renderer component renders the terrain within the world.
toc: true
---

The **Terrain World Renderer** component visualizes terrain in the world and controls its various global properties.

{{< important >}}
You must add this component to the *Level* entity, the parent of all entities in an **Open 3D Engine (O3DE)** level.
{{< /important >}}

## Provider

[Terrain Gem](/docs/user-guide/gems/reference/environment/terrain)

## Dependencies

[Terrain World](/docs/user-guide/components/reference/terrain/world)

## Properties

![Terrain World Renderer component interface.](/images/user-guide/components/reference/terrain/terrain-world-renderer-A.png)

### Mesh Configuration properties

| Property | Description | Values | Default |
| - | - | - | - |
| **Mesh render distance** | The distance in meters from the camera that terrain meshes render to. | 1.0 - 100000.0 | `4096.0` |
| **First LOD distance** | The distance in meters from the camera that the first LOD renders to. Subsequent LODs are located at double the distance from the previous LOD. | 1.0 - 10000.0 | `128.0` |
| **Continuous LOD (CLOD)** | If enabled, activates the use of continuous level of detail, which smoothly blends geometry between terrain LODs. | Boolean | `Enabled` |
| **CLOD Distance** | Distance in meters over which the first LOD blends into the next LOD. Subsequent LODs blend over double the distance of the previous LOD. This creates a consistent visual appearance. <br><br>  We recommend this value is less than about 25% of **First LOD distance**. If set too low, then seams may appear in the terrain. | 0.0 - 1000.0 | `16.0` |

### Detail Configuration

| Property | Description | Values | Default |
| - | - | - | - |
| **Height based texture blending** | If enabled, detail materials use the height texture for blending. | Boolean | `Disabled` |
| **Detail material render distance** | The distance in meters from the camera that the detail material renders to. | 1.0 - 2048.0 | `512.0` |
| **Detail material fade distance** | The distance in meters over which the detail material fades out into the macro material. | 0.0 - 2048.0 | `64.0` |
| **Detail material scale** | The scale that all detail materials render at. | 0.0001 - 10000.0 | `1.0` |

### Clipmap Configuration

| Property | Description | Values | Default |
| - | - | - | - |
| **Clipmap Enabled** | If enabled, renders terrain materials with clipmaps, instead of rendering the materials directly every frame. | Boolean | `Disabled` |
| **Clipmap image size** | The size of the clipmap image in each layer. | `512`, `1024`, or `2048` | `1024` |
| **Macro clipmap max resolution: texels/m** | The resolution of the highest resolution clipmap in the stack. | 0.1 - 100.0 | `2.0` |
| **Detail clipmap max resolution: texels/m** | The resolution of the highest resolution clipmap in the stack. | 10.0 - 4096.0 | `2048.0`
| **Macro clipmap scale base** | The scale base between two adjacent clipmap layers of macro materials. For example, 3 means that the (n+1)<sup>th</sup> clipmap covers 3<sup>2</sup> = 9 times the area that's covered by the n<sup>th</sup> clipmap. | 1.1 - 10.0 | `2.0` |
| **Detail clipmap scale base** | The scale base between two adjacent clipmap layers of detail materials. For example, 3 means that the (n+1)<sup>th</sup> clipmap covers 3<sup>2</sup> = 9 times the area that's covered by the n<sup>th</sup> clipmap. | 1.1 - 10.0 | `2.0` |
| **Macro clipmap margin size: texels** | The margin of the clipmap beyond the visible data. Increasing the margins results in less frequent clipmap updates, but also results in lower resolution clipmaps when rendering closer to the camera. | 1 - 16 | `4` |
| **Detail clipmap margin size: texels** | The margin of the clipmap beyond the visible data. Increasing the margins results in less frequent clipmap updates, but also results in lower resolution clipmaps when rendering closer to the camera. | 1 - 16 | `4` |


## Usage

Mesh Configuration properties control the mesh density and blending of terrain LODs (level of detail). They have a very direct impact on vertex performance. 
The density of the first terrain LOD is set by the query resolution in the [Terrain World](/docs/user-guide/components/reference/terrain/world) component. The **First LOD distance** controls how far to render at this density.
Each subsequent LOD renders twice the distance with half the resolution until it meets the **Mesh render distance**. This means that **First LOD distance** impacts the total triangle count more than the total rendering distance.

Detail Configuration properties impact how far [terrain detail materials](/docs/user-guide/components/reference/terrain/terrain-detail-material) render, how they fade out, and how they blend with each other. Most of these settings have little impact on performance. However, a larger render distance requires more surface data points to be queried as you move around the world, and it also uses more memory.

_Clipmaps_ are a stack of textures that are centered at the view, and replace the direct use of terrain detail and macro materials. The expensive detail material blending operations are done once and saved to the clipmap, instead of being done for every pixel on every frame. They cover different distances, and all are the same resolution. This allows areas near the view to have the most texture detail. Using clipmaps improves performance, but at the cost of texture memory. You can adjust the clipmap configuration to find a balance between the performance gain and the memory cost.
