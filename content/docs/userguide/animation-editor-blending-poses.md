description: ' Learn how to blend poses using blend nodes in the &ALYlong; &animation-editor;
  . '
slug: animation-editor-blending-poses
title: Blending Poses with Blend Nodes
---
# Blending Poses with Blend Nodes<a name="animation-editor-blending-poses"></a>


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

You can use **Blend** nodes in animation graphs to create an animation that blends two input poses\. 

**Animation Editor** has the following types of blend nodes, each of which blend poses in different manners:
+ [Blend N Node](animation-editor-blending-blend-n.md)
+ [Blend Two Additive Node](animation-editor-blending-blendtwoadditive.md)
+ [Pose Subtract Node](animation-editor-blending-posesubtract.md)
+ [Blend Two Node](animation-editor-blending-blendtwo.md)
+ [Blend Two \(Legacy\) Node](animation-editor-blending-blendtwolegacy.md)

## Blend Node Attributes<a name="animation-editor-blending-attributes"></a>

The blend nodes feature a set of attributes that control different aspects of how the two nodes are blended\. Some blend nodes have different attributes, which are described in the sections about that node type\.

### Sync Mode<a name="animation-editor-blending-attributes-syncmode"></a>

The **Sync Mode** attribute determines the method of synchronizing motion clips to keep the feet synchronized\.

![\[Blend node attributes: Sync Mode.\]](/images/userguide/actor-animation/animation-editor-blending-attributes-1.png)


****  

| Attribute | Description | 
| --- | --- | 
| Disabled |  Synchronization is disabled\.  | 
| Event Track Based |  Synchronization based on sync event tracks\. This method pairs sync events, which ensures that the events in each of the inputs activate at the same time\.  | 
| Full Clip Based |  Synchronization based on the full clip duration\. Inputs are synchronized by the percentage that is complete\. For example, when the first input is at 25% playback of the input's duration, the second input is also at 25% playback\.  | 

### Event Filter Mode<a name="animation-editor-blending-attributes-eventfiltermode"></a>

The **Event Filter Mode** attribute determines which node's events are emitted\.


****  

| Attribute | Description | 
| --- | --- | 
| Leader Node Only |  Emits events from the leader node only\. The follower node is synchronized to this node\.  | 
| Follower Node Only  |  Emits events from the follower node only\. The follower node is synchronized to the leader node\.  | 
| Both Nodes |  Emits events from both leader and follower nodes\.  | 
| Most Active |  Emits events from the more active node\. Special use case for additive blends\.  | 

### Extraction Mode<a name="animation-editor-blending-attributes-extractionmode"></a>

The **Extraction Mode** attribute controls how the motion extraction behaves when blending\. For example, for transitions inside state machines, you can use this node to ensure that a 180 degree turn completes\.

![\[Blend node attributes: Extraction Mode.\]](/images/userguide/actor-animation/animation-editor-blending-attributes-3.png)


****  

| Attribute | Blend | 
| --- | --- | 
| Blend |  Blends between the source and target\. This setting helps ensure a proper blending result\. For example, when transitioning from idle into a turn, translation and rotation are blended\. Some of the turn's rotation can get lost in the blending, which means a 180 degree turn might reach only 160 degrees\. Use this blend setting to ensure the completion of the turn\.  | 
| Target Only |  Extracts the target only\. For example, when transitioning from idle into a turn, only the turn animation's translation and rotation is extracted\. The nodes inside the skeleton still blend normally\. This affects only the character’s rotation and translation\.  | 
| Source Only |  For example, when transitioning from idle into a turn, only the idle pose's translation and rotation is extracted\. The nodes inside the skeleton still blend normally\. This affects only the character’s rotation and translation\.  | 

### Mask<a name="animation-editor-blending-attributes-mask"></a>

Use **Mask** to select the skeleton nodes to include in the blend\.

**Example**  
A walking motion might be your first input pose and a waving motion your second input pose\. If you select as a mask the arm, hand, and fingers, and increase the pose's weight, the arm would wave while the body walks\. In this example, it would blend the arm bones from walk to wave\.