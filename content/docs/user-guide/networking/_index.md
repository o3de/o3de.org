---
linkTitle: Networking
title: Networking
description: Learn about the low-level networking stack in Open 3D Engine (O3DE) and the Multiplayer Gem that uses it to provide multiplayer features in games and simulations.
weight: 950
---

**Open 3D Engine (O3DE)** includes the following networking and multiplayer features:

* The `AzNetworking` framework, which provides a low-level networking API.
* The **Multiplayer Gem** framework, which is built on top of `AzNetworking` and uses it to provide multiplayer networking features for games and simulations.
* The **Remote Tools Gem**, which provides a connectivity solution between O3DE applications for debugging scenarios. Refer to the [Remote Tools Gem](/docs/user-guide/gems/reference/debug/remote-tools/) documentation for more information about this Gem.

## Networking frameworks

### AzNetworking

`AzNetworking` is a low-level network transport interface. It provides simple, fast, and efficient networking by focusing on reduced code size and complexity, low latency on packet send and receive operations, and low message processing overhead. Features of `AzNetworking` include:

* Network compression
* Encryption using TLS/DTLS
* Serialization
* High-performance message processing
* Reliable/unreliable UDP packets
* TCP packets
* Wrapper classes for managing UDP and TCP sockets

If you need to work with networking classes at this lower level, refer to the [AzNetworking section](aznetworking/) topics and use the [AzNetworking API Reference](/docs/api/frameworks/aznetworking/annotated.html).

### Multiplayer Gem

The Multiplayer Gem supports entity-based asynchronous networking in O3DE using event-driven network properties and remote procedure calls to synchronize state. The Gem was designed with multiplayer games and other simulations in mind, and provides the following:

* Server authoritative networking model
* Player spawners
* Entity replication
* Push-based synchronization
* Event-driven network properties
* Reliable and unreliable remote procedure calls
* Local prediction
* Network input handlers

For information on how to use the multiplayer framework that the Multiplayer Gem provides, refer to the [Multiplayer section](multiplayer/) topics. To help you experiment with its features, be sure to download the [multiplayer sample](https://github.com/o3de/o3de-multiplayersample#readme) and try the [multiplayer tutorials](/docs/learning-guide/tutorials/multiplayer/).

For a quick introduction to the O3DE network layer and Multiplayer Gem, watch the following video:

{{< youtube-width id="FfrkHJJt_X0" title="O3DE - Networking Overview" >}}

## Section topics

| Topic | Description |
|---|---|
| [AzNetworking](aznetworking/) | Learn about the low-level networking stack in O3DE. |
| [Multiplayer](multiplayer/) | Learn about the multiplayer framework and the features that the Multiplayer Gem provides. |
| [Network and Multiplayer Settings](./settings) | Find settings to control the client and server behavior in `AzNetworking` and the Multiplayer Gem. |

## Related topics

| Topic | Description |
|---|---|
| [AzNetworking API Reference](/docs/api/frameworks/aznetworking/annotated.html) | The complete C++ API reference for the `AzNetworking` framework. |
| [Multiplayer Gem](/docs/user-guide/gems/reference/multiplayer/multiplayer-gem) | The Multiplayer Gem offers code extensions and components to synchronize O3DE components and entities across a network, giving you tools to make a multiplayer game. |
| [Multiplayer Compression Gem](/docs/user-guide/gems/reference/multiplayer/multiplayer-compression) | An example Gem showing how to implement network compression. |
| [Tutorial: Your First Network Component](/docs/learning-guide/tutorials/multiplayer/first-multiplayer-component/) | Tutorial for creating a network-enabled component. |
