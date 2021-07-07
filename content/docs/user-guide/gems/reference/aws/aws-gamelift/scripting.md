---
linkTitle: Scripting
title: Scripting with AWS GameLift Gem
description: "Script Canvas nodes for AWS GameLift Gem in O3DE"
toc: true
---

{{< preview-new >}}


This topic describes how to use Script Canvas to create, search, join, and leave game sessions. 

AWS GameLift Gem provides both synchronous and asynchronous versions for each action. Asynchronous nodes perform their operation in the AZ JobFunction and finish at some point in the future. These operations communicate through AWS HTTPS requests or over the network. Each asynchronous node has a corresponding notification handler node.

## Script Canvas Nodes

### ConfigureGameLiftClient

To make requests against Amazon GameLift service, you must create a proper GameLift AWS client using the **ConfigureGameLiftClient** node. With this node, you can specify the region where your GameLift fleets are created and resided.

You must follow standard AWS Region format. Learn more about it in [Amazon GameLift endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/gamelift.html).


#### ConfigureGameLiftClient node

![ConfigureGameLiftClient node](/images/user-guide/gems/reference/aws/aws-gamelift/configureclient.PNG)

### CreateSession

Create a session using the **CreateSession** node, and configure the session using either the **AWSGameLiftCreateSessionRequest** or **AWSGameLiftCreateSessionOnQueueRequest** nodes. 

After successfully creating a session, other instances of your game can discover it using the **SearchSessions** node and then join it using the **JoinSession** node.


#### AWSGameLiftCreateSessionRequest Get and Set variable nodes

![AWSGameLiftCreateSessionRequest Get and Set Variable nodes](/images/user-guide/gems/reference/aws/aws-gamelift/createsessionrequest.PNG)


#### AWSGameLiftCreateSessionOnQueueRequest Get and Set variable nodes

![AWSGameLiftCreateSessionOnQueueRequest Get and Set nodes](/images/user-guide/gems/reference/aws/aws-gamelift/createsessiononqueuerequest.PNG)  


#### CreateSessionAsync node and Async Handler node

![CreateSessionAsync node and Async Handler node](/images/user-guide/gems/reference/aws/aws-gamelift/createsessionasync.PNG)  


#### CreateSession node

![CreateSession node](/images/user-guide/gems/reference/aws/aws-gamelift/createsession.PNG)  


### SearchSessions

Get a list of game sessions that are currently active and joinable using the **SearchSessions** node. You can specify your search criteria using the **AWSGameLiftSearchSessionsRequest** node.

On success, the SearchSessions node returns a list of SearchSessionsResponse objects, which provide details of the sessions found that meet your search criteria.

  
#### AWSGameLiftSearchSessionsRequest Get and Set variable nodes

![AWSGameLiftSearchSessionsRequest Get and Set variable nodes](/images/user-guide/gems/reference/aws/aws-gamelift/searchsessionrequest.PNG)  


#### SearchSessionsResponse Get and Set variable nodes

![SearchSessionsResponse Get and Set variable nodes](/images/user-guide/gems/reference/aws/aws-gamelift/searchsessionresponse.PNG)  
  

#### SearchSessions node

![SearchSessions node](/images/user-guide/gems/reference/aws/aws-gamelift/searchsessions.PNG)  
  

#### SearchSessionsAsync node and Async Handler node

![SearchSessionsAsync node and Async Handler node](/images/user-guide/gems/reference/aws/aws-gamelift/searchsessionasync.PNG)  


### JoinSession

After searching for a session, you can join a session using the `JoinSession` node. Specify the session using its `game session id`, which you retrieved from SearchSession. If the game successfully connects to the server, you will automatically travel to the server's map and join the gameplay.

With this node, you can pass in the properties `game session id` and `player id` through `AWSGameLiftJoinSessionRequest`.

  
#### AWSGameLiftJoinSessionRequest Get and Set variable nodes

![AWSGameLiftJoinSessionRequest Get and Set variable nodes](/images/user-guide/gems/reference/aws/aws-gamelift/joinsessionrequest.PNG)  


#### JoinSession node

![JoinSession node](/images/user-guide/gems/reference/aws/aws-gamelift/joinsession.PNG)  


#### JoinSessionAsync node and Async Handler node

![JoinSessionAsync node and Async Handler node](/images/user-guide/gems/reference/aws/aws-gamelift/joinsessionasync.PNG)  


### LeaveSession

To disconnect from a joined session, use the LeaveSession node. 


#### LeaveSession node

![LeaveSession node](/images/user-guide/gems/reference/aws/aws-gamelift/leavesession.PNG)  


#### LeaveSessionAsync node and Async Handler node

![LeaveSessionAsync node and Async Handler node](/images/user-guide/gems/reference/aws/aws-gamelift/leavesessionasync.PNG)  

  

Previous Topic: [C++ API for AWS GameLift Gem](cpp-api/)  
Next Topic: [AWS GameLift Gem Advanced Topics](advanced-topics/)