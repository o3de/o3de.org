---
linktitle: Packet Structure
title: Network Packet Structure
description: An overview and reference for the structure of UDP and TCP packets that the Open 3D Engine (O3DE) networking stack uses.
weight: 100
---

**Open 3D Engine (O3DE)** supports both TCP and UDP protocols in its networking stack. This gives you the flexibility to choose how to connect your game to existing services and what level of overhead you want to introduce on server communications. While TCP packets contain minimal information themselves, there is the overhead (and assurance) of the TCP protocol behind these connections. UDP packets contain longer headers to help address consistency, even when packets may be dropped. This enables custom recovery mechanisms through O3DE Gems that allow for features such as rollback.

This section only describes the overall packet structure, and doesn't cover best practices or information on efficient implementation of packet payload data.

## Packet structures

| TCP Packet Structure | UDP Packet Structure |
|--|--|
| ![TCP packets: Flags 1 byte, type 2 bytes, size 2 bytes](/images/user-guide/networking/tcp-packet-structure.png) | ![UDP Packets: Flags 1 byte, type 2 bytes, local seq ID 2 bytes, remote seq ID 2 bytes, ACK replication 4 bytes, reliability flag 1 byte, reliable seq ID 2 bytes (if reliability flag set)](/images/user-guide/networking/udp-packet-structure.png) |

## Packet Flags and Types information

Packet Flags are an 8-bit value, stored at the start of the packet.

| Flag | Bit | Description |
|--|--|--|
| Compressed | `0` | Whether or not the data transmission portion of the packet is compressed via an [`ICompressor`](/docs/api/frameworks/aznetworking/class_az_networking_1_1_i_compressor.html) implementation. |
| N/A | 1-7 | Reserved for future use. |

The packet type is a 16-bit value which can be set to any numeric identifier, although the values in the range `CorePackets::PacketType::START..CorePackets::PacketType::MAX`
are reserved for packet types used internally by O3DE. When deriving from [`IPacketHeader`](/docs/api/frameworks/aznetworking/class_az_networking_1_1_i_packet_header.html),
this means that any packet types which you use should have their first **valid** value be `CorePackets::PacketType::MAX+1`. For this reason, it's recommended that you write
any `enum` for your custom packet types as follows:

```cpp
enum class MyPacketType {
    START = aznumeric_cast<int32_t>(CorePackets::PacketType::MAX),
    PacketType1,
    PacketType2,
    ...,
    PacketTypeN,
    MAX
}
```

Using `MAX` as a sentinel value is recommended so that if another developer writes an extension on top of your packet type,
they can start at the appropriate `MyPacketType::MAX+1` value for their own packet types and avoid conflicts.

{{< note >}}
Packet headers aren't required to be universally unique, other than not conflicting with the internal packet types of O3DE and any packet types used by a superclass.
{{< /note >}}

## TCP Packet Fields

The fields unique to TCP packets are as follows:

| Field | Description |
|--|--|
| Packet size | The total size of the packet data. Avoid reading any amount of data larger than this size from the packet payload to prevent accessing unsafe memory. |

## UDP Packet Fields

The fields unique to UDP packets are as follows:

| Field | Description |
|--|--|
| Local sequence ID | The sequence ID for this packet instance. |
| Remote sequence ID | The last sequence ID received by the remote endpoint. Used for ACK replication. |
| ACK replication | Other information used to replicate transmission acknowledgement. |
| Reliability flag | Whether or not the packet has reliability features enabled. |
| Reliable sequence ID | If this packet is reliable, this is the sequence ID for reliability. |
