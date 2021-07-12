---
description: ' Use the Viewport Interaction Model to interact with entities in the Open 3D Engine viewport.
  Learn about the differences between the new Viewport Interaction Model and the old interaction model. '
linktitle: Viewport interaction model
title: Working with the Viewport Interaction Model
---

{{< preview-migrated >}}

The new Viewport Interaction Model replaces the old interaction model in the viewport. This feature combines free and local selection so that you can more easily select, move, and modify entities in the viewport. With the Viewport Interaction Model, you can create custom reference spaces to move your entities. With custom reference spaces, you can move your selected entities in relation to the reference that you specified. The Viewport Interaction Model also unifies entity and component manipulators so that you can interact with entities and components in the same way.

The Viewport Interaction Model provides the following benefits:
+ Improves the ability to select your preferred entity, especially for nested hierarchies or levels that have many entities.
+ Prevents you from accidentally deselecting an entity. The entity that you select is locked for editing.
+ Adds keyboard and mouse actions that you can apply to your selected entities. For example, you can freely switch between local, parent, and world space to make changes to your selected entities.
+ Establishes an editing pattern that matches the Component Mode feature.

See the following concepts for the Viewport Interaction Model:

**Manipulator**
With manipulators, you can edit component properties directly in the viewport instead of the **Entity Inspector**.

**Custom Reference Target**
When you select an entity, you can specify whether to move that entity in relation to another entity.

## Viewport Interaction Model Limitations 

This feature has the following limitations:
+ The Viewport Interaction Model supports component entities only and doesn't support legacy entities, such as terrain and vegetation.
+ When you enable the Viewport Interaction Model, this feature removes some toolbar options in the O3DE Editor Interface, such as vertex snapping.
+ You can't change or customize shortcuts for the Viewport Interaction Model.

**Topics**

+ [Modifying the Transform](/docs/user-guide/editor/viewport/viewport-interaction-model-transform.md)
+ [Reference Space Model](/docs/user-guide/editor/viewport/viewport-interaction-model-reference-space-model.md)
+ [Using Group Selections and Reference Spaces](/docs/user-guide/editor/viewport/group-selections-reference-spaces.md)
+ [Resetting the Transform](/docs/user-guide/editor/viewport/reset-transform.md)
+ [Matching the Transform](/docs/user-guide/editor/viewport/transform-matching.md)
+ [Using Pivot Mode](/docs/user-guide/editor/viewport/pivot-mode.md)
+ [Using the Camera Space](/docs/user-guide/editor/camera-space.md)
