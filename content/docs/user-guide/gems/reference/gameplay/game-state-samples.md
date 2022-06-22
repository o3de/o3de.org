---
linkTitle: Game State Samples
title: Game State Samples Gem
description: The Game State Samples Gem provides a set of sample game states (built on top of the generic Game State Gem), including primary user selection, main menu, level loading, level running, and level paused.
toc: true
---

The Game State Samples Gem uses the [GameState Gem](/docs/user-guide/gems/reference/gameplay/game-state) to provide a set of sample game states that control the high-level flow of a game.

## Game States Included

The Game State Samples gem includes the following game states. These states commonly occur in the beginning, middle, and end of a game.

* **Main menu state** - Enables any level in the project to be loaded from a button click.
* **Level loading state** - Displays a placeholder loading screen.
* **Level running state** - Active while the game is running.
* **Level paused state** - Enables resuming or returning to the main menu to select another level.
* **Other states** - Game states that react to user sign-in and sign out and controller connections and disconnections.

### Flow of Game States

The following diagram shows the flow of the default game states in the GameState Samples gem.

![Flow of game states in the Game State Samples gem.](/images/user-guide/gems/gems-system-gem-game-state-samples-2.png)

## Possible Uses

The following are some possible ways to use the Game State Samples Gem:

* **Copy** - Copy the Gem to your game project to use as a starting point for further customization. This method offers the most flexibility.

* **Derive** - Derive from the code to create your own game states. This approach is recommended if you want to keep the same behavior as the sample game states, but with only minor customizations. For example, you could create a main menu class like the following:

  ```c++
  MyCustomMainMenu : public GameStateMainMenu
  ```

  You could then customize the class through inheritance to load a different main menu UI Canvas. The disadvantage of the "derivation" approach is that it places some logic in the gem and the rest in your game code. This can make your solution hard to follow or debug.

* **Modify** - Modify the GameState Samples gem directly. Because gems can't depend on the game, and therefore can't effectively communicate with any game-specific code, this option is not recommended.
