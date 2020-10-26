# Twitch ChatPlay Lua Reference<a name="twitch-chatplay-lua-reference"></a>

You can use Lua scripting functions to add Twitch ChatPlay features to your game project\.

For information about event buses that Lumberyard uses, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

**Topics**
+ [ChatPlayRequestBus](#twitch-chatplayrequestbus-ebus)
+ [ChatPlayNotificationBus](#twitch-chatplaynotificationbus-ebus)
+ [ChatPlayChannelRequestBus](#twitch-chatplaychannelrequestbus-ebus)
+ [ChatPlayChannelNotificationBus](#twitch-chatplaychannelnotificationbus-ebus)
+ [ChatPlayVoteRequestBus](#twitch-chatplaychannelvoterequestbus-ebus)

## ChatPlayRequestBus<a name="twitch-chatplayrequestbus-ebus"></a>

Use `ChatPlayRequestBus.Broadcast.MethodName(parameters)` to make requests on this EBus\.

Address policy: Single

Handler policy: Single

### CreateChannel<a name="twitch-chatplayrequestbus-createchannel"></a>

Creates a chat channel using the specified value for `channelName`\. Returns true if the chat channel is created successfully\. Returns false if the chat channel is not created\.

**Parameters**  
`string channelName`

**Return type**  
Boolean

### DestroyChannel<a name="twitch-chatplayrequestbus-destroychannel"></a>

Destroys the chat channel for the specified channel name\.

**Parameters**  
`string channelName`

**Return type**  
Void

### DisconnectAll<a name="twitch-chatplayrequestbus-disconnectall"></a>

Disconnects all chat channels\.

**Parameters**  
None

**Return type**  
Void

### RegisterCredentials<a name="twitch-chatplayrequestbus-registercredentials"></a>

Registers the specified user name and authentication token pair with Twitch ChatPlay\. This pair is used when sending whispers\.

**Parameters**  
`string username`, `string oauthToken`

**Return type**  
Void

### UnregisterCredentials<a name="twitch-chatplayrequestbus-unregistercredentials"></a>

Unregisters the credentials for the specified user name\.

**Parameters**  
`string username`

**Return type**  
Void

### UnregisterAllCredentials<a name="twitch-chatplayrequestbus-unregisterallcredentials"></a>

Unregisters all stored credentials\.

**Parameters**  
None

**Return type**  
Void

### SendWhisper<a name="twitch-chatplayrequestbus-sendwhisper"></a>

Sends a whisper that includes a specified message from a specified sender to the specified recipient\. You must register the sender credentials before using this method\. See [RegisterCredentials](#twitch-chatplayrequestbus-registercredentials)\.

Returns a token that is checked against the token that is passed to the `OnWhisperSent` callback\. See [ChatPlayNotificationBus](#twitch-chatplaynotificationbus-ebus)\.

**Parameters**  
`string sender`, `string recipient`, `string message`

**Return type**  
Number

### CreateVote<a name="twitch-chatplayrequestbus-createvote"></a>

Creates Twitch ChatPlay voting functionality for the specified vote ID\. You can use any unique string for the vote ID\. Returns true if the voting functionality is created successfully\. Returns false if the voting functionality is not created\.

**Parameters**  
`string voteID`

**Return type**  
Boolean

### DestroyVote<a name="twitch-chatplayrequestbus-destroyvote"></a>

Destroys the Twitch ChatPlay voting functionality for the specified vote ID\.

**Parameters**  
`string voteID`

**Return type**  
Void

## ChatPlayNotificationBus<a name="twitch-chatplaynotificationbus-ebus"></a>

Use `ChatPlayNotificationBus.Connect(self)` to connect the handler and implement one or more methods in the Lua script\.

Address policy: Single

Handler policy: Multiple

### OnWhisperSent<a name="twitch-chatplaynotificationbus-onwhispersent"></a>

Called when a whisper sends successfully\. The `sentToken` token is associated with the whisper that was sent\.

**Parameters**  
`number sentToken`

**Return type**  
Void

The following is an example of `OnWhisperSent`:

```
function MyLuaScript:OnWhisperSent(sentToken)
    if (sentToken == myWhisperToken) then
        -- My Whisper was sent successfully!
    end
end
```

## ChatPlayChannelRequestBus<a name="twitch-chatplaychannelrequestbus-ebus"></a>

Use `ChatPlayChannelRequestBus.Event.MethodName(channelName, parameters)` to make requests on this EBus\.

Address policy: By ID \(Twitch channel name\)

Handler policy: Multiple

### Connect<a name="twitch-chatplaychannelrequestbus-connect"></a>

Connects to the channel's Twitch chat\.

**Parameters**  
None

**Return type**  
Void

### Disconnect<a name="twitch-chatplaychannelrequestbus-disconnect"></a>

Disconnects the specified chat channel from Twitch chat\.

**Parameters**  
None

**Return type**  
Void

### GetConnectionState<a name="twitch-chatplaychannelrequestbus-getconnectionstate"></a>

Returns the connection state for the specified chat channel\. See [ConnectionState](chatplay-console-variables.md#chatplay-classes-list)\.

Parameters  
None

**Return type**  
ConnectionState

The following is an example of `GetConnectionState`:

```
connectionState = ChatPlayChannelRequestBus.Event.GetConnectionState(self.Properties.Channel);

if (connectionState == ConnectionState.Disconnected) then
    Debug.Log("Disconnected");
elseif (connectionState == ConnectionState.Connecting) then
    Debug.Log("Connecting");
elseif (connectionState == ConnectionState.Connected) then
    Debug.Log("Connected");
elseif (connectionState == ConnectionState.Error) then
    Debug.Log("Error");
elseif (connectionState == ConnectionState.Failed) then
    Debug.Log("Failed");
end
```

## ChatPlayChannelNotificationBus<a name="twitch-chatplaychannelnotificationbus-ebus"></a>

Use `ChatPlayChannelNotificationBus.Connect(self, channelName)` to connect the handler and implement one or more methods in the Lua script\.

Address policy: By ID \(Twitch channel name\)

Handler policy: Multiple

### OnConnectionStateChanged<a name="twitch-chatplaychannelrequestbus-onconnectionstatechanged"></a>

Called when the connection state for the chat channel changes\. See [ConnectionState](chatplay-console-variables.md#chatplay-classes-list)\.

**Parameters**  
`ConnectionState state`

**Return type**  
Void

### OnKeywordMatched<a name="twitch-chatplaychannelrequestbus-onkeywordmatched"></a>

Called when a registered keyword is matched\.
+ `keyword` – Original registered keyword or regex that was matched against\.
+ `match` – Actual matched string\.
+ `username` – Name of the user who triggered the match\.

**Parameters**  
`string keyword`, `string match`, `string username`

**Return type**  
Void

## ChatPlayVoteRequestBus<a name="twitch-chatplaychannelvoterequestbus-ebus"></a>

Use `ChatPlayVoteRequestBus.Event.MethodName(voteID, parameters)` to make requests on this EBus\.

Address policy: By ID \(unique vote name/string\)

Handler policy: Single

### AddOption<a name="twitch-chatplaychannelvoterequestbus-add-option"></a>

Adds a vote option for the specified keyword \(or regex\) to the vote\. Returns true if the vote option is added successfully\. Returns false if the vote option is not added\.

**Parameters**  
`string keyword`

**Return type**  
Boolean

### RemoveOption<a name="twitch-chatplaychannelvoterequestbus-remove-option"></a>

Removes the vote option that has the specified keyword\.

**Parameters**  
`string keyword`

**Return type**  
Void

### ConfigureOption<a name="twitch-chatplaychannelvoterequestbus-configure-option"></a>

Configures the vote option using the specified keyword, and sets the vote count and enabled state\.

**Parameters**  
`string keyword`, `number count`, `bool enabled`

**Return type**  
Void

### OptionExists<a name="twitch-chatplaychannelvoterequestbus-option-exists"></a>

Returns true if a vote option with the specified keyword exists\. Returns false if a vote option with the specified keyword does not exist\.

**Parameters**  
`string keyword`

**Return type**  
Boolean

### GetOptionCount<a name="twitch-chatplaychannelvoterequestbus-get-option-count"></a>

Returns the vote count for the option with the specified keyword\.

**Parameters**  
`string keyword`

**Return type**  
Number

### SetOptionCount<a name="twitch-chatplaychannelvoterequestbus-set-option-count"></a>

Sets the vote count for the option with the specified keyword\.

**Parameters**  
`string keyword`, `number count`

**Return type**  
Void

### GetOptionEnabled<a name="twitch-chatplaychannelvoterequestbus-get-option-enabled"></a>

Returns true if a vote option with the specified keyword is enabled for voting or matching\. Returns false if a vote option with the specified keyword is disabled for voting or matching\.

**Parameters**  
`string keyword`

**Return type**  
Boolean

### SetOptionEnabled<a name="twitch-chatplaychannelvoterequestbus-set-option-enabled"></a>

Sets the enabled state for the option with the specified keyword\.

**Parameters**  
`string keyword`, `bool enabled`

**Return type**  
Void

### SetChannel<a name="twitch-chatplaychannelvoterequestbus-set-channel"></a>

Sets the associated Twitch channel for the `ChatPlayVote` to the specified channel name\. This creates a chat channel using the specified value for `channelName`, if a chat channel doesn't already exist\. Returns true if the chat channel is created successfully\. Returns false if the chat channel is not created\.

**Parameters**  
`string channelName`

**Return type**  
Boolean

### ClearChannel<a name="twitch-chatplaychannelvoterequestbus-clear-channel"></a>

Clears the associated Twitch channel from the `ChatPlayVote`\.

**Parameters**  
None

**Return type**  
Void

### SetEnableStateAll<a name="twitch-chatplaychannelvoterequestbus-set-enable-state-all"></a>

Sets the enabled state for all options in the `ChatPlayVote`\.

**Parameters**  
`bool enabled`

**Return type**  
Void

### SetCountAll<a name="twitch-chatplaychannelvoterequestbus-set-count-all"></a>

Sets the vote count for all options in the `ChatPlayVote`\.

**Parameters**  
`number count`

**Return type**  
Void

### SetVoterLimiting<a name="twitch-chatplaychannelvoterequestbus-set-voter-limiting"></a>

Sets voter limiting\. If true, only the first vote from each user contributes to the option count\. If false, all votes from each user contributes to the option count\.

**Parameters**  
`bool limiting`

**Return type**  
Void

### ResetVotedList<a name="twitch-chatplaychannelvoterequestbus-reset-voted-list"></a>

Resets the list of users who have voted\. This allows user votes to be counted again\.

**Parameters**  
None

**Return type**  
Void