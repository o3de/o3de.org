# Setting Up a Simulated Object<a name="set-up-a-simulated-object"></a>

In the following procedure, add motion to a tassel attached to the character\.

**To set up a simulated object**

1. In the **Animation Editor**, choose **Layouts** and choose **SimulatedObjects**\.

1. In the **Skeleton Outliner**, select the bones to add to a simulated object\. Enter a name in the search bar or filter for results\.

1. Select the bones, right\-click, and choose **Simulated Object**, **Add selected joints**, **<New simulated object>**\.  
**Example**  

   The `L_tassle_01_JNT` bone and its children are selected\.  
![\[Select bones to create a simulated object in the Animation Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/simulated-objects-1.png)

1. In the dialog box, enter a name for the simulated object and click **OK**\.  
**Example**    
![\[Name your simulated object.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/simulated-objects-2.png)

   The simulated object appears in the **Simulated Object** panel\.  
![\[New simulated objects appear in the Simulated Object panel.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/simulated-objects-3.png)

1. In the **Simulated Objects** panel, select an object or joint\. The properties that you can customize appear in the **Simulated Object Inspector** panel\.
**Note**  
After you create an anim graph, you can preview the simulation\. For now, keep the default values\.  
**Example**  

   The first joint in the simulated object chain \(`L_tassle_01_JNT`\) is **Pinned**\. Pinned joints follow the original joint\. If you have multiple joints, you can pin them if you don't want them to move as a simulated object\. The root joint is always pinned\.  
![\[Review the properties for the simulated object and specify whether to pin them.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/simulated-objects-4.gif)

1. In the render window, view the collider radius of each joint in the simulated object\. Select the simulated object to view all colliders or select a joint to see an individual collider\.
**Tip**  
In the render window, click the ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/simulated-objects-5.png) icon to toggle the collider\.
The **Collision radius** is the distance in which the simulated object joint avoids a collider specified in the simulated object\. If the value is `0`, the joint remains on the surface of the collider\.
After you complete the next section, you can adjust the **Collider radius** to get your preferred results\.  
**Example**    
![\[View how the collider radius of each joint and how it moves with the animation of the actor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/simulated-objects-5.gif)

1. To save your actor, click the save icon in the **Actor Manager**\.  
**Example**    
![\[Save your actor in the Actor Manager.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/simulated-objects-6.png)