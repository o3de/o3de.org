---
description: ' Enable height map ambient occlusion in your Lumberyard level to efficiently
  determine the exposure of ambient light to each point in a scene. '
title: Height Map Ambient Occlusion
---
# Height Map Ambient Occlusion {#mat-shaders-heightmap_ambient_occlusion}


****

|  |
| --- |
| This topic references tools and features that are [legacy](/docs/userguide/ly-glos-chap#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](/docs/userguide/gems/cryentity-removal-gem) using the [Project Configurator](/docs/userguide/configurator/intro) or the [command line](/docs/userguide/lmbr-exe)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. |

Ambient occlusion \(AO\) is a technique used to calculate how exposed each point in a scene is to ambient lighting\. The lighting at each point is a function of other geometry in the scene\. For example, the interior of a building is more occluded and thus appears darker than the outside of the building that is more exposed\.

Lumberyard uses height map\-based ambient occlusion \(AO\), which is a high\-performance and efficient method of providing ambient occlusion in outdoor environments without the need for prebaking\. This make it suitable for PC, consoles, and virtual reality headsets\.

In combination with screen space directional occlusion \(SSDO\), height map AO provides additional shading cues that enhance the depth perception of a scene\.

**To enable height map ambient occlusion**

1. In the **Rollup Bar**, click the **Terrain** tab, and then choose **Environment**\.

1. Under **Terrain**, select the **Height map AO** check box\.

The influence that height map AO provides can be restricted using clip volumes and vis areas\. Both of these object types have a **IgnoreHeightMap AO** check box that will locally disable height map AO inside the volume or area\.

By default, evaluation is performed at quarter\-display resolution\. This can be changed using the **r\_HeightMapAO** console variable, as listed below\.

Heightmap AO uses the following console variables:
+ **r\_HeightMapAO** - Sets the resolution that evaluation is performed at\. Values are : 0=off, 1=quarter resolution, 2=half resolution, 3=full resolution\.
+ **r\_HeightMapAOAmount** - Sets the strength of the occlusion effect when combined with the scene\.
+ **r\_HeightMapAORange**: - Area around the viewer that is affected by height map AO\.
+ **r\_HeightMapAOResolution** - Texture resolution of the height map used for approximating the scene\.