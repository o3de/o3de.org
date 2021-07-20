---
linkTitle: Advanced Topics
title: AWS GameLift Gem Advanced Topics
description: Learn some advanced ways to use the AWS GameLift Gem in Open 3D Engine (O3DE).
toc: true
---

This topic covers some advanced ways to use the **AWS GameLift** Gem. 


## Use resource mapping files to look up fleets

A *fleet* is a set of Amazon EC2 virtual machines, called *instances*, that represents your hosting resources. A *fleet ID* is a unique identifier for each fleet, which Amazon GameLift generates. 

In most cases, your game will use more than one fleet. To avoid using a fixed fleet ID in your script, you can use a resource mapping file, which lets you look up fleet IDs at runtime. Using a resource mapping file helps keep your code or script clean and consistent. For more information, refer to [Resource Mapping Files](/docs/user-guide/gems/reference/aws/aws-core/resource-mapping-files/).

The following examples use [Script Canvas](/docs/user-guide/scripting/script-canvas/), but you can also search and join sessions using the [AWS GameLift Gem C++ API](cpp-api/). 


### Example: Fleet lookup

This example script shows you how to look up a fleet from the resource mapping file. Then, with the fleet, you create a session that allows one maximum player. (You can also do this using the AWS GameLift Gem C++ API.)

In Script Canvas, follow these steps:

1. Get the request object for creating a session by using the **Get request** node.

2. Look up the fleet with the ID `MyGameLiftFleetId` by using the **GetResourceNameId** node. 

3. For the corresponding fleet, set the maximum number of players to be `1` by using the **FleetId** and **MaxPlayer** nodes. 

4. Create a session on the fleet by using the **CreateSessionAsync** node. 

![A script that gets a fleet from a resource mapping file and creates a session with 1 maximum player.](/images/user-guide/gems/reference/aws/aws-gamelift/createsessionandresourcemapping.PNG)


### Example: Multiple fleet lookup

This example script shows you how to look up multiple fleets from the resource mapping file. If you have multiple fleets, you can store the fleet IDs in an array. Then, you can iterate through each fleet and search for active sessions in the corresponding fleet. (You can also do this using the AWS GameLift Gem C++ API.)

In Script Canvas, follow these steps:

1. Iterate through an array of `FleetId`s by using the **Get fleetId Keys** and **For Each** nodes. 

2. For each fleet ID:  

   - Look up the fleet corresponding to the `FleetId` by using the **GetResourceNameId** node.  

   - Get a request object for searching through sessions by using the **Get request** node.  

   - Search for an active and joinable session by using the **SearchSessionsAsync** node.  

![A script that iterates through an array of fleets and searches for an active session.](/images/user-guide/gems/reference/aws/aws-gamelift/searchsessionsandresourcemapping.PNG)


## Search for and join sessions

The most basic way to search for sessions is by browsing through the server, which shows all of the available games. Then, the player can filter the games based on the type that they want to play, choose a game, and join a session.

The following examples use [Script Canvas](/docs/user-guide/scripting/script-canvas/), but you can also search and join sessions using the [AWS GameLift Gem C++ API](cpp-api/).


### Example: Search for sessions based on filter criteria

This example script shows you how to search for a maximum of 10 sessions in the corresponding fleet.

In Script Canvas, follow these steps:

1. Get a request object for searching sessions by using the **Get searchrequest** node.

2. Look up the fleet with the ID `MyGameLiftFleetId` by using the **GetResourceNameId** node.

3. Filter the search with a maximum of 10 sessions in the corresponding fleet by using the **FleetId** and **MaxResult** nodes.

4. Search for sessions by using the **SearchSessionsAsync** node.
   
![A scipt that searches for a maximum of ten sessions in the corresponding fleet.](/images/user-guide/gems/reference/aws/aws-gamelift/searchactivesessions.PNG)


### Example: Browse search results and join session

After you get search results from the previous example, this script chooses the first game session and joins it. The script begins automatically after **SearchSessionsAsync** completes with results. 

1. Set this script to begin automatically after searching for sessions by adding the **OnSearchSessionsAsyncComplete** event to **AWSGameLiftSessionAsyncRequestNotificationBus**, then applying that to the **SessionConfigs** node.
   
2. Get the first session from the results of the **SearchSessionsAsync** node by using the **Get First Element** and **SessionId** nodes.

3. Get a request object to join the session by using the **Get joinrequest** and **SessionId** nodes.

4. Create a player ID for the session by using the **SessionId** and **CreatePlayerId** nodes.

5. Allow a player to join the session by using the **PlayerId** and **JoinSessionAsync** nodes.

![A script that chooses a game from search results and joins the first session.](/images/user-guide/gems/reference/aws/aws-gamelift/searchandjoin.PNG)


## Get credentials from an Amazon Cognito identity pool

To make requests against GameLift, and to permit players to interact with your resources, you must get the players' AWS credentials. With the [AWS Client Auth Gem](/docs/user-guide/gems/reference/aws/aws-client-auth/), you can use players' login information to get their AWS credentials from an Amazon Cognito identity pool. To get players' credentials from an identity pool, they must successfully log in.

After players log in, you can use the AWS GameLift Gem to configure the client and set up their AWS credentials by calling `AWSGameLiftClientManager::ConfigureGameLiftClient()`.


## Set up log paths for multiple processes

You can configure GameLift fleets to run multiple processes on each instance. This can help you use your hosting resources more efficiently and potentially help reduce overall hosting costs. For more information, refer to [Managing how game servers are launched for hosting](https://docs.aws.amazon.com/gamelift/latest/developerguide/fleets-multiprocess.html) in the Amazon GameLift Developer Guide.

To launch a server process on a GameLift fleet and save the log files, enter the following command. You can set a unique log path for a server process by providing a unique identifier in the `project-path` launch parameter. In this example, log files are saved to `C:\game\process1\user\log\` instead of the default log path.

```cmd
C:\game\bin\server.exe --engine-path=C:\game --project-path=C:\game\process1 --project-cache-path=C:\game\assets -bg_ConnectToAssetProcessor= 0
```

---

Previous topic: [AWS GameLift Gem C++ API](cpp-api/)

Next topic: [AWS GameLift Gem Local Testing](local-testing/)