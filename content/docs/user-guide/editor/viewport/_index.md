---
description: ' Use the Viewport Interaction Model to interact with entities in the Open 3D Engine viewport.
  Learn about the differences between the new Viewport Interaction Model and the old interaction model. '
linktitle: Viewport Interaction Model
title: Working with the Viewport Interaction Model
---

The Viewport Interaction Model (VIM) allows users to interact with entities in the Open 3D Engine (O3DE) viewport. This feature provides selection, translation, rotation, and scale. With the Viewport Interaction Model, you can create custom reference spaces to transform your entities. With custom reference spaces, you can move your selected entities in relation to the reference that you specify. The Viewport Interaction Model also unifies entity and component manipulators so that you can interact with entities and components in the same way.

The Viewport Interaction Model provides the following benefits:

+ Improves the ability to select your preferred entity, especially for nested hierarchies or levels that have many entities.
+ Adds keyboard and mouse actions that you can apply to your selected entities. You can freely switch between local, parent, and world space to change your selected entities.
+ Establishes an editing pattern that matches that of Component Mode.

See the following concepts for the Viewport Interaction Model:

**Manipulator**

 With manipulators, you can edit component properties directly in the viewport instead of relying on **Entity Inspector**.

**Custom Reference Target**

When you select an entity, you can specify whether to move the entity in its own reference frame, or in relation to another custom reference frame.

## Viewport Interaction Model Limitations 

This feature has the following limitations:

+ Custom shortcuts for the Viewport Interaction Model are not supported.

**Topics**

+ [Modifying the Transform](/docs/user-guide/editor/viewport/viewport-interaction-model-transform/)
+ [Reference Space Model](/docs/user-guide/editor/viewport/viewport-interaction-model-reference-space-model/)
+ [Using Group Selections and Reference Spaces](/docs/user-guide/editor/viewport/group-selections-reference-spaces/)
+ [Resetting the Transform](/docs/user-guide/editor/viewport/reset-transform/)
+ [Matching the Transform](/docs/user-guide/editor/viewport/transform-matching/)
+ [Using Pivot Mode](/docs/user-guide/editor/viewport/pivot-mode/)
+ [Using the Camera Space](/docs/user-guide/editor/camera-space/)
