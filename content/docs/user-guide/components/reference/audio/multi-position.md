---
linkTitle: Multi-Position Audio
title: Multi-Position Audio Component
description: Use the Multi-Position Audio component to play sounds at multiple locations in Open 3D Engine.
toc: true
---

The Audio Multi-Position Component helps to create sounds that emanate
from multiple locations. For example a sound that covers an area, like
a river, should use this component. Any sounds that have multiple
instances should also use this component, as it does help to reduce
resources.

## Editor

![The Multi-Position Audio component pane in the O3DE Editor.](/images/user-guide/component/audio/multi-position-component.png)

## Properties

| Name | Description | Default |
|------|-------------|---------|
| Entity References | a list of entities whose world positions will be used as the sound's multiple positions. | `<Empty>` |
| Behavior Type | A drop-down selection, the options are 'Separate' or 'Blended'. Separate means that the sound positions will be treated as if they were individual point source sounds. Blended means the positions will be treated as if they are one sound covering an area. | Separate |

## EBuses

### Request Bus Interface

| | |
|--|--|
| Name | `AddEntity` |
| Description | Adds an Entity to the list, whose position will be used in the multi-position audio. |
| Parameters | `entityId EntityId` |
| Return | None|
| Scriptable | Yes |

| | |
|--|--|
| Name | `RemoveEntity` |
| Description | Removes an Entity from the list, and its position will be removed from the multi-position audio. |
| Parameters | `entityId EntityId` |
| Return | None|
| Scriptable | Yes |

| | |
|--|--|
| Name | `SetBehaviorType` |
| Description | Sets the Behavior Type of the  multi-position audio to either be `Blended` or `Separate`. |
| Parameters | `Audio::MultipositionBehaviorType enum` |
| Return | None |
| Scriptable | Yes |
| Lua enum bindings | `MultiPositionBehaviorType_Separate`, `MultiPositionBehaviorType_Blended` |
