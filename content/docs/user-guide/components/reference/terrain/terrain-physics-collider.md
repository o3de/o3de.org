---
title: Terrain Physics Heightfield Collider Component
linktitle: Terrain Physics Heightfield Collider
description: 'Open 3D Engine (O3DE) Terrain Physics Heightfield Collider component reference.'
weight: 100
---

The **Terrain Physics Heightfield Collider** component provides terrain data to the physics system in the form of a heightfield and material assignments.  You can configure the dimensions of the collider by modifying the [Axis Aligned Box Shape](/docs/user-guide/components/reference/shape/axis-aligned-box-shape) component on the same entity.

## Usage

You can assign which materials are assigned to surfaces, by selecting a surface type in the surface pull down menu, then selecting a physics material type in the material pull down.

## Provider

[Terrain Gem](/docs/user-guide/gems/reference/environment/terrain)

## Dependencies

[Axis Aligned Box Shape](/docs/user-guide/components/reference/shape/axis-aligned-box-shape)

## Properties

![Terrain Physics Heightfield Collider component properties](/images/user-guide/components/reference/terrain/terrain-physics-heightfield-collider-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Default Surface Physics Material** | Selects a physics material to be used by unmapped surfaces by default. | Material: Physics Material | (default) |
| **Surface to Material Mappings** | An array of surface tags and physics materials to map together. |  |  |
| **Surface Tag** | Selects a surface tag to map to a phsyics material. | Surface:  Surface Tag | (unassigned) |
| **Material Asset** | Selects a physics material to apply to the surface. | Material: Physics Material | (default) |

## HeightfieldProviderRequestsBus

Use the following request functions with the `HeightfieldProviderRequestsBus` EBus interface to communicate with Terrain Physics Heightfield Collider components of your game.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetHeightfieldGridSpacing` | Returns the resolution of the heightfield. | None | Resolution: Vector2 | No |
| `GetHeightfieldGridSize` | Returns the size of the heightfield in the form of a row and column count. | None | Row Count: Integer; Column Count: Integer | No |
| `GetMaterialList` | Returns an array of surfaces used by this component. | None | Array of Physics Materials Indexes: I | No |
| `GetHeights` | Returns the heightfield as an array of float values. | None | Array of Heights: Float | No |
| `GetHeightsAndMaterials` | Returns an array of the heights in the heightfield, together with the physics material index for each point. | None | Array of Heights: Float, Physics Material Indexes: Integer | No |
| `UpdateHeights` | Returns a subsection of the heightfield array within specific bounds. | Bounds: Aabb | Array of Heights: Float | No |
