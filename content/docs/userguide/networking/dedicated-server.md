---
description: ' Learn about creating dedicated game servers in &ALYlong;. '
title: Creating Dedicated Servers
---
# Creating Dedicated Servers {#network-dedicated-server}

In Lumberyard, you can create a build of your game that runs on a headless dedicated server\. A dedicated server build omits the packages and modules that a headless server does not require and has a smaller compiled size\.

## Resources to Include {#network-dedicated-server-resources}

The package that you build for the dedicated server must include the resources that are required to run the game on the client\. You can use Lumberyard's asset pipeline to exclude certain resources that are not needed on the server\. For more information, see [Configuring the Asset Pipeline](/docs/userguide/assets/configuring.md)\.

## Client and Server {#network-dedicated-server-client-and-server}

Amazon GameLift splits sessions between client and server, but Lumberyard does not\. Lumberyard recommends that you not compile critical server logic on clients or include client data in the server package\.

## Waf Build Configuration {#network-dedicated-server-waf-build-configuration}

To generate a dedicated server build that you can use locally or upload to Amazon GameLift, attach the `_dedicated` label to your build configuration in Waf\. For more information on using Waf to set up the dedicated server, see [Creating a Dedicated Server](/docs/userguide/samples/projects/multiplayer-enhanced#sample-project-multiplayer-enhanced-creating-a-dedicated-server)\. The topic is part of the [Multiplayer Sample](/docs/userguide/samples/projects/multiplayer-enhanced.md), which includes an example of a dedicated server\.

## Linux Support {#network-dedicated-server-linux-support}

Lumberyard has a Linux version of the dedicated server\. For information on how to compile and build dedicated server packages in Linux, see [Creating Lumberyard Executables for Linux](/docs/userguide/linux/intro.md)\.