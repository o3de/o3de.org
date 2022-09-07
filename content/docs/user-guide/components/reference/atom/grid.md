---
title: Grid Component
linktitle: Grid
description: 'Open 3D Engine (O3DE) Grid component reference.'
toc: true
---

The **Grid** component renders a wireframe grid. It is primarily used in scene-building workflows to set a frame of reference and visualize relative sizes and distances between objects.

## Provider ##

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)


## Grid Component Properties
The Grid component has simple properties for changing its size and appearance.

![grid-component-base-properties](/images/user-guide/components/reference/atom/grid/grid-base-properties-ui.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Grid Size** | The total grid size in meters. | 0.0 - 1,000,000 | 32.0 |
| **Axis Color** | The color used for drawing grid lines for the main axis. | (0-255, 0-255, 0-255) | (0, 0, 255) |
| **Primary Grid Spacing** | The distance between grid lines drawn in the primary color. | 0.1 to Infinity | 1.0 |
| **Primary Color** | The color used for drawing primary grid lines. | (0-255, 0-255, 0-255) | (64, 64, 64) |
| **Secondary Grid Spacing** | The distance between grid lines drawn in the secondary color. | 0.1 to Infinity | 0.25 |
| **Secondary Color** | The color used for drawing secondary grid lines. | (0-255, 0-255, 0-255) | (128,128,128) |

## GridComponentRequestBus

| Method Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| 'SetSize' | Sets the size of the entire grid. | Size: Float | None | Yes |
| 'SetPrimarySpacing' | Sets spacing between primary grid lines. | Spacing: Float | None | Yes |
| 'SetSecondarySpacing' | Sets spacing between secondary grid lines. | Spacing: Float | None | Yes |
| 'SetAxisColor' | Sets the color of the grid axis lines. | Line Color: Color | None | Yes |
| 'SetPrimaryColor' | Sets the color of primary grid lines. | Line Color: Color | None | Yes |
| 'SetSecondaryColor' | Sets the color of secondary gridlines. | Line Color: Color | None | Yes |
| 'GetSize' | Gets the size of the entire grid. | None | Size: Float | Yes |
| 'GetPrimarySpacing' | Gets spacing between primary grid lines. | None | Spacing: Float | Yes |
| 'GetSecondarySpacing' | Gets spacing between secondary grid lines. | None | Spacing: Float | Yes |
| 'GetAxisColor' | Gets the color of the grid axis lines. | None | Line Color: Color | Yes |
| 'GetPrimaryColor' | Gets the color of primary grid lines. | None | Line Color: Color | Yes |
| 'GetSecondaryColor' | Gets the color of secondary gridlines. | None | Line Color: Color | Yes |

## GridComponentNotificationBus

| Method Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| 'OnGridChanged' | Notify any handlers that the grid has been modified. | None | None | No |
