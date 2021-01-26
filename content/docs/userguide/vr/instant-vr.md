---
description: ' Use Amazon Lumberyard''s instantVR slice as a starting point from which you
  can quickly create a virtual reality level with scripts and assets that provide
  VR functionality. '
title: Using the InstantVR Slice
---
# Using the InstantVR Slice {#virtual-reality-instant-vr}


****

|  |
| --- |
| This topic references tools and features that are [legacy](/docs/userguide/ly-glos-chap#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](/docs/userguide/gems/cryentity-removal-gem) using the [Project Configurator](/docs/userguide/configurator/intro) or the [command line](/docs/userguide/lmbr-exe)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. |

The **instantVR** slice is a set of entities, scripts, and assets that provide basic pieces of VR functionality to give you a starting point from which you can build your own VR application\.

The VR functionality provided in this slice includes:
+ Implementation of models\-tracked controllers
+ Teleportation using a navigation mesh to define a valid area
+ Generation of a starting navigation area

The **instantVR** slice is part of the Virtual Reality Project sample level\. Follow the instructions in [VirtualRealityProject](/docs/userguide/samples/projects/virtual-reality.md) to download, install, and select the Virtual Reality Project before performing the following procedure\.

**To use the **instantVR** slice**

1. In the [**Asset Browser**](/docs/userguide/asset-browser-intro.md), navigate to `dev\VirtualRealityProject\slices\`\.
![\[Image NOT FOUND\]](/images/userguide/vr/virtual-reality-instant-vr-ab.png)

1. Drag `instantvr.slice` into the viewport\.

   The Lumberyard beaver is the starting location in this slice\. Two controllers and a navigation area also appear\.

1. Click the **VR Preview** button to enable VR preview, and then press **Ctrl\+G** to run your level\.

   You can use the trigger buttons on your controllers to teleport around the space\.

![\[Image NOT FOUND\]](/images/userguide/vr/virtual-reality-instant-vr-1.png)

![\[Image NOT FOUND\]](/images/userguide/vr/virtual-reality-instant-vr-2.png)