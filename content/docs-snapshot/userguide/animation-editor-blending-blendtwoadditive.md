# Blend Two Additive Node<a name="animation-editor-blending-blendtwoadditive"></a>

The **Blend Two Additive** node blends a pose 2 input additively on top of a pose 1 input\.

![\[Blend Two Additive node.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/char-animation-editor-blendposes-blendtwoadditive.png)

**Note**  
This node functions similarly to the **Blend Two \(Legacy\)** node with **Additive** enabled\. The key difference is that the **Blend Two \(Legacy\)** node subtracts the bind pose when applying an additive blend\. Furthermore, **Blend Two Additive** expects pose 2 to be an additive pose\. This means that if you wanted **Blend Two Additive** to function like the **Blend Two \(Legacy\)** node, you must first subtract the bind pose from pose 2\.

**To use the **Blend Two Additive** node**

1. In Lumberyard Editor, choose **Tools**, **Animation Editor**\.

1. Create a [blend tree](animation-editor-creating-blend-trees.md)\.

1. Double\-click the blend tree node that you created\.

1. Select the **Anim Graph Palette** tab and then select the **Blending** tab\.

1. Drag the **Blend Two Additive** node into the animation graph\.  
![\[On the Anim Graph Palette tab, select the Blending tab, and then drag Blend Two Additive into the animation graph.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/char-animation-editor-blendposes-animgraphpalette.png)

1.   
![\[Blend Two Additive node on the animation graph with inputs and outputs exposed.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/char-animation-editor-blendposes-inoutputs.png)

   Connect nodes to the following inputs and output:
   + **Pose 1** – The base pose\.
   + **Pose 2** – The pose to be added to **Pose 1**\.
   + **Weight** – Weight of additive\.

     You can use a **Float Constant** node, for example, to specify a float value between `0.0` and `1.0`\. A value of `0.0` means **Pose 2** does not affect **Pose 1** at all\. A value of `1.0` means that **Pose 2** is fully added on top of **Pose 1**\. Other nodes that can specify **Weight** include the **Parameter** node, the **Smoothing** node, and so on\.
   + **Output Pose** – The result of the blended poses, which you can visualize as `Pose 1 + (Pose 2 * Weight)`\.

## Blend Two Additive Node Attributes<a name="animation-editor-blending-blendtwoadditive-attributes"></a>

For attribute settings that are shared among the blend node types, see [Blend Node Attributes](animation-editor-blending-poses.md#animation-editor-blending-attributes)\.

The **Extraction Mode** for the **Blend Two Additive** node features masking and additive blending, which adds complexity over **Extraction Mode** for transitions\.

 The output from motion extraction with the **Blend Two Additive** node is calculated as follows\.
+ `S` = Source transform delta
+ `T` = Target transform delta

Additive, root included in mask \(or no mask provided\):
+ **Blend** = `S` \+ `T` \* weight
+ **Source** = `S`
+ **Target** = `T`

Additive, root excluded from mask:
+ **Blend** = `S`
+ **Source** = `S`
+ **Target** = `S`