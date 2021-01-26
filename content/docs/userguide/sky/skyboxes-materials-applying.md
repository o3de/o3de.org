---
description: ' Learn how to apply a skybox material to a skybox in your Lumberyard level. '
title: Applying Skybox Materials to a Skybox
---
# Applying Skybox Materials to a Skybox {#sky-skyboxes-materials-applying}


****

|  |
| --- |
| This topic references tools and features that are [legacy](/docs/userguide/ly-glos-chap#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](/docs/userguide/gems/cryentity-removal-gem) using the [Project Configurator](/docs/userguide/configurator/intro) or the [command line](/docs/userguide/lmbr-exe)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. |

Do the following to apply a skybox material to a skybox\.

**To apply a skybox material to a skybox**

1. In Lumberyard Editor, choose **Tools**, **Material Editor**\.

1. In the **Material Editor**, select an existing skybox material from the tree pane or create a new material\.

1. Under **Material Settings**, choose **Sky** from the **Shader** drop\-down list\.

1. Under **Texture Maps**, for the **Diffuse** texture, choose one of the three skybox textures that you created\.

1. In Lumberyard Editor, choose **Tools**, **Rollup Bar**\.

1. In the **Rollup Bar**, on the **Terrain** tab, click **Environment**\.

1. Under **SkyBox**, click the browse \(**\.\.**\) button to choose a new material for the **Material** parameter\.
![\[Image NOT FOUND\]](/images/userguide/sky/skybox-material-parameter.png)

1. In the **Material Editor**, choose a material that uses the **Sky** shader\.

1. Return to the **SkyBox** settings in the **Rollup Bar**, and click the assign \(**<**\) button to apply the selected material to the skybox\.

1. \(Optional\) Configure the following parameters:
   + **Material low spec** - Select the skybox material to display at low resolution\.
   + **Angle** - Specify the angle to rotate the skybox\.
   + **Stretching** - Specify the amount to stretch the skybox texture to reduce the horizon line\.

1. Close the **Material Editor**\.