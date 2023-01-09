---
title: Separating Multiplayer Logic into Client and Server Launchers
description: Build Open 3D Engine launchers with the Multiplayer Gem specifically targeting Clients, Servers or both.
linkTitle: Separating Client and Server
weight: 450
---

The **Multiplayer Gem** supports code separation at build time, to create code that contains only client logic, only server logic, or both client and server logic. This allows users to create executables of smaller size by excluding unnecessary logic and dependencies. It also allows hiding potentially sensitive logic unique to one executable from the other. For example, ensuring that a free-to-play client executable never includes any server logic code will reduce the chances of hacking or abuse.

The splitting functionality produces multiple build types:
* _GameLauncher_ is a client-only launcher.
* _ServerLauncher_ is a server-only launcher suitable for dedicated servers.
* _UnifiedLauncher_ provides both functionalities, and is suitable for _client-hosted servers_, which are clients that can simultaneously host and participate in a multiplayer session.

This functionality is implemented through a variety of build mechanisms and it's important to understand these mechanisms in any Gem or project using the Multiplayer Gem.

## Splitting client and server logic

The Multiplayer Gem contains code files that can be divided into two categories:
1. Files that are fully required on all launcher types.
2. Files that have parts conditionally compiled out depending on launcher type and their dependents.

These file lists are maintained in `multiplayer_files.cmake` and `multiplayer_split_files.cmake` respectively.

`multiplayer_files.cmake` generally contains core datatypes, base and core classes. `multiplayer_split_files.cmake` contains AutoComponent based MultiplayerComponents and types dependent on them.

### CMake setup

The split by cmake files leads us to four Multiplayer targets:

1. Common - A target containing `multiplayer_files.cmake`.
2. Client - A target containing `multiplayer_files.cmake` plus `multiplayer_split_files.cmake` conditionally compiled for clients.
3. Server - A target containing `multiplayer_files.cmake` plus `multiplayer_split_files.cmake` conditionally compiled for servers.
4. Unified - A target containing `multiplayer_files.cmake` plus `multiplayer_split_files.cmake` conditionally compiled for both clients and servers.

When including the Multiplayer Gem it is important to understand the needs of your usage. If the usage requires split logic, it is recommended to create Client, Server, and Unified targets which specify `Multiplayer.Client`, `Multiplayer.Server `, and `Multiplayer.Unified` dependencies, respectively. If your usage does not require split logic, then `Multiplayer.Common` is sufficient.

As an example, [MultiplayerSample](https://github.com/o3de/o3de-multiplayersample) uses and builds upon MultiplayerComponents in the Multiplayer Gem. It therefore defines its own respective Client, Server and Unified targets. 

{{< note >}}
The following CMake examples are abbreviated
{{< /note >}}

```cmake
    ly_add_target(
        NAME MultiplayerSample.Client.Static STATIC
        NAMESPACE Gem
        FILES_CMAKE
            multiplayersample_autogen_files.cmake
            multiplayersample_files.cmake
            ${pal_dir}/multiplayersample_${PAL_PLATFORM_NAME_LOWERCASE}_files.cmake
        BUILD_DEPENDENCIES
            PUBLIC
                Gem::DebugDraw
                Gem::PhysX
                Gem::Multiplayer
            PRIVATE
                Gem::Multiplayer.Client.Static
                Gem::PhysX.Static
                Gem::DebugDraw.Static
                Gem::ImGui.Static
        AUTOGEN_RULES
            *.AutoComponent.xml,AutoComponent_Header.jinja,$path/$fileprefix.AutoComponent.h
            *.AutoComponent.xml,AutoComponent_Source.jinja,$path/$fileprefix.AutoComponent.cpp
            *.AutoComponent.xml,AutoComponentTypes_Header.jinja,$path/AutoComponentTypes.h
            *.AutoComponent.xml,AutoComponentTypes_Source.jinja,$path/AutoComponentTypes.cpp
    )

    ly_add_target(
        NAME MultiplayerSample.Server.Static STATIC
        NAMESPACE Gem
        FILES_CMAKE
            multiplayersample_autogen_files.cmake
            multiplayersample_files.cmake
            ${pal_dir}/multiplayersample_${PAL_PLATFORM_NAME_LOWERCASE}_files.cmake
        BUILD_DEPENDENCIES
            PUBLIC
                Gem::PhysX
                Gem::Multiplayer
            PRIVATE
                Gem::Multiplayer.Server.Static
                Gem::PhysX.Static
        AUTOGEN_RULES
            *.AutoComponent.xml,AutoComponent_Header.jinja,$path/$fileprefix.AutoComponent.h
            *.AutoComponent.xml,AutoComponent_Source.jinja,$path/$fileprefix.AutoComponent.cpp
            *.AutoComponent.xml,AutoComponentTypes_Header.jinja,$path/AutoComponentTypes.h
            *.AutoComponent.xml,AutoComponentTypes_Source.jinja,$path/AutoComponentTypes.cpp
    )

    ly_add_target(
        NAME MultiplayerSample.Unified.Static STATIC
        NAMESPACE Gem
        FILES_CMAKE
            multiplayersample_autogen_files.cmake
            multiplayersample_files.cmake
            ${pal_dir}/multiplayersample_${PAL_PLATFORM_NAME_LOWERCASE}_files.cmake
        BUILD_DEPENDENCIES
            PUBLIC
                Gem::DebugDraw
                Gem::PhysX
                Gem::Multiplayer
            PRIVATE
                Gem::Multiplayer.Unified.Static
                Gem::PhysX.Static
                Gem::DebugDraw.Static
                Gem::ImGui.Static
        AUTOGEN_RULES
            *.AutoComponent.xml,AutoComponent_Header.jinja,$path/$fileprefix.AutoComponent.h
            *.AutoComponent.xml,AutoComponent_Source.jinja,$path/$fileprefix.AutoComponent.cpp
            *.AutoComponent.xml,AutoComponentTypes_Header.jinja,$path/AutoComponentTypes.h
            *.AutoComponent.xml,AutoComponentTypes_Source.jinja,$path/AutoComponentTypes.cpp
    )
```

Meanwhile, Multiplayer_ScriptCanvas only requires core datatypes so it only uses Multiplayer.Common

```cmake
    ly_add_target(
        NAME ${gem_name}.Static STATIC
        NAMESPACE Gem
        FILES_CMAKE
            scriptcanvas_multiplayer_files.cmake
            scriptcanvas_autogen_files.cmake
        BUILD_DEPENDENCIES
            PUBLIC
                Gem::ScriptCanvas
            PRIVATE
                Gem::Multiplayer.Common.Static
    )
```
### Conditional compilation

MultiplayerComponents are subject to conditional compilation. This is done using the macros `AZ_TRAIT_CLIENT` and `AZ_TRAIT_SERVER`. Client-specific logic should be wrapped in the former, while server-specific logic should be wrapped in the latter. The motivation for this approach is to allow target specific logic in MultiplayerComponents without requiring target specific files (i.e. a ServerComponent and ClientComponent with or without a BaseComponent).

In the Multiplayer Gem's cmake, observe that each target enables or disables these traits based on the target. For example, Server enables `AZ_TRAIT_SERVER` while disabling `AZ_TRAIT_CLIENT`. Usage of these targets will bring the macro definitions with them.

{{< note >}}
The following CMake example is abbreviated.
{{< /note >}}

```cmake
    ly_add_target(
        NAME Multiplayer.Client.Static STATIC
        NAMESPACE Gem
        FILES_CMAKE
            multiplayer_split_files.cmake
        COMPILE_DEFINITIONS
            PUBLIC
                AZ_TRAIT_CLIENT=1
                AZ_TRAIT_SERVER=0
        BUILD_DEPENDENCIES
            PUBLIC
                AZ::AzCore
                AZ::AzFramework
                AZ::AzNetworking
                Gem::Multiplayer.Common.Static
    )

    ly_add_target(
        NAME Multiplayer.Server.Static STATIC
        NAMESPACE Gem
        FILES_CMAKE
            multiplayer_split_files.cmake
        COMPILE_DEFINITIONS
            PUBLIC
                AZ_TRAIT_CLIENT=0
                AZ_TRAIT_SERVER=1
        BUILD_DEPENDENCIES
            PUBLIC
                AZ::AzCore
                AZ::AzFramework
                AZ::AzNetworking
                Gem::Multiplayer.Common.Static
    )

    ly_add_target(
        NAME Multiplayer.Unified.Static STATIC
        NAMESPACE Gem
        FILES_CMAKE
            multiplayer_split_files.cmake
        COMPILE_DEFINITIONS
            PUBLIC
                AZ_TRAIT_CLIENT=1
                AZ_TRAIT_SERVER=1
        BUILD_DEPENDENCIES
            PUBLIC
                AZ::AzCore
                AZ::AzFramework
                AZ::AzNetworking
                Gem::Multiplayer.Common.Static
    )
```

### AutoComponents

AutoComponents make use of `AZ_TRAIT_SERVER` and `AZ_TRAIT_CLIENT`. Depending on the specification of elements of a component, they will conditionally exclude logic. For example, given an RPC that is invoked on the client and handled on the server, the invocation signal will be wrapped in `AZ_TRAIT_CLIENT` while the handler will be wrapped in `AZ_TRAIT_SERVER`. Classes inheriting from AutoComponents will need to honor these usages in order to compile correctly.

Consider the following RPC:

```xml
    <RemoteProcedure Name="SendClientInput" InvokeFrom="Autonomous" HandleOn="Authority" IsPublic="true" IsReliable="false" GenerateEventBindings="false" Description="Client to server move / input RPC">
        <Param Type="Multiplayer::NetworkInputArray" Name="inputArray"  />
        <Param Type="AZ::HashValue32" Name="stateHash" />
    </RemoteProcedure>
```

This generates the following AutoComponent signatures:

```cpp
    //! SendClientInput Invocation
    //! Client to server move / input RPC
    //! HandleOn Authority
    #if AZ_TRAIT_CLIENT
    void SendClientInput(const Multiplayer::NetworkInputArray& inputArray, const AZ::HashValue32& stateHash);
    #endif

    #if AZ_TRAIT_SERVER
    //! SendClientInput Handler
    //! Client to server move / input RPC
    //! HandleOn Authority
    virtual void HandleSendClientInput(AzNetworking::IConnection* invokingConnection, const Multiplayer::NetworkInputArray& inputArray, const AZ::HashValue32& stateHash) {}
    #endif
```

A component inheriting from this AutoComponent that overrides HandleSendClientInput would need to similarly wrap it in `AZ_TRAIT_SERVER` as well.