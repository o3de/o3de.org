---
description: ' Paint a terrain texture layer for your environment in Amazon Lumberyard. '
title: Painting Terrain Texture Layers
---
# Painting Terrain Texture Layers {#terrain-texture-layers-paint}


****

|  |
| --- |
| This topic references tools and features that are [legacy](/docs/userguide/ly-glos-chap#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](/docs/userguide/gems/cryentity-removal-gem) using the [Project Configurator](/docs/userguide/configurator/intro) or the [command line](/docs/userguide/lmbr-exe)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. |

Lumberyard uses two components for painting terrain texture layers:
+ The first is a low\-resolution texture with color information\. This texture is visible from a distance and provides underlying color information for the base terrain texture\. This texture should be less than 512 x 512 pixels in size\.
+ The second is a high\-resolution material\. This material is visible at close distances and can have several texture maps like diffuse, bump, and specular\. The diffuse map should be set to white \(255\)\.

The distance at which low\-resolution textures are replaced with those of a higher resolution is defined by the **DetailLayersViewDistRatio** parameter\. To access this parameter, in the **Rollup Bar**, on the **Terrain** tab, click **Environment** and adjust the value as needed\.

**To paint a terrain texture layer**

1. In Lumberyard Editor, choose **Game**, **Terrain**, **Paint Layers**\.

1. In the **Rollup Bar**, on the **Terrain** tab, click **Layer Painter**\.

1. Adjust the terrain brush settings as needed\.
**Radius**
Specifies the size of the brush\. Use the slider to adjust the size, or use the following keyboard shortcuts: **\[** to increase the brush radius size or **\]** to decrease the brush radius size\.
**Color Opacity**
Specifies the strength of the brush when applying the layer color\. The brush is a spray brush that uses the color opacity value to determine the opacity at the center of the brush\. The opacity decreases to transparent at the edge of the brush\. Lower values create a more translucent brush, and higher values create a more opaque brush\. Set the value to **0** to disable the color opacity\. You can use the slider to adjust the opacity level, or you can use the following keyboard shortcuts:
   + **Shift\+\[** decreases the opacity\.
   + **Shift\+\]** increases the opacity\.
You can also use the following keyboard shortcuts to adjust both parameters simultaneously with the same value:
   + **Shift\+Ctrl\+\[** decreases both color opacity and detail intensity\.
   + **Shift\+Ctrl\+\]** increases both color opacity and detail intensity\.
**Detail Intensity**
Specifies the strength of the brush when applying the detail texture to the layer\. Like color opacity, the detail intensity value determines the intensity \(opacity\) at the center of the brush\. The opacity decreases to transparent at the edge of the brush\. Lower values create a more translucent \(less intense\) texture, and higher values create a more opaque texture\. Set the value to **0** to disable detail intensity\. You can use the slider to adjust the intensity level, or you can use the following keyboard shortcuts:
   + **Ctrl\+\[** decreases the intensity\.
   + **Ctrl\+\]** increases the intensity\.
You can also use the following keyboard shortcuts to adjust both parameters simultaneously with the same value:
   + **Shift\+Ctrl\+\[** decreases both color opacity and detail intensity\.
   + **Shift\+Ctrl\+\]** increases both color opacity and detail intensity\.
**Mask by Layer Altitude and Slope**
Sets the material to paint only between the layer **Altitude** and **Slope** parameters defined below\.
**Mask by**
Selects a layer to prevent it from being painted over\.

1. Adjust the layer brush settings as needed\.
**Brightness**
Modifies the brightness of the material base color\. Click the **Color** box to open up the color selector and alter the base color of your material\. Click **Save Layer** when done\.
**Altitude**
Sets a minimum and maximum altitude mask for painting; the brush applies only within these boundaries\.
**Slope \(degrees\)**
Sets a minimum and maximum slope mask for painting; the brush applies only within these boundaries\.