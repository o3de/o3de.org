---
description: ' Add realistic fog beneath water surfaces in your &ALY; level. '
title: Adding Fog Beneath Water
---
# Adding Fog Beneath Water<a name="terrain-water-fog"></a>


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

You can add realistic\-looking fog beneath water surfaces\. For more information about Lumberyard's fog system, see [Fog Systems](/docs/userguide/rendering/fog-intro.md)\.

**To add fog beneath water**

1. In your level, click to select the water volume entity in which you want to add fog\.

1. In the **Rollup Bar**, on the **Objects** tab, click **Area**, **WaterVolume**, **WaterVolume Params**, and modify the following parameters as needed\.  
**FogDensity**  
Specifies how dense the fog appears\.   
**FogColor**  
Sets the fog color\.  
**FogColorMultiplier**  
Defines how bright the fog color is\.  
**FogColorAffectedBySun**  
Enables the [Setting Sun Parameters and Console Variables](/docs/userguide/sky/day-sun-params.md) **Sun color** parameter value to affect fog color\.  
**FogShadowing**  
Enables the surface of water to receive shadows\. You can control the shadow darkness\. Valid values are 0–1\.   
For this parameter to function, the console variable **r\_FogShadowsWater** must be set to 1\. **FogShadowing** is only available when the **Config Spec** setting in Lumberyard Editor is set to **Very High**\.   
In addition, if the **VolFogShadows** property is enabled in the **Terrain\\Environment** panel in **Rollup Bar**, shadow darkness is automatically set to full\. However, the fog above the water will have volumetric shadowing\.  
**CapFogAtVolumeDepth**  
If false, continues to render fog below the specified river depth\.