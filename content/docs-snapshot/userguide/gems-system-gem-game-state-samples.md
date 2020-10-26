# GameState Samples Gem<a name="gems-system-gem-game-state-samples"></a>

The GameState Samples gem uses the [GameState Gem](gems-system-gem-game-state.md) to provide a set of sample game states that control the high\-level flow of a game\.

![\[The GameState Samples gem in Project Configurator.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/gems-system-gem-game-state-samples-1.png)

For information about enabling the GameState Samples gem, see [Enabling Gems](gems-system-using-project-configurator.md)\.

## Game States Included<a name="gems-system-gem-game-state-samples-game-states-included"></a>

The GameState Samples gem includes the following game states\. These states commonly occur in the beginning, middle, and end of a game\.
+ **Main menu state** – Enables any level in the project to be loaded from a button click\.
+ **Level loading state** – Displays a placeholder loading screen\.
+ **Level running state** – Active while the game is running\.
+ **Level paused state** – Enables resuming or returning to the main menu to select another level\.
+ **Other states** – Game states that react to user sign\-in and sign out and controller connections and disconnections\.

### Flow of Game States<a name="gems-system-gem-game-state-samples-flow-of-game-states"></a>

The following diagram shows the flow of the default game states in the GameState Samples gem\.

![\[Flow of game states in the GameState Samples gem.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/gems-system-gem-game-state-samples-2.png)

## Possible Uses<a name="gems-system-gem-game-state-samples-possible-uses"></a>

The following are some possible ways to use the GameState Samples gem:
+ **Copy** – Copy the gem to your game project to use as a starting point for further customization\. This method offers the most flexibility\. However, you should not enable the GameState Samples gem in Project Configurator\. Instead, copy each class in the gem that inherits from `IGameState` into your game project\. \(For the source code, see the `lumberyard_version\dev\Gems\GameStateSamples\Code\Include\GameStateSamples\` directory\.\) The advantage of this approach over either of the following options is that you can freely modify the samples to fit the specific needs of your game\.
+ **Derive** – Derive from the code to create your own game states\. This approach is recommended if you want to keep the same behavior as the sample game states, but with only minor customizations\. For example, you could create a main menu class like the following:

  ```
  MyCustomMainMenu : public GameStateMainMenu
  ```

  You could then customize the class through inheritance to load a different main menu UI Canvas\. The disadvantage of the "derivation" approach is that it places some logic in the gem and the rest in your game code\. This can make your solution hard to follow or debug\.
+ **Modify** – Modify the GameState Samples gem directly\. Because gems can't depend on the game, and therefore can't effectively communicate with any game\-specific code, this option is not recommended\.