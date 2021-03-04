---
description: ' Export motions from .fbx files with FBX Settings to Open 3D Engine. '
title: FBX Settings motion export
---
# FBX Settings motion export {#fbx-motion-export}


****

|  |
| --- |
| This feature is in [preview](/docs/userguide/ly-glos-chap#preview) release and is subject to change\.  |

**Motions** contain keyframe animated sequences that can be sequenced and blended in **Animation Editor** and applied to actors to create behaviors\. Motions must use identical skeleton hierarchies as their actor counterparts\.

## Export a motion {#fbx-exporting-motions}

1. Copy your `.fbx` file to a sub directory in your project located at `lumberyard_version\dev\your_project`\.

   Alternatively, choose **Import** from the **File** menu in O3DE Editor to copy or move the `.fbx` file into your project\.

1. Locate the `.fbx` in **Asset Browser**\.

1. Right click the `.fbx` in **Asset Browser** and choose **Edit Settings** to open **FBX Settings**\.

1. In **FBX Settings**, in the **Motions** tab, ensure the desired root bone of the actor's skeleton is selected in the **Select root bone** property\.

   A **Motion** may contain only one skeleton hierarchy, and will only export bones that are part of the selected heirarchy\.

   A **Motion** exports a single animation sequence\. If the `.fbx` contains multiple animation sequences, additional motions can be added by choosing **Add another motion**\.

1. Set the properties for each motion\. Add modifiers to each motion as required\. For information on **Motion** properties and modifiers, see [FBX Settings Motions tab](/docs/user-guide/features/assets/fbx-settings/settings-motions-tab.md)\.

1. Choose the **Update** button at the bottom right of the **FBX Settings** window\. A **File progress** window opens to display information about asset processing\. Choose **OK** to close the **File progress** window\. This step creates or updates the `.assetinfo` file\. **Asset Processor** automatically processes the `.fbx` file and generates the runtime `.motion` files\.

1. Close the **FBX Settings** window\.
**Note**
When you close **FBX Settings** after making changes, you might see a pop\-up window warning of unsaved changes\. This is a known issue and can be disregarded\.