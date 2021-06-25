---
description: ' Use the GameState gem to manage the states in your Open 3D Engine game. '
title: GameState Gem
---

{{< preview-migrated >}}

The GameState gem helps you manage and determine, at a high level, the state that the game is in\. Because the GameState gem uses a stack to manage game states, returning to a previous state is straightforward\.

![\[The GameState gem in Project Configurator.\]](/images/user-guide/gems/gems-system-gem-game-state-1.png)

For information about sample game states and enabling the GameState Samples gem, see [Enabling Gems](/docs/userguide/gems/using-project-configurator.md)\.

**Note**
For a sample implementation of game states, see the [GameState Samples Gem](/docs/user-guide/gems/game-state-samples.md)\. The GameState Samples Gem depends on the GameState gem\. You can customize the game states in the GameState Samples gem to meet the requirements of your game and communicate with your game code\.

## Examining the Code {#gems-system-gem-game-state-examining-the-code}

The GameState gem manages a stack \(or [pushdown automaton](https://en.wikipedia.org/wiki/Pushdown_automaton)\) of abstract game states\. The GameState gem includes the following code members:
+ `IGameState` - Abstract interface that all concrete game state classes must be derived from\.
+ `GameStateRequests` - [EBus](/docs/user-guide/engine/ebus/_index.md) interface that other systems use to submit requests related to the game state\.
+ `GameStateNotifications` - EBus interface that other systems use to listen for events related to the game state\.
+ `GameStateSystemComponent` - Implements the `GameStateRequestBus` interface and sends events over the `GameStateNotificationBus`\.

### IGameState {#gems-system-gem-game-state-igamestate-interface}

[`IGameState`](/docs/api/gems/gamestate/class_game_state_1_1_i_game_state.html) is the interface that all concrete game state classes must be derived from\. 

### GameStateRequests {#gems-system-gem-game-state-gamestaterequests-ebus}

The methods in the [`GameStateRequests`](/docs/api/gems/gamestate/class_game_state_1_1_game_state_requests.html).

### GameStateNotifications {#gems-system-gem-game-state-gamestatenotifications-ebus}

The `GameStateNotificationBus::OnActiveGameStateChanged` method is called when a transition occurs between a prior game state and a newer game state\. 
