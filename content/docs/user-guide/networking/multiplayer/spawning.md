---
linktitle: Spawning Players
title: Spawning Player Entities
description: A reference for spawning and registering network player entities in Open 3D Engine (O3DE).
weight: 700
---

In most networking multiplayer games, when a player joins a session, the host must spawn an [*autonomous*](overview#multiplayer-entity-roles) networked entity for the player. Likewise, when a player leaves, the host must remove the entity and clean up. In **Open 3D Engine (O3DE)**, you can set up your spawning logic in this way, or handle join and leave events in other ways by using `OnPlayerJoin` and `OnPlayerLeave` events, which the `IMultiplayerSpawner` interface of the **Multiplayer Gem** provides. Alternatively, to get started sooner, you can bypass programming these events and use the [**Simple Network Player Spawner**](/docs/user-guide/components/reference/multiplayer/simple-player-spawner) component, which sets up `OnPlayerJoin` and `OnPlayerLeave` for this common use case.

## `IMultiplayerSpawner` interface

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


## Examples in MultiplayerSample Project

A practical example of an implementation for a spawner is [`MultiplayerSampleSystemComponent`](https://github.com/o3de/o3de-multiplayersample/blob/2c84827ffb20082b8c16fc0edc65cd49226f3cd2/Gem/Code/Source/MultiplayerSampleSystemComponent.cpp) in [MultiplayerSample Project](https://github.com/o3de/o3de-multiplayersample/). MultiplayerSample Project implements a "round robin"-style spawning system that gathers entities with `NetworkPlayerSpawnerComponents`. `MultiplayerSampleSystemComponent` then queries that system during the `OnPlayerJoin` event. The `OnPlayerLeave` event simply marks the entity that's passed in for removal.

For more information about MultiplayerSample Project, refer to the [MultiplayerSample README](https://github.com/o3de/o3de-multiplayersample/blob/development/README.md).

## Simple Player Spawning component

The Simple Network Player Spawner level component provides a straightforward way to set up `OnPlayerJoin` and `OnPlayerLeave` events. It implements a common use case for handling those events, specifically: when a player joins, create a networked entity for that player, and when a player leaves, remove that entity.

For more information, refer to [Simple Network Player Spawner component](/docs/user-guide/components/reference/multiplayer/simple-player-spawner).