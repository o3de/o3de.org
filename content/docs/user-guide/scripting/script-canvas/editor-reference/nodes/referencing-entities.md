---
title: Referencing Entities
description: Learn how to reference entities as targets from Script Canvas nodes.
weight: 600
---

Nodes can contain an entity property. These properties tell the node which entity to affect. By default, many nodes reference **Self**, the entity that contains the [Script Canvas](/docs/user-guide/components/reference/scripting/script-canvas/) component that specifies the script that contains the node. Alternatively, you can reference a different entity other than Self.

## Referencing entities from a node

1. From the **Node Palette**, locate the node that you want to add to your script and drag it to the canvas.

1. In the node, position your pointer over the entity property and then click the target icon.

    ![Select and deselect entities for nodes in the Script Canvas Editor.](/images/user-guide/scripting/script-canvas/nodes-select-entity.png)

1. In the O3DE Editor viewport or the **Entity Outliner**, select the entity that you want to reference.

1. To clear the entity, position your pointer over the entity property and then click the **x** icon.

1. To reset a property back to self, right-click the entity property and choose **Reset Value**.
