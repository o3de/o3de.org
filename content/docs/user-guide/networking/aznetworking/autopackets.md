---
linktitle: Auto-packets
title: Networking Auto-packets
description: Learn how to define Open 3D Engine (O3DE) networking packets through auto-packets.
weight: 200
---

*Auto-packets* provide a convenient way to define network packets used to communicate data between endpoints in an `AzNetworking` session. Using the [AzAutoGen](/docs/user-guide/programming/autogen) system, auto-packet files found inside of your project are processed during builds to create C++ classes and handlers for packets with defined payloads.

In order to enable auto-packet builds for your project, you must add AZ::AzNetworking as a build dependency of your project.

## Auto-packet file structure

Auto-packets are defined in XML files, placed in the `Code\Source\Autogen` directory of the relevant project or Gem.

### PacketGroup attributes

The top-level element of an auto-packet definition is a `PacketGroup`. Packet groups associate different types of individual packet definitions together. Packets defined as part of a packet group are placed into the same namespace.

| Property | Description | Type |
|---|---|---|
| Name | The namespace for generated auto-packets. | A valid C++ namespace identifier. |
| PacketStart | The value at which to start sequencing packet type identifiers for this packet group. To avoid conflicts with the core `AzNetworking` framework, use `CorePackets::PacketType::Max`. | `const int32` |

### Packet attributes

The `Packet` tag defines a new packet.

| Property | Description | Type |
|---|---|---|
| Name | The class name of the generated auto-packet. | A valid C++ class identifier. |
| Desc | The description of the generated auto-packet. | `string` |
| HandshakePacket | If enabled, the packet is part of a connection handshake. | `bool` |

{{< note >}}
Packets with `HandshakePacket` set as true are processed only if the user-implemented `IsHandshakeComplete` function for the packet returns `false`.
{{< /note >}}

### Member attributes

The `Member` tag defines data on the packet. This is the primary mechanism for defining a packet's payload.

| Property | Description | Type |
|---|---|---|
| Name | The name of the packet member. | A valid C++ variable name. |
| Type | The type of the packet member. | A valid C++ type. |
| Init | The initial value of the packet member. | `<Type>` |
| Container | If provided, the member is a container of `<Type>`. | `Vector`, `Array`|
| | **Vector**: A resizeable vector. |
| | **Array**: A fixed size array. | |
| Count | If Container is provided, the size of the container. | `uint` |

### Include

AzAutoGen uses the `Include` tag to generate the `#includes` of the C++ code. Use an `Include` tag for each header used by the generated classes.

| Property | Description | Type |
|---|---|---|
| File | The path to a header to add as an `#include` of the generated source. | `string` |

### Example

The following is an example of an [auto-packet group used for the Multiplayer Gem](https://github.com/o3de/o3de/blob/main/Gems/Multiplayer/Code/Source/AutoGen/Multiplayer.AutoPackets.xml).

```xml
<?xml version="1.0" encoding="utf-8"?>

<PacketGroup Name="MultiplayerPackets" PacketStart="CorePackets::PacketType::MAX">
    <Include File="AzNetworking/AutoGen/CorePackets.AutoPackets.h" />
    <Include File="Multiplayer/MultiplayerTypes.h" />
    <Include File="Multiplayer/NetworkTime/INetworkTime.h" />
    <Include File="Multiplayer/NetworkEntity/NetworkEntityRpcMessage.h" />
    <Include File="Multiplayer/NetworkEntity/NetworkEntityUpdateMessage.h" />

    <Packet Name="Connect" HandshakePacket="true" Desc="Client connection packet, on success the server will reply with an Accept">
        <Member Type="uint16_t" Name="networkProtocolVersion" Init="0" />
        <Member Type="Multiplayer::LongNetworkString" Name="ticket" />
    </Packet>

    <Packet Name="Accept" HandshakePacket="true" Desc="Server accept packet">
        <Member Type="Multiplayer::HostId" Name="hostId" Init="Multiplayer::InvalidHostId" />
        <Member Type="Multiplayer::LongNetworkString" Name="map" />
    </Packet>
  
    <Packet Name="ReadyForEntityUpdates" Desc="Client confirming it is ready to receive entity updates">
      <Member Type="bool" Name="readyForEntityUpdates" />
    </Packet>

    <Packet Name="SyncConsole" Desc="Packet for synchornizing cvars between hosts">
        <Member Type="Multiplayer::LongNetworkString" Name="commandSet" Container="Vector" Count="32" />
    </Packet>

    <Packet Name="ConsoleCommand" Desc="Packet for executing a server command from the client">
        <Member Type="Multiplayer::LongNetworkString" Name="command" />
    </Packet>

    <Packet Name="EntityUpdates" Desc="A packet that contains multiple entity updates">
        <Member Type="AZ::TimeMs" Name="hostTimeMs" Init="AZ::TimeMs{ 0 }" />
        <Member Type="Multiplayer::HostFrameId" Name="hostFrameId" Init="Multiplayer::InvalidHostFrameId" />
        <Member Type="Multiplayer::NetworkEntityUpdateMessage" Name="entityMessages" Container="Vector" Count="Multiplayer::MaxAggregateEntityMessages" />
    </Packet>

    <Packet Name="EntityRpcs" Desc="A packet that contains multiple entity rpcs">
        <Member Type="Multiplayer::NetworkEntityRpcMessage" Name="entityRpcs" Container="Vector" Count="Multiplayer::MaxAggregateRpcMessages" />
    </Packet>

    <Packet Name="ClientMigration" Desc="Tell a client to migrate to a new server">
        <Member Type="uint64_t" Name="temporaryUserIdentifier" Init="0" />
        <Member Type="AzNetworking::IpAddress" Name="remoteServerAddress" Init="AzNetworking::IpAddress()" />
        <Member Type="AZ::TimeMs" Name="lastInputGameTimeMs" Init="AZ::TimeMs{ 0 }" />
    </Packet>
</PacketGroup>
```

### Packet Handling

With the exception of CorePackets defined in AzNetworking, packets are handled via the IConnectionListener interface. Implementers of this interface typically define the following:

```C++
    //! IConnectionListener interface
    //! @{
    AzNetworking::ConnectResult ValidateConnect(const AzNetworking::IpAddress& remoteAddress, const AzNetworking::IPacketHeader& packetHeader, AzNetworking::ISerializer& serializer) override;
    void OnConnect(AzNetworking::IConnection* connection) override;
    AzNetworking::PacketDispatchResult OnPacketReceived(AzNetworking::IConnection* connection, const AzNetworking::IPacketHeader& packetHeader, AzNetworking::ISerializer& serializer) override;
    void OnPacketLost(AzNetworking::IConnection* connection, AzNetworking::PacketId packetId) override;
    void OnDisconnect(AzNetworking::IConnection* connection, AzNetworking::DisconnectReason reason, AzNetworking::TerminationEndpoint endpoint) override;
    //! @}
```

OnPacketReceived is of interest here as it will forward to your PacketGroup's dispatcher in the fashion of:

```C++
    AzNetworking::PacketDispatchResult MultiplayerSystemComponent::OnPacketReceived(AzNetworking::IConnection* connection, const IPacketHeader& packetHeader, ISerializer& serializer)
    {
        return MultiplayerPackets::DispatchPacket(connection, packetHeader, serializer, *this);
    }
```

The dispatcher expects the IConnectionListener implementer to implement an IsHandshakeComplete function and for each packet, a HandleRequest function. The above example of MultiplayerPackets is handled in [MultiplayerSystemComponent](https://github.com/o3de/o3de/blob/main/Gems/Multiplayer/Code/Source/MultiplayerSystemComponent.h).

#### IsHandshakeComplete

This function checks if handshake logic for the IConnectionListener is complete. This is useful for specifying any additional handshake logic beyond that in AzNetworking. For example, Multiplayer uses this to check with ISessionProvider before beginning to process gameplay traffic. While IsHandshakeComplete returns false, only packets designated as HandshakePackets will process. All other packet types will be skipped.

#### HandleRequest

HandleRequest defines a callback for each packet type.

| Property | Description | Type |
|---|---|---|
| connection | The connection the packet was sent on. | `AzNetworking::IConnection*` |
| packetHeader | The header of the packet. | `const IPacketHeader&` |
| packet | The packet itself as defined by AzCodeGen. | `<Type>`: Must be a valid packet type of the related packet group. |
