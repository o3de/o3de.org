---
linktitle: Terrain World Debugger
title: Terrain World Debugger Component
description: The Terrain World Debugger component provides a means to display a wireframe or bounds representaion of the Terrain World.
toc: true
---

The **Terrain World Debugger** component offers a number of terrain debugging features. These visualizations are entirely optional, and can be toggled on or off individually.

{{< important >}}
You must add this component to the *Level* entity, the parent of all entities in an **Open 3D Engine (O3DE)** level.
{{< /important >}}

## Provider

[Terrain Gem](/docs/user-guide/gems/reference/environment/terrain)

## Dependencies

[Terrain World](/docs/user-guide/components/reference/terrain/world)

## Properties

![Terrain World Debugger component interface.](/images/user-guide/components/reference/terrain/terrain-world-debugger.png)

| Property | Description | Values | Default |
| - | - | - | - |
| Show Wireframe | Displays a wireframe representation of the Terrain World. | Boolean | `Enabled` |
| Show World Bounds | Displays the Terrain World bounds. | Boolean | `Enabled` |
| Show Dirty Region | Displays the most recent dirty region for the terrain. | Boolean | `Disabled` |
| Show Terrain Queries | Displays terrain query visualizations. | Boolean | `Disabled` |

### Terrain Queries Configuration

| Property | Description | Values | Default |
| - | - | - | - |
| **Sampler** | The type of query sampler to use for querying the terrain values. | `Exact`, `Clamp`, or `Bilinear` | `Bilinear` |
| **Point count** | The number of points in each direction to visualize. | 1.0 - 64.0 | `32.0` |
| **Spacing (m)** | Determines how far apart the query results should be drawn in meters. | 0.001 - 10000.0 | `0.5` |
| **Draw Heights** | Enables visualization of terrain height queries. | Boolean | `Enabled` |
| **Height Point Size (m)** | Determines the size of the height point in meters. | 0.0 - 10000.0 | `0.0625` (`1.0f / 16.0f`) |
| **Draw Normals** | Enables visualization of terrain normal queries. | Boolean | `Enabled` |
| **Normal Height (m)** | Determines the height of the normal line in meters. | 0.0 - 10000.0 | `1.0` |
| **Use Camera Position** | Determines whether to use the current camera position or a specified position. | Boolean | `Enabled` |
| **World Position** | Center of the area to draw query results in. | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
