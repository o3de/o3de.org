# Setting Up the Simulated Object Anim Graph Node<a name="set-up-simulated-object-anim-graph-node"></a>

After you set up the simulated object, create an anim graph to view the simulation\. This lets you preview how the tassel moves in relation to the actor's primary motion\.

**To set up an anim graph node for the simulated object**

1. In the **Anim Graph** panel, click the **\+** icon to create an anim graph\.

1. Right\-click the graph and choose **Create Node**, **Sources**, **Blend Tree**\.  
**Example**    
![\[Create a blend tree node for your anim graph for the simulated object.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/simulated-objects-7.png)

1. Double\-click the **BlendTree0** node, right\-click the anim graph grid, and choose **Create Node**, **Physics**, **Simulated Object**\.  
**Example**    
![\[Create a simulated object node in the BlendTree0 node.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/simulated-objects-8.png)

1. Connect the **Pose** output of the **SimulatedObject0** node to the **Input Pose** of the **FinalNode0** node\.

1. Right\-click the anim graph and choose **Create Node**, **Sources**, **Motion**\.

1. Connect the **Output Pose** of the **Motion0** node to the **Pose** input of the **Simulated Object0** node\.  
**Example**  

   Your graph should look like the following\.  
![\[Create an anim graph for the simulated object.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/simulated-objects-10.png)

1. Select the **Motion0** node and in the **Attributes** panel, click the **\+** icon to add a motion to the node\.

1. In the **Motion Selection Window**, select a motion, such as the `run`, and click **OK**\.

1. Save the anim graph and enter a name, such as `simulatedobjects.animgraph`\.

1. Select the **SimulatedObject0** node and in the **Attributes** panel, click **Select simulated objects**\.  
**Example**    
![\[Select a simulated object for the anim graph.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/simulated-objects-11.png)

1. In the dialog box, select the simulated object\.   
**Example**    
![\[Select the simulated object that you created.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/simulated-objects-12.png)

1. Save the anim graph\.  
**Example**  

   In the **Anim Graph** panel, click the play icon to run the anim graph\. The colliders that you set up for each joint don't collide with other colliders and the tassel goes through the arm and chest of the actor\. 

   In the next procedure, you create another collider attached to the actor's skeleton\. This prevents the tassel from moving into the actor's body\.  
![\[Animate the actor and the simulated object.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/simulated-objects-13.gif)