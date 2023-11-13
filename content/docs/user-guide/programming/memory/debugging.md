---
description: ' Debug HPHA allocator memory issues in Open 3D Engine. '
title: HPHA Memory Debugging
---

The HPHA memory allocator provides memory debugging features to detect and trace common memory issues.

## Enabling HPHA Memory Debugging 

To avoid performance issues, debugging features are disabled by default.

**To enable HPHA memory debugging**

1. In the system allocator source file [SystemAllocator.cpp](https://github.com/o3de/o3de/blob/298cb5945b35fdc2d016501b5d16235536332292/Code/Framework/AzCore/AzCore/Memory/SystemAllocator.cpp#L54) file, change the HphaSchema to use the HphaSchemaBase with the debug option set to true:

```c++
m_subAllocator = AZStd::make_unique<HphaSchemaBase<true>>();
```

2. Save the file.

3. Perform a build in debug mode. For more information, see [Building O3DE projects](/docs/user-guide/build/).

## Characteristics and Limitations 

Because of certain limitations, the HPHA debugger can help find memory issues but cannot guarantee their absence. When using HPHA memory debugging features, note the following:
+ For the HPHA debugger to work, allocations must use the HPHA allocator. HPHA memory debugging does not cover allocations created by other allocators such as a `PoolAllocator`.
+ Most of the HPHA memory debugging features assert when they detect a memory issue. When possible, the debugger prints a stack trace that indicates where the allocation happened. The stack trace is printed into the debugger output (not to the log) so that Visual Studio can recognize it. This makes it possible to double-click a trace and navigate directly to the corresponding file and line number.
+ The HPHA memory debugger does not currently cover the following memory issues:
  + Buffer underflows.
  + "Far" buffer overflows. When detecting buffer overflows, O3DE detects changes up to 16 bytes after the memory block. If a buffer overflow writes on byte 17, O3DE does not detect it.
+ O3DE shuts down by terminating the application rather than by destroying objects. Because O3DE relies on the operating system to recover memory, it cannot detect issues related to shutdowns or the destruction of objects. To reproduce, isolate, and debug such memory issues, we recommend that you use unit tests.

## How Memory Debugging Works 

Some memory debugging features detect memory issues when an allocation is freed, and others detect issues when the HPHA allocator is destroyed. The memory debugging works by keeping a set of debug records for each allocation. When memory is requested or returned, the debugger compares the allocation or deallocation operation with the debug records. When anomalies are detected, the debugger enforces rules with asserts. The following sections describe the asserts that occur for the different memory operations.

### Enabling Overrun Detection

The [AZ::AllocatorDebug::UsesMemoryGuard](https://github.com/o3de/o3de/blob/298cb5945b35fdc2d016501b5d16235536332292/Code/Framework/AzCore/AzCore/Memory/IAllocator.h#L105-L106) property can be used when implementing the IAllocator [GetDebugConfig()](https://github.com/o3de/o3de/blob/298cb5945b35fdc2d016501b5d16235536332292/Code/Framework/AzCore/AzCore/Memory/SystemAllocator.cpp#L58-L65) function to turn on memory overrun detection.  

### Allocations 

For memory allocation operations, the debugger performs the following tasks:
+ If a previous allocation has the same pointer, the debugger asserts and prints the stack trace of the previous allocation. This usually occurs when a process overwrites the memory for the allocator's tracking structures. Because the allocator uses memory near the blocks that it allocates, a memory overflow or underflow in a neighboring block can overwrite the memory that the HPHA uses for memory tracking. When this occurs, the HPHA might consider a used block of memory to be "unused".
+ Fills the memory with a [quiet NaN](https://en.wikipedia.org/wiki/NaN) (qNaN) pattern \(`0xFF, 0xC0, 0xC0, 0xFF`\). This is useful for detecting specific patterns of use in uninitialized memory and can detect most (but not all) cases. For more information about the qNaN pattern, see [Deallocations](#memory-management-debugging-hpha-deallocations).

### Deallocations 

For memory deallocation operations, the debugger performs the following tasks:
+ Asserts if the debug record is not found. This can happen because of double deallocations or the deallocation of an invalid pointer.
+ Asserts if a guard is invalid. When an allocation occurs, an additional 16 bytes ("the guard") are placed at the end of the allocation. For example, if the request is for 40 bytes, 56 bytes are assigned and 16 are used for the guard. Memory debugging assigns random values to the 16 bytes and places them in the debug record. When the deallocation happens, the 16 bytes are checked against the 16 bytes stored in the debug record. If they mismatch, the debugger asserts. This assert usually indicates a memory overflow (that is, an attempt to write beyond the requested size).

    {{< note >}}
This check cannot detect the cases in which the overflow writes the exact same random bytes or writes beyond the 16 byte guard.
{{< /note >}}

+ Asserts if the freed size does not match the allocation size. During allocation, the requested size is stored in the debug record. If the same size is not freed, a problem occurred during the deallocation.
+ Refills the freed memory with the qNaN pattern. This makes it easier to detect memory accesses after the memory has been deallocated. Without this feature, the memory contents are usually available until some code reuses the memory. Filling the freed memory with the qNaN pattern helps detect this anomalous usage early.

### Reallocations 

Reallocations use a new block or an existing block depending on whether contiguous memory is available.

#### Reallocation to a New Block 

When contiguous memory is not available, memory is reallocated to a new block. The debugger performs the following tasks:
+ Asserts if the previous allocation is not found. Normally, the previous allocation still exists. The allocator creates a new allocation with a new memory address and then copies the contents of the previous allocation to the new allocation. If the pointer to the previous allocation is not in the debug records, the debugger asserts.
+ Asserts if the guard of the previous allocation is invalid. For information on guards, see [Deallocations](#memory-management-debugging-hpha-deallocations).
+ Asserts if a previous allocation has the same address as the new allocation. For more information, see [Allocations](#memory-management-debugging-hpha-allocations).
+ Fills the memory for the new allocation with the qNaN pattern. The previous block is copied over. The remaining unused part of the new allocation should have the qNaN pattern.

#### Reallocation to an Existing Block 

When contiguous memory is available, the pointer to an existing block is used. The debugger performs the following tasks:
+ Asserts if the allocation is not found.
+ Asserts if the guard of the previous allocation is invalid. For information on guards, see [Deallocations](#memory-management-debugging-hpha-deallocations).
+ Updates the debug record stack.
+ Because the size has changed, writes a new guard.
