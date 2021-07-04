---
linkTitle: BT Editor
title: Behavior Tree Editor
description: Overview of the Kythera AI Inspector's Behavior Tree editor tool
weight: 800
toc: true
---

You can create behavior trees (BTs) for Kythera agents in **BT Editor**, Kythera's node based behavior tree editor.

Open the Kythera **Inspector** in your web browser and select the BT Editor tab. The following dialog is displayed:

![BT editor](/images/user-guide/gems/kythera-ai/bt-editor-choose-bt.png)

{{< note >}}
The BT Editor is only supported in the Chrome browser. If the list of existing trees does not appear, refresh your browser.
{{< /note >}}

Select one of the existing trees, such as Idle, and you will see the BT editor view. 

![BT editor view](/images/user-guide/gems/kythera-ai/bt-editor-show-bt.png)

In this view you can move, add, and remove nodes, or select a node and edit its properties.

* Nodes can be moved by dragging the node. However, it is not possible to move the root node, which is indicated by a crossed circle icon and contains the name of the behavior tree.

* Nodes are added by finding the node you wish to add in the left menu and then dragging the node into the tree view. Once a node has been added to the page, it can be connected as a child to a **FlowControl** or **Conditional** node by dragging from the bottom of the parent node, to the top of the new node.

* Nodes can be removed from the tree by simply selecting the node and pressing the **Delete** key. It is not possible to delete the root node of the tree. If you wish to delete an entire tree, you can do so with the **File** drop-down menu.

* The properties of a node can be edited by selecting the node, and then making changes in the properties dialog box that appears in the bottom right of the screen.

## Navigating the tree

Navigating the BT Editor tree view is intuitive. Use the mouse scroll wheel to zoom the tree view. Click and drag the on the backdrop to pan the tree view.

Alongside the list of trees available, there are three buttons that can be used to navigate the tree. Working top-down:

* ![bt editor home button](/images/user-guide/gems/kythera-ai/bt-editor-button-home.png) The **Home** button returns the view to the root node.

* ![bt editor zoom button](/images/user-guide/gems/kythera-ai/bt-editor-button-zoom.png) The **Zoom** button frames the tree so that the entire tree is visible.

* ![bt editor view button](/images/user-guide/gems/kythera-ai/bt-editor-button-view.png) The **View** button allows you to **Drag** a selection box around an area to focus on, creating a view that encompasses the selected area.

It's recommended to use the **Zoom** button to find the area of the tree you are interested in, then use the **View** button to zoom in on that area.

## Node types

There are four main types of nodes available in the behavior tree editor:

* **FlowControl** nodes are used to control the flow of actions throughout the tree. These nodes, along with **Conditional** nodes, can have child nodes attached to them. Child nodes execute in a certain manner depending on which **FlowControl** you use.

* **Conditional** nodes are used to decorate (be the parent of) another node and control whether or not that node is executed based on a conditional statement

* **Decorator** nodes are a general class of decorating nodes and are used to alter something about the node's return value or another aspect of the game state. They can also be used to repeat the execution of the nodes below them until a certain condition is met.

* **Leaf** nodes cannot have children. They terminate the execution of a branch and perform some sort of function before returning.

## Behavior tree validation

The correctness of the full tree is re-calculated by the **Validator** whenever a change is made to any part of the tree, including moving nodes around. This is because behavior trees are executed top to bottom (through connections), then left to right. That is to say, the children of each node are executed in the order they appear from left to right. If a node has not been properly configured, it will appear red, and clicking on it will bring up a message about how to fix it.

![bt editor validation](/images/user-guide/gems/kythera-ai/bt-editor-validation.png)

## Saving behaviors

Behaviors are automatically imported into the game and saved every time you make a change to them. There is no need to explicitly save them. It is important to be aware of this, because there is not currently an undo/revert feature in the editor (other than undoing the last action in a session), so you will need to make use of source control if you want to go back to a previous version.

If you plan to make significant changes to a tree but don't want to lose the current version, it's possible to duplicate a tree using the **File > Duplicate** function.
