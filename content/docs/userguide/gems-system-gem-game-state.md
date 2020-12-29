# GameState Gem<a name="gems-system-gem-game-state"></a>

The GameState gem helps you manage and determine, at a high level, the state that the game is in\. Because the GameState gem uses a stack to manage game states, returning to a previous state is straightforward\.

![\[The GameState gem in Project Configurator.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/gems-system-gem-game-state-1.png)

For information about sample game states and enabling the GameState Samples gem, see [Enabling Gems](gems-system-using-project-configurator.md)\.

**Note**  
For a sample implementation of game states, see the [GameState Samples Gem](gems-system-gem-game-state-samples.md)\. The GameState Samples Gem depends on the GameState gem\. You can customize the game states in the GameState Samples gem to meet the requirements of your game and communicate with your game code\.

## Examining the Code<a name="gems-system-gem-game-state-examining-the-code"></a>

The GameState gem manages a stack \(or [pushdown automaton](https://en.wikipedia.org/wiki/Pushdown_automaton)\) of abstract game states\. The GameState gem includes the following code members:
+ `IGameState` – Abstract interface that all concrete game state classes must be derived from\.
+ `GameStateRequests` – [EBus](ebus-intro.md) interface that other systems use to submit requests related to the game state\.
+ `GameStateNotifications` – EBus interface that other systems use to listen for events related to the game state\.
+ `GameStateSystemComponent` – Implements the `GameStateRequestBus` interface and sends events over the `GameStateNotificationBus`\.

### IGameState<a name="gems-system-gem-game-state-igamestate-interface"></a>

`IGameState` is the abstract interface that all concrete game state classes must be derived from\. The interface defines methods that track changes in game state, as seen in the following excerpt from the source code at

`lumberyard_version\dev\Gems\GameState\Code\Include\GameState\GameState.h`\.

```
//! Called when this game state is pushed onto the stack.
virtual void OnPushed() {};

//! Called when this game state is popped from the stack
virtual void OnPopped() {};

//! Called when this game state is set as the active game state.
virtual void OnEnter() {};

//! Called when this game state is replaced as the active game state.
virtual void OnExit() {};

//! Called each frame while this game state is the active game state.
virtual void OnUpdate() {};
```

### GameStateRequests<a name="gems-system-gem-game-state-gamestaterequests-ebus"></a>

The methods in the `GameStateRequests` EBus perform essential tasks like creating, pushing, and popping a game state, or getting the active game state or active game state type\. For the complete source code, see the `lumberyard_version\dev\Gems\GameState\Code\Include\GameState\GameStateRequestBus.h` file\.

```
 //! Create a new game state.
 //! \tparam GameStateType - The game state type to create.
 //! \param[in] checkForOverrides - True to should check for an override, false otherwise.
 //! \return - A shared pointer to the new game state that was created.
template<class GameStateType>
static AZStd::shared_ptr<IGameState> CreateNewOverridableGameStateOfType(bool checkForOverride = true);

 //! Create a new game state and push it onto the stack to make it the active game state.
 //! New game states are created and stored in the stack using a shared_ptr, so they are 
 //! destroyed automatically after they are popped off the stack (assuming that nothing
 //! else retains a reference - for example, through GameStateNotifications::OnActiveGameStateChanged).
 //! \tparam GameStateType - The game state type to create and activate.
 //! \param[in] checkForOverrides - True to check for an override, false otherwise.
template<class GameStateType>
static void CreateAndPushNewOverridableGameStateOfType(bool checkForOverride = true);

//! Pop  game states from the stack until the active game state is of the specified type.
//! \tparam GameStateType - The game state type in the stack that you want to be active.
//! \return True if the active game state is now of the specified type, false otherwise.
template<class GameStateType>
static bool PopActiveGameStateUntilOfType();

//! Query whether the active game state is of the specified type.
//! \tparam GameStateType - The game state type to check whether it is active.
//! \return - True if the active game state is of the specified type, false otherwise.
template<class GameStateType>
static bool IsActiveGameStateOfType();

//! Query whether the game state stack contains a game state of the specified type.
//! \tparam GameStateType - The game state type to check whether it is in the stack.
//! \return - True if the stack contains a game state of the specified type, false otherwise.
template<class GameStateType>
static bool DoesStackContainGameStateOfType();

//! Update the active game state. Called during the AZ::ComponentTickBus::TICK_GAME
//! priority update of the AZ::TickBus, but can be called independently any time if needed.
virtual void UpdateActiveGameState() = 0;

//! Request the active game state (if any)
//! \return - A shared pointer to the active game state (empty if there is none).
virtual AZStd::shared_ptr<IGameState> GetActiveGameState() = 0;

//! Push a game state onto the stack, making it become the active game state.
//! If newGameState is already found in the stack, the call fails and returns false. However,
//! it is possible for multiple instances of the same game state type to occupy the stack.
//! \param[in] newGameState - The new game state to push onto the stack.
//! \return - True if the game state was successfully pushed onto the stack, false otherwise.
virtual bool PushGameState(AZStd::shared_ptr<IGameState> newGameState) = 0;

//! Pop the active game state from the stack. This deactivates the active game state and
//! makes the game state below it in the stack (if any) the active game state again.
//! \return - True if the active game state was successfully popped, false otherwise.
virtual bool PopActiveGameState() = 0;

//! Pop all game states from the stack, leaving it empty.
virtual void PopAllGameStates() = 0;

//! Replace the active game state with another game state that becomes the active state.
//! If the stack is currently empty, newGameState is pushed to become the active state.
//! If newGameState is already found in the stack, the call fails and returns false. However,
//! it is possible for multiple instances of the same game state type to occupy the stack.
//! This differs from calling PopActiveGameState followed by PushGameState(newGameState),
//! which would result in the state below the currently active state being activated then
//! immediately deactivated when newGameState is pushed onto the stack; calling this will
//! leave the state below the currently active state unchanged.
//! \param[in] newGameState - The new game state with which to replace the active game state.
//! \return - True if the active game state was successfully replaced, false otherwise.
virtual bool ReplaceActiveGameState(AZStd::shared_ptr<IGameState> newGameState) = 0;

//! Query whether the game state stack contains a game state of the specified type.
//! \param[in] gameStateTypeId - The game state type to check whether it is in the stack.
virtual bool DoesStackContainGameStateOfTypeId(const AZ::TypeId& gameStateTypeId) = 0;
```

### GameStateNotifications<a name="gems-system-gem-game-state-gamestatenotifications-ebus"></a>

The `GameStateNotificationBus` `OnActiveGameStateChanged` method is called when a transition occurs between a prior game state and a newer game state\. For the source code, see the `lumberyard_version\dev\Gems\GameState\Code\Include\GameState\GameStateNotificationBus.h` file\.

```
//! Called when a game state transition occurs.
//! \param[in] oldGameState - The old game state being transitioned from (can be null).
//! \param[in] newGameState - The new game state being transitioned into (can be null).
virtual void OnActiveGameStateChanged(AZStd::shared_ptr<IGameState> oldGameState,
                                      AZStd::shared_ptr<IGameState> newGameState) {}
```