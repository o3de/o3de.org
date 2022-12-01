---
linkTitle:  Reference Spaces
title: Reference Spaces
description: Create reference spaces to modify your entities in Open 3D Engine (O3DE).
weight: 200
---

You can use the Viewport Interaction Model to create reference spaces for your selected entities. This enables you to customize your selected entities in relation to a reference space.

When working with reference spaces, remember the following rules:
+ New selections always default to the local space.
+ Holding **Shift** aligns the manipulator to the world coordinate space.
+ Holding **Alt** changes the manipulator to have _individual_ influence, as opposed to the default _group_ influence.
+ You can access custom reference spaces by moving the manipulator (press and hold **Ctrl** and then choose and drag the manipulator) or picking a target entity as a reference space (press hold **Ctrl** and **Alt** and click a target entity).

The Viewport Interaction Model simplifies the mental model for you by not requiring you to manually track the last local or world space that you were using. You can specify a target and define that target as custom reference spaces. This new reference space model covers any arbitrary transformation.

## Switching Between Local and World Space 

You can use the manipulator to switch between local and world space without losing focus of your entity selection in the viewport.

**To switch between local and world space**

1. In the viewport, select a child entity that has a parent.

1. Use the manipulator to modify the entity.

1. To switch to world space, press and hold **Shift**. Use the manipulator to modify the entity.

1. Viewport UI icons ({{< icon "world.svg" >}} World, {{< icon "parent.svg" >}} Parent, and {{< icon "local.svg" >}} Local) in the top right of the viewport allow you to pin a reference space.

    ![Switch between local and parent space in the viewport in O3DE.](/images/user-guide/viewportinteractionmodel/viewport-selection-model-1.gif)

## Creating custom reference spaces

You can adjust the manipulator independent of the entity to create a custom reference space. You can also pick another target entity as a reference space. When you specify a reference space, the entities that you select move in relation to that space.

1. In the viewport, select an entity.

1. Select a manipulator mode, such as translation.

1. Press and hold **Ctrl** and **Alt** and **left-click** a target entity in the viewport. This matches the manipulator to the translation or orientation of the target entity.

    In the following example, the excavator entity becomes a reference space for the car. When the manipulator moves the car, the car moves in relation to the reference space.

    ![Create a custom reference using another entity as a target in O3DE.](/images/user-guide/viewportinteractionmodel/viewport-selection-model-4.gif)

1. Use the manipulator to modify the entity.

{{< note >}}
The manipulator and the custom reference space are context-based and apply only when you select an entity. If you don't select an entity, there's no manipulator, and you can't create a reference space. The reference space doesn't persist across selections. However, if you move the reference space, you can undo that action.
{{< /note >}}
