# Setting Up Simulated Object Colliders<a name="set-up-simulated-object-collider"></a>

 In the following procedure, add a collider to the spine and left arm to reduce the tassel’s movement\. This ensures that the tassel has something to collide with, which prevents it from moving through the actor's body\.

**To set up simulated object colliders**

1. In the **Skeleton Outliner**, select the joint or joints to add a simulated object collider to\. In this example, use the `C_spine_04_JNT` joint\.

1. Right\-click your selection and choose **Simulated object collider**, **Add collider**, **Add capsule**\. This creates a shape that defines the collider area for the joint\.  
**Example**  

   You can also add a sphere if that shape fits your actor better\.  
![\[Add a capsule shape to create a collider area for your skeleton.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/simulated-objects-14.png)

   In the **Skeleton Outliner**, a simulated object collider ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/simulated-objects-20.png) icon appears next to the joint\. 

1. In the **Simulated Object Inspector**, adjust the capsule so that it's larger than the actor's geometry\. 

   In this example, change the **Height** to `0.344` and the **Radius** to `0.162`\.   
**Example**  

   By default, the name of the joint \(`C_spine_04_JNT`\) is also the name of the collider\.  
![\[Create a simulated object collider for the spine and make changes, so that it's slightly larger than the actor's shape.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/simulated-objects-15.png)

1. Repeat **Step 1** to add the `L_arm_JNT` joint\. This creates another simulated object collider to the upper\-left arm\.

1. Repeat **Step 2** and **3** to set up a collider for the arm\. 

1. Adjust the capsule so that it fits the arm\. In this example, enter the following values:
   + **Height** to **0\.322**
   + **Radius** to **0\.081**
   + **Rotation: X** to **180**
   + **Radius: Y** to **89\.99**
   + **Radius: Z** to **180**  
**Example**  

   By default, the name of the joint \(`L_arm_JNT`\) is also the name of the collider\.  
![\[Create a simulated object collider for the arm and make changes, so that it's slightly larger than the actor's shape.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/simulated-objects-16.png)

1.  In the **Skeleton Outliner**, select the joints where the simulated object colliders are attached\. 
**Tip**  
In the render window, deselect the first icon \(**Solid**\) and select the second \(**Wireframe**\) to view the capsule colliders\.  
**Example**  

   In the render window, the colliders appear purple\. If you deselect the joint, the collider appears gray\. 

   Now that you added the simulated objects to the spine and arm, add these colliders to the simulated object\.  
![\[View the capsule colliders that you attached to the joints of the actor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/simulated-objects-17.png)

1. In the **Simulated Objects** panel, select the simulated object\.

1. In the **Simulated Object Inspector**, for **Collides with**, select the available colliders\. This enables the simulated object joints \(the tassel\) to collide with the actor's body \(the spine and left arm\)\.  
**Example**    
![\[Enable the tassel to collide with the actor's body during an animation.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/simulated-objects-18.gif)

1. In the **Actor Manager**, save the actor\. You might have to wait for Asset Processor to finish processing your changes\.