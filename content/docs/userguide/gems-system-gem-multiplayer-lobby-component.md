# The Multiplayer Lobby Component<a name="gems-system-gem-multiplayer-lobby-component"></a>

You can use the self\-contained lobby from Lumberyard's component entity system and add the `MultiplayerLobbyComponent` to a component entity in a scene\. The `MultiplayerLobbyComponent` provides a basic lobby that can perform the following tasks:
+ Search for an active game session
+ Create a visual list of game sessions
+ Join a particular game session
+ Create a game session
+ Name a game session
+ Determine the map to load into
+ Report errors

## Supported Session Services<a name="gems-system-gem-multiplayer-lobby-component-supported-session-services"></a>

The `MultiplayerLobbyComponent` supports all of Lumberyard's session services, including `LANSessionService` and `GameLiftSessionService`\.

## Configuration Settings<a name="gems-system-gem-multiplayer-lobby-component-configuration-settings"></a>

The `MultiplayerLobbyComponent` has configuration settings that you can use to customize the hosted sessions that the component creates\.


****  

| Setting | Description | 
| --- | --- | 
| Max Players | The maximum number of players allowed to join the session\. | 
| Port | The port on which the game session operates\. | 
| Enable Disconnect Detection | Enables disconnect detection\. If a player's connection does not respond to inquiries from the session host within the specified timeout window, the player is disconnected from the session\. | 
| Timeout | The timeout window, in milliseconds, that a client has to respond to inquiries from the session host before being disconnected, if disconnect detection is enabled\. | 
| Default Map | The default value for the Map field of the display\. | 
| Default Server Name | The default value for the Server Name field of the display\. | 
| Default Matchmaking Config | The default value for the Matchmaking Config to use for GameLift\. | 

**Note**  
This component does not handle the initialization of encryption, but utilizes encryption if it is already enabled\. If you want to use encryption with the component, you must configure encryption before you use the component\.

## LAN Lobby Description<a name="gems-system-gem-multiplayer-lobby-component-description"></a>

The following image shows a sample LAN lobby and its details\.

![\[Sample lobby displaying a server result\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/gems-system-gem-multiplayer-lobby-component.png)

1. **Return** – Exits the current lobby and returns to the `SessionService` selection screen\.

1. **Session List** – Populates with server results from a successful `GridSearch`\. This lists all of the sessions available, the name of each session, and the number of players in each session\.

1. **Refresh** –Performs a `GridSearch` on the selected `SessionService` and displays the results in the session list\.

1. **Join** – Attempts to join the currently selected session in the session list\. If an error occurs, an error message is displayed\. If no `GridSession` has been selected, this option is disabled\.

1. **Create a Server** – Use these text boxes to configure sessions\.
   + **Server Name** – Specifies the name that will be displayed in the session list when `GridSession` instances are searched for and the created `GridSession` is returned\.
   + **Map** – Use to specify the map to be loaded when the `GridSession` is successfully created\.

1. **Create Server** – Attempts to create a `GridSession` in the selected `SessionService`\.

## GameLift Lobby Description<a name="gems-system-gem-multiplayer-lobby-component-gamelift-description"></a>

The following image shows a sample GameLift lobby and its details\.

![\[Sample GameLift lobby create window\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/gems-system-gem-multiplayer-gamelift-lobby-create-component.png)

1. **Return** – Exits the current lobby and returns to the `SessionService` selection screen\.

1. **Create Server / Join Server / FlexMatch** – Radio buttons to toggle the details window for the selected radio button\. \(Current selection = Create Server\)\.

1. Use these text boxes to configure sessions:
   + **ServerName** – Specifies the name that will be displayed in the session list when `GridSession` instances are searched for and the created `GridSession` is returned\.
   + **Map Name** – Use to specify the map to be loaded when the `GridSession` is successfully created\.

1. Need to fill only one of the below:
   + **Queue Name** – Queue to use to create the server game session \(First priority\)\.
   + **Fleet Id** – Fleet id to use to create the server game session \(Second priority\)\.
   + **Alias Id** – Alias id to use to create the server game session \(Second priority\)\.

1. **Create Server** – Attempts to create a `GameLiftSession` in the selected GameLift fleet or queue\.

![\[Sample GameLift lobby join window\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/gems-system-gem-multiplayer-gamelift-lobby-join-component.png)

1. Need to fill only one of the below:
   + **Queue Name** – Queue to use to join a server game session \(First priority\)\.
   + **Fleet Id** – Fleet id to use to join a server game session \(Second priority\)\.
   + **Alias Id** – Alias id to use to join a server game session \(Second priority\)\.

1. **SessionList** – Populates with server results from a successful `GridSearch`\. This lists all of the sessions available, the name of each session, and the number of players in each session\.

1. **Refresh** – Performs a search for available game sessions using queue, fleet or alias\. Displays the results as list in session list\.

1. **Join** – Attempts to join the currently selected session in the session list\. If an error occurs, an error message is displayed\. If no `GridSession` has been selected, this option is disabled\.

![\[Sample GameLift lobby FlexMatch matchmaking window\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/gems-system-gem-multiplayer-gamelift-lobby-match-component.png)

1. **Config Name** – Matchmaking configuration to use to start GameLift matchmaking\.

1. **Start Matchmaking** – Will call GameLift service to try and place the player in available game session based on the matchmaking config\. On success, player joins the game session\.