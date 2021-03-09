---
description: ' Reference entities as targets from Script Canvas nodes. '
title: Setting Entity Targets
---

{{< preview-migrated >}}

Nodes can contain an entity property\. These properties tell the node which entity to affect\. By default, many nodes reference **Self**, the entity to which the **[Script Canvas](/docs/user-guide/components/script-canvas.md)** component attaches the current script\. You can reference a specific entity other than self\.

**To reference entities for a node**

1. From the **Node Palette**, locate the node that you want to add to your script and drag it to the canvas\.

1. In the node, position your pointer over the entity property and then click the target icon\.
![\[Select and deselect entities for nodes in the Script Canvas editor.\]](/images/user-guide/scripting/script-canvas/script-canvas-node-select-entity.png)

1. In the O3DE Editor viewport or the **Entity Outliner**, select the entity that you want to reference\.

1. To clear the entity, position your pointer over the entity property and then click the **x** icon\.

1. To reset a property back to self, right\-double\-click the entity property and choose **Set to Self**\.
