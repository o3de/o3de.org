---
description: ' Use properties and effects to customize the default ocean that &ALY;
  creates for your level. '
title: Setting Ocean Parameters
---
# Setting Ocean Parameters<a name="terrain-water-ocean"></a>


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

When you create a new level, Lumberyard creates an ocean by default, complete with waves and reflections\. The ocean uses the [Water Shader](shader-ref-water.md)\. You can change the ocean's various properties and effects\.

**To set ocean parameters**

1. In the **Rollup Bar**, on the **Terrain** tab, click **Environment**\.

1. Under **Ocean**, adjust the following parameter values:
   + **Material** – Click the \(**\.\.\.**\) icon to access Material Editor and select your asset\.
   + **Caustic depth** – Set the depth to which caustic effects are visible\.
   + **Caustic intensity** – Scale the intensity of the caustics for the water surface normals\.
   + **Caustic tiling** – Scale the caustic tiling applied to the water surface normals\. You can scale caustics independently of the surface material in cases of strong tiled normals or vice\-versa\.