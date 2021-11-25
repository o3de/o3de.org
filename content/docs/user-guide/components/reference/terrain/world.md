---
linktitle: Terrain World
title: Terrain World Component
description: The Terrain World component allows the bounds of the world and the height query resolution to be set. 
toc: true
---

The **Terrain World** component provides the data required for other terrain system components.

## Provider ##

[Terrain Gem](/docs/user-guide/gems/reference/environment/terrain)

## Terrain World Properties ##

![Terrain World component interface.](/images/user-guide/component/terrain/terrain/ui-terrain-world-A.png)

| Property | Description | Values | Default |
| - | - | - | - |
| World Bounds (min) | The minimum value for the worlds bounds. The **min** value must be less than the **max** value.| Vector3: -2048.0 to 2048.0 | X:`0.0` Y:`0.0` Z:`0.0` |
| World Bounds (max) | The maximum value for the worlds bounds. The **max** value must be greater than the **min** value. | Vector3: -2048.0 to 2048.0 | X:`1024.0` Y:`1024.0` Z:`1024.0` |
| Height Query Resolution (m) | The resolution required between each height sample, in meters. | Vector2: 0.001 to Infinity | X:`1.0` Y:`1.0` |

{{< note >}}
Because large numbers of terrain height samples can take a long time to calculate, O3DE will not allow the number of samples to exceed 8M.
{{< /note >}}
