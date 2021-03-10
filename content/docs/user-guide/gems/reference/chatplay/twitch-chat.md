---
description: ' Use the Twitch Chat Gem to add Twitch ChatPlay support to your Open 3D Engine
  game and trigger events based on Twitch chat activity. '
title: Twitch Chat Gem
weight: 50
---

{{< preview-migrated >}}

The Twitch Chat Gem provides a flexible framework to create customized game interactions between streamers and spectators on Twitch, the world's leading social video platform and community for gamers\. By adding Twitch ChatPlay to your project, you can quickly and easily connect to Twitch IRC via WebSocket\.

Twitch ChatPlay includes support for chat commands, polls, and surveys that can be triggered by Twitch viewers through the Twitch chat channel\. For example, you can create a chat command `#cheer` that triggers celebration animations in your game\.

## Gem Setup {#gem-twitch-chatplay-setup}

Use of the Twitch Chat Gem in your project requires the following setup:

1. Add the Twitch Chat API Gem and the Websockets Gem to your project\.

   The Twitch Chat API Gem has a dependency on the Websockets Gem\.

1. Setup an account on Twitch that will be used by the game\. You will need to provide your username or a username that you wish to represent you \(such as a bot id, potentially with mod permissions in the channel, depending on your goals\)\.

1. Get a [Twitch OAuth token](https://twitchapps.com/tmi/)\.
**Important**
Keep this token safe and **do not share** this publicly\! this is essentially your password for connecting, and if you share it with others, they can spoof your account\.

   For more information about **Twitch IRC** and authentication, see the [Twitch documentation](https://dev.twitch.tv/docs/irc/guide)\.

You are now ready to use the gem\. For details on how to implement Twitch ChatPlay in your game, see [Intro to ChatPlay](/docs/user-guide/gems/chatplay/intro.md)\.
