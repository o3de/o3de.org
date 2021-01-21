---
description: ' Create wind areas in &ALY; to determine where objects experience wind. '
title: Creating Wind Areas
---
# Creating Wind Areas {#weather-wind-areas}


****

|  |
| --- |
| This topic references tools and features that are [legacy](/docs/userguide/ly-glos-chap#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](/docs/userguide/gems/cryentity-removal-gem) using the [Project Configurator](/docs/userguide/configurator/intro) or the [command line](/docs/userguide/lmbr-exe)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. |

Wind areas define a location within which objects experience wind\. If no direction is set, wind moves omnidirectionally from the center of the wind area\.

**To create a wind area**

1. In the **Rollup Bar**, under **Objects**, click **Entity**\.

1. Under **Browser**, expand **Physics** and double\-click **WindArea**\.

1. Drag to place the entity in your level\. A bounding box with direction areas appears\.

1. Under **Entity Properties**, adjust values of the following parameters:
   + **Active** - Enables or disables wind inside the area\.
   + **AirDensity** - If greater than 0, causes objects moving through the air to slow down\.
   + **AirResistance** - If greater than 0, causes lightweight objects to experience buoyancy\.
   + **Ellipsoidal** - Specifies an ellipsoidal drop off in air speed\.
   + **FalloffInner** - Sets the distance at which distance\-based air speed begins to drop off\.
   + **Speed** - Sets the wind speed\.
   + **Dir** - Sets the wind direction\.
   + **Size** - Sets the size of the wind area\.