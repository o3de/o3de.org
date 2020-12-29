# Parts of an AZ Module, Explained<a name="az-module-parts"></a>

An AZ module has three key components: a class that inherits from `AZ::Module`, one or more public facing event buses, and a system component class\. 

This page describes module initialization, the use of system components as singletons, how EBus calls communicate with this singleton, and how to call the module externally after you have created it\. 

## The Module Class<a name="az-module-parts-module-class"></a>

Each AZ module must contain a class that inherits from `AZ::Module`\. When the module is loaded by an application, an instance of the class is created very early in the application's lifetime and its virtual functions are called at the appropriate times as the application goes through its [bootstrapping process](az-module-bootstrap.md)\. This class [reflects](component-entity-system-reflect-component.md) the components declared in the module and adds critical components to the [system entity](az-module-system-entities-configuring.md)\. 

**Note**  
At its core, every Lumberyard application has a single system entity\. When a Lumberyard application starts, it creates the system entity\. This entity's components, known as system components, power major systems within Lumberyard\. The system entity always has the ID `AZ::SystemEntityId (0)`\.

The following skeleton code shows the basic structure of an `AZ::Module` class\. 

```
namespace AZ
{
    /**
     * AZ::Module enables static and dynamic modules (aka LIBs and DLLs) to
     * connect with the running \ref AZ::ComponentApplication.
     *
     * Each module should contain a class which inherits from AZ::Module.
     * This class must perform tasks such as reflecting the classes within
     * the module and adding critical components to the system entity.
     */
    class Module
    {
    public:
        Module();
        virtual ~Module();

        /// Override to require specific components on the system entity.
        virtual ComponentTypeList GetRequiredSystemComponents() const;
    };
}
```

The `AZ::Module` class exposes all points of integration with the AZ framework as virtual functions\. These points of integration have been created as virtual functions on a class so that, whether initialization code is in a static or dynamic library, it’s written the same way as much as possible\. The very first actual initialization calls do need to be different for static and dynamic libraries\. Lumberyard provides a macro to define this uninteresting glue code and let you write the interesting initialization code within your `AZ::Module` class\. 

We recommend that your `AZ::Module` class contain as little implementation code as possible\. When the `AZ::Module` class is created, the application is just starting up and many systems are unavailable\. If the `AZ::Module` class spawns a singleton or manager class, there is no guarantee that the systems on which this singleton relies will be ready for use\. Instead, you should build your singletons as Lumberyard [system components](az-module-system-components.md), which can control their initialization order\. 

Beginning in Lumberyard 1\.5, gems are built using AZ modules\. The following example "HelloWorld" AZ module was made by [creating a new gem](gems-system-gems.md)\. The `CryHooksModule` class in this example is a helper wrapper around `AZ::Module` and provides your entire module access to `gEnv`\.

```
// dev/Gems/HelloWorld/Code/Source/HelloWorldModule.cpp   
#include "StdAfx.h"
#include <platform_impl.h>

#include "HelloWorldSystemComponent.h"

#include <IGem.h>

namespace HelloWorld
{
    class HelloWorldModule
        : public CryHooksModule
    {
    public:
        AZ_RTTI(HelloWorldModule, "{39C21561-D456-413F-8C83-4214F6DBC5A5}", CryHooksModule);

        HelloWorldModule()
            : CryHooksModule()
        {
            // Create descriptors for components declared within this module.
            m_descriptors.insert(m_descriptors.end(), {
                HelloWorldSystemComponent::CreateDescriptor(),
            });
        }

        // Add required system components to the system entity.
        AZ::ComponentTypeList GetRequiredSystemComponents() const override
        {
            return AZ::ComponentTypeList{
                azrtti_typeid<HelloWorldSystemComponent>(),
            };
        }
    };
}

// DO NOT MODIFY THIS LINE UNLESS YOU RENAME THE GEM
// The first parameter should be GemName_GemIdLower
// The second should be the fully qualified name of the class above
AZ_DECLARE_MODULE_CLASS(HelloWorld_010c14ae7f0f4eb1939405d439a9481a, HelloWorld::HelloWorldModule)
```

## The EBus<a name="az-module-parts-ebus"></a>

External code can call into your module, and receive events from your module, through the module's public [event buses](ebus-intro.md) \(EBus\)\. The EBus allows simple and safe function calls between different modules of code\. 

A new gem comes with one EBus by default, as shown in the following example\. 

```
// dev/Gems/HelloWorld/Code/Include/HelloWorld/HelloWorldBus.h   
#pragma once
#include <AzCore/EBus/EBus.h>
namespace HelloWorld
{
    class HelloWorldRequests
        : public AZ::EBusTraits
    {
    public:
        //////////////////////////////////////////////////////////////////////////
        // EBusTraits overrides
        // These settings are for a "singleton" pattern.
        // A single handler can connect to the EBus.
        static const AZ::EBusHandlerPolicy HandlerPolicy = AZ::EBusHandlerPolicy::Single;
        // A single address exists on the EBus.
        static const AZ::EBusAddressPolicy AddressPolicy = AZ::EBusAddressPolicy::Single;
        //////////////////////////////////////////////////////////////////////////

        // Put your public methods here
        virtual void SayHello(const char* name) = 0;
    };
    using HelloWorldRequestBus = AZ::EBus<HelloWorldRequests>;
} // namespace HelloWorld
```

Calls to this EBus are handled by the system component, as described in the following section\. 

## The System Component Class<a name="az-module-parts-system-component-class"></a>

Any major systems in your module that require a singleton should be built as system components\. New gems come with a system component by default\. The system component class is created during application startup and attached to the system entity \(see `GetRequiredSystemComponents()` in `HelloWorldModule.cpp`\)\. 

In the current example, the system component class handles calls to the public EBus declared in `HelloWorldBus.h`\. The following code shows the `HelloWorldSystemComponent` class\. 

```
// dev/Gems/HelloWorld/Code/Source/HelloWorldSystemComponent.h   
#pragma once
#include <AzCore/Component/Component.h>
#include <HelloWorld/HelloWorldBus.h>

namespace HelloWorld
{
    // The HelloWorldSystemComponent is placed on the system entity
    // and handles calls to the HelloWorldRequestBus.
    class HelloWorldSystemComponent
        : public AZ::Component
        , protected HelloWorldRequestBus::Handler
    {
    public:
        // Every component definition must contain the AZ_COMPONENT macro,
        // specifying the type name and a unique UUID.
        AZ_COMPONENT(HelloWorldSystemComponent, "{72DFB0EE-7422-4CEB-9A40-426F26530A92}");

        static void Reflect(AZ::ReflectContext* context);

        static void GetProvidedServices(AZ::ComponentDescriptor::DependencyArrayType& provided);
        static void GetIncompatibleServices(AZ::ComponentDescriptor::DependencyArrayType& incompatible);
        static void GetRequiredServices(AZ::ComponentDescriptor::DependencyArrayType& required);
        static void GetDependentServices(AZ::ComponentDescriptor::DependencyArrayType& dependent);

    protected:
        ////////////////////////////////////////////////////////////////////////
        // AZ::Component interface implementation
        void Init() override;
        void Activate() override;
        void Deactivate() override;
        ////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////
        // HelloWorldRequestBus interface implementation
        void SayHello(const char* name) override;
        ////////////////////////////////////////////////////////////////////////
    };
}
// dev/Gems/HelloWorld/Code/Source/HelloWorldSystemComponent.cpp   
#include "StdAfx.h"
#include <AzCore/Serialization/SerializeContext.h>
#include <AzCore/Serialization/EditContext.h>
#include "HelloWorldSystemComponent.h"

namespace HelloWorld
{
    void HelloWorldSystemComponent::Reflect(AZ::ReflectContext* context)
    {
        // Reflect properties that game developers may want to customize.
        if (AZ::SerializeContext* serialize = azrtti_cast<AZ::SerializeContext*>(context))
        {
            serialize->Class<HelloWorldSystemComponent, AZ::Component>()
                ->Version(0)
                ->SerializerForEmptyClass();

            if (AZ::EditContext* ec = serialize->GetEditContext())
            {
                ec->Class<HelloWorldSystemComponent>("HelloWorld", "Says hello")
                    ->ClassElement(AZ::Edit::ClassElements::EditorData, "")
                        ->Attribute(AZ::Edit::Attributes::AppearsInAddComponentMenu, AZ_CRC("System"))
                        ->Attribute(AZ::Edit::Attributes::AutoExpand, true)
                    ;
            }
        }
    }

    void HelloWorldSystemComponent::GetProvidedServices(AZ::ComponentDescriptor::DependencyArrayType& provided)
    {
        provided.push_back(AZ_CRC("HelloWorldService"));
    }

    void HelloWorldSystemComponent::GetIncompatibleServices(AZ::ComponentDescriptor::DependencyArrayType& incompatible)
    {
        // Enforce singleton behavior by forbidding further components
        // which provide this same service from being added to an entity.
        incompatible.push_back(AZ_CRC("HelloWorldService"));
    }

    void HelloWorldSystemComponent::GetRequiredServices(AZ::ComponentDescriptor::DependencyArrayType& required)
    {
        // This component does not depend upon any other services.
        (void)required;
    }

    void HelloWorldSystemComponent::GetDependentServices(AZ::ComponentDescriptor::DependencyArrayType& dependent)
    {
        // This component does not depend upon any other services.
        (void)dependent;
    }

    void HelloWorldSystemComponent::Init()
    {
    }

    void HelloWorldSystemComponent::Activate()
    {
        // Activate() is where the component "turns on".
        // Begin handling calls to HelloWorldRequestBus
        HelloWorldRequestBus::Handler::BusConnect();
    }

    void HelloWorldSystemComponent::Deactivate()
    {
        // Deactivate() is where the component "turns off".
        // Stop handling calls to HelloWorldRequestBus
        HelloWorldRequestBus::Handler::BusDisconnect();
    }

    void HelloWorldSystemComponent::SayHello(const char* name)
    {
        AZ_Printf("HelloWorld", "Hello %s, you certainly look smashing tonight.", name);
    }
}
```

For more information about system components, see [System Components](az-module-system-components.md)\. 

## Calling the Module from External Code<a name="az-module-parts-calling"></a>

To call your module, invoke your public function through EBus\. This example uses the `SayHello` function\. 

```
#include <HelloWorld/HelloWorldBus.h>
 
void InSomeFunctionSomewhere()
{
    // ...
	// Invoke the call through EBus.
    EBUS_EVENT(HelloWorld::HelloWorldRequestBus, SayHello, "Bruce");
    // ...
}
```