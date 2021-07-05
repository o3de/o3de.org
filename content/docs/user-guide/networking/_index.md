---
title: Networking
weight: 999
description: The user guide for Open 3D Engine's networking stack.
---

## Section topics

| Topic | Description |
|---|---|
| [Overview](./overview) | Overview of the Open 3D Engine core network stack and its capabilities. |
| [Connections](./connection) | Establishing, listening on, and managing connections with `Az::Networking`. |
| [Packet structure](./packets) | Information on the packet structure used for TCP and UDP packets by `Az::Networking`, and how to manage fragmented UDP packets. |
| [UDP Encryption with DTLS](./encryption) | How to use the Open 3D Engine support for secure UDP connections over *Datagram Transport Layer Security (DTLS)*. |

## Related topics

| Topic | Description |
|---|---|
| [Az::Networking framework API reference](/docs/api/frameworks/aznetworking/) | The complete C++ API reference for the AzNetworking framework. |
| [Multiplayer Gem](/docs/user-guide/gems/reference/multiplayer/) | The O3DE Multiplayer Gem offers code extensions and components to synchronize O3DE components and entities across a network, giving you tools to make a multiplayer game. |
| [Multiplayer Compression Gem](/docs/user-guide/gems/reference/multiplayer-compression) | An example Gem showing how to implement network compression. |
