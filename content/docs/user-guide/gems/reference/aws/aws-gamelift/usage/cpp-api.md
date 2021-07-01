---
linkTitle: C++ API
title: C++ API for AWS GameLift Gem
description: "Learn how to use the C++ API for AWS GameLift Gem in O3DE"
toc: true
---

## 1. Session Interface

The *session interface*, `ISessionRequests` and `ISessionAsyncRequests`, provide public APIs that allows you to create game sessions and allows players to search and join online games. The session interface abstracts the implementation details of session related management.

There must be only one implementation of the session interface per dedicated server solution. To add support for another dedicated server solution, you must create another implementation of the session interface.

The AWS GameLift Gem implements a session interface for Amazon's dedicated server solution, Amazon GameLift service. The session interface performs all of the session handling, the AWS GameLift Gem acts as a game-specific handler of the session interface, and the game code makes calls to it when it needs to interact with the session. The game session is created and owned by Amazon GameLift service, and only exists on the server when running an online game.

## 2. Session Management

### `CreateSession`

Creates a multiplayer session for players to find and join.

To create a session, call `AWSGameLiftClientManager::CreateSession()` or `AWSGameLiftClientManager::CreateSessionAsync()`. This makes request calls that configure the new session. When a session begins to create, the `OnCreateSessionBegin` notification is broadcasted on the server side to perform setup operations, such as loading the level.

```cpp
// Make synchronous call
AWSGameLift::AWSGameLiftCreateSessionRequest request;
request.m_idempotencyToken = "YourGameLiftSessionId";
request.m_fleetId = "YourGameLiftFleetId";
request.m_maxPlayer = 1;
AZStd::string result = "";
AWSGameLift::AWSGameLiftSessionRequestBus::BroadcastResult(result, &AWSGameLift::AWSGameLiftSessionRequestBus::Events::CreateSession, request);

// Make asynchronous call
AWSGameLift::AWSGameLiftCreateSessionRequest request;
request.m_idempotencyToken = "YourGameLiftSessionId";
request.m_fleetId = "YourGameLiftFleetId";
request.m_maxPlayer = 1;
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
// Make synchronous call
AWSGameLift::AWSGameLiftSearchSessionsRequest request;
request.m_fleetId = "YourGameLiftFleetId";
AzFramework::SearchSessionsResponse result;
AWSGameLift::AWSGameLiftSessionRequestBus::BroadcastResult(result, &AWSGameLift::AWSGameLiftSessionRequestBus::Events::SearchSessions, request);

// Make asynchronous call
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

To begin the process that allows a player to join the game, call `AWSGameLiftClientManager::JoinSession()` or `AWSGameLiftClientManager::JoinSessionAsync()` and pass in the game session id, which you searched for in the previous step, and the player id that will join. The process returns `true` if both steps, reserving player slot and initializing connection, succeed. If either step fails, the process returns `false`.

```cpp
// Make synchronous call
AWSGameLift::AWSGameLiftJoinSessionRequest request;
request.m_sessionId = "YourGameSessionId";
request.m_playerId= "YourPlayerId";
bool result = false;
AWSGameLift::AWSGameLiftSessionRequestBus::BroadcastResult(result, &AWSGameLift::AWSGameLiftSessionRequestBus::Events::JoinSession, request);

// Make asynchronous call
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
// Make synchronous call
AWSGameLift::AWSGameLiftSessionRequestBus::Broadcast(&AWSGameLift::AWSGameLiftSessionRequestBus::Events::LeaveSession);

// Make asynchronous call
AWSGameLift::AWSGameLiftSessionAsyncRequestBus::Broadcast(&AWSGameLift::AWSGameLiftSessionAsyncRequestBus::Events::LeaveSessionAsync);

void OnLeaveSessionAsyncComplete()
{
    ...
}
```

### Destroy Session (Passively)

As the default behavior, when the last player leaves the game session, the game session will be destroyed.

## 3. Server Notifications

You must notify the Amazon GameLift server that your server process is ready to host game sessions, handle requests, and take connections. 

To send a notification that your server process is ready, use `AWSGameLiftServerManager::NotifyGameLiftProcessReady()`. Put this call in your project system component activate step, and call it after your project has been connected to `AzFramework::SessionNotificationBus`. 

```cpp
AWSGameLift::AWSGameLiftServerRequestBus::Broadcast(&AWSGameLift::AWSGameLiftServerRequestBus::Events::NotifyGameLiftProcessReady);
```

### `OnSessionHealthCheck`

When your server process is ready and running, `AzFramework::SessionNotificationBus::Events::OnSessionHealthCheck` is called regularly to report a health status of your server process.

You can customize the health check logic in `OnSessionHealthCheck`. For more information, read about [ProcessParameters](https://docs.aws.amazon.com/gamelift/latest/developerguide/integration-server-sdk-cpp-ref-datatypes.html#integration-server-sdk-cpp-ref-dataypes-process) in the Amazon GameLift documentation.

```cpp

bool OnSessionHealthCheck()
{
    ...
}

```

### `OnCreateSessionBegin`

When the session begins to create on the server, the `AzFramework::SessionNotificationBus::Events::OnCreateSessionBegin()` notification is broadcasted on the server side. During this step, it's recommended to load the level on the server side. 

```cpp

bool OnCreateSessionBegin(const AzFramework::SessionConfig& sessionConfig)
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

Previous Topic: [AWS GameLift Gem Setup](/docs/user-guide/gems/reference/aws/aws-gamelift/gem-setup/)

Next Topic: [Scripting with AWS GameLift Gem](/docs/user-guide/gems/reference/aws/aws-gamelift/usage/scripting/)