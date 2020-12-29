# Console Variables for Volumetric Fog<a name="rendering-graphics-fog-volumetric-console-variables"></a>

You can specify the following console variables \(CVARs\) to enable volumetric fog effects\. For more information, see [Using the Console Window](console-intro.md)\.


****  

| Console Variable | Description | Values | 
| --- | --- | --- | 
|  `e_VolumetricFog`  |  Toggles the **Volumetric Fog** component on or off\.  |  `0` = Off  `1` = On  | 
|  `r_VolumetricFogTexScale`  | Sets the width and height of the internal volume texture\. Screen resolution divided by this factor is applied to the width and height of the fog volume\. |  The minimum value should be `2`\.  | 
|  `r_VolumetricFogTexDepth`  | Sets the depth for the internal volume texture\. | This value should be multiples of 4, but less than 252\. | 
|  `r_VolumetricFogReprojectionBlendFactor`  | Sets the blending factor of the temporal reprojection filter\. Higher values cause less flicker, but more ghosting\. | 0 = Turn off temporal reprojection\. | 
|  `r_VolumetricFogReprojectionMode`  | Sets the mode of ghost reduction for the temporal re\-projection filter\. |  `0` = Conservative mode\. Ghost artifacts can appear when a light moves, but there is less flicker than in the advanced mode\. `1` = Advanced mode\. This mode has fewer ghost artifacts but slightly more flicker than the conservative mode\.  | 
|  `r_VolumetricFogSample`  | Sets the number of sample points\. |  `0` = 1 sample point in a voxel\. `1` = 2 sample points in a voxel\. `2` = 4 sample points in a voxel\.  | 
|  `r_VolumetricFogShadow`  |  Sets the shadow sample count for each sample point\.  |  `0` = 1 shadow sample per sample point\. `1` = 2 shadow samples per sample point\. `2` = 3 shadow samples per sample point\. `3` = 4 shadow samples per sample point\.  | 
|  `r_VolumetricFogDownscaledSunShadow`  | Replaces sun shadow maps with downscaled shadow maps or static shadow maps, if possible\. This reduces the volumetric fog flicker for sun shadow\. |  `0` = Disabled\. `1` = Replace first and second cascades with downscaled shadow maps\. Others are replaced with a static shadow map, if possible\. `2` = Replace first, second, and third cascades with downscaled shadow maps\. Others are replaced with a static shadow map, if possible\.  | 
|  `r_VolumetricFogDownscaledSunShadowRatio`  | Sets the downscale ratio for sun shadow maps\. |  `0` = 1/4 downscaled sun shadow maps\. `1` = 1/8 downscaled sun shadow maps\. `2` = 1/16 downscaled sun shadow maps\.  | 
|  `r_VolumetricFogMinimumLightBulbSize`  |  Sets the minimum size threshold for light attenuation bulb size for voxel\-based volumetric fog\.   Small bulb sizes can cause light flicker\.   |  Specify a value between `0` to `2`\.  Default value: ` 0.4`  | 