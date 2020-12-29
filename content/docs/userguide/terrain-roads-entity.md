description: ' Use &ALY;''s road feature to create and place roads in your environment
  level. '
slug: terrain-roads-entity
title: Creating the Road Entity
---
# Creating the Road Entity<a name="terrain-roads-entity"></a>


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

You can create and place roads using the Road entity as follows\.

When performing this procedure, you may notice that parts of the road disappear into the terrain\. The **Align Height Map** step resolves this by stretching the terrain height to match the path of the road based on its shape and on **BorderWidth** parameter\. For information on **BorderWidth** and related settings, see [Road Entity](https://docs.aws.amazon.com/lumberyard/latest/legacyreference/entities-entity-road.html)\.

**To create and place the Road entity**

1. In the **Rollup Bar**, on the **Objects** tab, click **Misc**, **Road**\.

1. In your level, start at the beginning of the road and click to place a series of points that define the road’s path\.

1. When complete, double\-click where you want the road to end\.

1. In the **Rollup Bar**, under **Road Parameters**, click **Align Height Map** to adjust the terrain height to match the path of the road\.