---
description: ' Place a decal in your level in &ALYlong;. '
slug: mat-maps-decal-placing
title: Placing a Decal
---
# Placing a Decal<a name="mat-maps-decal-placing"></a>


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

Do the following to place a decal in your level\.

**Note**  
If you apply decals to an object that can be moved by a player, the decal will not move with the object\.

**To place a decal**

1. In Lumberyard Editor, click the top **Follow Terrain** button\.

1. In Rollup Bar, click **Objects, Misc, Decal**\.

1. Drag the detail into the level and then click to place it\.

1. Using the **Edit** menu, move, rotate, or scale the decal as needed\.

1. To place a decal manually, select the **Reorientate** check box, and use mouse shortcuts to place the decal as follows\. This can speed up placement enormously\.

   1. `Ctrl+Click `: Move the decals to the desired position

   1. `Alt+Click `: Scales the decal along the X, Y axes

   1. `Ctrl+Alt+Click `: Rotates the decal around the z\-axis

**To place a decal on vegetation**

1. Enable deferred projection so the decal follows the contours of the vegetation:

   1. In Lumberyard Editor, in the **Rollup Bar**, under **Objects**, click **Misc**, **Decal**\.

   1. Under **Decal Params**, select the **Deferred** check box\. For information about projection types, see [Decal Projection Types](mat-maps-decal-types.md)\.

1. Enable the `r_deferredDecalsOnDynamicObjects` console variable so the decal appears on the vegetation:

   1. In Lumberyard Editor, click the **X** icon in the **Console** section\.  
![\[Image NOT FOUND\]](/images/userguide/console-x-window.png)

   1. In the **Console Variables** window, search for `r_deferredDecalsOnDynamicObjects`

   1. Set the value to any positive number, for example 1\.

   1. Close the **Console Variables** window to save the new value\.

1. Follow the instructions above for placing a decal\.