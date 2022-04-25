---
description: ' Use the Animation Editor quick start to animate a character in Open 3D Engine. '
title: Getting Started with the Animation Editor
---

See the following procedures to get started with the **Animation Editor**.

In this procedure, you do the following:
+ Import your actor file and create a motion set to specify the motions that you want for your character.
+ Create a basic animation graph using nodes.
+ Create a blend tree to combine the motions and use a slider to control character movement from idle to walking and then running.

## Step 1: Creating a Motion Set

In the following procedure, you import your character, Jack the robot, select the motions that you want, and then add those motions to a motion set.

**To create a motion set**

1. In O3DE Editor, choose **Tools**, **Animation Editor**.

1. In Animation Editor, choose **Layouts**, **AnimGraph**.

1. In the **Animation Editor**, choose **File**, **Open Actor** and navigate to the `AnimationSamples\Simple_JackLocomotion` directory.

1. Select the `JackBind_ZUp.fbx` file and then click **OK**.

   Your character Jack appears in the **Animation Editor**.

   ![Import the JackBind_ZUp.fbx file into the Animation Editor.](/images/user-guide/actor-animation/animationeditorquickstart/animation-editor-quick-start-jack-idle.png)

1. On the **Motion Sets** tab, under **Motion Set Management**, click the **+** icon to add a motion set.

1. Select the **MotionSet0** node.

1. In the **Motion Set** pane, click the folder icon to add motions.

1. Navigate to the `AnimationSamples/Simple_JackLocomotion` directory, and select the following files:
   + `Jack_Idle_ZUp.fbx`
   + `Jack_Strafe_Run_Forwards_ZUp.fbx`
   + `Jack_Strafe_Walk_Forwards_ZUp.fbx`

1. Click **OK**.

1. In the **Motion Set Management** pane, click the **Save** icon.

1. Navigate to the `/SamplesProject/AnimationSamples/Simple_JackLocomotion` directory. For the file name, type **quickstart** and then click **Save** to save the `quickstart.motionset` file.

![Create a motion set and add motion files in the Animation Editor.](/images/user-guide/actor-animation/animationeditorquickstart/animation-editor-quick-start-motion-set.png)

## Step 2: Creating an Animation Graph

In the following procedure, create an animation graph and nodes.

**To create an animation graph**

1. On the **Anim Graph** tab, click the **+** icon to create an animation graph.

1. Click the **Save** icon.

1. Navigate to the `/SamplesProject/AnimationSamples/Simple_JackLocomotion` directory. For the file name, enter **quickstart** and then click **Save** to save the `quickstart.animgraph` file.

1. On the **Anim Graph** tab, right-click the grid, and then select **Create Node**, **Sources**, **Motion**.

![Create a motion node in the animation graph.](/images/user-guide/actor-animation/animationeditorquickstart/animation-editor-quick-start-anim-graph-node.png)

1. Select the **Motion0** node and in the **Attributes** pane, click **Select motions**. In the dialog box, select `Jack_Idle_ZUp.fbx` and then choose **OK**.

1. Right-click the grid and then choose **Create Node**, **Sources**, **Blend Tree**.

1. From the **Motion0** node, click and drag a line to the **BlendTree0** node. A transition line with an arrow connects the nodes.

1. From the **BlendTree0** node, click and drag a line to the **Motion0** node.

![Connect the motion and blend tree nodes in the animation graph.](/images/user-guide/actor-animation/animationeditorquickstart/animation-editor-quick-start-motion-blend-tree-nodes.png)

1. In the **Parameters** pane, click the **+** icon to create a parameter.

   1. Leave the **Value type** parameter to the default, **Float (slider)**.

   1. For **Name**, rename `Parameter0` to **speed**.

   1. Click **Create**.

1. In the animation graph, select the transition line that starts from the **Motion0** node and connects to the **BlendTree0** node.

   1. In the **Attributes** pane, click **Add condition**.

   1. In the **Select a Condition** dialog box, select **Parameter Condition** and then click **Add Condition**.

   1. In the **Attributes** pane, under **Parameter Condition**, click **Select parameter** and select **speed**.

   1. For **Test Function**, leave the default value of **param > testValue**. This means that if the speed is greater than zero, the idle motion transitions to the blend tree, and the character starts to move.

   ![Add parameter conditions to specify when the character starts moving.](/images/user-guide/actor-animation/animationeditorquickstart/animation-editor-quick-start-add-condition.png)

1. In the animation graph, select the transition line that starts from the **BlendTree0** node and connects to the **Motion0** node.

   1. In the **Attributes** pane, click **Add condition**.

   1. In the **Select a Condition** dialog box, select **Parameter Condition** and then click **Add Condition**.

   1. In the **Attributes** pane, under **Parameter Condition**, click **Select parameter**. Select **speed** and then click **OK**.

   1. For **Test Function**, select **param == testValue**. This means that if the speed is equal to zero, the motion transitions back to idle, and the character stops moving.

   ![Add parameter conditions to specify when the character stops moving.](/images/user-guide/actor-animation/animationeditorquickstart/animation-editor-quick-start-add-condition-02.png)

## Step 3: Blending the Animations

In the following procedure, you use the blend tree node to build your blend tree, which blends the walk and run animations together.

**To blend the animations**

1. In the animation graph, double-click the **BlendTree0** node.

1. Right-click the grid and choose **Create Node**, **Sources**, **Motion**.

1. Select the **Motion1** node.

   1. In the **Attributes** pane, choose **Select motions**.

   1. In the **Motion Selection Window**, select `jack_strafe_walk_forwards_zup` and then click **OK**.

      The attributes for the **Motion1** node should look like this:

      ![Add the walk motion file to the Motion1 node.](/images/user-guide/actor-animation/animationeditorquickstart/animation-editor-quick-start-motion-node-walk.png)

1. In the animation graph, right-click the grid and choose **Create Node**, **Sources**, **Motion**.

1. Select the **Motion2** node.

   1. In the **Attributes** pane, click **Select motions**.

   1. In the dialog box, select `jack_strafe_run_forwards_zup` and then click **OK**.

      The attributes for the **Motion2** node should look like this:

      ![Add the run motion file to the Motion2 node.](/images/user-guide/actor-animation/animationeditorquickstart/animation-editor-quick-start-motion-node-run.png)

1. Right-click the grid and choose **Create Node**, **Blending**, **Blend Two**.

1. Select the **BlendTwo0** node.

   1. In the **Attributes** pane, for **Sync Mode**, select **Full Clip Based**.

1. For **Motion1** node, select the **Output Pose** box and drag the connector to the **Pose 1** input of the **BlendTwo0** node.

1. For **Motion2** node, select the **Output Pose** box and drag the connector to the **Pose 2** input of the **BlendTwo0** node.

1. For the **BlendTwo0** node, select the **Output Pose** box and drag the connector to the **Input Pose** of the **FinalNode0** node.

   Your blend tree should look like the following:

   ![Create your blend tree in the animation graph.](/images/user-guide/actor-animation/animationeditorquickstart/animation-editor-quick-start-blend-tree-node.png)

1. Right-click the grid and choose **Create Node**, **Sources**, **Parameters**.

1. Right-click the grid and choose **Create Node**, **Math**, **Smoothing**.

1. For **Parameters0** node, select the **speed** output box and drag the connector to the **Dest** input box of the **Smoothing0** node.

1. For the **Smoothing0** node, select the **Result** output box and drag the connector to the **Weight** input box of the **BlendTwo0** node.

   Your blend tree should look like the following:

   ![Create a blend tree for your animation graph.](/images/user-guide/actor-animation/animationeditorquickstart/animation-graph-quick-start-blend-tree-final.gif)

1. In the **Animation Editor**, choose **File**, **Save All**. Then in the dialog box, click **OK**.

1. Navigate to the `/SamplesProject/AnimationSamples/Simple_JackLocomotion` directory. For the file name, enter **quickstart** and then click **Save** to save the workspace.

1. In the **Anim Graph** tab, click the **Play** button. The character should now be animated in the idle mode.

1. In the **Parameters** pane, move the **speed** slide control to the right to make Jack walk. Move the slider further to the right to make Jack run.

{{< video src="/images/user-guide/actor-animation/animationeditorquickstart/animation-editor-quick-start-jack-running.mp4" info="Animate Jack the robot in the Animation Editor." autoplay="true" loop="true" width="300" >}}
