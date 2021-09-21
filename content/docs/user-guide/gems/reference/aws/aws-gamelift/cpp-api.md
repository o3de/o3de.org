---
linkTitle: C++ API
title: AWS GameLift Gem C++ API 
description: Learn how to use the C++ API for the AWS GameLift Gem in Open 3D Engine (O3DE).
toc: true
weight: 300
---

## Session interface

The **AWS GameLift** Gem implements a session interface for Amazon GameLift. The *session interface* (`ISessionRequests` and `ISessionAsyncRequests`) provides public APIs that allow you to create game sessions and allow players to search and join online games. The session interface abstracts the implementation details of session-related management.

The session interface performs all of the session handling. The Gem acts as a game-specific handler for the session interface. The game code makes calls by using the Gem's C++ API to interact with the session. GameLift creates and owns the game session, which exists on the server only when running an online game.

There must be only one implementation of the session interface per dedicated server solution. To add support for another dedicated server solution, you must create another implementation of the session interface.


## Session management

To make requests against GameLift, you must configure a proper GameLift client by using `AWSGameLiftClientManager::ConfigureGameLiftClient()`. 

Note that you must specify the AWS Region in the correct format. For example, for the US East (N. Virginia) Region, specify **us-east-1**. For a list of supported Regions, refer to [Amazon GameLift endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/gamelift.html) in the AWS General Reference.

```cpp
AWSGameLift::AWSGameLiftRequestBus::Broadcast(& AWSGameLift::AWSGameLiftRequestBus::Events::ConfigureGameLiftClient, "us-east-1");
```


### `CreateSession`

Creates a multiplayer session for players to find and join.

To create a session, call `AWSGameLiftClientManager::CreateSession()` or `AWSGameLiftClientManager::CreateSessionAsync()`. This makes a request call that configures the new session. When a session begins to create, the `OnCreateSessionBegin` notification is broadcasted on the server side to perform setup operations, such as loading the level.

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

### `SearchSessions`

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

### `JoinSession`

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

### `LeaveSession`

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

### Destroy Session (Passively)

As the default behavior, when the last player leaves the game session, GameLift destroys the game session. 

## Server notifications

You must notify Amazon GameLift service that your server process is ready to host game sessions, handle requests, and take connections.

To send a notification that your server process is ready, complete any relevant initialization and then use `AWSGameLiftServerRequestBus::Events::NotifyGameLiftProcessReady()`.
We recommend placing the call after connecting to `AzFramework::SessionNotificationBus` in the `YourProjectServerSystemComponent` activate step.

```cpp
AWSGameLift::AWSGameLiftServerRequestBus::Broadcast(&AWSGameLift::AWSGameLiftServerRequestBus::Events::NotifyGameLiftProcessReady);
```

After the game session has been created, notifications are broadcast through `AzFramework::SessionNotificationBus`. You can program how your session responds to these notifications.


### `OnCreateSessionBegin`

When the session begins to create on the server, the `AzFramework::SessionNotificationBus::Events::OnCreateSessionBegin()` notification is broadcasted on the server side. During this step, it's recommended to load the level on the server side. 

```cpp
bool OnCreateSessionBegin(const AzFramework::SessionConfig& sessionConfig)
{
    ...
}
```


### `OnSessionHealthCheck`

When your server process is ready and running, `AzFramework::SessionNotificationBus::Events::OnSessionHealthCheck` is called regularly to report a health status of your server process.

You can customize the health check logic in `OnSessionHealthCheck`. For more information, refer to  [ProcessParameters](https://docs.aws.amazon.com/gamelift/latest/developerguide/integration-server-sdk-cpp-ref-datatypes.html#integration-server-sdk-cpp-ref-dataypes-process) in the Amazon GameLift documentation.

```cpp
bool OnSessionHealthCheck()
{
    ...
}
```


### `OnDestroySessionBegin`

When the session begins to terminate, the `AzFramework::SessionNotificationBus::Events::OnDestroySessionBegin` notification is broadcasted to perform cleanup operations. During this step, it's recommended to clean up level data on the server side.

```cpp
bool OnDestroySessionBegin()
{
    ...
}
```

---

Previous topic: [AWS GameLift Gem Setup](gem-setup/)

Next topic: [AWS GameLift Gem Scripting](scripting/)
