---
description: ' Use the Blend Two node in Open 3D Engine Animation Editor to blend two
  nodes that do not need additive blending. '
title: Blend Two Node
---

{{< preview-migrated >}}

With the **Blend Two** node, you can blend between two input poses based on a weight value\. For example, the **Blend Two** node can blend smoothly between a walk and a run based on the character's speed\.

The **Blend Two** is similar to the **Blend Two Additive** node, except that it doesn't support **Additive Blend** mode\.

**To use the **Blend Two** node**

1. In O3DE Editor, choose **Tools**, **Animation Editor**\.

1. Create a [blend tree](/docs/user-guide/features/visualization/animation/animation-editor/creating-blend-trees.md)\.

1. Double\-click the blend tree node that you created\.

1. Select the **Anim Graph Palette** tab and then select the **Blending** tab\.

1. Drag the **Blend Two** node into the animation graph\.
![\[On the Anim Graph Palette tab, select the Blending tab, and then drag Blend Two into the animation graph.\]](/images/user-guide/actor-animation/char-animation-editor-blendposes-animgraphpalette-blendtwo.png)

1.
![\[Blend Two node on the animation graph with inputs and outputs exposed.\]](/images/user-guide/actor-animation/char-animation-editor-blendposes-inoutputs-blendtwo.png)

   Connect nodes to the following inputs and output:
   + **Pose 1** - The first pose\.
   + **Pose 2** - The second pose\.
   + **Weight** - Blend weight\.

     You can use a **Float Constant** node, for example, to specify a float value between `0.0` and `1.0`\. A value of `0.0` means 100% of **Pose 1** and 0% of **Pose 2**\. A value of `0.6` weights 40% of **Pose 1** and 60% of **Pose 2**\. Other nodes that can specify **Weight** include the **Parameter** node, the **Smoothing** node, and so on\.
   + **Output Pose** - The result of the pose blending\.

## Blend Two Node Attributes {#animation-editor-blending-blendtwo-attributes}

For attribute settings that are shared among the blend node types, see [Blend Node Attributes](/docs/userguide/animation/editor/blending-poses#animation-editor-blending-attributes)\.

The **Extraction Mode** for the **Blend Two** node is calculated as follows\.
+ `S` = Source transform delta
+ `T` = Target transform delta

Root included in mask \(or no mask provided\):
+ **Blend** = `S` \+ \(`T` \- `S`\) \* weight
+ **Source** = `S`
+ **Target** = `T`

Additive, root excluded from mask:
+ **Blend** = `S`
+ **Source** = `S`
+ **Target** = `Zero`