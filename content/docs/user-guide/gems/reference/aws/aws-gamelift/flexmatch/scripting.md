---
linkTitle: FlexMatch Scripting
title: FlexMatch Scripting
description: Learn about Script Canvas nodes for player matchmaking in the AWS GameLift Gem in Open 3D Engine (O3DE).
toc: true
weight: 400
---


The **AWS GameLift** provides Script Canvas nodes that make requests against Amazon GameLift to start, stop and accept matchmaking requests.

There are synchronous and asynchronous versions for each action. Asynchronous nodes perform their operation in the AZ JobFunction and finish at some point in the future. These operations communicate over the network through either AWS HTTPS requests or TCP/UDP packets. Each asynchronous node has a corresponding notification handler node.


## StartMatchmaking
To find a match for a group of players and create a session to host match, use the `StartMatchmaking` node.
With this node, you can pass in the properties `configuration name`, `players` and `ticket id` through `AWSGameLiftStartMatchmakingRequest`.


### StartMatchmaking sample graph

![StartMatchmaking sample graph](/images/user-guide/gems/reference/aws/aws-gamelift/startmatchmaking.PNG)


### StartMatchmakingAsync sample graph

![StartMatchmakingAsync sample graph](/images/user-guide/gems/reference/aws/aws-gamelift/startmatchmakingasync.PNG)


## StopMatchmaking
To cancel a matchmaking ticket that is currently being processed, use the `StopMatchmaking` node.
With this node, you can pass in the property `ticket id` through `AWSGameLiftStopMatchmakingRequest`.


### StopMatchmaking sample graph

![StopMatchmaking sample graph](/images/user-guide/gems/reference/aws/aws-gamelift/stopmatchmaking.PNG)


### StopMatchmakingAsync sample graph

![StopMatchmakingAsync sample graph](/images/user-guide/gems/reference/aws/aws-gamelift/stopmatchmakingasync.PNG)


## AcceptMatch
To register a player's acceptance or rejection of a proposed matchmaking, use the `AcceptMatch` node.
With this node, you can pass in the properties `accept match`, `player ids` and `ticket id` through `AWSGameLiftAcceptMatchRequest`.


### AcceptMatch sample graph

![AcceptMatch sample graph](/images/user-guide/gems/reference/aws/aws-gamelift/acceptmatch.PNG)


### AcceptMatchAsync sample graph

![AcceptMatchAsync sample graph](/images/user-guide/gems/reference/aws/aws-gamelift/acceptmatchasync.PNG)


## StartPolling
Request to start the local process for polling matchmaking ticket based on given ticket id and player Id.


### StartPolling sample graph

![StartPolling sample graph](/images/user-guide/gems/reference/aws/aws-gamelift/startpolling.PNG)


## StopPolling
Request to stop the local process for polling matchmaking ticket.


### StopPolling sample graph

![StopPolling sample graph](/images/user-guide/gems/reference/aws/aws-gamelift/stoppolling.PNG)


## Matchmaking notifications

The matchmaking notifications to listen for performing required operations based on matchmaking ticket event.


### OnMatchAcceptance node

OnMatchAcceptance is fired when match is found and pending on acceptance. Use this notification to accept found match.

![OnMatchAcceptance node](/images/user-guide/gems/reference/aws/aws-gamelift/onmatchacceptance.PNG)


### OnMatchComplete node

OnMatchComplete is fired when match is complete.

![OnMatchComplete node](/images/user-guide/gems/reference/aws/aws-gamelift/onmatchcomplete.PNG)


### OnMatchError node

OnMatchError is fired when match is processed with error.

![OnMatchError node](/images/user-guide/gems/reference/aws/aws-gamelift/onmatcherror.PNG)


### OnMatchFailure node

OnMatchFailure is fired when match is failed to complete.

![OnMatchFailure node](/images/user-guide/gems/reference/aws/aws-gamelift/onmatchfailure.PNG)
