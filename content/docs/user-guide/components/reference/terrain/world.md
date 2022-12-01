---
linktitle: Terrain World
title: Terrain World Component
description: The Terrain World component allows the bounds of the world and the height query resolution to be set. 
toc: true
---

The **Terrain World** component provides the data required for other terrain system components. This component enables the terrain system for the level.

{{< important >}}
You must add this component to the *Level* entity, the parent of all entities in an **Open 3D Engine (O3DE)** level.
{{< /important >}}

## Provider ##

[Terrain Gem](/docs/user-guide/gems/reference/environment/terrain)

## Terrain World Properties ##

![Terrain World component interface.](/images/user-guide/components/reference/terrain/terrain-world-A.png)

| Property | Description | Values | Default |
| - | - | - | - |
| Min Height | The minimum value for the height of terrain. The **Min Height** value must be less than the **Max Height** value.<br><br>Any terrain layer spawners with a height below this height will have their minimum height clipped to the **Min Height** value. | `-65536.0` - `65536.0` | `0.0` |
| Max Height | The maximum value for the height of terrain. The **Max Height** value must be greater than the **Min Height** value.<br><br>Any terrain layer spawners with a height above this height will have their maximum height clipped to the **Max Height** value. | `-65536.0` - `65536.0` | `1024.0` |
| Height Query Resolution (m) | The distance between each height sample position, in meters. | `0.1` - `Infinity` | `1.0` |
| Surface Data Query Resolution (m) | The distance between each surface data sample position, in meters. | `0.1` - `Infinity` | `1.0` |

## Usage 

We recommend that you set the **Min Height** and **Max Height** bounds to as small of a range as possible,  to achieve more accurate height values. The terrain renderer uses 16-bit height values, which provide 65536 possible distinct heights. To get the resolution, calculate `(<Max Height> - <Min Height>) / 65536`. So, if the height range is 1 km, then the resolution is about 1.5 cm. This results in finer height detail. 

**Height Query Resolution** and **Surface Data Query Resolution** are used to define consistent spacing, centered at the origin, for terrain height and surface queries across the entire world. Different systems that use terrain data, such as physics and rendering, can also use these conceptual grids to make implementation decisions about how to best use the terrain data. By default, the terrain system queries the input data only at points aligned to the grid. This creates a consistent view of the input data. However, you can author or generate input data to the terrain system at any resolution. Since the input data is only used at these resolutions, we recommend that input gradients that have quantized source data, like images, match the appropriate query resolution.

For example, if a terrain uses a heightmap image with 10 texels/meter with a 1 meter height query resolution, then 9 out of 10 of the texels are ignored. If the heightmap image has 1 texel/meter with a 1 meter height query resolution, then all of the texels are used.

For physics, **Height Query Resolution** controls the heightfield quad spacing of the underlying collider. For rendering, this determines the triangle density of the closest level of detail.

**Surface Data Query Resolution** affects the density of the detail material weight data that is used for detail material blending.