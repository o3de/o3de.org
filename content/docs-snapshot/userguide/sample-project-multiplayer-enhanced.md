# Multiplayer Sample<a name="sample-project-multiplayer-enhanced"></a>

The Multiplayer sample shows you how to build and structure multiplayer games that use the various features of the [GridMate networking](network-intro.md) library\. The new preview attempts to incorporate as many GridMate features as possible but is not comprehensive\. Instead it is intended as a living snapshot of the current state of the networking library\. Consequently, as the sample evolves, features might be added to enhance functionality or removed to keep the sample concise\.

## Building and Running the Sample<a name="sample-project-multiplayer-enhanced-building-and-running"></a>

Follow these steps to build and run the sample\.

**To build and run the Multiplayer sample**

1. In the Project Configurator set **MultiplayerSample** as the active project\.

1. Run the following command:

   ```
   lmbr_waf configure
   ```

1. Run the following command which builds everything in the profile, for your version of Visual Studio\.

   ```
   lmbr_waf build_win_x64_vs2017_profile -p all
   ```

1. Run the `MultiplayerSampleLauncher.exe` file from your default bin directory\.
   + For Visual Studio 2017, use the `Bin64vc141.Dedicated` directory\.
   + For Visual Studio 2019, use the `Bin64vc142.Dedicated` directory\.

## MultiplayerLobby<a name="sample-project-multiplayer-enhanced-multiplayerlobby"></a>

This level demonstrates a multiplayer lobby that uses GridMate networking\. Currently, the level performs the following tasks:
+ Creates a server
+ Displays a list of servers on the local LAN
+ Connects to a server

**To create a server**

1. Enter the server name in the **Create a Server** form\.

1. Click **Create Server**\.

   The game starts hosting and loads the selected map\.

**To connect to a server**

1. Find your server in the server browser list\. If your server doesn't appear, click **Refresh**\.

1. To select your server, click the row that contains your server name\.

1. Click **Connect**\.

## Game Overview<a name="sample-project-multiplayer-enhanced-overview"></a>

The Multiplayer sample is an arcade space shooter\. Each player controls a ship in a giant field of asteroids\. Each player must fly through the asteroids and destroy as many of them as possible in an effort to achieve the highest score\. Additional points are awarded when other players are killed\. Points are deducted every time the player dies\. In addition to the threats posed by asteroids and other players, gravity wells scattered around the map can draw players in and trap them\. Players who become trapped in a gravity well die instantly\.

When a ship is spawned, three kinds of ships are assigned randomly:
+ **Fighter** – An average space ship\.
+ **Speeder** – A faster and more maneuverable space ship but less sturdy as a result\.
+ **Rammer** – A sturdier ship that is weaponless but designed to smash into asteroids and destroy them\. The ship is fast but has poor maneuverability\.

When destroyed, some asteroids spawn collectibles that award a short\-time power\-up bonus\. These power\-ups include extra damage against certain targets, a longer power\-up time, and extra protection against certain sources of damage\.

## Game Controls<a name="sample-project-multiplayer-enhanced-controls"></a>

The following tables list controls for keyboards, controllers, and touch interfaces\.


**Keyboard**  

| Key | Action | 
| --- | --- | 
| WASD keys | Move the ship relative to the screen \(W is always up, S is always down, and so forth\)\. | 
| Arrow left, arrow right | Rotate the ship clockwise or counterclockwise\. | 
| Spacebar | Fire the ship's weapon \(if applicable\)\. | 
| Tab \(hold\) | Open the Player Stats window\. | 


**Controller**  

| Control | Action | 
| --- | --- | 
| Left joystick | Move the ship in absolute terms relative to the screen\. | 
| Right joystick | Rotate the ship clockwise or counterclockwise\. | 
| Right shoulder button | Fire the ship's weapon \(if applicable\)\. | 
| Back button \(hold\) | Open the Player Stats window\. | 


**Touch interface**  

| Control | Action | 
| --- | --- | 
| Virtual joystick \(left side of screen, no visual indication\) | Move the ship in absolute terms relative to the screen\. | 
| Virtual joystick \(right side of screen, no visual indication\) | Rotate the ship clockwise or counterclockwise\. | 

**Notes**
+ As soon as you begin moving with either virtual joystick, the ship begins firing \(if applicable\)\.
+ These controls can also be accessed by using the mouse \(click to touch\)\. 
+ If you fire manually, the automatic firing stops until the next input from one of the virtual joysticks\.

## **Game CVars**<a name="sample-project-multiplayer-enhanced-game-cvars"></a>

The following console variables can be used with the game\.

**`mps_AISteeringDebug`**  
Specifies whether the debug drawing information for the bot is drawn\.

**`mps_ControllerType number`**  
Controls the type of `PlayerController` that the client uses to control the assigned ship\. The following table shows the possible values for *number*:    
****    
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/sample-project-multiplayer-enhanced.html)

**`mps_DrawBucketSystem`**  
Specifies whether the debug information for the bucket system is drawn\.

**`mps_SpawnTag`**  
Controls what ship is spawned for a player when the player spawns a ship\. Possible values are shown in the following table\.    
****    
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/sample-project-multiplayer-enhanced.html)

**`mps_UserName`**  
Specifies the name for the client in game elements such as the scoreboard or action notification\.

## Creating a Dedicated Server<a name="sample-project-multiplayer-enhanced-creating-a-dedicated-server"></a>

To create a dedicated server for the game, perform the following steps\.

**To create a dedicated server**

1. In the Project Configurator set **MultiplayerSample** as the active project\.

1. Enter the following command:

   ```
   lmbr_waf configure
   ```

1. Enter the following command which builds everything in the profile, for your version of Visual Studio: 

   ```
   lmbr_waf build_win_x64_vs2017_profile -p all
   ```

1. Enter the following command which builds `game_and_engine` in `profile_dedicated`, for your version of Visual Studio:

   ```
   lmbr_waf build_win_x64_vs2017_profile_dedicated –p game_and_engine
   ```

1. Run the `MultiplayerSampleLauncher_Server.exe` file from your default bin directory\.
   + For Visual Studio 2017, use the `Bin64vc141.Dedicated` directory\.
   + For Visual Studio 2019, use the `Bin64vc142.Dedicated` directory\.

## Supported Platforms<a name="sample-project-multiplayer-enhanced-supported-platforms"></a>

The Multiplayer sample is currently supported on a variety of client and server platforms\.

**Clients**  
The following playable client platforms are supported:
+ Windows \(Visual Studio 2017 or Visual Studio 2019\)
+ Android
+ iOS

**Dedicated Server Platforms**  
The following dedicated server platforms are supported:
+ Windows \(Visual Studio 2017 or Visual Studio 2019\)
+ Linux \(Ubuntu\)

## About Self\-Signed Certificates in the Multiplayer Sample<a name="sample-project-multiplayer-enhanced-self-signed-certificates"></a>

In Windows, the Multiplayer sample enables client\-side self authentication that uses a [self\-signed certificate](https://en.wikipedia.org/wiki/Self-signed_certificate), which the build script generates for each user\. Regarding this certificate, keep in mind the following points:
+ The self\-signed certificate is not an official certificate\. If you want to ship a publically available game, you must replace it with a [public key certificate](https://en.wikipedia.org/wiki/Public_key_certificate)\.
+  On the macOS and Linux platforms, you must generate self\-signed certificates manually\.
+  On the macOS and Linux platforms, the Multiplayer sample has the following limitations:
  + macOS: Only iOS client builds can be made\.
  + Linux: Only dedicated server builds can be made\.

## Troubleshooting<a name="sample-project-multiplayer-enhanced-troubleshooting"></a>

The following are some connection troubleshooting tips\.
+ If clients are unable to discover a server, ensure that the server and client are on the same subnet in order to allow for UDP discovery\.
+ If clients are unable to connect to a server, ensure that the server and client are using the same key and certificate files\.
+ When trying to host or join a session, you might receive one of the following error messages:

  ```
  Invalid Secure Socket configuration given for hosting a session. 
  Ensure that a Public and Private key are being supplied.
  ```

  ```
  Invalid Secure Socket configuration given for joining an encrypted session. 
  Ensure that a Certificate Authority is being supplied.
  ```

  To resolve these issues, perform one of the following tasks:
  + Run the command `lmbr_waf configure` to generate a set of certificates\.
  + In the `MultiplayerSample/certificates` directory, provide your own appropriately named certificates\.

  For more information about self\-signed certificates, see **Encryption** in the [Multiplayer Sample Network Features](sample-project-multiplayer-enhanced-network-features.md) section and [About Self\-Signed Certificates in the Multiplayer Sample](#sample-project-multiplayer-enhanced-self-signed-certificates)\.

**Topics**
+ [Building and Running the Sample](#sample-project-multiplayer-enhanced-building-and-running)
+ [MultiplayerLobby](#sample-project-multiplayer-enhanced-multiplayerlobby)
+ [Game Overview](#sample-project-multiplayer-enhanced-overview)
+ [Game Controls](#sample-project-multiplayer-enhanced-controls)
+ [**Game CVars**](#sample-project-multiplayer-enhanced-game-cvars)
+ [Creating a Dedicated Server](#sample-project-multiplayer-enhanced-creating-a-dedicated-server)
+ [Supported Platforms](#sample-project-multiplayer-enhanced-supported-platforms)
+ [About Self\-Signed Certificates in the Multiplayer Sample](#sample-project-multiplayer-enhanced-self-signed-certificates)
+ [Troubleshooting](#sample-project-multiplayer-enhanced-troubleshooting)
+ [Multiplayer Sample Gameplay Architecture](sample-project-multiplayer-enhanced-architecture.md)
+ [Multiplayer Sample Network Features](sample-project-multiplayer-enhanced-network-features.md)