description: ' Set decal parameters in &ALYlong;. '
slug: mat-maps-decal-creating
title: Setting Decal Parameters
---
# Setting Decal Parameters<a name="mat-maps-decal-creating"></a>

Complete the following procedures for setting decal mapping parameters\.

## To set decal parameters in the Rollup Bar<a name="mat-maps-decal-params-rollupbar"></a>


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

Most decal parameters are in the Rollup Bar on the **Objects** tab, under **Misc**, **Decal**\.

![\[Image NOT FOUND\]](/images/userguide/materials/maps/mat-maps-decal-params-rollupbar.png)

**To set decal parameters in the Rollup Bar**

1. In the Rollup Bar, under **Objects**, click **Misc**, **Decal**\.

1. Under **Decal Params**, adjust the following parameters:
   + **ProjectionType** – Choose the projection type from the drop\-down list: **Planar**, **ProjectOnStaticObjects**, **ProjectOnTerrain**, and **ProjectOnTerrainAndStaticObjects**\.
   + **Deferred** – Select to enable deferred decal projection\.
   + **View Distance Multiplier** – Set the distance at which the decal is visible\. The default value is 1\. A higher number indicates a longer visibility distance\.
   + **SortPriority** – Specify if the decal will appear on top of another decal\.
   + **Projection Depth** – Set the projection depth \(distance\) of the decal from the object\. This can also affect blending of decals\.

## To set shader decal parameters<a name="mat-maps-decal-params-shader"></a>

Some decal parameters are set in the Material Editor under **Shader Params**\.

![\[Image NOT FOUND\]](/images/userguide/materials/maps/mat-maps-decal-params-shader.png)

**To set decal mapping parameters**

1. In Lumberyard Editor, click **Tools**, **Material Editor**\.

1. Click the **Add New Item** button\.

1. Select a decals folder, select a subfolder, and then click **Save**\. The new material will be selected automatically with the default settings\.

1. Under **Shader Generation Params**, select **Decal**\.

1. Right\-click the decal you created and click **Assign to Selected Objects**\. 

1. Under **Shader Params**, adjust the values of the following parameters:

   1. **Decal Alpha Falloff** – Set the power applied to the decal alpha\.

   1. **Decal Alpha Multiplier** – Set the multiplier applied to the decal alpha\.

   1. **Decal Diffuse Opacity** – Set the opacity multiplier for the fading out decal diffuse color\.