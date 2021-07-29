---
title: Tutorial - Using Multiplayer Gem
linktitle: Tutorial Multiplayer
description: Use Multiplayer Gem to create multiplayer experiences with O3DE Networking.
---



## Introduction


This tutorial will link all the relevant documentation to provide you with a detailed guide on getting started with creating multiplayer components.

Our starting base will be O3DE MultiplayerSample project. You can find the instructions on how to build and run it here: https://github.com/o3de/o3de-multiplayersample/blob/development/README.md





## Network Components

### Adding a New Component

We will start by creating a network component - MyFirstNetworkComponent. It will be only do one thing - replicate a monotonic counter.

Since we already have MultiplayerSample setup for codegen, we can start by duplicating one of the existing codegen xml files.

`D:\git\o3de-multiplayersample\Gem\Code\Source\AutoGen\SimplePlayerCameraComponent.AutoComponent.xml`

into 

`D:\git\o3de-multiplayersample\Gem\Code\Source\AutoGen\MyFirstNetworkComponent.AutoComponent.xml`

```xml
<Component Name="MyFirstNetworkComponent"
           Namespace="MultiplayerSample"
           OverrideComponent="true"
           OverrideController="false"
           OverrideInclude="Source/Components/MyFirstNetworkComponent.h"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
</Component>
```

Go to `D:\git\o3de-multiplayersample\Gem\Code\multiplayersample_files.cmake` and add your new xml file:

```
set(FILES
...
    Source/AutoGen/MyFirstNetworkComponent.AutoComponent.xml
```

Re-run cmake configure for your O3DE project, or build `MultiplayerSample.Static`:

```
3>------ Build started: Project: MultiplayerSample.Static, Configuration: profile x64 ------
3>Generating Azcg/Generated/Source/AutoGen/NetworkAnimationComponent.AutoComponent.h, Azcg/Generated/Source/AutoGen/NetworkCharacterComponent.AutoComponent.h, Azcg/Generated/Source/AutoGen/NetworkHitVolumesComponent.AutoComponent.h, Azcg/Generated/Source/AutoGen/NetworkPlayerSpawnerComponent.AutoComponent.h, Azcg/Generated/Source/AutoGen/NetworkRigidBodyComponent.AutoComponent.h, Azcg/Generated/Source/AutoGen/NetworkWeaponsComponent.AutoComponent.h, Azcg/Generated/Source/AutoGen/MyFirstNetworkComponent.AutoComponent.h, Azcg/Generated/Source/AutoGen/SimplePlayerCameraComponent.AutoComponent.h, Azcg/Generated/Source/AutoGen/WasdPlayerMovementComponent.AutoComponent.h, Azcg/Generated/Source/AutoGen/NetworkAnimationComponent.AutoComponent.cpp, Azcg/Generated/Source/AutoGen/NetworkCharacterComponent.AutoComponent.cpp, Azcg/Generated/Source/AutoGen/NetworkHitVolumesComponent.AutoComponent.cpp, Azcg/Generated/Source/AutoGen/NetworkPlayerSpawnerComponent.AutoComponent.cpp, Azcg/Generated/Source/AutoGen/NetworkRigidBodyComponent.AutoComponent.cpp, Azcg/Generated/Source/AutoGen/NetworkWeaponsComponent.AutoComponent.cpp, Azcg/Generated/Source/AutoGen/MyFirstNetworkComponent.AutoComponent.cpp, Azcg/Generated/Source/AutoGen/SimplePlayerCameraComponent.AutoComponent.cpp, Azcg/Generated/Source/AutoGen/WasdPlayerMovementComponent.AutoComponent.cpp, Azcg/Generated/Source/AutoGen/AutoComponentTypes.h, Azcg/Generated/Source/AutoGen/AutoComponentTypes.cpp
3>Running AutoGen for MultiplayerSample.Static
3>Generating D:\git\o3de\build\-86ba765d\Gem\Code\Azcg\Generated\Source\AutoGen\MyFirstNetworkComponent.AutoComponent.h with template D:/git/o3de/Gems/Multiplayer/Code/Source/AutoGen/AutoComponent_Header.jinja and inputs D:\git\o3de-multiplayersample\Gem\Code\Source\AutoGen\MyFirstNetworkComponent.AutoComponent.xml
3>Generating D:\git\o3de\build\-86ba765d\Gem\Code\Azcg\Generated\Source\AutoGen\MyFirstNetworkComponent.AutoComponent.cpp with template D:/git/o3de/Gems/Multiplayer/Code/Source/AutoGen/AutoComponent_Source.jinja and inputs D:\git\o3de-multiplayersample\Gem\Code\Source\AutoGen\MyFirstNetworkComponent.AutoComponent.xml
3>Generating D:\git\o3de\build\-86ba765d\Gem\Code\Azcg\Generated\Source\AutoGen\AutoComponentTypes.cpp with template D:/git/o3de/Gems/Multiplayer/Code/Source/AutoGen/AutoComponentTypes_Source.jinja and inputs D:\git\o3de-multiplayersample\Gem\Code\Source\AutoGen\NetworkAnimationComponent.AutoComponent.xml, D:\git\o3de-multiplayersample\Gem\Code\Source\AutoGen\NetworkCharacterComponent.AutoComponent.xml, D:\git\o3de-multiplayersample\Gem\Code\Source\AutoGen\NetworkHitVolumesComponent.AutoComponent.xml, D:\git\o3de-multiplayersample\Gem\Code\Source\AutoGen\NetworkPlayerSpawnerComponent.AutoComponent.xml, D:\git\o3de-multiplayersample\Gem\Code\Source\AutoGen\NetworkRigidBodyComponent.AutoComponent.xml, D:\git\o3de-multiplayersample\Gem\Code\Source\AutoGen\NetworkWeaponsComponent.AutoComponent.xml, D:\git\o3de-multiplayersample\Gem\Code\Source\AutoGen\MyFirstNetworkComponent.AutoComponent.xml, D:\git\o3de-multiplayersample\Gem\Code\Source\AutoGen\SimplePlayerCameraComponent.AutoComponent.xml, D:\git\o3de-multiplayersample\Gem\Code\Source\AutoGen\WasdPlayerMovementComponent.AutoComponent.xml
3>Total Time 0:00:00.01
3>MyFirstNetworkComponent.AutoComponent.cpp
3>AutoComponentTypes.cpp
3>D:\git\o3de\build\-86ba765d\Gem\Code\Azcg\Generated\Source\AutoGen\AutoComponentTypes.cpp(14,10): fatal error C1083: Cannot open include file: 'Source/Components/MyFirstNetworkComponent.h': No such file or directory
3>#include <Source/Components/MyFirstNetworkComponent.h>
3>         ^
3>D:\git\o3de\build\-86ba765d\Gem\Code\Azcg\Generated\Source\AutoGen\MyFirstNetworkComponent.AutoComponent.cpp(20,10): fatal error C1083: Cannot open include file: 'Source/Components/MyFirstNetworkComponent.h': No such file or directory
3>#include <Source/Components/MyFirstNetworkComponent.h>
3>         ^
3>Done building project "MultiplayerSample.Static.vcxproj" -- FAILED.
```

The failure is expected, we have not written our code on top of the code-generated files. Let's first notice what we did get so far:

```
3>Generating D:\git\o3de\build\-86ba765d\Gem\Code\Azcg\Generated\Source\AutoGen\MyFirstNetworkComponent.AutoComponent.h ...
3>Generating D:\git\o3de\build\-86ba765d\Gem\Code\Azcg\Generated\Source\AutoGen\MyFirstNetworkComponent.AutoComponent.cpp ...
```

Taking a look into the header `MyFirstNetworkComponent.AutoComponent.h` , you can find the following large commented block:

```c++
/* 
/// You may use the classes below as a basis for your new derived classes. Derived classes must be marked in MyFirstNetworkComponent.AutoComponent.xml
/// Place in your .h
#pragma once

#include <Source/AutoGen/MyFirstNetworkComponent.AutoComponent.h>

namespace MultiplayerSample
{
    class MyFirstNetworkComponent
        : public MyFirstNetworkComponentBase
    {
    public:
        AZ_MULTIPLAYER_COMPONENT(MultiplayerSample::MyFirstNetworkComponent, s_myFirstNetworkComponentConcreteUuid, MultiplayerSample::MyFirstNetworkComponentBase);

        static void Reflect(AZ::ReflectContext* context);

        void OnInit() override;
        void OnActivate(Multiplayer::EntityIsMigrating entityIsMigrating) override;
        void OnDeactivate(Multiplayer::EntityIsMigrating entityIsMigrating) override;

        
        
        
    protected:
        
    };

}
/// Place in your .cpp
#include <Source/Components/MyFirstNetworkComponent.h>

namespace MultiplayerSample
{
    void MyFirstNetworkComponent::Reflect(AZ::ReflectContext* context)
    {
        AZ::SerializeContext* serializeContext = azrtti_cast<AZ::SerializeContext*>(context);
        if (serializeContext)
        {
            serializeContext->Class<MyFirstNetworkComponent, MyFirstNetworkComponentBase>()
                ->Version(1);
        }
        MyFirstNetworkComponentBase::Reflect(context);
    }

    void MyFirstNetworkComponent::OnInit()
    {
    }

    void MyFirstNetworkComponent::OnActivate([[maybe_unused]] Multiplayer::EntityIsMigrating entityIsMigrating)
    {
    }

    void MyFirstNetworkComponent::OnDeactivate([[maybe_unused]] Multiplayer::EntityIsMigrating entityIsMigrating)
    {
    }

}
*/
```

That is our start base. We can copy paste that code into `D:\git\o3de-multiplayersample\Gem\Code\Source\Components\MyFirstNetworkComponent.h` and `D:\git\o3de-multiplayersample\Gem\Code\Source\Components\MyFirstNetworkComponent.cpp`.

Add these files to `D:\git\o3de-multiplayersample\Gem\Code\multiplayersample_files.cmake`:

```
set(FILES
...
    Source/Components/MyFirstNetworkComponent.cpp
    Source/Components/MyFirstNetworkComponent.h
```

Now, MultiplayerSample project should compile without any issues. You should be able to see the new component in the Editor.


![My First Network Component in the Editor](/images/user-guide/multiplayer/my_first_network_component_in_editor.png)


### Adding a Network Property

Let's add a network property that will replicate uptime from the server to clients.

The property we should pay attention the most are the following:

```xml
  <NetworkProperty Type="double"
                   Name="UpTime"
                   Init="0.0"
                   ReplicateFrom="Authority"
                   ReplicateTo="Client"
```

One can think of the above in C++ way:

```c++
double m_UpTime = 0.0; // replicate from Authority to Client
```

{{<note>}}
For now, we can just think of `Authority` as the multiplayer server. `Authority` to `Client` is the most common direction of replication.
{{</note>}}

Here is the full component XML:

```xml
<?xml version="1.0"?>
<Component Name="MyFirstNetworkComponent"
           Namespace="MultiplayerSample"
           OverrideComponent="true"
           OverrideController="false"
           OverrideInclude="Source/Components/MyFirstNetworkComponent.h"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NetworkProperty Type="double"
                   Name="UpTime"
                   Init="0.0"
                   ReplicateFrom="Authority"
                   ReplicateTo="Client"
                   IsRewindable="true"
                   IsPredictable="true"
                   IsPublic="true"
                   Container="Object"
                   ExposeToEditor="false"
                   ExposeToScript="false"
                   GenerateEventBindings="false"
                   Description="Time since the start of the application" />
</Component>
```

Now in `MyFirstNetworkComponent` we can access `UpTime` via GetUpTime() method on clients.
On the authority server we can set the value of `UpTime` by accessing the controller of our component - `MyFirstNetworkComponentController`. For example:

```c++
    void MyFirstNetworkComponent::OnTick( [[maybe_unused]] float deltaTime, AZ::ScriptTimePoint time )
    {
        if ( HasController() )
        {
            auto* controller = static_cast<MyFirstNetworkComponentController*>( GetController() );
            controller->ModifyUpTime() = time.GetSeconds();
            AZ_Printf( "MyFirstNetworkComponent", "server = %f", GetUpTime() );
        }
        else
        {
            AZ_Printf( "MyFirstNetworkComponent", "client = %f", GetUpTime() );
        }
    }
```

A controller only exists on the authority server, thus this effectively splits the execution into server-only and client-only logic. 

Our full code for the component so far is as follows. The header is `D:\git\o3de-multiplayersample\Gem\Code\Source\Components\MyFirstNetworkComponent.h`:

```c++
#pragma once

#include <Source/AutoGen/MyFirstNetworkComponent.AutoComponent.h>
#include <AzCore/Component/TickBus.h>

namespace MultiplayerSample
{
    class MyFirstNetworkComponent
        : public MyFirstNetworkComponentBase
        , public AZ::TickBus::Handler
    {
    public:
        AZ_MULTIPLAYER_COMPONENT(MultiplayerSample::MyFirstNetworkComponent, s_myFirstNetworkComponentConcreteUuid, MultiplayerSample::MyFirstNetworkComponentBase);

        static void Reflect(AZ::ReflectContext* context);

        void OnInit() override;
        void OnActivate(Multiplayer::EntityIsMigrating entityIsMigrating) override;
        void OnDeactivate(Multiplayer::EntityIsMigrating entityIsMigrating) override;

        void OnTick(float deltaTime, AZ::ScriptTimePoint time) override;
    };
}
```

And the source, `D:\git\o3de-multiplayersample\Gem\Code\Source\Components\MyFirstNetworkComponent.cpp`:

```c++
#include <Source/Components/MyFirstNetworkComponent.h>

#include <AzCore/Serialization/SerializeContext.h>

namespace MultiplayerSample
{
    void MyFirstNetworkComponent::Reflect( AZ::ReflectContext* context )
    {
        AZ::SerializeContext* serializeContext = azrtti_cast<AZ::SerializeContext*>( context );
        if ( serializeContext )
        {
            serializeContext->Class<MyFirstNetworkComponent, MyFirstNetworkComponentBase>()
                ->Version( 1 );
        }
        MyFirstNetworkComponentBase::Reflect( context );
    }

    void MyFirstNetworkComponent::OnInit()
    {
    }

    void MyFirstNetworkComponent::OnActivate( [[maybe_unused]] Multiplayer::EntityIsMigrating entityIsMigrating )
    {
        AZ::TickBus::Handler::BusConnect();
    }

    void MyFirstNetworkComponent::OnDeactivate( [[maybe_unused]] Multiplayer::EntityIsMigrating entityIsMigrating )
    {
        AZ::TickBus::Handler::BusDisconnect();
    }

    void MyFirstNetworkComponent::OnTick( [[maybe_unused]] float deltaTime, AZ::ScriptTimePoint time )
    {
        if ( HasController() )
        {
            auto* controller = static_cast<MyFirstNetworkComponentController*>( GetController() );
            controller->ModifyUpTime() = time.GetSeconds();
            AZ_Printf( "MyFirstNetworkComponent", "server = %f", GetUpTime() );
        }
        else
        {
            AZ_Printf( "MyFirstNetworkComponent", "client = %f", GetUpTime() );
        }
    }
}
```

### Listen for Network Property Changes on Clients

However, let's improve on this. A client has no need to tick, it can instead listen for changes. In order to do that, we need to enable `GenerateEventBindings`.
This is what we have at the moment.

```xml
  <NetworkProperty Type="double"
                   Name="UpTime"
...
                   GenerateEventBindings="false"
...
                    />
```

If `GenerateEventBindings` is instead set to true, 

```xml
  <NetworkProperty Type="double"
                   Name="UpTime"
...
                   GenerateEventBindings="true"
...
                    />
```

It will add code generated for us a new method: `UpTimeAddEvent`. Let's put it to use and modify our code.

Here are the steps to listen for changes on a client in our component:

* create an event handler
* create a callback method and assign it to the event handler
* connect the event handler to `UpTimeAddEvent`

In C++, it looks like this:

```c++
// create an event handler
AZ::Event<double>::Handler m_uptimeChanged;
...
// the callback
void OnUpTimeChanged( double uptime );
...
// assign the callback to the event handler
MyFirstNetworkComponent::MyFirstNetworkComponent()
    : m_uptimeChanged( [this]( double uptime ) {OnUpTimeChanged( uptime ); } )
{
}
...
// connect the event handler to the generated UpTimeAddEvent method
void MyFirstNetworkComponent::OnActivate( [[maybe_unused]] Multiplayer::EntityIsMigrating entityIsMigrating )
{
    UpTimeAddEvent( m_uptimeChanged );
}
```

And now instead of ticking on clients, we can print our log message from the callback:

```c++
void MyFirstNetworkComponent::OnUpTimeChanged( double uptime )
{
    AZ_Printf( "MyFirstNetworkComponent", "client = %f", uptime );
}
```

Our full source code for the header is now:

```c++
#pragma once

#include <Source/AutoGen/MyFirstNetworkComponent.AutoComponent.h>
#include <AzCore/Component/TickBus.h>

namespace MultiplayerSample
{
    class MyFirstNetworkComponent
        : public MyFirstNetworkComponentBase
        , public AZ::TickBus::Handler
    {
    public:
        AZ_MULTIPLAYER_COMPONENT( MultiplayerSample::MyFirstNetworkComponent, s_myFirstNetworkComponentConcreteUuid, MultiplayerSample::MyFirstNetworkComponentBase );

        static void Reflect( AZ::ReflectContext* context );

        MyFirstNetworkComponent();

        void OnInit() override;
        void OnActivate( Multiplayer::EntityIsMigrating entityIsMigrating ) override;
        void OnDeactivate( Multiplayer::EntityIsMigrating entityIsMigrating ) override;

        void OnTick( float deltaTime, AZ::ScriptTimePoint time ) override;

    private:
        AZ::Event<double>::Handler m_uptimeChanged;
        void OnUpTimeChanged( double uptime );
    };
}
```

And source code is:

```c++
#include <Source/Components/MyFirstNetworkComponent.h>

#include <AzCore/Serialization/SerializeContext.h>

namespace MultiplayerSample
{
    void MyFirstNetworkComponent::Reflect( AZ::ReflectContext* context )
    {
        AZ::SerializeContext* serializeContext = azrtti_cast<AZ::SerializeContext*>( context );
        if ( serializeContext )
        {
            serializeContext->Class<MyFirstNetworkComponent, MyFirstNetworkComponentBase>()
                ->Version( 1 );
        }
        MyFirstNetworkComponentBase::Reflect( context );
    }

    MyFirstNetworkComponent::MyFirstNetworkComponent()
        : m_uptimeChanged( [this]( double uptime ) {OnUpTimeChanged( uptime ); } )
    {
    }

    void MyFirstNetworkComponent::OnInit()
    {
    }

    void MyFirstNetworkComponent::OnActivate( [[maybe_unused]] Multiplayer::EntityIsMigrating entityIsMigrating )
    {
        UpTimeAddEvent( m_uptimeChanged );

        if ( HasController() )
        {
            AZ::TickBus::Handler::BusConnect();
        }
    }

    void MyFirstNetworkComponent::OnDeactivate( [[maybe_unused]] Multiplayer::EntityIsMigrating entityIsMigrating )
    {
        AZ::TickBus::Handler::BusDisconnect();
    }

    void MyFirstNetworkComponent::OnTick( [[maybe_unused]] float deltaTime, AZ::ScriptTimePoint time )
    {
        // only happens on Authority (server)
        auto* controller = static_cast<MyFirstNetworkComponentController*>( GetController() );
        controller->ModifyUpTime() = time.GetSeconds();
        AZ_Printf( "MyFirstNetworkComponent", "server = %f", GetUpTime() );
    }

    void MyFirstNetworkComponent::OnUpTimeChanged( double uptime )
    {
        AZ_Printf( "MyFirstNetworkComponent", "client = %f", uptime );
    }
}
```

### Network Component Controllers

Let's improve on the separation between server and client code. At the moment, `MyFirstNetworkComponent` performs both server and client duties. Let's break it up. In O3DE Multiplayer, the way to do that is by using `controllers`. A controller does not exist on `Client` roles but does exist on Authority role. We already saw a glipmse into that in our previous examples:

```c++
auto* controller = static_cast<MyFirstNetworkComponentController*>( GetController() );
```

Going back to XML, the controller were mentioned in the attribute `OverrideController`:

```xml
<Component Name="MyFirstNetworkComponent"
           Namespace="MultiplayerSample"
           OverrideComponent="true"
           OverrideController="false"
```

Now that we wish to do some custom work with the controller, we will flip `OverrideController` to true.

```xml
<Component Name="MyFirstNetworkComponent"
           Namespace="MultiplayerSample"
           OverrideComponent="true"
           OverrideController="true"
```

When attempt to build the code, you will get compile errors but that is because the code now expects us to override the controller base class. In fact, if you look into the code generated header, `D:\git\o3de\build\-86ba765d\Gem\Code\Azcg\Generated\Source\AutoGen\MyFirstNetworkComponent.AutoComponent.h`, like we did before, you will see that large comment has changed to add controller:

```c++
/// You may use the classes below as a basis for your new derived classes. Derived classes must be marked in MyFirstNetworkComponent.AutoComponent.xml
/*
    class MyFirstNetworkComponentController
        : public MyFirstNetworkComponentControllerBase
    {
    public:
        MyFirstNetworkComponentController(MyFirstNetworkComponent& parent);

        void OnActivate(Multiplayer::EntityIsMigrating entityIsMigrating) override;
        void OnDeactivate(Multiplayer::EntityIsMigrating entityIsMigrating) override;
    };

    MyFirstNetworkComponentController::MyFirstNetworkComponentController(MyFirstNetworkComponent& parent)
        : MyFirstNetworkComponentControllerBase(parent)
    {
    }

    void MyFirstNetworkComponentController::OnActivate([[maybe_unused]] Multiplayer::EntityIsMigrating entityIsMigrating)
    {
    }

    void MyFirstNetworkComponentController::OnDeactivate([[maybe_unused]] Multiplayer::EntityIsMigrating entityIsMigrating)
    {
    }
*/
```

Let's add this content to our existing `D:\git\o3de-multiplayersample\Gem\Code\Source\Components\MyFirstNetworkComponent.h` and `D:\git\o3de-multiplayersample\Gem\Code\Source\Components\MyFirstNetworkComponent.cpp`.

Once you do, you can move then move all the server logic into `MyFirstNetworkComponentController` and keep client logic in `MyFirstNetworkComponent`. Here is the result.

`D:\git\o3de-multiplayersample\Gem\Code\Source\Components\MyFirstNetworkComponent.h`:

```c++
#pragma once

#include <Source/AutoGen/MyFirstNetworkComponent.AutoComponent.h>
#include <AzCore/Component/TickBus.h>

namespace MultiplayerSample
{
    class MyFirstNetworkComponent
        : public MyFirstNetworkComponentBase
    {
    public:
        AZ_MULTIPLAYER_COMPONENT( MultiplayerSample::MyFirstNetworkComponent, s_myFirstNetworkComponentConcreteUuid, MultiplayerSample::MyFirstNetworkComponentBase );

        static void Reflect( AZ::ReflectContext* context );

        MyFirstNetworkComponent();

        void OnInit() override {}
        void OnActivate( Multiplayer::EntityIsMigrating entityIsMigrating ) override;
        void OnDeactivate( Multiplayer::EntityIsMigrating entityIsMigrating ) override;

    private:
        AZ::Event<double>::Handler m_uptimeChanged;
        void OnUpTimeChanged( double uptime );
    };

    class MyFirstNetworkComponentController
        : public MyFirstNetworkComponentControllerBase
        , public AZ::TickBus::Handler
    {
    public:
        MyFirstNetworkComponentController(MyFirstNetworkComponent& parent);

        void OnActivate(Multiplayer::EntityIsMigrating entityIsMigrating) override;
        void OnDeactivate(Multiplayer::EntityIsMigrating entityIsMigrating) override;

        void OnTick( float deltaTime, AZ::ScriptTimePoint time ) override;
    };
}
```

Notice the key difference in the header:
* AZ::TickBus::Handler was moved from `MyFirstNetworkComponent` to `MyFirstNetworkComponentController`

`D:\git\o3de-multiplayersample\Gem\Code\Source\Components\MyFirstNetworkComponent.cpp`:
```c++
#include <Source/Components/MyFirstNetworkComponent.h>

#include <AzCore/Serialization/SerializeContext.h>

namespace MultiplayerSample
{
    void MyFirstNetworkComponent::Reflect( AZ::ReflectContext* context )
    {
        AZ::SerializeContext* serializeContext = azrtti_cast<AZ::SerializeContext*>( context );
        if ( serializeContext )
        {
            serializeContext->Class<MyFirstNetworkComponent, MyFirstNetworkComponentBase>()
                ->Version( 1 );
        }
        MyFirstNetworkComponentBase::Reflect( context );
    }

    MyFirstNetworkComponent::MyFirstNetworkComponent()
        : m_uptimeChanged( [this]( double uptime ) { OnUpTimeChanged( uptime ); } )
    {
    }

    void MyFirstNetworkComponent::OnActivate( [[maybe_unused]] Multiplayer::EntityIsMigrating entityIsMigrating )
    {
        if (HasController() == false) // client only
        {
            UpTimeAddEvent( m_uptimeChanged );
        }
    }

    void MyFirstNetworkComponent::OnDeactivate( [[maybe_unused]] Multiplayer::EntityIsMigrating entityIsMigrating )
    {
    }

    void MyFirstNetworkComponent::OnUpTimeChanged( double uptime )
    {
        AZ_Printf( "MyFirstNetworkComponent", "client = %f", uptime );
    }

    /////////// Controller ////////////////

    MyFirstNetworkComponentController::MyFirstNetworkComponentController( MyFirstNetworkComponent& parent )
        : MyFirstNetworkComponentControllerBase( parent )
    {
    }

    void MyFirstNetworkComponentController::OnActivate( [[maybe_unused]] Multiplayer::EntityIsMigrating entityIsMigrating )
    {
        AZ::TickBus::Handler::BusConnect();
    }

    void MyFirstNetworkComponentController::OnDeactivate( [[maybe_unused]] Multiplayer::EntityIsMigrating entityIsMigrating )
    {
        AZ::TickBus::Handler::BusDisconnect();
    }

    void MyFirstNetworkComponentController::OnTick( [[maybe_unused]] float deltaTime, AZ::ScriptTimePoint time )
    {
        ModifyUpTime() = time.GetSeconds();
        AZ_Printf( "MyFirstNetworkComponent", "server = %f", GetUpTime() );
    }
}
```

And now we have a clean separation between server and client logic for our component.