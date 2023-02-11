---
linktitle: Spawning Players
title: Spawning Player Entities
description: A reference for spawning and registering network player entities in Open 3D Engine (O3DE).
weight: 700
---

In most scenarios, when a player joins a multiplayer session, a controllable networked entity must be spawned for the player. The **Multiplayer Gem** in **Open 3D Engine (O3DE)** provides an interface to specify an *autonomous* entity for a player. For more information about autonomous roles, refer to the [Multiplayer Gem Overview](overview#multiplayer-entity-roles).

*IMultiplayerSpawner* is an [`AZ::Interface<T>`](/docs/user-guide/programming/messaging/az-interface) that provides a mechanism to tell the Multiplayer Gem what to spawn and where to spawn it when a player joins a session. `IMultiplayerSpawner` also provides a hook to clean up when a player leaves. All multiplayer games should provide an implementation to handle the events delivered for player join and player leave events.

### Player join events

A player is defined as having *joined* a session when either:
  * A client application begins hosting a session, in which case the host may need to spawn a new player entity.
  * A client connects to an ongoing hosted session.
  
The `OnPlayerJoin` method of `IMultiplayerSpawner` provides a hook for when the server may want to spawn an autonomous player prefab on the behalf of a user. It takes both an identifier and custom data provided by the user, and the implementation is required to determine which prefab to spawn and its world location. For example, data provided with the connection could be used to select a specific character or team.

`OnPlayerJoin` is expected to return a `NetworkEntityHandle`, making it the caller's responsibility to instantiate a networked prefab for the user. The Multiplayer Gem then takes the returned `NetworkEntityHandle` and both marks it as autonomous and associates it with the player's connection.

### Player leave events

A player is having defined as *left* a session when a client disconnects from the server. Unlike with player connections, there is no special case for when a client stops hosting their own session - one of the steps should always be disconnecting *all* clients before shutting down the server.

The `OnPlayerLeave` method of `IMultiplayerSpawner` provides a hook so that when the client disconnects, the server can clean up any entities that were spawned for the client. `OnPlayerLeave` takes an entity handle to the prefab spawned by `OnPlayerJoin` so that the player entity can be removed. It also takes the replication set for the connection which allows the server to remove associated entities as well (for example, objects deployed by the leaving player).

`OnPlayerLeave` also takes a disconnect reason which allows responding to different kinds of disconnects. For example, it may be undesirable to clean up objects if a player times out if they can attempt to reconnect to the session.

### Spawning examples in MultiplayerSample

A practical example of an implementation for a spawner is [`MultiplayerSampleSystemComponent`](https://github.com/o3de/o3de-multiplayersample/blob/development/Gem/Code/Source/MultiplayerSampleSystemComponent.cpp) in the  [MultiplayerSample project](https://github.com/o3de/o3de-multiplayersample/). MultiplayerSample implements a "round robin"-style spawning system that gathers entities with `NetworkPlayerSpawnerComponents`. `MultiplayerSampleSystemComponent` then queries that system during `OnPlayerJoin`. `OnPlayerLeave` simply marks the entity passed in for removal. 

For more information on the MultiplayerSample project, see the [MultiplayerSample README](https://github.com/o3de/o3de-multiplayersample/blob/development/README.md).