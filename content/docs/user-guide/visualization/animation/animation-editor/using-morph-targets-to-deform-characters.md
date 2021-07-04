---
description: ' Use morph targets to deform characters in the Open 3D Engine Animation Editor
  . '
title: Using Morph Targets to Deform Characters
---

{{< preview-migrated >}}

A morph target is a deformed mesh that is stored as a series of vertex positions. Morph targets are also called blend shapes or vertex\-level deformations. You can use morph targets to deform a character's face to animate facial expressions or a character's body part to correct undesired deformation of skinning. You can also simulate deformation of clothing on a character.

In the **Animation Editor**, you can use morph targets with one of the following nodes:
+ **Motion** node - Plays morph target animations similarly as skeletal animations.
+ **Morph Target** node - Animates morph targets by changing the weight at runtime.

## Prerequisites 

To use morph targets in the **Animation Editor**, you must do the following:
+ Prepare your asset for `.fbx` export. For more information, see [Customize FBX asset export with FBX Settings](/docs/user-guide/assets/fbx-settings/).
+ Create and animate morph targets on your character in your DCC tool (for example, Maya).
+ Export the character as an `.fbx` file.

**Topics**
+ [Prerequisites](#animation-editor-morph-targets-prerequisites)
+ [Importing Morph Targets](#animation-editor-importing-morph-targets)
+ [Opening Actor Files](#animation-editor-opening-actor-files)
+ [Previewing Morph Targets on Actors](#animation-editor-previewing-morph-targets-on-actors)
+ [Creating Motion Nodes with Morph Targets](#animation-editor-creating-motion-nodes-with-morph-targets)
+ [Creating Morph Target Nodes](#animation-editor-creating-morph-target-nodes)

## Importing Morph Targets 

When you import an `.fbx` file into O3DE, all morph targets and morph target motions in that file are imported as part of the actor. This allows you to open your actor file in the **Animation Editor** without additional steps.

You can also change how morph targets are imported.

**To change how morph targets are imported**

1. In the **Asset Browser**, right\-click your `.fbx` file and choose **Edit Settings**.
![\[Choose the Edit Settings option for your .fbx file in the Asset Browser.\]](/images/user-guide/actor-animation/asset-browser-fbx-file-edit-settings.png)

1. In the **FBX Settings** window, click the **Actors** tab.

   A modifier appears to indicate that morph targets will be imported.

1. Click the button next to the **Select morph targets** field.
![\[Click the Select morph targets button on the Actors tab in the FBX Settings window.\]](/images/user-guide/actor-animation/fbx-settings-select-morph-targets-button.png)

1. In the **Select nodes** window, select the morph targets that you want to import, and then click **Select**.
![\[Select the morph targets to import in the Select nodes window.\]](/images/user-guide/actor-animation/morph-targets-select-nodes-window.png)

1. In the **FBX Settings** window, click **Update** to save your changes.

**To change how morph target motions are imported**

1. In the **Asset Browser**, right\-click your `.fbx` file and choose **Edit Settings**.

1. In the **FBX Settings** window, click the **Motions** tab.
**Note**
If you have morph target animations in your `.fbx` file, a modifier appears to indicate that morph target motions will be imported. You can remove the modifier if you do not want the morph target motions in your `.motion` file.
![\[Motions tab in the FBX Settings window.\]](/images/user-guide/actor-animation/fbx-settings-motions-tab.png)

1. Click **Update** to save your changes.

## Opening Actor Files 

When you open your actor file in the **Animation Editor**, all morph targets and morph target motions are imported by default. To change how morph targets are imported, see [Importing Morph Targets](#animation-editor-importing-morph-targets).

**To open an actor file**

1. In O3DE Editor, choose **Tools**, **Animation Editor**.

1. In the **Animation Editor**, choose **File**, **Open Actor**.

1. In the **Pick EMotion FX Actor** window, select an actor to import and then click **OK**.
![\[Choose an actor to import in the Pick EMotion FX Actor window.\]](/images/user-guide/actor-animation/animation-editor-pick-emotionfx-actor-dialog-box.png)

## Previewing Morph Targets on Actors 

You can preview the morph targets on an actor.

**To preview morph targets**

1. In O3DE Editor, choose **Tools**, **Animation Editor**.

1. In the **Animation Editor**, choose **View**, **Morph Targets**.

1. In the **Morph Targets** window, preview morph target shapes on your actor by doing the following:

   1. Select the **Select All** check box.

      If enabled, the morph target sliders will override the morph target motions on your actor.

   1. Move the sliders next to the morph target name to see the actor's mesh deform.
![\[Preview morph target shapes on your actor in the Morph Targets window.\]](/images/user-guide/actor-animation/animation-editor-morph-targets-window-example-2.gif)

   1. Click **Edit** next to the morph target to adjust the range of the slider as needed. The default range is `0` to `1`.
![\[Adjust the minimum and maximum value range for the morph target.\]](/images/user-guide/actor-animation/edit-morph-target-window.png)

1. When you're done previewing the morph targets, clear the **Select All** check box and close the **Morph Targets** window.

## Creating Motion Nodes with Morph Targets 

Creating a motion node with morph targets is similar to other methods of motion node generation.

**To create a motion node with morph targets**

1. In the **Animation Editor**, on the **Motion Sets** tab, under **Motion Set Management**, do one of the following:
   + Click the **+** icon to create a motion set.
   + Click the folder icon to open the **Pick EMotion FX Motion Set** window and select a motion set to import. Click **OK**.
![\[Choose a motion set to import in the Pick EMotion FX Motion Set window.\]](/images/user-guide/actor-animation/animation-editor-pick-emotionfx-motion-set-dialog-box.png)

1. In the **Anim Graphs** pane, click the **+** icon to create an animation graph.
![\[Create an animation graph in the Anim Graphs pane.\]](/images/user-guide/actor-animation/anim-graphs-resource-management-new-animation-graph.png)

1. Drag the **Motion** node from the **Sources** tab in the **Anim Graph Palette** to the animation graph.
![\[Drag the Motion node to the animation graph.\]](/images/user-guide/actor-animation/anim-graph-motion-node-example.gif)

1. In the animation graph, select the **Motion** node that you added.
![\[Anim Graph tab in the middle pane of the Animation Editor.\]](/images/user-guide/actor-animation/anim-graph-motion-node-selected.png)

1. In the **Attributes** pane, click **Select motions**.
![\[Select motions button in the Attributes pane of the Animation Editor.\]](/images/user-guide/actor-animation/attributes-pane-select-motions-button.png)

1. In the **Motion Selection** window, select the motion with the morph targets that you want to import and then click **OK**.

## Creating Morph Target Nodes 

As an alternative to creating a motion node with morph targets, you can use a **Morph Target** node to directly animate morph targets in the animation graph.

**To create a morph target node**

1. In the **Animation Editor**, drag the **Blend Tree** node from the **Sources** tab in the **Anim Graph Palette** to the animation graph.

1. In the animation graph, double\-click the **Blend Tree** node. You should see a **Final Node** node and additional nodes in the **Anim Graph Palette**.
![\[Blend Tree node and additional nodes in the Anim Graph Palette.\]](/images/user-guide/actor-animation/anim-graph-blendtree-node-finalnode.png)

1. Drag the **Morph Target** node from the **Blending** tab in the **Anim Graph Palette** to the animation graph.

1. Do the following to add a bind pose to use as an input pose:

   1. Drag the **Bind Pose** node from the **Sources** tab in the **Anim Graph Palette** to the animation graph.

   1. Connect the **Output Pose** for the **Bind Pose** node to the **Input Pose** for the **Morph Target** node.

1. Do the following to add a parameter to control the weight of the morph target:

   1. Drag the **Parameters** node from the **Sources** tab in the **Anim Graph Palette** to the animation graph.

   1. In the **Parameters** pane, click the **+** icon to create a parameter.
![\[Parameters pane in the Animation Editor.\]](/images/user-guide/actor-animation/anim-graph-parameters-pane.png)

   1. In the **Create Parameter** window, do the following:

      1. For **Value Type**, select **FloatSlider**.

      1. For **Minimum** and **Maximum**, use the default values.

      1. Click **Create**.
![\[Create Parameter window in the Animation Editor.\]](/images/user-guide/actor-animation/anim-graph-create-parameter-dialog-box.png)

   1. In the animation graph, do the following:

      1. Connect the **Parameter** for the **Parameter** node to the **Morph Weight** for the **Morph Target** node.

      1. Connect the **Output Pose** for the **Morph Target** node to the **Input Pose** for the **Final Node** node.
![\[Example animation graph that shows the connection between the Parameter node, Morph Target node, and Final Node node.\]](/images/user-guide/actor-animation/anim-graph-parameters-morph-target-connection.png)

1. In the animation graph, select the **Morph Target** node if it's not already selected.

1. In the **Attributes** pane, click **select morph targets**.
![\[Click the select morph targets button in the Attributes pane.\]](/images/user-guide/actor-animation/attributes-pane-select-morph-targets-button.png)

1. In the **Morph target selection** window, select the morph target that you want to import and then click **OK**.
![\[Morph target selection window to import a morph target.\]](/images/user-guide/actor-animation/morph-target-selection-window.png)

   The morph target is updated in the **Morph Target** node in the animation graph and in the **Attributes** pane.
![\[Morph target updated in the Morph Target node and Attributes pane.\]](/images/user-guide/actor-animation/animation-graph-attributes-pane-morph-target-set.png)

1. In the **Anim Graphs** pane, activate the animation graph by double\-clicking the name.

1. In the **Parameters** pane, move the slider to play the animation.
![\[Move the parameter slider to play the morph target animation.\]](/images/user-guide/actor-animation/morph-target-animation-parameter-slider.gif)
