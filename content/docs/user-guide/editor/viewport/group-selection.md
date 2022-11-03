---
linkTitle: Group Selection
title: Group Selection
description: Select and manipulate groups of entities in the 3D Viewport in Open 3D Engine (O3DE).
weight: 300
---

In the viewport, you can select multiple entities. This is called a group selection. You can use the following shortcuts for group selection.

| Shortcut | Description |
| --- | --- |
| Click and drag in the viewport to create a box around entities. |  Selects multiple entities.  |
|  Press and hold **Ctrl** and click and drag in the viewport.  | Deselect multiple entities. |
|  Press and hold **Ctrl** and click a target entity.  |  Adds or removes an entity from the selection. If you already selected a group of entities, this moves the manipulator to the center of the selected group.  |

When you select a group of entities, the Viewport Interaction Model follows the same model as selecting a single entity. For a group selection, the manipulator acts like a temporary parent entity. This means that the feature works the same for a single entity or a group of entities. By default, a manipulator defaults to the common parent of the group selection. If you select entities that don't share a common parent, world space is used.

**To use group selections and reference spaces**

1. In the viewport, select multiple entities.

1. Press and hold **Ctrl** and click and drag the rotation manipulator.

1. Press **Shift** to change from custom to world space.

1. Use the manipulator to modify the entities.

In the following example, three entities are selected. Because there is no common parent of the group, the manipulator defaults to world space. The entities now move in relation to the parent (the manipulator).

![Manipulate a group of entities using world space in O3DE.](/images/user-guide/viewportinteractionmodel/viewport-selection-model-6.gif)

1. Press and hold **Ctrl** and **Alt** and click a target entity. This selects a reference space.

1. Use the manipulator to modify the entities.

   In the following example, a group of entities move in relation to the reference space.

   ![Move entities as a group in relation to the reference space in O3DE.](/images/shared/viewport-selection-model-7.gif)

1. Press and hold **Ctrl**, and move the manipulator in the viewport. This creates a custom reference space.

   In the following example, you can select a group of entities and move the manipulator in the viewport to create a custom reference space.

   ![Move a manipulator to create a custom reference space in O3DE.](/images/user-guide/viewportinteractionmodel/viewport-selection-model-8.gif)

1. Select child entities of the same parent entity and use the manipulator to change them. When you select a group of entities that share the same parent, the manipulator defaults its orientation to the parent.

   In the following example, two child entities (the tires) are selected. The manipulator rotates the child entities in relation to its parent (the car).

   ![Manipulate child entities from a parent entity in O3DE.](/images/user-guide/viewportinteractionmodel/viewport-selection-model-9.gif)

1. Press and hold **Alt** while modifying a group of selected entities. This modifies the entities in the local space (the manipulator influence is _individual_ rather than the default _group_). You can iterate and modify your entities and view the changes in the viewport.

   In the following example, you can press and hold **Alt** during translation. This moves each entity in their own local space (_individual_ manipulator influence).

   ![Modify each entity in their own local space during translation in O3DE.](/images/user-guide/viewportinteractionmodel/viewport-selection-model-10.gif)

1. Select child entities from different parent entities and press and hold **Alt**. You can modify multiple entities at the same time, even if they have different parents.

   In the following example, child entities from different parents are selected. The manipulator modifies the child entities at the same time.

   ![Modify child entities from different parents in O3DE.](/images/user-guide/viewportinteractionmodel/viewport-selection-model-11.gif)

1. Press and release **Alt** to dynamically change the manipulator influence.

   In the following example, the manipulator changes the scale for the selected entities, switching from group influence to individual influence.

   ![Switch group influence to individual influence while modifying entities in O3DE.](/images/user-guide/viewportinteractionmodel/viewport-selection-model-12.gif)
