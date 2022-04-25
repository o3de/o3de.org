---
title: Entity Reference Component
linktitle: Entity Reference
description: 'Open 3D Engine (O3DE) Entity Reference component reference.'
toc: true
---

The **Entity Reference** component allows you to track one or more entity IDs that you can conveniently access through script or C++ code during editor mode.

## Provider ##

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)


## Properties

![Entity Reference Component UI](/images/user-guide/components/reference/atom/entity-reference-ui.png)

| Property | Description |
| - | - |
| **EntityIdReferences** | Contains a list of entities whose IDs will be tracked. |

## Usage ##

During editor mode, call the `EntityReferenceRequestBus` to retrieve the list of entities being referenced by the component.
This example uses the O3DE's Python Console to retrieve a list of entity IDs.
```python
# entityId contains the Entity Reference component.
entityIdReferences = azlmbr.entity.EntityReferenceRequestBus(azlmbr.bus.Event, 'GetEntityReferences', entityId)
 
for id in entityIdReferences:
    print(id.ToString())
 
 
# Expected Output: Entity IDs of the referenced entities.
# [3664549435643349363]
# [17340279414445478303]
```
