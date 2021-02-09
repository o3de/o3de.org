---
description: ' Allocate and track memory in Amazon Lumberyard. '
title: Using Memory Allocators in Lumberyard
---
# Using Memory Allocators in Lumberyard {#memory-allocators}

Lumberyard's memory management system determines how memory is allocated\. In Lumberyard version 1\.16, the memory management system has been refactored\. All memory allocations go through one pipeline, and memory allocation can be tracked\. This makes it easier and quicker to pinpoint memory leaks or optimize memory usage to improve game performance\. This improvement is especially important for mobile and console applications, where memory resources are usually more constrained than in PC environments\.

Lumberyard supports all the best known memory allocation schemes\. You can use Lumberyard's allocators to categorize allocations or keep similar allocations together to improve locality or reduce fragmentation\.

**Note**
For best C\+\+ practices for managing memory in Lumberyard, see [Memory Management](/docs/userguide/programming/best-practices/lumberyard-memory-management.md)\.

**Topics**
+ [Manually Allocating Memory](#memory-allocators-manually-allocating-memory)
+ [AZ Memory Allocators](#memory-allocators-az-memory-allocators)
+ [Applying Allocators to Your Classes](#memory-allocators-applying-allocators-to-your-classes)
+ [AZ Allocator Schemas](#memory-allocators-az-allocator-schemas)
+ [Creating an Allocator](#memory-allocators-creating-an-allocator)
+ [Static Initialization](#memory-allocators-static-initialization)
+ [Legacy Memory Management](#memory-allocators-legacy-memory-management)
+ [Code Example: Automatic Unreflection of Module Classes](/docs/userguide/programming/memory/allocators-example-auto-unreflect.md)
+ [HPHA Memory Debugging](/docs/user-guide/features/engine/memory/debugging.md)
+ [Overrun Detection](/docs/user-guide/features/engine/memory/overrun-detection.md)

## Manually Allocating Memory {#memory-allocators-manually-allocating-memory}

Lumberyard uses the following memory allocation functions\. You can find the source code in the `lumberyard_version\dev\Code\Framework\AzCore\AzCore\Memory\` directory\.


****
[\[See the AWS documentation website for more details\]](/docs/userguide/programming/memory/allocators)

## AZ Memory Allocators {#memory-allocators-az-memory-allocators}

The following diagram illustrates the hierarchy of AZ memory allocators\.

![\[AZ memory allocator hierarchy\]](/images/userguide/memory-allocators-1.png)
+ **`OSAllocator`** - Acts as the interface to operating system memory and should be used for direct operating system allocations on the C heap\. `OSAllocator` is booted as early as possible in `main()`, and removed last, right before returning\. If you don't create `OSAllocator`, the `SystemAllocator` creates it when needed\.

  `OSAllocator` uses system calls to allocate memory\. The calls are not recorded or tracked\. Other allocators use `OSAllocator` to obtain memory from the operating system\. Drillers and memory tracking tools can use `OSAllocator` for data debugging\.
+ **`BestFitExternalMapAllocator`** - Uses external maps to store memory tracking information for uncached memory\.
+ **`SystemAllocator`** - The system allocator is the general purpose allocator for the AZ memory library\. Like all other allocators, `SystemAllocator` is a singleton, but it must be initialized first and destroyed last\. All other allocators use `SystemAllocator` for internal allocations\.
+ **`LegacyAllocator`** - Handles legacy memory allocations\. For more information, see [Legacy Memory Management](#memory-allocators-legacy-memory-management)\.
+ **`PoolAllocator`** - Performs extremely fast small object memory allocations\. `PoolAllocator` can allocate sizes in a range specified by `m_minAllocationSize` to `m_maxPoolSize`\.
**Note**
`PoolAllocator` is not thread safe\. If you need a thread\-safe version, use `ThreadPoolAllocator,` or inherit from `ThreadPoolBase` and then write custom code to handle the synchronization\.
+ **`ThreadPoolAllocator`** - Thread safe pool allocator\. If you want to create your own thread pool heap, inherit from `ThreadPoolBase`, as Lumberyard requires a unique static variable for the allocator type\.

## Applying Allocators to Your Classes {#memory-allocators-applying-allocators-to-your-classes}

To apply an allocator to your class, use the `AZ_CLASS_ALLOCATOR` macro in your class or directly call `AZ::AllocatorInstance`<*some\_allocator*>\.

AZCore relies on `AZ_CLASS_ALLOCATOR` to specify the default allocator for the class or on explicit `azcreate` and `azdestroy` calls that specify the allocator in their signature\.
+ If your class does not implement `AZ_CLASS_ALLOCATOR` and you call `new` or `delete`, `new` or `delete` calls use the global `operator new` or `operator delete`\.
+ If your class does not implement `AZ_CLASS_ALLOCATOR` and you call `aznew`, you must implement a `new` operator that uses the `aznew` call signature\.

## AZ Allocator Schemas {#memory-allocators-az-allocator-schemas}

Each allocator commonly implements the `IAllocator` interface and uses a schema to implement the allocation algorithms and bookkeeping\. This strategy enables the same schema to be used in multiple allocators\.


**Allocator Schemas**

| Schema | Description |
| --- | --- |
| AZ::HphaSchema |  This is the preferred schema\. It combines a small block allocator for small allocations and a [red\-black tree](https://en.wikipedia.org/wiki/Red-black_tree) for large allocations\. This provides good general purpose performance\. Use this schema if you're not sure which one to use\.  `HphaSchema` is based on Dimitar Lazarov's "High Performance Heap Allocator" \(Game Programming Gems 7, Charles River Media, 2008, pp\. 15-23\)\.   |
| AZ::HeapSchema |  Uses `nedmalloc` internally\. Because `nedmalloc` uses thread caches to accelerate the re\-use of memory, `HeapSchema` can be useful for intensive allocation processing across multiple threads\.  |
| AZ::BestFitExternalSchema |  A best\-fit allocation scheme that uses an external map to store bookkeeping outside the memory being managed\. Because the tracking node is stored outside the main chunk, Lumberyard can use this allocator with uncached memory\. This is most useful for GPU resource management \(for example, for textures, constant buffers, and compute buffers\)\.  |
| AZ::ChildAllocatorSchema |  Acts as a pass\-through schema to another allocator\. Use this schema to create a new allocator based on an existing allocator like `SystemAllocator`\. To properly tag the memory that each gem or logical subsystem allocates, each gem or subsystem can create its own child allocator\. For more information, see [Creating an Allocator](#memory-allocators-creating-an-allocator)\.  |
| AZ::PoolSchema |  A specialized schema that implements a small block allocator for managing small, high\-throughput allocations\. Objects are typically pooled at the cost of using more memory\.  `PoolSchema` is not thread safe\. If you need a thread\-safe version, use `ThreadPoolSchema` or write custom code to handle the synchronization\.   |
| AZ::ThreadPoolSchema |  A thread\-safe pool schema that uses thread local storage to implement a small block allocator for each thread\.  Because the thread pool allocator creates separate pools for each thread, it uses somewhat more memory, especially for fixed pool sizes\.   |

## Creating an Allocator {#memory-allocators-creating-an-allocator}

We recommend that each Lumberyard gem or logical subsystem create a `ChildAllocator` to properly tag the memory that it allocates\. This practice makes it easier to budget resource usage and get a holistic view of it\.

If you choose to write your own schema, be aware that caching significant chunks of memory can be problematic\. Such caching can hamper the ability of other systems to evolve to fit the content in your game\. Unless you have specific requirements, we recommend that you create a `ChildAllocator` that eventually uses the `SystemAllocator`\. Using a `ChildAllocator` ensures that your memory is as recoverable and reusable as possible\.

Prior to Lumberyard version 1\.16, the most common mechanism for creating a new allocator was to inherit from `SystemAllocator`\. This practice, which creates a completely separate free list of memory usage, results in the problem of memory being spread among disparate caches\. In most cases, it is better to use the inheritance `ChildAllocator<SystemAllocator>`, which also makes it trivial to swap the base class of your custom allocator\.

**To create an allocator**

1. Choose a schema to use, write a custom schema, or choose an existing allocator that you want to modify\. For more information, see [AZ Allocator Schemas](#memory-allocators-az-allocator-schemas)\.

1. Inherit from `AllocatorBase`<*your\_schema*> to create your `Allocator` class\.

1. Add `AZ_TYPE_INFO` so that `AllocatorInstance<>` can properly manage your type\.

### Using Your Own Allocators from Containers {#memory-allocators-using-your-own-allocators-from-containers}

To use your own allocator from a container, wrap your allocator in `AZ::AZStdAlloc`, like the following example\.

```
AZStd::vector<MyClass, AZ::AZStdAlloc<CustomAllocator>>
```

### Child Allocator Example {#memory-allocators-creating-a-child-allocator-example}

 The following code example adds a custom allocator for the [Script Canvas gem](/docs/userguide/gems/builtin/script-canvas.md)\.

**Example**

```
// Declaration of a child allocator for the ScriptCanvas module.
namespace ScriptCanvas
{
    class ScriptCanvasAllocator
        : public AZ::AllocatorBase<AZ::ChildAllocatorSchema<AZ::SystemAllocator>>
    {
    public:
        AZ_TYPE_INFO(ScriptCanvasAllocator, "{2C6478E2-3B0D-4DFF-88E2-ABCB3F10B96E}");
        using Schema = AZ::ChildAllocatorSchema<AZ::SystemAllocator>;
        using Base = AZ::AllocatorBase<Schema>;
        using Descriptor = Base::Descriptor;

        ScriptCanvasAllocator()
            : Base("Script Canvas Allocator", "Child Allocator used to track Script Canvas allocations")
        {
            m_schema = new (&m_schemaStorage) Schema(Descriptor());
        }

        pointer_type Allocate(size_type byteSize, size_type alignment, int flags, const char* name, const char* fileName, int lineNum, unsigned int suppressStackRecord) override
        {
            return Base::Allocate(byteSize, alignment, flags, name, fileName, lineNum, suppressStackRecord);
        }

        pointer_type ReAllocate(pointer_type ptr, size_type newSize, size_type newAlignment) override
        {
            return Base::ReAllocate(ptr, newSize, newAlignment);
        }
    };

    // Alias for using ScriptCanvasAllocator with std container types.
    using ScriptCanvasAZStdAlloc = AZ::AZStdAlloc<ScriptCanvasAllocator>;
} // namespace ScriptCanvas


// Specialize the AllocatorInstance for ScriptCanvas to provide the allocator stored within the ScriptCanvas gem.
// The allocator is stored with the ScriptCanvas module and therefore its lifetime lasts as long as the
// ScriptCanvas module is loaded.
namespace AZ
{
    template<>
    class AllocatorInstance<ScriptCanvas::ScriptCanvasAllocator>
    {
    public:
        using AllocatorType = ScriptCanvas::ScriptCanvasAllocator;
        using Descriptor = typename AllocatorType::Descriptor;
        friend class ScriptCanvas::ScriptCanvasModule;

        static AllocatorType& Get()
        {
            if(!s_scriptCanvasAllocatorRef)
            {
                if (AZ::Environment::IsReady())
                {
                    s_scriptCanvasAllocatorRef = AZ::Environment::FindVariable<AllocatorType>(AZ::AzTypeInfo<AllocatorType>::Name());
                    AZ_Error("ScriptCanvas", s_scriptCanvasAllocatorRef, "ScriptCanvasModule has not been loaded yet");
                }
            }
            return *s_scriptCanvasAllocatorRef;
        }

        static void Create(const Descriptor& desc = Descriptor())
        {
        }

        static void Destroy()
        {
        }

        static bool IsReady()
        {
            if(!s_scriptCanvasAllocatorRef)
            {
                s_scriptCanvasAllocatorRef = AZ::Environment::FindVariable<AllocatorType>(AZ::AzTypeInfo<AllocatorType>::Name());
            }
            return s_scriptCanvasAllocatorRef && s_scriptCanvasAllocatorRef->IsReady();
        }

    private:
        static AZ::EnvironmentVariable<ScriptCanvas::ScriptCanvasAllocator> s_scriptCanvasAllocatorRef;
    };

    AZ::EnvironmentVariable<ScriptCanvas::ScriptCanvasAllocator> AllocatorInstance<ScriptCanvas::ScriptCanvasAllocator>::s_scriptCanvasAllocatorRef;
```

In the following code example, the `ScriptCanvas` module creates and owns the child allocator\.

**Example**

```
// ScriptCanvas module creates and owns the child allocator.
namespace ScriptCanvas
{
    ////////////////////////////////////////////////////////////////////////////
    // ScriptCanvasModule
    ////////////////////////////////////////////////////////////////////////////

    // Stores an environment variable within the ScriptCanvas Module
    static AZ::EnvironmentVariable<ScriptCanvasAllocator> s_scriptCanvasAllocator;

    //! Create ComponentDescriptors and add them to the list.
    //! The descriptors will be registered at the appropriate time.
    //! The descriptors will be destroyed (and thus unregistered) at the appropriate time.
    ScriptCanvasModule::ScriptCanvasModule()
        : ScriptCanvasModuleCommon()
    {
        ScriptCanvasAllocator::Descriptor allocatorDescriptor;
        s_scriptCanvasAllocator = AZ::Environment::CreateVariable<ScriptCanvasAllocator>(AZ::AzTypeInfo<ScriptCanvasAllocator>::Name());
        s_scriptCanvasAllocator->Create(allocatorDescriptor);
    }

    ScriptCanvasModule::~ScriptCanvasModule()
    {
        s_scriptCanvasAllocator->Destroy();
    }

    AZ::ComponentTypeList ScriptCanvasModule::GetRequiredSystemComponents() const
    {
        return GetCommonSystemComponents();
    }
}
```

## Static Initialization {#memory-allocators-static-initialization}

In a monolithic build, at static initialization time \(before the allocators are bootstrapped\), allocations are routed directly to the underlying operating system\. These static allocations are tracked in a fixed size set and sent back to the OS when they are freed\. They are also reported separately to memory tracking in the `Global` category\. To discover the memory that is being allocated globally, set a breakpoint in `AZ::Internal::GlobalAlloc`\.

## Legacy Memory Management {#memory-allocators-legacy-memory-management}

Starting in Lumberyard version 1\.16, all `Cry*` allocation routines route to `AZ::LegacyAllocator`, which you can find in the `lumberyard_version\dev\Code\CryEngine\CryCommon\LegacyAllocator.h` file\. `LegacyAllocator` has the same lifetime as `OSAllocator` and obtains its memory from `OSAllocator`\.

`Cry` dynamic\-link libraries override the `new` and `delete` functions instead of tagging their classes with allocators\. This behavior is controlled with the `USE_CRY_NEW_AND_DELETE` macro \(`lumberyard_version\dev\Code\CryEngine\CryCommon\CryMemoryManager_impl.h`\)\. This practice should not be used outside `Cry` DLLs\. When compiled monolithically, the `LegacyAllocator` catches any uses of global `new` or `delete`\. This allows all allocations to be tracked and managed\.

**Note**
As of Lumberyard version 1\.16, `operator new` and `operator delete` overrides are restricted to Cry DLLs\.

All `Cry` static functions that allocate memory have been removed or wrapped in `StaticInstance<T>`, which creates the functions only when the functions are first accessed\. `StaticInstance<T>` can be used in any DLL which depends on `CryCommon` and includes the `lumberyard_version\dev\Code\CryEngine\CryCommon\platform_impl.h` file\.

**Note**
Within AZ code, there is a `NewAndDelete.inl` file in the `lumberyard_version\dev\Code\Framework\AzCore\AzCore\Memory\` directory\. You can use this code within a gem DLL, but only in nonmonolithic mode\. We do not recommended using this code except to track down untagged classes or allocations\.