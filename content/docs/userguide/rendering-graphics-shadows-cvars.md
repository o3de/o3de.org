# Using CVARs to Configure Terrain and Cascade Shadow Maps<a name="rendering-graphics-shadows-cvars"></a>

You can use console variables \(CVARs\) in Amazon Lumberyard to configure terrain and cascade shadow maps \(also known as gradient shadow maps, or GSMs\)\. This topic provides a list of key shadow\-related console variables and shows you how to save your changes to them\. It also shows you how to learn about other related console variables\.

**Topics**
+ [Some Key Shadow\-Related Console Variables](#rendering-graphics-shadows-cvars-list)
+ [Saving Console Variable Changes](#rendering-graphics-shadows-cvars-persisting-console-variable-changes)
+ [Finding Other Shadow\-Related Console Variables](#rendering-graphics-shadows-cvars-finding-additional-shadow-related-console-variables)
+ [Tutorial: Using Console Variables to Tune Cascade Shadows](rendering-graphics-shadows-tuning.md)

## Some Key Shadow\-Related Console Variables<a name="rendering-graphics-shadows-cvars-list"></a>

The following table shows some of the console variables that configure shadows, gradient shadow maps, and related debug modes\.


****  

| Console Variable | Type | Description | 
| --- | --- | --- | 
| e\_GsmCastFromTerrain | int |  Specifies that shadows are cast from terrain\. Off by default\.  | 
| e\_GsmDepthBoundsDebug | int |  Shows bounding volumes related to gradient shadow maps\.  | 
| e\_GsmLodsNum | int |  Specifies the number of gradient shadow map levels of detail \(LOD\)\.  Valid values: `0` to `7`\.  | 
| e\_GsmRange | float |  Size of the LOD 0 gradient shadow map area in meters\.  Default value: `3` meters  | 
| e\_GsmRangeStep | float |  Specifies a step value to multiply the previous range by to determine the range of the next GSM LOD\. To determine the step size, use the following guidelines: If `e_GsmRange` is `3`, cascade 0 is 3m\. If `e_GsmRangeStep` is `3`, the following values result\. [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/rendering-graphics-shadows-cvars.html)  | 
| e\_GsmStats | int |  When enabled, shows debug information about shadow cascades\.  `0` = Off \(default\) `1` = On   | 
| e\_ObjShadowCastSpec | int |  Specifies that objects that have a shadow cast spec less than or equal to the specified value cast shadows\.  Default value: `4`  | 
| e\_ParticleShadowsNumGSMs | int |  Specifies the number of shadow GSMs that are used for particle shadows\.  Default value: `3`  | 
| e\_ParticlesShadows | int |  Enables shadows on particles\.  `0` = Off `1` = On \(default\) `2` = Force  | 
| e\_Shadows | int |  Activates the drawing of shadows\.  `0` = Off `1` = On \(default\)  | 
| e\_ShadowsBlendCascades | int |  Softens the blend between shadow cascade regions\. `0` = Off `1` = On \(default\)  | 
| e\_ShadowsBlendCascadesVal | float |  Specifies the width of the region across which two cascades blend\.  Default value: `0.75`  | 
| e\_ShadowsCascadesDebug | int |  For debugging purposes, draws each shadow cascade with a different color on screen\.  `0` = Off \(default\) `1` = On  | 
| e\_ShadowsCastViewDistRatio | float |  Specifies the view distance ratio for shadow maps that cast from objects\. Default value: `1`  | 
| e\_ShadowsClouds | int |  Enables shadows for clouds\. `0` = Off `1` = On \(default\)  | 
| e\_ShadowsConstBias | float |  Specifies the shadow slope bias for shadow generation\. The shadow bias is the distance from where the shadows are cast to where they can be received\. Default value: `1`   | 
| e\_ShadowsConstBiasHQ  | float |  Specifies the shadow slope bias for shadow generation in high quality mode\. When shadow mode is set to high quality, the value of `e_ShadowsConstBiasHQ` or `e_ShadowsConstBias` is used, whichever is smaller\.  Default value: `0.05`  | 
| e\_ShadowsDebug | int |  Displays a debug viewport for shadow maps\. `0` = Off \(default\) `1` = On   | 
| e\_ShadowsLodBiasFixed | int |  Specifies the number of LOD levels that simplify mesh for shadow map generation\.  Default value: `0`  | 
| e\_ShadowsMaxTexRes | int |  Sets the maximum resolution of the shadow map\. Typical values are `256` for faster performance, `512` for a balance of performance and quality, and `1024` for higher quality\.  Default value: `1024`  Larger values can cause texture thrashing warnings\. To compensate, increase the value of `r_DynTexMaxSize`\.   | 
| e\_ShadowsPoolSize  | int |  Uses the formula *e\_ShadowsPoolSize \* e\_ShadowsPoolSize* to set the size of the shadow pool\. The shadow pool is the texture atlas used for rendering shadows from individual light points\. Depending on the quality required, each light uses a different sized portion of the shadow map\.  | 
| e\_ShadowsResScale  | float |  Specifies the resolution scale for an individual shadow inside the shadow pool for use by point lights\. Determines how much of the shadow pool atlas to use when rendering the shadows for a light entity\.  Default value: `4`  | 
| e\_ShadowsSlopeBias | float |  Specifies the shadow slope bias\. The shadow slope bias is the distance from where shadows are cast to where they can be received, scaled by the slope of the geometry\. Default value: `1`  | 
| e\_ShadowsSlopeBiasHQ  | float |  Specifies the shadow slope bias in high quality mode\. When shadow mode is set to high quality, the value of `e_ShadowsSlopeBiasHQ` or `e_ShadowsSlopeBias` is used, whichever is smaller\.  Default value: `0.25`  | 
| e\_ShadowsTessellateCascades | int |  Specifies the maximum cascade number to render tessellated shadows\. In cascades higher than the specified value, objects render shadows without tessellation\. Default value: `1`  Use this console variable to optimize performance\.   | 
| e\_ShadowsTessellateDLights | int |  Enables or disables tessellation for shadows cast by local lights\.  `0` = Off \(default\) `1` = On   | 
| e\_ShadowsUpdateViewDistRatio | int |  Specifies the view distance ratio for shadow maps that update for the shadow pool\.  Default: `256`  | 
| e\-ShadowsOnAlphaBlend | int |  Enables shadows on alpha blend\. `0` = Off \(default\) `1` = On   | 
| r\_DrawNearShadows | int |  Enables shadows for near objects\.  `0` = Off  `1` = On \(default\)  | 
| r\_DynTexMaxSize | int |  Specifies the maximum dynamic texture size\. Use in conjunction with `e_ShadowsMaxTexRes`\.  Default value: `80`  | 
| r\_FogShadows  | int |  Enables deferred volumetric fog shadows\. `0` = Off `1` = Standard resolution \(default\) `2` = Reduced resolution  | 
| r\_fogShadowsWater  | int |  Enables volumetric fog shadows for water volumes\. 0 = Off  1 = On \(default\)  | 
| r\_ShadowJittering | float | Specifies the shadow map jittering radius\. Values set by this CVAR are overwritten by ToD animation as soon as the ToD changes\. 0 = OffDefault value: `2.5` | 
| r\_ShadowPoolMaxFrames | int |  Specifies the maximum number of frames during which a shadow can exist in the shadow pool\.  Default value: `0`  | 
| r\_ShadowPoolMaxTimeslicedUpdatesPerFrame | int |  Specifies the maximum number of time\-sliced shadow pool updates that are allowed per frame\.  Default value: `0`  | 
| r\_ShadowsCache | int |  Replaces all sun cascades above the specfied value with a cached \(static\) shadow map\.  `0` = No cached shadows\. `1` = Replace the first and following cascades\. `2` = Replace the second and following cascades\. \[…\] Default value: `5`  | 
| r\_ShadowsCacheFormat | int |  Specifies the texture format for shadow cache\. `0` = Use D32 texture format\. `1` = Use D16 texture format\. Default value: `1`  | 
| r\_ShadowsCacheResolutions | string |  Specifies the resolution of the shadow cache per cascade\.  Default value: `4214`  | 
| r\_ShadowsPCFiltering  | int |  Specifies whether to use Percentage Closer Filtering \(PCF\) for shadows\. `0` = Off  `1` = On \(default\)  | 
| r\_ShadowsScreenSpace | int |  Specifies whether to include screen space tracing in shadow computations\. Screen space tracing helps to reduce artifacts caused by limited shadow map resolution and biasing\. Use in cutscenes for better shadows on character faces\.  `0` = Off \(default\) `1` = On   This effect is applied only in the near range\.   | 
| r\_ShadowsUseClipVolume DUMPTODISK | int |  Specifies whether shadows use clip volume\. `0` = Off `1` = On \(default\)   | 
| sys\_spec\_shadows | int |  A console variable group that applies settings to certain shadow variables to configure shadow quality\. A higher value signifies higher quality\. Valid values: `1` to `8` For information on the console variables included in this group and how their settings are affected, see [sys\_spec\_shadows Console Variables](#rendering-graphics-shadows-cvars-sys-spec-shadows-console-variables)\.  | 

### sys\_spec\_shadows Console Variables<a name="rendering-graphics-shadows-cvars-sys-spec-shadows-console-variables"></a>

The following table shows the console variables in the `sys_spec_shadows` group\. The columns show the value of each variable for the `sys_spec_shadows` settings of 1 through 8\. The final column lists the default values\.


****  

| sys\_spec\_shadows | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | Default | 
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | 
| e\_GsmLodsNum | 3 | 4 | 4 | 4 | 4 | 5 | 5 | 5 | 5 | 
| e\_GsmRange | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 
| e\_ObjShadowCastSpec | 1 | 1 | 1 | 1 | 1 | 2 | 3 | 4 | 3 | 
| e\_ParticlesShadows | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 
| e\_Shadows | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 
| e\_ShadowsBlendCascades | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 
| e\_ShadowsCastViewDistRatio | 0\.8 | 0\.8 | 0\.8 | 0\.8 | 0\.8 | 1 | 1 | 1 | 1 | 
| e\_ShadowsClouds | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 
| e\_ShadowsLodBiasFixed | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 | 
| e\_ShadowsMaxTexRes | 512 | 512 | 512 | 512 | 512 | 1024 | 1024 | 1024 | 1024 | 
| e\_ShadowsOnAlphaBlend | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 
| e\_ShadowsPoolSize | 1024 | 1024 | 1024 | 1024 | 4096 | 4096 | 4096 | 4096 | 4096 | 
| e\_ShadowsResScale | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 
| e\_ShadowsTessellateCascades | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 
| e\_ShadowsTessellateDLights | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 
| e\_ShadowsUpdateViewDistRatio | 256 | 256 | 256 | 256 | 256 | 256 | 256 | 256 | 256 | 
| r\_DrawNearShadows | 0 | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 
| r\_FogShadows | 0 | 0 | 0 | 0 | 0 | 2 | 2 | 1 | 2 | 
| r\_FogShadowsWater | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 
| r\_ShadowJittering | 0 | 0 | 0 | 0 | 1 | 1 | 2\.5 | 2\.5 | 2\.5 | 
| r\_ShadowPoolMaxFrames | 30 | 30 | 30 | 30 | 30 | 30 | 30 | 0 | 30 | 
| r\_ShadowPoolMaxTimeslicedUpdatesPerFrame | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 
| r\_ShadowsCache | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 5 | 4 | 
| r\_ShadowsCacheFormat | 0 | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 
| r\_ShadowsCacheResolutions | 3162,2107 | 3162,2107 | 3162,2107 | 3162,2107 | 3162,2107 | 6324,4214 | 6324,4214 | 4214 | 6324,4214 | 
| r\_ShadowsPCFiltering | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 
| r\_ShadowsUseClipVolume | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 

## Saving Console Variable Changes<a name="rendering-graphics-shadows-cvars-persisting-console-variable-changes"></a>

Changes that you make to CVARs within the console do not automatically save in your level or editing session\. To save your changes, you can use configuration files or Lua script\.

**To save console variable changes**
+ Do one of the following:
  + Edit and save one of the console variable configuration files\. For more information, see [Configuring Console Variables](console-intro.md#configuring-console-variables-cvars)\.
  + In a Lua script, use the following syntax to assign a value to the variable at startup:

    ```
    ConsoleRequestBus.Broadcast.ExecuteConsoleCommand('r_ConsoleVariable = Value')
    ```

## Finding Other Shadow\-Related Console Variables<a name="rendering-graphics-shadows-cvars-finding-additional-shadow-related-console-variables"></a>

You can use the Lumberyard Editor console window to search for additional shadow\-related console variables\.

**To find additional shadow\-related console variables**

1. In Lumberyard Editor, choose **Tools**, **Console**\.

1. In the console window, do one of the following to open the **Console Variables** search window\.  
![\[Lumberyard Editor console window\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/rendering/rendering-graphics-shadows-cvars-1.png)

   1. Click the **X** icon next to the command entry area\.

   1. Right\-click the command entry area\.

1. In the **Console Variables** window, for **Search**, enter **shadow** or **gsm**\.  
![\[Searching for console variables by keyword for shadow or gsm\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/rendering/rendering-graphics-shadows-cvars-2.png)

1. To learn more about a console variable, pause your pointer on the variable name\.

For more information about the using the Lumberyard Editor console, see [Using the Console Window](console-intro.md)\.