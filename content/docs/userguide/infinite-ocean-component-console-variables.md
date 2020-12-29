# Console Variables for the Infinite Ocean Component<a name="infinite-ocean-component-console-variables"></a>

You can specify the following console variables to enable advanced settings for the **Infinite Ocean** component\. In general, you don't need to change these settings\. For more information, see [Using the Console Window](console-intro.md)\.


****  

| Console Variable | Description | 
| --- | --- | 
|  `e_HwOcclusionCullingWater`  |  Specify the ocean occlusion culling so that the ocean doesn't render if it's not visible\. We recommend that you keep the default value of `1`\. `0` = Off  `1` = On  | 
|  `e_WaterOcean`  |  Enable or disable the ocean\. `0` = Disables the ocean\. `1` = Enables the ocean as normal\. `2` = Enables the ocean and fog in one frame\. This can cause a small increase in performance but provides a slightly different look\.   | 
|  `e_WaterOceanFFT`  |  Enable or disable using fast Fourier transforms with water\. This console variable has interdependencies with other console variables and should only be used with `sys_spec_water`\. `0` = Off  `1` = On  | 
|  `e_WaterTessellationSwathWidth`  |  Used only in older style oceans \(non\-FFT water\)\. If the value is negative, the triangle mesh generates normally\. If the value is positive, the value determines the length of triangle strips used in the mesh\.  | 
|  `q_ShaderWater`  |  Control the shader quality of the ocean\. This value should only be changed with other console variables that are controlled by the `sys_spec_water` console variable\. Valid values: `0` to `3`  | 
|  `r_WaterReflectionsMinVisiblePixelsUpdate`  |  Percentage of water reflecting pixels that are required to update the reflection every frame\.  For example, if the value is set to `0.4`, the water's reflection updates every frame as long as the ocean covers 40% or more of the screen\. At least 40% of pixels is needed to show the reflection in the ocean\.  If the ocean covers less than 40% of the screen, the reflection no longer updates every frame\. The update rate is then controlled by [r\_WaterReflectionsMinVisUpdateDistanceMul](#r_WaterReflectionsMinVisUpdateDistanceMul) and [r\_WaterReflectionsMinUpdateFactorMul](#r_WaterReflectionsMinUpdateFactorMul)\. `0` to `1`  | 
|   `r_WaterReflectionsMinVisUpdateDistanceMul`  | Use this multiplier with the r\_WaterUpdateDistance console variable to determine the update rate of the water reflection\. This distance is from the camera's position, the last time the reflection is rendered to the current camera position\. | 
|   `r_WaterReflectionsMinUpdateFactorMul`  |  A multiplier on the distance the camera is from the water \(this value is always `0.3` or less\)\. This distance is based on the camera's position and is used to determine the update rate of the water reflection\. This distance is not based on what is in the camera's view\.  | 
|  `r_WaterTessellationHW`  |  Enable or disable DX11\-style tessellated water\. This value should only be changed with other console variables that are controlled by the `sys_spec_water` console variable\. `0` = Off  `1` = On  | 
|  `r_WaterUpdateDistance`  |  Distance that the camera normally needs to move before the reflection is updated\. You can change the distance with the `r_WaterReflectionsMinVisUpdateDistanceMul` console variable\. `0` = Off  `1` = On  | 
|  `r_WaterUpdateFactor`  |  Determine how long to wait between updating water reflections\.  | 
| sys\_spec\_water |  This is a special data\-driven console variable that controls other console variables related to the **Infinite Ocean** component and water volumes\.  You can find the console variables that are defined by this value in the `sys_spec_Water.cfg` file, located in the `lumberyard_version/dev/Engine/Config/CVarGroups/` directory\. In general, you don't need to change this file, and many of the console variables that are set in this file for different system specs do not affect the **Infinite Ocean** component\.  | 