---
description: ' Use the manual method to add grass for more control and lower memory
  usage. '
title: Adding Grass Manually
---
# Adding Grass Manually {#vegetation-grass-manual}


****

|  |
| --- |
| This topic references tools and features that are [legacy](/docs/userguide/ly-glos-chap#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](/docs/userguide/gems/cryentity-removal-gem) using the [Project Configurator](/docs/userguide/configurator/intro) or the [command line](/docs/userguide/lmbr-exe)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. |

Although you can paint in your terrain to add grass quickly, the manual approach saves memory and results in better control and a more realistic effect\.

**To manually add grass**

1. In Lumberyard Editor, click **Tools**, **Material Editor**\.

1. Expand the left tree and select a suitable asset\.

1. Under **Material Settings**, select the **Vegetation** shader\.

1. Under **Shader Generation Params** select **Grass**\.

1. Modify other settings and parameter values for the desired effect\.

1. Click **Assign Object to Item**\. Close Material Editor\.

1. If necessary, depending on your terrain, in the **Rollup Bar**, on the **Terrain** tab, select the **AlignToTerrain** check box\.

1. Click to place grass in your level and repeat as needed\.

**Note**
When you add or move grass, it may sporadically jump around\. This happens if you move vegetation to a location that is too dense to accommodate it\. When this occurs, the vegetation moves to its last position and is outlined in red\. You can then move it elsewhere or delete it\.