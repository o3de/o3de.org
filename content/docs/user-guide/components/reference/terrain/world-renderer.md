---
linktitle: Terrain World Renderer
title: Terrain World Renderer Component
description: The Terrain World Renderer component renders the terrain within the world.
toc: true
---

The **Terrain World Renderer** component renders the terrain within the bounds set by the **Terrain World** component.

{{< important >}}
You must add this component to the *Level* entity, the parent of all entities in an **Open 3D Engine (O3DE)** level.
{{< /important >}}

## Usage 
The terrain renderer component allows terrain to be visualized in the world and controls various global properties that apply to terrain everywhere. 

#### Mesh Configuration
These properties control the mesh density and blending of terrain LODs (level of detail) and have a very direct impact on vertex performance. The density of the first terrain
LOD is set by the query resolution in the [Terrain World](/docs/user-guide/components/reference/terrain/world) component, and **First LOD distance** controls how far to render at this
density. Each subsequent LOD will render for twice the distance at half the resolution all the way until **Mesh render distance** is met. This means that **First LOD distance** actually
has a much greater impact on total triangle count than the total rendering distance.
#### Detail Configuration
These settings impact how far detail materials render, how they fade out, and how they blend with each other. Most of these settings have little impact on performance, however a larger
render distance here will require more surface data points to be queried as you move around the world and also take more memory.
#### Clipmap Configuration
Turning on clipmaps causes all the material blending to be baked into textures for a substantial gain in performance, but also comes with a substantial increase in memory cost.

## Provider

[Terrain Gem](/docs/user-guide/gems/reference/environment/terrain)

## Dependencies

[Terrain World](/docs/user-guide/components/reference/terrain/world)

## Properties

![Terrain World Renderer component interface.](/images/user-guide/components/reference/terrain/terrain-world-renderer-A.png)

| Property | Description | Values | Default |
| - | - | - | - |
| **Mesh Configuration** |
| Mesh render distance | The distance from the camera that terrain meshes will render. | 1.0 to 100000.0 | 4096.0 |
| First LOD distance | The distance from the camera that the first Lod renders to. Subsequent LODs will be at double the distance from the previous LOD. | 1.0 to 10000.0 | 128.0 |
| Continuous LOD (CLOD) | Enables the use of continuous level of detail, which smoothly blends geometry between terrain lods. | Boolean | true |
| CLOD Distance | Distance in meters over which the first lod will blend into the next lod. Subsequent lod blend distances will double with each lod for a consistent visual appearance. | 0.0 to 1000.0 | 16.0
| |
| **Detail Material Configuration** |
| Height based texture blending | When turned on, detail materials will use the height texture to aid with blending. | Boolean | 0.0 |
| Detail material render distance (m) | The distance from the camera that the detail material will render. | 1.0 to 2048.0 | 512.0 |
| Detail material fade distance (m) | The distance over which the detail material will fade out into the macro material. | 0.0 to 2048.0 | 64.0 |
| Detail material scale | The scale at which all detail materials are rendered at. | 0.0001 to 10000.0 | 1.0 |
| |
| **Clipmap Configuration** |
| Clipmap Enabled | When turned on, renders terrain materials with clipmaps instead of rendering the materials directly every frame. | Boolean | false
| Clipmap image size | The size of the clipmap image in each layer. | 512, 1024, or 2048 | 1024
| Macro clipmap max resolution: texels/m | The resolution of the highest resolution clipmap in the stack. | 0.1 to 100.0 | 2.0
| Detail clipmap max resolution: texels/m | The resolution of the highest resolution clipmap in the stack. | 10.0 to 4096.0 | 2048.0
| Macro clipmap scale base | The scale base between two adjacent clipmap layers. For example, 3 means the (n+1)th clipmap covers 3^2 = 9 times the area covered by the nth clipmap. | 1.1 to 10.0 | 2.0
| Detail clipmap scale base | The scale base between two adjacent clipmap layers. For example, 3 means the (n+1)th clipmap covers 3^2 = 9 times the area covered by the nth clipmap. | 1.1 to 10.0 | 2.0
| Macro clipmap margin size: texels | The margin of the clipmap beyond the visible data. Increasing the margins results in less frequent clipmap updates but also results in lower resolution clipmaps rendering closer to the camera. | 1 to 16 | 4
| Detail clipmap margin size: texels | The margin of the clipmap beyond the visible data. Increasing the margins results in less frequent clipmap updates but also results in lower resolution clipmaps rendering closer to the camera. | 1 to 16 | 4
