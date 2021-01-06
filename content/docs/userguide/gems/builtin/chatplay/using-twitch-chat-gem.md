---
description: ' Learn how to use the Twitch Chat Gem to add &chatplay; support to your
  &ALYlong; game and trigger events based on Twitch chat activity. '
title: Using the Twitch Chat &gem;
---
# Using the Twitch Chat Gem<a name="chatplay-using-twitch-chat-gem"></a>

Adding the Twitch Chat Gem to your project enables you to connect to the Twitch IRC and interact with players using Twitch ChatPlay\.

Twitch ChatPlay includes support for chat commands, polls, and surveys that can be triggered by Twitch viewers through the Twitch chat channel\.

For gem setup steps, read the [Twitch Chat Gem](/docs/userguide/gems/builtin/chatplay/_index.md) documentation\.

## Gem Usage<a name="chatplay-gem-usage"></a>

Once the gem has been added to your project and you have setup a Twitch account and OAuth token, you are ready to connect to Twitch IRC using C\+\+, Lua, or Script Canvas and join a channel\.

**Connect to Twitch ChatPlay**  
Use the `ConnectToChatplay` function to connect to ChatPlay by providing your OAuth token \(1st argument\), and your username \(2nd argument\)\. Once connected, you should see a message confirming that Twitch is connected through the `TwitchChatPlayNotificationBus`\. You will need to listen to this bus in C\+\+ or Lua, or by simply using the Script Canvas node to receive the message\.

**Join a channel**  
Use the `JoinChannel` function to join a channel on Twitch\. If your account has moderator control of that channel, you can use moderator features with your ChatPlay connection\.

**Game usage**  
Examples of how to use a ChatPlay connection in your game include the following:
+ React to new subscribers of the channel\.
+ Listen to messages in the channel and filter them using a [keyword system](#chatplay-keyword-system)\.
+ Respond to specific keywords\.
+ Implement voting using keywords\.

All of these can be implemented using a bus call in C\+\+, Lua, or Script Canvas nodes\. Look in the directory `Gems\TwitchChatPlay\Assets` for Lua and Script Canvas usage examples\.

## Keyword System<a name="chatplay-keyword-system"></a>

ChatPlay enables you to search incoming messages from Twitch for keywords\. Your game can respond to these messages\. Here are some rules and recommendations to follow when creating keywords for your game:

**To create keywords**  
Three functions are used to set keywords in the system\. The first two are also accessible through Script Canvas\. Be sure to set a keyword only once, using one of the following handlers:

1. **SetKeywordWithDefaultHandler** – Adds a keyword for use throughout a session\. The keyword will automatically have its handler assigned to the `TwitchChatPlayNotificationBus`, and messages will be sent through that system when the keyword is triggered\.

1. **SetKeywordWithFormattedHandler** – Adds a keyword that will be parsed into username and message, in separate fields\.

1. **SetKeywordWithSpecificHandler** – Adds a unique function to the keyword that will be called when that keyword is hit\. This handler can be set to multiple keywords, but different handlers may be used for different keywords\. For example, you could have "\!vote" go to a `CountVote` function, while "\!subscribe" goes to the `PlayFanfare` function\.

**To enable or disable keywords**  
Keywords can be enabled and disabled using the `ActivateKeywordMatching` command\. You could easily turn voting on and off with this command, for example\. You can also call `RemoveKeyword` if you no longer need a particular keyword\.

**Choosing and using keywords**  
A common Twitch pattern is to provide keywords in the format: `!<keyword> <value>`\. For example, `!vote yes`\.

We recommend that you use this format for your keywords for simplicity, though it is not required\. Simply enter your keywords in this format, and enable the system to use them by setting `UseTwitchPattern` to true\.

**Troubleshooting**  
If keywords don't seem to be working, verify that your incoming keywords match the chosen keyboard format\. You can pass the messages through or set a custom handler to help determine if users are acting in an unexpected way, or if the default keyword matching is too limited for your needs\.