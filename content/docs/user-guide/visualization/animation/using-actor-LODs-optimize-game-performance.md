---
description: ' Use levels of detail (LODs) to optimize game performance in Open 3D Engine. '
title: Using Actor LODs to Optimize Game Performance
---

You can use levels of detail ([LODs](/docs/user-guide/appendix/glossary#lod)) to optimize the rendering performance of games. This is especially true for large in-game worlds, which are constrained by hardware, frame rate, and the real-time rendering limits. LODs increase performance and reduce draw calls by displaying progressively less detail in objects that are farther from the camera. To further reduce draw calls, lower LODs have multiple textures combined into one texture.

## Using Actor LODs in O3DE

In O3DE, you can use up to six actor LODs. An LOD of `0` has the highest level of detail, and an LOD of `5` the least. Each successive LOD typically has its vertices reduced by 50 percent from the previous level and reduces the number of materials used.

### Features

In O3DE, you can use actor LODs on skinned meshes, skeletons, and materials or textures. O3DE performs the following actions:
+ Provides a **Simple LOD Distance** component that supports rendering of different LODs.
+ Reads and imports skinned mesh LODs from a single FBX file.
+ Auto populates skinned mesh LODs that use a soft naming convention.

### Requirements and Limitations

Note the following requirements:

**Skinned Meshes**
+ Each LOD mesh must skin to the same skeleton. However, you can choose which bones to skin to.

**Skeletons**
+ To skin each LOD mesh to a different skeleton, create a separate skeletal hierarchy.
+ For each LOD, the skeleton hierarchy must remain the same. Remove leaf bones first and work up the chain.
+ In lower LODs, you cannot remove in-between bones. For instance, if you have `Spine1`, `Spine2` and `Spine3` for an `LOD` of `0`, you cannot delete `Spine2` and leave `Spine1` and `Spine3`.

**Materials or Textures**
+ Each actor requires a separate material group.
+ Create a material LOD in the same way that you create a material for static meshes.

## Using Digital Content Creation Tools to Create LODs

To author actor LODs in a DCC tool like Autodesk Maya or Autodesk 3ds Max, you can use one of the following two methods:
+ Soft naming conventions
+ LOD groups
**Important**
Currently, O3DE supports skeletons created with LOD groups only.

**To use the soft naming convention to create LODs**

1. Create an actor with multiple LOD meshes by adding a suffix at the end of the name of each LOD mesh. See the following table for examples.

    For more information, see [FBX soft naming conventions](/docs/user-guide/assets/fbx-settings/settings-soft-naming.md).

1. Follow the instructions in [Customize FBX asset export with FBX Settings](/docs/user-guide/assets/fbx-settings/intro.md) to export the meshes to FBX format so that you can use them in O3DE.

    **To use LOD groups to create actor LODs**

    To create an actor with multiple LOD meshes, use an empty LOD group as the parent of the skeleton and the LOD meshes. The following example shows a skeleton created with an LOD group and imported into O3DE.

    ![Skeleton created as an LOD group](/images/user-guide/character-fbx-settings-lod-optimize-0.png)

## Using the FBX Settings Tool to Check LODs

After you export your `.fbx` file to O3DE, do the following:

**To use the FBX Settings to check LODs**

1. In O3DE Editor, choose **Tools**, **Asset Browser**.

1. Right click the `.fbx` file and choose **Edit Settings**. The **FBX Settings** tool shows a **Level of Detail** modifier that lists the additional LOD meshes.

    ![LOD entries in the FBX Settings tool](/images/user-guide/character-fbx-settings-lod-optimize-1.png)

You can use the **FBX Settings** tool to verify that your LODs were imported correctly. Currently, you can also unselect a mesh or skeleton for each LOD, but you can't move a mesh or skeleton across a level or add a new mesh or skeleton to a level.

## Adding Actor LOD to a Level in O3DE

After you import your LODs into O3DE Editor, you can add an actor LOD to a level.

**To add an actor LOD to a level in O3DE**

1. In O3DE Editor, choose **Tools**, **Asset Browser**.

1. Select and drag the exported `.fbx` file to the viewport. In the **[Actor](/docs/user-guide/components/animation/actor/)** component that appears in the **Entity Inspector**, a shared material file with multiple materials contains the LOD asset.

1. To preview the LODs, change the number for **LOD Level** in the **Actor** component.

    ![LOD material file in the Actor component in the Entity Inspector.](/images/user-guide/character-fbx-settings-lod-optimize-2.png)

### Notes

+ O3DE supports only one material group for each actor.
+ Author the material definition \(`.mtl`\) file with all the actor LOD submaterials inside the same `.mtl` file.
+ If you author in Maya, you can assign a different shader for each LOD mesh or use the same shader for all the meshes.

## Adding the Simple LOD Distance Component

To enable rendering of levels of detail in O3DE, you must add the **Simple LOD Distance** component to your level. The **Simple LOD Distance** component performs a simple LOD distance check. The LOD distance is the distance that the current level of detail must reach before it changes to the next LOD. Each distance must be greater than the previous distance.

**To add the Simple LOD Distance component to your level**

1. In O3DE Editor, choose **Tools**, **Entity Inspector**.

1. In **Entity Inspector**, click **Add Component**.

1. In the **Animation** section, select the **Simple LOD Distance** component.

1. Specify an LOD distance or use the default.

1. In the viewport, zoom out. Notice that the actor mesh changes for each level of detail when the specified LOD distance is reached.
