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
1. Implement the component class interface using the `Init()`, `Activate()`, and `Deactivate()` functions.
1. Reflect component data for serialization and editing.
1. Reflect component data and methods for scripting.
1. Define component services, such as the provided and required services.

## Create your component class

Use the `o3de` CLI script in the O3DE `scripts` directory to create a common runtime component from the default component template. For editor and system components, you can find their boilerplate code in [Editor Components](editor-components) and [System Components](system-components), respectively.

1. Use the [`create-from-template`](/docs/user-guide/project-config/cli-reference/#create-from-template) command to create the component in the destination directory.

    {{< tabs name="Create component from template" >}}
    {{% tab name="Windows" %}}

Format:

```cmd
scripts\o3de.bat create-from-template -dp <destination-dir> -dn <component-name> -tn DefaultComponent -kr -r ${GemName} <gem-name>
```

{{< tip >}}
If you would like to keep the default license, include the `-kl` parameter.
{{< /tip >}}

The template appends the word "Component" to the component name you provide.

Supply the component's namespace as the replacement value for the `${GemName}` placeholder variable. In many cases, this namespace is the same as the Gem name.

For example, to create a component called `MyTestComponent` in the `MyGem` namespace, do the following:

```cmd
scripts\o3de.bat create-from-template -dp MyCode -dn MyTest -tn DefaultComponent -kr -r ${GemName} MyGem
```

{{< note >}}
When using the replace parameter in Windows PowerShell, you must use a single quote around any `$` replacement variables. Example: `-r '${GemName}' MyGem`.
{{< /note >}}

To create the component in an existing directory, such as the `Code` directory of a Gem that's in progress, add the `-f` option to the `create-from-template` command to force the creation of the component files there.

For example, to create a component called `MyTestComponent` in the `MyGem` namespace in the Gem's `Code` directory, do the following:

```cmd
scripts\o3de.bat create-from-template -dp C:\Gems\MyGem\Code -dn MyTest -tn DefaultComponent -kr -r ${GemName} MyGem -f
```

    {{% /tab %}}
    {{% tab name="Linux" %}}

Format:

```bash
scripts/o3de.sh create-from-template -dp <destination-dir> -dn <component-name> -tn DefaultComponent -kr -r ${GemName} <gem-name>
```

{{< tip >}}
If you would like to keep the default license, include the `-kl` parameter.
{{< /tip >}}

The template appends the word "Component" to the component name you provide.

Supply the component's namespace as the replacement value for the `${GemName}` placeholder variable. In many cases, this namespace is the same as the Gem name.

For example, to create a component called `MyTestComponent` in the `MyGem` namespace, do the following:

```bash
scripts/o3de.sh create-from-template -dp MyCode -dn MyTest -tn DefaultComponent -kr -r ${GemName} MyGem
```

To create the component in an existing directory, such as the `Code` directory of a Gem that's in progress, add the `-f` option to the `create-from-template` command to force the creation of the component files there.

For example, to create a component called `MyTestComponent` in the `MyGem` namespace in the Gem's `Code` directory, do the following:

```bash
scripts/o3de.sh create-from-template -dp Gems/MyGem/Code -dn MyTest -tn DefaultComponent -kr -r ${GemName} MyGem -f
```

    {{% /tab %}}
    {{< /tabs >}}

1. The default component template produces three source files. If you did not create these files in the desired source directory, move them there now:

    * `Include/<gem-name>/<component-name>Interface.h`
    * `Source/<component-name>Component.cpp`
    * `Source/<component-name>Component.h`

    Typically, the bus interface header is placed in a Gem's public include directory: `Code/Include/<gem-name>`. The two component source files go into a Gem's `Code/Source` directory.

    {{< note >}}
If you decide to put the interface header in a different directory than `Include/<gem-name>`, you must adjust its include path in the component header.
    {{< /note >}}

1. Add the interface header to your Gem's API CMake source file list. For example: `<Gem>/Code/mygem_api_files.cmake`.

1. Add the two component files to your Gem's private CMake source file list. For example: `<Gem>/Code/mygem_private_files.cmake`.

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

    Editor components typically inherit from `EditorComponentBase`. These components enable you to have editor-specific functionality that is different than what's needed at runtime. You can implement editor functionality in the editor component, and runtime functionality in the runtime component counterpart. For more information and additional implementation requirements, refer to [Editor Components](./editor-components.md).

    Example editor component class:

    ```cpp
    class MyEditorComponent
        : public AzToolsFramework::Components::EditorComponentBase
    ```

    You can also create your own component class hierarchies to provide additional component types.

1. Use the `AZ_COMPONENT` macro to define a universally unique identifier (UUID) for your component. The macro takes two arguments:

    * The component type name. To help avoid name conflicts, we recommend that you use the namespace in any type of `AZ_RTTI` macros such as `AZ_COMPONENT`.

    * A unique UUID. You may use any UUID generator to produce the value. Visual Studio provides this functionality through **Tools**, **Create GUID**. Use the **Registry Format** setting, and then copy and paste the value that is generated.
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

        (Optional) Called only once for a given entity to initialize the component's internal state. Although the `Init()` function initializes the component, the component is not active until the system calls the component's `Activate()` function. We recommend that you minimize the component's CPU and memory overhead when the component is inactive.

    * `Activate()`

        (Required) Called when the owning entity is activated, provided that all services and components that the component depends on are present and active. The `Activate()` function is always called _after_ any components that it depends on. For information about how to specify dependencies, refer to [Defining and Using Component Services](services). Typically in the `Activate()` function, a component performs setup procedures, connects to **Event Buses (EBuses)**, and allocates resources or requests assets.

    * `Deactivate()`

        (Required) Called when the owning entity is deactivated. The order of deactivation is the reverse of activation, so your component is deactivated before the components it depends on. As a best practice, make sure your component returns to a minimal footprint when it is deactivated. A component should release all resources and disconnect from all EBuses. In general, deactivation should be symmetric to activation.

        Destruction does not necessarily follow deactivation. An entity can be deactivated and reactivated without being destroyed, therefore you should ensure that your components support this behavior efficiently. Eventually when an entity is destroyed, O3DE calls `Deactivate()` first. Take care to author components with this in mind.

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
