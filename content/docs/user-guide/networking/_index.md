---
title: Networking
weight: 950
description: The user guide for Open 3D Engine's networking stack.
---

Open 3D Engine uses an abstracted interface layer, the `AzNetworking` framework, to provide access to OS-level networking interfaces. This layer provides access to features like network compression, encryption, and reliable UDP packets.

For a quick introduction to the O3DE network layer and Multiplayer Gem, watch the video below.

{{< youtube-width id="FfrkHJJt_X0" title="O3DE - Networking Overview" >}}

## Section topics

| Topic                                    | Description                                                                                                                     |
|------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| [Packet structure](./packets)            | Information on the packet structure used for TCP and UDP packets by `Az::Networking`, and how to manage fragmented UDP packets. |
| [Auto-packets](./autopackets)            | Information on how packets sent and received via `Az::Networking` can be generated via XML.                                     |
| [UDP Encryption with DTLS](./encryption) | How to use the Open 3D Engine support for secure UDP connections over *Datagram Transport Layer Security (DTLS)*.               |
| [Serialization](./serializers) | Information on serialization and the available serializer types. |
| [Network Settings](./settings)           | Settings to control the behavior of Networking. Multiplayer, Clients and Servers.                                               |

## Related topics

| Topic | Description |
|---|---|
| [Az::Networking framework API reference](/docs/api/frameworks/aznetworking/annotated.html) | The complete C++ API reference for the AzNetworking framework. |
| [Multiplayer Gem](/docs/user-guide/gems/reference/multiplayer/) | The O3DE Multiplayer Gem offers code extensions and components to synchronize O3DE components and entities across a network, giving you tools to make a multiplayer game. |
| [Multiplayer Compression Gem](/docs/user-guide/gems/reference/multiplayer/multiplayer-compression) | An example Gem showing how to implement network compression. |
| [Your First Network Component](/docs/learning-guide/tutorials/multiplayer/first-multiplayer-component/) | Tutorial for creating a network-enabled component. |

