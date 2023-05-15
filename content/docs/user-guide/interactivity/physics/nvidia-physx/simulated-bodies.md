---
description: ' PhysX Simulated Bodies. '
title: PhysX Simulated Bodies
weight: 300
---

`AzPhysics::SimulatedBody` is a base type from which many PhysX components inherit:
+ **[PhysX Static Rigid Body](/docs/user-guide/components/reference/physx/static-rigid-body/)**
+ **[PhysX Dynamic Rigid Body](/docs/user-guide/components/reference/physx/rigid-body/)**
+ **[PhysX Character Controller](/docs/user-guide/components/reference/physx/character-controller/)**
+ **[PhysX Ragdoll](/docs/user-guide/components/reference/physx/ragdoll/)**

The interface for `AzPhysics::SimulatedBody` includes various common operations such as:
- Handling collision and trigger events
- Getting the Entity Id for the **Entity** to which the **Simulated Body** is attached
- Getting the **Entity** **Transform**
- Getting the **Entity** **AABB**
- Performing a raycast against a particular **Simulated Body**

This functionality is also exposed via the **SimulatedBodyComponentRequestsBus**.

## Raycast
A **Simulated Body** raycast query tests whether a line segment directed from a specified point along a specified direction intersects with the **Simulated Body** (and only that body). Only the closest hit (if any) will be returned. It is also possible to perform [PhysX Scene Queries](/docs/user-guide/interactivity/physics/nvidia-physx/scene-queries/) which query against all the physics geometry in a scene.

A raycast query is specified using an `AzPhysics::RayCastRequest`.

**RayCastRequest Properties**

| Property | Description |
| --- | --- |
|  `m_distance`  |  Maximum distance along the ray to test for intersections.  |
|  `m_start`  |  World space point where the ray starts.  |
|  `m_direction`  |  Direction to cast the ray. This vector must be normalised.  |
|  `m_hitFlags`  |  Flags used to request particular hit fields to be returned, or indicate which hit fields are valid in a return value.  |
|  `m_filterCallback`  |  This property is ignored by **Simulated Body** raycast queries.  |
|  `m_reportMultipleHits`  |  This property is ignored by **Simulated Body** raycast queries, as only the closest hit will be returned.  |
|  `m_maxResults`  |  This property is ignored by **Simulated Body** raycast queries, as only the closest hit will be returned.  |
|  `m_collisionGroup`  |  Specifies which layers to test against. Use this to test only against specific layers.  |
|  `m_queryType`  |  This property is ignored by **Simulated Body** raycast queries.  |

**Example (C++)**
```
AzPhysics::RayCastRequest request;
request.m_start = AZ::Vector3(-100.0f, 0.0f, 0.0f);
request.m_direction = AZ::Vector3(1.0f, 0.0f, 0.0f);
request.m_distance = 200.0f;

AzPhysics::SceneQueryHit hit;
AzPhysics::SimulatedBodyComponentRequestsBus::EventResult(hit, entityId, &AzPhysics::SimulatedBodyComponentRequests::RayCast, request);
```

**Example (Lua)**
```
request = RayCastRequest()
request.Start = Vector3(5.0, 0.0, 5.0)
request.Direction = Vector3(0.0, 0.0, -1.0)
request.Distance = 10.0
hit = SimulatedBodyComponentRequestBus.Event.RayCast(entityId, request)
```

**Script Canvas**

The **Raycast (Single Body)** node can be used in **Script Canvas** to perform **Simulated Body** raycast queries.