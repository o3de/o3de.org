---
description: ' Place non-tiling textures as decals to create realistic water puddles
  and water rifts in your &ALY; level. '
title: Adding Water Puddles
---
# Adding Water Puddles {#terrain-water-puddles}


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

To create realistic water puddles and water rifts, use non\-tiling textures that can be placed as decals\. While water puddles could be created as a water volume, using decals is less demanding on resources\. For more information on decals, see [Working with Decals](/docs/userguide/materials/maps/decal-intro.md)\.

For proper blending between the water puddle and the terrain, use an alpha channel with a smooth gradient so it fades into the terrain and the transition won't be noticeable\.

**To add a water puddle**

1. In Lumberyard Editor, click **Tools**, **Material Editor**\.

1. In the Material Editor, select a suitable material asset\.

1. Under **Lighting Settings\\Specular**, enter **85,85,85**

1. In your level, click to place the puddle\.

1. In the **Rollup Bar**, on the **Objects** tab, click **Custom**, **GameVolume**\.

1. Under **GameVolume Params**, click **VolumeClass** and select **WaterVolume**\.

1. In your level, click boundary points around the puddle\. Double\-click the last point to complete the enclosure\. 