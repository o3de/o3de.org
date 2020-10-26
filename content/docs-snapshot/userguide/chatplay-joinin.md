# Twitch JoinIn<a name="chatplay-joinin"></a>


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

Twitch JoinIn enables Twitch broadcasters to invite targeted viewers into their game sessions on demand using Amazon GameLift session information\. Twitch JoinIn provides one flow graph node called `JoinIn:CreateLink`\. You can use that node create a link that includes all the multiplayer session information necessary for other players to connect to the session\. This information is Base64 encoded\.

The game must be in a multiplayer session when you create the link\. After you create your flow graph logic, you can test the node and your flow graph by exporting the level and launching it from a launcher\. To do this in the editor, click **File**, **Export to Engine**\. If you use a launcher such as SamplesProjectLauncher or MultiplayerProjectLauncher, you must run `mphost` before attempting to create the link\.

Players must have an appropriate launcher that is capable of doing the following:
+ Registering with Windows as a URI scheme handler\. By default, the URI scheme handler is `game:uri`\. You can use the `joinin_uriScheme` console variable to update the scheme in Lumberyard Editor\.
+ Decoding the Base64 encoded URI and extracting the following:
  + Game name \(if the launcher is designed to launch different games\)
  + Launch command \(optional\)
  + Host address
  + Host port
+ Launching the game and connecting to the multiplayer session using the extracted settings\.

The JoinIn launcher can be a separate application or be built into the game\.

The `Twitch:ChatPlay:Whisper` flow graph node sends information to the viewer client machine\. On the viewer client machine, choosing this link decodes the information and launches the game with the appropriate connection settings\.