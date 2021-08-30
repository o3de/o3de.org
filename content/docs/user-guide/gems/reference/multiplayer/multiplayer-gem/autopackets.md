---
title: Multiplayer AutoPackets
description: A reference for defining Open 3D Engine multiplayer packets through autopackets.
linktitle: AutoPackets
---

*AutoPackets* provide a convenient way to define network packets used to communicate data between endpoints in a Multiplayer session. Using the [AzAutoGen](/docs/user-guide/engine/autogen) system, autopacket files found inside of your project are processed during builds to create C++ classes and handlers for packets with defined payloads.

In order to enable autopacket builds for your project, follow the instructions in [Multiplayer Project Configuration](./configuration).

## AutoPacket file structure

AutoPackets are defined in XML files, placed in the `Code\Source\Autogen` directory of the Multiplayer Gem.

### PacketGroup attributes

The PacketGroup defines a set of packets that are identified in increasing numerical order

| Property | Description | Type |
|---|---|---|---|
| Name | The class name of the group of generated autopacket. | `string`: Must be a valid C++ class name. |
| PacketStart | The value from which to begin IDing packets, typically CorePackets::PacketType::Max. | `PacketType`: Must be a PacketType value. |

### Packet attributes

The `Packet` tag defines the name, description and handshake relevance of the packet

| Property | Description | Type |
|---|---|---|---|
| Name | The class name of the generated autopacket. | `string`: Must be a valid C++ class name. |
| Desc | The description of the generated autopacket. | `string`: A user friendly string description of the packet. |
| HandshakePacket | If the packet is part of a connection handshake. | `string`: Only packets with HandshakePacket as true can be processed while the user implemented IsHandshakeComplete function returns false. |

### Member attributes

The `Member` tag defines a member on the packet. This is the primary mechanism for defining a packet's payload.

| Property | Description | Type |
|---|---|---|---|
| Name | The name of the packet member. | `string`: Must be a valid C++ variable name. |
| Type | The type of the packet member. | `string`: Must be a valid C++ type. |
| Init | The initial value of the packet member. | `<Type>`: Must be a valid value of `<Type>`. |
| Container | If specified, the member represents a container of `<Type>`. | `Vector`, `Array`|
| | **Vector**: A resizeable vector. |
| | **Array**: A fixed size array. | |
| Count | If Container is specified, the size of the container. | `uint` |

### Include

The `Include` tag is used to generate the `#includes` of the C++ code. Use an `Include` tag for each header that your generated classes will use.

| Property | Description | Type |
| File | The path to a header to add as an `#include` of the generated source. | `string` |

### Example

The following is an example of an autopacket group used for the Multiplayer Gem.

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

Packets are handled via the IConnectionListener interface. Implementers of this interface typically define the following:

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

The dispatcher expects the IConnectionListener implementer to implement an IsHandshakeComplete function and for each packet, a HandleRequest function.

#### IsHandshakeComplete

This function checks if handshake logic for the IConnectionListener is complete. This is useful for specifying any additional handshake logic beyond that in AzNetworking. For example, Multiplayer uses this to check with ISessionProvider before beginning to process gameplay traffic. While IsHandshakeComplete returns false, only packets designated as HandshakePackets will process. All other packet types will be skipped.

#### HandleRequest

HandleRequest defines a callback for each packet type.

| Property | Description | Type |
|---|---|---|---|
| connection | The connection the packet was sent on. | `AzNetworking::IConnection*` |
| packetHeader | The header of the packet. | `const IPacketHeader&` |
| packet | The packet itself as defined by AzCodeGen. | `<Type>`: Must be a valid packet type of the related packet group. |