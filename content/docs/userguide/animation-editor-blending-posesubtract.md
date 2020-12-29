# Pose Subtract Node<a name="animation-editor-blending-posesubtract"></a>

The **Pose Subtract** node subtracts **Pose 2** from **Pose 1**\. The output of a **Pose Subtract** node is the delta between them \(**Pose 1** – **Pose 2**\)\.

**Note**  
With the **Pose Subtract** node, you can generate an additive pose\. You can then supply it to the **Blend Two Additive** node at runtime without manually generating it from a [DCC](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#dcc)\. The output of the **Pose Subtract** node cannot be used as an input to the **Blend Two \(Legacy\)** node\. This is because **Blend Two \(Legacy\)** does not expect a pose that is already a delta or additive pose, but expects a bind pose\.

**To use the **Pose Subtract** node**

1. In Lumberyard Editor, choose **Tools**, **Animation Editor**\.

1. Create a [blend tree](animation-editor-creating-blend-trees.md)\.

1. Double\-click the blend tree node that you created\.

1. Select the **Anim Graph Palette** tab and then select the **Blending** tab\.

1. Drag the **Pose Subtract** node into the animation graph\.  
![\[On the Anim Graph Palette tab, select the Blending tab, and then drag Pose Subtract into the animation graph.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/char-animation-editor-blendposes-animgraphpalette-posesubtract.png)

1.   
![\[Pose Subtract node on the animation graph with inputs and outputs exposed.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/char-animation-editor-blendposes-inoutputs-posesubtract.png)

   Connect nodes to the following inputs and output:
   + **Pose 1** – The base pose\.
   + **Pose 2** – The pose to be subtracted from the base pose\.
   + **Output Pose** – The result of the pose subtraction \(**Pose 1** \- **Pose 2**\)\.

## Pose Subtract Node Attributes<a name="animation-editor-blending-posesubtract-attributes"></a>

For attribute settings that are shared among the blend node types, see [Blend Node Attributes](animation-editor-blending-poses.md#animation-editor-blending-attributes)\.

![\[Pose Subtract node attributes.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/animation-editor-blending-posesubtract-attributes.png)