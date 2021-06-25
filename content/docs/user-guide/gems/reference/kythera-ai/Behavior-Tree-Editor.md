---
linkTitle: BT Editor
title: Behavior Tree Editor
description: Overview of the Kythera AI Inspector's Behavior Tree editor tool
weight: 800
---
[Kythera AI Gem](index.md)

# Behavior Tree Editor

_**Note that currently the BT Editor is only supported in the Chrome browser.**_

Starting up
-----------

If you open the Kythera Inspector in your web browser and select the BT Editor tab, you should see a dialog like the following:

![](/images/user-guide/gems/kythera-ai/bt-editor-choose-bt.png)

_Note: if the list of existing trees does not appear, try refreshing your browser._

  

Select one of the existing trees, such as Idle, and you will see the BT editor view. 

![](/images/user-guide/gems/kythera-ai/bt-editor-show-bt.png)

In this view you can move, add and remove nodes, or select a node and edit its properties.

*   Nodes can be moved by simply clicking and dragging the node. However, it is not possible to move the root node (indicated by a crossed circle icon and harboring the name of the tree).
*   Nodes are added by finding the node you wish to add in the left menu (grouped into categories explained below, and alphabetized) then clicking and dragging that node into the tree view. Once a node has been added to the page, it can be connected as a child to a _FlowControl_ or _Conditional_ node by clicking and dragging from the bottom of the parent node, to the top of the new node.
*   Nodes can be removed from the tree by simply selecting the node and pressing the _delete_ key. It is not possible to delete the root node of the tree; if you wish to delete an entire tree, you can do so with the _File_ drop-down menu.
*   The properties of a node can be edited by selecting that node, then making changes to the dialog box that appears in the bottom right of the screen.

Your browser does not support the HTML5 video element

Navigating the Tree
-------------------

While in the BT editor, the tree view can be navigated fairly intuitively. The mouse scroll can be used to zoom in and out the tree view, and the view can be panned across by right-clicking and dragging somewhere on the backdrop.

Alongside the list of trees available, there are three buttons that can be used to navigate the tree. Working top-down:

*   ![](/images/user-guide/gems/kythera-ai/bt-editor-button-home.png)The first button will return the view to the root node.
*   ![](/images/user-guide/gems/kythera-ai/bt-editor-button-zoom.png)The second button will zoom the view out so that the entire tree is visible, allowing you to find the part you are interested in.
*   ![](/images/user-guide/gems/kythera-ai/bt-editor-button-view.png)The third and final button will cause the next **Click + Drag** to create a box that will become the new view, zooming in to encompass the selected area.

A recommended usage is to zoom the view out with the second button to find the part of the tree you are interested in, then use the third button to zoom in on that part.

Node Types
----------

There are four main types of nodes available in the behavior tree editor:

1.  **FlowControl -** As the name suggests, these nodes are used to control the flow of actions throughout the tree. These - along with _Conditional_ nodes - can have child nodes attached to them and depending on which _FlowControl_ you use, will execute them in a certain manner.
2.  **Conditional -** These nodes are used to decorate (be the parent of) another node and control whether or not that node is executed based on a conditional statement
3.  **Decorator -** This is a more general class of decorating nodes. These again are used to decorate another node (hence the name) but they are used to alter something about either the node's return value or another aspect of the game state. They can also be used to repeat the execution of the nodes below them until a certain condition is met.
4.  **Leaf -** These nodes cannot have children. They terminate the execution of a branch and perform some sort of function before returning.

For more information on the individual nodes, please see [this page](https://kythera.atlassian.net/wiki/spaces/KYTDOC/pages/180060187/Behavior+Tree+Nodes). 

Behavior Tree Validation
------------------------

The correctness of the full tree is re-calculated by the _Validator_ whenever a change is made to any part of the tree, including moving nodes around. This is because behavior trees are executed top to bottom (through connections), then left to right. That is to say, the children of each node are executed in the order they appear from left to right. If a node has not been properly configured it will appear red, and clicking on it will bring up a message about how to fix it.

![](/images/user-guide/gems/kythera-ai/bt-editor-validation.png)

  

Saving Behaviors
----------------

**Behaviors are automatically imported into the game and saved every time you make a change to them**, so there is no need to explicitly save them. It is important to be aware of this, because there is not currently an undo/revert feature in the editor (other than undoing the last action in a session), so you will need to make use of source control if you want to go back to a previous version.

If you plan to make significant changes to a tree but don't want to lose the current version, it is possible to duplicate a tree using the _File → Duplicate_ function.
