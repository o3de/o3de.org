---
linktitle: System Components
title: System Components in O3DE
description: Learn how to create system components in Open 3D Engine.
weight: 600
---

System components are similar to other components in the component entity framework of **Open 3D Engine (O3DE)**. However, instead of creating game entity behavior, they control the behavior of the engine itself. System components are first-class elements of the game engine and are included at a deep level early in the initialization process. System components are registered onto the main [`Az::Module`](/docs/api/frameworks/azcore/class_a_z_1_1_module.html) class of a Gem, activated when the Gem is loaded, and deactivated when the Gem is unloaded.

Like any O3DE [component](/docs/user-guide/programming/components/create-component/), a system component can provide services and can depend on or require other system component services. O3DE provides precise control over the order of engine initialization and system dependencies.

When you author system components, follow the [best practices for component authoring](/docs/user-guide/programming/components/entity-system-pg-components-ebuses-best-practices). For example, your system components should use:

* [The EBus system](/docs/user-guide/programming/messaging/ebus) to expose their interfaces.
* [Reflection contexts](/docs/user-guide/programming/components/reflection/) to serialize and edit settings.
* The [AZ::Component](/docs/api/frameworks/azcore/class_a_z_1_1_component.html) class to activate or deactivate the system component.

{{< important >}}
Just like game components, system components often provide request and notification buses. However, because system components are global systems, they should not specify IDs for their buses like game components. Game developers should be able to call your system's EBuses without having to deal with or know about the system entity that contains all system components.
{{< /important >}}

For an example of a Gem that provides system components, the `HttpRequestor` Gem that O3DE ships with has an implementation of a system component referenced throughout this topic. The Gem source is located at `Gems/HttpRequestor/Code` in the O3DE source.

## Creating a system component in a Gem

O3DE enables the creation of custom system components through Gems and AZ modules. Gems are a specialization of [AZ modules](/docs/user-guide/programming/gems/overview). Most O3DE games organize their game code in one or more Gems. These Gems can contain system components that integrate with the game engine in addition to runtime and editor components for use with game entities.

When you create a system component as part of a Gem, follow these requirements:

* The Gem's `GetRequiredSystemComponents()` function must return the system component.
* The `<GemName>Bus.h` file goes under the `Code/Include/<GemName>` directory.
* The component source files go under the `Code/Source` directory.

## Making a component a system component

After you create the code for your component, add it to your project's system entity to make it a system component.

1. Use the `GetRequiredSystemComponents()` function to add your component to the system entity for your project during application startup.

   The following example is from `HttpRequestorModule.cpp`.

   ```cpp
   #include "HttpRequestorSystemComponent.h"
   #include <AzCore/Module/Module.h>

   namespace HttpRequestor
   {
       class HttpRequestorModule
           : public AZ::Module
       {
       public:
           AZ_RTTI(HttpRequestorModule, "{FD411E40-AF83-4F6B-A5A3-F59AB71150BF}", AZ::Module);

           HttpRequestorModule()
               : AZ::Module()
           {
               // Push results of [MyComponent]::CreateDescriptor() into m_descriptors here.
               m_descriptors.insert(m_descriptors.end(), {
                   HttpRequestorSystemComponent::CreateDescriptor(),
               });
           }

           /**
            * Add required SystemComponents to the SystemEntity.
            */
           AZ::ComponentTypeList GetRequiredSystemComponents() const override
           {
               return AZ::ComponentTypeList{
                   azrtti_typeid<HttpRequestorSystemComponent>(),
               };
           }
       };
   }
   ...
   ```

1. (Optional) Expose the system component to the System Entity Editor. This enables game developers to configure the component's properties on a per-project basis. To do so, reflect the system component to the `EditContext` and set the `AppearsInAddComponentMenu` field to `System`.

   The following example is from `HttpRequestorSystemComponent.cpp`.

   ```cpp
   ...
   #include "HttpRequestor_precompiled.h"

   #include <AzCore/Serialization/SerializeContext.h>
   #include <AzCore/Serialization/EditContext.h>

   #include "HttpRequestorSystemComponent.h"

   namespace HttpRequestor
   {
   ...
       void HttpRequestorSystemComponent::Reflect(AZ::ReflectContext* context)
       {
           if (AZ::SerializeContext* serialize = azrtti_cast<AZ::SerializeContext*>(context))
           {
               serialize->Class<HttpRequestorSystemComponent>()
                   ->Version(1)
                   ;

               if (AZ::EditContext* ec = serialize->GetEditContext())
               {
                   ec->Class<HttpRequestorSystemComponent>("HttpRequestor", "Will make HTTP Rest calls")
                       ->ClassElement(AZ::Edit::ClassElements::EditorData, "")
                           // ->Attribute(AZ::Edit::Attributes::Category, "") Set a category
                           ->Attribute(AZ::Edit::Attributes::AppearsInAddComponentMenu, AZ_CRC("System"))
                           ->Attribute(AZ::Edit::Attributes::AutoExpand, true)
                       ;
               }
           }
       }
   ...
   }
   ```

    The `"HttpRequestor"` and `"Will make HTTP Rest calls"` string parameters specify the UI name and tooltip information for the component in the **Add Component** list. The `Category` field specifies the group in which the component appears. In this case, no category is specified, so the group is **Miscellaneous** by default.

    The following image shows the result in the System Entity Editor.

    ![The HttpRequestor system component appears in the System Entity Editor Add Component menu](/images/user-guide/programming/components/component-entity-system-pg-creating-system-components-system-editor.png)
