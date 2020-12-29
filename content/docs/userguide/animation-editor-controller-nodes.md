# Controller Nodes<a name="animation-editor-controller-nodes"></a>

See the following controller nodes in the **Animation Editor**\.

**Topics**
+ [Get Transform](#animation-editor-get-transform-node)
+ [Set Transform](#animation-editor-set-transform-node)

## Get Transform<a name="animation-editor-get-transform-node"></a>

The **Get Transform** node gets the transform data from a joint that you specify\. The transform includes the translation \(position\), rotation, and scale\. You can use this node to return the transform for your animations\.

**To create a Get Transform node**

1. In Lumberyard Editor, choose **Tools**, **Animation Editor**\.

1. In the **Animation Editor**, on the **Anim Graph** tab, open an existing animation graph or click the **\+** icon to create one\.

1. Right\-click the graph and choose **Create Node**, **Sources**, **Blend Tree**\.

1. Double\-click the **Blend Tree** node, right\-click the graph, and then choose **Create Node**, **Controllers**, **Get Transform**\.  
![\[Add the Get Transform node to your anim graph.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/animation-editor-get-set-transform-1.png)

   The **Get Transform** node appears in your graph\.  
![\[Get Transform node\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/animation-editor-get-transform.png)

1. To get the transform from a specific animation, right\-click the graph and choose **Create Node**, **Sources**, **Motion**\.

1. Connect the **Output Pose** of the **Motion** node to the **Input Pose** of the **Get Transform** node\.  
![\[Connect the Motion node to the Get Transform node in your anim graph.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/animation-editor-get-set-transform-2.png)

1. For the **Get Transform** node, in the **Attributes** tab, click **Select node**\. This selects the joint from which you want to get the transform\.  
![\[Set the joint for the Get Transform node.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/animation-editor-get-set-transform-6.png)

1. In the **Node Selection Window**, select your preferred joint and click **OK**\.  
![\[Select a joint for the Get Transform node.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/animation-editor-get-set-transform-4.png)

   The **Get Transform** node will output the vector \(x, y, z\) for **Output Translation** \(position\), **Output Rotation**, and **Output Scale**\.

1. In the right pane, on the **Attributes** tab, specify the **Transform Space**\. You can specify the following\.  
****    
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/animation-editor-controller-nodes.html)

## Set Transform<a name="animation-editor-set-transform-node"></a>

The **Set Transform** node sets the transform from a selected joint, including translation \(position\), rotation, and scale\.

**To create a Set Transform node**

1. In Lumberyard Editor, choose **Tools**, **Animation Editor**\.

1. In the **Animation Editor**, on the **Anim Graph** tab, open an existing animation graph or click the **\+** icon to create one\.

1. Right\-click the graph and choose **Create Node**, **Sources**, **Blend Tree**\.

1. Double\-click the **Blend Tree** node, right\-click the graph, and then choose **Create Node**, **Controllers**, **Set Transform**\.  
![\[Add the Set Transform node to your anim graph.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/animation-editor-get-set-transform-5.png)

   The **Set Transform** node takes **Input Pose**, **Translation** \(position\), **Rotation**, and **Scale** as inputs, and then outputs **Output Pose** for selected nodes \(joints\)\.

1. For the **Set Transform** node, on the **Attributes** tab, click **Select joint**\. This specifies the joint from which you want to set the transform\.  
![\[Set the Select joint attribute for the Set Transform node.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/animation-editor-get-set-transform-3.png)

1. Select your preferred joint and click **OK**\. The **Set Transform** node will output the vector \(x, y, z\) for **Output Pose**\.

1. In the right pane, on the **Attributes** tab, specify the **Transform space**\. You can specify the following\.  
****    
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/animation-editor-controller-nodes.html)