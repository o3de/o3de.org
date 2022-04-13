---
linkTitle: Creating a Component
title: Creating a Component in O3DE
description: Learn how to create Open 3D Engine (O3DE) components in C++.
weight: 200
---

A *component* in **Open 3D Engine (O3DE)** is a simple class that inherits from O3DE's `AZ::Component`. A component's behavior is determined by its reflected data and the actions that it takes when it is activated. This section shows you how to create O3DE components programmatically. For information about adding and customizing the components available in **O3DE Editor**, refer to the [Component Reference](/docs/user-guide/components/reference).

While every component is unique, the typical steps for creating a new component include the following:

1. Create the component class from the default component template, or from an existing component.
1. Register the component in the parent Gem module.
1. Implement the component class interface, using the `Init()`, `Activate()`, and `Deactivate()` functions.
1. Reflect component data for serialization and editing.
1. Reflect component data and methods for scripting.
1. Define component services, such as the provided and required services.

## Create your component class

1. Start with the following boilerplate code for a typical runtime component class. For editor and system components, get their boilerplate code from [Editor Components](editor-components) and [System Components](system-components), respectively.

    **MyComponent.h**

    ```cpp
    #pragma once

    #include <AzCore/Component/Component.h>

    namespace MyGem
    {
        class MyComponent
            : public AZ::Component
        {
        public:
            AZ_COMPONENT(MyGem::MyComponent, "{NEW-GUID-HERE}");

            // Required Reflect function.
            static void Reflect(AZ::ReflectContext* context);

            // Optional functions for defining provided and dependent services.
            static void GetProvidedServices(AZ::ComponentDescriptor::DependencyArrayType& provided);
            static void GetDependentServices(AZ::ComponentDescriptor::DependencyArrayType& dependent);
            static void GetRequiredServices(AZ::ComponentDescriptor::DependencyArrayType& required);
            static void GetIncompatibleServices(AZ::ComponentDescriptor::DependencyArrayType& incompatible);

        protected:
            // AZ::Component interface implementation.
            void Init() override          {}
            void Activate() override      {}
            void Deactivate() override    {}
        };
    } // namespace MyGem
    ```

    **MyComponent.cpp**

    ```cpp
    #include <MyComponent.h>

    #include <AzCore/Serialization/SerializeContext.h>
    #include <AzCore/Serialization/EditContext.h>

    namespace MyGem
    {
        void MyComponent::Reflect(AZ::ReflectContext* context)
        {
            context; // TODO: Add reflection code.
        }
    } // namespace MyGem
    ```

1. Add these files to your Gem's CMake source file list, for example: `<Gem>/Code/mygem_files.cmake`.

## Register the component

Registering a component enables the system's module manager to provide essential services to the component. Some of these services include loading system components in the proper order according to dependencies, and the association of type info with the various reflection contexts.

To register a component, you must add a component descriptor in the constructor of your Gem's `AZ::Module` implementation.

1. Find your Gem's `AZ::Module` class. If you created the Gem from the default Gem template, look for the file in `<Gem>/Code/Source/MyGemModuleInterface.h`.

1. Include your component's header in the class's implementation.

    Example:

    ```cpp
    #include <MyComponent.h>
    ```

1. In the class constructor, add a call to your component's static `CreateDescriptor` function.

    Example:

    ```cpp
    MyGemModuleInterface()
    {
        m_descriptors.insert(m_descriptors.end(), {
            // ...
            MyComponent::CreateDescriptor()
        });
    }
    ```

For more information about the Gem module system, refer to the overview in [Gem Module System](/docs/user-guide/programming/gems/overview).

## Implement the component class interface

To implement the component interface, start with the following steps that walk through the required and optional members of a component class:

1. Inherit from a component base class.

    Every component must include `AZ::Component` somewhere in its inheritance ancestry. Non-editor components generally inherit directly from `AZ::Component`, as in the following example:

    ```cpp
    class MyComponent
        : public AZ::Component
    ```

    Editor components typically inherit from `EditorComponentBase`. These components enable you to have editor-specific functionality that is different than what's needed at runtime. You can implement editor functionality in the editor component, and runtime functionality in the runtime component counterpart. For more information and additional implementation requirements, refer to [Editor Components](./editor-components.md) later in this section.

    Example editor component class:

    ```cpp
    class MyEditorComponent
        : public AzToolsFramework::Components::EditorComponentBase
    ```

    You can also create your own component class hierarchies to provide additional component types.

1. Use the `AZ_COMPONENT` macro to define a unique UUID for your component. The macro takes two arguments:

    1. The component type name. To help avoid name conflicts, we recommend that you use the namespace in any type of `AZ_RTTI` macros such as `AZ_COMPONENT`.

    1. A unique UUID. You may use any UUID generator to produce the value. Visual Studio provides this functionality through **Tools**, **Create GUID**. Use the **Registry Format** setting, and then copy and paste the value that is generated.
    A sample `AZ_COMPONENT` macro follows:

    ```cpp
    AZ_COMPONENT(MyGem::MyComponent, "{0C09F774-DECA-40C4-8B54-3A93033EC381}");
    ```

1. Override the base class functions.

    To define a component's behavior, override three `AZ::Component` functions: `Init`, `Activate`, and `Deactivate`:

    ```cpp
    void Init() override       {} // optional
    void Activate() override   {}
    void Deactivate() override {}
    ```

    These functions are described as follows:

    * `Init()`

        (Optional) Called only once for a given entity to initialize the component's internal state. Although the Init() function initializes the component, the component is not active until the system calls the component's Activate() function. We recommend that you minimize the component's CPU and memory overhead when the component is inactive.

    * `Activate()`

        (Required) Called when the owning entity is activated, provided that all services and components that the component depends on are present and active. The `Activate` function is always called _after_ any components that it depends on. To learn how to specify dependencies, refer to [Defining and Using Component Services](services). Typically in the `Activate()` function, a component performs setup procedures, connects to EBuses, and allocates resources or requests assets.

    * `Deactivate()`

        (Required) Called when the owning entity is deactivated. The order of deactivation is the reverse of activation, so your component is deactivated before the components it depends on. As a best practice, make sure your component returns to a minimal footprint when it is deactivated. A component should release all resources and disconnect from all EBuses. In general, deactivation should be symmetric to activation.

        Destruction does not necessarily follow deactivation. An entity can be deactivated and reactivated without being destroyed, therefore you should ensure that your components support this efficiently. Eventually when an entity is destroyed, O3DE calls `Deactivate()` first. Take care to author components with this in mind.

1. Use the reflection context as needed in the static `Reflect()` function to make your component objects available to other parts of the system.

    All components are AZ reflected classes. Because all components must be serializable and editable, they must contain a `Reflect()` function, as in the following example:

    ```cpp
    // Required Reflect function.
    static void Reflect(AZ::ReflectContext* context);
    ```

    The `Reflect()` function is also where you can expose methods, properties, and events to scripting systems such as Script Canvas and Lua.

    For more information, refer to [Reflecting a Component for Serialization and Editing](reflection/reflecting-for-serialization).

1. Implement the component services functions to define provided, dependent, required, and incompatible services.

    To define these logical services, use the following functions:

    ```cpp
    // Optional functions for defining provided and dependent services.
    static void GetProvidedServices(AZ::ComponentDescriptor::DependencyArrayType& provided);
    static void GetDependentServices(AZ::ComponentDescriptor::DependencyArrayType& dependent);
    static void GetRequiredServices(AZ::ComponentDescriptor::DependencyArrayType& required);
    static void GetIncompatibleServices(AZ::ComponentDescriptor::DependencyArrayType& incompatible);
    ```

    For details on how to implement these component services, refer to [Defining and Using Component Services](services).
