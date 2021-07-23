---
title: Deep Dive into Replication
linktitle: Replication Behind The Scenes
description: An insider look into one of the core system of Multiplayer Gem - Replicaiton.
---

## Introduction

This guide will take a look at the key replication concepts and logic behind the scenes in Multiplayer Gem.
Our starting base will be O3DE MultiplayerSample project. You can find the instructions on how to build and run it here: https://github.com/o3de/o3de-multiplayersample/blob/development/README.md

{{<note>}}
Snippets of code and code-generated files in this guide are meant to be taken as example. The actual code may differ over time as O3DE Multiplayer Gem develops.
{{</note>}}

## Network Entity

In order for an entity to be replicated from a server down to clients, the entity must have the following two components on it:

* Network Binding Component
* Network Transform Component

![Network Binding and Transform Components](/images/user-guide/multiplayer/network_binding_and_transform_components.png)

With this context in mind, let's go over some important questions and scenarios in replication code of Multiplayer Gem.

## Topics

### How Does A Server Find Out About A New Network Entity?

```c++
Multiplayer.dll!Multiplayer::ServerToClientReplicationWindow::OnEntityActivated(AZ::Entity * entity) Line 220 C++
...
MultiplayerSample.ServerLauncher.exe!AZ::Event<AZ::Entity *>::Signal(AZ::Entity * const & <params_0>) Line 253 C++
MultiplayerSample.ServerLauncher.exe!AZ::ComponentApplication::SignalEntityActivated(AZ::Entity * entity) Line 1042 C++
MultiplayerSample.ServerLauncher.exe!AZ::Entity::Activate() Line 228 C++
MultiplayerSample.ServerLauncher.exe!AzFramework::GameEntityContextComponent::OnContextEntitiesAdded(const AZStd::vector<AZ::Entity *,AZStd::allocator> & entities) Line 232 C++
MultiplayerSample.ServerLauncher.exe!AzFramework::EntityContext::HandleEntitiesAdded(const AZStd::vector<AZ::Entity *,AZStd::allocator> & entities) Line 184 C++
MultiplayerSample.ServerLauncher.exe!AzFramework::SliceEntityOwnershipService::AddEntity(AZ::Entity * entity) Line 122 C++
```

`ServerToClientReplicationWindow` is a server-side object that handles entity replication to a client. There is one of such objects for each connected client to a server. It signs up for entity activation events, whenever a new entity is activated that has network components on them, it will add it for replication, if applicable.

However, the actual serialization occurs in another important class - `EntityReplicationManager`. There is one `EntityReplicationManager` for each client connection:

```c++
Multiplayer.dll!Multiplayer::EntityReplicationManager::EntityReplicationManager(AzNetworking::IConnection & connection, AzNetworking::IConnectionListener & connectionListener, Multiplayer::EntityReplicationManager::Mode updateMode) Line 57 C++
Multiplayer.dll!Multiplayer::ServerToClientConnectionData::ServerToClientConnectionData(AzNetworking::IConnection * connection, AzNetworking::IConnectionListener & connectionListener, Multiplayer::NetworkEntityHandle controlledEntity) Line 33 C++
Multiplayer.dll!Multiplayer::MultiplayerSystemComponent::OnConnect(AzNetworking::IConnection * connection) Line 615 C++
Multiplayer.dll!AzNetworking::UdpNetworkInterface::AcceptConnection(const AzNetworking::UdpReaderThread::ReceivedPacket & connectPacket) Line 650 C++
Multiplayer.dll!AzNetworking::UdpNetworkInterface::Update(AZ::TimeMs deltaTimeMs) Line 186 C++
Multiplayer.dll!AzNetworking::NetworkingSystemComponent::OnTick(float deltaTime, AZ::ScriptTimePoint time) Line 81 C++
```

On every server tick, `EntityReplicationManager` handles replication of network entities.

```c++
Multiplayer.dll!Multiplayer::EntityReplicator::EntityReplicator(Multiplayer::EntityReplicationManager & replicationManager, AzNetworking::IConnection * connection, Multiplayer::NetEntityRole remoteNetworkRole, const Multiplayer::ConstNetworkEntityHandle & entityHandle) Line 60 C++
Multiplayer.dll!AZStd::make_unique<Multiplayer::EntityReplicator,Multiplayer::EntityReplicationManager &,AzNetworking::IConnection *,enum Multiplayer::NetEntityRole &,Multiplayer::ConstNetworkEntityHandle const &>(Multiplayer::EntityReplicationManager & <args_0>, AzNetworking::IConnection * && <args_1>, Multiplayer::NetEntityRole & <args_2>, const Multiplayer::ConstNetworkEntityHandle & <args_3>) Line 54 C++
Multiplayer.dll!Multiplayer::EntityReplicationManager::AddEntityReplicator(const Multiplayer::ConstNetworkEntityHandle & entityHandle, Multiplayer::NetEntityRole remoteNetworkRole) Line 399 C++
Multiplayer.dll!Multiplayer::EntityReplicationManager::UpdateWindow() Line 982 C++
...
MultiplayerSample.ServerLauncher.exe!AZ::EventSchedulerSystemComponent::OnTick(float deltaTime, AZ::ScriptTimePoint time) Line 90 C++
...
MultiplayerSample.ServerLauncher.exe!AZ::Internal::EBusContainer<AZ::TickEvents,AZ::TickEvents,0,2>::Dispatcher<AZ::EBus<AZ::TickEvents,AZ::TickEvents>>::Broadcast<void (__cdecl AZ::TickEvents::*)(float,AZ::ScriptTimePoint),float &,AZ::ScriptTimePoint>(void(AZ::TickEvents::*)(float, AZ::ScriptTimePoint) && func, float & <args_0>, AZ::ScriptTimePoint && <args_1>) Line 1369 C++
MultiplayerSample.ServerLauncher.exe!AZ::ComponentApplication::Tick(float deltaOverride) Line 1421 C++
```

For each network entity there is an `EntityReplicator` for each connected client, assuming that the entity is within awareness radius of `EntityReplicationManager`. Here is the variable that controls that:

```c++
AZ_CVAR(float, sv_ClientAwarenessRadius, 500.0f, nullptr, AZ::ConsoleFunctorFlags::Null, "The maximum distance entities can be from the client and still be relevant");
```

{{<important>}}
While O3DE engine uses AZ::EntityId to identify entities, Multiplayer Gem introduces its own entity identifier: Multiplayer::NetEntityId.
{{</important>}}

```c++
AZ_TYPE_SAFE_INTEGRAL(NetEntityId, uint32_t);
static constexpr NetEntityId InvalidNetEntityId = static_cast<NetEntityId>(-1);
```

There is a one to one mapping between AZ::EntityId and Multiplayer::NetEntityId for network entities.



### How Does a New Client on a Server Becomes Aware of Existing Entities?

*	a queued even kicks off ServerToClientReplicationWindow::UpdateWindow
*	that performs a sphere test around the player on the server and picks up any new or removed entities

![Server Selecting Entities to Replicate to a Client](/images/user-guide/multiplayer/server_selecting_entities_for_player_to_replicate.png)


### How Does a Server Mark an Entity as Autonomous on Clients?

* NetBindComponent is the main network component on an entity. It keeps track of the net role of an entity - NetBindComponent::m_netEntityRole

![Client Marking Components as Autonomous](/images/user-guide/multiplayer/on_client_marking_as_autonomous.png)

Stack:
```c++
>	Multiplayer.dll!Multiplayer::NetBindComponent::PreInit(AZ::Entity * entity, const Multiplayer::PrefabEntityId & prefabEntityId, Multiplayer::NetEntityId netEntityId, Multiplayer::NetEntityRole netEntityRole) Line 497	C++
 	Multiplayer.dll!Multiplayer::NetworkEntityManager::CreateEntitiesImmediate(const Multiplayer::PrefabEntityId & prefabEntryId, Multiplayer::NetEntityId netEntityId, Multiplayer::NetEntityRole netEntityRole, Multiplayer::AutoActivate autoActivate, const AZ::Transform & transform) Line 448	C++
 	Multiplayer.dll!Multiplayer::EntityReplicationManager::HandlePropertyChangeMessage(Multiplayer::EntityReplicator * entityReplicator, AzNetworking::PacketId packetId, Multiplayer::NetEntityId netEntityId, Multiplayer::NetEntityRole localNetworkRole, AzNetworking::ISerializer & serializer, const Multiplayer::PrefabEntityId & prefabEntityId) Line 554	C++
 	Multiplayer.dll!Multiplayer::EntityReplicationManager::HandleEntityUpdateMessage(AzNetworking::IConnection * invokingConnection, const AzNetworking::IPacketHeader & packetHeader, const Multiplayer::NetworkEntityUpdateMessage & updateMessage) Line 805	C++
 	Multiplayer.dll!Multiplayer::MultiplayerSystemComponent::HandleRequest(AzNetworking::IConnection * connection, const AzNetworking::IPacketHeader & packetHeader, MultiplayerPackets::EntityUpdates & packet) Line 530	C++
 	Multiplayer.dll!MultiplayerPackets::DispatchPacket<Multiplayer::MultiplayerSystemComponent>(AzNetworking::IConnection * connection, const AzNetworking::IPacketHeader & packetHeader, AzNetworking::ISerializer & serializer, Multiplayer::MultiplayerSystemComponent & handler) Line 79	C++
 	Multiplayer.dll!AzNetworking::UdpNetworkInterface::Update(AZ::TimeMs deltaTimeMs) Line 276	C++
 	Multiplayer.dll!AzNetworking::NetworkingSystemComponent::OnTick(float deltaTime, AZ::ScriptTimePoint time) Line 81	C++
 	[Inline Frame] MultiplayerSample.GameLauncher.exe!AZStd::Internal::INVOKE(void(AZ::TickEvents::*)(float, AZ::ScriptTimePoint) &) Line 181	C++
 	[Inline Frame] MultiplayerSample.GameLauncher.exe!AZStd::invoke(void(AZ::TickEvents::*)(float, AZ::ScriptTimePoint) &) Line 42	C++
 	[Inline Frame] MultiplayerSample.GameLauncher.exe!AZ::EBusEventProcessingPolicy::Call(void(AZ::TickEvents::*)(float, AZ::ScriptTimePoint) &) Line 450	C++
 	[Inline Frame] MultiplayerSample.GameLauncher.exe!AZ::Debug::AssetTrackingEventProcessingPolicy<AZ::EBusEventProcessingPolicy>::Call(void(AZ::TickEvents::*)(float, AZ::ScriptTimePoint) &) Line 129	C++
 	MultiplayerSample.GameLauncher.exe!AZ::Internal::EBusContainer<AZ::TickEvents,AZ::TickEvents,0,2>::Dispatcher<AZ::EBus<AZ::TickEvents,AZ::TickEvents>>::Broadcast<void (__cdecl AZ::TickEvents::*)(float,AZ::ScriptTimePoint),float &,AZ::ScriptTimePoint>(void(AZ::TickEvents::*)(float, AZ::ScriptTimePoint) && func, float & <args_0>, AZ::ScriptTimePoint && <args_1>) Line 1369	C++
 	MultiplayerSample.GameLauncher.exe!AZ::ComponentApplication::Tick(float deltaOverride) Line 1421	C++
```

### Structure of Network Update Message

```c++
NetworkEntityUpdateMessage

        NetEntityRole  m_networkRole = NetEntityRole::InvalidRole;
        NetEntityId    m_entityId = InvalidNetEntityId;
        bool           m_isDelete = false;
        bool           m_wasMigrated = false;
        bool           m_takeOwnership = false;
        bool           m_hasValidPrefabId = false;
        PrefabEntityId m_prefabEntityId;
```

* AutoActivate::DoNotActivate - prefabs are immediately instantiated one entity at a time (?), the entity is not activated until its prepared later on, I'm assuming prepared with the Entity Update packet payload
* m_prefabEntityId - is an index to the entity within the prefab associated with the network entity id (which is different from AZ::EntityId)

### How does O3DE Networking listen for changes in Components?

Here is a flow of registering for changes in a component? (Transform Component in this example.)

![Client Marking Components as Autonomous](/images/user-guide/multiplayer/server_listening_on_changes_in_components.png)


### How does a change to a Network Property on a Server get replicated to Clients?

An example of a stack:

```c++
> Multiplayer.dll!Multiplayer::NetworkTransformComponentBase::SerializeStateDeltaMessage(Multiplayer::ReplicationRecord & replicationRecord, AzNetworking::ISerializer & serializer) Line 974 C++
  Multiplayer.dll!Multiplayer::NetBindComponent::SerializeStateDeltaMessage(Multiplayer::ReplicationRecord & replicationRecord, AzNetworking::ISerializer & serializer) Line 456 C++
  [Inline Frame] Multiplayer.dll!Multiplayer::PropertyPublisher::SerializeUpdateEntityRecord(AzNetworking::ISerializer &) Line 168 C++
  Multiplayer.dll!Multiplayer::PropertyPublisher::UpdateSerialization(AzNetworking::ISerializer & serializer) Line 306 C++
  Multiplayer.dll!Multiplayer::EntityReplicator::GenerateUpdatePacket() Line 443 C++
  Multiplayer.dll!Multiplayer::EntityReplicationManager::SendEntityUpdatesPacketHelper(AZ::TimeMs hostTimeMs, AZStd::deque<Multiplayer::EntityReplicator *,AZStd::allocator,2,8> & toSendList, unsigned int maxPayloadSize, AzNetworking::IConnection & connection) Line 142 C++
  Multiplayer.dll!Multiplayer::EntityReplicationManager::SendEntityUpdates(AZ::TimeMs hostTimeMs) Line 273 C++
  Multiplayer.dll!Multiplayer::EntityReplicationManager::SendUpdates(AZ::TimeMs hostTimeMs) Line 105 C++
  Multiplayer.dll!Multiplayer::ServerToClientConnectionData::Update(AZ::TimeMs hostTimeMs) Line 79 C++
  Multiplayer.dll!Multiplayer::MultiplayerSystemComponent::OnTick::__l9::<lambda>(AzNetworking::IConnection & connection) Line 321 C++
```

### Serialization Update Callstack


![Server: Serialization Callstack](/images/user-guide/multiplayer/on_server_update_serialization_callstack.png)


## Network Transform Component

We will start with a very typical and common network component - a network transform component. 

### Auto Component XML

Let's start by looking at the source of a network component: it's XML based structure that is the basis for the codegen that produces multiplayer code for you.
Here is the content of `Gems\Multiplayer\Code\Source\AutoGen\NetworkTransformComponent.AutoComponent.xml`

```xml
<?xml version="1.0"?>

<Component
    Name="NetworkTransformComponent"
    Namespace="Multiplayer"
    OverrideComponent="true"
    OverrideController="true"
    OverrideInclude="Multiplayer/Components/NetworkTransformComponent.h"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

    <ComponentRelation Constraint="Weak" HasController="false" Name="TransformComponent" Namespace="AzFramework" Include="AzFramework/Components/TransformComponent.h" />

    <Include File="Multiplayer/MultiplayerTypes.h"/>

    <NetworkProperty Type="AZ::Quaternion" Name="rotation" Init="AZ::Quaternion::CreateIdentity()" ReplicateFrom="Authority" ReplicateTo="Client" IsRewindable="true" IsPredictable="true" IsPublic="true" Container="Object" ExposeToEditor="false" ExposeToScript="false" GenerateEventBindings="true" />
    <NetworkProperty Type="AZ::Vector3" Name="translation" Init="AZ::Vector3::CreateZero()" ReplicateFrom="Authority" ReplicateTo="Client" IsRewindable="true" IsPredictable="true" IsPublic="true" Container="Object" ExposeToEditor="false" ExposeToScript="false" GenerateEventBindings="true" />
    <NetworkProperty Type="float" Name="scale" Init="1.0f" ReplicateFrom="Authority" ReplicateTo="Client" IsRewindable="true" IsPredictable="true" IsPublic="true" Container="Object" ExposeToEditor="false" ExposeToScript="false" GenerateEventBindings="true" />
    <NetworkProperty Type="uint8_t"     Name="resetCount" Init="0" ReplicateFrom="Authority" ReplicateTo="Client" IsRewindable="false" IsPredictable="true" IsPublic="true" Container="Object" ExposeToEditor="false" ExposeToScript="false" GenerateEventBindings="true" />
    <NetworkProperty Type="NetEntityId" Name="parentEntityId" Init="InvalidNetEntityId" ReplicateFrom="Authority" ReplicateTo="Client" IsRewindable="true" IsPredictable="true" IsPublic="true" Container="Object" ExposeToEditor="false" ExposeToScript="false" GenerateEventBindings="true" />
    <NetworkProperty Type="int32_t"     Name="parentAttachmentBoneId" Init="-1" ReplicateFrom="Authority" ReplicateTo="Client" IsRewindable="true" IsPredictable="true" IsPublic="true" Container="Object" ExposeToEditor="false" ExposeToScript="false" GenerateEventBindings="true" />

</Component>
```

Stripping away the non-essentials, the key elements are those of `NetworkProperty`. Here is what is going on here. This xml defines a C++ component with a set fo network properties. One of these properties is `translation`, which in this context means a world position.

#### Network Property

```xml
<NetworkProperty Type="AZ::Vector3" Name="translation" ReplicateFrom="Authority" ReplicateTo="Client"... />
```

`Type="AZ::Vector3"` must reference a valid C++ type. In this case it's using C++ type from `Code\Framework\AzCore\AzCore\Math\Vector3.h`. `translation` is the user chosen name for the property. `ReplicateFrom` and `ReplicateTo` defines the direction of the replication. In general, there are two main directions: from a server to clients, and from a client to a server. (There is also server to server direction but it will not be discussed here.) But there are some details here to be aware of. 

There are four supported replication directions:

* `Authority` (Server) to `Client` - This is the direction of an authoritative server sending data to clients. This is the most common and simplest case. Xml defition for this direction would be: `ReplicateFrom="Authority" ReplicateTo="Client"`

* `Authority` (Server) to `Autonomous` (Client) - This one is the case of an authoritative server sending data to an autonomous client, which means a client object that is capable of controlling and locally predicting itself, such as a network player character controller. Xml defition for this direction would be: `ReplicateFrom="Authority" ReplicateTo="Autonomous"`

* `Autonomous` (Client) to `Authority` (Server) - This is the opposite direction, where a locally controlled client object sends data back to the authoritative server. Xml defition for this direction would be: `ReplicateFrom="Autonomous" ReplicateTo="Authority"`

* `Authority` (Server) to `Server` - This direction only applies in multi-server setupsand will not be covered in this guide. Xml defition for this direction would be: `ReplicateFrom="Authority" ReplicateTo="Server"`


#### Generated Code of Network Property

So for a network property `translation` of `NetworkTransformComponent` defined as:

```xml
<NetworkProperty Type="AZ::Vector3" Name="translation" Init="AZ::Vector3::CreateZero()" ReplicateFrom="Authority" ReplicateTo="Client" IsRewindable="true" IsPredictable="true" IsPublic="true" Container="Object" ExposeToEditor="false" ExposeToScript="false" GenerateEventBindings="true" />
```

Its generated member variable definition would be in a code-generated file inside your build folder, for example at `<build-location>\External\Multiplayer-80a10118\Code\Azcg\Generated\Source\AutoGen\NetworkTransformComponent.AutoComponent.h`.

```c++
Multiplayer::RewindableObject<AZ::Vector3, Multiplayer::RewindHistorySize> m_translation = AZ::Vector3::CreateZero();
```

{{<note>}}
Most of the time, one should not be concerned with the generated code but it can be useful to be aware of where the code and what is generated from the Auto XML definitions.
{{</note>}}

