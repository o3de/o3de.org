---
linktitle: Simple Network Player Spawner
title: Simple Network Player Spawner Component
description: The Simple Network Player Spawner component implements a basic setup for handling player join and player leave events in a network multiplayer session in Open 3D Engine (O3DE).
---

In an **Open 3D Engine (O3DE)** networking multiplayer project, the **Simple Network Player Spawner** level component implements a basic setup for handling `OnPlayerJoin` and `OnPlayerLeave` events, which the `IMultiplayerSpawner` interface of the **Multiplayer Gem** provides. In this basic setup, when a player joins, create a networked entity for that player, and when a player leaves, remove that entity.

As is, this component serves well for prototyping. If you want to develop more specific behavior, you can build on top of this component, or implement your own handlers for the `OnPlayerJoin` and `OnPlayerLeave` events.

For more information about network player spawning, refer to [Spawning Players](/docs/user-guide/networking/multiplayer/spawning.md).


## Provider

[**Multiplayer Gem**](/docs/user-guide/gems/reference/multiplayer/multiplayer-gem/)


## Properties

![Simple Network Player Spawner component](/images/user-guide/components/reference/multiplayer/simple-player-spawner-component.png)

| Property | Description | Value | Default |
| - | - | - | - |
| **Player Spawnable Asset**  | A networked asset that spawns for each player that joins the multiplayer session. | Network Asset  |   |
|  **Spawn Points** | A list of one or more spawn points where a **Player Spawnable Asset** can spawn when a player joins. Assets spawn at the point locations in list order. If there are more players than there are spawn points, then the point location loops back to the top of this list. | EntityID |   |