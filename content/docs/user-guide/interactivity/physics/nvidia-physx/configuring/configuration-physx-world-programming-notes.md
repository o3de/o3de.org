---
description: ' Programming notes for PhysX worlds in Open 3D Engine. '
title: PhysX World Programming Notes
weight: 500
---

{{< preview-migrated >}}

For physics objects to be simulated, they must exist inside a world\. Multiple worlds can have uses like the following:
+ To simulate the result of an action in the first world\. For example, the second world might show what a tower of blocks might look like five seconds from now if it were knocked over in the first world\.
+ To simulate a subset of objects that you don't want to interact with the rest of the world\. For example, you could simulate the movement of objects attached to a player's belt\.
+ To overcome hardware or software limits on a single large world\. By tiling the single world into multiple smaller worlds and moving objects among them, you can create the illusion of a single large world\.

## World ID

Every world created in the PhysX gem is addressable by an ID of type `AZ::Crc32`\. Use this ID to address the `WorldRequestBus`\.

If you have a single world in your game, you can use `BroadcastResult` to invoke `WorldRequestBus`, as in the following example:

```
// Single world setup
RayCastHit choose;
WorldRequestBus::BroadcastResult(choose, &WorldRequests::RayCast, request);
```

If you have a multi\-world game, use `EventResult` and pass in the world ID, as in the following example:

```
// Multiple world setup
RayCastHit choose;
WorldRequestBus::EventResult(choose, AZ_CRC("AZPhysicalWorld"), &WorldRequests::RayCast, request);
```

**Note**
If your game creates multiple worlds, it must manage the objects that are added into those worlds\.

## Step Constants

You can configure step constants for `Physics::WorldSettings` when `PhysXWorld` is created\. For more information, see [World Configuration](/docs/userguide/nvidia/physx/configuration-global#physx-configuration-global-world)\.
