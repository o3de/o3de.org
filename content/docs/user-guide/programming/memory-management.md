---
description: ' Learn best practices for memory management in Open 3D Engine. '
title: Memory Management
---

When managing memory in O3DE, use AZ memory management calls and avoid static variables whose constructors allocate memory or connect to EBuses.

## Memory Allocations

When allocating memory, use the following recommended practices:
+ Do not use `new`, `malloc`, and similar allocators directly. Instead, use AZ memory manager calls to `aznew`, `azmalloc`, `azfree`, `azcreate`, and `azdestroy`.
+ Specify the allocator in each class.
+ Use child allocators. To tag and track resource usage, new gems and subsystems should create their own allocator or create a `ChildAllocatorSchema` that references an existing allocator. For an example of creating a child allocator, see [Creating an Allocator](/docs/user-guide/programming/memory/allocators/).

**Reason**: O3DE's core AZ systems provide a memory managed environment, not a raw system allocator like the managed memory in C\# or Java. In O3DE, the core AZ systems provide speed, safety, and facilities for tracking memory usage.

For information about O3DE's scheme for allocators and new allocators, see [Manually Allocating Memory](/docs/user-guide/programming/memory/allocators/).

## O3DE Memory System Initialization

O3DE initializes its memory system via storing an instances of Allocators in an AZ Environment variables the first time a call to `AZ::AllocatorInstance<AllocatorType>::Get()` is called in [code](https://github.com/o3de/o3de/blob/development/Code/Framework/AzCore/AzCore/Memory/AllocatorInstance.h#L73-L86).  
To ensure that Allocators are available in static initialization and static de-initialization of the running application and any dynamically loaded Gem modules, the allocator AZ Environment variables are stored in the `O3DEKernel` shared library which is a link library dependency of the [AzCore Target](https://github.com/o3de/o3de/blob/development/Code/Framework/AzCore/CMakeLists.txt#L60-L98).  
All Gems and O3DE applications statically link the `O3DEKernel` target because they depend on the `AzCore` static library target.
On initial startup of the application, the `O3DEKernel` library is the first shared library loaded.  
O3DE Allocators are available for the entire duration of the application because loading of statically linked shared libraries occur before static initialization and unloading occurs after static de-initialization of the application.
Only one [AZ::Environnment](https://github.com/o3de/o3de/blob/development/Code/Framework/AzCore/AzCore/Module/Environment.h#L114-L115) instance exists and is accessed through the O3DEKernel via a DLL interface in `O3DEKernel.dll` (Windows), `libO3DEKernel.so` (Linux/Android) or `libO3DEKernel.dylib` (MacOS/iOS) to enforce the use of the one `AZ::Environment`.
