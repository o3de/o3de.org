---
linktitle: AzNetworking
title: AzNetworking Framework
description: Learn about the low-level networking stack in Open 3D Engine (O3DE).
weight: 100
---

`AzNetworking` is a low-level network interface in **Open 3D Engine (O3DE)**. `AzNetworking` provides simple, fast, and efficient networking by focusing on reduced code size and complexity, low latency on packet send and receive operations, and low message processing overhead.

## Section topics

| Topic | Description |
|---|---|
| [Packet Structure](./packets) | Information on the packet structure that `AzNetworking` uses for TCP and UDP packets, and how to manage fragmented UDP packets. |
| [Auto-packets](./autopackets) | Information on how packets sent and received via `AzNetworking` can be generated via XML. |
| [UDP Encryption with DTLS](./encryption) | How to use the O3DE support for secure UDP connections over Datagram Transport Layer Security (DTLS). |
| [Serializers](./serializers) | Information on serialization and the available serializer types. |

## Related topics

| Topic | Description |
|---|---|
| [AzNetworking API Reference](/docs/api/frameworks/aznetworking/annotated.html) | The complete C++ API reference for the `AzNetworking` framework. |
| [Network and Multiplayer Settings](../settings) | Settings to control the client and server behavior in `AzNetworking` and the Multiplayer Gem. |
