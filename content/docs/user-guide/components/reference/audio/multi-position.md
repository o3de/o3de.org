---
linkTitle: Multi-Position Audio
title: Multi-Position Audio Component
description: Use the Multi-Position Audio component to play sounds at multiple locations in Open 3D Engine.
toc: true
---

The Multi-Position Audio Component helps to create sounds that emanate
from multiple locations. For example a sound that covers an area, like
a river, should use this component. Any sounds that have multiple
instances should also use this component, as it does help to reduce
resources.

![The Multi-Position Audio component pane in the O3DE Editor.](/images/user-guide/component/audio/multi-position-component.png)

## Multi-Position Audio Properties

| Name | Description | Default |
|------|-------------|---------|
| Entity References | A list of entities whose world positions will be used as the sound's multiple positions. | `<Empty>` |
| Behavior Type | A drop-down selection, the options are 'Separate' or 'Blended'. Separate means that the sound positions will be treated as if they were individual point source sounds. Blended means the positions will be treated as if they are one sound covering an area. | Separate |

## EBus Request Bus Interface

Use the following request functions with the EBus interface to communicate with other components of your game.

For more information about using the Event Bus (EBus) interface, see [Working with the Event Bus (EBus) system](/docs/user-guide/programming/messaging/ebus/).

| Name | Description | Parameters | Return | Scriptable | Lua enum bindings |
|------|-------------|------------|--------|------------|-------------------|
| AddEntity | Adds an Entity to the list, whose position will be used in the multi-position audio. | `entityId` - EntityId | None | Yes | `N/A` |
| RemoveEntity | Removes an Entity from the list, and its position will be removed from the multi-position audio. | `entityId` - EntityId | None | Yes | `N/A` |
| SetBehaviorType | Sets the Behavior Type of the  multi-position audio to either be `Blended` or `Separate`. | `Audio::MultipositionBehaviorType` - enum | None | Yes | `MultiPositionBehaviorType_Separate`, `MultiPositionBehaviorType_Blended` |
