# PhysX Scene Queries<a name="physx-scene-queries"></a>

You can use physics raycast and shape cast queries to determine whether a specific line segment intersects physics geometry\. For example, you might want to determine what object is in front of another object, or test a line of sight\. For a shape cast, the line segment is in the form of a desired shape \(for example, a sphere\)\. All scene queries are performed on a `Physics::World` object\. For more information, see [PhysX World Programming Notes](physx-configuration-physx-world-programming-notes.md)\.

You can use scene queries to find nearby objects using the following methods\. 

**Topics**
+ [Raycast](#physx-scene-queries-raycasts)
+ [Shapecast](#physx-scene-queries-shapecasts)
+ [Overlap](#physx-scene-queries-overlap)

**Note**  
Scene queries can have a performance cost\.

## Raycast<a name="physx-scene-queries-raycasts"></a>

Raycast queries are the most common scene query\. A raycast query takes a point and direction, with a distance, and returns the closest collider that intersected the ray\.

**Example**  
The raycast query intersects the pentagon only\.  

![\[Raycast query example in PhysX world.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/physx/physx-raycast-shape-cast-queries-2.png)

To perform a raycast query, use the `WorldRequestBus`\.

**Example RayCast Closest**  

```
Physics::RayCastRequest request;
Physics::RayCastHit result;
WorldRequestBus::BroadcastResult(result, &WorldRequests::RayCast, request);
```

You can also retrieve objects that intersect with the ray by using the multiple version\.

**Example RayCast Multiple**  

```
Physics::RayCastRequest request;
vector<Physics::RayCastHit> results;
WorldRequestBus::BroadcastResult(result, &WorldRequests::RayCastMultiple, request);
```

**Note**  
You can specify the maximum number of hits that can be collected from a `RayCastMultiple` query\. You can specify the **RayCast Buffer Size** property in the **PhysX Configuration** window\. For more information, see [World Configuration](physx-configuration-global.md#physx-configuration-global-world)\.

The following tables describe the properties for the `RayCastRequest` and `RayCastHit` objects\.


**RayCastRequest Properties**  

| Property | Description | 
| --- | --- | 
|  `m_distance`  |  Maximum distance along the ray to test for intersections\.  | 
|  `m_start`  |  World space point where the ray starts\.  | 
|  `m_direction`  |  Direction to cast the ray\. This vector must be normalised\.  | 
|  `m_collisionGroup`  |  Specifies which layers to test against\. Use this to test only against specific layers\.  | 
|  `m_filterCallback`  |  Custom callback function provided by the game to filter our specific objects\.  | 
|  `m_queryType`  |  Include either static, dynamic objects, or both\.  | <a name="raycasthit"></a>


**RayCastHit Properties**  

| Property | Description | 
| --- | --- | 
| m\_distance |  Distance along the ray at which the hit was found\.  | 
| m\_position |  Position in world space of the hit\.  | 
| m\_normal |  [Normal](https://en.wikipedia.org/wiki/Normal_(geometry)) in world space of the hit surface\.  | 
|  `m_body`  |  Body that was hit\.  | 
| m\_shape |  Shape on the body that was hit\.  | 
| m\_material |  Shape on the body that was hit\.  | 

## Shapecast<a name="physx-scene-queries-shapecasts"></a>

A shapecast query is similar to a raycast query except that a shapecast query takes a shape as well as a point and direction\. The shape is swept along the ray to form a volume\. Anything that intersects with this volume is returned from the query\.

**Example**  
The shapecast query is in the shape of a sphere and intersects with the rectangle and pentagon entities\.  

![\[Shapecast query example in PhysX.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/physx/physx-raycast-shape-cast-queries-3.png)

To perform a shapecast query, use the `WorldRequestBus`\.

**Example ShapeCast Closest**  

```
Physics::ShapeCastRequest request;
Physics::RayCastHit result;
WorldRequestBus::BroadcastResult(result, &WorldRequests::ShapeCast, request);
```

Similar to raycasting, there is a multiple version for retrieving all objects that intersect with the volume\.

**Example ShapeCast Multiple**  

```
Physics::ShapeCastRequest request;
vector<Physics::RayCastHit> results;
WorldRequestBus::BroadcastResult(results, &WorldRequests::ShapeCastMultiple, request);
```

**Note**  
You can specify the maximum number of hits that can be collected from a `ShapeCastMultiple` query\. You can specify the **Shapecast Buffer Size** value in the **PhysX Configuration** window\. For more information, see [World Configuration](physx-configuration-global.md#physx-configuration-global-world)\.


**ShapeCastRequest Properties**  

| Property | Description | 
| --- | --- | 
| m\_distance |  Maximum distance along `m_direction` to test\.  | 
| m\_start |  Transform in world space where the shape cast begins\.  | 
|  `m_direction`  |  Direction to cast\. The vector must be normalised\.  | 
| m\_shapeConfiguration |  Shape that should be swept along the ray\.  | 
| m\_collisionGroup |  Specifies which layers to test against\. Use this property to test only against specific layers\.  | 
| m\_filterCallback |  Custom callback function provided by the game to filter out specific objects\.  | 
|  `m_queryType`  |  Includes static, dynamic, or both\.  | 

## Overlap<a name="physx-scene-queries-overlap"></a>

Overlap queries are simpler, as they don't take a direction or distance\. Overlap queries simply return all objects that intersect a shape at specified location in the world\. There is only one multiple version using this method\.

**Example**  
The overlap query is a sphere shape that intersects with both entities\.   

![\[Overlap query example in PhysX.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/physx/physx-raycast-shape-cast-queries-4.png)

**Example Overlap Closest**  

```
Physics::OverlapRequest request;
vector<Physics::OverlapHit> results;
WorldRequestBus::BroadcastResult(results, &WorldRequests::Overlap, request);
```

**Note**  
You can specify the maximum number of hits that can be collected from a `Overlap` query\. You can specify the **Overlap Query Buffer Size** value in the **PhysX Configuration** window\. For more information, see [World Configuration](physx-configuration-global.md#physx-configuration-global-world)\.


**OverlapRequest Properties**  

| Property | Description | 
| --- | --- | 
| m\_pose |  Transform in world space of the shape\.  | 
|  `m_shapeConfiguration`  |  Shape to use for the overlap\.  | 
|  `m_collisionGroup`  | Specifies which layers to test against\. Use this to test only against specific layers\. | 
|  `m_filterCallback`  |  Custom callback function provided by the same to filter out specific entities\.  | 
|  `m_queryType`  |  Includes static, dynamic, or both\.  | 


**OverlapHit Properties**  

| Property | Description | 
| --- | --- | 
|  `m_body`  |  Body that was hit\.  | 
|  `m_shape`  |  Shape on the body that was hit\.  | 
|  `m_material`  | Material on the shape that was hit\. | 