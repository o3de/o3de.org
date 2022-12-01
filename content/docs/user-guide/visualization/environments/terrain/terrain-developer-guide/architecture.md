---
linktitle: Architecture
title: Architecture
description: Developer documentation explaining the terrain system architecture
weight: 200
---
At the highest level, the terrain system consists of a Terrain Gem that relies on a number of other Gems:

```goat
                         .--------------.
                        |    Terrain     |
                         '--+-+-+-+---+-'
                            | | | |   |
     .---------------------'  | | |    '------------------.
    |              .---------'  |  '--------.              |
    |             |             |            |             |
    |             v             |            v             |
    |    .--------+----------.  |  .---------+------.      | 
    |   |   Gradient Signal   | | |   Surface Data   |     |
    |    '------------+------'  |  '------+---------'      |
    |                 |         |         |                |
    |                 v         v         v                v
    |          .------+---------+---------+------.     .--------.
    |         |   LmbrCentral (Shape Components)  |   |   Atom   |
    |          '---------------------------------'     '--------'
    |
    v    
 .-----------------------------------------------------------.
|           AzFramework (Terrain API Definitions)             |
 '-----------------------------------------------------------'

```

The **Gradient Signal Gem** provides components that map data in the 0-1 range to world positions. The gradient components are used for defining height data and surface weight data. In particular, the **Image Gradient** component provides a convenient workflow for importing and using heightmaps and "splat maps" (surface weight maps) that are generated from external terrain authoring tools.

The **Surface Data Gem** provides a way to define conceptual geometric volumes with sets of arbitrary tags which can then be referenced from other systems (like Dynamic Vegetation) that operate on generic surfaces. The terrain system uses the Surface Data tags as the naming system for terrain surface types. It also implements a Surface Data component to make the terrain show up as a surface within the Surface Data system. This enables the Dynamic Vegetation system to treat terrain as a "plantable surface".

The **LmbrCentral Gem** defines all of the base shape components. Shape components are used by Terrain, Gradients, and Surface Data as a way to attach data to geometric volumes in the world. These volumes provide an easy way to author location, size, scale, and data density in easily-modifiable ways.

The **Atom Gem** contains the base rendering system that the terrain system uses to the render the terrain.

**AzFramework** contains the abstract terrain system request and notification API definitions.

By putting the API definitions in AzFramework, but the implementation in the Terrain Gem, we're defining a general API contract that any terrain system should implement for O3DE, but we're providing our implementation as an optional implementation that can be fully replaced. Since only one implementation exists, it's difficult to guarantee that the API is truly agnostic. If the API is ever proven out to be too specific, the existing API definitions could get moved to the Terrain Gem as well.

## Data provider / data consumer pattern

The base terrain system design follows a data provider / data consumer pattern:

* **Data Providers**: generalized data providers that simply "serve up" data to be consumed by other systems. On their own, they don't do anything.  They need to be queried and consumed to have a purpose. Gradient components are an example of data providers - they define height or surface data, but they don't perform any actions.
* **Data Consumers**: systems and components that actively query the terrain data and take action on the results. Terrain Physics Heightfield is a data-consuming component, and the Terrain Renderer is a data-consuming system. They query the terrain APIs to spawn physical or rendered representations of terrain in an area.

With this design pattern, the terrain system is essentially a "passive" system that provides a single API entry point with a unified view of all of the terrain data. It simply routes data requests from data consumers to data providers and change notifications from data providers to data consumers. The terrain system is completely dormant except for the times when data changes or something requests terrain data.

There are some pros and cons to this design. The main benefits are design simplicity for each individual piece, decoupled systems, and easy extensibility. The main downside is that it's very easy to have redundant computations caused from multiple decoupled systems that all request the same set of terrain data at the same time. There is also a heavier set of design requirements on each piece of the system to ensure that they work well in parallel, asynchronous environments.

This diagram shows a sample communication flow as a Gradient component used for height gets activated. This particular example demonstrates both change notifications and data requests in a single series of actions.

{{< image-width src="/images/user-guide/visualization/environments/terrain/terrain-communication-flow.svg" width="1200" alt="Terrain communication flow." >}}

It starts with a series of notification events to tell the terrain system that data needs to refresh. The terrain system then broadcasts outward that data has changed, which causes the Terrain Mesh Renderer to take action and refresh itself. The Terrain Mesh Renderer then queries the terrain system for the height data that it needs to refresh itself. Other systems can listen to the OnTerrainDataChanged() notification and refresh themselves in parallel.

## Internal system communication

Communication within the terrain system is all abstracted through EBus requests and notifications. EBus abstractions were chosen for a few reasons:

1. EBus provides thread safety. We want to be able to query terrain data from any thread, but the underlying entities and components can spawn, despawn, and change their data at the same time.
2. EBus encourages decoupling. We want each piece of the system to be able to operate independently and only interact through the API contracts defined on the EBus.
3. EBus enables functional replacements. As long as a component or system meets the EBus contract, it's possible to replace the functionality in discrete chunks.

Queries to the system run in parallel and only block on data modifications, and data modifications run serially and block on both data queries and data modifications. The locking pattern is optimized around the assumption that terrain data is queried in a read-only fashion most of the time, and the data is loaded, unloaded, or modified just a small fraction of the time.

## Single system, multiple components

Another key aspect to the terrain system design is that it provides a singleton system as a single entry point for all terrain queries and management of global terrain settings. However, all of the terrain data and components that feed the system are split apart into discrete pieces. There are many reasons for both of these design decisions.

Single terrain system:

* Defines a single "world grid" for the entire terrain, which presents a consistent resolution and alignment for the terrain grid everywhere. This makes it easy to query the system, since it's possible to walk through the world at consistently-spaced positions everywhere, regardless of the input data resolution and positioning.
  * This also means the renderer doesn't need to solve seams with adjacent meshes of different resolutions, manage LODs across different resolutions, deal with overlapping terrain meshes, and so on.
* Provides a way to manage priorities for overlapping terrain data regions.
* Gives a single well-defined API connection point for queries and notifications, without forcing everything that uses terrain to know about all of the individual data pieces that have been used to assemble the terrain.

Multiple terrain components:

* The world can be divided into arbitrary rectangular regions via **Terrain Layer Spawners**. The rectangles can be different sizes, and areas of the world without terrain can remain empty.
  * This enables multiple content creators to work on different regions at the same time, since they're working on physically separated data.
  * Data usage can be optimized by only placing data where it's needed.
  * Regions can be dynamically loaded and unloaded individually, making it easy to implement coarse-grained terrain streaming.
* Each region can have different subsets of features.
  * Regions where gameplay occurs can spawn terrain physics representations, but distant terrain regions that are for visuals only don't need to have physics enabled.
  * Aspects of terrain rendering can be disabled for server-side or machine learning simulations that don't require a visual representation of terrain.
* Different components can have different input data resolutions. The terrain system defines a single _output_ terrain grid and resolution, but the input data resolutions can be varied to optimize the data size and complexity based on the need for that region. Even within a region, two different data providers (such as height and surface type) can use two different resolutions based on what's appropriate for that type of data.
* The functionality can be replaced at a component-by-component level.
  * The PhysX Heightfield component can be replaced with one that connects to another physics system such as [Jolt Physics](https://github.com/jrouwe/JoltPhysics) or [Bullet Physics SDK](https://github.com/bulletphysics/bullet3).
  * Image Gradients can be used for areas with authored input data, and Fast Noise Gradients can be used to procedurally generate data in other areas.
  * New data providers can be created for streaming satellite data, performing complex procedural generation, etc, and swapped in without needing to replace the rest of the terrain system.

In short, the singleton terrain system provides a single simplified API for runtime systems that need terrain data. The separated components provide better workflows and flexibility for content authors with multiple layers of data tuning and optimization.

## Component design

The specific functional and data separations in the terrain component design have been chosen to make it easy to control what functionality is active and to provide clear touchpoints for replacing functionality everywhere that it's likely to be useful.

### Level components

The terrain system uses three level components:

| Component | Description |
| - | - |
| **Terrain World** | Controls the base terrain system. The entire system is enabled or disabled by adding or removing this component. The configuration parameters that affect the entire terrain world exist on this component as well.|
| **Terrain World Renderer** | Controls the terrain rendering. It requires the **Terrain World** component to exist, and it provides all of the rendering configuration settings that apply globally to the entire terrain. This component is separated from **Terrain World** so that it's possible to define a conceptual terrain without requiring the overhead of rendering. This is useful for cases where a visual representation simply isn't necessary. Also, this provides a "replacement touchpoint" for creating different terrain renderers, such as a voxel-based implementation or a raytracing-based implementation.|
| **Terrain World Debugger** | Provides helpful debugging features for visualizing aspects of the terrain system. This component is separated from **Terrain World** so that it's easy to completely remove it from shipping products.|

### Entity components

There are two types of terrain entity components - the "core" components that are used to define a terrain region and "auxiliary" components that operate on an area that can contain terrain regions.

Core Components:

| Component | Description |
| - | - |
| **Axis-Aligned Box Shape** | Defines the shape of a terrain region, including the min/max heights. |
| **Terrain Layer Spawner** | Declares that a terrain region exists in the shape bounds, and it has a specified priority. |
| **Terrain Height Gradient List** | (Optional) Defines the height data for the terrain region. |
| **Terrain Surface Gradient List** | (Optional) Defines the surface type and weight data for the terrain region. |

Auxiliary Components:

The "auxiliary" components only require a Box Shape on their entity, but not a Terrain Layer Spawner, so they can span across multiple terrain regions instead of being tied to a single one. They _can_ still appear on an entity with a Terrain Layer Spawner, it just isn't required.

| Component | Description |
| - | - |
| **Terrain Macro Material** | Applies a terrain base color texture to all terrain regions that fall within its volume. Macro materials aren't directly attached to single terrain regions so that they can be authored and streamed at different world resolutions than the terrain regions. |
| **Terrain Surface Materials List** | Defines the mapping between surface types and rendering materials. By keeping this separate from terrain regions, if the list of surface materials and type mappings are constant throughought the world, this can just be authored once with a box large enough to contain the world, instead of duplicated on each terrain region. |
| **Terrain Physics Collider** / **PhysX Heightfield Collider** | Defines volumes that contains physics heightfield colliders. These have been separated from terrain regions so that they can easily be spawned and despawned at different sizes and times than the rest of the terrain data. |
