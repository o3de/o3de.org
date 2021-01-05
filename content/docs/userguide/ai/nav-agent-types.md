---
description: ' Select an AI navigation type in &ALYlong;. '
slug: ai-nav-agent-types
title: Selecting an AI Navigation Type
---
# Selecting an AI Navigation Type<a name="ai-nav-agent-types"></a>


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

Each AI agent needs to have a navigation type assigned, either animate \(human\-based\) or inanimate \(vehicle\-based\)\. The following AI agent properties are relevant from a navigation perspective:
+ **AgentType** \- MediumSizedCharacters or VehicleMedium
+ **voxelSize** \- 0\.125m x 0\.125m x 0\.125m minimum
+ **radius** \- agent radius, in voxels
+ **climbableHeight** \- maximum climbable height of maximum slope, in voxels
+ **maxWaterHeight** \- maximum walkable water depth, in voxels

**To assign a navigation type for an AI agent**

1. In Lumberyard Editor, click **Tools**, **Other**, **DataBase View**\.

1. On the **Entity Library** tab, click the **Load Library** button and select your asset file\.

1. Under **Class Properties** pane, for **Navigation Type**, make a selection\. This sets the navigation type for all AI agents\.

1. In Rollup Bar, under **Objects, AI, NavigationArea, NavigationArea Params**, make a selection\.