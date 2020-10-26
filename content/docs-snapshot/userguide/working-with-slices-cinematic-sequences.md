# Working with Slices and Sequences<a name="working-with-slices-cinematic-sequences"></a>

When you create a track view sequence that has entities contained in slices or add a track view sequence in a slice, the process is the same as creating a track view sequence in a level\. The workflow is identical\. However, see the following best practices when working with slices and track view sequences\.

For more information about slices, see [Working with Slices](component-slices.md)\.

## Avoid External References<a name="avoid-external-references"></a>

As with any reference in a slice, if you make an external reference from within the slice, that reference will break if you also instantiate the slice in another level\.

For example, you have a track view sequence that is in a slice and also animates an entity outside of the slice\. When you instantiate that slice in another level, the track view sequence will not be able to find the external animated entity\. The animation for that specific entity will not apply to any entity\. 

To avoid this, ensure that entities that you animate from a track view sequence in a slice is either in the same slice or in a child slice\.

## Determine Which Instantiated Slice is in the Active Track View Sequence<a name="determine-the-slice-trackview"></a>

If you instantiate a slice that has a track view sequence, this creates another track view sequence with the same name as the original slice\.

**Example : Determine which sequence is active**  

1. You create a track view sequence named *Seq* that is in a slice and you then instantiate that slice three times in the level\. 

1. In the Track View, for the **Active Sequence** drop\-down menu, you will see *Seq* three times, one for each instantiated slice\. Because the slices have the same name, it’s unclear which instance of the sequence that you are editing in the Track View\.

1. To determine which slice you are editing, in the Track View, in the **Node Browser**, right\-click the track view sequence and in the context menu, choose **Select in Viewport**\. 

1. In the **Entity Outliner**, you can see the selected slice instance and track view sequence that you are editing\.

## Avoid Animating the Parent Entity in a Slice<a name="avoid-animating-root-node"></a>

If you instantiate a slice for a track view sequence, ensure that parent entities are not animated\. You can animate child entities, but the parent entity cannot be animated in a slice\.

**Example : Animate Child Entities in a Slice**  
The **Entity Outliner** shows two **Parent** slices, which have two children entities and a track view sequence\.  

![\[Example slice that has a track view sequence, which has been instantiated.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cinematics/cinematics-slice-example-1.png)
In the Track View, the **ExampleSequence** animates only the two children entities in the slice\. The **Parent** entity cannot be animated in a slice\.   

![\[Example track view sequence that animates child slices, not the parent.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cinematics/cinematics-slice-example-2.png)

**Note**  
The **[Transform](component-transform.md)** component is animated in local space relative to its parent\. When a slice is instantiated and its root transform is moved, all the child entity animations within also move as well\. If you instantiate the slice and move it to a new location, the animations will play at this new location\. 

## Avoid Setting a Director’s Camera Track in a Sequence in a Slice<a name="avoid-setting-director-camera-track"></a>

You should assume that multiple slices might be instantiated and playing back the slice sequence at the same time\. Therefore, if you have a **Director** node that sets the camera track in a sequence, that track may be playing at different local movie times simultaneously\. Also, the order of slice animation playback may change between ticks\. As a best practice, do not use the **Camera** track in **Director** nodes for sequences in slices\.

For more information, see [Director \(Scene\) Node](cinematics-track-view-nodes-director.md)\.