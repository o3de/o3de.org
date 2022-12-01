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

The `Default` / `Bilinear` Sampler setting uses the query resolution to sample the four grid corners that surround the requested position, and then it performs bilinear filtering to create the resulting output value. For example, in the illustration below, the underlying height data has different values at every 0.25 meter interval. The chart below it shows what happens when querying this data at position 0.75 with different Height Query Resolution settings.

```goat
40  o                           o
30  |                           |
20  |      o      o             |
10  |      |      |      o      |
0   +------+------+------+------+
   0.00   0.25   0.50   0.75   1.00
```

| Height Query Resolution | Result | Description |
| - | - | - |
| 1.0 meters | 40 | Querying at 0.75 fetches the underlying data at 0.00 (40) and 1.00 (40) and interpolate at 75%. |
| 0.5 meters | 30 | Querying at 0.75 fetches the underlying data at 0.50 (20) and 1.00 (40) and interpolate at 50%. |
| 0.25 meters | 10 | Querying at 0.75 fetches the underlying data at 0.75 (10) and 1.00 (40) and interpolate at 0%. |

The `Default` Sampler setting should be used by most systems when querying. However, there are two other sampling methods that are available for specialized use.

The `Clamp` Sampler setting will take the requested query position and 'clamp' it down to the terrain grid before requesting the value. Where the `Bilinear` sampler produces an infinite range of interpolated values for all the positions between grid points, the `Clamp` sampler will always produce the same value for every position between grid points. Because this only fetches one data value, not four, it can run up to 4x faster than the `Default` sampler, but the values returned will only match the rendering and physics representations when queried directly on the grid points. For that reason, this setting should only be used when querying directly on terrain grid points.

The `Exact` Sampler setting takes the requested query position and passes it directly down to the underlying data source, ignoring the terrain grids entirely. Similar to `Clamp`, this is 4x faster than `Default`, but only produces matching values when it's queried directly on the grid points. You should not use it to query positions outside of the grid points, since the data may not align with the rendering or physics representations. However, the feature is available for those who want it.

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
