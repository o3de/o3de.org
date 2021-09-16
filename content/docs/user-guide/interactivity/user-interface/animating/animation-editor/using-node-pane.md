---
linkTitle: Node Pane
description: ' Use O3DE''s UI Animation editor''s Node Pane to add or remove UI elements in an animation sequence. '
title: Using the Node Pane
weight: 310
---

The **Node Pane** in the [Animation Editor](./) displays all the nodes in the selected animation sequence. Each item listed in the **Node Pane** is considered a node, though they represent different parts of the sequence. You can use the **Node Pane** to add or delete UI element nodes. Track nodes appear beneath its UI element when you record a track.

The animation sequence node, at the top level, contains a list of its UI elements nodes. Each UI element node contains a list of its track nodes.

1. **Animation Sequence** node

1. **UI Element** nodes

1. **Track** nodes

![Image NOT FOUND](/images/user-guide/interactivity/user-interface/animating/animation-editor/ui-animation-node-pane.png)

**To add a new UI element node**

1. In the [**UI Editor**](/docs/user-guide/interactivity/user-interface/editor), select one or more elements.

1. In the **Animation Editor**, right-click anywhere in the node pane and select **Add Selected UI Element(s)**.

**To remove a UI element node**
+ In the **Animation Editor**, in the node pane, right-click an element node and click **Delete**.

**To edit a track**

1. In the **Animation Editor**, in the node pane, select a track node.

1. Right-click the track node and choose any of the following:
   + **Copy Keys**
   + **Copy Selected Keys**
   + **Paste Keys**
   + **Disable the track**

You can also use the **Edit Sequence** tool to edit the properties of the sequence directly. You can set various properties, such as the start and end time, whether the sequence loops, and so on.

**To open the Edit Sequence tool**
+ In the **Animation Editor**, click the **Edit Sequence** icon.

![Image NOT FOUND](/images/user-guide/interactivity/user-interface/animating/animation-editor/ui-animation-edit-sequence.png)
