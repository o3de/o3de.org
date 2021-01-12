---
description: ' Learn about the Twitch C++ API operations that you can use for your
  &ALY; game project. '
title: Twitch C++ API Reference for &ALY;
---
# Twitch C\+\+ API Reference for Lumberyard<a name="twitch-api-ebus"></a>

Calls that are made on the `TwitchRequestBus` return a unique `ReceiptID` object\. Because calls are made asynchronously, responses are not guaranteed to arrive in the same order as requested\. Each response type includes a `ReceiptID` object as a member\. To determine which response corresponds to a request, you can compare the `ReceiptID` instances from the requests to the `ReceiptID` instances in the responses\.

For information about event buses that Lumberyard uses, see [Working with the Event Bus \(EBus\) system](/docs/userguide/programming/ebus/intro.md)\.

**Topics**
+ [General](/docs/userguide/gems/twitch/ebus-general.md)
+ [User](/docs/userguide/gems/twitch/ebus-user.md)
+ [Friends](/docs/userguide/gems/twitch/ebus-friends.md)
+ [Rich Presence](/docs/userguide/gems/twitch/ebus-rich-presence.md)
+ [Channels](/docs/userguide/gems/twitch/ebus-channels.md)
+ [Data Types](/docs/userguide/gems/twitch/ebus-data-elements.md)