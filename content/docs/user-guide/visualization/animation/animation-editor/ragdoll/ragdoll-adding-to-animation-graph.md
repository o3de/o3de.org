---
description: ' Adding a ragdoll to an Animation Graph in the Open 3D Engine Animation Editor. '
title: Adding a Ragdoll to an Animation Graph
weight: 200
---

When you create an animation graph to control the ragdoll simulation of your character, you do the following:

+ Prepare the actor asset.
+ Adjust the animation graph to enable the ragdoll.
+ Preview.

The animation graph controls the ragdoll simulation of your character. When your character transitions into a blend tree that has a ragdoll node, the ragdoll automatically activates and simulates in game mode in **O3DE Editor**. When your character transitions out of that state, the ragdoll deactivates. The ragdoll node outputs a bind pose in the **Animation Editor**.

**To create an animation graph to transition from running state to ragdoll state**

1. In the **Animation Editor**, on the right side of the menu bar, choose **AnimGraph** from the drop-down list. This changes the layout.

    ![Change the Animation Editor layout by choosing AnimGraph from the drop-down list](/images/user-guide/actor-animation/ragdoll-animation-editor-layout-option-animgraph.png)

1. In the **Anim Graph** pane, click the **+** icon to create a new animation graph.

1. Right-click the grid and then choose **Create Node**, **Sources**, **Motion**. Alternatively, in the **Anim Graph Palette**, on the **Sources** tab, drag **Motion** into the animation graph.

    ![Add a Motion node to the animation graph from the context menu or the Anim Graph Palette in the Animation Editor](/images/user-guide/actor-animation/ragdoll-anim-graph-context-menu-motion-node.png)

1. Select the **Motion** node in the animation graph.

1. In the **Attributes** pane, do the following:

   1. For **Name**, enter a name for your motion. For example, **Run**.

   1. Click **Select motions**. In the **Motion Selection** window, select a motion and then click **OK**.

1. Right-click the grid and then choose **Create Node**, **Sources**, **Blend Tree**. Alternatively, in the **Anim Graph Palette**, on the **Sources** tab, drag **Blend Tree** into the animation graph.

    ![Add a Blend Tree node to the animation graph from the context menu or the Anim Graph Palette in the Animation Editor](/images/user-guide/actor-animation/ragdoll-anim-graph-palette-blend-tree.png)

1. Select the **Blend Tree** node in the animation graph.

1. In the **Attributes** pane, enter a name for your blend tree. For example, **Ragdoll**.

1. In the animation graph, connect the **Motion** node to the **Blend Tree** node. For example, connect the **Run** node to the **Ragdoll** node.

    ![Connect the Motion node to the Blend Tree node in the animation graph in the Animation Editor](/images/user-guide/actor-animation/ragdoll-animation-graph-connect-motion-and-ragdoll-nodes.png)

1. Double-click the **Blend Tree** node.

1. Right-click the grid and then choose **Create Node**, **Sources**, **Ragdoll**. Alternatively, in the **Anim Graph Palette**, on the **Sources** tab, drag **Ragdoll** into the animation graph.

1. Connect the **Output Pose** for the **Ragdoll** node to the **Input Pose** for the **Final Node** node.

1. At the root of the animation graph, select the transition line that starts from the **Motion** node and connects to the **Blend Tree** node. For example, select the transition line that connects the **Run** node to the **Ragdoll** node.

    ![Select the transition line that connects the Motion node to the Blend Tree node in the Animation Editor](/images/user-guide/actor-animation/ragdoll-animation-graph-transition-line.png)

1. In the **Attributes** pane, click **Add condition** and then choose **Time Condition**.

1. Under **Time Condition**, set the **Countdown Time**.

    ![Add a Time Condition from the Attributes pane in the Animation Editor](/images/user-guide/actor-animation/ragdoll-animation-graph-add-time-condition.png)

1. In the animation graph, click the **Motion** node for a preview.