---
linktitle: Multiplayer
title: Multiplayer Framework
description: Learn about multiplayer support in Open 3D Engine (O3DE) and how to use the multiplayer framework that the Multiplayer Gem provides.
weight: 200
---

The multiplayer framework that the **Multiplayer Gem** provides is built on top of `AzNetworking`. The Multiplayer Gem supports entity-based asynchronous networking in **Open 3D Engine (O3DE)**, using event-driven network properties and remote procedure calls to synchronize O3DE components and entities across a network, giving you tools to make a multiplayer game.

The Multiplayer Gem supports the following:

* Server authoritative networking model
* Player spawners
* Entity replication
* Push-based synchronization
* Event-driven network properties
* Reliable and unreliable remote procedure calls
* Local prediction
* Network input handlers

## Section topics

| Topic | Description |
|---|---|
| [Overview](overview) | An overview of the O3DE Multiplayer Gem. Includes an introduction to multiplayer components, which provide network state synchronization. |
| [Configuring a Project](configuration) | How to add and enable the O3DE Multiplayer Gem in a project. |
| [Running Multiplayer Projects](running) | How to run projects that use the O3DE Multiplayer Gem. |
| [Multiplayer Auto-components](autocomponents) | How to automatically create components for use with the Multiplayer Gem using the AzAutoGen system. |
| [Testing Multiplayer Projects in the Editor](test-in-editor) | How to automatically launch local servers or connect to a remote persistent server when working on a multiplayer project in the **O3DE Editor**. |
| [Network Entity Hierarchies](hierarchy) | How to group network entities into hierarchies that process their input together. |
| [Spawning Players](spawning) | How to spawn an entity for a connecting player to control. |
| [Debugging Multiplayer Desyncs](debug-desync) | How to analyze and debug multiplayer desynchronizations using the built-in Desync Audit Trail tool. |

## Related topics

| Topic | Description |
|---|---|
| [Network and Multiplayer Settings](../settings) | Settings to control the client and server behavior in `AzNetworking` and the Multiplayer Gem. |
| [Multiplayer Components](/docs/user-guide/components/reference/#multiplayer) | Reference documentation for multiplayer components. |
| [Multiplayer Gem API Reference](/docs/api/gems/multiplayer/annotated.html) | The complete C++ API reference for the O3DE Multiplayer Gem. |
| [Multiplayer Compression Gem](/docs/user-guide/gems/reference/multiplayer/multiplayer-compression) | An example Gem showing how to implement network compression. |
| [Multiplayer Sample](https://github.com/o3de/o3de-multiplayersample#readme) | Download the multiplayer sample to help you experiment with the features in the Multiplayer Gem. |
| [Tutorial: Your First Network Component](/docs/learning-guide/tutorials/multiplayer/first-multiplayer-component/) | Tutorial for creating a network-enabled component. |
