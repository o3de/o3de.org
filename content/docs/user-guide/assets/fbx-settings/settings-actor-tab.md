---
description: null
title: FBX Settings Actors tab
---

Actors are assets with at least one bone and can contain one or more skinned meshes. By default, all actors in the `.fbx` file are processed. However, you can manually exclude individual actors within your `.fbx` file. You can also process multiple actors from a single `.fbx` file. Each **Actor group** produces its own `.actor` file. The processed runtime assets appear in **Asset Browser** as children of the `.fbx` file.

**Contents**
+ [Actors tab properties](#fbx-settings-actors-tab-properties)
+ [Comment modifier](#w31aac15b9c11c13c13)
+ [Coordinate system change modifier](#w31aac15b9c11c13c15)
+ [Level of Detail modifier](#w31aac15b9c11c13c17)
+ [Material modifier](#w31aac15b9c11c13c19)
+ [Mesh modifier](#w31aac15b9c11c13c21)
+ [Scale actor modifier](#w31aac15b9c11c13c23)
+ [Skeleton optimization modifier](#w31aac15b9c11c13c25)
+ [Skin modifier](#w31aac15b9c11c13c27)
+ [Tangents modifier](#w31aac15b9c11c13c29)

## Actors tab properties 

![The FBX Settings Actors tab.](/images/user-guide/fbx/ui-fbx-settings-actors-tab.png)

****Add another actor****
Add an **Actor group** to process. Each **Actor group** produces a `.actor` file.

****Name actor****
Enter a name for the **Actor**. This is the name of the `.actor` file that appears in **Asset Browser** as a child of the `.fbx` file.

****Select root bone****
Select the root bone of the skeleton hierarchy. The top parent bone of the skeleton is automatically selected as the default bone. All descendant bones of the root bone are processed.

****Select base meshes****
Specify the meshes to process from the `.fbx` file for this **Actor group**. Choose the **Hierarchy** icon to see a list of meshes found in the `.fbx` file. Select meshes from the list to include them in the **Actor group** and process as visible render meshes. If the `.fbx` contains meshes that are intended to be used as PhysX collider meshes, or meshes that are not skinned to the skeleton hierarchy being processed, you should exclude them from the **Actor group** by deselecting them in this list.
If you have defined level of detail meshes for your actor by appending `_lod0` through `_lod5` to meshes in the `.fbx` file, the `_lod0` meshes are automatically selected for the **Select base meshes** property.

****Add Modifier****
Modifiers add additional specialized options for processing assets. Choose the **Add Modifier** button to see a list of available modifiers:
+ **Comment**
+ **Coordinate system change**
+ **Material**
+ **Mesh**
+ **Scale actor**
+ **Skeleton optimization**
+ **Skin**
+ **Tangents**
Some modifiers are not be available unless the gem that provides the modifier is enabled in your project.

## Comment modifier 

![The FBX Settings Actors tab Comment modifier.](/images/user-guide/fbx/ui-fbx-settings-mesh-modifier-comment.png)

Add a comment to the file. You can add a comment about changes made to the `.fbx` file for tracking purposes or notes on export options, for example. Comments don't affect how files are processed and multiple comment modifiers can be added to a mesh group.

## Coordinate system change modifier 

![The FBX Settings Actors tab Coordinate system change modifier.](/images/user-guide/fbx/ui-fbx-settings-actor-modifier-coord-sys-change.png)

Modify the coordinate system of the actor. Third-party content creation applications use varying coordinate systems with content applications often rotating the direction of the forward axis. The **Facing direction** property can be set to rotate the actor 180 degrees around its up axis to account for this difference. The rotation is applied when the asset is processed and the `.fbx` file remains unchanged.

## Level of Detail modifier 

![The FBX Settings Actor tab Level of Detail modifier.](/images/user-guide/fbx/ui-fbx-settings-actor-modifier-lod.png)

The **Level of detail** (LoD) modifier is added to the **Actor group** automatically when LoDs are found in the `.fbx` file. Choose the **Hierarchy** button to verify or modify the meshes and bones assigned to each LoD. Actors support up to 6 levels of detail including the base level of detail \[`0`\].

**Note**
The **Level of detail** modifier for **Actor groups** cannot be added or removed manually and does not appear in the modifier list. The **Level of detail** modifier is automatically added and configured when actor LoDs are found in an `.fbx` file.

 LoDs are optimized assets with progressively lower polygon counts, fewer and smaller textures, and simplified materials. An Actor LoD can also have a simplified skeleton where some leaf bones have been removed from the skeleton. The farther an entity is from the camera, the less detail is required from the actor contained in the entity. As the entity moves farther from the camera, it swaps to a lower actor LoD.

You can create up to six LoDs for actors which are numbered \[`0`\] to \[`5`\], with \[`0`\] being the *highest* level of detail. LoD \[`0`\] contains the highest resolution meshes and textures, the most complex materials, and is displayed when the entity is closest to the camera. LoDs are not required. Creating LoDs, however, is recommended because they help get the best performance and visual fidelity across a range of platforms with different hardware capabilities.

**Note**
When you author the actor in your 3D application, you must add `_lod0`, `_lod1`, `_lod2`, `_lod3`, `_lod4`, `_lod5` as suffixes to your mesh names to automatically add a **Level of Detail** modifier and assign the meshes to appropriate LoDs. `_lod1` is mapped to \[`1`\], `_lod2` is mapped to \[`2`\], and so on.

**Important**
The meshes for the highest level of detail, \[`0`\], and the corresponding skeleton are assigned in the **Select base meshes** and **Select root bone** properties of the **Actor group** automatically. Meshes labeled `_lod1` through `_lod5` and their skeleton hierarchies are assigned to corresponding LoDs in the **Level of Detail** modifier.

For more information, see [Using Actor LODs to Optimize Game Performance](/docs/user-guide/visualization/animation/using-actor-LODs-optimize-game-performance.md).

## Material modifier 

![The FBX Settings Actors tab Material modifier.](/images/user-guide/fbx/ui-fbx-settings-mesh-modifier-material.png)

 The **Material** modifier helps automatically manage the contents of the `.mtl` file that corresponds to the **Actor group** when actor assets are updated.

A material is a combination of shaders and properties that define the surface of a mesh. Materials contain shader and texture assignments, settings for shader properties such as smoothness, opacity, emissive color, etc., and if necessary, a physics material assignment that defines physical properties such as friction. An **Actor group** processed with a file named `myfile.actor` has a corresponding material file named `myfile.mtl`.

When an **Actor group** is processed, **Asset Browser** generates a material file \(`.mtl`\) containing a list of materials and their property settings for the mesh group. A mesh can have multiple materials, and an **Actor group** can have multiple meshes, so the `.mtl` file might contain several materials even if the asset seems simplistic visually.

****Update materials****
When enabled, updates the texture map file names in the `.mtl` file to match the texture map names in defined in the `.fbx` file.

****Remove unused materials****
When enabled, removes materials that are present in the `.mtl` file that are not defined in the `.fbx` file.

## Mesh modifier 

![The FBX Settings Actors tab Mesh modifier.](/images/user-guide/fbx/ui-fbx-settings-actor-modifier-mesh.png)

Set a vertex color stream and its precision for the Actor's visible render mesh.

****Vertex color stream****
If the mesh for this **Actor group** contains a vertex color stream, it can be selected from this list to be processed.
Vertex color streams contain per vertex color data that can be referenced by materials. Vertex color streams are also often used for tagging meshes with arbitrary data such as the inverse mass value used in cloth simulation. Because of this, a mesh might have multiple vertex color streams. Be sure to select a vertex color stream intended to be referenced by materials if multiple streams exist.

****Vertex color mode****
Set the vertex color precision to either 32 bit (8 bits per channel) or 128 bit (32 bits per channel).
Vertex color streams contain four channels: red, green, blue, and alpha. Setting the mode to 32 bit vertex color precision saves significant memory over 128 bit vertex color precision at a loss of dynamic range. If you are targeting a platform with memory constraints, using 32 bit precision is a very useful optimization. If you are targeting a platform that supports high dynamic range (HDR) display, 128 bit precision offers much greater color fidelity.

## Scale actor modifier 

![The FBX Settings Actors tab Scale actor modifier.](/images/user-guide/fbx/ui-fbx-settings-actor-modifier-scale-actor.png)

The **Scale factor** modifier sets a uniform scale for the **Actor group**. This setting is useful if your assets are created in an application that uses a different base standard unit of measurement than O3DE.

## Skeleton optimization modifier 

![The FBX Settings Actors tab Skeleton optimization modifier.](/images/user-guide/fbx/ui-fbx-settings-actor-modifier-skeleton-optimization.png)

The **Skeleton optimization** modifier automatically optimizes Actor skeletons for client and server scenarios.

**Auto Skeleton LoD**
When enabled, unskinned bones (bones not weighted to any vertices), are optimized out of the client side skeleton hierarchy.

**Server Skeleton Optimize**
When enabled, bones that do not have colliders attached are optimized out of the server side skeleton hierarchy.

**Critical bones**
Choose the **Hierarchy** button to select bones that should not be optimized out of the hierarchy. Your actor might have bones that have no skin weights such as attachment bones for weapons and accessories, for example, that you do not want optimized out of the hierarchy.

## Skin modifier 

![The FBX Settings Actors tab Skin modifier.](/images/user-guide/fbx/ui-fbx-settings-actor-modifier-skin.png)

The **Skin** modifier sets the maximum bones and minimum weight per vertex.

**Max weights per vertex**
The maximum number of bones that can influence a vertex. Values range from a minimum of **1** to a maximum of **4**.

**Weight threshold**
The minimum bone weight per vertex. Weight values beneath this threshold are ignored during export. Values range from a minimum of **0** to a maximum of **0.01**.

## Tangents modifier 

![The FBX Settings Actors tab Tangents modifier.](/images/user-guide/fbx/ui-fbx-settings-actor-modifier-tangents.png)

The **Tangents** modifier generates or exports tangents and bitangents from your `.fbx` file. You should use the same tangent space you use to generate normal maps to achieve the desired appearance in O3DE.

Normal maps can make a surface appear as though it has more geometric surface detail than exists in the mesh. The normals in the map are in tangent space which points in the positive Z direction. Tangent space is local to the surface and is used to transform the normals in the normal map into world space so the material can be lit and rendered correctly on a deforming surface such as a character mesh. You can create tangents and bitangents in your third-party content application and save them as vertex attributes, then export the tangents with the **Tangents** modifier, or use the **Tangents** modifier to generate tangents when the mesh for this **Actor group** is processed.

**Tangent space**
Defines the tangent space that O3DE uses for an actor. Choose from the following options:
+ **MikkT** - Uses MikkT to generate the tangents. MikkT is a widely used solution for generating tangent space that strives for consistency regardless of changes and optimizations to the source mesh. This is the default setting.
+ **From FBX** - Export the tangents from the FBX file.
+ **EMotion FX** - Use EMotion FX to calculate the tangents.
**Warning**
The **EMotion FX** option is for backward compatibility only and is not recommended.

**Bitangents**
Defines how to generate or read the bitangents.
+ **Use from source** - Use the bitangents from the FBX file or the output from the tangent generator used (MikkT).
+ **Orthogonal** - Generates the bitangents orthogonal to the tangent and normal. This is the default setting.

****Normalize****
When enabled, tangents and bitangents are normalized. **Normalize** is enabled by default.

****UV set****
The index of the UV set to generate tangents from. The default setting is **0**, the first UV set.
