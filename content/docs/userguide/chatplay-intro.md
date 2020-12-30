---
description: ' Get an overview of the &chatplay; system for interacting with Twitch
  viewers. '
slug: chatplay-intro
title: '&chatplay; System'
---
# Twitch ChatPlay System<a name="chatplay-intro"></a>

Twitch ChatPlay provides a flexible framework to create customized game interactions between broadcasters and spectators on Twitch, the world’s leading social video platform and community for gamers\.

Twitch ChatPlay includes support for chat commands, polls, and surveys that can be triggered by Twitch viewers through the Twitch chat channel\. For example, you can create a chat command \#cheer that triggers celebration animations in your game\.

Twitch ChatPlay is implemented by a set of Script Canvas nodes that establish a connection to a Twitch channel and use incoming traffic as a game input, like any other input device\.

Twitch ChatPlay includes the following components and services:
+ Twitch IRC servers
+ Twitch ID authentication
+ Twitch account

The following diagram illustrates Twitch ChatPlay's server\-side components\.

![\[Twitch ChatPlay server-side components\]](/images/userguide/chatplay/chatplay-server.png)

The following diagram illustrates Twitch ChatPlay's client\-side components\.

![\[Twitch ChatPlay client-side components\]](/images/userguide/chatplay/chatplay-client.png)