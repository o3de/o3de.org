---
linkTitle: FlexMatch Scripting
title: FlexMatch Scripting
description: Learn about Script Canvas nodes for the AWS GameLift Gem in Open 3D Engine (O3DE).
toc: true
weight: 400
---


The **AWS GameLift** provides Script Canvas nodes that make requests against Amazon GameLift to start, stop and accept matchmaking requests.

There are synchronous and asynchronous versions for each action. Asynchronous nodes perform their operation in the AZ JobFunction and finish at some point in the future. These operations communicate through AWS HTTPS requests or over the network. Each asynchronous node has a corresponding notification handler node.


## ConfigureGameLiftClient

To make requests against GameLift, you must create a proper GameLift client using the **ConfigureGameLiftClient** node. With this node, you can specify the AWS Region where your GameLift fleets are created and reside.

Note that you must specify the AWS Region in the correct format. For example, for the US East (N. Virginia) Region, specify **us-east-1**. For a list of supported Regions, refer to [Amazon GameLift endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/gamelift.html) in the AWS General Reference.


### ConfigureGameLiftClient node

![ConfigureGameLiftClient node](/images/user-guide/gems/reference/aws/aws-gamelift/configureclient.PNG)


## StartMatchmaking
To create a game match for a group of players based on custom matchmaking rules, use the `StartMatchmaking` node.
With this node, you can pass in the properties `configuration name`, `players` and `ticket id` through `AWSGameLiftStartMatchmakingRequest`.


### StartMatchmaking node

![StartMatchmaking node](/images/user-guide/gems/reference/aws/aws-gamelift/startmatchmaking.PNG)


### StartMatchmakingAsync node and Async Handler node

![StartMatchmakingAsync node and Async Handler node](/images/user-guide/gems/reference/aws/aws-gamelift/startmatchmakingasync.PNG)


### AWSGameLiftStartMatchmakingRequest Get and Set variable nodes

![AWSGameLiftStartMatchmakingRequest Get and Set variable nodes](/images/user-guide/gems/reference/aws/aws-gamelift/startmatchmakingrequest.PNG)


## StopMatchmaking
To cancel a matchmaking ticket that is currently being processed, use the `StopMatchmaking` node.
With this node, you can pass in the property `ticket id` through `AWSGameLiftStopMatchmakingRequest`.


### StopMatchmaking node

![StopMatchmaking node](/images/user-guide/gems/reference/aws/aws-gamelift/stopmatchmaking.PNG)


### StopMatchmakingAsync node and Async Handler node

![StopMatchmakingAsync node and Async Handler node](/images/user-guide/gems/reference/aws/aws-gamelift/stopmatchmakingasync.PNG)


### AWSGameLiftStopMatchmakingRequest Get and Set variable nodes

![AWSGameLiftStopMatchmakingRequest Get and Set variable nodes](/images/user-guide/gems/reference/aws/aws-gamelift/stopmatchmakingrequest.PNG)


## AcceptMatch
To register a player's acceptance or rejection of a proposed matchmaking, use the `AcceptMatch` node.
With this node, you can pass in the properties `accept match`, `player ids` and `ticket id` through `AWSGameLiftAcceptMatchRequest`.


### AcceptMatch node

![AcceptMatch node](/images/user-guide/gems/reference/aws/aws-gamelift/acceptmatch.PNG)


### AcceptMatchAsync node and Async Handler node

![AcceptMatchAsync node and Async Handler node](/images/user-guide/gems/reference/aws/aws-gamelift/acceptmatchasync.PNG)


### AWSGameLiftAcceptMatchRequest Get and Set variable nodes

![AWSGameLiftAcceptMatchRequest Get and Set variable nodes](/images/user-guide/gems/reference/aws/aws-gamelift/acceptmatchrequest.PNG)


## StartPolling
Request to start process for polling matchmaking ticket based on given ticket id and player Id.


### StartPolling node

![StartPolling node](/images/user-guide/gems/reference/aws/aws-gamelift/startpolling.PNG)


## StopPolling
Request to stop process for polling matchmaking ticket.


### StopPolling node

![StopPolling node](/images/user-guide/gems/reference/aws/aws-gamelift/stoppolling.PNG)


## Matchmaking notifications

The matchmaking notifications to listen for performing required operations based on matchmaking ticket event.


### OnMatchAcceptance node

OnMatchAcceptance is fired when match is found and pending on acceptance. Use this notification to accept found match.

![OnMatchAcceptance node](/images/user-guide/gems/reference/aws/aws-gamelift/onmatchacceptance.PNG)


### OnMatchComplete node

OnMatchComplete is fired when match is complete.

![OnMatchComplete](/images/user-guide/gems/reference/aws/aws-gamelift/onmatchcomplete.PNG)


### OnMatchError node

OnMatchError is fired when match is processed with error.

![OnMatchError node](/images/user-guide/gems/reference/aws/aws-gamelift/onmatcherror.PNG)


### OnMatchFailure node

OnMatchFailure is fired when match is failed to complete.

![OnMatchFailure node](/images/user-guide/gems/reference/aws/aws-gamelift/onmatchfailure.PNG)


---
Previous topic: [FlexMatch C++ API](cpp-api/)

Next topic: [AWS GameLift Gem Advanced Topics](/docs/user-guide/gems/reference/aws/aws-gamelift/advanced-topics/)
