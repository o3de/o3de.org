# Console Variables for Fog<a name="rendering-graphics-fog-cvar"></a>

The following console variables can be used to control fog\. For more information, see [Using the Console Window](console-intro.md)\.


****  

| Console Variable | Description | 
| --- | --- | 
| e\_Fog |  Toggles fog on and off\.  | 
| e\_FogVolumes |  Enables local height/distance based fog volumes\.  | 
| e\_FogVolumesTiledInjection |  Enables tiled fog volume density injection\.  | 
| r\_FogDepthTest |  Enables per\-pixel culling for deferred fog pass\. Fog computations for all pixels closer than a given depth value will be skipped\.  `0` = culling disabled\.  > 0 = fixed linear world space culling depth  < 0 = optimal culling depth will be computed automatically based on camera direction and fog settings\.  | 
| r\_FogShadows |  Enabled deferred volumetric fog shadows\.  `0` = No shadows `1` = Standard resolution `2` = Reduced resolution\.  | 
| r\_FogShadowsMode |  Raycasting mode for shadowed fog\.  `0` = Brute force shadow map sampling `1` = Optimized shadow map sampling  | 
| r\_FogShadowsWater |  Enables volumetric fog shadows over water volumes\.  | 