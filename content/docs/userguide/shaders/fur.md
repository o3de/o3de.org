---
description: ' Use the Fur shader for real-time fur rendering in &ALYlong;. '
title: Fur Shader
---
# Fur Shader {#shader-ref-fur}

Lumberyard's **Fur** shader renders fur in real time\. You can apply this shader to any mesh and adjust its properties to customize the fur's appearance and behavior\.

**Topics**
+ [Fur Combing](/docs/userguide/shaders/fur-combing.md)
+ [Fur Features](/docs/userguide/shaders/fur-features.md)
+ [Material Settings](/docs/userguide/shaders/fur-materialsettings.md)
+ [Fur Console Variables](/docs/userguide/shaders/fur-consolevariables.md)
+ [Maya - Fur Previsualization](/docs/userguide/shaders/fur-previzmaya.md)
+ [3DSMax - Fur Previsualization](/docs/userguide/shaders/fur-previz3dsmax.md)

To use the fur shader, create a new material and, from the **Shader** drop\-down, select **Fur**\. Apply this new material to your mesh object\.

![\[Creating a new fur shader material to apply to your mesh object.\]](/images/userguide/shaders/shader-ref-fur-1.png)

You set a [Fur Heightmap](/docs/userguide/shaders/fur-materialsettings.md) to define where fur appears, how it clumps together, and to provide non\-uniformity of strands across a mesh\. A fur heightmap is a grayscale texture, as shown in the following image\.

![\[Example fur heightmap texture.\]](/images/userguide/shaders/shader-ref-fur-2.png)

Brighter values at a UV result in longer fur at that point\. Under **Shader Params**, adjust **Fur Length \(cm\)** to modify the length of the fur\. The following image shows objects with different fur lengths\.

![\[Example fur material shaders with varying fur lengths.\]](/images/userguide/shaders/shader-ref-fur-3.png)