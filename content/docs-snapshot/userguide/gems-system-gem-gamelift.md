# GameLift Gem<a name="gems-system-gem-gamelift"></a>

Amazon GameLift is an AWS service for deploying, operating, and scaling session\-based multiplayer games\. With Amazon GameLift, you can quickly scale high\-performance game servers up and down to meet player demand without any additional engineering effort or upfront costs\.

The GameLift Gem provides a framework to extend Lumberyard networking \(GridMate\) to work with GameLift resources via GameLift server and client API's\.

## Getting Started<a name="gems-system-gem-gamelift-getting-started"></a>

To use the Amazon GameLift service with your Lumberyard project, you simply enable the GameLift Gem using Project Configurator\.

You will want to familiarize yourself with GameLift concepts found in the [Amazon GameLift Developer Guide](https://docs.aws.amazon.com/gamelift/latest/developerguide)\. GameLift resources like fleet, queue, matchmaking rule, and config need to be deployed prior to running your game on GameLift\. For more details, refer to the [GameLift CLI](https://docs.aws.amazon.com/cli/latest/reference/gamelift)\.

## Implementation<a name="gems-system-gem-gamelift-implementation"></a>

The GameLift Gem provides server and client code\. Server code interacts with GameLift server SDK, while client code interacts with the GameLift client from the AWS native SDK\.

The GameLift Gem server code is responsible for initializing the server process by initializing the GameLift server SDK and then hosting game sessions for the clients to connect\. If run in custom matchmaking backfill configuration, the server is also responsible for starting and cancelling matchmaking backfill requests\.

The GameLift Gem client provides options to create, search, join, and matchmake into GameLift game sessions\. Matchmaking is handled using GameLift's FlexMatch matchmaking system\. Clients can create, search, and join game sessions directly on GameLift fleets, or using preconfigured GameLift queues\. If matchmaking, clients can use a preconfigured matchmaking configuration to create or join game sessions\.

On the server side, the GameLift Gem provides the `GameLiftServerService`\. On the client side, the Gem provides the `GameLiftClientService`\. When you use the GameLift Gem in your game project, the following sequence of events occurs:
+ The server starts the `GameLiftServerService` and listens for events delivered by the GameLift Server SDK\.
+ The client starts the `GameLiftClientService`, sends a `GameLiftSessionRequest` or `GameLiftGameSessionPlacementRequest`, and searches and joins game sessions using the fleet ID or queue name\. The client service also provides an option to create or join game sessions using FlexMatch matchmaking\.

These events are illustrated in the following workflow diagrams\.

 **GameLift client\-server communication workflow using fleet or queues to create a game session\.**

![\[GameLift client-server communication workflow using fleet or queues to create a game session.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/game-lift-gem-workflow.png)

 **GameLift client\-server communication workflow using FlexMatch, with automatic or custom backfill\.**

![\[GameLift client-server communication workflow using FlexMatch, with automatic or custom backfill.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/game-lift-gem-workflow-matchmaking.png)

## Sample Code<a name="gems-system-gem-gamelift-sample-code"></a>

The GameLift code in this section follows the workflow illustrated in the preceding diagram and is separated into server\-side code and client\-side code\. The code is enabled only when `BUILD_GAMELIFT_SERVER` and `BUILD_GAMELIFT_CLIENT` are defined\.

### Server\-side Code<a name="gems-system-gem-gamelift-sample-code-server-side"></a>

Use the following sample code as a guide when starting and hosting a GameLift server session\.

<a name="gems-system-gem-gamelift-sample-code-start-gameliftserverservice.title"></a>Start GameLiftServerService

```
GridMate::GameLiftServerServiceDesc serviceDesc;
serviceDesc.m_port = settings.m_serverPort;
if (settings.m_logPath)
{
    serviceDesc.m_logPaths.push_back(settings.m_logPath);
}

m_service = GridMate::StartGridMateService<GridMate::GameLiftServerService>(m_gridMate, serviceDesc);
```

<a name="gems-system-gem-gamelift-sample-code-host-a-session.title"></a>Host a Session

```
GridMate::CarrierDesc carrierDesc;
carrierDesc.m_port = s_gameLiftSettings.m_serverPort;
carrierDesc.m_driverIsFullPackets = false;
carrierDesc.m_driverIsCrossPlatform = true;

GridMate::GameLiftSessionParams sp;
sp.m_topology = GridMate::ST_CLIENT_SERVER;
sp.m_gameSession = &gameSession;

EBUS_EVENT_ID_RESULT(session, m_gridMate, GridMate::GameLiftServerServiceBus, HostSession, sp, carrierDesc);
```

<a name="gems-system-gem-gamelift-sample-code-matchmaking-backfill.title"></a>Start/Stop Matchmaking Backfill

```
EBUS_EVENT_ID(m_gridMate, GridMate::GameLiftServerServiceBus, StartMatchmakingBackfill, m_updateGameSession, m_session, checkForAutoBackfill=true);
EBUS_EVENT_ID(gEnv->pNetwork->GetGridMate(), GridMate::GameLiftServerServiceBus, StopMatchmakingBackfill, m_session, m_ticketId);
```

### Client\-side Code<a name="gems-system-gem-gamelift-sample-code-client-side"></a>

Use the following sample code as a guide when using the GameLift client service\.

<a name="gems-system-gem-gamelift-sample-code-start-gameliftclientservice.title"></a>Start GameLiftClientService

```
GridMate::GameLiftClientServiceDesc serviceDesc;
serviceDesc.m_accessKey = settings.m_accessKey;
serviceDesc.m_secretKey = settings.m_secretKey;
serviceDesc.m_endpoint = settings.m_endpoint;
serviceDesc.m_region = settings.m_region;

m_service = GridMate::StartGridMateService<GridMate::GameLiftClientService>(m_gridMate, serviceDesc);
```

<a name="gems-system-gem-gamelift-sample-code-send-gameliftsessionrequest.title"></a>Send GameLiftSessionRequest / GameLiftGameSessionPlacementRequest

```
GridMate::GameLiftSessionRequestParams reqParams;
reqParams.m_instanceName = "TestSession";
reqParams.m_numPublicSlots = 16;
reqParams.m_params[0].m_id = "param1";
reqParams.m_params[0].m_value = "value12";
reqParams.m_numParams = 1;

// Only need ONE of the below. Queue gets the highest preference, followed by alias and fleet id.
reqParams.m_fleetId = "fleet_id";
reqParams.m_aliasId = "alias_id";
reqParams.m_queueName = "queue_name";

m_sessionRequest = m_service->RequestSession(reqParams);
EBUS_EVENT_ID_RESULT(m_session, m_gridMate, GridMate::GameLiftClientServiceBus, RequestSession, reqParams);
```

<a name="gems-system-gem-gamelift-sample-code-search-active-sessions.title"></a>Search Active Sessions

```
GridMate::GameLiftSearchParams searchParams;
// Only need ONE of the below. Queue gets the highest preference, followed by alias and fleet id.
searchParams.m_fleetId = "fleet_id";
searchParams.m_aliasId = "alias_id";
searchParams.m_queueName = "queue_name";

EBUS_EVENT_ID_RESULT(m_search, m_gridMate, GridMate::GameLiftClientServiceBus, StartSearch, GridMate::GameLiftSearchParams());
```

<a name="gems-system-gem-gamelift-sample-code-join-a-session.title"></a>Join a Session

```
GridMate::CarrierDesc carrierDesc;
carrierDesc.m_port = 33435;
carrierDesc.m_enableDisconnectDetection = true;
carrierDesc.m_connectionTimeoutMS = 10000;
carrierDesc.m_threadUpdateTimeMS = 30;

const GridMate::GameLiftSearchInfo& gameLiftSearchInfo = static_cast<const GridMate::GameLiftSearchInfo&>(*gridSearch->GetResult(0));
EBUS_EVENT_ID_RESULT(m_session, m_gridMate, GridMate::GameLiftClientServiceBus, JoinSessionBySearchInfo, gameLiftSearchInfo, carrierDesc);
```

<a name="gems-system-gem-gamelift-sample-code-matchmaking.title"></a>Join using FlexMatch Matchmaking

```
m_matchmakingConfigName = "MatchmakingConfig";
EBUS_EVENT_ID_RESULT(m_search, m_gridMate, GridMate::GameLiftClientServiceBus, StartMatchmaking, m_matchmakingConfigName);
```