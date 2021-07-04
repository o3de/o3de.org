---
description: ' Add component entities in the <guilabel>Track View</guilabel> editor in Open 3D Engine. '
title: Adding Component Entities
---

{{< preview-migrated >}}

In the Track View, sequences determine what to animate based on what you add to the sequence. For example, if you want to animate an entity with an **Actor** or **Light** component, you can add that component entity to a sequence and then modify its properties.

**To add a component entity to a sequence**

1. In the viewport or the **Entity Outliner**, select the entity.

1. In the Track View, select or create the sequence that you want.

1. Do one of the following:
   + In the node browser, right-click and choose **Add Selected Entity**.
   + On the **Sequence/Node** toolbar, click the **Add Selected Entity** icon.
![\[Add a component entity to a sequence.\]](/images/user-guide/cinematics/cinematics-track-view-editor-adding-a-component-entity.png)

All component entities have the **Transform** component. This means you can animate the **Position** and **Rotation** properties for each component entity that is part of the sequence as needed.

If there are other components attached to the entity, those may also appear in the sequence. However, some components are not available for animating in the Track View.

For components that are available, you can right-click them to see what additional tracks can be added to the sequence. Some component properties can't be added as a track in a sequence and can't be animated.

For more information, see [Component Entities and Component Nodes](/docs/user-guide/visualization/cinematics/track-view/nodes-component-entity.md).

See the following topics for working with common component entities in a sequence.

**Topics**
+ [Adding Lighting](/docs/user-guide/visualization/cinematics/adding-lighting-to-scenes.md)
+ [Adding a Camera](/docs/user-guide/visualization/cinematics/cameras-intro.md)
