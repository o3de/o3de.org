description: ' Add a navigation area to your level in &ALYlong;. '
slug: ai-nav-areas
title: Creating Navigation Areas
---
# Creating Navigation Areas<a name="ai-nav-areas"></a>


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

For a navigation mesh to be generated, a navigation area needs to be first added to your level\. The bottom plane of the navigation area must be underneath the lowest point of the terrain the AI traverses, and the top plane of the navigation area must be above the height of the AI agent placed at the highest point of the terrain, allowing for plenty of clearance\. If this is not done, the navigation mesh fails\. A successfully created mesh will be blue in color\.

**Note**  
The `ai_DebugDrawNavigation` console variable must be set to `1, 2`, or `3` in order that the navigable surface is displayed\. 

**To create a Navigation Area**

1. In Lumberyard Editor, click **AI, Create New Navigation Area**\.

1. In the Rollup Bar, under **NavigationArea**, edit the **Area** parameter to be a non\-zero value\.

1. Under **NavigationArea**, edit the **Height** parameter so that the area is tall enough to enclose any hills or valleys in the terrain, as needed\.

1. Click **AI, Show Navigation Areas**\.

1. In the level, drag and click to define a shape enclosing the area that the AI agent navigates through\.

1. Double\-click to complete the shape\.

**To edit a Navigation Area**

1. In your level, hover over the where you want to make a change\. Once the shape turns orange, click it\.

1. In Rollup Bar, under **AI, NavigationArea, Edit Options**, click **Edit Shape**\.

1. To create a new vertex in the navigation area, press `Ctrl` and click on a line in the area\.

1. To delete a portion of the navigation area, double\-click on a vertex in the area\.