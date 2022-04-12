---
title: Entity Reference Component
linktitle: Entity Reference
description: 'Open 3D Engine (O3DE) Entity Reference component reference.'
toc: true
---

The **Entity Reference** component allows tracking one or more entity IDs that can be conveniently accessed through script or C++ code during editor mode.

## Provider ##

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)


## Properties

![Entity Reference Component UI](/images/user-guide/components/reference/atom/entity-reference-ui.png)

| Property | Description |
| - | - |
| **EntityIdReferences** | Contains a list of entities whose ids will be tracked |

## Usage ##

During editor mode, call the EntityReferenceRequestBus to retrieve the list of entity being referenced by the component.
This example uses the editor's python console to retrieve a list of entity ids.
```
# entityId contains the Entity Reference component.
entityIdReferences = azlmbr.entity.EntityReferenceRequestBus(azlmbr.bus.Event, 'GetEntityReferences', entityId)
 
for id in entityIdReferences:
    print(id.ToString())
 
 
# Expected Output: Entity IDs of the referenced entities.
# [3664549435643349363]
# [17340279414445478303]
```