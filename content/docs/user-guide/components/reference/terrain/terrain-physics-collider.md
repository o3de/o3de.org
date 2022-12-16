---
title: Terrain Physics Heightfield Collider Component
linktitle: Terrain Physics Heightfield Collider
description: 'Open 3D Engine (O3DE) Terrain Physics Heightfield Collider component reference.'
weight: 100
---

The **Terrain Physics Heightfield Collider** component provides terrain data to the physics system in the form of a heightfield and material assignments.  You can configure the dimensions of the collider by modifying the [Axis Aligned Box Shape](/docs/user-guide/components/reference/shape/axis-aligned-box-shape) component on the same entity.

## Provider

[Terrain Gem](/docs/user-guide/gems/reference/environment/terrain)

## Dependencies

[Axis Aligned Box Shape](/docs/user-guide/components/reference/shape/axis-aligned-box-shape)  
[PhysX Heightfield Collider](/docs/user-guide/components/reference/physx/heightfield-collider)

The PhysX Heightfield Collider is only a dependency when using this component with PhysX. When implementing an alternate physics system, the **Terrain Physics Heightfield Collider** requires a companion Heightfield Collider component for that physics system instead.

## Properties

![Terrain Physics Heightfield Collider component properties](/images/user-guide/components/reference/terrain/terrain-physics-heightfield-collider-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Default Surface Physics Material** | Selects a [physics material](/docs/user-guide/interactivity/physics/nvidia-physx/materials) to be used by unmapped surfaces by default. | Material: Physics Material | (default) |
| **Surface to Material Mappings** | An array of [surface tags](/docs/user-guide/gems/reference/environment/surface-data) and physics materials to map together. |  |  |
| **Surface Tag** | Selects a [surface tag](/docs/user-guide/gems/reference/environment/surface-data) to map to a [phsyics material](/docs/user-guide/interactivity/physics/nvidia-physx/materials). | Surface:  Surface Tag | (unassigned) |
| **Material Asset** | Selects a [physics material](/docs/user-guide/interactivity/physics/nvidia-physx/materials) to apply to the surface. | Material: Physics Material | (default) |

## Usage

The physics system receives collision information about the terrain through the **Terrain Physics Heightfield Collider** component. This component takes the region within the associated **Axis Aligned Box Shape** component and creates a heightfield collider in the physics system. The heightfield collider has physics material assignments that varies per vertex based on the underlying terrain surface weights and the surface type to physics material mappings on this component.

Because the terrain system uses the abstracted physics APIs in O3DE, the **Terrain Physics Heightfield Collider** component requires a companion Heightfield Collider component to interact with to convert terrain data into physics data for whichever physics system has been implemented. For example, when using this component with NVIDIA PhysX, the **PhysX Heightfield Collider** component is required on the same entity as the **Terrain Physics Heightfield Collider** to create a terrain heightfield in PhysX.

The **Terrain Physics Heightfield Collider** can exist on the same entity as a **Terrain Layer Spawner** component if it's convenient, but this is not a requirement. The collider is not directly tied to a spawner. This component can be used with any region whether it overlaps multiple spawners, a single spawner, or no spawners at all. The primary advantage to keeping the collider on a separate entity from the spawner is that the physics colliders can be dynamically spawned and despawned at different times and sizes than the terrain. This enables having a large fully viewable terrain in the world and only a small subregion around the player that exists in the physics world for better control over performance and memory usage.

You can assign which terrain surface types map to specific physics materials by selecting a surface type in the surface pull down menu, then selecting a physics material type in the material pull down. Multiple terrain surface types can map to the same physics material. Any terrain surface types that aren't mapped to a specific physics material will automatically be mapped to the **Default Surface Physics Material**.

## HeightfieldProviderRequestsBus

The `HeightfieldProviderRequestsBus` is an internal system bus that is only intended for communication between the physics system and the heightfield component. You should only typically need to use this EBus if you are implementing a new Heightfield Collider component for an alternate physics system. Use the following request functions with the `HeightfieldProviderRequestsBus` EBus interface to communicate with a Terrain Physics Heightfield Collider component.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetHeightfieldGridSpacing` | Returns the resolution of the heightfield. | None | Resolution: Vector2 | No |
| `GetHeightfieldGridSize` | Returns the size of the heightfield in the form of a row and column count. | None | Row Count: Integer; Column Count: Integer | No |
| `GetMaterialList` | Returns an array of surfaces used by this component. | None | Array of Physics Materials Indexes: I | No |
| `GetHeights` | Returns the heightfield as an array of float values. | None | Array of Heights: Float | No |
| `GetHeightsAndMaterials` | Returns an array of the heights in the heightfield, together with the physics material index for each point. | None | Array of Heights: Float, Physics Material Indexes: Integer | No |
| `UpdateHeights` | Returns a subsection of the heightfield array within specific bounds. | Bounds: Aabb | Array of Heights: Float | No |

## HeightfieldProviderNotificationBus

The `HeightfieldProviderNotificationBus` is an internal system bus that is only intended for communication between the physics system and the heightfield component. You should only typically need to use this EBus if you are implementing a new Heightfield Collider component for an alternate physics system. Register for the following notification functions with the `HeightfieldProviderNotificationBus` EBus interface to receieve communications from a Terrain Physics Heightfield Collider component.

| Notification Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `OnHeightfieldDataChanged` | Notifies when any terrain data that affects a heightfield has changed. | Dirty Region: Aabb, Change Mask: Bitfield that contains `Settings` for settings changes, `HeightData` for height changes, `SurfaceData` for surface data changes, and `SurfaceMapping` for surface type to material mapping changes.  | None | No |
