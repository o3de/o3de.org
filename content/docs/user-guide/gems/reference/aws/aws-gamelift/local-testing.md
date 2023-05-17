---
linkTitle: Local Testing
title: AWS GameLift Gem Local Testing with GameLift Anywhere
description: "Learn how to test locally with the AWS GameLift Gem in O3DE"
toc: true
weight: 600
---

In this topic, you will learn how to test and verify AWS GameLift Gem feature integrations on your local machine by using [Amazon GameLift Anywhere](https://docs.aws.amazon.com/gamelift/latest/developerguide/fleets-creating-anywhere.html). 

GameLift Anywhere can be used to integrate hardware from your environment into your Amazon GameLift game hosting. Amazon GameLift Anywhere registers your hardware with Amazon GameLift in an Anywhere fleet; you can iteratively test and build your game server project using your own hardware.

With GameLift Anywhere, you can verify the following:

*   Your game server is correctly integrated with the Server SDK and is properly communicating with the GameLift service to start new game sessions, accept new players, and report health and status.
    
*   Your game client is correctly integrated with the AWS SDK for GameLift and is able to retrieve information on existing game sessions, start new game sessions, join players to games and connect to the game session.
    

## 1. Create a Location

Create a location for your custom resources. A custom location labels the location of your hardware that Amazon GameLift uses to run your games in Anywhere fleets.
When creating your custom location, the location name must start with `custom-`.

```sh
aws gamelift create-location --location-name custom-location-1 --region <Region>
```


## 2. Create an Anywhere Fleet

Creating an Anywhere fleet is a much faster process compared to creating a regular AWS fleet, which usually takes about an hour to setup.

```sh
aws gamelift create-fleet --name AnywhereFleet --compute-type ANYWHERE --locations Location=custom-location-1 --region <Region>
```


## 3. Register your local machine as a Compute

Register your local machine as a GameLift Anywhere Compute.
For ease of testing, we assume the Server and Client will be run on the same machine; so we can pass localhost (`127.0.0.1`) as the IP address.
If your machine is accessible via a public IP address, change that value as appropriate.

```sh
aws gamelift register-compute --compute-name CustomCompute1 --fleet-id <FleetId> --ip-address 127.0.0.1 --location custom-location-1 --region <Region>
```

Also retrieve the compute auth token as it will be necessary for the next steps.

```sh
aws gamelift get-compute-auth-token --fleet-id <FleedId> --compute-name CustomCompute1
```

## 4. Start an instance of the Game Server executable on your machine

When you are ready to test with GameLift, opt-in by setting the `sv_gameLiftEnabled` and `sv_gameliftAnywhereEnabled` CVARs to `true`. These CVARs are off by default to facilitate local testing prior to the integration of the GameLift Server SDK into your game server.

You will also need to fill in the server parameters via the following CVARs:
- `sv_gameliftAnywhereWebSocketUrl`
- `sv_gameliftAnywhereAuthToken`
- `sv_gameliftAnywhereFleetId`
- `sv_gameliftAnywhereHostId`
- `sv_gameliftAnywhereProcessId`

All of the values for these properties are retrieved in the previous steps, aside from these notes:
- In the `HostId` property should be filled with the `ComputeName`;
- `ProcessId` can be omitted. A unique default `ProcessId` will be generated out of the timestamp.

To set these values, you can either pass them when starting the executable (either via command line or in your Visual Studio solution) as follows:

```sh
C:\GameLiftPackageWindows\MultiplayerSample.ServerLauncher.exe --sv_gameLiftEnabled=true --sv_gameliftAnywhereEnabled=true --sv_gameliftAnywhereWebSocketUrl="<WebSocketUrl>" --sv_gameliftAnywhereAuthToken="<AuthToken>" --sv_gameliftAnywhereFleetId="<FleetId>" --sv_gameliftAnywhereHostId="<ComputeName>" --sv_gameliftAnywhereProcessId="<ProcessId>"
```
Or you can set these values by creating a settings registry file named `commands.MyProject_serverlauncher.setreg` in the `MyProject/Registry` folder with the following contents:

```json
{
    "Amazon":
    {
        "AzCore":
        {
            "Runtime":
            {
                "ConsoleCommands":
                {
                    "sv_gameLiftEnabled": "true",
                    "sv_gameliftAnywhereEnabled": "true",
                    "sv_gameliftAnywhereWebSocketUrl": "<WebSocketUrl>",
                    "sv_gameliftAnywhereAuthToken": "<AuthToken>",
                    "sv_gameliftAnywhereFleetId": "<FleetId>",
                    "sv_gameliftAnywhereHostId": "<ComputeName>",
                    "sv_gameliftAnywhereProcessId": "<ProcessId>"
                } 
            } 
        } 
    } 
}
```

This way, the values will be applied regardless of how the server is built.


## 5. Start the Game

Make sure you have a cmake build target for your game, like YourProject.GameLauncher, and build the application for your local testing.
You should be able to find application under build bin folder, and launch the game.


## 6. Test Game and Server

Testing steps and instructions really depend on your own project, but please make sure your testing can cover CreateSession, JoinSession, LeaveSession and DestroySession use case.

You can also verify interactions and logs with the GameLift Local tool. For more information, refer to [Test a Game Server and Client](https://docs.aws.amazon.com/gamelift/latest/developerguide/integration-testing-local.html#integration-testing-local-client) in the Amazon GameLift Developer Guide.
