---
linktitle: Terrain World
title: Terrain World Component
description: The Terrain World component allows the bounds of the world and the height query resolution to be set. 
toc: true
---

The **Terrain World** component provides the data required for other terrain system components.

{{< important >}}
You must add this component to the *Level* entity, the parent of all entities in an **Open 3D Engine (O3DE)** level.
{{< /important >}}

## Usage 

The **Min Height** and **Max Height** bounds should be set to as small a range as possible for the most accurate height values. For instance, the terrain renderer uses 16 bit height values, which provides 65536 possible distinct heights. If the difference between the min and max height is 1km, that's a resolution of about 1.5cm.

**Height Query Resolution** is a synchronization point for terrain height used by different terrain systems like physics and rendering. For physics, this controls the density of the underlying height field collider. For rendering, this determines the triangle density of the closest level of detail.

**Surface Data Query Resolution (m)** is similar to above, but it controls the resolution of surface data instead of heights. For instance, this affects the density of detail materials for detail material blending.

## Provider ##

[Terrain Gem](/docs/user-guide/gems/reference/environment/terrain)

## Terrain World Properties ##

![Terrain World component interface.](/images/user-guide/components/reference/terrain/terrain-world-A.png)

| Property | Description | Values | Default |
| - | - | - | - |
| Min Height | The minimum value for the height of terrain. The **min** value must be less than the **max** value.| -65536.0 to 65536.0 | 0.0 |
| Max Height | The maximum value for the worlds bounds. The **max** value must be greater than the **min** value. | -65536.0 to 65536.0 | 1024.0 |
| Height Query Resolution (m) | The distance between each height sample position, in meters. | 0.1 to Infinity | 1.0 |
| Surface Data Query Resolution (m) | The distance between each surface data sample position, in meters. | 0.1 to Infinity | 1.0 |

{{< note >}}
Because large numbers of terrain height samples can take a long time to calculate, O3DE will not allow the number of samples to exceed 8 million.
{{< /note >}}
