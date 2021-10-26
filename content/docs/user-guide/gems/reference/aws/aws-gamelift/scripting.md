---
linkTitle: Scripting
title: AWS GameLift Gem Scripting
description: Learn about Script Canvas nodes for the AWS GameLift Gem in Open 3D Engine (O3DE).
toc: true
weight: 400
---


The **AWS GameLift** provides Script Canvas nodes that make requests against Amazon GameLift to create, search, join, and leave game sessions.

There are synchronous and asynchronous versions for each action. Asynchronous nodes perform their operation in the AZ JobFunction and finish at some point in the future. These operations communicate through AWS HTTPS requests or over the network. Each asynchronous node has a corresponding notification handler node.

## ConfigureGameLiftClient

To make requests against GameLift, you must create a proper GameLift client using the **ConfigureGameLiftClient** node. With this node, you can specify the AWS Region where your GameLift fleets are created and reside.

Note that you must specify the AWS Region in the correct format. For example, for the US East (N. Virginia) Region, specify **us-east-1**. For a list of supported Regions, refer to [Amazon GameLift endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/gamelift.html) in the AWS General Reference.


### ConfigureGameLiftClient node

![ConfigureGameLiftClient node](/images/user-guide/gems/reference/aws/aws-gamelift/configureclient.PNG)


## Session management

### CreateSession

Create a session by using the **CreateSession** node. Configure the session by using either the **AWSGameLiftCreateSessionRequest** node or the **AWSGameLiftCreateSessionOnQueueRequest** node.
After successfully creating a session, other instances of your game can discover it using the **SearchSessions** node, and then join it using the **JoinSession** node.


#### `CreateSession node`

![CreateSession node](/images/user-guide/gems/reference/aws/aws-gamelift/createsession.PNG)


#### `CreateSessionAsync node and Async Handler node`

![CreateSessionAsync node and Async Handler node](/images/user-guide/gems/reference/aws/aws-gamelift/createsessionasync.PNG)


#### `AWSGameLiftCreateSessionRequest Get and Set variable nodes`

![AWSGameLiftCreateSessionRequest Get and Set Variable nodes](/images/user-guide/gems/reference/aws/aws-gamelift/createsessionrequest.PNG)


#### `AWSGameLiftCreateSessionOnQueueRequest Get and Set variable nodes`

![AWSGameLiftCreateSessionOnQueueRequest Get and Set nodes](/images/user-guide/gems/reference/aws/aws-gamelift/createsessiononqueuerequest.PNG)


### SearchSessions

Get a list of game sessions that are currently active and joinable by using the SearchSessions node. You can specify your search criteria by using the **AWSGameLiftSearchSessionsRequest** node.

On success, the SearchSessions node returns a list of **SearchSessionsResponse** objects, which provide details of the sessions found that meet your search criteria.

#### `SearchSessions node`

![SearchSessions node](/images/user-guide/gems/reference/aws/aws-gamelift/searchsessions.PNG)
  

#### `SearchSessionsAsync node and Async Handler node`

![SearchSessionsAsync node and Async Handler node](/images/user-guide/gems/reference/aws/aws-gamelift/searchsessionasync.PNG)


#### `AWSGameLiftSearchSessionsRequest Get and Set variable nodes`

![AWSGameLiftSearchSessionsRequest Get and Set variable nodes](/images/user-guide/gems/reference/aws/aws-gamelift/searchsessionsrequest.PNG)


#### `SearchSessionsResponse Get and Set variable nodes`

![SearchSessionsResponse Get and Set variable nodes](/images/user-guide/gems/reference/aws/aws-gamelift/searchsessionsresponse.PNG)


### JoinSession

After searching for a session, you can join a session using the `JoinSession` node. Specify the session using its `game session id`, which you retrieved from SearchSession. If the game successfully connects to the server, you will automatically travel to the server's map and join the gameplay.

With this node, you can pass in the properties `game session id` and `player id` through `AWSGameLiftJoinSessionRequest`.

  
#### `JoinSession node`

![JoinSession node](/images/user-guide/gems/reference/aws/aws-gamelift/joinsession.PNG)


#### `JoinSessionAsync node and Async Handler node`

![JoinSessionAsync node and Async Handler node](/images/user-guide/gems/reference/aws/aws-gamelift/joinsessionasync.PNG)


#### `AWSGameLiftJoinSessionRequest Get and Set variable nodes`

![AWSGameLiftJoinSessionRequest Get and Set variable nodes](/images/user-guide/gems/reference/aws/aws-gamelift/joinsessionrequest.PNG)


### LeaveSession

To disconnect from a joined session, use the **LeaveSession** node.


#### `LeaveSession node`

![LeaveSession node](/images/user-guide/gems/reference/aws/aws-gamelift/leavesession.PNG)  


#### `LeaveSessionAsync node and Async Handler node`

![LeaveSessionAsync node and Async Handler node](/images/user-guide/gems/reference/aws/aws-gamelift/leavesessionasync.PNG)  


## FlexMatch support

### StartMatchmaking
To create a game match for a group of players based on custom matchmaking rules, use the `StartMatchmaking` node.
With this node, you can pass in the properties `configuration name`, `players` and `ticket id` through `AWSGameLiftStartMatchmakingRequest`.


#### `StartMatchmaking node`

![StartMatchmaking node](/images/user-guide/gems/reference/aws/aws-gamelift/startmatchmaking.PNG)


#### `StartMatchmakingAsync node and Async Handler node`

![StartMatchmakingAsync node and Async Handler node](/images/user-guide/gems/reference/aws/aws-gamelift/startmatchmakingasync.PNG)


#### `AWSGameLiftStartMatchmakingRequest Get and Set variable nodes`

![AWSGameLiftStartMatchmakingRequest Get and Set variable nodes](/images/user-guide/gems/reference/aws/aws-gamelift/startmatchmakingrequest.PNG)


### StopMatchmaking
To cancel a matchmaking ticket that is currently being processed, use the `StopMatchmaking` node.
With this node, you can pass in the property `ticket id` through `AWSGameLiftStopMatchmakingRequest`.


#### `StopMatchmaking node`

![StopMatchmaking node](/images/user-guide/gems/reference/aws/aws-gamelift/stopmatchmaking.PNG)


#### `StopMatchmakingAsync node and Async Handler node`

![StopMatchmakingAsync node and Async Handler node](/images/user-guide/gems/reference/aws/aws-gamelift/stopmatchmakingasync.PNG)


#### `AWSGameLiftStopMatchmakingRequest Get and Set variable nodes`

![AWSGameLiftStopMatchmakingRequest Get and Set variable nodes](/images/user-guide/gems/reference/aws/aws-gamelift/stopmatchmakingrequest.PNG)


### AcceptMatch
To register a player's acceptance or rejection of a proposed matchmaking, use the `AcceptMatch` node.
With this node, you can pass in the properties `accept match`, `player ids` and `ticket id` through `AWSGameLiftAcceptMatchRequest`.


#### `AcceptMatch node`

![AcceptMatch node](/images/user-guide/gems/reference/aws/aws-gamelift/acceptmatch.PNG)


#### `AcceptMatchAsync node and Async Handler node`

![AcceptMatchAsync node and Async Handler node](/images/user-guide/gems/reference/aws/aws-gamelift/acceptmatchasync.PNG)


#### `AWSGameLiftAcceptMatchRequest Get and Set variable nodes`

![AWSGameLiftAcceptMatchRequest Get and Set variable nodes](/images/user-guide/gems/reference/aws/aws-gamelift/acceptmatchrequest.PNG)


### StartPolling
Request to start process for polling matchmaking ticket based on given ticket id and player Id.


#### `StartPolling node`

![StartPolling node](/images/user-guide/gems/reference/aws/aws-gamelift/startpolling.PNG)


### StopPolling
Request to stop process for polling matchmaking ticket.


#### `StopPolling node`

![StopPolling node](/images/user-guide/gems/reference/aws/aws-gamelift/stoppolling.PNG)


### Matchmaking notifications

The matchmaking notifications to listen for performing required operations based on matchmaking ticket event.


#### `OnMatchAcceptance node`

OnMatchAcceptance is fired when match is found and pending on acceptance. Use this notification to accept found match.

![OnMatchAcceptance node](/images/user-guide/gems/reference/aws/aws-gamelift/onmatchacceptance.PNG)


#### `OnMatchComplete node`

OnMatchComplete is fired when match is complete.

![OnMatchComplete](/images/user-guide/gems/reference/aws/aws-gamelift/onmatchcomplete.PNG)


#### `OnMatchError node`

OnMatchError is fired when match is processed with error.

![OnMatchError node](/images/user-guide/gems/reference/aws/aws-gamelift/onmatcherror.PNG)


#### `OnMatchFailure node`

OnMatchFailure is fired when match is failed to complete.

![OnMatchFailure node](/images/user-guide/gems/reference/aws/aws-gamelift/onmatchfailure.PNG)


---

Previous topic: [AWS GameLift Gem C++ API](cpp-api/)

Next topic: [AWS GameLift Gem Advanced Topics](advanced-topics/)
