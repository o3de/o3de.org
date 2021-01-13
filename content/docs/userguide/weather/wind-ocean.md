---
description: ' Use OceanAnimation settings to simulate realistic wind and wave effects
  for an ocean in your &ALY; game project. '
title: Adding Ocean Wind
---
# Adding Ocean Wind {#weather-wind-ocean}


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

You can simulate realistic wind and wave effects for the ocean in your level\.

**To set ocean wind parameters**

1. In Lumberyard Editor, choose **Tools**, **Rollup Bar**\.

1. In the **Rollup Bar**, on the **Terrain** tab, under **Terrain**, click **Environment**\.

1. Under **OceanAnimation**, adjust the following parameters:
   + **Wind Direction** – Specifies the direction to push the water texture crawl in radians\. Valid values: 0\.0 to 6\.28\.
   + **Wind Speed** – Specifies how frequently the texture water crawl updates\.
   + **Wave Frequency** – Sets the frequency of waves\. Smaller values mean fewer, longer waves \(deep ocean depth\)\. Larger values mean more, shorter waves \(shallow ocean depth\)\.
   + **Wave Height** – Sets wave height in meters by means of vertex displacement\.