---
description: ' Reference external anim graphs to streamline node-based animation in
  Open 3D Engine. '
title: Referencing External Anim Graphs
---

A node-based animation system that has thousands of nodes can be difficult to manage. O3DE's **EMotion FX Animation Editor** uses hierarchical nodes that help alleviate this problem, but universal-level changes to game logic can still be challenging.

**Animation Editor** reference nodes solve this by offering references to external animation graph (anim graph) files. This helps reduce the scale and complexity of anim graphs and minimize human error. Reference nodes behave as the root state machine of the anim graphs that they reference and always output one pose.

## Benefits

Referencing anim graphs provide the following benefits:
+ **Sharing anim graph pieces or snippets**- You can create anim graph pieces or snippets that can be shared in multiple other anim graphs. For example, you might build a locomotion anim graph part to share across all characters while individualizing the rest. When you use referencing, you don't need to copy and paste the same anim graph every time that you use it.
+ **Ease of maintenance** - You can maintain a shared anim graph in one place. If you copy and paste anim graphs, each copy must be maintained separately.

    {{< note >}}
Because a change in a referenced anim graph can break the behavior of another, it is important to keep track of your referencing hierarchy. For more information, see [Best Practices for Using Referenced Anim Graphs](#character-animation-editor-anim-graph-reference-best-practices).
{{< /note >}}

+ **Greater ease of collaboration** - By clearly separating anim graphs, multiple people can develop animation for different characters simultaneously.

## Using External Anim Graphs

This section shows you how to create reference nodes in the **Animation Editor**, assign external anim graphs to them, and view and manage referenced graphs.

**To create a reference to an external anim graph**

1. In the **Animation Editor**, do one of the following:

    + **Right-click** the **Anim Graph** grid and choose **Create Node**, **Sources**, **Reference**.

        ![Create a reference node from the Anim Graph grid.](/images/user-guide/actor-animation/char-animation-editor-anim-graph-ref-1.png)

    + Click the **Anim Graph Palette** tab. From **Sources**, drag and drop the **Reference** node to the grid.

        ![Drag a reference node from the Anim Graph Palette to the Anim Graph grid.](/images/user-guide/actor-animation/char-animation-editor-anim-graph-ref-2.png)

        The new reference node appears in purple in the **Anim Graph** grid.

        ![A new reference node in the Anim Graph grid.](/images/user-guide/actor-animation/char-animation-editor-anim-graph-ref-3.png)

1. Select the **Reference** node. The node color changes to orange when it is selected.

    ![Click a reference node to see its attributes.](/images/user-guide/actor-animation/char-animation-editor-anim-graph-ref-4.png)

    The **Reference** section of the **Attributes** tab shows the attributes for the reference node.

1. On the **Attributes** tab, for **Anim graph**, click the (**...**) icon.

    ![Click to browse to an external anim graph for the reference node.](/images/user-guide/actor-animation/char-animation-editor-anim-graph-ref-5.png)

1. In the **Pick EMotion FX Anim Graph** dialog box, select the `.animgraph` file that you want to assign to the reference node, and then click **OK**.

    ![Choose the anim graph to assign to the reference node.](/images/user-guide/actor-animation/char-animation-editor-anim-graph-ref-6.png)

1. In the **Anim Graph** grid, **double-click** the reference node to see the nodes that the referenced anim graph contains.

    ![Double-click the Reference node.](/images/user-guide/actor-animation/char-animation-editor-anim-graph-ref-7.png)

1. Continue **double-clicking** nodes to drill down into the nodes underneath. In this example, the referenced anim graph contains a **StateMachine** node, and the **StateMachine** node contains an **EntryNode** and an **ExitNode**.

    ![Double-click the next node.](/images/user-guide/actor-animation/char-animation-editor-anim-graph-ref-8.png)

    When you view a referenced anim graph in this way, the referenced anim graph is read-only.

    ![Referenced anim graphs in the Animation Editor are read-only.](/images/user-guide/actor-animation/char-animation-editor-anim-graph-ref-9.png)

1. The display above the grid shows your current location in the node hierarchy. To go back to a previous node, click the node name.

    ![Click a node name to see the node in the Anim Graph grid.](/images/user-guide/actor-animation/char-animation-editor-anim-graph-ref-10.png)

1. On the upper right of the **Anim Graph** grid, click the navigation page icon.

    ![Click the Toggle Navigation Pane icon.](/images/user-guide/actor-animation/char-animation-editor-anim-graph-ref-11.png)

    The navigation pane opens up on the right side of the grid to show the hierarchy of nodes. The navigation pane displays all loaded anim graphs. The name of the current node is bold. The color of each node indicates its type. For example, the entry nodes are green and the exit nodes are red.

    ![The navigation pane showing the node hierarchy](/images/user-guide/actor-animation/char-animation-editor-anim-graph-ref-12.png)

1. To edit an external anim graph, **right-click** the reference node that you assigned it to and choose **Open '***filename***.animgraph' file**. The changes that you make to the external anim graph are reflected in all anim graphs that reference it.

    ![Right-clicking a reference node to edit the anim graph that is assigned to it.](/images/user-guide/actor-animation/char-animation-editor-anim-graph-ref-13.png)

## Best Practices for Using Referenced Anim Graphs

See the following best practices for using referenced anim graphs:
+ **Keep track of your referencing hierarchy** - One way to keep track of your referencing hierarchy is by maintaining a chart of your anim graphs and their references. Such a chart can help developers and testers know which anim graphs are affected by changes that are made. A chart can also help you know if an anim graph that you are working on is referenced by another anim graph.
+ **Directory hierarchy** - Make your anim graph directory and file hierarchy the same as your referencing hierarchy. For example, anim graphs in directories higher up in the hierarchy use or reference anim graph assets deeper down the hierarchy, but not vice versa.
+ **Minimize parameter count** - Keep the number of parameters in your referenced anim graphs minimal. Using many parameters increases complexity.
+ **Manage motion sets effectively** - To manage motion sets when you use referencing anim graphs, consider the following options:
  + Manage separate motion sets. Each motion set contains the motions for one anim graph.
  + Create one large motion set for a leader anim graph. This motion set would hold motions for the leader anim graph and for all motions used in any of the referenced anim graphs.
  
    {{< note >}}
Both options allow the referenced anim graph to be tested by itself.
{{< /note >}}

### Tips for Working with Referenced Anim Graphs

Avoid the following practices when you work with referenced anim graphs:
+ **Changing an anim graph that is referenced by another** - Changing an anim graph that is referenced by another anim graph can break its behavior. For example, if you remove a parameter from the referenced anim graph that another anim graph uses, the parameter reverts to its default value. This can cause unexpected behavior.
+ **Renaming, moving, or deleting an anim graph** - When you rename, move, or delete an anim graph, its asset ID changes. Therefore, all anim graphs that refer to the renamed, moved, or deleted anim graph must also be updated. Having a system that keeps track of your referencing hierarchy (as mentioned in [Best Practices](#character-animation-editor-anim-graph-reference-best-practices)) makes it easy to know which anim graphs are affected and which to update.
