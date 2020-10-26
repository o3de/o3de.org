# Using Parameters to Adjust the Animation During Runtime<a name="use-parameters-to-adjust-animation-during-runtime"></a>

You can adjust the **SimulatedObject** node to change its animation during runtime\. To do so, create a **Parameter** node and attach them to the node in the anim graph\. If you don't, the **SimulatedObject** node uses the properties that you entered in the **Attributes** panel\.

**To adjust the animation during runtime**

1. In the **Parameters** panel, click the **\+** icon and choose **Add parameter**\.

1. Enter the following values\.

   1. For **Value type**, select the **Float \(slider\)**\.

   1. For **Name**, enter **Stiffness**\.

   1. For **Default**, enter **1\.0**\.

   1. For **Minimum** to **1\.0**\.

   1. For **Maximum**, enter **100**\.  
**Example**  

   Your parameter should look like the following\.  
![\[Create a stiffness parameter.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/simulated-objects-25.png)

1. Click **Create**\.

1. Repeat **Steps 2** and **3** but change **Name** to **Gravity**, **Default** to **1\.0**, **Minimum** to **0** and **Maximum** to **5**\.

1. Repeat **Steps 2** and **3** but change **Name** to **Damping**, **Default** to **1\.0**, **Minimum** to **1** and **Maximum** to **100**\.

1. Repeat **Steps 2** and **3** but change **Name** to **Weight**, **Default** to **1**, **Minimum** to **0** and **Maximum** to **1**\.  
**Example**  

   Your parameters should look like the following\.  
![\[Create your parameters for your anim graph.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/simulated-objects-26.png)

1. In the **Anim Graph** grid, right\-click and choose **Create Node**, **Sources**, **Parameters**\.

1. On the **Parameters0** node, connect the **Stiffness** output to the **Stiffness factor**, the **Gravity** output to the **Gravity factor**, and so on\.  
**Example**  

   Your graph should look like the following\.  
![\[Connect the Parameters0 node to the SimulationObject0 node.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/simulated-objects-27.png)

1. Pay the anim graph and adjust the sliders for the **Parameters** to view your changes\.

**Note**  
The simulated object, simulated joints, and parameters on the anim graph share the following properties: **Stiffness**, **Gravity**, **Damping**  
When you adjust the properties, the **Animation Editor** calculates the results of these properties using the following:  
Stiffness factor parameter `X` simulated object stiffness `X` simulated joint stiffness
Gravity factor parameter `X` simulated object gravity `X` simulated joint gravity
Damping factor parameter `X` simulated object damping `X` simulated joint damping