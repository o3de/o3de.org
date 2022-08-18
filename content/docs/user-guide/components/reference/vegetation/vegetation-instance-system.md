---
linkTitle: Vegetation Instance System
title: Vegetation Instance System Component
description: Manages and processes requests to create and destroy vegetation instances in Open 3D Engine (O3DE). 
---

The Vegetation Instance System component manages and processes requests to create and destroy vegetation instances, or static objects, throughout your world.

Learn about how the Vegetation Instance System component works within the vegetation system in [Technical details](#technical-details) below.

{{< note >}} 
This is a system component that exists when you interact with the vegetation system via the Vegetation Gem. Generally, this system is already set up and you don't need to do anything further to manage vegetation in your world.
{{< /note >}}

## Provider

[Vegetation Gem](/docs/user-guide/gems/reference/environment/vegetation/)

## Source code

[`Gems/Vegetation/Code/Source/InstanceSystemComponent.h`](https://github.com/o3de/o3de/blob/development/Gems/Vegetation/Code/Source/InstanceSystemComponent.h)


## Properties

| Property| Description | Values | Default |
| --- | --- | --- | --- |
| **Max Instance Process Time Microseconds** | The number of microseconds per tick for processing instance management tasks. | 0 to 33000 | 500 |
| **Max Instance Task Batch Size** | The number of instance management tasks that can be batch processed together. | 1 to 2000 | 100 |

## InstanceSystemRequestBus

File: [Gems/Vegetation/Code/Include/Vegetation/Ebuses/InstanceSystemRequestBus.h](https://github.com/o3de/o3de/blob/development/Gems/Vegetation/Code/Include/Vegetation/Ebuses/InstanceSystemRequestBus.h)

| Request Name | Description | Parameters | Return | Scriptable |
| --- | --- | --- | --- | --- |
| `RegisterUniqueDescriptor` | Compares the input descriptor against entries in a set of existing, registered descriptors. If a matching descriptor is found then it increments the reference count and returns a pointer to that entry. Otherwise a new entry is added by copying the input descriptor and returning it. | `Vegetation::Descriptor&` | `Vegetation::DescriptorPtr` | No  |
| `ReleaseUniqueDescriptor` | Reduces the reference count of a unique descriptor and remove it if there are no more references. | `Vegetation::DescriptorPtr` | None | No  |
| `CreateInstance` | Queues the creation of a new render node by using the vegetation instance data. | `Vegetation::InstanceData&` | None | No  |
| `DestroyInstance` | Queues the destruction of a render node that matches the instance ID. | `Vegetation::InstanceId` | None | No  |
| `DestroyAllInstances` | Queues the destruction of all render nodes. | None | None | No  |
| `Cleanup` | Destroys all render nodes, descriptor render groups, and any other resources. | None | None | No  |


## Technical details

The Vegetation Instance System component is responsible for managing the creation and destruction of individual vegetation instance render nodes.
It also binds the unique vegetation descriptor data to static object groups. 
These groups allow vegetation render nodes that have similar configurations to share resources and be batched together.

Requests to create or delete vegetation render nodes aren't handled immediately because render nodes and related objects must be managed on the main thread. 
Instead, the requests are queued into batches of tasks that run at every tick in the main thread. 
Since creating and deleting many render nodes can be expensive and block the main thread, tasks run in batches at every time slice, across multiple frames.