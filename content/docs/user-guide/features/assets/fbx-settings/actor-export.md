---
description: ' Export actors from .fbx files with FBX Settings to Open 3D Engine. '
title: FBX Settings actor export
---

|  |
| --- |
| This feature is in [preview](/docs/userguide/ly-glos-chap#preview) release and is subject to change\.  |

**Actors** contain geometry that has a skeleton and skinning data\. An **Actor** is not necessarily a character\. Assets that use a skeleton and skinning data to drive animation such as weapons, machines, and foliage, are **Actors**\. **Actors** can be animated through keyframe animation imported as **Motions** or through PhysX simulation and other dynamic solvers such as **Touch Bending**\.

## Export an actor {#fbx-exporting-actors}

1. Copy your `.fbx` file to a sub directory in your project located at `lumberyard_version\dev\your_project`\.

   Alternatively, choose **Import** from the **File** menu in O3DE Editor to copy or move the `.fbx` file into your project\.

1. Locate the `.fbx` in **Asset Browser**\.

1. Right click the `.fbx` in **Asset Browser** and choose **Edit Settings** to open **FBX Settings**\.

1. In **FBX Settings**, in the **Actors** tab, ensure the desired root bone of the actor's skeleton is selected in the **Select root bone** property\.

   An **Actor group** may contain only one skeleton hierarchy, and will only export bones that are part of the selected heirarchy\.

1. In **FBX Settings**, in the **Actors** tab, choose the **Hierarchy** button to the right of **Select base meshes** and ensure only the meshes required for the **Actor group** are selected in the mesh list\.

   You can choose **Add another actor** to create additional actor groups\. A runtime `.actor` asset will be produced for each actor group\. An actor group can contain any number of meshes from the **Select meshes** list and a single skeleton hierarchy\.

1. Set the properties for each actor group\. Add modifiers to each actor group as required\. For information on **Acttor group** properties and modifiers, see [FBX Settings Actors tab](/docs/user-guide/features/assets/fbx-settings/settings-actor-tab.md)\.

1. **Optional** \- Set up PhysX colliders for your meshes\. For more information, see [FBX Settings PhysX export](/docs/user-guide/features/assets/fbx-settings/physx-export.md)

1. Choose the **Update** button at the bottom right of the **FBX Settings** window\. A **File progress** window opens to display information about asset processing\. Choose **OK** to close the **File progress** window\. This step creates or updates the `.assetinfo` file\. **Asset Processor** automatically processes the `.fbx` file and generates the runtime `.actor` files, `.pxmesh` files for PhysX, and `.mtl` files for materials\.

1. Close the **FBX Settings** window\.
**Note**
When you close **FBX Settings** after making changes, you might see a pop\-up window warning of unsaved changes\. This is a known issue and can be disregarded\.