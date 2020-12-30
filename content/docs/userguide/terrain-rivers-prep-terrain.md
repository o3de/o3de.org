---
description: ' Use the rise/lower terrain brush to create a realistic riverbed and
  walls for your river in &ALY;. '
slug: terrain-rivers-prep-terrain
title: Preparing the River Terrain
---
# Preparing the River Terrain<a name="terrain-rivers-prep-terrain"></a>


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

Rivers need a riverbed and walls, which you implement as a deformation in the terrain\. Use the rise/lower terrain brush for this effect\.

To create a realistic\-looking riverbed and walls, make sure that the walls of the river are above the starting \(first\) point of the river for the entire length of the river\.

**To create the riverbed and walls**

1. In the **Rollup Bar**, on the **Terrain** tab, click **Modify**, **Rise/Lower**\.

1. Adjust the **Outside Radius** slider as needed for the width of the riverbed\.

1. Adjust the **Height slider** to a negative value for the depth of the riverbed\.

1. Adjust the other terrain brush settings as needed to fine\-tune the look of the riverbed\. See [Terrain Brush Parameters](terrain-landforms-brush-params.md) for more information\.

1. In your level, position the mouse at the start of river, and then drag to define the direction and course of the river\. Release the mouse at the end of the river\.