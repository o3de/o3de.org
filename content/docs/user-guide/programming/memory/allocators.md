---
description: ' Allocate and track memory in Open 3D Engine. '
title: Using Memory Allocators in O3DE
---

O3DE's memory management system determines how memory is allocated. All memory allocations go through one pipeline, and memory allocation can be tracked. This makes it easier and quicker to pinpoint memory leaks or optimize memory usage to improve game performance. This improvement is especially important for mobile platforms, where memory resources are usually more constrained than in PC environments.

O3DE supports several known memory allocation schemes. You can use O3DE's allocators to categorize allocations or keep similar allocations together to improve locality or reduce fragmentation.

{{< note >}}
For best C++ practices for managing memory in O3DE, see [Memory Management](/docs/user-guide/programming/memory-management).
{{< /note >}}

## AZ Memory Allocators 

The following diagram illustrates the hierarchy of AZ memory allocators.


![AZ memory allocator hierarchy](/images/user-guide/programming/memory/memory-allocators.svg)

+ **`OSAllocator`** - Acts as the interface to operating system memory and should be used for direct operating system allocations on the C heap. `OSAllocator` is lazily initialized on the first call to `AllocatorInstance<OSAllocator>::Get()`.

  `OSAllocator` uses OS system calls to allocate memory. The calls are not recorded or tracked by default, but can be by following the [Allocator Tagging Guide wiki startup config](https://github.com/o3de/o3de/wiki/Allocator-Tagging-Guide#startupcfg) section. Other allocators use `OSAllocator` to obtain memory from the operating system. 
+ **`SystemAllocator`** - The system allocator is the general purpose allocator for the AZ memory library. It is initialized with the first call to `AllocatorInstance<SystemAllocator>::Get()`. All other allocators use `SystemAllocator` for internal allocations.
+ **`PoolAllocator`** - Performs extremely fast small object memory allocations. `PoolAllocator` can allocate sizes in a range specified by `m_minAllocationSize` to `m_maxPoolSize`.

    {{< note >}}
`PoolAllocator` is not thread safe. If you need a thread-safe version, use `ThreadPoolAllocator,` or inherit from `ThreadPoolBase` and then write custom code to handle the synchronization.
{{< /note >}}

+ **`ThreadPoolAllocator`** - Thread safe pool allocator. If you want to create your own thread pool heap, inherit from `ThreadPoolBase`, as O3DE requires a unique static variable for the allocator type.

## Applying Allocators to Your Classes 

To apply an allocator to your class, use the `AZ_CLASS_ALLOCATOR` macro in your class or directly call `AZ::AllocatorInstance`<*some\_allocator*>.

AZCore relies on `AZ_CLASS_ALLOCATOR` to specify the default allocator for the class or on explicit `azcreate` and `azdestroy` calls that specify the allocator in their signature.
+ If your class does not implement `AZ_CLASS_ALLOCATOR`, calls to `new` or `delete` will use the global `operator new` or `operator delete`.
+ If your class does not implement `AZ_CLASS_ALLOCATOR` and you call `aznew`, a compile error will trigger indicating that the `operator new` must be overwritten.

## AZ Allocator Schemas 

Each allocator commonly implements the `IAllocator` interface and uses a schema to implement the allocation algorithms and bookkeeping. This strategy enables the same schema to be used in multiple allocators.


**Allocator Schemas**

| Schema | Description |
| --- | --- |
| AZ::HphaSchema |  This is the preferred schema. It combines a small block allocator for small allocations and a [red-black tree](https://en.wikipedia.org/wiki/Red-black_tree) for large allocations. This provides good general purpose performance. Use this schema if you're not sure which one to use.  `HphaSchema` is based on Dimitar Lazarov's "High Performance Heap Allocator" (Game Programming Gems 7, Charles River Media, 2008, pp. 15-23).   |
| AZ::ChildAllocatorSchema |  Acts as a pass-through schema to another allocator. Use this schema to create a new allocator based on an existing allocator like `SystemAllocator`. To properly tag the memory that each gem or logical subsystem allocates, each gem or subsystem can create its own child allocator. For more information, see [Creating an Allocator](#memory-allocators-creating-an-allocator).  |
| AZ::PoolSchema |  A specialized schema that implements a small block allocator for managing small, high-throughput allocations. Objects are typically pooled at the cost of using more memory.  `PoolSchema` is not thread safe. If you need a thread-safe version, use `ThreadPoolSchema` or write custom code to handle the synchronization.   |
| AZ::ThreadPoolSchema |  A thread-safe pool schema that uses thread local storage to implement a small block allocator for each thread.  Because the thread pool allocator creates separate pools for each thread, it uses somewhat more memory, especially for fixed pool sizes.   |

## Creating an Allocator 

We recommend that each O3DE gem or logical subsystem create a `ChildAllocatorSchema` to properly tag the memory that it allocates. This practice makes it easier to budget resource usage and get a holistic view of it.
Tagged memory usage can be viewed or written to files in several ways including running the `sys_DumpAllocators` or `sys_DumpAllocationRecordsToFile` console commands.

If you choose to write your own schema, be aware that caching significant chunks of memory can be problematic. Such caching can hamper the ability of other systems to evolve to fit the content in your game. Unless you have specific requirements, we recommend that you create a `ChildAllocatorSchema` that eventually uses the `SystemAllocator`. Using a `ChildAllocatorSchema` ensures that your memory is as recoverable and reusable as possible.

**To create an allocator**

1. Choose a schema to use, write a custom schema, or choose an existing allocator that you want to modify. For more information, see [AZ Allocator Schemas](#allocator-schemas).

1. Inherit from `AllocatorBase`<*your\_schema*> to create your `Allocator` class.

1. Add `AZ_RTTI` so that `AllocatorInstance<>` can properly manage your type.

### Using Your Own Allocators from Containers 

To use your own allocator from a container, wrap your allocator in `AZ::AZStdAlloc`, like the following example.

```
using CustomAllocator_for_std_t = AZ::AZStdAlloc<CustomAllocator>;
AZStd::vector<MyClass, CustomAllocator_for_std_t>;
```

### Child Allocator Example 

 For examples on how to use the `ChildAllocatorSchema`, refer to the [Allocator Tagging Guide](https://github.com/o3de/o3de/wiki/Allocator-Tagging-Guide) on the O3DE Wiki.
