# Using Actor LODs to Optimize Game Performance<a name="using-actor-LODs-optimize-game-performance"></a>

You can use levels of detail \([LODs](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#lod)\) to optimize the rendering performance of games\. This is especially true for large in\-game worlds, which are constrained by hardware, frame rate, and the real\-time rendering limits\. LODs increase performance and reduce draw calls by displaying progressively less detail in objects that are farther from the camera\. To further reduce draw calls, lower LODs have multiple textures combined into one texture\.

**Topics**
+ [Using Actor LODs in Lumberyard](#optimize-character-fbx-settings-lod-in-lumberyard)
+ [Using Digital Content Creation Tools to Create LODs](#using-dccs-to-create-lods-for-character-fbx-settings)
+ [Using the FBX Settings Tool to Check LODs](#using-fbx-settings-tool-to-check-lods-character-fbx-settings)
+ [Adding Actor LOD to a Level in Lumberyard](#adding-actor-lod-to-a-level-in-lumberyard)
+ [Adding the Simple LOD Distance Component](#adding-simple-lod-distance-component)

## Using Actor LODs in Lumberyard<a name="optimize-character-fbx-settings-lod-in-lumberyard"></a>

In Lumberyard, you can use up to six actor LODs\. An LOD of `0` has the highest level of detail, and an LOD of `5` the least\. Each successive LOD typically has its vertices reduced by 50 percent from the previous level and reduces the number of materials used\.

### Features<a name="optimize-lod-features-for-character-fbx-settings"></a>

In Lumberyard, you can use actor LODs on skinned meshes, skeletons, and materials or textures\. Lumberyard performs the following actions:
+ Provides a **Simple LOD Distance** component that supports rendering of different LODs\.
+ Reads and imports skinned mesh LODs from a single FBX file\.
+ Auto populates skinned mesh LODs that use a soft naming convention\.

### Requirements and Limitations<a name="requirements-and-limitations-for-character-fbx-settings-lod"></a>

Note the following requirements:

**Skinned Meshes**
+ Each LOD mesh must skin to the same skeleton\. However, you can choose which bones to skin to\.

**Skeletons**
+ To skin each LOD mesh to a different skeleton, create a separate skeletal hierarchy\.
+ For each LOD, the skeleton hierarchy must remain the same\. Remove leaf bones first and work up the chain\.
+ In lower LODs, you cannot remove in\-between bones\. For instance, if you have `Spine1`, `Spine2` and `Spine3` for an `LOD` of `0`, you cannot delete `Spine2` and leave `Spine1` and `Spine3`\.

**Materials or Textures**
+ Each actor requires a separate material group\.
+ Create a material LOD in the same way that you create a material for static meshes\.

## Using Digital Content Creation Tools to Create LODs<a name="using-dccs-to-create-lods-for-character-fbx-settings"></a>

To author actor LODs in a DCC tool like Autodesk Maya or Autodesk 3ds Max, you can use one of the following two methods:
+ Soft naming conventions
+ LOD groups
**Important**  
Currently, Lumberyard supports skeletons created with LOD groups only\.

**To use the soft naming convention to create LODs**

1. Create an actor with multiple LOD meshes by adding a suffix at the end of the name of each LOD mesh\. See the following table for examples\.  
****    
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/using-actor-LODs-optimize-game-performance.html)

   For more information, see [FBX Soft Naming Conventions](char-fbx-importer-soft-naming.md)\.

1. Follow the instructions in [Best Practices for Creating and Exporting Meshes](char-fbx-importer-best-practices.md) to export the meshes to FBX format so that you can use them in Lumberyard\.

**To use LOD groups to create actor LODs**
+ To create an actor with multiple LOD meshes, use an empty LOD group as the parent of the skeleton and the LOD meshes\. The following example shows a skeleton created with an LOD group and imported into Lumberyard\.  
![\[Skeleton created as an LOD group\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/character-fbx-settings-lod-optimize-0.png)

## Using the FBX Settings Tool to Check LODs<a name="using-fbx-settings-tool-to-check-lods-character-fbx-settings"></a>

After you export your `.fbx` file to Lumberyard, do the following:

**To use the FBX Settings to check LODs**

1. In Lumberyard Editor, choose **Tools**, **Asset Browser**\.

1. Right click the `.fbx` file and choose **Edit Settings**\. The **FBX Settings** tool shows a **Level of Detail** modifier that lists the additional LOD meshes\.

![\[LOD entries in the FBX Settings tool\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/character-fbx-settings-lod-optimize-1.png)

You can use the **FBX Settings** tool to verify that your LODs were imported correctly\. Currently, you can also unselect a mesh or skeleton for each LOD, but you can't move a mesh or skeleton across a level or add a new mesh or skeleton to a level\.

## Adding Actor LOD to a Level in Lumberyard<a name="adding-actor-lod-to-a-level-in-lumberyard"></a>

After you import your LODs into Lumberyard Editor, you can add an actor LOD to a level\.

**To add an actor LOD to a level in Lumberyard**

1. In Lumberyard Editor, choose **Tools**, **Asset Browser**\.

1. Select and drag the exported `.fbx` file to the viewport\. In the **[Actor](component-actor.md)** component that appears in the **Entity Inspector**, a shared material file with multiple materials contains the LOD asset\.

1. To preview the LODs, change the number for **LOD Level** in the **Actor** component\.

**Example**  

![\[LOD material file in the Actor component in the Entity Inspector.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/character-fbx-settings-lod-optimize-2.png)

### Notes<a name="character-fbx-settings-lod-optimize-notes"></a>
+ Lumberyard supports only one material group for each actor\.
+ Author the material definition \(`.mtl`\) file with all the actor LOD submaterials inside the same `.mtl` file\.
+ If you author in Maya, you can assign a different shader for each LOD mesh or use the same shader for all the meshes\.

## Adding the Simple LOD Distance Component<a name="adding-simple-lod-distance-component"></a>

To enable rendering of levels of detail in Lumberyard, you must add the **Simple LOD Distance** component to your level\. The **Simple LOD Distance** component performs a simple LOD distance check\. The LOD distance is the distance that the current level of detail must reach before it changes to the next LOD\. Each distance must be greater than the previous distance\.

**To add the Simple LOD Distance component to your level**

1. In Lumberyard Editor, choose **Tools**, **Entity Inspector**\.

1. In **Entity Inspector**, click **Add Component**\.

1. In the **Animation** section, select the **Simple LOD Distance** component\.

1. Specify an LOD distance or use the default\.

1. In the viewport, zoom out\. Notice that the actor mesh changes for each level of detail when the specified LOD distance is reached\.