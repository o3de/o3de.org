# Director \(Scene\) Node<a name="cinematics-track-view-nodes-director"></a>

The **Director \(Scene\)** node includes a camera track that specifies the active camera for a track view sequence\. You can add sequence\-specific nodes \(for example, **Depth of Field** or **Comment**\) under the **Director** node to override the same nodes that were set at the sequence level\.

**To add a Director node in the Track View**

1. In Lumberyard Editor, choose **Tools**, **Track View**\.

1. In the Track View, click the **Add Sequence** ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cinematics/cinematics_add_sequence_icon.png) icon\.

1. In the **Add New Sequence** dialog box, enter a name for your sequence and click **OK**\.

1. Right\-click your sequence and choose **Add Director \(Scene\) Node**\.

1. Right\-click the **Director** node and click **Add Track**\.  
![\[Add the Director node in the Track View to manage your track view sequence.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cinematics/cinematics-trackview-nodes-director.png)

1. Select the track and double\-click to position the key on its highlighted row in the timeline\.

1. Double\-click the green marker, and under **Key Properties**, enter a value for **Value**\.

   You can add the following tracks and then set the key properties to the **Director** node\.  
**Director Node Tracks and Key Properties**    
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/cinematics-track-view-nodes-director.html)

**Note**  
You can add multiple **Director** nodes to a scene, but only one **Director** node can be active\. 
To change the active **Director** node, right\-click the node and choose **Set as Active Director**\. When you deactivate a **Director** node, all child node animations are deactivated\. This is useful when you want to enable and disable animation for specific objects within the same track view sequence\.