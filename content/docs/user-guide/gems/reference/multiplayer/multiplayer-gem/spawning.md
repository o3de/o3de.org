---
title: Spawning Autonomous Player Entities
description: A reference for spawning and registering network player entities
linktitle: Spawning Players
---

When a player joins a multiplayer session, one of the first things that often occurs is spawning a networked entity for them to control. In order to do this, the **Multiplayer** Gem provides an interface to specify an *autonomous* entity for a player. (Refer to the definition of _autonomous role_ in the [Multiplayer Gem Overview](/docs/user-guide/gems/reference/multiplayer/multiplayer-gem/overview#multiplayer-entity-roles).)

*IMultiplayerSpawner* is an [`AZ::Interface<T>`](/docs/user-guide/programming/az-interface) that provides a mechanism to tell the multiplayer gem what to spawn and where when a player joins a session. `IMultiplayerSpawner` also provides a hook to clean up when a player leaves. All multiplayer games should provide an implementation to handle the events delivered for player join and player leave events.

### Player join events

A player is defined as having *joined* a session when either:
  * A client application begins hosting a session, in which case the host may need to spawn a new player entity.
  * A client connects to an ongoing hosted session.
  
The `OnPlayerJoin` method of `IMultiplayerSpawner` provides a hook for when the server may want to spawn an autonomous player prefab on the behalf of a user. It takes both an identifier and custom data provided by the user, and the implementation is required to determine which prefab to spawn and its world location. For example, data provided with the connection could be used to select a specific character or team.

`OnPlayerJoin` is expected to return a `NetworkEntityHandle`, making it the caller's responsibility to instantiate a networked prefab for the user. The Multiplayer Gem then takes the returned `NetworkEntityHandle` and both marks it as autonomous and associates it with the player's connection.

### Player leave events

A player is having defined as *left* a session when a client disconnects from the server. Unlike with player connections, there is no special case for when a client stops hosting their own session - one of the steps should always be disconnecting *all* clients before shutting down the server.

The `OnPlayerLeave` method of `IMultiplayerSpawner` provides a hook for when a client disconnects from a server so that the server can clean up any entities spawned on behalf of the client. `OnPlayerLeave` takes an entity handle to the prefab spawned by `OnPlayerJoin`, and additionally takes the replication set for the connection in the event other associated entities need to be cleaned up. For example, this allows removing not only player entity but also all of their deployed objects. 

`OnPlayerLeave` also takes a disconnect reason which allows responding to different kinds of disconnects. For example, it may be undesirable to clean up objects if a player times out if they can attempt to reconnect to the session.

### Spawning examples in MultiplayerSample

A practical example of an implementation for a spawner is [`MultiplayerSampleSystemComponent`](https://github.com/o3de/o3de-multiplayersample/blob/development/Gem/Code/Source/MultiplayerSampleSystemComponent.cpp) in the  [MultiplayerSample project](https://github.com/o3de/o3de-multiplayersample/). MultiplayerSample implements a "round robin"-style spawning system that gathers entities with `NetworkPlayerSpawnerComponents`. `MultiplayerSampleSystemComponent` then queries that system during `OnPlayerJoin`. `OnPlayerLeave` simply marks the entity passed in for removal. 

For more information on the MultiplayerSample project, see the [MultiplayerSample README](https://github.com/o3de/o3de-multiplayersample/blob/development/README.md).