---
description: ' Set up global wind to create wind and breezes that affect everything
  in your &ALY; level. '
title: Adding Global Wind
---
# Adding Global Wind {#weather-wind-global}


****

|  |
| --- |
| This topic references tools and features that are [legacy](/docs/userguide/ly-glos-chap#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](/docs/userguide/gems/cryentity-removal-gem) using the [Project Configurator](/docs/userguide/configurator/intro) or the [command line](/docs/userguide/lmbr-exe)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. |

Global wind and breezes affect everything in your level, such as all vegetation\. Here's how to set them up:

**To set global wind parameters**

1. In the **Rollup Bar**, under **Terrain**, click **Environment**\.

1. Under the **EnvState** section, adjust values of the following parameters:
   + **Wind vector** - Speed and wind direction vector\. Positive x values are east; positive y values are north\.
   + **Breeze generation** - Enables breezes\.
   + **Breeze strength** - Controls the intensity of the breeze\.
   + **Breeze movement speed** - Controls the velocity of the breeze\. Use it to produce short, rapid gusts of wind\.
   + **Breeze variation** - Varies breeze speed, strength, and size\.
   + **Breeze life time** - Sets the duration of each breeze, in seconds\.
   + **Breeze count** - Sets the number of breezes generated per instance\.
   + **Breeze spawn radius** - Radius of breeze travel\.
   + **Breeze spread** - Determines the degree of variation in breeze direction\.
   + **Breeze radius** - Sets the radius of breeze influence\.