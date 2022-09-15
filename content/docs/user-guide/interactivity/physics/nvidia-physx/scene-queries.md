---
description: ' Create raycast and shape cast queries in Open 3D Engine. '
title: PhysX Scene Queries
weight: 300
---

You can use physics raycast queries to determine whether a specific line segment intersects physics geometry. Similarly a shapecast query (also known as a sweep) tests whether a shape extruded along a line segment intersects with physics geometry. Example uses for these queries might include determining whether an object is in front of another object, or testing a line of sight. Overlap queries are a third type of scene query, which determine whether a stationary shape intersects with other physics geometry. All these scene queries are performed on an `AzPhysics::SceneInterface` object and they all test against the entire scene. Note that as well as queries against entire scenes, it is also possible to perform a raycast against a single [**PhysX Simulated Body**](/docs/user-guide/interactivity/physics/nvidia-physx/simulated-bodies/#raycast).

Each type of scene query can be performed using an `AzPhysics::SceneQueryRequest` object (there are specializations of the request object for each of the three scene query types). As well as performing a single query, it is possible to collect a batch of queries into a single call using an `AzPhysics::SceneQueryRequests` object, which is a container for many queries. It is also possible to call the request either synchronously or asynchronously.

```
virtual SceneQueryHits QueryScene(SceneHandle sceneHandle, const SceneQueryRequest* request) = 0;
virtual SceneQueryHitsList QuerySceneBatch(SceneHandle sceneHandle, const SceneQueryRequests& requests) = 0;
[[nodiscard]] virtual bool QuerySceneAsync(SceneHandle sceneHandle, SceneQuery::AsyncRequestId requestId,
    const SceneQueryRequest* request, SceneQuery::AsyncCallback callback) = 0;
[[nodiscard]] virtual bool QuerySceneAsyncBatch(SceneHandle sceneHandle, SceneQuery::AsyncRequestId requestId,
    const SceneQueryRequests& requests, SceneQuery::AsyncBatchCallback callback) = 0;
```

The results of scene queries are described using containers of `AzPhysics::SceneQueryHit` objects.

{{< note >}}
Scene queries can have a performance cost.
{{< /note >}}

## Raycast

Raycast queries are the most common scene query, based on firing a ray from a start position a specified distance along a ray direction.

**Example**
The raycast query intersects the pentagon only.

![Raycast query example in PhysX world.](/images/user-guide/physx/physx-raycast-shape-cast-queries-2.png)

A raycast query is specified using an `AzPhysics::RayCastRequest`.

**RayCastRequest Properties**

| Property | Description |
| --- | --- |
|  `m_distance`  |  Maximum distance along the ray to test for intersections.  |
|  `m_start`  |  World space point where the ray starts.  |
|  `m_direction`  |  Direction to cast the ray. This vector must be normalized.  |
|  `m_hitFlags`  |  Flags used to request particular hit fields to be returned, or indicate which hit fields are valid in a return value.  |
|  `m_filterCallback`  |  Custom callback function provided by the game to filter out specific objects.  |
|  `m_reportMultipleHits`  |  Whether to return all hits along the query (up to `m_maxResults`) or only return the first hit.  |
|  `m_maxResults`  |  The maximum number of hits to return (limited by the [Global Configuration](/docs/user-guide/interactivity/physics/nvidia-physx/configuring/configuration-global/)).  |
|  `m_collisionGroup`  |  Specifies which layers to test against. Use this to test only against specific layers.  |
|  `m_queryType`  |  Include either static objects, dynamic objects, or both.  |

To perform a raycast query, use the `AzPhysics::SceneInterface`.

**Example (C++)**

```
auto* sceneInterface = AZ::Interface<AzPhysics::SceneInterface>::Get();

AzPhysics::RayCastRequest request;
request.m_start = AZ::Vector3(-100.0f, 0.0f, 0.0f);
request.m_direction = AZ::Vector3(1.0f, 0.0f, 0.0f);
request.m_distance = 200.0f;

AzPhysics::SceneQueryHits result = sceneInterface->QueryScene(AzPhysics::DefaultPhysicsSceneName, &request);
auto numHits = result.size();
```

**Example (Lua)**

```
physicsSystem = GetPhysicsSystem()
sceneHandle = physicsSystem:GetSceneHandle(DefaultPhysicsSceneName)
scene = physicsSystem:GetScene(sceneHandle)
request = RayCastRequest()
request.Start = Vector3(5.0, 0.0, 5.0)
request.Direction = Vector3(0.0, 0.0, -1.0)
request.Distance = 10.0
request.ReportMultipleHits = true
hits = scene:QueryScene(request)
numHits = hits.HitArray:Size()
```

**Script Canvas**

The following nodes are available in **Script Canvas**:
- **Raycast (Local Space)** Returns the first entity hit by a ray cast in local space from the source entity in the specified direction.
- **Raycast (World Space)** Returns the first entity hit by a ray cast in world space from the start position in the specified direction.
- **Raycast Multiple (Local Space)** Returns all entities hit by a ray cast in local space from the source entity in the specified direction.

## Shapecast

A shapecast query is similar to a raycast query except that a shapecast query takes a shape as well as a point and direction. The shape is swept along the ray to form a volume. Anything that intersects with this volume is returned from the query.

**Example**
The shapecast query is in the shape of a sphere and intersects with the rectangle and pentagon entities.

![Shapecast query example in PhysX.](/images/user-guide/physx/physx-raycast-shape-cast-queries-3.png)

A raycast query is specified using an `AzPhysics::ShapeCastRequest`.

**ShapeCastRequest Properties**

| Property | Description |
| --- | --- |
|  `m_distance`  |  Maximum distance along `m_direction` to test.  |
|  `m_start`  |  Transform in world space where the shape cast begins.  |
|  `m_direction`  |  Direction to cast. The vector must be normalised.  |
|  `m_hitFlags`  |  Flags used to request particular hit fields to be returned, or indicate which hit fields are valid in a return value.  |
|  `m_shapeConfiguration`  |  Shape that should be swept along the ray.  |
|  `m_filterCallback`  |  Custom callback function provided by the game to filter out specific objects.  |
|  `m_reportMultipleHits`  |  Whether to return all hits along the query (up to `m_maxResults`) or only return the first hit.  |
|  `m_maxResults`  |  The maximum number of hits to return (limited by the [Global Configuration](/docs/user-guide/interactivity/physics/nvidia-physx/configuring/configuration-global/)).  |
|  `m_collisionGroup`  |  Specifies which layers to test against. Use this property to test only against specific layers.  |
|  `m_queryType`  |  Includes either static objects, dynamic objects, or both.  |

Box, capsule and sphere geometries are supported, and there are helper functions to create queries with those shapes in `AzPhysics::ShapeCastRequestHelpers`. Convex mesh geometries are also supported in C++, but not currently exposed to scripting.

To perform a shapecast query, use the `AzPhysics::SceneInterface`.

**Example (C++)**

```
auto* sceneInterface = AZ::Interface<AzPhysics::SceneInterface>::Get();

AzPhysics::ShapeCastRequest request = AzPhysics::ShapeCastRequestHelpers::CreateSphereCastRequest(1.0f,
    AZ::Transform::CreateTranslation(AZ::Vector3(-20.0f, 0.0f, 0.0f)),
    AZ::Vector3(1.0f, 0.0f, 0.0f),
    20.0f,
    AzPhysics::SceneQuery::QueryType::StaticAndDynamic,
    AzPhysics::CollisionGroup::All,
    nullptr);

AzPhysics::SceneQueryHits hits = sceneInterface->QueryScene(AzPhysics::DefaultPhysicsSceneName, &request);
```

**Example (Lua)**

```
physicsSystem = GetPhysicsSystem()
sceneHandle = physicsSystem:GetSceneHandle(DefaultPhysicsSceneName)
scene = physicsSystem:GetScene(sceneHandle)

boxDimensions = Vector3(1.0, 1.0, 1.0)
startPose = Transform.CreateTranslation(Vector3(0.0, 0.0, 5.0))
direction = Vector3(0.0, 0.0, -1.0)
distance = 10.0
queryType = 0
collisionGroup = CollisionGroup("All")
request = CreateBoxCastRequest(boxDimensions, startPose, direction, distance, queryType, collisionGroup)

hits = scene:QueryScene(request)
```

**Script Canvas**

The following nodes are available in **Script Canvas**:
- **Box Cast** Returns the first entity hit by a shapecast query with box geometry.
- **Capsule Cast** Returns the first entity hit by a shapecast query with capsule geometry.
- **Sphere Cast** Returns the first entity hit by a shapecast query with sphere geometry.

## Overlap

Overlap queries are simpler, as they don't take a direction or distance. Overlap queries simply return all objects that intersect a shape at specified location in the world.

An overlap query is specified using an `AzPhysics::OverlapRequest`.

**OverlapRequest Properties**

| Property | Description |
| --- | --- |
|  `m_pose` |  Transform in world space of the shape.  |
|  `m_shapeConfiguration`  |  Shape to use for the overlap.  |
|  `m_filterCallback`  |  Custom callback function provided by the same to filter out specific entities.  |
|  `m_unboundedOverlapHitCallback`  |  Allows overlap queries to return unlimited results, processed via a callback.  |
|  `m_maxResults`  |  The maximum number of hits to return (limited by the [Global Configuration](/docs/user-guide/interactivity/physics/nvidia-physx/configuring/configuration-global/), and assuming `m_unboundedOverlapHitCallback` is not used ).  |
|  `m_collisionGroup`  |  Specifies which layers to test against. Use this property to test only against specific layers.  |
|  `m_queryType`  |  Includes either static objects, dynamic objects, or both.  |

Box, capsule and sphere geometries are supported, and there are helper functions to create queries with those shapes in `AzPhysics::OverlapRequestHelpers`. Convex mesh geometries are also supported in C++, but not currently exposed to scripting.

To perform an overlap query, use the `AzPhysics::SceneInterface`.

**Example (C++)**
```
auto* sceneInterface = AZ::Interface<AzPhysics::SceneInterface>::Get();

AzPhysics::OverlapRequest request = AzPhysics::OverlapRequestHelpers::CreateBoxOverlapRequest(AZ::Vector3(3.0f),
    AZ::Transform::CreateTranslation(AZ::Vector3(13.0f, 0.0f, 0.0f)));

AzPhysics::SceneQueryHits results = sceneInterface->QueryScene(AzPhysics::DefaultPhysicsSceneName, &request);
```

**Example (Lua)**
```
physicsSystem = GetPhysicsSystem()
sceneHandle = physicsSystem:GetSceneHandle(DefaultPhysicsSceneName)
scene = physicsSystem:GetScene(sceneHandle)

boxDimensions = Vector3(1.0, 1.0, 1.0)
pose = Transform.CreateTranslation(Vector3(0.0, 0.0, 5.0))
request = CreateBoxOverlapRequest(boxDimensions, pose)

hits = scene:QueryScene(request)
```

**Script Canvas**

The following nodes are available in **Script Canvas**:
- **Overlap Box** Returns an array of Entity Ids which overlap with a box geometry.
- **Overlap Capsule** Returns an array of Entity Ids which overlap with a capsule geometry.
- **Overlap Sphere** Returns an array of Entity Ids which overlap with a sphere geometry.

## SceneQueryHit
The results of scene queries are described using `AzPhysics::SceneQueryHit` objects. A single query may return multiple results, contained in an `AzPhysics::SceneQueryHits` object. The results of batch queries are described using an `AzPhysics::SceneQueryHitsList` object, which is a container of `AzPhysics::SceneQueryHits` objects.

**SceneQueryHit Properties**
| Property | Description |
| --- | --- |
| `m_resultFlags` | Flags which indicate which of the below properties are valid. |
| `m_distance` | The distance from the origin of the query to the hit (only valid for raycast and shapecast queries). |
| `m_bodyHandle` | Handle to the `AzPhysics::SimulatedBody` which was hit. |
| `m_entityId` | The Entity Id of the body which was hit. |
| `m_shape` | The shape on the body which was hit. |
| `m_physicsMaterialId` | The phsyics material id on the shape (or face) which was hit. |
| `m_position` | The position of the hit in world space (only valid for raycast and shapecast queries). |
| `m_normal` | The [normal](https://en.wikipedia.org/wiki/Normal_(geometry)) in world space of the hit surface. (only valid for raycast and shapecast queries). |
