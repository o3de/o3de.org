---
description: ' Open 3D Engine FBX Settings Meshes tab export properties and modifiers. '
title: FBX Settings Meshes tab
---

{{< preview-migrated >}}

All meshes in the `.fbx` file are processed to a single runtime asset \(`.cgf`\) by default\. In the **Meshes** tab, you can create mesh groups containing specific meshes from the `.fbx` file\. Each **Mesh group** produces its own `.cgf` file\. The processed runtime assets appear in **Asset Browser** as children of the `.fbx` file\.

**Contents**
+ [Meshes tab properties](#fbx-settings-meshes-tab-properties)
+ [Cloth modifier](#w31aac15b9c11c11c11)
+ [Comment modifier](#w31aac15b9c11c11c13)
+ [Level of Detail modifier](#w31aac15b9c11c11c15)
+ [Material modifier](#w31aac15b9c11c11c17)
+ [Mesh \(Advanced\) modifier](#w31aac15b9c11c11c19)
+ [Origin modifier](#w31aac15b9c11c11c21)
+ [Touch Bending modifier](#w31aac15b9c11c11c23)

## Meshes tab properties 

![\[The FBX Settings Meshes tab.\]](/images/user-guide/fbx/ui-fbx-settings-mesh-tab.png)

****Add another mesh****
Add a mesh group to process\. Each mesh group can contain one or more meshes from the `.fbx` file\. Each mesh group produces a `.cgf` file\.

****Name mesh****
Enter a name for the mesh group\. This is the name of the `.cgf` file containing the processed meshes\. The `.cgf` file appears in **Asset Browser** as a child of the `.fbx` file\.

****Select meshes****
Specify the meshes to process from the `.fbx` file for this **mesh group**\. Choose the **Hierarchy** icon to see a list of meshes found in the `.fbx` file\. Select meshes from the list to include them in the mesh group and process as visible render meshes\. If the `.fbx` contains meshes that are intended to be used as PhysX collider assets, you should exclude them from the **Mesh group** by deselecting them in this list\.

****Add Modifier****
Modifiers add specialized options for processing assets\. Choose the **Add Modifier** button to see a list of available modifiers:
+ **Cloth**
+ **Comment**
+ **Level of Detail**
+ **Material**
+ **Mesh \(Advanced\)**
+ **Origin**
+ **Touch Bending**
Some modifiers are not available unless the gem that provides the modifier is enabled in your project\.

## Cloth modifier 

![\[The FBX Settings Meshes tab Cloth modifier.\]](/images/user-guide/fbx/ui-fbx-settings-mesh-modifier-cloth.png)

Add NVIDIA Cloth data to a selected mesh to simulate cloth physics\.

**Note**
Each mesh in the **Mesh group** to simulate as cloth requires its own **Cloth** modifier\.
When a **Cloth** modifier is added to a mesh group, the **Merge Meshes** property in the **Mesh \(Advanced\)** modifier will be ignored and treated as disabled\. A cloth mesh needs to be processed independently and cannot be merged with other meshes\.

For more information, see [Simulate cloth with NVIDIA Cloth](/docs/user-guide/interactivity/physics/nvidia-cloth/)\.

****Select Cloth Mesh****
Select the mesh to have cloth data applied and simulate as a cloth object\.

**Note**
For information on the **Inverse Masses**, **Motion Conrstraints**, and **Backstop** properties below, see [Per vertex properties for cloth](/docs/user-guide/interactivity/physics/nvidia-cloth/vertex-data.md)\.

****Inverse Masses****
Select a vertex color stream to apply per vertex inverse mass data for cloth simulation\. If no vertex color stream is selected, an inverse mass value of **1\.0** is assigned to all vertices in the cloth mesh\.

****Inverse Masses Channel****
Select the channel in the vertex color stream that contains inverse mass data\.

****Motion Constraints****
Select a vertex color stream to apply per vertex motion constraints data for cloth simulation\. If no vertex color stream is selected, a motion constraint value of **1\.0** is assigned to all vertices in the cloth mesh\.

****Motion Constraints Channel****
Select the channel in the vertex color stream that contains motion constraints data\.

****Backstop****
Select a vertex color stream to apply per vertex backstop data for cloth simulation\. If no vertex color stream is selected, backstop is disabled for the cloth mesh\.

****Backstop Offset Channel****
Select the channel in the vertex color stream that contains backstop offset data\.

****Backstop Radius Channel****
Select the channel in the vertex color stream that contains backstop radius data\.

## Comment modifier 

![\[The FBX Settings Meshes tab Comment modifier.\]](/images/user-guide/fbx/ui-fbx-settings-mesh-modifier-comment.png)

Add a comment to the file\. You can add a comment about changes made to the `.fbx` file for tracking purposes or notes on export options, for example\. Comments don't affect how files are processed\. Multiple comment modifiers can be added to a mesh group\.

## Level of Detail modifier 

![\[The FBX Settings Meshes tab Level of Detail modifier.\]](/images/user-guide/fbx/ui-fbx-settings-mesh-modifier-level-of-detail.png)

Add level of detail \(LoD\) meshes to the **Mesh group**\.

1. Choose the **\+** button to add an LoD\.

1. Choose the **Trash Can** button to remove an LoD\.

1. Choose the **Hierarchy** button to specify the meshes to include in the LoD\.

LoDs are optimized meshes with progressively lower polygon counts, fewer and smaller textures, and simplified materials\. The farther an entity is from the camera, the less detail is required from the meshes that make up the entity\. As the entity moves farther from the camera, it swaps to a lower LoD\.

You can specify up to five LoDs which are numbered \[`0`\] to \[`4`\], with \[`0`\] being the *highest* level of detail\. LoD \[`0`\] contains the highest resolution meshes and textures, the most complex materials, and is displayed when the entity is closest to the camera\. LoDs are not required\. Creating LoDs, however, is recommended because they help get the best performance and visual fidelity across a range of platforms with different hardware capabilities\.

**Note**
When you author the mesh in your 3D application, you can add `_lod1`, `_lod2`, `_lod3`, `_lod4`, `_lod5` as suffixes to your mesh names to automatically add a **Level of Detail** modifier and assign the meshes to appropriate LoDs\. `_lod1` is mapped to \[`0`\], `_lod2` is mapped to \[`1`\], and so on\.

## Material modifier 

![\[The FBX Settings Meshes tab Material modifier.\]](/images/user-guide/fbx/ui-fbx-settings-mesh-modifier-material.png)

The **Material** modifier helps automatically manage the contents of the `.mtl` file that corresponds to the mesh group when mesh assets are updated\.

A material is a combination of shaders and properties that define the surface of a mesh\. Materials contain shader and texture assignments, settings for shader properties such as smoothness, opacity, emissive color, etc\., and if necessary, a physics material assignment that defines physical properties such as friction\. A mesh group processed with a file named `myfile.cgf` has a corresponding material file named `myfile.mtl`\.

When a mesh group is processed, **Asset Processor** generates a material file \(`.mtl`\) containing a list of materials and their properties for the mesh group\. A mesh can have multiple materials, and a mesh group can have multiple meshes, so the `.mtl` file might contain several materials even if the asset seems simplistic visually\.

****Update materials****
When enabled, updates the texture map file names in the `.mtl` file to match the texture map names in defined in the `.fbx` file\.

****Remove unused materials****
When enabled, removes materials that are present in the `.mtl` file that are not defined in the `.fbx` file\.

## Mesh \(Advanced\) modifier 

![\[The FBX Settings Meshes tab Mesh (Advanced) modifier.\]](/images/user-guide/fbx/ui-fbx-settings-mesh-modifier-mesh.png)

The **Mesh \(Advanced\)** modifier adds advanced mesh processing features such as a setting for vertex precision, which can save memory, and a setting to choose a vertex color stream to include in the processed mesh\.

****Vertex Precision****
Select the precision of the vertex data for the mesh group\. **16\-bit** floats have a range of \-65,500 to 65,500 and 3 significant decimal places\. Using **16\-bit** precision results in a much smaller file size for processed meshes, but vertices in the resulting `.cgf` file might shift slightly from their positions in the `.fbx` file\. This position shift might be noticeable on large meshes, meshes with precise detail, or meshes that are placed far from the origin\. Choose **32\-bit** precision for larger maximum values and more significant decimal places if the vertices appear to have shifted in the runtime asset\.
32\-bit precision vertices consume more resources and might result in a loss of performance on some platforms\. Some platforms have native support for 16\-bit precision which can offer improved performance\. Check the capabilities of your target platform to determine which precision offers the best results\.

****Merge Meshes****
When enabled, combines all sub\-meshes in the mesh group into a single mesh for optimization\.

****Use Custom Normals****
Enable this property to use custom normals, otherwise, **Asset Processor** generates averaged normals\.
Normals are vertex attributes that define the surface direction of your meshes\. Normals can be customized in third\-party modeling tools to make a mesh appear faceted, create hard edges between surfaces, or smooth the appearance of a surface\. Custom normals can be included in `.fbx` files\.

****Vertex color stream****
If the mesh for this **Mesh group** contains a vertex color stream, it can be selected from this list to be processed\.
Vertex color streams contain per vertex color data that can be referenced by materials\. Vertex color streams are also often used for tagging meshes with arbitrary data such as the inverse mass value used in cloth simulation\. Because of this, a mesh might have multiple vertex color streams\. Be sure to select a vertex color stream intended to be referenced by materials if multiple streams exist\.

## Origin modifier 

![\[The FBX Settings Meshes tab Origin modifier.\]](/images/user-guide/fbx/ui-fbx-settings-mesh-modifier-origin.png)

Change the position \(translation\), orientation \(rotation\), and scale of a mesh relative to how it was authored\.

****Relative Origin Node****
Select the transform relative to which the mesh is processed\. By default, the mesh origin is placed at the scene position `0`, `0`, `0` in the `.fbx` file\.

****Translation****
Sets the position offset of the processed mesh\.

****Rotation****
Sets the orientation offset of the processed mesh in degrees\.

****Scale****
Sets the scale offset of the processed mesh\.

## Touch Bending modifier 

![\[The FBX Settings Meshes tab Touch Bending modifier.\]](/images/user-guide/fbx/ui-fbx-settings-mesh-modifier-touch-bending.png)

The **Touch Bending** modifier sets up mesh assets for touch bending\. Touch bending is a collision effect, typically used on vegetation assets such as plants or tall grass, that causes the asset to bend away from an entity that brushes against it\. You can use this modifier to create a field of wheat, for example, where the wheat parts and bends as a player character passes through\.

Touch bendable assets require a rig similar to an actor\. For more information on creating touch bendable assets, see [Adding Touch \(Collision\) Bending Effects](/docs/userguide/vegetation/bending-touch-intro.md)\.

****Select root bone****
Specify the root bone of the touch bendable mesh\.

****Proximity Trigger Mesh\(es\)****
Choose the **Hierarchy** button to select collision meshes that trigger the touch bending effect\. Multiple trigger meshes can be selected, however, each additional trigger mesh decreases performance\. A new PhysicsNoDraw material with a NoCollide type is created for the mesh\(es\)\.

****Stiffness****
Set a stiffness value between **0\.0** and **1\.0** for all branches to define how easily the asset bends\.

****Damping****
Set a damping value between **0\.0** and **1\.0** for all branches to define how quickly the asset returns to its rest position after a collision\.

****Thickness****
Set a thickness value for all branches to define the amount of bending\. Thickness is determined as the radius of a cylinder in meters\. Most often a small decimal number less than **1\.0** is required\. Valid values range from **0\.00001** to infinity\.
