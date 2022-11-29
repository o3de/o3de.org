---
linkTitle: Session Management C++ API
title: Session Management C++ API 
description: Learn how to use the multiplayer session management C++ API with the AWS GameLift Gem in Open 3D Engine (O3DE).
toc: true
weight: 300
---

## Client Side

The **AWS GameLift** Gem implements a session interface for Amazon GameLift. The *session interface* (`ISessionRequests` and `ISessionAsyncRequests`) provides public APIs that allow you to create game sessions and allow players to search and join online games. The session interface abstracts the implementation details of session-related management.

The session interface performs all of the session handling. The Gem acts as a game-specific handler for the session interface. The game code makes calls by using the Gem's C++ API to interact with the session. GameLift creates and owns the game session, which exists on the server only when running an online game.

There must be only one implementation of the session interface per dedicated server solution. To add support for another dedicated server solution, you must create another implementation of the session interface.

It is recommended to create game sessions following the [best practices for GameLift game session queues](https://docs.aws.amazon.com/gamelift/latest/developerguide/queues-best-practices.html) instead of creating them directly on fleets.

### Client initialization

To make requests against GameLift, you must configure a proper GameLift client by using `AWSGameLiftClientManager::ConfigureGameLiftClient()`. 

Note that you must specify the AWS Region in the correct format. For example, for the US East (N. Virginia) Region, specify **us-east-1**. For a list of supported Regions, refer to [Amazon GameLift endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/gamelift.html) in the AWS General Reference.

```cpp
AWSGameLift::AWSGameLiftRequestBus::Broadcast(
    & AWSGameLift::AWSGameLiftRequestBus::Events::ConfigureGameLiftClient,
    "us-east-1" // AWS region
);
```


### Session APIs

### `CreateSession`

Creates a multiplayer session for players to find and join. This API should only be used for experimentation during development. Prefer to use queues and async game session placement, ideally from a FlexMatch or game service component in production. Refer to [Get Started with Custom Servers](https://docs.aws.amazon.com/gamelift/latest/developerguide/gamelift-integration.html) for more details.

To create a session, call `AWSGameLiftClientManager::CreateSession()` or `AWSGameLiftClientManager::CreateSessionAsync()`. This makes a request call that configures the new session. 

When session creation begins, the `OnCreateSessionBegin` notification is broadcast on the server side to perform setup operations, such as loading the level. When session creation completes and the session is active, the `OnCreateSessionEnd` notification is broadcast on the server side to perform any follow-up operations.

```cpp
void CreateSessionSync() {
    // Make synchronous call to create a game session with max 2 players
    AWSGameLift::AWSGameLiftCreateSessionRequest request;
    request.m_idempotencyToken = "YourGameLiftSessionId";
    request.m_fleetId = "YourGameLiftFleetId";
    request.m_maxPlayer = 2;
    AZStd::string result = "";
    AWSGameLift::AWSGameLiftSessionRequestBus::BroadcastResult(
        result,
        &AWSGameLift::AWSGameLiftSessionRequestBus::Events::CreateSession, 
        request
    );
}

void CreateSessionAsync() {    
    // Make asynchronous call to create a game session with max 2 players and get response from notification
    AWSGameLift::AWSGameLiftCreateSessionRequest request;
    request.m_idempotencyToken = "YourGameLiftSessionId";
    request.m_fleetId = "YourGameLiftFleetId";
    request.m_maxPlayer = 2;
    AWSGameLift::AWSGameLiftSessionAsyncRequestBus::Broadcast(
        &AWSGameLift::AWSGameLiftSessionAsyncRequestBus::Events::CreateSessionAsync,
        request
    );
} 
```

### `SearchSessions`

Searches and retrieves all active sessions that match the provided search criteria.

To search for sessions, call `AWSGameLiftClientManager::SearchSessions()` or `AWSGameLiftClientManager::SearchSessionsAsync()` and pass in a reference to the search request, which contains the search criteria. When the search is completed, you can iterate through `SessionConfigs` from `SearchSessionsResponse`.

```cpp
void SearchSessionsSync() {
    // Make synchronous call to search active game sessions on a specific fleet
    AWSGameLift::AWSGameLiftSearchSessionsRequest request;
    request.m_fleetId = "YourGameLiftFleetId";
    Multiplayer::SearchSessionsResponse result;
    AWSGameLift::AWSGameLiftSessionRequestBus::BroadcastResult(
        result,
        &AWSGameLift::AWSGameLiftSessionRequestBus::Events::SearchSessions,
        request
    );
}

void SearchSessionsAsync() {
    // Make asynchronous call to search active game sessions on a specific fleet and get response from notification
    AWSGameLift::AWSGameLiftSearchSessionsRequest request;
    request.m_fleetId = "YourGameLiftFleetId";
    AWSGameLift::AWSGameLiftSessionAsyncRequestBus::Broadcast(
        &AWSGameLift::AWSGameLiftSessionAsyncRequestBus::Events::SearchSessionsAsync,
        request
    );
}
```

### `JoinSession`

Reserves an open player slot in the game session, and initializes a connection from client to server.

To begin the process that allows a player to join the game, call `AWSGameLiftClientManager::JoinSession()` or `AWSGameLiftClientManager::JoinSessionAsync()`, and pass in the game session id and the player id that will join. The process returns `true` if both steps, reserving player slot and initializing connection, succeed. If either step fails, the process returns `false`.

```cpp
void JoinSessionSync() {
    // Make synchronous call to join a specific session
    AWSGameLift::AWSGameLiftJoinSessionRequest request;
    request.m_sessionId = "YourGameSessionId";
    request.m_playerId= "YourPlayerId";
    bool result = false;
    AWSGameLift::AWSGameLiftSessionRequestBus::BroadcastResult(
        result,
        &AWSGameLift::AWSGameLiftSessionRequestBus::Events::JoinSession,
        request
    );
}

void JoinSessionAsync() {
    // Make asynchronous call to join a specific session and get response from notification
    AWSGameLift::AWSGameLiftJoinSessionRequest request;
    request.m_sessionId = "YourGameSessionId";
    request.m_playerId= "YourPlayerId";
    AWSGameLift::AWSGameLiftSessionAsyncRequestBus::Broadcast(
        &AWSGameLift::AWSGameLiftSessionAsyncRequestBus::Events::JoinSessionAsync,
        request
    );
}
```

### `LeaveSession`

Disconnects the player from the game session.

To leave the game session, call `AWSGameLiftClientManager::LeaveSession()` or `AWSGameLiftClientManager::LeaveSessionAsync()`.

```cpp
void LeaveSessionSync()
{
    // Make synchronous call to leave the current session
    AWSGameLift::AWSGameLiftSessionRequestBus::Broadcast(&AWSGameLift::AWSGameLiftSessionRequestBus::Events::LeaveSession);
}

void LeaveSessionAsync() 
{
    // Make asynchronous call to leave the current session and get notification once the leaving session is completed
    AWSGameLift::AWSGameLiftSessionAsyncRequestBus::Broadcast(&AWSGameLift::AWSGameLiftSessionAsyncRequestBus::Events::LeaveSessionAsync);
}
```

### Destroy session (passively)

As the default behavior, when the last player leaves the game session, the Multiplayer Gem starts terminating the game session automatically. 


## Server Side

### Server initialization

You must notify Amazon GameLift service that your server process is ready to host game sessions, handle requests, and take connections.

To send a notification that your server process is ready, complete any relevant initialization and then use `AWSGameLiftServerRequestBus::Events::NotifyGameLiftProcessReady()`.
We recommend placing the call after connecting to `Multiplayer::SessionNotificationBus` in the `YourProjectServerSystemComponent` activate step.

```cpp
AWSGameLift::AWSGameLiftServerRequestBus::Broadcast(&AWSGameLift::AWSGameLiftServerRequestBus::Events::NotifyGameLiftProcessReady);
```


### Server notification APIs

After the game session has been created, notifications are broadcast through `Multiplayer::SessionNotificationBus`. You can program how your session responds to these notifications.


### `OnCreateSessionBegin`

When the session begins to create on the server, the `Multiplayer::SessionNotificationBus::Events::OnCreateSessionBegin()` notification is broadcast on the server side. During this step, it's recommended to load the level on the server side. 

```cpp
bool OnCreateSessionBegin(const Multiplayer::SessionConfig& sessionConfig)
{
    ...
}
```


### `OnCreateSessionEnd`

At the end of session creation process, the `Multiplayer::SessionNotificationBus::Events::OnCreateSessionEnd()` notification is broadcast on the server side to perform any follow-up operation after session is created and active.

```cpp
bool OnCreateSessionEnd()
{
    ...
}
```


### `OnSessionHealthCheck`

When your server process is ready and running, `Multiplayer::SessionNotificationBus::Events::OnSessionHealthCheck` is called regularly to report a health status of your server process.

You can customize the health check logic in `OnSessionHealthCheck`. For more information, refer to  [Report server process health](https://docs.aws.amazon.com/gamelift/latest/developerguide/gamelift-sdk-server-api.html#gamelift-sdk-server-health) in the Amazon GameLift documentation.

```cpp
bool OnSessionHealthCheck()
{
    ...
}
```


### `OnDestroySessionBegin`

When the session begins to terminate, the `Multiplayer::SessionNotificationBus::Events::OnDestroySessionBegin` notification is broadcast to perform cleanup operations. During this step, it's recommended to clean up level data on the server side.

```cpp
bool OnDestroySessionBegin()
{
    ...
}
```

### `OnDestroySessionEnd`

After the session is terminated, the `Multiplayer::SessionNotificationBus::Events::OnDestroySessionEnd` notification is broadcast for any follow-up operations, like shutdown application process, etc.

```cpp
bool OnDestroySessionEnd()
{
    ...
}
```
