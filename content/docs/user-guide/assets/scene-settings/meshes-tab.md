---
linkTitle: Meshes Tab
title: Scene Settings Meshes Tab
description: Modifiers and options available in the Scene Settings Meshes tab to process mesh source assets for Open 3D Engine (O3DE). 
weight: 300
toc: true
---

In the **Meshes** tab, you can create mesh groups to be processed as mesh product assets. By default, all meshes that aren't designated as a level of detail (meshes named with a `_lod<n>` postfix) or as a PhysX mesh (meshes named with a `_phys` postfix) are processed in a single mesh group. You can create any number of mesh groups containing specific meshes from the source asset. Each mesh group produces its own product assets. The runtime product assets appear in **Asset Browser** as children of the source asset.

The Meshes tab is available if the source asset contains at least one mesh.

## Meshes tab properties 

![The Scene Settings Meshes tab.](/images/user-guide/assets/scene-settings/meshes-tab.png)


| Property | Description |
| - | - |
| **Add another mesh** | Add a mesh group to process. Each mesh group can contain one or more meshes from the source asset file. Each mesh group produces a single `.azmodel` and as many `.azlod` and `.azbuffer` product assets as required. |
| **Name mesh**  | The name of the mesh group. All product assets for this mesh group use this name as a prefix. This name is displayed on product assets for this mesh group in Asset Browser. |
| **Select meshes** | Choose the {{< icon browse-edit-select-files.svg >}} **Selection list** button to display a list of meshes found in the source asset. Select meshes from the list to include them in the mesh group. If the source asset contains meshes that are intended to be used as PhysX collider assets, you should exclude them from the mesh group by deselecting them in this list. |
| **Add Modifier** | Modifiers add specialized options for processing source assets. Choose the **Add Modifier** button to display a list of available modifiers. Some modifiers might not be available unless the gem that provides the modifier is enabled in your project. |

## Cloth

![The Scene Settings Meshes tab Cloth modifier.](/images/user-guide/assets/scene-settings/cloth-modifier.png)

Add NVIDIA Cloth data to a selected mesh to simulate cloth physics.

{{< note >}}
Each mesh in the mesh group to be simulated as cloth requires its own Cloth modifier. When a Cloth modifier is added to a mesh group, the **Merge Meshes** property in the **Mesh (Advanced)** modifier is treated as disabled. A cloth mesh needs to be processed independently and cannot be merged with other meshes. For more information, refer to [Simulate cloth with NVIDIA Cloth](/docs/user-guide/interactivity/physics/nvidia-cloth/).

For information on the **Inverse Masses**, **Motion Constraints**, and **Backstop** properties below, refer to [Per vertex properties for cloth](/docs/user-guide/interactivity/physics/nvidia-cloth/vertex-data).
{{< /note >}}

| Property | Description |
| - | - |
| **Select Cloth Mesh** | Select the mesh to have cloth data applied and simulate as a cloth object. |
| **Inverse Masses** | Select a vertex color stream to apply per vertex inverse mass data for cloth simulation. If no vertex color stream is selected, an inverse mass value of `1.0` is assigned to all vertices in the cloth mesh. |
| **Inverse Masses Channel** | Select the channel in the vertex color stream that contains inverse mass data. |
| **Motion Constraints** | Select a vertex color stream to apply per vertex motion constraints data for cloth simulation. If no vertex color stream is selected, a motion constraint value of `1.0` is assigned to all vertices in the cloth mesh. |
| **Motion Constraints Channel** | Select the channel in the vertex color stream that contains motion constraints data. |
| **Backstop** | Select a vertex color stream to apply per vertex backstop data for cloth simulation. If no vertex color stream is selected, backstop is disabled for the cloth mesh. |
| **Backstop Offset Channel** | Select the channel in the vertex color stream that contains backstop offset data. |
| **Backstop Radius Channel** | Select the channel in the vertex color stream that contains backstop radius data. |

## Comment

![The Scene Settings Meshes tab Comment modifier.](/images/user-guide/assets/scene-settings/comment-modifier.png)

Add a comment to the file for the mesh group. You can add a comment about changes made to the source asset file for tracking purposes or notes on export options, for example. Comments don't affect how files are processed. Multiple comment modifiers can be added to a mesh group.

## Coordinate system change

The Coordinate system change modifier is used to reorient a 3D scene source to Open 3D Engine's (O3DE) coordinate system. Most digital content creation (DCC) applications use a right-handed coordinate system with **Y** as the up axis. O3DE's coordinate system is left-handed with **Z** as the up axis.

The Coordinate system change modifier has the following two modes:

### Basic coordinate system change

![The Scene Settings Meshes tab Coordinate system change modifier basic settings.](/images/user-guide/assets/scene-settings/coordinate-system-change-modifier-1.png)

| Property | Description |
| - | - |
| **Facing direction** | Apply a 180 degree rotation around the up axis when product assets are processed. This property can be used to reorient the product assets to O3DE's forward axis, when the forward axis of the source asset aims toward the viewer (which is the default case in most DCC applications). |
| **Use Advanced Settings** | When active, this property exposes the **Advanced coordinate system change** properties. |

### Advanced coordinate system change

![The Scene Settings Meshes tab Coordinate system change modifier advanced settings.](/images/user-guide/assets/scene-settings/coordinate-system-change-modifier-2.png)

Change the **Translation** (position), **Rotation** (orientation), and **Scale** of a mesh relative to how it was authored.

| Property | Description |
| - | - |
| **Relative Origin Node** | Select the source asset node that serves as the origin for the mesh group. The mesh group is transformed relative to the selected node. The node does not need to be part of the mesh group. Generally, the `RootNode` of the source asset is selected here as it represents the scene origin of the source asset. There are cases, however, where it might be preferable to apply the transform relative to a bone or mesh in the source file that is not the `RootNode`. |
| **Translation** | Set the position offset of the product asset. This property is most commonly used to center the product asset or align the product asset with the ground.  |
| **Rotation** | Set the orientation offset of the product asset in degrees. This property is most commonly used to reorient a product asset to O3DE's coordinate system. |
| **Scale** | Set the scale offset of the product asset. O3DE's base unit is one meter. This property is most commonly used to uniformly scale product assets from DCC applications that use centimeters or inches as base units. |

## Level of Detail (LOD)

![The Scene Settings Meshes tab Level of Detail modifier.](/images/user-guide/assets/scene-settings/mesh-lod-modifier.png)

LODs are optimized meshes with progressively lower polygon counts, fewer and smaller textures, and simplified materials. The farther an entity is from the camera, the less detail is required from the meshes that make up the entity. As the entity moves farther from the camera, it swaps to progressively simpler LOD.

You can specify up to five LODs (not including the base mesh) that are numbered \[`0`\] to \[`4`\], with \[`0`\] being the *highest* level of detail. LODs are not required but are recommended because they help get the best performance and visual fidelity across a range of platforms with different hardware capabilities.

* Choose the {{< icon add.svg >}} **Add** button to add an LOD.

* Choose the {{< icon delete.svg >}} **Delete** button to remove an LOD.

* Choose the {{< icon browse-edit-select-files.svg >}} **Selection list** button to specify the meshes to include in the LOD.

{{< note >}}
You can add `_lod0`, `_lod1`, `_lod2`, `_lod3`, `_lod4`, and `_lod5` as suffixes to your mesh names to automatically add a Level of Detail modifier and assign the meshes to the appropriate LOD slots. `_lod0` is the base mesh with the highest resolution geometry, textures, and materials and is assigned to the base mesh group. `_lod1` is assigned to LOD slot **\[0\]**, `_lod2` is assigned to LOD slot **\[1\]**, and so on.
{{< /note >}}

## Material

![The Scene Settings Meshes tab Material modifier.](/images/user-guide/assets/scene-settings/material-modifier.png)

The Material modifier helps automatically manage the contents of the `.material` file that corresponds to the mesh group when mesh assets are updated.

A material is a combination of shaders and properties that define the surface of a mesh. Materials contain shader and texture assignments, settings for shader properties such as smoothness, opacity or emissive color.

| Property | Description |
| - | - |
| **Update materials** | When active, the texture map file names in the `.material` file are updated to match the texture map names defined in the source asset file. |
| **Remove unused materials** | When active, materials that are present in the `.material` file that are not defined in the source asset file are removed. |

## Mesh (Advanced)

![The Scene Settings Meshes tab Mesh (Advanced) modifier.](/images/user-guide/assets/scene-settings/mesh-advanced-modifier.png)

The Mesh (Advanced) modifier adds advanced mesh processing features such as mesh merging and vertex color stream selection.

| Property | Description |
| - | - |
| **Vertex Precision** | This is a legacy property. By default, all meshes use 32-bit precision. |
| **Merge Meshes** | When active, all meshes in the mesh group are combined into a single mesh for optimization. |
| **Use Custom Normals** | When active, custom normals contained in the source asset are processed. Otherwise, averaged normals are generated. Normals are vertex attributes that define the surface direction at each vertex of the mesh. Normals can be customized to make a mesh appear faceted, create hard edges between surfaces, or smooth the appearance of a surface. If this option is active and the source asset does not contain custom normals, averaged normals are automatically generated. |
| **Vertex color stream** | If the meshes for this mesh group contain a vertex color stream, it can be selected from this list to be processed. Vertex color streams contain per vertex color data that can be referenced by materials. Vertex color streams are also often used for tagging meshes with arbitrary data such as the inverse mass value used in cloth simulation. Because of this, a mesh might have multiple vertex color streams. Be sure to select a vertex color stream intended to be referenced by materials as color data if multiple streams exist. |

## Skin

![The Scene Settings Meshes tab Skin modifier.](/images/user-guide/assets/scene-settings/skin-modifier.png)

The Skin Modifier sets limits for processing skin weights for meshes that are bound to a skeleton.

| Property | Description | Values |
| - | - | - |
| **Max weights per vertex** | The maximum number of bone influences per vertex. Though the upper limit of this property allows 32 bones per vertex, a maximum of 4 bones per vertex are supported at the time of this documentation. If a vertex has more than 4 joint influences, and this property has a value greater than 4, only the 4 largest vertex weights are processed for the product asset. | `1` to `32` |
| **Weight threshold** | The minimum value for a bone influence to be included in the product asset. If a vertex skin weight is less than this value, the skinning information (vertex weight and the associated bone index) for the vertex is not included in the product asset. For example, if a vertex has five bone influences, and three of those bone influences have weights that are below this weight threshold, only the two bone influences above this weight threshold are included in the product asset. | `0.0` to `0.01` |

## Tangents

![The Scene Settings Meshes tab Tangents modifier.](/images/user-guide/assets/scene-settings/tangents-modifier.png)

The tangents modifier either imports tangents and bitangents from the source asset, or generates them during asset processing. Tangents and bitangents are vertex attributes that are used in various shading calculations. Tangents and bitangents are particularly important for skinned meshes and for normal and relief maps.

| Property | Description |
| - | - | - |
| **Generation Method** | Tangents and bitangents can be either imported from the source asset (`From Source Scene`), or automatically generated using the `MikkT` algorithm.  |
| **TSpace Method** | The `TSpaceBasic` method generates tangents and bitangents at the vertex or pixel level with a unit length magnitude that are perpendicular to the normal. The `TSpaceBasic` method is suitable for normal mapping. The `TSpace` method calculates tangents and bitangents with their true magnitude. The resulting tangents and bitangents might not be perpendicular to the normal, but are perpendicular to each other. The `TSpace` method is suitable for relief mapping. |
