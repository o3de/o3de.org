# Twitch ChatPlay Console Variables, Classes, and Connection Methods<a name="chatplay-console-variables"></a>

This topic includes console variables, classes, and connection methods for Twitch ChatPlay\.

**Topics**
+ [Console Variables](#chatplay-console-variables-list)
+ [Classes](#chatplay-classes-list)
+ [Connection Methods](#chatplay-connection-methods)

## Console Variables<a name="chatplay-console-variables-list"></a>

Twitch ChatPlay uses the following console variables\.

**`chatplay_Enabled`**  
Enables or disables the Twitch ChatPlay feature\.  
Default value: `1`  
Valid values: `0` = Disable \| `1` = Enable

**`chatplay_UserName`**  
Default user name to use when logging into the Twitch IRC\. The default value represents an anonymous user that can read chat but cannot post\.  
Default value: `justinfan12345`

**`chatplay_Password`**  
Default password to use when logging into the Twitch IRC\.  
Default value: `blah`

**`chatplay_ClientID`**  
Client ID that is generated from Twitch\.tv for making API requests\. See [Generating and Setting a Twitch Client ID](chatplay-generate-twitch-client-id.md)\.

**`chatplay_ServerListEndpoint`**  
Base address to use when making API requests\. Set the client ID for these API calls to succeed\.  
Default value: `tmi.twitch.tv`

## Classes<a name="chatplay-classes-list"></a>

The Twitch ChatPlay module is implemented as a part of CryAction and is accessible from the `GetChatPlay` method\. The main interface is the `ChatPlay.h` file\.

Twitch ChatPlay uses the following classes\.

**`IChatChannel`**  
Interface that represents a Twitch ChatPlay channel and includes keyword callbacks and options for subscribing to the connection state\.

**`IChatPlay`**  
Interface that represents the base system from which you can get handles to Twitch ChatPlay channels\.

**`ConnectionState`**  
Describes the connection state for a chat channel\.  
+ Disconnected – Successfully disconnected from the channel's Twitch chat or a connection has not been attempted\.
+ Connecting – Connecting to the channel's Twitch chat\.
+ Connected – Successfully connected to the channel's Twitch chat\.
+ Error – An error prevented or unexpectedly terminated the connection\.
+ Failed – All attempted connections have failed\.

## Connection Methods<a name="chatplay-connection-methods"></a>

You can use various methods and ports to connect Twitch ChatPlay to the Twitch IRC\.

Twitch ChatPlay uses the following console variables to configure the connection methods\. Set these console variables with comma delimited `priority:port` pairs\. Ports with a lower number have higher priority\. Ports with a priority of `-1` will be ignored\. Twitch ChatPlay will attempt to connect to the Twitch IRC using each method and port combination in priority order, until a connection is successful or all available combinations fail\.

**`chatplay_IRCPorts`**  
List of ports and their priorities that are used for connecting to the Twitch IRC\.  
Default value: `1:6667;3:80`

**`chatplay_IRCSSLPorts`**  
List of ports and their priorities that are used for connecting to the Twitch IRC over SSL\.  
Default value: `-1:6697;-1:443`

**`chatplay_WebsocketPorts`**  
List of ports and their priorities that are used for connecting to the Twitch IRC over websockets\.  
Default value: `2:80`

**`chatplay_WebsocketSSLPorts`**  
List of ports and their priorities that are used for connecting to the Twitch IRC over secure websockets\.  
Default value: `-1:443`