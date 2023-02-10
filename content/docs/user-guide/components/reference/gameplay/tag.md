---
linkTitle: Tag
title: Tag Component
description: Use the Tag component to apply labels to entities in Open 3D Engine (O3DE).
---

Use the **Tag** component to apply one or more labels, or *tags*, to an entity. Use these tags to find or filter entities with particular labels.

## Provider

[O3DE Core (LmbrCentral) Gem](/docs/user-guide/gems/reference/o3de-core)

## Tag properties

![Tag component properties](/images/user-guide/components/reference/gameplay/tag-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Tags** | An array of tags that are added to the entity. | Array: Tag | None |

## TagHelper

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetEntitiesbyTag` | Returns the array of entities with a specific tag. | Tag: Crc32 | Array: EntityIds | Yes |

## TagComponentRequestBus

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `AddTag` | Adds a tag to the entity. | Tag: Crc32 | None | Yes |
| `HasTag` | Returns `True` if the entity has a specific tag. | Tag: Crc32 | Boolean | Yes |
| `RemoveTag` | Removes a specific tag from the entity. | Tag: Crc32 | None | Yes |

## TagComponentNotificationsBus

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `OnTagAdded` | Notifies listeners when any tag is added to a specific entity. | Entity: EntityId | Tag: Crc32 | Yes |
| `OnTagRemoved` | Notifies listeners when any tag is removed from a specific entity. | Entity: EntityId | Tag: Crc32 | Yes |

## TagGlobalRequestBus

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `RequestTaggedEntities` | Returns the first entity to respond with a specific tag. | Tag: Crc32 | Tagged Entity: EntityId | Yes |

## TagGlobalNotificationBus

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `OnEntityTagAdded` | Notifies listeners when a specific tag is added to any entity. | Tag: Crc32 | Tagged Entity: EntityId | Yes |
| `OnEntityTagRemoved` | Notifies listeners when a specific tag is removed from any entity. | Tag: Crc32 | Untagged Entity: EntityId | Yes |

For more information, see [Working with the Event Bus (EBus) system](/docs/user-guide/programming/messaging/ebus/).
