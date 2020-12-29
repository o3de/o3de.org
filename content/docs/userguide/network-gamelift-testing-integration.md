description: ' Learn how to use &AGS; Local to test your &AGS; integration in your
  &ALYlong; game projects. '
slug: network-gamelift-testing-integration
title: Testing your &AGSlong; Integration
---
# Testing your Amazon GameLift Integration<a name="network-gamelift-testing-integration"></a>

Before you make your first Amazon GameLift fleet, verify your integration using **GameLift Local**\. GameLift Local is included as part of the GameLift Server SDK download\. It is run as a Java process\.

With GameLift Local, you can test most aspects of your GameLift integration, with the exception of matchmaking\. For details and other limitations, see the complete documentation for [Testing Your Integration](https://docs.aws.amazon.com/gamelift/latest/developerguide/integration-testing-local.html) in the Amazon GameLift Developer Guide\.

The following example demonstrates how to test **MultiPlayerSample** on Windows\.

1. **Start GameLift Local\.**

   Open a command prompt window, navigate to the directory containing the file `GameLiftLocal.jar`, and run it\. By default, GameLift Local listens for requests from game clients on port 8080\. To specify a different port number, use the `-p` parameter, as shown in the following example:

   ```
   java -jar GameLiftLocal.jar -p 9080
   ```
**Important**  
Use the same port in the `gamelift_endpoint` cvar for the game client launcher\.

   When GameLift Local starts, you see logs indicating that two local websockets were started, one listening for your game server and one listening for your game client or the AWS CLI\. Logs continue to report activity on the two local servers, including communication to and from your game components\.

1. **Start the MultiPlayerSample dedicated server\.**

   Open a new command window, navigate to the directory containing the game server, and run it using the following command\-line options:

   ```
   MultiplayerSampleLauncher_Server.exe +sv_port 33435 +gamelift_start_server +map MultiplayerSample
   ```

   In the GameLift Local console, log messages indicate that your game server has connected to the GameLift Local service, initialized the GameLift Server SDK with `InitSDK()`, and called `ProcessReady()`\. If successful, you are now ready to host a game session\.
**Tip**  
For details on these and other calls, see [GameLift interactions](https://docs.aws.amazon.com/gamelift/latest/developerguide/gamelift-sdk-interactions.html)\.

1. **Start the MultiPlayerSample client\.**

   Start the launcher using the following command\-line options:

   ```
   MultiplayerSampleLauncher.exe +sv_port 33435 +gamelift_fleet_id fleet-123 +gamelift_uselocalserver 1 +gamelift_endpoint 127.0.0.1:9080 +gamelift_aws_access_key any_string +gamelift_aws_secret_key any_string +gamelift_region us-west-2
   ```
**Note**  
Note that the `gamelift_uselocalserver` cvar is set to `1` to indicate the use of a local server, and the `gamelift_endpoint` cvar is set to the local endpoint with the same port used to start GameLift Local\. You do not need real AWS credentials when testing local; you can set the access key and secret key to any string\.