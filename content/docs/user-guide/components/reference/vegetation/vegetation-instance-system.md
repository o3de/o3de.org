---
linkTitle: Vegetation Instance System
title: Vegetation Instance System Component
description: Manages and processes requests to create and destroy vegetation instances in Open 3D Engine (O3DE). 
---

The Vegetation Instance System component manages and processes requests to create and destroy vegetation instances, or objects, throughout your world.

For information about how the Vegetation Instance System component works within the vegetation system, see the [Technical details](#technical-details) section in this topic.

{{< note >}} 
This is a system component, meaning it already exists when you add the vegetation system through the Vegetation Gem. You can configure vegetation instance properties per level, through the **Vegetation System Settings** level component.
{{< /note >}}

## Provider

[Vegetation Gem](/docs/user-guide/gems/reference/environment/vegetation/)

## Source code

[`Gems/Vegetation/Code/Source/InstanceSystemComponent.h`](https://github.com/o3de/o3de/blob/development/Gems/Vegetation/Code/Source/InstanceSystemComponent.h)


## Properties

| Property| Description | Values | Default |
| --- | --- | --- | --- |
| **Max Instance Process Time Microseconds** | The number of microseconds per tick for processing instance spawn and despawn tasks. | 0 - 33000 | 500 |
| **Max Instance Task Batch Size** | The number of individual instance spawn and despawn tasks that can be batch processed together.| 1 - 2000 | 100 |
## InstanceSystemRequestBus

File: [Gems/Vegetation/Code/Include/Vegetation/Ebuses/InstanceSystemRequestBus.h](https://github.com/o3de/o3de/blob/development/Gems/Vegetation/Code/Include/Vegetation/Ebuses/InstanceSystemRequestBus.h)

| Request Name | Description | Parameters | Return | Scriptable |
| --- | --- | --- | --- | --- |
| `RegisterUniqueDescriptor` | Compares the input descriptor against entries in a set of existing, registered descriptors. If a matching descriptor is found, it increments the reference count and returns a pointer to that entry. Otherwise a new entry is added by copying the input descriptor and returning it. | `Vegetation::Descriptor&` | `Vegetation::DescriptorPtr` | No |
| `ReleaseUniqueDescriptor` | Reduces the reference count of a unique descriptor and removes it if there are no more references. | `Vegetation::DescriptorPtr` | None | No |
| `CreateInstance` | Queues the creation of a new instances by using the vegetation instance data. | `Vegetation::InstanceData&` | None | No  |
| `DestroyInstance` | Queues the destruction of an instance that matches the instance ID. | `Vegetation::InstanceId` | None | No  |
| `DestroyAllInstances` | Queues the destruction of all instances. | None | None | No  |
| `Cleanup` | Destroys all instances and any other resources. | None | None | No  |


## Technical details

The Vegetation Instance System component is responsible for managing the creation and destruction of individual vegetation instances.
Requests to create or delete vegetation instances aren't handled immediately because instances and related objects must be managed on the main thread. 
Instead, the requests are queued into batches of tasks that run at every tick in the main thread. 
Because creating and deleting many instances can be expensive and block the main thread, tasks run in batches at every time slice, across multiple frames.