---
linkTitle: C++ API
title: AWS GameLift Gem C++ API 
description: Learn how to use the C++ API for the AWS GameLift Gem in Open 3D Engine (O3DE).
toc: true
weight: 300
---

## Session Management

### Client Side

#### Session interface

The **AWS GameLift** Gem implements a session interface for Amazon GameLift. The *session interface* (`ISessionRequests` and `ISessionAsyncRequests`) provides public APIs that allow you to create game sessions and allow players to search and join online games. The session interface abstracts the implementation details of session-related management.

The session interface performs all of the session handling. The Gem acts as a game-specific handler for the session interface. The game code makes calls by using the Gem's C++ API to interact with the session. GameLift creates and owns the game session, which exists on the server only when running an online game.

There must be only one implementation of the session interface per dedicated server solution. To add support for another dedicated server solution, you must create another implementation of the session interface.


#### Session APIs

To make requests against GameLift, you must configure a proper GameLift client by using `AWSGameLiftClientManager::ConfigureGameLiftClient()`. 

Note that you must specify the AWS Region in the correct format. For example, for the US East (N. Virginia) Region, specify **us-east-1**. For a list of supported Regions, refer to [Amazon GameLift endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/gamelift.html) in the AWS General Reference.

```cpp
AWSGameLift::AWSGameLiftRequestBus::Broadcast(& AWSGameLift::AWSGameLiftRequestBus::Events::ConfigureGameLiftClient, "us-east-1");
```

##### `CreateSession`

Creates a multiplayer session for players to find and join.

To create a session, call `AWSGameLiftClientManager::CreateSession()` or `AWSGameLiftClientManager::CreateSessionAsync()`. This makes a request call that configures the new session. 

When a session begins to create, the `OnCreateSessionBegin` notification is broadcasted on the server side to perform setup operations, such as loading the level.
At the end of the creation, the `OnCreateSessionEnd` notification is broadcasted on the server side to perform any follow-up operation after session is created and active.

```cpp
// For example, make synchronous call to create a game session with max 2 players
AWSGameLift::AWSGameLiftCreateSessionRequest request;
request.m_idempotencyToken = "YourGameLiftSessionId";
request.m_fleetId = "YourGameLiftFleetId";
request.m_maxPlayer = 2;
AZStd::string result = "";
AWSGameLift::AWSGameLiftSessionRequestBus::BroadcastResult(result, &AWSGameLift::AWSGameLiftSessionRequestBus::Events::CreateSession, request);
 
// For example, make asynchronous call to create a game session with max 2 players and get response from notification
AWSGameLift::AWSGameLiftCreateSessionRequest request;
request.m_idempotencyToken = "YourGameLiftSessionId";
request.m_fleetId = "YourGameLiftFleetId";
request.m_maxPlayer = 2;
AWSGameLift::AWSGameLiftSessionAsyncRequestBus::Broadcast(&AWSGameLift::AWSGameLiftSessionAsyncRequestBus::Events::CreateSessionAsync, request);
 
void OnCreateSessionAsyncComplete(const AZStd::string& result)
{
    ...
}
```

##### `SearchSessions`

Searches and retrieves all active sessions that match the provided search criteria.

To search for sessions, call `AWSGameLiftClientManager::SearchSessions()` or `AWSGameLiftClientManager::SearchSessionsAsync()` and pass in a reference to the search request, which contains the search criteria. When the search is completed, you can iterate through `SessionConfigs` from `SearchSessionsResponse`.

```cpp
// For example, make synchronous call to search active game sessions on a specific fleet
AWSGameLift::AWSGameLiftSearchSessionsRequest request;
request.m_fleetId = "YourGameLiftFleetId";
AzFramework::SearchSessionsResponse result;
AWSGameLift::AWSGameLiftSessionRequestBus::BroadcastResult(result, &AWSGameLift::AWSGameLiftSessionRequestBus::Events::SearchSessions, request);

// For example, make asynchronous call to search active game sessions on a specific fleet and get response from notification
AWSGameLift::AWSGameLiftSearchSessionsRequest request;
request.m_fleetId = "YourGameLiftFleetId";
AWSGameLift::AWSGameLiftSessionAsyncRequestBus::Broadcast(&AWSGameLift::AWSGameLiftSessionAsyncRequestBus::Events::SearchSessionsAsync, request);

void OnSearchSessionsAsyncComplete(const AzFramework::SearchSessionsResponse& searchSessionsResponse)
{
    ...
}
```

##### `JoinSession`

Reserves an open player slot in the game session, and initializes a connection from client to server.

To begin the process that allows a player to join the game, call `AWSGameLiftClientManager::JoinSession()` or `AWSGameLiftClientManager::JoinSessionAsync()`, and pass in the game session id and the player id that will join. The process returns `true` if both steps, reserving player slot and initializing connection, succeed. If either step fails, the process returns `false`.

```cpp
// For example, make synchronous call to join a specific session
AWSGameLift::AWSGameLiftJoinSessionRequest request;
request.m_sessionId = "YourGameSessionId";
request.m_playerId= "YourPlayerId";
bool result = false;
AWSGameLift::AWSGameLiftSessionRequestBus::BroadcastResult(result, &AWSGameLift::AWSGameLiftSessionRequestBus::Events::JoinSession, request);

// For example, make asynchronous call to join a specific session and get response from notification
AWSGameLift::AWSGameLiftJoinSessionRequest request;
request.m_sessionId = "YourGameSessionId";
request.m_playerId= "YourPlayerId";
AWSGameLift::AWSGameLiftSessionAsyncRequestBus::Broadcast(&AWSGameLift::AWSGameLiftSessionAsyncRequestBus::Events::JoinSessionAsync, request);

void OnJoinSessionAsyncComplete(bool result)
{
    ...
}
```

##### `LeaveSession`

Disconnects the player from the game session.

To leave the game session, call `AWSGameLiftClientManager::LeaveSession()` or `AWSGameLiftClientManager::LeaveSessionAsync()`.

```cpp
// For example, make synchronous call to leave the current session
AWSGameLift::AWSGameLiftSessionRequestBus::Broadcast(&AWSGameLift::AWSGameLiftSessionRequestBus::Events::LeaveSession);

// For example, make asynchronous call to leave the current session and get notification once the leaving session is completed
AWSGameLift::AWSGameLiftSessionAsyncRequestBus::Broadcast(&AWSGameLift::AWSGameLiftSessionAsyncRequestBus::Events::LeaveSessionAsync);

void OnLeaveSessionAsyncComplete()
{
    ...
}
```

##### Destroy Session (Passively)

As the default behavior, when the last player leaves the game session, GameLift destroys the game session. 


### Server Side
#### Session notifications

You must notify Amazon GameLift service that your server process is ready to host game sessions, handle requests, and take connections.

To send a notification that your server process is ready, complete any relevant initialization and then use `AWSGameLiftServerRequestBus::Events::NotifyGameLiftProcessReady()`.
We recommend placing the call after connecting to `AzFramework::SessionNotificationBus` in the `YourProjectServerSystemComponent` activate step.

```cpp
AWSGameLift::AWSGameLiftServerRequestBus::Broadcast(&AWSGameLift::AWSGameLiftServerRequestBus::Events::NotifyGameLiftProcessReady);
```

After the game session has been created, notifications are broadcast through `AzFramework::SessionNotificationBus`. You can program how your session responds to these notifications.


##### `OnCreateSessionBegin`

When the session begins to create on the server, the `AzFramework::SessionNotificationBus::Events::OnCreateSessionBegin()` notification is broadcasted on the server side. During this step, it's recommended to load the level on the server side. 

```cpp
bool OnCreateSessionBegin(const AzFramework::SessionConfig& sessionConfig)
{
    ...
}
```


##### `OnCreateSessionEnd`

At the end of session creation process, the `AzFramework::SessionNotificationBus::Events::OnCreateSessionEnd()` notification is broadcasted on the server side to perform any follow-up operation after session is created and active.

```cpp
bool OnCreateSessionEnd()
{
    ...
}
```


##### `OnSessionHealthCheck`

When your server process is ready and running, `AzFramework::SessionNotificationBus::Events::OnSessionHealthCheck` is called regularly to report a health status of your server process.

You can customize the health check logic in `OnSessionHealthCheck`. For more information, refer to  [ProcessParameters](https://docs.aws.amazon.com/gamelift/latest/developerguide/integration-server-sdk-cpp-ref-datatypes.html#integration-server-sdk-cpp-ref-dataypes-process) in the Amazon GameLift documentation.

```cpp
bool OnSessionHealthCheck()
{
    ...
}
```


##### `OnDestroySessionBegin`

When the session begins to terminate, the `AzFramework::SessionNotificationBus::Events::OnDestroySessionBegin` notification is broadcasted to perform cleanup operations. During this step, it's recommended to clean up level data on the server side.

```cpp
bool OnDestroySessionBegin()
{
    ...
}
```

##### `OnDestroySessionEnd`

After the session is terminated, the `AzFramework::SessionNotificationBus::Events::OnDestroySessionEnd` notification is broadcasted for any follow-up operations, like shutdown application process, etc.

```cpp
bool OnDestroySessionEnd()
{
    ...
}
```


## FlexMatch Support

### Client Side

#### Matchmaking interface

The **AWS GameLift** Gem implements a matchmaking interface for Amazon GameLift. The *matchmaking interface* (`IMatchmakingRequests` and `IMatchmakingAsyncRequests`) provides public APIs that define what a multiplayer match looks like for your game. The matchmaking interface abstracts the implementation details of matchmaking support.

The matchmaking interface performs all of the matchmaking handling. The Gem acts as a game-specific handler for the matchmaking interface. The game code makes calls by using the Gem's C++ API to support matchmaking. GameLift FlexMatch works as a customizable matchmaking service for multiplayer games.

There must be only one implementation of the matchmaking interface per matchmaking solution. To add support for another matchmaking solution, you must create another implementation of the matchmaking interface.


#### Matchmaking APIs

##### `StartMatchmaking`

Create a game match for a group of players.

To start matchmaking, call `AWSGameLiftClientManager::StartMatchmaking()` or `AWSGameLiftClientManager::StartMatchmakingAsync()` and pass in a reference to the StartMatchmaking request, which contains the matchmaking criteria. After the request is snet, you may want to keep polling the matchmaking ticket status to check whether the match is complete.

```cpp
// For example, make synchronous call to start a game match for the current player
AWSGameLift::AWSGameLiftStartMatchmakingRequest request;
request.m_ticketId = "YourMatchmakingTicketId";
request.m_configurationName = "YourMatchmakingConfigurationName";

AWSGameLift::AWSGameLiftPlayer player;
player.m_playerAttributes["skill"] = "{\"N\": 23}";
player.m_playerAttributes["gameMode"] = "{\"S\": \"deathmatch\"}";
player.m_playerId = "CurrentPlayerId";
request.m_players = { player };

AZStd::string result = "";
AWSGameLift::AWSGameLiftMatchmakingRequestBus::Broadcast(&AWSGameLift::AWSGameLiftMatchmakingRequestBus::Events::StartMatchmaking, request, result);

// For example, make asynchronous call to start a game match for the current player
AWSGameLift::AWSGameLiftStartMatchmakingRequest request;
request.m_ticketId = "YourMatchmakingTicketId";
request.m_configurationName = "YourMatchmakingConfigurationName";

AWSGameLift::AWSGameLiftPlayer player;
player.m_playerAttributes["skill"] = "{\"N\": 23}";
player.m_playerAttributes["gameMode"] = "{\"S\": \"deathmatch\"}";
player.m_playerId = "CurrentPlayerId";
request.m_players = { player };

AWSGameLift::AWSGameLiftMatchmakingAsyncRequestBus::Broadcast(&AWSGameLift::AWSGameLiftMatchmakingAsyncRequestBus::Events::StartMatchmakingAsync, request);
 
void OnStartMatchmakingAsyncComplete(const AZStd::string& matchmakingTicketId)
{
    ...
}
```

##### `StopMatchmaking`

Cancels a matchmaking ticket that is currently being processed.

To stop a matchmaking request, call `AWSGameLiftClientManager::StopMatchmaking()` or `AWSGameLiftClientManager::StopMatchmakingAsync()` and pass in a reference to the StopMatchmaking request, which contains the matchmaking ticket Id.

```cpp
// For example, make synchronous call to stop a specific matchmaking request
AWSGameLift::AWSGameLiftStopMatchmakingRequest request;
request.m_ticketId = "YourMatchmakingTicketId";
AWSGameLift::AWSGameLiftMatchmakingRequestBus::BroadcastResult(result, &AWSGameLift::AWSGameLiftMatchmakingRequestBus::Events::StopMatchmaking, request);

// For example, make asynchronous call to stop a specific matchmaking request
AWSGameLift::AWSGameLiftStopMatchmakingRequest request;
request.m_ticketId = "YourMatchmakingTicketId";
AWSGameLift::AWSGameLiftMatchmakingAsyncRequestBus::Broadcast(&AWSGameLift::AWSGameLiftMatchmakingAsyncRequestBus::Events::StopMatchmakingAsync, request);

void OnStopMatchmakingAsyncComplete()
{
    ...
}
```

##### `AcceptMatch`

Registers a player's acceptance or rejection of a proposed matchmaking when match acceptance is enabled.

To begin the process that allows a player to accept the match, call `AWSGameLiftClientManager::AcceptMatch()` or `AWSGameLiftClientManager::AcceptMatchAsync()`, and pass in a reference to the AcceptMatch request, which contains the player decision. The matchmaking request will be canceled if the player rejects the match.

```cpp
// For example, make synchronous call to accept the proposed matchmaking
AWSGameLift::AWSGameLiftAcceptMatchRequest request;
request.m_acceptMatch = true;
request.m_ticketId = "YourMatchmakingTicketId";
request.m_playerIds = { "CurrentPlayerId" };

AWSGameLift::AWSGameLiftMatchmakingRequestBus::BroadcastResult(result, &AWSGameLift::AWSGameLiftMatchmakingRequestBus::Events::AcceptMatch, request);

// For example, make asynchronous call to accept the proposed matchmaking
AWSGameLift::AWSGameLiftAcceptMatchRequest request;
request.m_acceptMatch = true;
request.m_ticketId = "YourMatchmakingTicketId";
request.m_playerIds = { "CurrentPlayerId" };
AWSGameLift::AWSGameLiftMatchmakingAsyncRequestBus::Broadcast(&AWSGameLift::AWSGameLiftMatchmakingAsyncRequestBus::Events::AcceptMatchAsync, request);

void OnAcceptMatchAsyncComplete()
{
    ...
}
```

##### `StartPolling`

Request to start process for polling matchmaking ticket based on given ticket id and player Id. 

To start polling the matchmaking ticket status after matchmaking is started, call `AWSGameLiftClientLocalTicketTracker::StartPolling()` and pass in the matchmaking ticket Id and player Id.

```cpp
// For example, make synchronous call to start polling
AZStd::string ticketId = "YourMatchmakingTicketId";
AZStd::string playerId = "CurrentPlayerId";
AWSGameLift::AWSGameLiftMatchmakingEventRequestBus::Broadcast(&AWSGameLift::AWSGameLiftMatchmakingEventRequestBus::Events::StartPolling, ticketId, playerId);
```

##### `StopPolling`

Request to stop process for polling matchmaking ticket.

To stop polling the matchmaking ticket status after matchmaking is completed or canceled, call `AWSGameLiftClientLocalTicketTracker::StopPolling()`.

```cpp
// For example, make synchronous call to stop polling
AWSGameLift::AWSGameLiftMatchmakingEventRequestBus::Broadcast(&AWSGameLift::AWSGameLiftMatchmakingEventRequestBus::Events::StopPolling);
```

{{< caution >}}  
The local ticket tracker provided by the AWS GameLift Gem is for development only. O3DE developer should replace it with a scalable solution for public release games.
{{< /caution >}}


#### Client notifications

Notifications should be sent from the matchmaking ticket tracker when the ticket status is updated.

##### `OnMatchComplete`

When the matchmaking request is completed, the `AzFramework::MatchmakingNotificationBus::Events::OnMatchComplete()` notification is broadcasted from the matchmaking ticket tracker. During this step, player can join the game session. 

```cpp
bool OnMatchComplete()
{
    ...
}
```

##### `OnMatchError`

When the matchmaking request is processed with error, the `AzFramework::MatchmakingNotificationBus::Events::OnMatchError()` notification is broadcasted from the matchmaking ticket tracker. 

```cpp
bool OnMatchError()
{
    ...
}
```

##### `OnMatchFailure`

When the matchmaking request is failed to complete, the `AzFramework::MatchmakingNotificationBus::Events::OnMatchFailure()` notification is broadcasted from the matchmaking ticket tracker. 
```cpp
bool OnMatchFailure()
{
    ...
}
```

##### `OnMatchAcceptance`

When match is found and pending on acceptance, the `AzFramework::MatchmakingNotificationBus::Events::OnMatchAcceptance()` notification is broadcasted from the matchmaking ticket tracker.

```cpp
bool OnMatchAcceptance()
{
    ...
}
```

### Server Side

#### Matchmaking APIs

##### `StartMatchBackfill`
Sends a request to find new players for open slots in a game session created with FlexMatch.

To begin the process for manual backfill, call `AWSGameLiftServerManager::StartMatchBackfill()`, and pass in references to the ticket Id and a list of players. 

When an existing session begins to be updated, the `OnUpdateSessionBegin` notification is broadcasted on the server side to perform any configuration or initialization. 
At the end of the update, the `OnUpdateSessionEnd` notification is broadcasted on the server side to perform any follow-up operations.

```cpp
m_matchmakingTicketId = "YourMatchmakingTicketId";
AZStd::vector<AWSGameLift::AWSGameLiftPlayer> players;
AWSGameLift::AWSGameLiftServerRequestBus::Broadcast(&AWSGameLift::AWSGameLiftServerRequestBus::Events::StartMatchBackfill, m_matchmakingTicketId, players);
```

##### `StopMatchBackfill`
Cancels an active match backfill request that was created with StartMatchBackfill.

To stop the process for manual backfill, call `AWSGameLiftServerManager::StopMatchBackfill()`, and pass in a reference to the ticket Id.

#### Session Notification

##### `OnUpdateSessionBegin`

At the beginning of session update process, `AzFramework::SessionNotificationBus::Events::OnUpdateSessionBegin` is invoked to perform any configuration or initialization to handle the session settings changing.

```cpp
bool OnUpdateSessionBegin(const SessionConfig& sessionConfig, const AZStd::string& updateReason)
{
    ...
}
```

##### `OnUpdateSessionEnd`

At the end of session update process, `AzFramework::SessionNotificationBus::Events::OnUpdateSessionEnd` is invoked to perform any follow-up operations after session is updated.

```cpp
bool OnUpdateSessionEnd()
{
    ...
}
```

{{< note >}}  
Server side APIs and notifications are for the manual backfill mode only. You don't need to call them for the automatic backfill mode.
{{< /note >}}


---

Previous topic: [AWS GameLift Gem Setup](gem-setup/)

Next topic: [AWS GameLift Gem Scripting](scripting/)
