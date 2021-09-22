---
description: ' Export meshes from .fbx files with FBX Settings to Open 3D Engine. '
title: FBX Settings mesh export
---

**Meshes** contain geometry that doesn't have a skeleton and skinning data. These assets are also called *static* **Meshes**. Static meshes are most often used as props and environment objects, but can be used as interactive objects and even player avatars. Entities containing static meshes can be animated through scripts (*kinematics*) or PhysX simulation (*dynamics*).

**Contents**
+ [Export a mesh](#fbx-exporting-meshes)
+ [Mesh export video tutorial](#fbx-export-mesh-tutorial)
+ [Mesh export tips](#fbx-export-meshes-tips)

## Export a mesh 

1. Copy your `.fbx` file to a sub directory in your project.

   Alternatively, choose **Import** from the **File** menu in O3DE Editor to copy or move the `.fbx` file into your project.

1. Locate the `.fbx` in **Asset Browser**.

1. Right click the `.fbx` in **Asset Browser** and choose **Edit Settings** to open **FBX Settings**.

1. In **FBX Settings**, in the **Meshes** tab, choose the **Hierarchy** button to the right of **Select meshes** and ensure only the meshes required for the **Mesh group** are selected in the mesh list.

   You can choose **Add another mesh** to create additional mesh groups. A runtime `.cgf` asset will be produced for each mesh group. A mesh group can contain any number of meshes from the **Select meshes** list.

1. Set the properties for each mesh group and add modifiers to each mesh group as required. For information on **Mesh group** properties and modifiers, see [FBX Settings Meshes tab](/docs/user-guide/assets/fbx-settings/settings-meshes-tab).

1. **Optional** - Set up PhysX colliders for your meshes. For more information, see [FBX Settings PhysX export](/docs/user-guide/assets/fbx-settings/physx-export)

1. Choose the **Update** button at the bottom right of the **FBX Settings** window. A **File progress** window opens to display information about asset processing. Choose **OK** to close the **File progress** window. This step creates or updates the `.assetinfo` file. **Asset Processor** automatically processes the `.fbx` file and generates the runtime `.cgf` files for meshes, `.pxmesh` files for PhysX, and `.mtl` files for materials.

1. Close the **FBX Settings** window.
**Note**
When you close **FBX Settings** after making changes, you might see a pop-up window warning of unsaved changes. This is a known issue and can be disregarded.

## Mesh export video tutorial 

## Mesh export tips 
+ Ensure that each object that needs to perform runtime collision has a PhysX mesh. Low-resolution PhysX meshes work better than high-resolution meshes. Primitives such as a cube, sphere, or capsule are best for optimal physics performance.
+ The maximum number of vertices for any static geometry is 65,536. You can export a scene where the total number of vertices exceeds 65,536, but each static geometry piece can't exceed 65,536.

  If the combined mesh has more than 65,536 vertices, make the following changes in the **FBX Settings** tool:

  1. In O3DE Editor, in the **Asset Browser**, right-click the `.fbx` file and choose **Edit Settings**.

  1. In the **FBX Settings** tool, on the **Meshes** tab, click **Add Modifier** and then choose **Mesh (Advanced)**.

  1. Clear the **Merge Meshes** setting. This prevents **Asset Processor** from merging the meshes, which allows **Asset Processor** to process the geometry.
