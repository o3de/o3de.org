# Multiplayer Gem CVars<a name="gems-system-gem-multiplayer-cvars"></a>

For convenience, the Multiplayer Gem provides the following console variable commands that you can use to test features or configurations\.

## Client CVars<a name="gems-system-gem-multiplayer-cvars-client"></a>

**mphost <port number>**  
Creates a `GridSession` using the `LANSessionService` on the local machine\. The optional port number determines the port on which the grid session runs\.

**mpjoin <server address> <port number>**  
Performs a `GridSearch` using the `LANSessionService` and joins the first session returned\. The server address and port number are optional parameters that can be used to refine the `GridSearch`\.

**mpsearch**  
Performs a `GridSearch` using the `LANSessionService`\.

**mpdisconnect**  
Disconnects the local client from its active `GridSession`, if any\.

**gm\_version**  
Sets the GridMate version number\.

**gm\_netsec\_enable**  
Specifies whether encryption is used for connections\. The default is `false`\.  
If encryption parameters are not present or invalid, the connection for the session is not encrypted\.

**gm\_netsec\_private\_key**  
Specifies the private key file \(PEM format\) for a secure network connection when `FileDataSource` is used as a certificate manager\. This setting overrides any previously configured values in `FileDataSource`\. If network encryption is enabled, this value must be set on the host of a `GridSession` when the session is created\. This setting is disabled in release builds\.

**gm\_netsec\_certificate**  
Specifies the private key file \(PEM format\) for a secure network connection when `FileDataSource` is used as a certificate manager\. This setting overrides any previously configured values in `FileDataSource`\. If network encryption is enabled, this value must be set on the host of a `GridSession` when the session is created\. This setting is disabled in release builds\.

**gm\_netsec\_ca**  
Specifies the CA Certificate file \(PEM format\) for a secure network connection when the `FileDataSoruce` is used as a certificate manager\. This setting overrides any previously configured values in `FileDataSource`\. This value must be set on the client when trying to join a `GridSession` using encryption\. This setting is disabled in release builds\.

**gm\_netsec\_verify\_client**  
Enables client verification\. If not enabled, only the server is authenticated\. Must be set on the host of a `GridSession`\. The default is `false`\.

**gm\_disconnectDetection**  
Sets whether disconnect detection is enabled for a particular `GridSession`\. Must be set on the host of `GridSession`\. If disconnect detection is enabled, clients that do not respond to inquiries within the timeout window are disconnected\. The default is `true`\.

**gm\_disconnectDetectionRttThreshold**  
A RTT threshold, in milliseconds, that specifies the time after which a connection is dropped when there is no response\. The default is `500`\.

**gm\_disconnectDetectionPacketLossThreshold**  
A value between 0 and 1 that represents the percentage of packets that are permitted to be lost in communication with a particular client\. If a client experiences a packet loss greater than the specified value, the connection is dropped\. The default is `0.3`\.

**gm\_recvPacketsLimit**  
The maximum number of packets per second allowed to be received from an existing connection\. The default is `0` \(no limit\)\.

**gm\_ipversion**  
Specifies which Internet protocol version to use\. Possible values are `IPv4` or `IPv6`\. The default is `IPv4`\.

**gm\_securityData**  
Specifies the security data for session\. 

**gm\_replicasSendTime**  
Specifies, in milliseconds, the time interval between replica updates\. A value of `0` binds the interval to the GridMate tick rate\. The default is `0`\.

**gm\_replicasSendLimit**  
Limits the amount of replica data sent per second\. `0` specifies no limit\. The default is `0`\. This value is disabled in release builds\.

**gm\_burstTimeLimit**  
Specifies, in seconds, an interval window during which bandwidth capping is not applied\. If bandwidth usage continues to exceed the replica send limit outside of this interval, the sent amount is capped at the send limit\. The default is `10`\. This variable is disabled in release builds\.

**gamelift\_fleet\_id**  
Specifies the GameLift `FleetId` to use for this client when starting `GameLiftSessionService`\.

**gamelift\_aws\_access\_key**  
Specifies the AWS access key associated with the GameLift fleet\.

**gamelift\_aws\_secret\_key**  
Specifies the AWS secret key associated with the GameLift fleet\.

**gamelift\_aws\_region**  
Specifies the AWS region associated with the GameLift fleet\. The default is `us-west-2`\.

**gamelift\_endpoint**  
Specifies the GameLift service endpoint\. The default is `gamelift.us-west-2.amazonaws.com`\.

**gamelift\_alias\_id**  
Specifies the GameLift alias ID to use with the client\.

**gamelift\_player\_id**  
Specifies the GameLift player ID associated with the client\.

**gamelift\_stop\_client**  
Stops the `GameLiftSessionService` and terminates the current `GridSession`, if one is connected\.

**gamelift\_queue\_name**  
Specifies GameLift queue to use for this client when creating or joining a game session\.

**gamelift\_matchmaking\_config\_name**  
Specifies GameLift FlexMatch matchmaking configuration to use for this client when being placed in a game session\.

**sv\_port *<local\_port>***  
Sets the local UDP port that initializes the socket\. The default port is 30090\. To use the ephemeral port, set the port to 0\. This is useful if you want to connect to a server on the same computer as the client\.

## Server CVars<a name="gems-system-gem-multiplayer-cvars-server"></a>

**gamelift\_flexmatch\_enable**  
Configures the server process to enable custom matchmaking backfill for FlexMatch\.

**gamelift\_flexmatch\_onplayerremoved\_enable**  
Configures the server process to start matchmaking backfill on players removed and if an empty slot is available\.

**gamelift\_flexmatch\_start\_delay**  
Delay to add to start matchmaking backfill on new game session create\.