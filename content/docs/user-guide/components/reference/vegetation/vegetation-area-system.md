---
linkTitle: Vegetation Area System
title: Vegetation Area System Component
description: The Vegetation Area System component handles the placement and removal of vegetation instances based on its configured rules in **Open 3D Engine (O3DE)**.
---

The **Vegetation Area System** component handles the placement and removal of vegetation instances throughout your world, based on its configured rules.

For more information about how the Vegetation Area System component works within the vegetation system, see the [Technical details](#technical-details) section in this topic.

{{< note >}}
This is a system component, meaning it already exists when you add the vegetation system through the Vegetation Gem. You can configure vegetation area properties per level, through the **Vegetation System Settings** level component.
{{< /note >}}

## Provider

[Vegetation Gem](/docs/user-guide/gems/reference/environment/vegetation/)

## Source code

[`/Gems/Vegetation/Code/Source/AreaSystemComponent.h`](https://github.com/o3de/o3de/blob/development/Gems/Vegetation/Code/Source/AreaSystemComponent.h)

## Parameters

| Property | Description | Values | Default |
| --- | --- | --- | --- |
| **View Area Grid Size** | The number of sectors, for each side, of a managed grid in a scrolling view centered around the camera | 1 to 128 | 13  |
| **Sector Point Density** | The number of equally spaced vegetation instance grid placement points, for each side, within a sector | 1 to 64 | 20 |
| **Sector Size In Meters** | The size in meters, for each side, of each sector. | 1 to 1024 | 16 |
| **Thread Processing Interval** | The delay in milliseconds between processing queued thread tasks. | 0 to 5000 | 500 |
| **Sector Search Padding** | Increases the search radius for surrounding sectors when enumerating through vegetation instances. | 0 to 2 | 0 |
| **Sector Point Snap Mode** | Controls whether vegetation placement points are located at the corner or the center of the cell. | `Corner`, `Center` | `Corner` |

## AreaSystemRequestBus

File: [`Gem/sVegetation/Code/Include/Vegetation/Ebuses/AreaSystemRequestBus.h`](https://github.com/o3de/o3de/blob/5783c18cc8d65f75737159f4cdcf6019d0e8dcfc/Gems/Vegetation/Code/Include/Vegetation/Ebuses/AreaSystemRequestBus.h)

| Request Name | Description | Parameters | Return | Scriptable |
| --- | --- | --- | --- | --- |
| `RegisterArea` | Adds a Vegetation Area entity to the system for processing. | `AZ::EntityId`, `AZ::u32`, `AZ::Aabb&` | None | No  |
| `UnregisterArea` | Removes a Vegetation Area entity from the system. | `AZ::EntityId` | None | No  |
| `RefreshArea` | Queues a Vegetation Area to update its data within the system and marks regions of sectors dirty for reprocessing. | `AZ::EntityId`, `AZ::u32`, `AZ::u32`, `AZ::Aabb&` | None | No  |
| `RefreshAllAreas` | Updates the cached data for all registered areas and causes the entire system to repopulate. | None | None | No  |
| `ClearAllAreas` | Forces all cached data and instances in every sector to be removed, and causes the entire system to repopulate. | None | None | No  |
| `MuteArea` | Tells the Vegetation Area System to ignore the specified area when refilling sectors because it's managed elsewhere. This is the case with areas controlled by Vegetation Layer Blenders. | `AZ::EntityId` | None | No  |
| `UnmuteArea` | Re-enables direct processing of a Vegetation Area that was previously muted. | `AZ::EntityId` | None | No  |
| `EnumerateInstancesInOverlappingSectors` | Visits all instances contained within every vegetation sector that overlaps the given bounds, until the callback function decides otherwise. Additionally, the sector boundary is located by the **Sector Search Padding** value in the Area System component's configuration. | `AZ::Aabb&`, `AreaSystemEnumerateCallback` | None |  No |
| `EnumerateInstancesInAabb` | Invokes a callback function for every Vegetation Instance that intersects the specified bounds | `AZ::Aabb&`, `AreaSystemEnumerateCallback` | None | No  |
| `GetInstanceCountInAabb` | Gets the current number of instances contained within the axis-aligned bounding box (AABB). | `AZ::Aabb&` | `AZStd::size_t` | Yes |
| `GetInstancesInAabb` | Get the list of instances contained within the AABB. | `AZ::Aabb&` | `AZStd::vector<Vegetation::InstanceData>` | Yes |


## Technical details

The Vegetation Area System component tracks registered vegetation areas and uses them to populate the region surrounding the camera.
That region is a configurable-sized grid of sectors with details about the environment and what vegetation exists within it.
Each sector analyzes overlapping surfaces to gather and cache surface data samples by performing downward intersection tests at each point on a sub-grid. 
These samples represent all of the available points regarding where to plant vegetation.

When the camera moves or other events occur to modify the state of vegetation areas or surfaces, the Vegetation Area System component receives a notification. 
Then, it queues tasks for processing sectors and vegetation areas on another thread. 
Sectors that fall outside of the region are destroyed. 
New or remaining sectors within the region are evaluated to determine if they need to be filled.

Each sector that's being filled traverses all of the overlapping vegetation areas in priority order. 
Each vegetation area gets a list of the sector's available points, each of which it can examine and claim. 
If it does, it removes the point from circulation. 
When a vegetation area claims a point, no other vegetation areas can use it. 
A sector completes its processing when either there are no more available points or all vegetation areas are already processed.

For example, the **Vegetation Layer Spawner** component analyzes each point and determines if the point can be claimed based on its configuration, shape, and other filters. 
If all is successful, the Vegetation Layer Spawner will request to create an object, or *vegetation instance*, at that location. 
These instance creation and destruction requests are sent to the **Vegetation Instance System** component.