---
linkTitle: Create Layers and Groups in Code
title: Creating Collision Layers and Groups Programmatically
description: ' Create layers and groups programmatically in Open 3D Engine. '
weight: 500
toc: true
---

## Retrieve layers and groups

You can retrieve instances of collision layers and groups [that you created in O3DE Editor](configuration-collision-groups) as shown below. These methods perform a lookup of the layers defined in the **PhysX Configuration** tool. If no collision layer is found that matches the name, the default layer \(`0`\) is returned.

```
CollisionLayer layer("MyLayer");
CollisionGroup group("MyGroup");
```

You can also use a request bus to look up layers and groups, as in the following code:

```
CollisionLayer layer;
CollisionRequestBus::BroadcastResult(layer, &Physics::CollisionRequests::GetCollisionLayerByName, layerName);
CollisionGroup group;
CollisionRequestBus::BroadcastResult(group, &Physics::CollisionRequests::GetCollisionGroupByName, groupName);
```

## Create layers and groups

You can create collision layers and groups in code at runtime. This is useful in scenarios where you might not be able to predefine collision layers and groups, such as projects that generate assets procedurally at runtime.

The following example code creates a collision group at runtime that contains an `Enemy` layer and a `Tree` layer.

```
CollisionLayer layer1("Enemy"), layer2("Tree");
CollisionGroup group = AzFramework::Physics::CollisionGroup::None;
group.SetLayer(layer1, true);
group.SetLayer(layer2, true);
```

If all the layers required to construct the collision group are known, you can use overloaded operators, as in the following example:

```
CollisionGroup group = CollisionLayer("Layer1") | CollisionLayer("Layer2") | CollisionLayer("Layer3");
```
