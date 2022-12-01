---
linktitle: Using the Terrain System
title: Using the Terrain System
description: Information on how to use the terrain system's APIs.
weight: 300
---

Internal to the terrain system, there are a number of components, EBus definitions, and APIs. However, if your goal as a developer is simply to _use_ the terrain system, the only methods that you need are the ones defined on the `TerrainDataNotificationBus` and the `TerrainDataRequestBus`.

## `TerrainDataNotificationBus`

The `TerrainDataNotificationBus` provides notifications when the terrain system first activates, when it deactivates, and every time a piece of terrain data changes. Any system that keeps some form of synchronized state with the terrain system, such as physics, rendering, or navigation, needs to listen to this EBus to update its synchronized state on every notification.

There are several requirements that this imposes.

1. The terrain system can be activated and deactivated at any time, so you should explicitly handle and test these cases. The simplest way to test it is to enable and disable the **Terrain World** level component.

2. Your system must always remain reactive to data changes. There is no singular concept of "terrain has finished loading", because all of the data is decomposed into separate pieces that can load at separate times, and the data can dynamically stream in and out at any time. If your system needs a well-defined "done" point, you will need to explicitly define and track this state yourself based on the requirements of your specific product.

3. The overall size of the terrain is dynamic based on the currently-loaded data, with no hard-coded boundaries. Any system that uses terrain data should remain equally flexible and not require any hard-coded limitations.

4. The size of a data change might be as large as the entire terrain. If your system needs to update based on terrain changes, you will likely want to make those updates asynchronous and parallel for the best non-blocking performance. Asynchronous processes should be designed to be interruptable because it's very easy to get new data change notifications while in the midst of updating from the previous notification. To see this, simply drag an entity with a **Terrain Layer Spawner** around in the Editor to change its position. The entire box around the spawner will generate constant change notifications as the box is dragged around. See the **Terrain Physics Collider Component** for an example of creating interruptable asynchronous updates based on the `OnTerrainDataChanged` notifications.

## `TerrainDataRequestBus`

The `TerrainDataRequestBus` provides the methods for querying any amount of terrain data as well as for getting/setting the global terrain settings. Any system that needs terrain information will use this EBus to query the data.

To use the APIs effectively, it's important to understand how aspects of the APIs work at a more detailed level.

### Terrain world grids

The underlying terrain data can be at any resolution, including "infinite" resolution for procedural data like random number generators, and the data resolution can vary by position across different Terrain Layer Spawners. The terrain system defines separate conceptual world grids for height data and surface data so that all of the input data is normalized into a single output resolution, which is defined by the grid spacing.

The grid spacing is controlled by the `Height Query Resolution` and `Surface Data Query Resolution` settings. A query resolution of 1 meter means that across the entire world, the terrain will query the underlying data at a consistent 1 meter spacing, regardless of what resolution the underlying data is at.

However, the terrain system itself can be queried at any position, not just on the conceptual grids. The `Sampler` type controls exactly _how_ to query the underlying data in relation to these grids.

The `Default` / `Bilinear` Sampler setting uses the query resolution to sample the four grid corners that surround the requested position, and then it performs bilinear filtering to create the resulting output value.

The `Bilinear` Sampler setting should be used by most systems when querying. However, there are two other sampling methods that are available for specialized use.

The `Clamp` Sampler setting takes the requested query position and clamps it to the terrain grid before requesting the value. Unlike the `Bilinear` sampler, which returns an infinite range of interpolated values for every position between the grid points, the `Clamp` sampler always returns the same value for every position between the grid points. Because this only fetches a single grid point, and not the four grid corners, it runs up to 4x faster than the `Bilinear` sampler. However, the values returned will only match the rendering and physics representations when queried directly on the grid points. For that reason, this setting should only be used when querying directly on terrain grid points.

The `Exact` Sampler setting takes the requested query position and passes it directly down to the underlying data source, ignoring the terrain grids entirely. Similar to `Clamp`, this is 4x faster than `Bilinear`, but only produces matching values when it's queried directly on the grid points. You should not use it to query positions outside of the grid points, since the data may not align with the rendering or physics representations. However, the feature is available for those who want it.

The following chart demonstrates the differences between the samplers. The circles represent the underlying data source values, which in this example has different values every 0.25 meters. The squares are the terrain grid at different Height Query Resolution settings. The solid black circle is the position we are querying for the height. The blue circles are the data source values used to compute the result.

| Sampling Type | Description | Height Query Resolution 1.0 m | Height Query Resolution 0.5 m | Height Query Resolution 0.25 m |
| - | - | - | - | - |
| `Bilinear` | The height query for (0.75, 0.75) gathers the heights from points A, B, C, and D and interpolates them to calculate the final result. | {{< image-width src="/images/user-guide/visualization/environments/terrain/bilinear-1.0m.svg" width="400" alt="Bilinear sampling at 1.0 meters." >}} | {{< image-width src="/images/user-guide/visualization/environments/terrain/bilinear-0.5m.svg" width="400" alt="Bilinear sampling at 0.5 meters." >}} | {{< image-width src="/images/user-guide/visualization/environments/terrain/bilinear-0.25m.svg" width="400" alt="Bilinear sampling at 0.25 meters." >}} |
| `Clamp` | The height query for (0.75, 0.75) returns the height from point A, which is the terrain grid point that the query position is rounded down to. | {{< image-width src="/images/user-guide/visualization/environments/terrain/clamp-1.0m.svg" width="400" alt="Clamp sampling at 1.0 meters." >}} | {{< image-width src="/images/user-guide/visualization/environments/terrain/clamp-0.5m.svg" width="400" alt="Clamp sampling at 0.5 meters." >}} | {{< image-width src="/images/user-guide/visualization/environments/terrain/clamp-0.25m.svg" width="400" alt="Clamp sampling at 0.25 meters." >}} |
| `Exact` | The height query for (0.75, 0.75) returns the height from point A, which is always the value from the underlying data source at that location, regardless of the terrain grid size. | {{< image-width src="/images/user-guide/visualization/environments/terrain/exact-1.0m.svg" width="400" alt="Exact sampling at 1.0 meters." >}} | {{< image-width src="/images/user-guide/visualization/environments/terrain/exact-0.5m.svg" width="400" alt="Exact sampling at 0.5 meters." >}} | {{< image-width src="/images/user-guide/visualization/environments/terrain/exact-0.25m.svg" width="400" alt="Exact sampling at 0.25 meters." >}} |

### The `terrainExists` flag

Because terrain data only exists within arbitrary authored regions, it's possible to query the terrain system for points where the terrain does not exist. The terrain is defined as existing as long as height data exists. When querying for terrain data, this flag should always be checked for each query result to ensure that the data actually represents valid terrain.

### Query optimizations

Here are a few tips for getting the best performance out of the terrain query APIs:

* The APIs are designed to let you query for different combinations of height, normal, and surface data. The more data you query, the more expensive the query is, so try to limit queries to fetch the minimum amount of data that you intend to use. When you need multiple types of data for the same position, the APIs that let you fetch multiple types at once are generally faster than calling the individual APIs separately. For example, `GetSurfacePoint` is faster than calling `GetHeight`, `GetNormal`, and `GetSurfaceWeights` individually.
* When querying for multiple input positions, the bulk APIs (`QueryList`, `QueryRegion`) are generally 80-90% faster than calling the individual APIs (`GetHeight`, etc).
* `QueryRegion` / `QueryRegionAsync` are the fastest query APIs because they don't require the additional step of building up an input list of positions before calling them.
* The queries can be up to 4x faster by using the `Exact` or `Clamp` sampler choices, as long as you take care to align the input positions or input region exactly to the terrain grid. Misalignment produces inaccurate results.
* The `TerrainAreaExistsInBounds` provides a quick way to determine if terrain exists within an AABB. This can be used to entirely circumvent the more expensive per-point queries if the region that your system cares about doesn't contain any terrain.

### Raycast queries

The `TerrainDataRequestBus` provides a `GetClosestIntersection` method to perform a single raycast against the terrain. Typically, collision raycasts are expected to be performed through a physics system, but this method is available as an alternative for when physics raycasts aren't appropriate. For example, it's used within the Editor itself for placing objects on the terrain.

{{< tip >}}
`GetClosestIntersection` provides generalized raycasts in any direction, but if your system only raycasts straight down to get terrain information directly beneath a location, use one of the other query APIs such as `GetSurfacePoint` or `QueryList` instead. They produce faster results.
{{< /tip >}}

## Surface Data System

There is an indirect way to use the terrain system as well, which is through the `Surface Data` API. If your system is designed to generally work with surfaces, whether they come from shapes, meshes, terrain, or elsewhere, the `Surface Data` API provides a way to get generalized surface data information without a direct coupling to terrain.

To use this system, the `GetSurfacePoints*` APIs on the `SurfaceDataSystemRequestBus` can be used to query the height and surface data information, and the `OnSurfaceChanged` API on the `SurfaceDataSystemNotificationBus` can be used to listen for change notifications. These APIs use abstract surface tags for querying surfaces, so terrain data will get mixed together in the results with any other surfaces that use the same surface tags as terrain.
