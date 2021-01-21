---
description: ' Modify the export properties of your .fbx files with FBX Settings in
  &ALYlong;. '
title: FBX Settings export properties
---
# FBX Settings export properties {#fbx-properties}


****

|  |
| --- |
| This feature is in [preview](/docs/userguide/ly-glos-chap#preview) release and is subject to change\.  |

**Topics**
+ [FBX Settings overview](#fbx-properties-overview)
+ [Modify FBX Settings](#fbx-properties-modify)
+ [FBX Settings Meshes tab](/docs/userguide/fbx/settings-meshes-tab.md)
+ [FBX Settings Actors tab](/docs/userguide/fbx/settings-actor-tab.md)
+ [FBX Settings Motions tab](/docs/userguide/fbx/settings-motions-tab.md)
+ [FBX Settings PhysX tab](/docs/userguide/fbx/settings-physx-tab.md)

## FBX Settings overview {#fbx-properties-overview}

With **FBX Settings** you can customize how **Asset Processor** exports your `.fbx` files as runtime assets\. **FBX Settings** presents options based on the contents of the selected `.fbx` file\.

![\[The FBX Settings tool interface.\]](/images/userguide/fbx/ui-fbx-settings-A-1.25.png)

Your `.fbx` files can contain any number of assets\. You can create a single `.fbx` file that contains multiple characters, with LoDs, and animations, or a single `.fbx` file containing all the vegetation assets required for a level\. When these assets are processed they appear as children of the `.fbx` file in **Asset Browser**\.

![\[Processed FBX assets in Asset Browser.\]](/images/userguide/fbx/ui-fbx-asset-browser-1.27.png)

## Modify FBX Settings {#fbx-properties-modify}

1. In **Lumberyard Editor**, in **Asset Browser**, select the `.fbx` file to modify\.
**Tip**
Enter **fbx** into **Asset Browser**'s search bar to find `.fbx` files\.

1. Right\-click the `.fbx` file and then choose **Edit Settings**\.
![\[Right click to open FBX Settings.\]](/images/userguide/fbx/ui-fbx-settings-open-1.27.png)

1. There are four possible tabs in **FBX Settings**\. The available tabs depend on the contents of the `.fbx` file:
   + **Meshes** \- In the **Meshes** tab, you can create groups and modify export settings for meshes\. Exported mesh data is stored in a `.cgf` file\.

     The **Meshes** tab is available if the `.fbx` file contains meshes\.
   + **Actors** \- In the **Actors** tab, you can create groups and modify export settings for actors\. An actor has a skeleton and a skinned mesh, but is not necessarily a character\. Any asset containing at least one bone is an actor\. Actor data is stored in a `.actor` file\.

     The **Actors** tab is available if the `.fbx` file contains at least one bone\.
   + **Motions** \- In the **Motions** tab, you can modify export settings for animation\. Animation data is stored in a `.motion` file\.

     The **Motions** tab is available if the `.fbx` file contains at least one bone with animated channels\.
   + **PhysX** \- In the **PhysX** tab, you can create groups and modify export settings for PhysX collider assets\. You set properties to automatically fit primitive or generate convex collider assets based on meshes contained in the `.fbx` file\. PhysX collider data is stored in a `.pxmesh` file\.

     The **PhysX** tab is available if the `.fbx` file contains meshes\.
**Note**
To use PhysX collider assets, you must have the PhysX Gem enabled in your project\.

1. The **Meshes**, **Actors**, and **PhysX** tabs can have multiple groups, each with their own modifiers\. Each group creates separate runtime asset files\. To add groups, choose the **Add another\.\.\.** button at the top of the tab\. To add a modifier to a group, choose the **Add Modifier** button in the **Modifiers** section of the group and select a modifier from the list\.

1. The **Motions** tab exports animations individually and creates a `.motion` file for each animation\. To add motions, choose the **Add another motion** button at the top of the tab\. To add a modifier to a motion, choose the **Add Modifier** button in the **Modifiers** section of the motion, and select a modifier from the list\.

1. To remove a modifier, motion, or group, choose the **X** button for the entry\.

1. Choose **Update** to apply your changes\. A `.assetinfo` file containing your modified FBX settings is generated or the existing `.assetinfo` file is updated\. **Asset Processor** automatically exports the data from your `.fbx` files\. Some `.fbx` files might take longer to process depending on file size, complexity, and selected options and modifiers\.

1. Review the status for errors or a success message\. To return to the settings, choose **OK**\.

The exported runtime assets appear as children of the `.fbx` file in **Asset Browser**\.