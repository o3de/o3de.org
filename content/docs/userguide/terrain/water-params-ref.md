---
description: ' Enhance the appearance of water volumes in Lumberyard swith advanced parameters. '
title: Advanced Water Volume Parameters
---
# Advanced Water Volume Parameters {#terrain-water-params-ref}


****

|  |
| --- |
| This topic references tools and features that are [legacy](/docs/userguide/ly-glos-chap#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](/docs/userguide/gems/cryentity-removal-gem) using the [Project Configurator](/docs/userguide/configurator/intro) or the [command line](/docs/userguide/lmbr-exe)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. |

The following advanced parameters apply to water volumes\.

**To set advanced Water Volume parameters**

1. In the Rollup Bar, on the **Objects** tab, click **Area**\.

1. Under **Object Type** click **WaterVolume**\.

1. Under **WaterVolume Params\\Advanced**, adjust the following parameter values as needed:
**FixedVolume**
Traces a ray down to find a 'vessel' entity and 'spill' the requested amount of water into it\. For static entities, it attempts to boolean\-merge any surrounding static that intersects with the first vessel \(use the **No Dynamic Water** flag on brushes that do not need that\)\.
**VolumeAccuracy**
Water level is calculated until the resulting volume is within this \(relative\) difference from the target volume \(if set to 0 it runs up to a hardcoded iteration limit\)\.
**ExtrudeBorder**
Extrudes the border by this distance\. This is particularly useful if wave simulation is enabled as waves can raise the surface and reveal open edges if they lie exactly on the vessel geometry\.
**ConvexBorder**
Takes convex hull of the border\. This is useful if the border would otherwise have multiple contours, which areas do not support\.
**ObjectSizeLimit**
Only objects with a volume larger than this number takes part in water displacement \(set in fractions of FixedVolume\)\.
**WaveSimCell**
Size of cell for wave simulation \(0 means no waves\)\. Can be enabled regardless of whether FixedVolume is used\.
**WaveSpeed**
Sets how "fast" the water appears\.
**WaveDamping**
Standard damping\.
**WaveTimestep**
This setting may need to be decreased to maintain stability if more aggressive values for speed are used\.
**MinWaveVel**
Sleep threshold for the simulation\.
**DepthCells**
Sets the depth of the moving layer of water \(in WaveSimCell units\)\. Larger values make waves more dramatic\.
**HeightLimit**
Sets a hard limit on wave height \(in WaveSimCell units\)\.
**Resistance**
Sets how strongly moving objects transfer velocity to the water\.
**SimAreaGrowth**
If changing water level is expected to make the area expand, the wave simulation grid should take it into account from the beginning\. This sets the projected growth in fractions of the original size\. If wave simulation is not used, this setting has no effect\.