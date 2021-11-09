---
title: Terrain Physics Collider Component
linktitle: Terrain Physics Collider
description: 'Open 3D Engine (O3DE) Terrain Physics Collider component reference.'
weight: 100
---

The **Terrain Physics Collider** component provides terrain data to the physics system in the form of a heightfield and material assignments.  
You can configure the dimensions of the collider by modifying the [Axis Aligned Box Shape Component](/docs/user-guide/components/reference/shape/axis-aligned-box-shape) on the same entity.

## Usage ##

You can assign which materials are assigned to surfaces, by selecting a surface type in the surface pull down menu, then selecting a physics material type in the material pull down.

## Provider ##

[Terrain Gem](/docs/user-guide/gems/reference/environment/terrain)

## Dependencies ##

[Axis Aligned Box Shape Component](/docs/user-guide/components/reference/shape/axis-aligned-box-shape)

## HeightfieldProviderRequestsBus ##

Use the following request functions with the `HeightfieldProviderRequestsBus` EBus interface to communicate with other components of your game.

### GetHeightfieldGridSpacing

Retrieves the resolution on the heightfield.

#### Parameters
 
None

#### Return

Type: `AZStd::Vector2`  
The resolution of the heightfield grid.

### GetHeightfieldGridSize

Retrieves the size of the heightfield in the form of a row and column count.

#### Parameters

#### `NumColumns \[out\]`

Type: `int32_t`  
The number of columns in the heightfield.

#### `NumRows \[out\]`
Type: `int32_t`  
The number of rows in the heightfield. 

#### Return: 
None

### GetMaterialList

Returns the list of surfaces used by this component.

#### Parameters

None

#### Return
Type: `AZStd::vector<Physics::MaterialId>`  
The array of surface tags.

### GetHeights

Retrieves the heightfield array.

#### Parameters

None

#### Return
 
Type: `AZStd::vector<float>`  
The array of heights.

### GetHeightsAndMaterials

Retrieves an array of the heights in the heightfield, together with the material index for each point.

#### Parameters

None
#### Return

Type: `AZStd::vector<Physics::HeightMaterialPoint>`  
An array of structs containing the height value and an index into the material list provided by the GetMaterialList function.

### UpdateHeights

Retrieves a subsection of the heightfield array within the given bounds.

#### Parameters

#### `DirtyRegion`

Type: `AZ::Aabb`  
The bounds of the required region.

#### Return

Type: `AZStd::vector<float>`
The array of heights.


