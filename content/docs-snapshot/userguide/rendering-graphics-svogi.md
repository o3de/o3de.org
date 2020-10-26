# Voxel\-based Global Illumination \(SVOGI\)<a name="rendering-graphics-svogi"></a>


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

Sparse voxel octree global illumination \(SVOGI\), also known as voxel GI, is a global illumination solution based on voxel ray tracing\. It does not require prebaking or manual setup of bounce lights or light volumes\. This solution is experimental and may be memory intensive\.

Voxel GI provides the following effects:
+ Dynamic indirect light bounce from static objects and many dynamic objects\.
+ Large\-scale ambient occlusion \(AO\) and indirect shadows from static objects such as brushes, terrain, and vegetation\.

For every frame, thousands of rays are traced through voxels and shadow maps to gather occlusion and in\-directional lighting\.

![\[Example global illumination enabled and disabled.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/rendering/SVOGI.gif)

To use this feature, you must [enable](gems-system-using-project-configurator.md) the SVOGI gem for your project\.

You must also enable SVOGI per level\.

**To enable SVOGI for your level**

1. In Lumberyard Editor, choose **Edit**, **Editor Settings**, **Global Preferences**\.

1. In the **Preferences** window, under **Experimental Features**, select **Lighting**\.

1. In the right pane, under **Options**, select the **Total Illumination** check box\.

1. Click **OK**\.

## Integration Modes<a name="rendering-graphics-svogi-modes"></a>

You can apply voxel GI through several modes\.

**Mode 0**  
With mode 0, only opacity is voxelized\. The bounced light is sampled directly from shadow maps—extended to reflective shadow maps—and compute shaders are not used\.  
Mode 0 has the following advantages:  
+ GPU memory usage is small \(\~16 MB\)\.
+ Indirect lighting is completely dynamic; moving sun does not cause any slowdown\.
+ Dynamic objects can bounce indirect lighting\.
Mode 0 has the following disadvantages:  
+ Indirect lighting can have low quality \(more noise\), especially for small point lights\.
+ Only single bounce is possible\.
+ Only diffuse GI is possible\.
+ Environment probes are needed for specular highlights\.

**Modes 1, 2**  
With modes 1 and 2, albedo, normals, and several layers of radiance are voxelized together with opacity\. Direct lighting is also injected into voxelization, where it is propagated within the voxelization and then sampled during the ray\-tracing pass\.  
Modes 1 and 2 have the following advantages:  
+ Modes 1 and 2 support multiple bounces\. The light source can be semi\-static with multibounce support or be fully dynamic with single bounce support\.
+ Mode 2 supports traced speculars\.
+ They provide higher quality, smoother indirect lighting\.
Modes 1 and 2 have the following disadvantages:  
+ Modes 1 and 2 use more GPU memory \(64 MB\+\)\.
+ Large semi\-static multibounce lights cannot be moved freely, but moving sun may work fine\.
+ Dynamic objects cannot affect GI, but can receive it\.
If you receive a message that the display driver has stopped responding and has recovered, try this [workaround from Microsoft](https://support.microsoft.com/en-us/kb/2665946)\. 

## Voxel GI Parameters<a name="rendering-graphics-svogi-params"></a>

The following parameters are global for an entire level\. You can use normal ambient lights to modulate or tint indirect light intensity locally\.

Global illumination uses the sun and the seven largest static lights in the scene and the eight dynamic lights closest to the camera\. 

**To enable voxel global illumination**

1. In Lumberyard Editor, choose **Tools**, **Terrain Tool**, **Environment**\.

1. In the **Environment** panel, under **Total\_Illumination\_v2**, adjust the following settings as needed\.  
****    
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/rendering-graphics-svogi.html)

1. \(Optional\) Use the **Voxel Coverage** advanced parameter on each material:

   1. Click **Tools**, **Material Editor**\.

   1. Select your material\.

   1. Under **Advanced**, modify the **Voxel Coverage** parameter to control the transparency of voxels for each material and manually fix overoccluded areas\. The default value is 1\.
**Note**  
This parameter takes effect only when voxel global illumination is enabled\.

## Debugging<a name="rendering-graphics-svogi-debugging"></a>

You can use the following console variables to help debug voxel GI issues:
+ `r_ShowRenderTarget svo_fin` – Displays the output of the voxel GI system\.
+ `r_profiler 1 | 2` – Retrieves GPU profiling information\.
+ `svoToggleShowVoxels` – Shows voxellation of the scene, which shows which voxels are on CPU memory and which are on GPU memory\.
+ `svoReset` – Performs hard reset of the system and recomputes all values\.

**Important**  
Do not use the `e_svoTI_*` console variables \(for example, `e_svoTI_IntegrationMode`\) to configure the voxel GI system\. Any changes to these console variables in the configuration file will be overwritten by the individual level environment settings file\. Instead, configure your settings in the [**Total Illumination**](#rendering-graphics-svogi-params) pane in Lumberyard Editor\.

## Current Limits<a name="rendering-graphics-svogi-limitations"></a>

The following limitations exist for the voxel GI system:
+  The GI code doesn’t have a mechanism for detecting light modifications directly, but is constantly updating to capture changes to the lighting\. This may introduce delay in the GI response to lights changing\. 
+ Large\-scale ambient occlusion and indirect shadows are properly cast only by static geometry\.
+ Voxel GI does not function on some forward\-rendering components like particles or water\.
+ Some artifacts like ghosting, aliasing, light leaking, and noise may be noticeable\.
+ Procedural vegetation and merged vegetation do not cast occlusion or secondary shadows\.
+ If a camera is moved to a new location, it may take several seconds until occlusion works properly\.
+ Only objects and materials with shadow map casting enabled will generate correct bounced light\.
+ For dynamic objects, indirect light bounce will function only in areas near voxelized static geometry\.
+ Bounce light may have a noticeable delay of 1 to 2 frames\.
+ Use of the `r_Supersampling=2` console variable may adversely affect the appearance of the voxel GI\. You can set the **LowSpecMode** value two times lower to restore the appearance of the voxel GI\. **Temporal AA** using `r_AntialiasingMode 2/3` works correctly as well\.