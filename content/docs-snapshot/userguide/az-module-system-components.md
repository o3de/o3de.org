# System Components<a name="az-module-system-components"></a>

A traditional game engine contains many singleton classes, each in charge of a major system\. In Lumberyard, these singletons are built using the same [component entity system](component-intro.md) that powers gameplay entities\. When an application starts, a *system entity* is created\. Components added to this entity are known as *system components*\. The system entity always has the ID `AZ::SystemEntityId (0)`\. 

When you build singletons as Lumberyard system components, you are using a powerful suite of complementary technologies that facilitate problem resolution through established patterns\. This topic describes system components in detail\. 

## Smart Initialization Order<a name="az-module-system-components-smart-initialization-order"></a>

As a game engine grows in size, it tends to develop many singleton classes\. A singleton class often requires communication with other singletons to function\. This means that the order in which singletons are initialized is very important\. Lumberyard solves this by building singletons as components\. 

A component can declare the services that it provides and the services on which it depends\. When components are activated, they are sorted according to these declared dependencies, ensuring proper initialization order\. 

The following example shows two components that Lumberyard has ordered for initialization\. 

```
class AssetDatabaseComponent : public Component
{
    ...
    
    static void GetProvidedServices(ComponentDescriptor::DependencyArrayType& provided)
    {
        provided.push_back(AZ_CRC("AssetDatabaseService"));
    }
    
    ...
};

class AssetCatalogComponent : public AZ::Component
{
    ...
    static void GetRequiredServices(AZ::ComponentDescriptor::DependencyArrayType& required)
    {
        required.push_back(AZ_CRC("AssetDatabaseService"));
    }
    ...
};
```

The example shows the following: 
+ `AssetDatabaseComponent` is activated before `AssetCatalogComponent`\.
+ In the `AssetDatabaseComponent` class, the `GetProvidedServices` function reveals that the class provides a service called `AssetDatabaseService`\.
+ In the `AssetCatalogComponent` class, the `GetRequiredServices` function reveals that `AssetCatalogComponent` depends on `AssetDatabaseService`\. Lumberyard understands this dependency and orders the initialization accordingly\. 

For more information about the initialization order of components, see [The AZ Bootstrapping Process](az-module-bootstrap.md)\.

## Easily Configurable Components<a name="az-module-system-components-easily-configurable"></a>

Often, a singleton has settings that are configurable for each game\. It can be difficult for a low\-level singleton to access configuration data if the system used to process this data hasn't started\. Therefore, low\-level singletons often rely on simple data sources such as command line parsers or `.ini` files\. 

A system component can expose its configuration through [AZ reflection](component-entity-system-reflect-component.md)\. The [Advanced Settings dialog box in the Project Configurator](az-module-system-entities-configuring.md) uses this feature to enable the configuration of system components on a per\-game basis\. The Project Configurator saves an [application descriptor file](az-module-system-entities-configuring.md#az-module-system-entities-configuring-app-descriptor-files) that contains the settings for each system component, and this file is used to bootstrap the application and configure each component before it is activated\. This is the same technology that the **[Entity Inspector](component-entity-inspector.md)** uses to configure gameplay entities in Lumberyard Editor\. 

For more information, see [Configuring System Entities](az-module-system-entities-configuring.md)\.

## Writing System Components<a name="az-module-system-components-writing"></a>

To designate a component as a system component, rather than a gameplay component, you must set the `AppearsInAddComponentMenu` field to `System` when you reflect to the `EditContext`\. 

The following example code designates the `MemoryComponent` as a system component\. 

```
void MemoryComponent::Reflect(ReflectContext* context)
{
    if (SerializeContext* serializeContext = azrtti_cast<SerializeContext*>(context))
    {
        ...
        if (EditContext* editContext = serializeContext->GetEditContext())
        {
            editContext->Class<MemoryComponent>("Memory System", "Manages memory allocators")
                ->ClassElement(AZ::Edit::ClassElements::EditorData, "")
                    ->Attribute(AZ::Edit::Attributes::AppearsInAddComponentMenu, AZ_CRC("System"))
                ...
        }
    }
}
```

For more information on writing system components, see [Creating System Components](component-entity-system-pg-creating-system-components.md)\.

## Required System Components<a name="az-module-system-components-required"></a>

Often, a module requires the existence of a system component\. This requirement can be established through the module's `GetRequiredSystemComponents()` function\. Any component type declared here is guaranteed to exist when the application starts\. 

In the following example, the Oculus gem requires the `OculusDevice` component\. 

```
AZ::ComponentTypeList OculusGem::GetRequiredSystemComponents() const override
{
    return AZ::ComponentTypeList{
        azrtti_typeid<OculusDevice>(),
    };
}
```

If a system component is optional, you can add it from [Advanced Settings in the Project Configurator](az-module-system-entities-configuring.md)\.