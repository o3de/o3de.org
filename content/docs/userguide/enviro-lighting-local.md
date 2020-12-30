---
description: ' Use local cubemaps in &ALY; to light smaller areas more accurately
  . '
slug: enviro-lighting-local
title: Local Environment Lighting
---
# Local Environment Lighting<a name="enviro-lighting-local"></a>


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

Lumberyard uses local environment probes and their generated cubemaps to implement local lighting\. The purpose of local cubemaps is to light smaller areas more accurately\. This ensures that all areas in your level have accurate lighting effects that may not be covered by the global cubemap\. Lumberyard automatically gives a local probe higher priority within its defined radius and superimposes its effects on those of the global probe\. For more information about global probes, see [Global Environment Lighting](enviro-lighting-global.md)\.

When placing environment probes in a level, pay attention to how probes are layered and sorted going from global to local probes\.

**To generate a local cubemap**

1. In the **Rollup Bar**, under **Objects**, click **Misc**, **EnvironmentProbe**\.

1. Click to place in the probe in your level\.

1. Under **EnvironmentProbe Params** , leave the **cubemap\_resolution** at 256, the default\. This is the optimal resolution for performance\.

1. Select the **preview\_cubemap** check box to see the cubemap in your level\.

1. Under **EnvironmentProbe Params** and under **EnvironmentProbe Properties**, adjust property values for the desired effect\. For more information about these properties, see the table in [Global Environment Lighting](enviro-lighting-global.md)\.

1. Click **Generate Cubemap**\. 

   Lumberyard creates three textures in **textures\\cubemaps\\*your\_level***— one for the diffuse map, one for the specular map, and one for the source `.tif` file\. 

1. To check your cubemap for accuracy, create and then place a smooth, reflective sphere entity near the probe\. If its surface looks different from the environment around it, you need to regenerate the cubemap\.

1. Click **Generate Cubemap** again\. This incorporates object reflections from the originally generated cubemap for added realism\.

1. To hide the sphere entity in your level, select its **HiddenInGame** check box, found under **Entity Params** in the **Rollup Bar**\.