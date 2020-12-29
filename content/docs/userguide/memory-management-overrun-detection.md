# Overrun Detection<a name="memory-management-overrun-detection"></a>

Overrun detection is an experimental feature available starting in Lumberyard version 1\.21\. It helps you detect corrupted memory at the time that the corruption occurs\. If you think memory corruption might be caused by read or write operations outside of allocated memory, overrun detection can help you detect the problem\.

**Note**  
Overrun detection mode is similar to the Microsoft Debugging Tools for Windows [GFlags with full page heap verification](https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/gflags-and-pageheap)\. However, it can be used with the Lumberyard memory allocators and does not require recompiling\.

## Prerequisites and Limitations<a name="memory-management-overrun-detection-prerequisites-and-limitations"></a>

The following are the prerequisites and limitations for using the Lumberyard overrun detection feature:
+ You must build and run your project for Windows PC in a Debug or Profile build\.
+ Overrun detection is available only on platforms that use the Windows API\.
+ Only allocations that go through the [Lumberyard allocators](memory-allocators.md) benefit from overrun detection\. Allocations that go through `new` or `malloc` do not use overrun detection unless you overload those functions to use the Lumberyard allocators\.

## When to Enable Overrun Detection<a name="memory-management-overrun-detection-when-to-enable"></a>

The most common indicator of overwritten memory is a crash that occurs with no obvious explanation\. The crash frequently occurs in a low\-level system or structure, such as an `AZStd::` container, or within the memory allocator\. The memory overrun is not an out\-of\-memory error\.

## Enabling Overrun Detection<a name="memory-management-overrun-detection-enabling"></a>

Overrun detection is enabled by a setting in your project's `Game.xml` file\.

**To enable overrun detection**

1. Open your project's `lumberyard_version\dev\project_name\Config\Game.xml` file\.

1. Change `useOverrunDetection` from the default `false` to `true`, as shown in the following example\.

   ```
   <Class name="bool" field="useOverrunDetection" value="true" type="{A0CA880C-AFE4-43CB-926C-59AC48496112}"/> 
   ```

## Using Overrun Detection<a name="memory-management-overrun-detection-using"></a>

When overrun detection is enabled, debug your game as usual\. Keep the following points in mind:
+ Your game runs more slowly and uses significantly more memory with overrun detection enabled\.
+ If a system reads or writes outside allocated memory, the game crashes with a call stack at the point of the invalid read or write\. An invalid read or write includes the usual `Exception thrown: invalid read/write` message near the end of the output\. If this message does not appear, the exception is not a memory read or write bug\.
+ If the game doesn't crash, but locks up instead, you can pause the debugger to see where the game stopped\.

**Note**  
The detector doesn't always release memory after the memory is acquired from the operating system\. Depending on the game, the detector can increase memory consumption as gameplay continues\. If you run out of memory when you use the detector, a crash occurs in either `WindowsPlatformAllocator::ReserveBytes` or `WindowsPlatformAllocator::CommitBytes`\.

## Source Code Location<a name="memory-management-overrun-detection-source-code"></a>

For the source code, see `lumberyard_version\dev\Code\Framework\AzCore\AzCore\Memory\OverrunDetectionAllocator.*`