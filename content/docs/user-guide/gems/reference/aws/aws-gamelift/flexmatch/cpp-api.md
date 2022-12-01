---
linkTitle: FlexMatch C++ API
title: FlexMatch C++ API 
description: Learn how to use the FlexMatch C++ API with the AWS GameLift Gem in Open 3D Engine (O3DE).
toc: true
weight: 300
---


## Client Side

The **AWS GameLift** Gem implements a matchmaking interface for Amazon GameLift. The *matchmaking interface* (`IMatchmakingRequests` and `IMatchmakingAsyncRequests`) provides public APIs to add player matchmaking functionality to your GameLift hosted games. 

The matchmaking interface represents the actions required to handle matchmaking in a game. The Gem provides an implementation to this interface that utilizes GameLift FlexMatch to find and group players in a session for your game.

There must be only one implementation of the matchmaking interface per matchmaking solution. To add support for another matchmaking solution, you must create another implementation of the matchmaking interface.


### Matchmaking APIs

### `StartMatchmaking`

Find a match for a group of players and create a session to host match. Check [StartMatchmaking](https://docs.aws.amazon.com/gamelift/latest/apireference/API_StartMatchmaking.html) for more details.

To start matchmaking, call `AWSGameLiftClientManager::StartMatchmaking()` or `AWSGameLiftClientManager::StartMatchmakingAsync()` and pass in a reference to the StartMatchmaking request, which contains the matchmaking criteria. After the request is sent, you may want to keep polling the matchmaking ticket status to check whether the match is complete.

```cpp
// Make synchronous call to start a game match for the current player
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

// Make asynchronous call to start a game match for the current player
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

### `StopMatchmaking`

Cancels a matchmaking ticket that is currently being processed. Check [StopMatchmaking](https://docs.aws.amazon.com/gamelift/latest/apireference/API_StopMatchmaking.html) for more details.

To stop a matchmaking request, call `AWSGameLiftClientManager::StopMatchmaking()` or `AWSGameLiftClientManager::StopMatchmakingAsync()` and pass in a reference to the StopMatchmaking request, which contains the matchmaking ticket Id.

```cpp
// Make synchronous call to stop a specific matchmaking request
AWSGameLift::AWSGameLiftStopMatchmakingRequest request;
request.m_ticketId = "YourMatchmakingTicketId";
AWSGameLift::AWSGameLiftMatchmakingRequestBus::BroadcastResult(result, &AWSGameLift::AWSGameLiftMatchmakingRequestBus::Events::StopMatchmaking, request);

// Make asynchronous call to stop a specific matchmaking request
AWSGameLift::AWSGameLiftStopMatchmakingRequest request;
request.m_ticketId = "YourMatchmakingTicketId";
AWSGameLift::AWSGameLiftMatchmakingAsyncRequestBus::Broadcast(&AWSGameLift::AWSGameLiftMatchmakingAsyncRequestBus::Events::StopMatchmakingAsync, request);

void OnStopMatchmakingAsyncComplete()
{
    ...
}
```

### `AcceptMatch`

Registers a player's acceptance or rejection of a proposed match when match acceptance is enabled. Check [AcceptMatch](https://docs.aws.amazon.com/gamelift/latest/apireference/API_AcceptMatch.html) for more details.

To Accept or reject the match, call `AWSGameLiftClientManager::AcceptMatch()` or `AWSGameLiftClientManager::AcceptMatchAsync()`, and pass in a reference to the AcceptMatch request, which contains the player decision. 
If any player rejects the match, or if acceptances are not received before a specified timeout, the proposed match is dropped.

```cpp
// Make synchronous call to accept the proposed matchmaking
AWSGameLift::AWSGameLiftAcceptMatchRequest request;
request.m_acceptMatch = true;
request.m_ticketId = "YourMatchmakingTicketId";
request.m_playerIds = { "CurrentPlayerId" };

AWSGameLift::AWSGameLiftMatchmakingRequestBus::BroadcastResult(result, &AWSGameLift::AWSGameLiftMatchmakingRequestBus::Events::AcceptMatch, request);

// Make asynchronous call to accept the proposed matchmaking
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

### `StartPolling`

Request to start process for polling matchmaking ticket based on given ticket id and player Id. 

To start polling the matchmaking ticket status after matchmaking is started, call `AWSGameLiftClientLocalTicketTracker::StartPolling()` and pass in the matchmaking ticket Id and player Id.

```cpp
// Make synchronous call to start polling
AZStd::string ticketId = "YourMatchmakingTicketId";
AZStd::string playerId = "CurrentPlayerId";
AWSGameLift::AWSGameLiftMatchmakingEventRequestBus::Broadcast(&AWSGameLift::AWSGameLiftMatchmakingEventRequestBus::Events::StartPolling, ticketId, playerId);
```

### `StopPolling`

Request to stop process for polling matchmaking ticket.

To stop polling the matchmaking ticket status after matchmaking is completed or canceled, call `AWSGameLiftClientLocalTicketTracker::StopPolling()`.

```cpp
// Make synchronous call to stop polling
AWSGameLift::AWSGameLiftMatchmakingEventRequestBus::Broadcast(&AWSGameLift::AWSGameLiftMatchmakingEventRequestBus::Events::StopPolling);
```

{{< caution >}}  
The local ticket tracker provided by the AWS GameLift Gem is for development only. O3DE developer should replace it with a scalable solution for public release games.
{{< /caution >}}


### Client notifications

Notifications will be sent from the matchmaking ticket tracking system when the ticket status is updated.

### `OnMatchComplete`

When the matchmaking request is completed, the `Multiplayer::MatchmakingNotificationBus::Events::OnMatchComplete()` notification is broadcast from the matchmaking ticket tracking system. Once the matchmaking ticket is completed, the player can join the game session that is hosting the match. 

```cpp
bool OnMatchComplete()
{
    ...
}
```

### `OnMatchError`

When the matchmaking request is processed with error, the `Multiplayer::MatchmakingNotificationBus::Events::OnMatchError()` notification is broadcast from the matchmaking ticket tracking system. 

```cpp
bool OnMatchError()
{
    ...
}
```

### `OnMatchFailure`

When the matchmaking request is failed to complete, the `Multiplayer::MatchmakingNotificationBus::Events::OnMatchFailure()` notification is broadcasted from the matchmaking ticket tracking system. 
```cpp
bool OnMatchFailure()
{
    ...
}
```

### `OnMatchAcceptance`

When match is found and pending on acceptance, the `Multiplayer::MatchmakingNotificationBus::Events::OnMatchAcceptance()` notification is broadcasted from the matchmaking ticket tracking system.

```cpp
bool OnMatchAcceptance()
{
    ...
}
```

## Server Side

### Matchmaking APIs

The following APIs are for manual backfill only. You can set the backfill mode (automatic or manual) in your matchmaking configuration.
Check [Backfill existing games with FlexMatch](https://docs.aws.amazon.com/gamelift/latest/flexmatchguide/match-backfill.html) for more details.

### `StartMatchBackfill`
Sends a request to find new players for open slots in an existing game session. Check [GameLift Server API reference for C++: Actions](https://docs.aws.amazon.com/gamelift/latest/developerguide/integration-server-sdk-cpp-ref-actions.html#integration-server-sdk-cpp-ref-startmatchbackfill) for more details.

To begin the process for manual backfill, call `AWSGameLiftServerManager::StartMatchBackfill()`, and pass in references to the ticket Id and a list of players. 

When an existing session begins to be updated, the `OnUpdateSessionBegin` notification is broadcast on the server side to perform any configuration or initialization. 
At the end of the update, the `OnUpdateSessionEnd` notification is broadcast on the server side to perform any follow-up operations.

```cpp
AZStd::string matchmakingTicketId = "YourMatchmakingTicketId";
// This list should contain the current players in the match, and each player should have expected attributes. Otherwise gamelift gem will use lazy loaded data which is not guaranteed to be accurate.
AZStd::vector<AWSGameLift::AWSGameLiftPlayer> players;
bool result;
AWSGameLift::AWSGameLiftServerRequestBus::BroadcastResult(result, &AWSGameLift::AWSGameLiftServerRequestBus::Events::StartMatchBackfill, matchmakingTicketId, players);
```

### `StopMatchBackfill`
Cancels an active match backfill request that was created with StartMatchBackfill. Check [GameLift Server API reference for C++: Actions](https://docs.aws.amazon.com/gamelift/latest/developerguide/integration-server-sdk-cpp-ref-actions.html#integration-server-sdk-cpp-ref-stopmatchbackfill) for more details.

To stop the process for manual backfill, call `AWSGameLiftServerManager::StopMatchBackfill()`, and pass in a reference to the ticket Id.

```cpp
AZStd::string matchmakingTicketId = "YourMatchmakingTicketId";
bool result;
AWSGameLift::AWSGameLiftServerRequestBus::BroadcastResult(result, &AWSGameLift::AWSGameLiftServerRequestBus::Events::StopMatchBackfill, matchmakingTicketId);
```


### Session notification

### `OnUpdateSessionBegin`

At the beginning of session update process, `Multiplayer::SessionNotificationBus::Events::OnUpdateSessionBegin` is invoked to perform any configuration or initialization to handle the session settings changing.

```cpp
bool OnUpdateSessionBegin(const SessionConfig& sessionConfig, const AZStd::string& updateReason)
{
    ...
}
```

### `OnUpdateSessionEnd`

At the end of session update process, `Multiplayer::SessionNotificationBus::Events::OnUpdateSessionEnd` is invoked to perform any follow-up operations after session is updated.

```cpp
bool OnUpdateSessionEnd()
{
    ...
}
```

{{< note >}}  
Server side APIs and notifications are for the manual backfill mode only. You don't need to call them for the automatic backfill mode.
{{< /note >}}
