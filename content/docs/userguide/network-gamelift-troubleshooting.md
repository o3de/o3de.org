---
description: ' Find solutions to common &AGS; integration errors in your &ALYlong;
  game projects. '
slug: network-gamelift-troubleshooting
title: Troubleshooting &AGSlong; integration
---
# Troubleshooting Amazon GameLift integration<a name="network-gamelift-troubleshooting"></a>

Use the following information to help you diagnose and fix common problems that you might encounter while working with Amazon GameLift\.

**Topics**
+ [Fleets failing to go active](#gamelift-troubleshooting-fleet-not-going-active)
+ [Clients unable to connect](#gamelift-troubleshooting-clients-unable-to-connect)
+ [Additional information](#gamelift-troubleshooting-additional-information)

## Fleets failing to go active<a name="gamelift-troubleshooting-fleet-not-going-active"></a>

As a first step, sign in to the Amazon GameLift console and check the fleet's events to get more details on the problem\. Here you can examine the output of the install script and get more information regarding where GameLift is seeing problems\.

**Missing dependencies**  
If your process is failing on launch, then the most likely cause is that you failed to package or install all of the server's dependencies\. On Windows, this typically means missing dynamic link libraries \(DLLs\)\. Check the following:
+ Check your `install.bat` or `install.sh` output\. Ensure that the script installed what was required to run on GameLift\.
**Note**  
For Windows fleets, debug builds of the dedicated server will fail on launch, since they require debug Visual Studio Redistributables which Lumberyard cannot provide\. Consider using profile builds instead on GameLift\.
**Note**  
For Linux fleets, look at the `MultiplayerSample_CreateGameLiftPackage.sh` script to see how to generate an `install.sh` for use on Amazon Linux 2\.
+ Remote into the fleet and ensure that the `bootstrap.cfg` is correct\. Many failures can be caused by a misconfigured bootstrap\. Try manually running the process to discover what might be missing on launch\.
+ If you are using Windows to prepare packages for Linux development, ensure that the box marked **Setup for Linux Dedicated Server** is selected in the Setup Assistant, otherwise GameLift integration files can be missing\. This is a requirement for using `MultiplayerSample_LinuxPacker.bat`, for example\.

**Crashing process**  
If your process is crashing, then remote into the fleet and check the server logs to discover the source of the crash\. Lumberyard logs to either `C:\Game\user\log` \(Windows\) or `/local/game/user/log` \(Linux\)\.

**Not responding to GameLift callbacks**  
Ensure that your process is responding to callbacks from GameLift, especially the health check callback\. If your process is not responding, then ensure your Amazon EC2 instance is not CPU\-bound or memory\-bound, which might cause the server to be unstable or slow to respond\. Try reducing the number of concurrent servers per instance, or try a larger EC2 instance\.

## Clients unable to connect<a name="gamelift-troubleshooting-clients-unable-to-connect"></a>

If your clients fail to connect to the server, then check the following configurations:
+ Ensure that the expected server fleet port\(s\) are open in Amazon GameLift\. This can be checked from the fleet console and the CLI\.
+ Ensure that your server is listening on the port reported to GameLift via the `ProcessParameters` object passed to `ProcessReady()`\.
+ Ensure that your clients do not have the `sv_port` cvar set to something unexpected\. We recommend that you leave this at the ephemeral port\.
+ If you are using **MultiplayerSample** as a basis for your fleets, verify that the server and client have the same self\-signed certificate\. You must use a consistent certificate across clients and server fleets\. For more information about self\-signed certificates, see [About Self\-Signed Certificates in the Multiplayer Sample](sample-project-multiplayer-enhanced.md#sample-project-multiplayer-enhanced-self-signed-certificates)\.
+ Verify that `gm_netsec_enable` is consistent between your clients and fleets\. It is on by default for the dedicated server, but you can turn it off by passing `+gm_netsec_enable 0` in the startup params\.

## Additional information<a name="gamelift-troubleshooting-additional-information"></a>

For additional troubleshooting tips and information, see the following topics:
+ [Debug GameLift fleet issues](https://docs.aws.amazon.com/gamelift/latest/developerguide/fleets-creating-debug.html)
+ [Accessing GameLift fleet instances remotely](https://docs.aws.amazon.com/gamelift/latest/developerguide/fleets-remote-access.html)
+ [Testing your GameLift integration](https://docs.aws.amazon.com/gamelift/latest/developerguide/integration-testing-local.html)
+ [Multiplayer Sample troubleshooting](sample-project-multiplayer-enhanced.md#sample-project-multiplayer-enhanced-troubleshooting)