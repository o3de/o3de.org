---
description: ' Use the Track View editor to create and manage cinematic sequences
  in Open 3D Engine. '
title: Using the Track View Editor
---

The Track View is the primary tool to create and manage cinematic sequences. A *[sequence](/docs/user-guide/appendix/glossary#sequence)* is the content generated from the Track View for cutscenes or other canned animation triggers. When you create a sequence, this creates a component entity in the level. The component entity stores all of the animation key data that you specified in the Track View.

If you want to generate cutscenes for games or create a script to trigger an animation, you can use the Track View to control cameras, component entities, global variables in a level, and so on.

**To create a sequence in the Track View**

1. Do one of the following:
   + In O3DE Editor, choose **Tools**, **Track View**.
   + Press **T**.

1. To create a sequence, do one of the following:
   + Choose **Sequences**, **New Sequence**.
   + Click the **Add Sequence** icon ![Add track view sequence icon](/images/user-guide/cinematics/cinematics-track-view-simple-motion-component-2.png).

1. Enter a sequence name, such as *Example Sequence* and click **OK**.

1. In the **Entity Outliner**, a component entity appears with the same name as your sequence. This component entity has a **Sequence** component that stores your sequence data from the Track View.

![Sequence component entity in the Entity Outliner.](/images/user-guide/cinematics/track-view-editor-sequence-entity.png)

After you create a sequence, you can add properties to it. Any part of the sequence is considered a *node*. Nodes can be a reference to existing component entities or added to a sequence. For example, if you want to include an active camera for your sequence, you can add the **Director** node. Each node can have one or more tracks, depending your animation sequence. A *track* displays animation keys on a timeline in relation to the property that is animated on a node.

**To add a node to a sequence**

1. In the Track View, right-click the sequence or the node browser and select **Add *<Name\>* Node**.

1. Select the node to update its properties.

   For more information, see [Track View Editor Nodes](/docs/user-guide/visualization/cinematics/trackview-nodes/).

**Topics**
+ [Track View Editor Toolbars](/docs/user-guide/visualization/cinematics/track-view/editor-toolbars/)
+ [Track View Editor Nodes](/docs/user-guide/visualization/cinematics/trackview-nodes/)
+ [Adding and Removing Animation Keys on Tracks](/docs/user-guide/visualization/cinematics/adding-removing-animation-keys-on-tracks/)
+ [Controlling the Playhead](/docs/user-guide/visualization/cinematics/controlling-the-playhead/)
+ [Using Record Mode](/docs/user-guide/visualization/cinematics/using-record-mode/)
+ [Using Animation Curves](/docs/user-guide/visualization/cinematics/track-view/editor-animation-curves/)
