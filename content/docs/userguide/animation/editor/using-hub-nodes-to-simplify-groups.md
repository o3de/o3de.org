---
description: ' Use Hub nodes in &ALYlong;''s &animation-editor; to simplify transitions
  between groups of nodes in an animation graph. '
title: Simplify Node Groups with Hub Nodes
---
# Simplify Node Groups with Hub Nodes {#animation-editor-using-hub-nodes-to-simplify-groups}


****

|  |
| --- |
| This feature is in [preview](/docs/userguide/ly-glos-chap#preview) release and is subject to change\.  |

The **Hub** node acts as a connection point between groups of nodes in an animation graph\. This pass\-through node outputs or forwards the pose of the node that entered it\. Hub nodes reduce the complexity of transitions by acting as the central point in a state machine\. By connecting multiple nodes to hubs, you can combine transition lines that share the same transition conditions and strategically organize nodes to create an easy\-to\-read state machine\.

**Example**
The following animation graph has many groups and transitions\.

![\[Animation graph without hub nodes.\]](/images/userguide/actor-animation/animation-editor-using-hub-nodes-nohubgraph.png)
The same graph with **Hub** nodes simplifies transitions between the groups, which makes the graph cleaner and easier to read\.

![\[Anim graph that is simplified with Hub nodes.\]](/images/userguide/actor-animation/animation-editor-using-hub-nodes-graphwithhubs.png)

**To use Hub nodes in your animation graph**

1. Add a **Hub** node in an animation graph by doing one of the following:
   + In the **Anim Graph Palette**, choose the **Sources** tab and drag **Hub** to the graph\.
   + In the graph, right\-click and choose **Create Node**, **Sources**, **Hub**\.
![\[Use the Anim Graph Palette or the graph's context menu to place a Hub node in the Anim Graph.\]](/images/userguide/actor-animation/animation-editor-using-hub-nodes-palette.png)

1. Repeat to add as many **Hub** nodes as you need\.

1. Add multiple like nodes, such as motion nodes or state machines, between the **Hub** nodes and create transitions\.
**Example**

   Transitions between motions are simplified by placing them between two **Hub** nodes\.
![\[Add multiple like nodes between the two Hub nodes to simplify transitions.\]](/images/userguide/actor-animation/animation-editor-using-hub-nodes-example.png)

   In the example, the transition between **attack01** and **Hub0** is a shared transition\. If you remove the **Hub0** node, you would then individually add those two conditions from **attack01** to each of the four transitions going into the **attack01**\* nodes\.

1. For all transitions entering a **Hub** node, set its **Transition Time** to `0.0` seconds\. This ensures that an extra delay is not added to the transition\.
![\[Set the Transition Time of any transitions entering a Hub node to 0.0 to prevent introducing extra delays.\]](/images/userguide/actor-animation/animation-editor-using-hub-nodes-transitiontime.png)