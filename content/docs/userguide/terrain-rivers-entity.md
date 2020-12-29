description: ' Use the river tool to place the river in your &ALY; environment level
  and adjust the underlying terrain with the Align Height Map. '
slug: terrain-rivers-entity
title: Creating the River Entity
---
# Creating the River Entity<a name="terrain-rivers-entity"></a>


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

After you have prepared the riverbed, you next create and place the River entity\.

When performing this procedure, you may notice that parts of the river disappear into the terrain\. The **Align Height Map** step resolves this by stretching the terrain height to match the path of the river based on its shape and on **BorderWidth** parameter\. For information on **BorderWidth** and related settings, see [River Entity](https://docs.aws.amazon.com/lumberyard/latest/legacyreference/entities-entity-river.html)\.

![\[Image NOT FOUND\]](/images/terrain/terrain-rivers-entity.png)

**To create and place the River entity**

1. In the **Rollup Bar**, on the **Objects** tab, click **Misc**, **River**\.

1. In your level, starting at the beginning of the river bed, click to place a series of points that define the river’s path\.

1. When complete, double\-click at the end of the river bed\.

1. In the **Rollup Bar**, under **River Parameters**, click **Align Height Map** to adjust the terrain height to match the path of the river\.