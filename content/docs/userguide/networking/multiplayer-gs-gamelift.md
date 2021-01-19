---
description: ' Configure &ALYlong;''s GridMate multiplayer sample for use with &AGSlong;. '
title: Configuring the Multiplayer Sample for &AGSlong;
---
# Configuring the Multiplayer Sample for Amazon GameLift {#network-multiplayer-gs-gamelift}

To prepare the multiplayer sample for use with Amazon GameLift, follow the required procedures for server\-side and client\-side configuration\.

## Server\-Side Configuration {#network-multiplayer-gs-gamelift-server-side-configuration}

On the server side, overwrite the `GridMate::OnSessionStarted()` handler\. In the handler, synchronize the session state and load the corresponding map if the CVAR `sv_map` is set in the `Multiplayer::Utils::SynchronizeSessionState()` function\.

The following example shows code for server\-side configuration\.

```
void GameManager::OnSessionCreated(GridMate::GridSession* session)
{
     m_gameSession = session;
     if (m_gameSession)
     {          
          if (m_gameSession->IsHost())
          {
               if (gEnv->IsDedicated())
               {
                    Multiplayer::Utils::SynchronizeSessionState(m_gameSession);
               }
          }
     }
}
```

Set the following server CVARs as needed:

`gamelift_flexmatch_enable`

`gamelift_flexmatch_onplayerremoved_enable`

`gamelift_flexmatch_start_delay`

For more details on these server CVARs provided by the Multiplayer Gem, see [Server CVars](/docs/userguide/gems/builtin/multiplayer-cvars#gems-system-gem-multiplayer-cvars-server)\.

## Client\-Side Configuration {#network-multiplayer-gs-gamelift-client-side-configuration}

On the client side, you must configure the following CVARs:

`sv_port`

`sv_map`

`gamelift_aws_access_key`

`gamelift_aws_secret_key`

`gamelift_fleet_id` or `gamelift_alias_id`

`gamelift_queue_name`

`gamelift_end_point`

`gamelift_playerid`

`gamelift_matchmaking_config_name`

You can set these CVARs with a console command or with the multiplayer sample user interface\. For a list of all the supported CVARs in the Multiplayer Gem, see [Multiplayer Gem CVars](/docs/userguide/gems/builtin/multiplayer-cvars.md)\.

To use CVARs to set the client side configuration, enter the following console command\.

```
+sv_port 33435 +gamelift_fleet_id <fleet> +gamelift_aws_access_key <aws access key> +gamelift_aws_secret_key <aws secret key>
```

**To use the multiplayer sample user interface to configure Amazon GameLift**

1. By default, the multiplayer sample loads the **Game Lobby** map\. To add or modify the CVARs, choose **Amazon GameLift**\.  
![\[Click Amazon GameLift\]](/images/userguide/networking/network-multiplayer-gs-gamelift-choose-gamelift.png)

1. Fill in the details of the GameLift configuration and choose **Connect**\.  
![\[Fill in the details of the GameLift configuration and choose Connect\]](/images/userguide/networking/network-multiplayer-gs-gamelift-connect.png)

1. To **create** a game session and join automatically, select the **Create Server** radio button and do the following:

   1. Specify the **Server Name** and the **Map** \(`sv_map`\) to load\.

   1. Enter the **Queue Name**, **Fleet ID**, or **Alias ID**\.

   1. Choose the **Create Server** button\.  
![\[Specify server name and map. Enter queue name, fleet ID, or alias ID. Choose Create Server to create a game session and join automatically.\]](/images/userguide/networking/network-multiplayer-gs-gamelift-create-session.png)

1. To **search** for and **join** an active game session, select the **Join Server** radio button and do the following:

   1. Specify the **Queue Name**, **Fleet ID**, or **Alias ID**\.

   1. Choose **Refresh**\. Active game sessions will be listed\.

   1. Select a session and choose **Join**\.  
![\[Specify the Queue Name, Fleet ID, or Alias ID. Choose Refresh to search for active game sessions. Select an active session and choose Join to join a session.\]](/images/userguide/networking/network-multiplayer-gs-gamelift-join-session.png)

1. To use **matchmaking** to get placed in a game session, select the **FlexMatch** radio button and do the following:

   1. Specify the matchmaking **Config Name**\.

   1. Choose **Start Matchmaking**\.  
![\[Specify the matchmaking Config Name. Choose Start Matchmaking.\]](/images/userguide/networking/network-multiplayer-gs-gamelift-matchmaking-session.png)

## Create an Amazon GameLift Package {#network-multiplayer-gs-gamelift-create-gamelift-package}

To create a Amazon GameLift package, complete the following steps\.

**To create a Amazon GameLift package**

1. Before you create an Amazon GameLift package, do the following:
   + Compile game assets
   + Build the Lumberyard executable

1. Run the following commands to create the Amazon GameLift package:

   ```
   mkdir GameLiftPackageWindows
   ```

   ```
   cp -r MultiplayerSample_pc_Paks_Dedicated/* GameLiftPackageWindows/
   ```

   ```
   cp -r Bin64vc141.Dedicated/* GameLiftPackageWindows/
   ```

1. Copy the corresponding Visual Studio redistributable into the `GameLiftPackageWindows` folder\.

1. Verify the dedicated server runs from the `GameLiftPackageWindows` folder\.

1. Upload your build and create a fleet from the Amazon GameLift console\. For more information, see [Uploading Your Game to Amazon GameLift](https://docs.aws.amazon.com/gamelift/latest/developerguide/gamelift-build-intro.html)\.

## Secured Connection \(Not Amazon GameLift Specific\) {#network-multiplayer-gs-gamelift-secured-connection-non-gamelift}

Amazon GameLift uses the OpenSSL\-based secure socket driver to create a secured connection\. However, instead of verifying the server, the secure socket driver can verify the client\.

To enable a secured connection, make the following change to the `game.cfg` file:

```
gm_netsec_enable = 1
```

If client verification is needed, make the following change to the `game.cfg` file:

```
gm_netsec_verify_client = 1
```

**Note**  
By default, the certificate and private key are loaded from the `multiplayersample.cert.pem` file \(shared by the certificate and CA root\) and from the `multiplayersample.key.pem` file\. To specific different files, use the `gm_netsec_certificate` and `gm_netsec_private_key` CVARs\.