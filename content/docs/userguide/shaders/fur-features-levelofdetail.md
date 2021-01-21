---
description: ' Use level of detail for fur materials in &ALYlong;. '
title: Level of Detail
---
# Level of Detail {#shader-ref-fur-features-levelofdetail}

Fur rendering level of detail uses many of the same mechanics as mesh level of detail\.

For fur rendering, the number of shell passes drawn decreases over a distance\. You can define the maximum number of passes using the [console variable](/docs/userguide/shaders/fur-consolevariables.md) `r_FurShellPassCount`\.

The starting distance for beginning to decrease shell passes is mesh dependent\. This distance is determined by the mesh's parameters **View distance multiplier** and **LOD distance ratio**\. You can find these parameters for the [mesh](/docs/userguide/components/static-mesh.md) or [skinned mesh](/docs/userguide/components/static-mesh.md) in the [**Entity Inspector**](/docs/userguide/components/entity-inspector.md)'s **Options** section\. The ending distance, after which no fur shells are drawn, is determined by the [console variable](/docs/userguide/shaders/fur-consolevariables.md) `r_FurMaxViewDist`\.