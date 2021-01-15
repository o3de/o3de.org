---
description: ' Use a global environment probe and its cubemap to control the lighting
  of an entire level. '
title: Global Environment Lighting
---
# Global Environment Lighting {#enviro-lighting-global}


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

To implement global lighting for an entire level, you use a global environment probe \(also known as a global light probe\) and associated generated cubemap\.

Environment probes control many aspects of the physically based lighting in Lumberyard, including accurate shadow colors, ambient diffuse values, and specular reflections\. They also provide bounce lighting by taking the colors from the surroundings and applying them directly to the diffuse color of materials inside their radius\.

When placing environment probes in a level, pay attention to how probes are layered and sorted going from global to local probes\.

Every level should have a global environment probe\. Global probes provide the entire level with ambient lighting, which is calculated from the probe's location\. In addition to a global probe, a level may have one or more local probes\. For more information about local probes, see [Local Environment Lighting](/docs/userguide/rendering/lighting/local.md)\.

As shown in the following table, the probe has several configurable properties, which you can adjust in the **Rollup Bar**\.

 EnvironmentProbe Properties

**Active**  
Enables and disables the probe\.

**BoxSizeX, BoxSizeY, BoxSizeZ**  
Specifies the XYZ dimensions of the probe's area of effect\. Probes are projected as cubes in the level\. For a global probe, set values large enough to span the entire level\. 

**Diffuse**  
Sets the diffuse color of the light\. Set to **255,255,255**\.

**DiffuseMultiplier**  
Makes the light brighter\. Set to **1**\.

**SpecularMultiplier**  
Multiplies the specular color brightness\. Set to **1**\.

**AffectsThisAreaOnly**  
Set parameter to **False** to make lights cover other vis areas\.

**AttenuationFalloffMax**  
Controls the falloff amount \(0–1\) to create smoother transitions or hard edges\. A value of 0\.8 means that falloff begins at 80% at the boundaries of the box\. Set value to **0** for a global probe \(no falloff\)\.

**IgnoresVisAreas**  
Controls whether the light should respond to vis areas\. Set value to **True** for a global probe\.

**SortPriority**  
Gives control over which probe has more visual interest and therefore a higher priority\. Set the value to **0** for a global probe, then increase the value for local probes, where higher values indicate more localized probes\.

**deferred\_cubemap**  
Specifies the file location of the cubemap texture\.

**BoxHeight**  
Adjusts the height of cubemap box\.

**BoxLength**  
Adjusts the length of cubemap box\.

**BoxProject**  
When enabled, Lumberyard factors in the size of the cubemap box\.

**BoxWidth**  
Adjusts the width of cubemap box\.

**To generate a global cubemap**

1. In **Rollup Bar**, under **Objects**, click **Misc**, **EnvironmentProbe**\.

1. Click to place the probe in your level\.

1. Under **EnvironmentProbe Params**, leave **cubemap\_resolution** at the default **256**\. This is the optimal resolution for best performance\.

1. Select the **preview\_cubemap** check box to see the cubemap in your level\.

1. Under **EnvironmentProbe Properties**, adjust the following property values to configure the probe to be global:
   + **BoxSizeX**, **BoxSizeY**, and **BoxSizeZ** values: Large enough to span the entire level
   + **Diffuse **color value: 255, 255, 255
   + **DiffuseMultiplier** and **SpecularMultiplier** values: 1
   + **SortPriority**: 0
   + **AttenuationFalloffMax**: 0
   + **IgnoreVisAreas**: True \(check box selected\)

1. Click **Generate Cubemap**\. Lumberyard creates three textures in **textures\\cubemaps\\*your\_level***— one for the diffuse map, one for the specular map, and one for the source `.tif` file\. 

1. To check your cubemap for accuracy, create and then place a smooth, reflective sphere entity near the probe\. If its surface looks different from the environment around it, you need to regenerate the cubemap\. 

1. Click **Generate Cubemap** again\. This incorporates object reflections from the originally generated cubemap for added realism\.

1. To hide the sphere entity in your level, select its **HiddenInGame** check box, found under **Entity Params** in the **Rollup Bar**\.