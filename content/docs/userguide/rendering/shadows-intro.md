---
description: ' Learn how to minimize the performance impact of rendering shadows in
  Lumberyard. '
title: Environment Shadows
---
# Environment Shadows {#rendering-graphics-shadows-intro}

Lumberyard supports shadow casting from all light sources and shadow receiving on all deferred and most forward\-rendered geometry\. Traditional shadow mapping is used for shadow generation\. Light sources can be directional, such as from the sun and moon, or from point and area light sources\.

As shadow generation is resource\-intensive, Lumberyard offers the following features to mitigate this:
+ You can control the degree to which Lumberyard caches shadows and stops dynamically updating the most distant cascaded sun shadows\.
+ You can set point and area light sources to be updated in intervals, such as every second frame\.
+ You can use the **r\_MergeShadowDrawcalls** console variable to merge submaterials during shadow generation, resulting in fewer drawcalls\.

**Topics**
+ [Cached Shadows](/docs/userguide/rendering/shadows-cached.md)
+ [Object Shadows](/docs/userguide/rendering/shadows-object.md)
+ [Shadow Proxies](/docs/userguide/rendering_graphics_shadows_proxies.md)
+ [Using CVARs to Configure Terrain and Cascade Shadow Maps](/docs/userguide/rendering/shadows-cvars.md)