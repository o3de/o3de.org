description: ' Use AutoMerged settings to define how grass responds to wind in your
  &ALY; environment. '
slug: vegetation-bending-automerged-intro
title: Using AutoMerged Wind Bending Effects
---
# Using AutoMerged Wind Bending Effects<a name="vegetation-bending-automerged-intro"></a>


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

Automerged vegetation has physically accurate wind motions that are defined by wind environment properties and various vegetation properties\. It is recommended for use with grass only\. 

Automerged vegetation reduces the number of draw calls while still allowing you to add any amount or size of grass patches to the terrain\. It merges multiple meshes within several sectors as long as they are using the same material and texture\. You can paint single grass blade objects on the terrain as well as on brushes in different heights independently while they get merged into larger chunks in real time\.

When AutoMerged is enabled, touch bending, vertex colors, and detail bending settings are all ignored, and vegetation movement is defined solely by the AutoMerged parameters\. For more information, see [Adding Touch \(Collision\) Bending Effects](vegetation-bending-touch-intro.md) and [Adding Detail Bending Effects](vegetation-bending-detail-intro.md)\.

**To enable AutoMerged vegetation and set parameters**

1. In the **Rollup Bar**, on the **Terrain** tab, click **Vegetation**, **Add Vegetation Object**\.

1. Expand **Objects** tree and select the grass object you want to modify\.

1. Select the **AutoMerged** check box, and adjust the following parameter values:
   + **Stiffness** – Defines the stiffness of the vegetation
   + **Damping** – Specifies the amount of damping on the bending motion
   + **AirResistance**–\- Specifies the amount of bending similar to the **Bending** parameter used for [Setting the Detail Bending Parameter](vegetation-bending-detail-intro.md#vegetation-bending-detail-params)\.

The four AutoMerged parameters together define the amount and type of bending motions the vegetation object displays in reaction to wind and breezes\. For more information, see, [Adding Global Wind](weather-wind-global.md)\.