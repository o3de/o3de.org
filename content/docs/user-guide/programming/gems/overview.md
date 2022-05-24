---
linktitle: Overview
title: Gem Module System
description: An overview of the Open 3D Engine Gem system and module loader.
weight: 100
---

For Gems which ship with a code component, the resulting compiled library associated with the Gem is called a *module*. All Gem modules, regardless of whether they're used in a tool application such as the Editor or the runtime or dedicated servers, plug into the system in the same way. All modules have known entry point functions which are expected to be implemented **and** declared to be `#extern C`, on a class which derives from [`AZ::Module`](/docs/api/frameworks/azcore/class_a_z_1_1_module.html).

When an [`AzFramework::Application`](/docs/api/frameworks/azframework/class_az_framework_1_1_application.html) loads a Gem module, it uses an [`AZ::ModuleManager`](/docs/api/frameworks/azcore/class_a_z_1_1_module_manager.html) to do so. When the module manager receives a request to load a module, it loads the dynamic library and calls a series of specified entry points. Since project configuration files specify the Gems used by a project, normally this load is done automatically as part of an application call to its `Start(...)` method. For finer control over module loading, developers can always use a `ModuleManager` instance supplied by O3DE rather than let the application [bootstrapping](../bootstrap) process take care of it. Using manual methods allows developers to set their own specialized pre- and post-conditions on module loads that might be unrelated to Gem dependencies.

## How O3DE loads and initializes Gems

![An image describing the relationships between classes and the load/initialization/cleanup/unload process for Gems in the Open 3D Engine.](/images/user-guide/programming/gems/gem-load-flow.svg)

### Module entry point functions

All modules are required to provide the following functions, declared with the `extern "C" AZ_DLL_EXPORT` specifiers:

* `void InitializeDynamicModule(void* env)` - The function called immediately _after_ the module is loaded, passing it a pointer to an "environment instance" that can be queried for information such as EBuses, event handlers, and the memory allocator.
* `AZ::Module* CreateModuleClass()` - Creates an instance of the actual class representing the module, and returns it.
* `void DestroyModuleClass(AZ::Module*)` - Destroys the provided instance of the module.
* `void UninitializeDynamicModule()` - The function called immediately _before_ the module is unloaded. The module should clean up any static resources and environment information which are no longer needed, but were set up in `InitializeDynamicModule()`.

{{< important >}}
Although `CreateModuleClass()` and `DestroyModuleClass(AZ::Module*)` are called only once by the module loader (when creating an instance after load, and destroying the instance before unloading), this is not guaranteed behavior since end users may manually load modules. If your module requires singleton behavior, make sure to enforce it on your own to prevent developers from accidentally instantiating multiple objects.
{{< /important >}}

These module entry point functions are defined by the `AZ_DECLARE_MODULE_CLASS(...)` macro that's called in the Gem's `AZ::Module` class.

## The AZ_DECLARE_MODULE_CLASS(...) macro

Since many modules would use the same general boilerplate code to generate the entry point code, O3DE provides the `AZ_DECLARE_MODULE_CLASS(...)` macro, which generates standard entry point function implementations. The syntax for the macro is `AZ_DECLARE_MODULE_CLASS(<UUID>, <ModuleClassName>)`. By convention, the `<UUID>` used for modules associated with Gems should be `Gem_<GemName>`.

The `AZ_DECLARE_MODULE_CLASS(...)` macro is defined in the `AZ::Module` class that's located in the `/Code/Framework/AzCore/AzCore/Module` directory of the engine source.

## Example module class

The following C++ class is the most minimal possible O3DE module: It derives from `AZ::Module`, declares the necessary overrides, and generates the entry point functions. It provides no additional functionality. Note that this is an **implementation**, not a **definition**. This module implementation belongs to a Gem called `Example` for the purposes of following good naming conventions.

```cpp
class ExampleModule
    : public AZ::Module
{
    public:
    	AZ_RTTI(ExampleModule, "{CFC64EAF-7566-4D30-AAF4-A6FF19BF87DB}", AZ::Module);

        ExampleModule()
            : AZ::Module()
        {
	}
};

AZ_DECLARE_MODULE_CLASS(Gem_Example, Example)
```

## Monolithic builds and Gems

The module system can also function in *monolithic* mode. Enabling [monolithic builds](/docs/user-guide/build/reference/#build-configuration) causes dynamic modules to become static modules, and be linked directly to the application executables instead of dynamically loaded on startup. This allows developers to ship a single (large) server or client application executable. Monolithic builds can optimize startup time, as well as avoid performance issues or platform restrictions that might prevent the loading of dynamic libraries.
