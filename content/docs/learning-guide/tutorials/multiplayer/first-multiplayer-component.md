---
linktitle: Your First Network Component
title: Your First Network Component
description: In this tutorial you will learn how to use the Multiplayer Gem to create multiplayer components in Open 3D Engine (O3DE). The tutorial uses the O3DE Multiplayer Sample project as a base project to get you started.
---

Follow this tutorial to get started with creating multiplayer components in **Open 3D Engine (O3DE)**. By the end of the tutorial, you'll know how to create a new network component that has a network property and a remote procedure call.

To begin, build and run the O3DE MultiplayerSample project. For instructions about how to build and run this project, refer to the [MultiplayerSample Project README](https://github.com/o3de/o3de-multiplayersample#readme).

## Network components

### Add a New Component

We will start by creating a network component - MyFirstNetworkComponent. It will only do one thing, which is to replicate a monotonic counter.

Since we already have MultiplayerSample setup for [automated code generation](/docs/user-guide/programming/autogen) (codegen), we can start by duplicating one of the existing codegen xml files.

1. Copy `<o3de-multiplayersample>\Gem\Code\Source\AutoGen\SimplePlayerCameraComponent.AutoComponent.xml` to `<o3de-multiplayersample>\Gem\Code\Source\AutoGen\MyFirstNetworkComponent.AutoComponent.xml`

1. Modify `<o3de-multiplayersample>\Gem\Code\Source\AutoGen\MyFirstNetworkComponent.AutoComponent.xml` to have the following content:

    ```xml
    <Component Name="MyFirstNetworkComponent"
            Namespace="MultiplayerSample"
            OverrideComponent="true"
            OverrideController="false"
            OverrideInclude="Source/Components/MyFirstNetworkComponent.h"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    </Component>
    ```

1. Go to `<o3de-multiplayersample>\Gem\Code\multiplayersample_files.cmake` and add your new xml file:

    ```
    set(FILES
    ...
        Source/AutoGen/MyFirstNetworkComponent.AutoComponent.xml
    ```

1. Re-run CMake configure for your O3DE project, or build `MultiplayerSample.Static`. A failure is expected, since we have not written our code on top of the code-generated files.

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

1. Notice what we did get so far:

    ```
    3>Generating D:\git\o3de\build\-86ba765d\Gem\Code\Azcg\Generated\Source\AutoGen\MyFirstNetworkComponent.AutoComponent.h ...
    3>Generating D:\git\o3de\build\-86ba765d\Gem\Code\Azcg\Generated\Source\AutoGen\MyFirstNetworkComponent.AutoComponent.cpp ...
    ```

1. Open the header file `MyFirstNetworkComponent.AutoComponent.h` and look for the following, large comment block:

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

1. The code in the preceding block is our starting base. Copy paste that code into `<o3de-multiplayersample>\Gem\Code\Source\Components\MyFirstNetworkComponent.h` and `<o3de-multiplayersample>\Gem\Code\Source\Components\MyFirstNetworkComponent.cpp`.

1. Add these files to `<o3de-multiplayersample>\Gem\Code\multiplayersample_files.cmake`:

    ```
    set(FILES
    ...
        Source/Components/MyFirstNetworkComponent.cpp
        Source/Components/MyFirstNetworkComponent.h
    ```

1. Now, MultiplayerSample project should compile without any issues. Open **O3DE Editor** to see the new component in the Editor.


    ![My First Network Component in the Editor](/images/learning-guide/tutorials/multiplayer/my_first_network_component_in_editor.png)

    Additionally, you can find the generated files and your XML file in Visual Studio:

    ![Generated Code in Visual Studio](/images/learning-guide/tutorials/multiplayer/visualstudio_generated_files_for_myfirstnetworkcomponent.png)

1. At this point, you have a new multiplayer component named `MyFirstNetworkComponent`.

### Add a Network Property

Let's add a network property that will replicate uptime from the server to clients.

1. Start by modifying `MyFirstNetworkComponent.AutoComponent.xml`. Here is a codegen xml file with a network property:

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

1. Focus on the basic details of a `NetworkProperty`. These are:

    ```xml
    <NetworkProperty Type="double"
                    Name="UpTime"
                    Init="0.0"
                    ReplicateFrom="Authority"
                    ReplicateTo="Client"
    ```

    Expressed in C++, this would look like:

    ```c++
    double m_UpTime = 0.0; // replicate from Authority to Client
    ```

    {{<note>}}
    For now, we can think of `Authority` as the multiplayer server. `Authority` to `Client` is the most common direction of replication.
    {{</note>}}

1. With these changes, `MyFirstNetworkComponent` can access `UpTime` via GetUpTime() method on clients. On the authority server we can set the value of `UpTime` by accessing the controller of our component - `MyFirstNetworkComponentController`, using the following code:

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

    {{<note>}}
A controller only exists on the authority server, thus this effectively splits the execution into server-only and client-only logic.
    {{</note>}}

1. Our full code for the component so far is as follows. The header is `<o3de-multiplayersample>\Gem\Code\Source\Components\MyFirstNetworkComponent.h`:

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

    And the source, `<o3de-multiplayersample>\Gem\Code\Source\Components\MyFirstNetworkComponent.cpp`:

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

1. Now you have a multiplayer component with a network property.

### Listen for Network Property Changes on Clients

However, let's improve on this. A client has no need to tick, it can instead listen for changes. In order to do that, enable `GenerateEventBindings`.
This is what we have at the moment.

```xml
  <NetworkProperty Type="double"
                   Name="UpTime"
...
                   GenerateEventBindings="false"
...
                    />
```

Change `GenerateEventBindings` to true:

```xml
  <NetworkProperty Type="double"
                   Name="UpTime"
...
                   GenerateEventBindings="true"
...
                    />
```

A project build will generate a new method: `UpTimeAddEvent`. Let's put it to use in our code.

To listen for changes on a client in our component, do the following:

1. Create an event handler.

    ```c++
    // create an event handler
    AZ::Event<double>::Handler m_uptimeChanged;
    ```

1. Create a callback method.

    ```c++
    void OnUpTimeChanged( double uptime );
    ```

1. Assign it to the event handler.

    ```c++
    // assign the callback to the event handler
    MyFirstNetworkComponent::MyFirstNetworkComponent()
        : m_uptimeChanged( [this]( double uptime ) {OnUpTimeChanged( uptime ); } )
    {
    }
    ```

1. Connect the event handler to `UpTimeAddEvent`.

    ```c++
    // connect the event handler to the generated UpTimeAddEvent method
    void MyFirstNetworkComponent::OnActivate( [[maybe_unused]] Multiplayer::EntityIsMigrating entityIsMigrating )
    {
        UpTimeAddEvent( m_uptimeChanged );
    }
    ```


1. And now instead of ticking on clients, print our log message from the callback:

    ```c++
    void MyFirstNetworkComponent::OnUpTimeChanged( double uptime )
    {
        AZ_Printf( "MyFirstNetworkComponent", "client = %f", uptime );
    }
    ```

After making these changes, `MyFirstNetworkComponent.h` should look like this:

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

And `MyFirstNetworkComponent.cpp` should look like this:

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

Let's improve on the separation between server and client code. At the moment, `MyFirstNetworkComponent` performs both server and client duties. Let's break it up. In O3DE Multiplayer, the way to do that is by using `controllers`. A controller does not exist on `Client` role but does exist on Authority role. We already saw a glimpse of that in our previous examples:

```c++
auto* controller = static_cast<MyFirstNetworkComponentController*>( GetController() );
```

1. Go back to codegen XML, `<o3de-multiplayersample>\Gem\Code\Source\AutoGen\MyFirstNetworkComponent.AutoComponent.xml`, where the controller was mentioned in the attribute `OverrideController`:

    ```xml
    <Component Name="MyFirstNetworkComponent"
            Namespace="MultiplayerSample"
            OverrideComponent="true"
            OverrideController="false"
    ```

1. Change `OverrideController` to true, so that we can write custom logic inside a controller.

    ```xml
    <Component Name="MyFirstNetworkComponent"
            Namespace="MultiplayerSample"
            OverrideComponent="true"
            OverrideController="true"
    ```

1. Build the project.
1. When attempting to build the code, you will get expected compile errors. That is because the codegen expects us to override the controller base class.
1. Look at the code generated header, `\path\to\o3de\build\-86ba765d\Gem\Code\Azcg\Generated\Source\AutoGen\MyFirstNetworkComponent.AutoComponent.h`, you will find that the large comment has been modified by codegen and now contains code example of a controller:

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

1. Add this content to our existing `<o3de-multiplayersample>\Gem\Code\Source\Components\MyFirstNetworkComponent.h` and `<o3de-multiplayersample>\Gem\Code\Source\Components\MyFirstNetworkComponent.cpp`.

1. Move all the server logic into `MyFirstNetworkComponentController` and keep the client logic in `MyFirstNetworkComponent`, as shown in the following updated files, `<o3de-multiplayersample>\Gem\Code\Source\Components\MyFirstNetworkComponent.h`:

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

1. Note the key difference in the header: `AZ::TickBus::Handler` was moved from `MyFirstNetworkComponent` to `MyFirstNetworkComponentController` in `<o3de-multiplayersample>\Gem\Code\Source\Components\MyFirstNetworkComponent.cpp`:

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

1. Our code gen xml file `<o3de-multiplayersample>\Gem\Code\Source\AutoGen\MyFirstNetworkComponent.AutoComponent.xml` needs to be:

    ```xml
    <?xml version="1.0"?>
    <Component Name="MyFirstNetworkComponent"
            Namespace="MultiplayerSample"
            OverrideComponent="true"
            OverrideController="true"
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
                    GenerateEventBindings="true"
                    Description="Time since the start of the application" />
    </Component>
    ```

And now we have a clean separation between server and client logic.

### Add a Remote Procedure Call

Now that we have created a data flow from the server to clients using network properties, we will add a remote procedure call (RPC). Whenever a client will get a new `UpTime` it will call a new RPC - `SendConfirmUptime` and send the value it got back to the server. Just for fun.

1. Add a codegen section that defines the RPC:

    ```xml
    <RemoteProcedure Name="SendConfirmUptime"
                    InvokeFrom="Autonomous"
                    HandleOn="Authority"
                    IsPublic="false"
                    IsReliable="false"
                    GenerateEventBindings="false"
                    Description="Uptime confirmed by the client">
        <Param Type="double"
            Name="UpTime" />
    </RemoteProcedure>
    ```

    Notice that InvokeFrom is `Autonomous` instead of `Client`. `Autonomous` is a special type of client behavior where a client initiates an action and may send data to the server.

    `Autonomous` is commonly used for player character controllers; in this case a player has to be able to act on its own without waiting for the server to tell it what to do. Meanwhile, 'Client' only mirrors what the server tells them to do.

1. By default, only the player prefab is marked as Autonomous, so we will move `MyFirstNetworkComponent` to the player prefab for this tutorial.

    {{<important>}}
    Only entities that are autonomous will have controllers, otherwise `GetController()` will give a null on clients. If you are getting a null on your `GetController` calls then you have attached your component to an entity that is not autonomous. Attach them to player prefabs instead, as those are marked as autonomous by the server.
    {{</important>}}

    You can find the player prefab for MultiplayerSample project at `<o3de-multiplayersample>\Prefabs\Player.prefab`.
    To modify `Player.prefab`, do the following:

    ![Attaching Network Component to an Autonomous Entity](/images/learning-guide/tutorials/multiplayer/add_myfirstnetworkcomponent_to_player_prefab.png)

    1. Temporarily instantiate a player prefab in the level. (You can find the player prefab for MultiplayerSample project at `<o3de-multiplayersample>\Prefabs\Player.prefab`.)

    1. Modify the player prefab instance by adding `MyFirstNetworkComponent` to `player` entity.

    1. Save the player prefab.

    1. Delete the player prefab from the level.


1. Re-build `MultiplayerSample.Static` project. You will notice that the generated header for our component, `\path\to\o3de\build\MultiplayerSample-6db9bd97\Gem\Code\Azcg\Generated\Source\AutoGen\MyFirstNetworkComponent.AutoComponent.h`, has a new empty virtual method in the large comment block for `MyFirstNetworkComponentController`:

    {{<note>}}
    You might get thrown by this folder name `MultiplayerSample-6db9bd97`. This is a code-generated folder inside build folder. You might have a different name in your build folder.
    {{</note>}}

    ```c++
    class MyFirstNetworkComponentController
    ...

        void HandleSendConfirmUptime(AzNetworking::IConnection* invokingConnection, const double& UpTime) override {}
    ```

1. Take note of this and provide the following implementation of `HandleSendConfirmUptime`:

    ```c++
    void MyFirstNetworkComponentController::HandleSendConfirmUptime([[maybe_unused]] AzNetworking::IConnection* invokingConnection,
        const double& upTime)
    {
        AZ_Printf("MyFirstNetworkComponent", "on server - client told us about %f\n", upTime);
    }
    ```

1. The client will invoke the RPC by referring to its controller:

    ```c++
    void MyFirstNetworkComponent::OnUpTimeChanged(double uptime)
    {
        AZ_Printf("MyFirstNetworkComponent", "client = %f\n", uptime);
        static_cast<MyFirstNetworkComponentController*>(GetController())->SendConfirmUptime(uptime);
    }
    ```

1. Finally, add a check to `MyFirstNetworkComponentController::OnActivate` to ensure `MyFirstNetworkComponentController` is only connecting to the `TickBus` while it's executing on the server, not the autonomous player client:
    ```c++
    void MyFirstNetworkComponentController::OnActivate([[maybe_unused]] Multiplayer::EntityIsMigrating entityIsMigrating)
    {
        if (!IsAutonomous())
        {
            AZ::TickBus::Handler::BusConnect();
        }
    }
    ```


1. Your component source code should be as follows for `\path\to\MultiplayerSample\Gem\Code\Source\Components\MyFirstNetworkComponent.h`:

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

            void HandleSendConfirmUptime(AzNetworking::IConnection* invokingConnection, const double& UpTime) override;
        };
    }
    ```

1. And the source `\path\to\MultiplayerSample\Gem\Code\Source\Components\MyFirstNetworkComponent.cpp` should be:

    ```c++
    #include <Source/Components/MyFirstNetworkComponent.h>

    #include <AzCore/Serialization/SerializeContext.h>
    #include <Multiplayer/Components/NetBindComponent.h>

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

        MyFirstNetworkComponent::MyFirstNetworkComponent()
            : m_uptimeChanged([this](double uptime) { OnUpTimeChanged(uptime); })
        {
        }

        void MyFirstNetworkComponent::OnActivate([[maybe_unused]] Multiplayer::EntityIsMigrating entityIsMigrating)
        {
            if (IsNetEntityRoleAutonomous())
            {
                UpTimeAddEvent(m_uptimeChanged); // listen only on clients
            }
        }

        void MyFirstNetworkComponent::OnDeactivate([[maybe_unused]] Multiplayer::EntityIsMigrating entityIsMigrating)
        {
        }

        void MyFirstNetworkComponent::OnUpTimeChanged(double uptime)
        {
            AZ_Printf("MyFirstNetworkComponent", "client = %f\n", uptime);
            static_cast<MyFirstNetworkComponentController*>(GetController())->SendConfirmUptime(uptime);
        }

        /////////// Controller ////////////////

        MyFirstNetworkComponentController::MyFirstNetworkComponentController(MyFirstNetworkComponent& parent)
            : MyFirstNetworkComponentControllerBase(parent)
        {
        }

        void MyFirstNetworkComponentController::OnActivate([[maybe_unused]] Multiplayer::EntityIsMigrating entityIsMigrating)
        {
            if (!IsAutonomous())
            {
                AZ::TickBus::Handler::BusConnect();
            }
        }

        void MyFirstNetworkComponentController::OnDeactivate([[maybe_unused]] Multiplayer::EntityIsMigrating entityIsMigrating)
        {
            AZ::TickBus::Handler::BusDisconnect();
        }

        void MyFirstNetworkComponentController::OnTick([[maybe_unused]] float deltaTime, AZ::ScriptTimePoint time)
        {
            ModifyUpTime() = time.GetSeconds();
            AZ_Printf("MyFirstNetworkComponent", "server = %f\n", GetUpTime());
        }

        void MyFirstNetworkComponentController::HandleSendConfirmUptime([[maybe_unused]] AzNetworking::IConnection* invokingConnection,
            const double& upTime)
        {
            AZ_Printf("MyFirstNetworkComponent", "on server - client told us about %f\n", upTime);
        }
    }
    ```

1. Our xml for the code generator, `<o3de-multiplayersample>\Gem\Code\Source\AutoGen\MyFirstNetworkComponent.AutoComponent.xml`:

    ```xml
    <?xml version="1.0"?>
    <Component Name="MyFirstNetworkComponent"
            Namespace="MultiplayerSample"
            OverrideComponent="true"
            OverrideController="true"
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
                    GenerateEventBindings="true"
                    Description="Time since the start of the application" />
    <RemoteProcedure Name="SendConfirmUptime"
                    InvokeFrom="Autonomous"
                    HandleOn="Authority"
                    IsPublic="false"
                    IsReliable="false"
                    GenerateEventBindings="false"
                    Description="Uptime confirmed by the client">
        <Param Type="double"
            Name="UpTime" />
    </RemoteProcedure>
    </Component>
    ```

10. At this point, you should see the client and server logs being emitted in the Editor console when running the game in Play Mode:

    ![Console logs emitted while running game from editor with RPC](/images/learning-guide/tutorials/multiplayer/add_myfirstnetworkcomponent_run_game_with_rpc.png)
