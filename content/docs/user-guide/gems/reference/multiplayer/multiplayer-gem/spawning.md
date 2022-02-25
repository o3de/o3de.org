---
title: Spawning Autonomous Player Entities
description: A reference for spawning and registering network player entities
linktitle: Spawning Players
---

When a Player join a Multiplayer session, one of the first things that often occurs is spawning a networked entity for them to control. In order to do this, the Multiplayer Gem provides an interface to specify an entity for a Player and have the Gem mark it as Autonomous (as defined in (./overview)).

*IMultiplayerSpawner* is an AZ::Interface<T> that provides a mechanism to tell the Multiplayer Gem what to spawn and where when a Player Joins. It also provides a hook to clean up when a Player Leaves. It is intended to implemented by games using the Multiplayer Gem. 

### Player Join

* Player Join is defined as either
    * A Client Host starting a session (as the host may need to spawn a player)
    * A Client connecting to the session

OnPlayerJoin provides a hook for when the server may want to spawn an autonomous player prefab on the behalf of a user. It takes both userId and data provided by the user on connect in so that the implementation of OnPlayerJoin can make an informed decision on what to spawn and where. The data passed could be used to indicate a selected character or team for example. OnPlayerJoin is expected to return a NetworkEntityHandle meaning it is the caller's responsibility to instantiate a networked prefab for the user. Multiplayer Gem then takes the returned NetworkEntityHandle and both marks it as autonomous and associates it with the player's connection.

### Player Leave

* Player Leave is defined as a Client disconnecting from the session

OnPlayerLeave provides a hook for when a client disconnects from a server so that the server can clean up any entities spawned on behalf of the client. OnPlayerLeave takes an Entity Handle to the prefab spawned by OnPlayerJoin and additionally takes the Replication Set for the connection in the event other associated entities need to be cleaned up. This allows, for example, removing a player and all of their deployed objects. 

OnPlayerLeave also takes the disconnect reason which allows responding to different kinds of disconnects. For example, it may be undesirable to cleanup objects if a player times out if they can attempt to reconnect to the session.

### MultiplayerSample as an Example

A practical example of an implementation is MultiplayerSampleSystemComponent in MultiplayerSample. MultiplayerSample implements a Round Robin style spawning system that gathers entities with NetworkPlayerSpawnerComponents. MultiplayerSampleSystemComponent then queries that system during OnPlayerJoin. OnPlayerLeave simply marks the entity passed in for removal. 

Here OnPlayerJoin and OnPlayerLeave are entry points into a larger component based spawning system.

For more, see the following on GitHub:

https://github.com/o3de/o3de-multiplayersample/blob/development/Gem/Code/Source/MultiplayerSampleSystemComponent.cpp