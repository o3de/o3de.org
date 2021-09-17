---
title: Terrain Physics Collider component
linktitle: TerrainPhysicsCollider
description: ' Open 3D Engine (O3DE) Terrain Physics Collider reference. '
weight: 100
---

The **Terrain Physics Collider** component provides terrain data to the physics system in the form of a heightfield.  
The dimensions of the collider can be configured by modifying the [Box component](/docs/user-guide/components/reference/shape/box-shape) on the same entity.
The **Box component** is required for the **Terrain Physics Collider** to operate.

## Provider ##

[Terrain Gem](/docs/user-guide/gems/reference/terrain)

## HeightfieldProviderRequestsBus ##

Use the following request functions with the `HeightfieldProviderRequestsBus` EBus interface to communicate with other components of your game.

### GetHeightfieldGridSpacing

Retrieves the resolution on the heightfield.

**Parameters**  
None

**Return**  
The resolution of the heightfield grid.
Type: Vector2

### GetHeightfieldGridSize

Retrieves the size of the heightfield in the form of a row and column count.

**Parameters**  
NumColumns \[out\] - The number of columns in the heightfield.
Type: Int  
NumRows \[out\] - The number of rows in the heightfield. 
Type: Int

**Return**  
None

### GetHeights

Retrieves the heightfield array.

**Parameters**  
None

**Return**  
The array of heights.
Type: AZStd::vector<int16_t>

### GetScale

Returns the value used to convert between float heights and the int16_t values in the heightmap.

**Parameters**  
None

**Return**  
The scale factor.
Type: float

### UpdateHeights

Retrieves a subsection of the heightfield array within the given bounds.

**Parameters**  
DirtyRegion - The bounds of the required region.
Type: AZ::Aabb

**Return**  
The array of heights.
Type: AZStd::vector<int16_t>

