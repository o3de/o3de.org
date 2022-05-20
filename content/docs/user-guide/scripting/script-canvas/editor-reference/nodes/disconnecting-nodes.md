---
linktitle: Disconnecting Nodes
title: Disconnecting Nodes in Script Canvas
description: Learn how to disconnect Script Canvas nodes in Open 3D Engine.
weight: 150
---

Script Canvas offers several ways to delete connections between nodes.

**To delete a connection using the context menu**

1. Pause your pointer over the connection. The white line becomes a line of moving blue dashes.

1. Right-click the blue dashed line.

1. In the context menu, choose **Delete**.

**To delete a connection using the **Delete** key**

1. Pause your pointer over the connection. The white line becomes a line of moving blue dashes.

1. Left-click the blue dashed line.

1. Press **Delete**.

    {{< note >}}
You must left-click the blue dashed line before you press **Delete**.
    {{< /note >}}

**To delete connections by using the **Alt** key**

1. With the **Alt** key pressed, pause your pointer on the line. The line turns red.

1. Left-click the line.

**To delete a node's connections by "shaking" the node**

1. Using your pointer, select a connected node and move it with a shaking gesture to separate it from the other nodes. If the deleted node was connected to two other nodes, the remaining nodes connect to each other.
![Shaking nodes to disconnect them in the Script Canvas Editor.](/images/user-guide/scripting/script-canvas/nodes-disconnecting.gif)

1. You can make changes to this option in **Edit**, **Settings**, **Global Preferences**, **Shake to Desplice**.
