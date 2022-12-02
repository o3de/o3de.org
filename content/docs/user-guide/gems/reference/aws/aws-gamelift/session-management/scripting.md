---
linkTitle: Session Management Scripting
title: Session Management Scripting
description: Learn about Script Canvas nodes for multiplayer session management in the AWS GameLift Gem in Open 3D Engine (O3DE).
toc: true
weight: 400
---


The **AWS GameLift** provides Script Canvas nodes that make requests against Amazon GameLift to create, search, join, and leave game sessions.

There are synchronous and asynchronous versions for each action. Asynchronous nodes perform their operation in the AZ JobFunction and finish at some point in the future. These operations communicate over the network through either AWS HTTPS requests or TCP/UDP packets. Each asynchronous node has a corresponding notification handler node.

## ConfigureGameLiftClient

To make requests against GameLift, you must create a proper GameLift client using the **ConfigureGameLiftClient** node. With this node, you can specify the AWS Region where your GameLift fleets are created and reside.

Note that you must specify the AWS Region in the correct format. For example, for the US East (N. Virginia) Region, specify **us-east-1**. For a list of supported Regions, refer to [Amazon GameLift endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/gamelift.html) in the AWS General Reference.


### ConfigureGameLiftClient sample graph

![ConfigureGameLiftClient sample graph](/images/user-guide/gems/reference/aws/aws-gamelift/configureclient.PNG)


## CreateSession

Create a session by using the **CreateSession** node. Configure the session by using either the **AWSGameLiftCreateSessionRequest** node or the **AWSGameLiftCreateSessionOnQueueRequest** node.
It is recommended to create a session behind a queue asynchronously. See [Best practices for GameLift game session queues](https://docs.aws.amazon.com/gamelift/latest/developerguide/queues-best-practices.html).
After successfully creating a session, other instances of your game can discover it using the **SearchSessions** node, and then join it using the **JoinSession** node.

### CreateSession sample graph

![CreateSession sample graph](/images/user-guide/gems/reference/aws/aws-gamelift/createsession.PNG)


### CreateSessionAsync sample graph

![CreateSessionAsync sample graph](/images/user-guide/gems/reference/aws/aws-gamelift/createsessionasync.PNG)


### AWSGameLiftCreateSessionOnQueue sample graph
![AWSGameLiftCreateSessionOnQueue sample graph](/images/user-guide/gems/reference/aws/aws-gamelift/createsessiononqueue.PNG)


### AWSGameLiftCreateSessionOnQueueAsync sample graph
![AWSGameLiftCreateSessionOnQueueAsync sample graph](/images/user-guide/gems/reference/aws/aws-gamelift/createsessiononqueueasync.PNG)


## SearchSessions

Get a list of game sessions that are currently active and joinable by using the SearchSessions node. You can specify your search criteria by using the **AWSGameLiftSearchSessionsRequest** node.

On success, the SearchSessions node returns a list of **SearchSessionsResponse** objects, which provide details of the sessions found that meet your search criteria.

### SearchSessions sample graph

![SearchSessions sample graph](/images/user-guide/gems/reference/aws/aws-gamelift/searchsessions.PNG)
  

### SearchSessionsAsync sample graph

![SearchSessionsAsync sample graph](/images/user-guide/gems/reference/aws/aws-gamelift/searchsessionasync.PNG)


## JoinSession

After searching for a session, you can join a session using the `JoinSession` node. Specify the session using its `game session id`, which you retrieved from SearchSession. If the game successfully connects to the server, you will automatically travel to the server's map and join the gameplay.

With this node, you can pass in the properties `game session id` and `player id` through `AWSGameLiftJoinSessionRequest`.

  
### JoinSession sample graph

![JoinSession sample graph](/images/user-guide/gems/reference/aws/aws-gamelift/joinsession.PNG)


### JoinSessionAsync sample graph

![JoinSessionAsync sample graph](/images/user-guide/gems/reference/aws/aws-gamelift/joinsessionasync.PNG)


## LeaveSession

To disconnect from a joined session, use the **LeaveSession** node.


### LeaveSession sample graph

![LeaveSession sample graph](/images/user-guide/gems/reference/aws/aws-gamelift/leavesession.PNG)  


### LeaveSessionAsync sample graph

![LeaveSessionAsync sample graph](/images/user-guide/gems/reference/aws/aws-gamelift/leavesessionasync.PNG)  
