---
description: ' Create layers and groups programatically in Open 3D Engine. '
title: Creating Collision Layers and Groups Programmatically
weight: 350
---

{{< preview-migrated >}}

The API for collision layers and groups is defined in the [PhysX Gem API](/docs/api/gems/physx)

## Retrieving Layers and Groups

You can use the `layer(`*layer\_name*`)` and `group(`*group\_name*`)` methods to retrieve instances of collision layers and groups [that you created in O3DE Editor](/docs/user-guide/interactivity/physics/nvidia-physx/configuration-collision-groups.md). These methods perform a lookup of the definitions defined in the **PhysX Configuration** tool. If no collision layer is found that matches the name, the default layer \(`0`\) is returned.

```
CollisionLayer layer("MyLayer");
CollisionGroup group("MyGroup");
```

You can also use a bus to look up layers and groups, as in the following code:

```
CollisionLayer layer;
CollisionRequestBus::BroadcastResult(layer, &Physics::CollisionRequests::GetCollisionLayerByName, layerName);
CollisionGroup group;
CollisionRequestBus::BroadcastResult(group, &Physics::CollisionRequests::GetCollisionGroupByName, groupName);
```

## Creating Collision Groups in Code

Unlike the predefined collision groups that you create in O3DE Editor, you can use code to create collision groups at runtime. This is useful when you don't know the layers involved in advance at therefore must define a collision group at runtime.

The following example code creates a collision group at runtime that contains an `Enemy` layer and a `Tree` layer. This handles the situation in which the identity of the tree and the enemy are not known prior to the start of gameplay.

```
CollisionLayer layer1("Enemy"), layer2("Tree");
CollisionGroup group = AzFramework::Physics::CollisionGroup::None;
group.SetLayer(layer1, true);
group.SetLayer(layer2, true);
```

If all the layers required to construct the collision group are known at the same time, you can use overloaded operators, as in the following example:

```
CollisionGroup group = CollisionLayer("Layer1") | CollisionLayer("Layer2") | CollisionLayer("Layer3");
```
