---
linkTitle: Creating a Component
title: Creating a Component in O3DE
description: Learn how to create Open 3D Engine (O3DE) components in C++.
weight: 200
---

A *component* in **Open 3D Engine (O3DE)** is a simple class that inherits from O3DE's `AZ::Component`. A component's behavior is determined by its reflected data and the actions that it takes when it is activated. This section shows you how to create O3DE components programmatically. For information about adding and customizing the components available in **O3DE Editor**, refer to the [Component Reference](/docs/user-guide/components/reference).

## Component example

Boilerplate code for a component class:

```cpp
#include <AzCore/Component/Component.h>

class MyComponent
      : public AZ::Component
{
public:
      AZ_COMPONENT(MyComponent, "{0C09F774-DECA-40C4-8B54-3A93033EC381}", AZ::Component);

      // AZ::Component interface implementation.
      void Init() override          {}
      void Activate() override      {}
      void Deactivate() override    {}

      // Required Reflect function.
      static void Reflect(AZ::ReflectContext* context);

      // Optional functions for defining provided and dependent services.
      static void GetProvidedServices(AZ::ComponentDescriptor::DependencyArrayType& provided);
      static void GetDependentServices(AZ::ComponentDescriptor::DependencyArrayType& dependent);
      static void GetRequiredServices(AZ::ComponentDescriptor::DependencyArrayType& required);
      static void GetIncompatibleServices(AZ::ComponentDescriptor::DependencyArrayType& incompatible);
};
```

## Component members

The required and optional members that a component comprises are as follows:

* Inheritance from `AZ::Component`

    Every component must include `AZ::Component` somewhere in its inheritance ancestry. Noneditor components generally inherit directly from `AZ::Component`, as in the following example:

    ```cpp
    class MyComponent
        : public AZ::Component
    ```

    You can also create your own component class hierarchies.

* `AZ_COMPONENT` macro

    Every component must specify the `AZ_COMPONENT` macro in its class definition. The macro takes two arguments:

    1. The component type name.

    1. A unique UUID. You may use any UUID generator to produce the value. Visual Studio provides this functionality through **Tools**, **Create GUID**. Use the **Registry Format** setting, and then copy and paste the value that is generated.
    A sample `AZ_COMPONENT` macro follows:

    ```cpp
    AZ_COMPONENT(MyComponent, "{0C09F774-DECA-40C4-8B54-3A93033EC381}", AZ::Component);
    ```

* `AZ::Component` override functions

    To define a component's behavior, you generally override three `AZ::Component` functions: `Init`, `Activate`, and `Deactivate`:

    ```cpp
    void Init() override       {}
    void Activate() override   {}
    void Deactivate() override {}
    ```

    These functions are described as follows:

    * `Init()`

        (Optional) Called only once for a given entity. It requires minimal construction or setup work, since the component may not be activated anytime soon. An important best practice is to minimize your component's CPU and memory overhead while the component is inactive.

    * `Activate()`

        (Required) Called when the owning entity is being activated. The system calls your component's `Activate()` function only if all dependent or required services are present. Your `Activate` function is always called after any components that it depends on. In addition, the component makeup of an entity never changes while the entity is active. Consequently, it is safe to cache pointers or references to other components on the entity when performance is critical.

    * `Deactivate()`

        (Required) Called when the owning entity is being deactivated. The order of deactivation is the reverse of activation, so your component is deactivated before the components it depends on. As a best practice, make sure your component returns to a minimal footprint when it is deactivated. In general, deactivation should be symmetric to activation.

        Destruction does not necessarily follow deactivation. An entity can be deactivated and then activated again without being destroyed, so ensure that your components support this efficiently. However, when you do destroy your entity, O3DE ensures that your `Deactivate()` function is called first. Components must be authored with this in mind.

* Static `Reflect()` function

    (Required) All components are AZ reflected classes. Because all components must be serializable and editable, they must contain a `Reflect()` function, as in the following example:

    ```cpp
    // Required Reflect function.
    static void Reflect(AZ::ReflectContext* context);
    ```

    For more information, refer to [Reflecting a Component for Serialization and Editing](reflection/reflecting-for-serialization).

* Logical services

    (Optional) Components can define any combination of logical services that they provide, depend on, require, or are incompatible with. To define these logical services, use the following functions:

    ```cpp
    // Optional functions for defining provided and dependent services.
    static void GetProvidedServices(AZ::ComponentDescriptor::DependencyArrayType& provided);
    static void GetDependentServices(AZ::ComponentDescriptor::DependencyArrayType& dependent);
    static void GetRequiredServices(AZ::ComponentDescriptor::DependencyArrayType& required);
    static void GetIncompatibleServices(AZ::ComponentDescriptor::DependencyArrayType& incompatible);
    ```

    For more information about component services, refer to [Defining and Using Component Services](services).
