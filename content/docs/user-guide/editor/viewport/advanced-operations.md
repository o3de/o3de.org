---
linkTitle: Advanced Operations
title: Advanced 3D Viewport Operations
description: Learn the advanced operations to manipulate entities in the 3D Viewport in Open 3D Engine (O3DE)
weight: 400
---

## Reset an entity's transform, rotation, or scale

You can reset the transform for an entity, so that you return the entity to a default location, rotation, and scale.

In the viewport, select an entity or group of entities and press **R**.

Note that the effect of the reset depends on the current manipulator mode. For example, if you are in the translation mode, the translation is reset for the selected entity or entities.  To reset the selected entity's scale, switch to the scale manipulator first.

![Modify entities and reset their transform in O3DE.](/images/user-guide/viewportinteractionmodel/viewport-selection-model-reset-transform-1.gif)

## Modifying manipulators

You can set manipulators to have a custom location, rotation, or scale.  

1. In the viewport, select an entity.

1. Select the transform mode of the manipulator you want to modify.

1. Press and hold **Ctrl**, and **left-click and drag** the manipulator to modify its location, rotation, or scale.

In the following example, the manipulator is moved away from the car, switches to rotate mode, and rotates the car.

![Move and rotate an entity using a manipulator in O3DE.](/images/user-guide/viewportinteractionmodel/viewport-selection-model-3.gif)

## Reset a manipulator's transform, rotation, or scale

You can reset a manipulator to its default location, rotation, or scale by pressing **Ctrl + R** while the related manipulator is active.

## Matching entity transforms

Instead of manually copying values from one entity's position to another, you can use the _ditto_ feature to share an entity's transform data from one entity to another. This feature enables you to duplicate the same transform data for your entities. For example, to make entities share the same rotation, you can select an entity and use the ditto feature to apply target entity's rotation to the selected entity.

1. In the viewport, select an entity.

1. Press and hold **Ctrl** and press the **middle mouse button** as you hover over a target entity. After the target is selected, the current selection transform matches that of the target.

   In the following example, the ditto feature shares an entity's rotation with another entity. This results in both entities sharing the same value.

   ![Share the transform data from one entity to another using the ditto feature in O3DE.](/images/user-guide/viewportinteractionmodel/viewport-selection-model-13.gif)

## Ditto a group selection 

You can use the ditto feature for a group of entities. This makes it easier for you to modify multiple entities at once.

1. In the viewport, select a group of entities.

1. Press and hold **Ctrl** and press the **middle mouse button** as you hover over a target entity to match the group's transform data to the target's data.

   In the following example, a group selection of tires use the ditto feature to match a target entity, the car.

   ![Share the transform data from multiple entities to another using the ditto feature in O3DE](/images/user-guide/viewportinteractionmodel/viewport-selection-model-14.gif)

## Ditto a group selection to local space 

You can ditto a group of entities using individual influence (**Alt**) so that you can modify entities in their own local space in relation to another entity.

1. In the viewport, select a group of entities.

1. Press and hold **Ctrl** and **Alt** and press the **middle mouse button** as you hover over a target entity. This sets the local space of each entity in the selected group to the target entity that you specified.

   In the following example, a group of entities use the ditto feature to set their local space transform to that of the target entity.

   ![Use the ditto feature to set the local space for a selection of entities to a target entity in O3DE.](/images/user-guide/viewportinteractionmodel/viewport-selection-model-15.gif)

